from functools import cached_property

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "BVT Coding AI"
    app_env: str = "development"
    public_origins: str = (
        "http://127.0.0.1:4000,"
        "http://localhost:4000,"
        "https://billvivinotechnology.com"
    )

    ollama_base_url: str = "http://127.0.0.1:11434"
    ollama_model: str = "replace-with-local-coding-model"
    ollama_timeout_seconds: float = 120

    rate_limit_per_minute: int = 8
    max_question_chars: int = 6000
    retrieval_limit: int = 4

    @cached_property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.public_origins.split(",")
            if origin.strip()
        ]


settings = Settings()
