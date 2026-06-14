from typing import Any, Literal

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    question: str = Field(min_length=3, max_length=12000)
    conversation_id: str | None = Field(default=None, max_length=120)
    page_url: str | None = Field(default=None, max_length=500)
    visitor_context: dict[str, Any] = Field(default_factory=dict)
    history: list[ChatMessage] = Field(default_factory=list, max_length=10)


class SourceSnippet(BaseModel):
    title: str
    text: str
    score: int


class ChatResponse(BaseModel):
    answer: str
    conversation_id: str
    model: str
    handoff_recommended: bool
    sources: list[SourceSnippet]
