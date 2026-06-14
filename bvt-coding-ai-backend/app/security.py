import re

from fastapi import HTTPException, status


SECRET_PATTERNS = [
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----", re.IGNORECASE),
    re.compile(r"\b(api[_-]?key|secret|password|token)\s*[:=]\s*\S+", re.IGNORECASE),
    re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
    re.compile(r"\bghp_[A-Za-z0-9_]{20,}\b"),
]

HANDOFF_TERMS = [
    "payment",
    "stripe",
    "production outage",
    "data loss",
    "breach",
    "security audit",
    "hipaa",
    "legal",
    "credential",
    "private key",
    "launch tomorrow",
]


def reject_unsafe_question(question: str, max_chars: int) -> None:
    if len(question) > max_chars:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Question is too large. Limit is {max_chars} characters.",
        )

    for pattern in SECRET_PATTERNS:
        if pattern.search(question):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "Do not submit API keys, passwords, private keys, tokens, "
                    "or other secrets to the assistant."
                ),
            )


def should_handoff_to_human(question: str) -> bool:
    lowered = question.lower()
    return any(term in lowered for term in HANDOFF_TERMS)
