---
layout: post
title: "AI Coding Agents Need an Engineering Review Loop"
date: 2026-05-17
og_image: "/assets/optimized/everyone-has-a-junior-developer-now.webp"
description: "AI coding agents can complete substantial work. A context, review, and verification loop turns generated progress into trustworthy software."
---

<style>
  .post-body p {
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }

  .post-body h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .tldr-box {
    background: #fff7d6;
    border-left: 4px solid #f4c542;
    padding: 16px 20px;
    border-radius: 6px;
    margin: 20px 0;
  }

  .blog-img-right {
    max-width: 30%;
    float: right;
    margin-left: 20px;
    margin-bottom: 20px;
    display: block;
  }

  .blog-img-right img {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    height: auto;
  }

  @media (max-width: 768px) {
    .blog-img-right {
      max-width: 100%;
      float: none;
      margin: 20px 0;
    }
  }
</style>

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  Calling an AI coding agent a fast junior developer captures its momentum but
  misses part of the picture. Agents can complete substantial work when they
  receive strong context and feedback. The bottleneck shifts from generating
  code to making assumptions visible, reviewing changes, and verifying that the
  integrated system behaves correctly.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.avif" type="image/avif" />
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.webp" type="image/webp" />
  <img
    src="/assets/optimized/everyone-has-a-junior-developer-now.webp"
    alt="Illustration representing an AI coding assistant working inside an engineering review process"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

When I first spent real time using AI coding agents directly, my immediate reaction was not:

> “This replaces engineers.”

It was:

> “Everyone now has access to an extremely fast junior developer.”

That comparison described the experience of receiving a large amount of implementation quickly and then finding assumptions I needed to inspect. It was useful as a first reaction, but it is not a complete model for what coding agents can do.

The agent could trace code, propose changes across several files, write tests, and revise its work after feedback. It also filled gaps in the prompt with plausible choices. The important distinction was not junior versus senior. It was generated progress versus verified progress.

The assumptions showed up in details such as:

The loose typing.  
The inferred architecture.  
The invented abstractions.  
The “I’ll just wire this up for you” behavior.

In TypeScript especially, I noticed the same pattern over and over:

```ts
const response: any = await fetchData();
```

Or:

```ts
function process(data: any) {
```

Or entire assumptions about backend response shapes that were never specified.

When necessary context was absent, the agent sometimes kept moving by turning uncertainty into an unverified decision.

## Ambiguity becomes part of the implementation

Experienced engineers learn to recognize when ambiguity changes the risk of a feature. They ask questions like:

* “What’s the actual API contract?”
* “Should this be nullable?”
* “What owns this state?”
* “Is this supposed to fail loudly or silently?”
* “Do we control this type upstream?”

That pause is not opposition to progress. It is part of establishing what “correct” means.

An agent asked only to finish a feature will reasonably infer missing details. Better prompts, repository instructions, typed contracts, tests, and examples improve those decisions. They do not eliminate the need to expose and verify consequential assumptions.

---

## Context is an engineering input

Coding agents become substantially more useful when the repository makes its expectations legible. Useful context includes:

* API schemas and representative payloads
* architectural boundaries and ownership rules
* commands for tests, builds, and static analysis
* examples of accepted patterns
* explicit security and privacy constraints
* a definition of done tied to observable behavior

This is not documentation written only for AI. It is the same material that helps a new teammate work safely in an unfamiliar system.

The quality of the output reflects both the model and the environment the team gives it. Treating context as part of the engineering system improves human and agent work together.

---

## Review becomes the throughput constraint

AI can generate more candidate changes than a team can responsibly absorb. That makes review capacity a design problem, not a final glance at a large diff.

A useful loop is:

1. Ask for a plan and identify the assumptions that matter.
2. Keep the change small enough to understand.
3. Inspect the diff for contract, state, permission, and failure-path changes.
4. Run targeted tests and the broader checks appropriate to the risk.
5. Exercise the integrated behavior, not only isolated units.
6. Feed failures and corrections back into the next iteration.

The agent can participate in every step. It can explain its plan, identify affected callers, write tests, run checks, and investigate failures. The accountable reviewer decides whether those checks establish enough confidence to merge and release.

---

## The leverage is real

AI has increased my local velocity, especially for:

* boilerplate
* scaffolding
* repetitive transformations
* test generation
* migrations
* documentation
* UI iteration
* small utilities

It can also help with less mechanical work: tracing an unfamiliar code path, comparing implementation options, forming a debugging hypothesis, or checking whether a change is consistent across platforms.

The useful distinction is between:

> generating more code

and

> delivering more verified behavior.

Lines of code, files changed, and tasks completed are weak measures if the integration later creates rework. A better productivity measure includes review time, escaped defects, operational reliability, and whether the next engineer can understand the result.

On a well-instrumented codebase with clear contracts, the gain can be substantial. On a poorly understood system, the first productive use of an agent may be to help create that missing clarity.

---

## Fluent output is not evidence

Generated code can arrive with a level of confidence disproportionate to the evidence available. That creates risk when fluency is treated as verification. A change can look complete while still containing:

* subtly incorrect logic
* fragile assumptions
* fake type safety
* architectural inconsistency
* hidden operational risk

The answer is not to distrust every generated line. It is to require evidence appropriate to the consequence of the change: a type check for one question, a contract test for another, and a staged production rollout for something users or data depend on.

---

## Generation is abundant; ownership is not

AI has lowered the minimum effort required to prototype, scaffold applications, connect APIs, and explore interfaces. That expands who can build and how much a small team can attempt.

Production systems still need someone to own the decisions that the code embodies:

* Which source of truth wins when data conflicts?
* Which failure modes are acceptable?
* Which dependency can the product rely on?
* What must be monitored after release?
* When should the team roll back rather than patch forward?

Agents can analyze these questions and offer strong recommendations. Ownership means a person or team connects the recommendation to business context, validates it, and remains responsible for what happens next.

That is the new bottleneck I see most clearly. Code generation is increasingly available. Context, review attention, and accountable judgment remain finite.

The teams that benefit most will not be the ones that ask agents to generate the largest volume. They will be the ones that build a reliable loop from intent to implementation to evidence.

<p class="mt-4">
  Need help stabilizing, rebuilding, or scaling a software system?
  <a href="../contact.html">Drop me a message</a>, and let’s talk about
  your project.
</p>
