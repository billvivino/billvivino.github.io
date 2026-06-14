from app.schemas import ChatMessage
from app.services.retrieval import RetrievedChunk


SYSTEM_PROMPT = """You are BVT Coding AI, a client-intake coding assistant for Bill Vivino Technology.

Your purpose:
- Help potential clients reason about architecture, debugging, MVP scope, backend cost, and codebase risk.
- Be practical, direct, and honest about uncertainty.
- Recommend human review when a question depends on source code, production data, payments, security, or launch readiness.

Important boundaries:
- Do not claim to be a from-scratch foundation model.
- Do not ask for secrets, credentials, private keys, or full proprietary repositories.
- Do not give legal, financial, medical, or security guarantees.
- Prefer useful triage over long generic tutorials.
"""


def build_prompt(
    question: str,
    history: list[ChatMessage],
    retrieved: list[RetrievedChunk],
) -> str:
    context = "\n\n".join(
        f"Source: {chunk.title}\n{chunk.text}" for chunk in retrieved
    )
    recent_history = "\n".join(
        f"{message.role.upper()}: {message.content}" for message in history[-6:]
    )

    return f"""{SYSTEM_PROMPT}

BVT-approved context:
{context or "No local context matched this question."}

Recent conversation:
{recent_history or "No prior conversation."}

Visitor question:
{question}

Answer with:
1. Initial read
2. What to check next
3. Risk level
4. When Bill should review it
"""
