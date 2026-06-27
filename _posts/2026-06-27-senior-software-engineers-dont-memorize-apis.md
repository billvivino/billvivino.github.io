---
layout: post
title: "Senior Software Engineers Don't Memorize APIs"
description: "Senior software engineering is not about memorizing every API. It is about investigating problems, evaluating tradeoffs, and building systems that keep working."
date: 2026-06-27
categories: software-development consulting senior-engineering
og_image: "/assets/images/senior-software-engineers-dont-memorize-apis.png"
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
  Senior engineers are not valuable because they have memorized every framework API. They are valuable because they can investigate unfamiliar problems, evaluate tradeoffs, and turn vague requests into durable software decisions.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/senior-software-engineers-dont-memorize-apis.avif" type="image/avif" />
  <source srcset="/assets/optimized/senior-software-engineers-dont-memorize-apis.webp" type="image/webp" />
  <img
    src="/assets/images/senior-software-engineers-dont-memorize-apis.png"
    alt="Senior software engineer evaluating architecture decisions, tradeoffs, and test checklists instead of memorizing API details"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

One of the biggest misconceptions I still hear about software development is that senior engineers are walking encyclopedias of programming libraries.

> "You're the developer. Don't you know how to do drag-and-drop in React?"

Sometimes the answer is yes.

Many times the answer is:

> "I haven't investigated the best approach yet."

And that's exactly the point.

The job isn't remembering APIs.

The job is making engineering decisions.

When someone asks for drag-and-drop, my thought process isn't:

> Which React package was that again?

It's more like:

- What problem are we actually solving?
- Should the ordering persist?
- Is this presentation only, or business data?
- What's the simplest solution that fits the existing architecture?
- Which implementation is actively maintained today?
- How will this affect testing, future maintenance, and edge cases?

Only after answering those questions do I pick a library.

Ironically, choosing the library is usually the easiest and most forgettable part of the entire feature.

## Not Yet Is Not the Same as No

There is a subtle but important distinction here.

When a senior engineer says:

> I don't know the implementation yet.

That does not mean:

> I do not know how to approach this.

Those are completely different statements.

A solution is not the same thing as a process.

I may not know the exact React drag-and-drop implementation off the top of my head. I may not know which library I would use. I may not know whether the existing data model already supports ordering. I may not know whether the right answer is a library, a native browser API, or a simpler UI change.

But I do know what I would do next.

I would investigate.

That is the engineering approach.

## The Process Is the Skill

For something like drag-and-drop ordering, the process usually looks like this:

1. Understand the user's actual problem.
2. Determine whether the issue is visual, data-driven, or both.
3. Inspect the current architecture.
4. Evaluate implementation options.
5. Prototype the interaction.
6. Integrate the behavior with the backend if the order needs to persist.
7. Harden and test the edge cases.

The framework-specific details usually live in steps four through six.

Those details change.

React libraries change. Browser APIs change. Project constraints change. State management patterns change. Backend contracts change.

But steps one through three are always there.

What is the real user problem?

Is this only presentation, or does it change business data?

What does the current system already support?

Those questions come before the implementation.

## The Invisible Work

Most of software engineering isn't typing code.

It's:

- understanding workflows
- reproducing bugs
- investigating architecture
- evaluating tradeoffs
- selecting approaches
- testing edge cases
- refining the user experience

The implementation is only one step in that process.

## Investigation Is Not Insecurity

Sometimes people hear:

> I haven't investigated it yet.

as:

> I don't know what I'm doing.

But in production software, that is usually backwards.

The more experienced you become, the more careful you get about answering too quickly.

If a bug appears around restored records, deleted data, permissions, or ordering, the responsible answer at the beginning is often:

> I don't know yet.

Then the work begins.

You reproduce it.

You observe what actually happens.

You form a hypothesis.

You trace the data.

You inspect the API.

You find the architectural cause.

That is not hesitation.

That is engineering.

If someone asks, "Do you know how we would do this?" a better answer is:

> Not yet. I would want to investigate it first. The implementation library is usually the easy part. I first want to understand how ordering should behave, whether we need to persist it, and then choose the implementation that fits the architecture.

That answer does not apologize.

It does not pretend to know something prematurely.

It describes the actual work.

## This Is Why Production Software Is Expensive

Version 1.0 often comes together surprisingly quickly.

The real engineering begins once real users start depending on the software.

That's when the hard questions appear.

Not:

> Which library should we use?

Instead:

- What happens when someone restores deleted data?
- How should permissions work?
- How do we migrate existing users?
- What if the workflow changes six months from now?

Those aren't library questions.

They're engineering questions.

## What Clients Are Really Hiring

Clients don't hire senior engineers because we've memorized thousands of APIs.

They hire us because we know how to investigate unfamiliar problems, evaluate multiple approaches, and build systems that continue working long after the first version ships.

That's what software engineering really is.
