---
layout: post
title: "AI Makes Code Generation Cheap. Review Is the Bottleneck."
date: 2026-05-17
og_image: "/assets/optimized/everyone-has-a-junior-developer-now.webp"
description: "AI coding agents give everyone a high-throughput development partner. As generation accelerates, context, review, and accountable validation become the bottleneck."
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
  AI coding agents give everyone a high-throughput development partner. They raise the amount of software any person can produce, while shifting more of the bottleneck into context, review, architecture, and accountable validation.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.avif" type="image/avif" />
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.webp" type="image/webp" />
  <img
    src="/assets/optimized/everyone-has-a-junior-developer-now.webp"
    alt="Illustration representing a high-throughput AI coding partner working inside an engineering review process"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

When I first spent real time using AI coding agents directly, my immediate reaction was not:

> “This replaces engineers.”

It was:

> “Everyone now has access to a high-throughput development partner.”

That is a meaningful change. The AI produced *tons* of code—rapidly and confidently. It lowered the barrier to implementation and let me explore more possibilities in less time.

It also made assumptions that needed review.

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

When necessary context was absent, the agent sometimes moved forward by turning uncertainty into unverified assumptions.

## AI coding agents often optimize for forward motion

Experienced engineers learn to recognize when ambiguity matters.
They ask questions like:

* “What’s the actual API contract?”
* “Should this be nullable?”
* “What owns this state?”
* “Is this supposed to fail loudly or silently?”
* “Do we control this type upstream?”

That pause is not resistance to progress. It is part of establishing what "correct" means.
An AI agent asked only to move a feature forward will often infer missing details and keep going. Better instructions, tests, and project context can improve that behavior, but the assumptions still need to be visible and verified.

The output can look productive while technical risk remains underneath.

---

## The real bottleneck was not typing speed

Many AI productivity claims focus on how quickly people can generate syntax.
But in most professional systems, that isn’t the bottleneck.  
The bottlenecks are things like:

* understanding unclear business rules
* navigating legacy architecture
* discovering hidden edge cases
* coordinating with stakeholders
* maintaining consistency across systems
* validating assumptions
* understanding operational consequences
* resisting fragile shortcuts

The actual act of typing code is often the easy part.

This is why the review loop matters even when an AI coding agent is moving quickly:

* they move fast
* they generate volume
* they create momentum
* they can solve substantial problems
* consequential changes still need careful review

And critically:

> the review burden does not disappear.

In some cases, it increases.

---

## It Made Me Faster

AI absolutely increases local velocity.
Especially for:

* boilerplate
* scaffolding
* repetitive transformations
* test generation
* migrations
* documentation
* UI iteration
* small utilities

But there’s a difference between:

> generating more code

and

> safely shipping more systems.

Those are not the same thing.

If an engineer now spends less time typing but more time auditing AI assumptions, validating architecture, correcting types, and unwinding bad abstractions, the net productivity gain may be much smaller than people expect.  
Especially on large production systems.

---

## The hidden cost: unverified confidence

One thing I noticed immediately is that AI-generated code can arrive with a level of confidence disproportionate to the available evidence.
That creates organizational risk when fluent output is treated as verified output.
Companies may accidentally absorb large amounts of:

* subtly incorrect logic
* fragile assumptions
* fake type safety
* architectural inconsistency
* hidden operational risk

while believing development speed has permanently accelerated.  
The code looks finished sooner than it actually is.

---

## This changes the floor more than the ceiling

I do think AI changes the industry significantly.  
But maybe not in the way many people think.  
The biggest impact may be:

> the minimum capability level required to produce software has dropped dramatically.

Everyone can now prototype.  
Everyone can scaffold apps.  
Everyone can connect APIs.  
Everyone can generate interfaces.

That matters.  
But high-trust engineering environments are not built around prototypes.  
They’re built around:

* reliability
* maintainability
* operational stability
* correctness
* risk management
* long-term architecture

And those still benefit from human judgment and accountability.

---

## The irony: good engineers may become more valuable

Ironically, if AI continues generating large quantities of plausible-but-imperfect code, then the ability to:

* detect bad assumptions
* enforce architectural consistency
* identify hidden edge cases
* maintain system integrity
* review critically

may become even more valuable than before.  
Because now the limiting factor is no longer:

> “Who can produce code?”

It becomes:

> “Who can correctly judge the code being produced?”

That’s a very different skill.  
AI is table stakes. A founder with AI can build far more than before, and a senior engineer with access to the same AI can apply years of architecture, debugging, and production judgment at greater scale. Both baselines rise; they do not become equal.

The same pattern appears across law, medicine, architecture, analytics, and other knowledge professions. AI increases individual power, while people remain responsible for deciding what the output means and whether it is ready to use.

<p class="mt-4">
  Need help stabilizing, rebuilding, or scaling a software system?
  <a href="../contact.html">Drop me a message</a>, and let’s talk about
  your project.
</p>
