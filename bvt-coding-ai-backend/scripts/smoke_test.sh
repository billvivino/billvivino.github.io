#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:8787}"

echo "Health:"
curl -s "${BASE_URL}/health"
echo

echo "Chat:"
curl -s \
  -H "Content-Type: application/json" \
  -X POST "${BASE_URL}/v1/chat" \
  -d '{
    "question": "My Firebase app is getting expensive. What should I check first?",
    "page_url": "http://127.0.0.1:4000/coding-ai-portal.html"
  }'
echo
