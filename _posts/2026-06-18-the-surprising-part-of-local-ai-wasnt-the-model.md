---
layout: post
title: "The Surprising Part of Local AI Wasn't the Model"
description: "Building a self-hosted coding assistant taught me that the biggest challenge isn't running the model. It's understanding the economics and architecture around it."
date: 2026-06-18
categories: ai software-development local-ai
og_image: "/assets/images/local-ai-is-closer-than-most-businesses-realize.png"
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
  Modern local AI models are far more capable than most businesses realize. The surprising challenge isn't getting them to run—it's determining when self-hosting makes economic and operational sense compared to cloud AI.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/local-ai-is-closer-than-most-businesses-realize.avif" type="image/avif" />
  <source srcset="/assets/optimized/local-ai-is-closer-than-most-businesses-realize.webp" type="image/webp" />
  <img
    src="/assets/images/local-ai-is-closer-than-most-businesses-realize.png"
    alt="Self-hosted AI architecture running locally with Ollama, FastAPI, GitHub Pages, and Qwen3-Coder"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

Like many software developers in 2026, I wanted to experiment with putting an AI coding assistant on my website.

The original idea seemed straightforward:

- Host a coding assistant on billvivinotechnology.com
- Let visitors ask technical questions
- Demonstrate AI expertise
- Potentially generate consulting leads

I assumed the difficult part would be the AI.

It wasn’t.

## The First Test: Small Models Aren’t Good Enough

I started with Qwen2.5-Coder 1.5B running locally through Ollama.

It worked.

Technically.

But the quality wasn’t something I would want representing my business.

When I asked it to design healthcare SaaS database schemas or role-based access control systems, it produced simplistic answers and occasionally made obvious mistakes.

The model wasn’t useless.

It just wasn’t good enough.

## The Second Test Changed My Mind

I then tested Qwen3-Coder 30B on my M3 Max MacBook Pro.

The difference was dramatic.

The larger model understood:

- Multi-tenancy
- RBAC architectures
- Audit trails
- Security concerns
- Healthcare-specific requirements
- Real-world software architecture tradeoffs

It wasn’t GPT-5.5.

It wasn’t Claude.

But it felt much closer to talking with a reasonably competent software engineer than a toy chatbot.

That was my first surprise.

Modern local models are significantly better than many developers realize.

## The Hosting Surprise

My original plan was to deploy the model through a cloud GPU provider.

The setup process was straightforward.

Then I hit a requirement I hadn’t fully appreciated: a substantial upfront hosting commitment.

Suddenly the conversation changed.

The technical problem was solved.

The business problem wasn’t.

I found myself asking a different question:

Why am I paying a cloud provider to host a model when I already own a machine capable of running it?

## The Architecture I Ended Up Building

Instead of deploying to a cloud GPU provider, I built the entire stack locally:

```text
Browser
    ↓
GitHub Pages
    ↓
FastAPI
    ↓
Ollama
    ↓
Qwen3-Coder 30B
```

The website runs as a static site.

The AI backend runs separately.

Ollama hosts the model.

FastAPI provides the API layer.

The portal connects through a simple HTTP endpoint.

What surprised me most was how quickly the pieces came together.

Within a single evening I had:

- A local 30B coding model
- A working FastAPI backend
- A browser-based AI portal
- Public access through a tunnel
- Markdown rendering and formatting
- Retrieval-augmented context

The software wasn’t the hard part.

## The Real Question

The interesting question is no longer:

> What model should we use?

The interesting question is:

> What is the total cost of operating AI systems?

For an individual developer, paying for ChatGPT or Claude is easy.

For an organization with dozens or hundreds of employees, the economics become more interesting.

If every engineer relies heavily on AI, subscription and token costs can become meaningful operating expenses.

That’s where local models become attractive.

Not because they’re better.

They’re not.

GPT-5.5 and Claude are still stronger.

The question is whether a local model that delivers most of the value at a fraction of the operational cost is good enough for a specific workflow.

Increasingly, I think the answer is yes.

## The Consulting Opportunity

The opportunity isn’t selling AI chatbots.

The opportunity is helping organizations understand:

- Cloud AI vs local AI
- Token costs vs hardware costs
- Privacy and compliance requirements
- Hybrid architectures
- Operational tradeoffs
- When self-hosting actually makes sense

Many companies will never benefit from local AI.

Others will save substantial amounts of money by moving portions of their workflow to self-hosted models.

The hard part is determining which category a business falls into.

## What I Learned

The biggest takeaway wasn’t that I built a chatbot.

The biggest takeaway was that local AI is much closer than most businesses realize.

Five years ago, running useful AI locally was largely a research project.

Today, a single modern machine can run models capable of producing surprisingly useful software engineering guidance.

The most valuable question is rarely:

> What model should we use?

It’s:

> What is the right architecture for our business?

And those are two very different conversations.
