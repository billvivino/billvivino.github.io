---
layout: post
title: "How I Use AI Coding Agents on Production Systems"
description: "A production account of using AI coding agents with architecture, debugging, review, product context, and human responsibility."
date: 2026-07-09
categories: ai software-development consulting senior-engineering agentic-coding
og_image: "/assets/optimized/human-engineers-thumb.webp"
---

<style>
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
  AI coding agents give every builder more power. In production systems, I combine that leverage with architecture, debugging, review, context, and human responsibility.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/human-engineers-thumb.avif" type="image/avif" />
  <source srcset="/assets/optimized/human-engineers-thumb.webp" type="image/webp" />
  <img
    src="/assets/optimized/human-engineers-thumb.webp"
    alt="Human software engineer reviewing code and guiding AI-assisted development"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

There is a whole genre of videos now on X, YouTube, and TikTok about software developers being sad, anxious, or cynical because "AI is replacing coding jobs."

After spending real time using agentic coding tools inside production software work, my experience is more nuanced.

In these systems, I am not watching access to AI eliminate the need for engineering ownership. I am watching it expose how much judgment consequential software work requires.

I work on enterprise healthcare software and enterprise ERP-style systems. They involve authentication, privacy controls, mobile clients, backend APIs, database migrations, push notifications, role-based access, deployment environments, production bugs, and users who expect the thing to work.

In that world, a reliable production product still has to be verified across all of those boundaries, no matter who generates the first implementation.

AI can generate code, reason across repositories, and save a lot of time. To use that capability on production systems, I surround it with structure, context, instructions, review, debugging, and iterative validation.

That is leverage.

## Production Results Depend on Context and Validation

To make Codex useful, I did not just say, "Build this feature."

We had to set up a whole scaffolding around it.

We added BMAD-style planning and implementation artifacts. BMAD, in this context, is a lightweight method for giving agentic coding tools a more disciplined workflow: project context, story templates, implementation specs, QA checklists, and explicit constraints before the model starts editing files.

That matters because without context, the AI makes assumptions.

And even with context, it still makes mistakes.

It edits the wrong file. It invents call sites. It picks the wrong abstraction. It writes tests that prove very little. It misunderstands backend contracts. It assumes endpoints exist. It confuses iOS and Android sessions. It produces code that compiles in its imagined world but not in the actual repo.

More than once, the work was not "AI wrote the feature." The work was:

- I wrote the ticket.
- I constrained the scope.
- I reviewed the plan.
- I corrected the plan.
- I told it not to overbuild.
- I inspected the diff.
- I ran the app.
- I used the breakpoint debugger.
- I checked network responses.
- I found the actual cause.
- I deleted or corrected bad assumptions.
- I made sure the code matched the product reality.

That is senior engineering work.

## The Debugger Still Matters

One of the clearest examples was push notifications.

The iOS app was successfully generating an FCM token. The backend was storing it. Everything looked superficially close.

But notifications still were not arriving.

The answer was not obvious from staring at generated code. We had to trace the system:

- iOS APNS registration
- Firebase token timing
- backend token upload
- database rows
- backend send function
- Firebase Admin initialization

Eventually, the real issue was that the backend Firebase Admin client was not initialized because the service account credentials were missing. The function reached the send path but exited because `fcm` was null.

That kind of failure requires tracing the actual system rather than judging a generated diff in isolation.

You need someone who understands the system well enough to ask: Where does the token come from? Where is it stored? Where is it sent? Is Firebase actually configured? Is the catch block even relevant if the SDK returns per-token failures instead of throwing?

The same thing happened with Android profile images.

The DTO was eventually correct. The image URL resolved. Coil attempted to load it. But it failed with:

```text
HTTP 401: Unauthorized
```

That told us the image endpoint required the authenticated session cookie. The fix was not "make the URL better." The fix was to attach the cookie from the app's authenticated cookie jar to the Coil image request.

That is production debugging, whether the work is AI-assisted or not.

## High Throughput Shifts More Work Into Review

It is tempting to assume that AI simply reduces labor.

Sometimes it does.

But sometimes it shifts labor into supplying context, reviewing a high volume of output, and verifying behavior the model cannot observe directly.

It can generate code quickly, but speed is not the same as correctness. The faster unverified code appears, the more important review becomes.

In recent production work alone, we dealt with:

- incorrect assumptions about whether uploads required cookies
- confusion between iOS and Android behavior
- wrong call-site signatures
- unwanted upload scope when display-only parity was enough
- React crashes from string dates being treated as Date objects
- backend Firebase credentials silently missing
- local-only privacy toggles needing real persisted settings
- mobile clients needing exact backend contract parity

None of that is solved by code-generation speed alone.

The hard part is deciding what code should exist.

## Senior Engineering Is More Than Code Generation

This is the deeper point.

Code generation is only one part of building a product people can depend on.

You do not hire a senior engineer because they can type syntax. You hire them because they can make the product reliable under real constraints.

They can find the actual bug instead of the plausible bug.

They can tell when a test is fake rigor.

They can stop an agent from turning a small fix into a sprawling refactor.

They can recognize when a mobile app is out of parity with the backend.

They can distinguish "the upload URL is wrong" from "the authenticated image request is missing cookies."

They can say, "No, do not implement upload yet. First restore display parity."

They can decide where risk belongs.

That judgment is the job.

## AI Is Table Stakes. Experience Still Compounds.

Agentic coding tools are useful. I am not dismissing them. I am using them heavily.

But the way they are useful is not the way social media often presents them.

AI gives a founder or newer builder the ability to create far more software than before. Senior engineers have access to the same tools and can use them to cover more surface area, inspect more options, generate scaffolding faster, and move through implementation details with less friction.

Both baselines rise. They do not become equal, because architecture, debugging instincts, product context, and production experience still shape how the tool is directed and how its output is judged.

The leverage comes from combining the tool with the person directing it.

An agent can help surface what matters when it receives the right context. The people responsible for the product still have to supply or confirm the business intent, validate unsupported assumptions, and recognize when code is technically working but wrong for the product.

## About the OpenClaw-Style Counterexample

There are impressive public examples of autonomous agent systems. [OpenClaw](https://openclaw.ai/), for example, is described by its own project as a personal AI assistant that runs on user devices and works across channels like macOS, iOS, Android, and messaging interfaces.

But even those examples do not prove that production software can simply be one-shotted without engineering oversight. Reporting around OpenClaw has emphasized scale, cost, agents, infrastructure, and operational complexity rather than "a non-engineer typed one prompt and shipped a reliable enterprise product." [One report](https://www.tomshardware.com/tech-industry/artificial-intelligence/openclaw-creator-burns-through-1-3-million-in-openai-api-tokens-in-a-single-month) described a month with hundreds of billions of tokens, millions of requests, and around 100 autonomous coding agents involved.

That is an enormous engineering system, not evidence that access to AI has erased the need for experience.

In examples like this, greater capability arrives with automation, orchestration, review, security concerns, context management, and responsibility for the people directing the system.

## The Future Changes Engineering

Developers who understand systems, debug production behavior, manage complexity, define scope, review AI output, and protect product quality can apply those skills with much greater reach.

Software engineering is not uniquely exposed to AI. Law, medicine, architecture, surveying, analytics, and other knowledge professions are all gaining tools that can perform more of their work. The grounded pattern across those fields is greater human leverage paired with continued human responsibility.

AI changes the work. It does not remove the need for judgment.

In my experience, it has made senior engineering feel less like typing and more like directing a high-throughput development partner whose work still has to be validated.

That is powerful.

But it is not replacement.

It is leverage.
