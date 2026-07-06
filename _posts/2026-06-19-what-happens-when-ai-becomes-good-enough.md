---
layout: post
title: "What Happens When AI Becomes Good Enough?"
description: "The most important question in AI may no longer be who has the best model. It may be whether local models become good enough to change the economics entirely."
date: 2026-06-19
categories: ai software-development economics
og_image: "/assets/optimized/local-ai-idea.webp"
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
  AI does not need to be the best model in the world to disrupt the market. It only needs to become good enough that businesses start questioning whether they should keep paying recurring AI subscription costs.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/local-ai-architecture.avif" type="image/avif" />
  <source srcset="/assets/optimized/local-ai-architecture.webp" type="image/webp" />
  <img
    src="/assets/optimized/local-ai-architecture.webp"
    alt="Local AI architecture using FastAPI, Ollama, and Qwen running on developer-owned hardware"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

For most of the past few years, the AI conversation has focused on a single question:

> Which model is best?

GPT.

Claude.

Gemini.

Whatever comes next.

Every benchmark, every launch, and every announcement is treated as a race to determine who sits at the top of the leaderboard.

But I think an entirely different question is starting to emerge.

> What happens when local AI becomes good enough?

Not the best.

Good enough.

Those are very different standards.

## The History of Computing

We’ve seen this movie before.

Early computing required centralized infrastructure.

Then personal computers arrived.

The personal computer wasn’t initially better than the mainframe.

It didn’t need to be.

It only needed to be useful enough that people preferred owning their own machine.

The same thing happened with photography.

Digital cameras weren’t initially better than film.

Smartphone cameras weren’t initially better than dedicated cameras.

Yet eventually they became good enough.

And once they crossed that threshold, the economics changed.

## The Wrong Question

When businesses evaluate AI today, the conversation usually sounds like this:

> Which model gives the best answer?

That’s an important question.

But it’s not the only question.

The equally important question is:

> What does the answer cost?

A software engineer paying for ChatGPT Pro probably doesn’t care.

A company with:

- 20 engineers
- 50 engineers
- 100 engineers

starts looking at the math differently.

At some point the conversation shifts from:

> Which model is best?

to:

> Why are we paying this much every month?

## My Local AI Experiment

Recently I built a local AI coding assistant.

The architecture was surprisingly simple:

```text
Browser
    ↓
FastAPI
    ↓
Ollama
    ↓
Qwen3-Coder 30B
```

The entire system ran on my existing laptop.

No cloud GPUs.

No token billing.

No AI subscription costs.

The surprising part wasn’t that it worked.

The surprising part was the quality.

Was it better than GPT-5.5?

No.

Was it better than Claude?

No.

Was it dramatically worse?

Also no.

For many software engineering tasks, the answers were surprisingly competent.

That observation led me to a different question.

## The Good Enough Threshold

Imagine a world where GPT produces a perfect answer.

Now imagine a local model that produces an answer that’s 85% as useful.

Which one wins?

The answer depends on cost.

If the local model costs dramatically less to operate, the comparison changes.

The model no longer needs to be better.

It only needs to be good enough.

For many business workflows, that threshold may already be approaching.

Examples include:

- Internal documentation search
- Ticket triage
- Knowledge base assistants
- Report generation
- Summarization
- Basic software engineering assistance

These are not necessarily frontier AI problems.

They’re operational problems.

And operational problems are often sensitive to economics.

## The Economics Problem

The frontier labs continue pushing the state of the art.

That’s impressive.

The question is whether the economics improve at the same rate.

Many of the largest AI companies are still spending enormous amounts on:

- GPUs
- Data centers
- Training runs
- Inference infrastructure

That investment may be justified.

But it also creates an opening.

Because every improvement in local models changes the economics of the decision.

If a company can solve a workflow with:

- Hardware it already owns
- Data that never leaves the building
- Predictable operating costs

then the conversation becomes much more interesting.

## The Emerging Consulting Opportunity

I don’t think the future is:

> Everyone uses local AI.

I also don’t think the future is:

> Everyone uses cloud AI.

The future is probably hybrid.

Some workloads belong in frontier models.

Others may not.

The interesting problem isn’t building a chatbot.

The interesting problem is determining:

- Which workloads belong where
- What level of quality is required
- What level of cost is acceptable
- What privacy constraints exist
- What architecture makes sense

That’s not an AI problem.

That’s an engineering and business problem.

## The Real Question

The most important question in AI may no longer be:

> Which model is best?

It may be:

> Which model is good enough?

Because once enough businesses start asking that question, the economics of AI could become more important than the benchmarks.

And history suggests that “good enough” technologies have a habit of changing entire industries.
