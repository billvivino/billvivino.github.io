# BVT Coding AI Backend

Local-first backend for a self-hosted coding assistant on the Bill Vivino
Technology website.

This is not framed as "we invented a new foundation model." The practical V0 is
an original product and infrastructure layer built around a local open-weight
model:

- custom client-intake workflow
- BVT-specific retrieval corpus
- coding and architecture triage rules
- human handoff logic
- safety boundaries
- evaluation set
- Mac-hosted model runtime
- public API surface for the website

## Core Architecture

```text
billvivinotechnology.com
  -> static portal page

ai.billvivinotechnology.com
  -> Cloudflare Tunnel
  -> FastAPI gateway on MacBook / Mac mini / Mac Studio
  -> local model runtime, initially Ollama
  -> open-weight coding model
  -> BVT retrieval corpus and evals
```

Ollama is a runtime, not the invention. The originality is the full system:
how the assistant reasons about client software questions, what knowledge it
retrieves, when it refuses, when it escalates, and how it runs without depending
on a paid chat API.

## Run Locally

```bash
cd bvt-coding-ai-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
uvicorn app.main:app --host 127.0.0.1 --port 8787 --reload
```

In another terminal, run your local model runtime:

```bash
ollama serve
```

The default model name in `.env.example` is a placeholder. Pick the first real
model after testing what fits the host machine.

## API

- `GET /health`
- `POST /v1/chat`
- `POST /v1/chat/stream`
- `POST /v1/knowledge/reload`

The public website should call the FastAPI gateway, not Ollama directly.

## First Milestone

1. Pick one local coding model that runs acceptably on the Mac host.
2. Connect the static portal to `/v1/chat/stream`.
3. Index approved BVT site content into the knowledge folder.
4. Build a 50-question client-intake eval set.
5. Run private alpha through ngrok or Cloudflare Tunnel.
6. Only then decide whether fine-tuning is useful.

## Later Research Track

A tiny from-scratch transformer can be built as a separate lab project for the
case study. It should be presented honestly as a learning artifact, not the
production assistant.
