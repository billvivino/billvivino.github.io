---
layout: post
title: "Everyone Has a Junior Developer Now"
date: 2026-05-17
og_image: "/assets/optimized/everyone-has-a-junior-developer-now.webp"
description: "AI coding agents feel less like senior engineers and more like extremely fast junior developers who make confident assumptions. That changes software development — but maybe not in the way people think."
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
  AI coding agents currently behave less like senior engineers and more like extremely fast junior developers. They generate huge amounts of code quickly, but also make aggressive assumptions that increase review burden, architectural risk, and hidden technical debt.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.avif" type="image/avif" />
  <source srcset="/assets/optimized/everyone-has-a-junior-developer-now.webp" type="image/webp" />
  <img
    src="/assets/optimized/everyone-has-a-junior-developer-now.webp"
    alt="Illustration representing an AI coding assistant acting like a junior developer under supervision"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

I finally spent some real time using AI coding agents directly instead of just talking about them from the sidelines. And my immediate reaction was not:

> “This replaces engineers.”

It was:

> “Everyone now has access to an extremely fast junior developer.”

That sounds impressive until you remember what managing junior developers is actually like. The issue wasn’t that the AI couldn’t produce code. It produced *tons* of code. Rapidly. Confidently. Relentlessly.

The issue was the assumptions.

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

The AI would happily move forward by collapsing uncertainty into guesses.

## AI coding agents optimize for forward motion, not correctness

Human senior engineers usually pause at ambiguity.  
They ask questions like:

* “What’s the actual API contract?”
* “Should this be nullable?”
* “What owns this state?”
* “Is this supposed to fail loudly or silently?”
* “Do we control this type upstream?”

Good engineers are often slower precisely because they resist making assumptions.  
AI agents do the opposite.  
They aggressively resolve ambiguity because stalling looks like failure.

That creates an uncanny experience where the output looks productive while quietly accumulating technical risk underneath.

---

## The real bottleneck wasn’t typing speed anyway

A lot of the AI hype assumes software engineering is fundamentally limited by how quickly humans can write syntax.  
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

This is why using AI coding agents can feel strangely similar to supervising a junior developer:

* they move fast
* they generate volume
* they create momentum
* they occasionally do impressive things
* but you still have to review everything carefully

And critically:

> the review burden does not disappear.

In some cases, it increases.

---

## “But it made me faster”

Sure.  
I think AI absolutely increases local velocity.  
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

## The hidden cost: confidence inflation

One thing I noticed immediately is that AI-generated code often arrives with a level of confidence disproportionate to its correctness.  
That’s dangerous organizationally.  
A weak junior developer usually signals uncertainty visibly.  
AI often does not.  
So companies may accidentally absorb large amounts of:

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

And those are still deeply human judgment problems.

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
And right now, I’m not convinced the underlying LLM technology is precise enough to eliminate that layer.  
At least not yet.

<p class="mt-4">
  Need help stabilizing, rebuilding, or scaling a software system?
  <a href="../contact.html">Drop me a message</a>, and let’s talk about
  your project.
</p>
