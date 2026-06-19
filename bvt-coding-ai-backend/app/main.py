import json
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from app.config import settings
from app.schemas import ChatRequest, ChatResponse, SourceSnippet
from app.security import reject_unsafe_question, should_handoff_to_human
from app.services.ollama import OllamaClient
from app.services.prompt_builder import build_prompt
from app.services.retrieval import KnowledgeBase
from app.utils.rate_limiter import InMemoryRateLimiter


app = FastAPI(title=settings.app_name)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

knowledge_base = KnowledgeBase(Path("knowledge/seed.md"))
ollama = OllamaClient(
    base_url=settings.ollama_base_url,
    model=settings.ollama_model,
    timeout_seconds=settings.ollama_timeout_seconds,
)
rate_limiter = InMemoryRateLimiter(settings.rate_limit_per_minute)


@app.get("/health")
async def health() -> dict[str, object]:
    return {
        "ok": True,
        "app": settings.app_name,
        "env": settings.app_env,
        "model": settings.ollama_model,
        "ollama_reachable": await ollama.health(),
    }


@app.post("/v1/knowledge/reload")
async def reload_knowledge() -> dict[str, object]:
    knowledge_base.reload()
    return {"ok": True}


@app.post("/v1/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request) -> ChatResponse:
    _enforce_request_policy(payload, request)
    conversation_id = payload.conversation_id or str(uuid4())
    retrieved = knowledge_base.search(payload.question, settings.retrieval_limit)
    prompt = build_prompt(payload.question, payload.history, retrieved)

    try:
        answer = await ollama.generate(prompt)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The local model host is unavailable.",
        ) from exc

    return ChatResponse(
        answer=answer,
        conversation_id=conversation_id,
        model=settings.ollama_model,
        handoff_recommended=should_handoff_to_human(payload.question),
        sources=[
            SourceSnippet(title=item.title, text=item.text, score=item.score)
            for item in retrieved
        ],
    )


@app.post("/v1/chat/stream")
async def chat_stream(payload: ChatRequest, request: Request) -> StreamingResponse:
    _enforce_request_policy(payload, request)
    conversation_id = payload.conversation_id or str(uuid4())
    retrieved = knowledge_base.search(payload.question, settings.retrieval_limit)
    prompt = build_prompt(payload.question, payload.history, retrieved)

    async def events():
        yield _sse(
            "metadata",
            {
                "conversation_id": conversation_id,
                "model": settings.ollama_model,
                "handoff_recommended": should_handoff_to_human(payload.question),
                "sources": [
                    {"title": item.title, "text": item.text, "score": item.score}
                    for item in retrieved
                ],
            },
        )

        try:
            async for chunk in ollama.stream_generate(prompt):
                yield _sse("token", {"text": chunk})
        except Exception:
            yield _sse("error", {"message": "The local model host is unavailable."})
            return

        yield _sse("done", {"ok": True})

    return StreamingResponse(events(), media_type="text/event-stream")


def _enforce_request_policy(payload: ChatRequest, request: Request) -> None:
    client_key = _client_key(request)
    if not rate_limiter.allow(client_key):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit reached. Please try again shortly.",
        )

    reject_unsafe_question(payload.question, settings.max_question_chars)


def _client_key(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _sse(event: str, data: dict[str, object]) -> str:
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"
