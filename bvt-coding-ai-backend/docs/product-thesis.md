# Product Thesis

AI is table stakes. Open models give founders, engineers, and product teams
meaningful new implementation power. BVT Coding AI starts with that widely
available capability and connects it to a focused engineering workflow.

Access to the same model does not flatten the difference between novice and
expert. The product applies BVT's accumulated architecture, debugging,
security, and production judgment through retrieval, evaluation, operational
controls, and clear escalation paths:

- It understands the kinds of questions potential clients ask before hiring a
  software developer.
- It routes those questions into useful categories: architecture, debugging,
  Firebase cost, MVP scope, codebase risk, backend choice, and launch readiness.
- It retrieves from Bill Vivino Technology's own writing, tools, case studies,
  and engineering philosophy.
- It is evaluated against realistic client questions.
- It identifies high-stakes questions that need qualified human review.
- It runs on hardware controlled by BVT, giving the case study a local-first
  hosting story.

## Messaging

Use this framing:

> A self-hosted coding AI portal that combines a local open-weight model with
> BVT-specific retrieval, evaluation, client intake, operational controls, and
> high-stakes human review.

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
