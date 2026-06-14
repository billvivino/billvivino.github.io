# Product Thesis

The original part of BVT Coding AI is not that it runs a model locally. Anyone
can run a model locally.

The original part is the opinionated engineering product around the model:

- It understands the kinds of questions potential clients ask before hiring a
  software developer.
- It routes those questions into useful categories: architecture, debugging,
  Firebase cost, MVP scope, codebase risk, backend choice, and launch readiness.
- It retrieves from Bill Vivino Technology's own writing, tools, case studies,
  and engineering philosophy.
- It is evaluated against realistic client questions.
- It knows when the answer should become a paid human review.
- It runs on hardware controlled by BVT, giving the case study a local-first
  hosting story.

## Messaging

Use this framing:

> A self-hosted coding AI portal built with a local open-weight model, custom
> retrieval, custom evaluation, and a client-intake workflow for software
> consulting.

Avoid this framing:

> We made our own LLM.

The second claim only becomes appropriate for a limited research appendix if a
small model is actually trained from scratch and documented as such.

## Practical Build Order

1. Self-host an existing coding model.
2. Add BVT retrieval.
3. Add assistant workflow and handoff rules.
4. Add evals.
5. Add monitoring and rate limits.
6. Consider fine-tuning.
7. Optionally build a tiny from-scratch model lab.
