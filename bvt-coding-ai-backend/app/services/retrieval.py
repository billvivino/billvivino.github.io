from dataclasses import dataclass
from pathlib import Path
import re


@dataclass(frozen=True)
class RetrievedChunk:
    title: str
    text: str
    score: int


class KnowledgeBase:
    def __init__(self, path: Path) -> None:
        self.path = path
        self._chunks: list[RetrievedChunk] = []
        self.reload()

    def reload(self) -> None:
        text = self.path.read_text(encoding="utf-8")
        self._chunks = self._chunk_markdown(text)

    def search(self, query: str, limit: int) -> list[RetrievedChunk]:
        terms = self._terms(query)
        scored: list[RetrievedChunk] = []

        for chunk in self._chunks:
            haystack = f"{chunk.title} {chunk.text}".lower()
            score = sum(haystack.count(term) for term in terms)
            if score:
                scored.append(
                    RetrievedChunk(title=chunk.title, text=chunk.text, score=score)
                )

        scored.sort(key=lambda item: item.score, reverse=True)
        return scored[:limit]

    def _chunk_markdown(self, text: str) -> list[RetrievedChunk]:
        chunks: list[RetrievedChunk] = []
        title = "General"
        lines: list[str] = []

        for line in text.splitlines():
            if line.startswith("#"):
                self._append_chunk(chunks, title, lines)
                title = line.lstrip("#").strip()
                lines = []
            else:
                lines.append(line)

        self._append_chunk(chunks, title, lines)
        return chunks

    def _append_chunk(
        self,
        chunks: list[RetrievedChunk],
        title: str,
        lines: list[str],
    ) -> None:
        text = "\n".join(lines).strip()
        if text:
            chunks.append(RetrievedChunk(title=title, text=text, score=0))

    def _terms(self, query: str) -> set[str]:
        stop_words = {"and", "for", "the", "that", "this", "with", "what", "when"}
        return {
            term
            for term in re.findall(r"[a-zA-Z0-9_+#.-]{3,}", query.lower())
            if term not in stop_words
        }
