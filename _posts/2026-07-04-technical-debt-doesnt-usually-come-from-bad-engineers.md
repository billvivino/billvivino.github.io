---
layout: post
title: "Technical Debt Doesn't Usually Come From Bad Engineers"
description: "Technical debt often starts when engineering implications never enter the product decision, not when engineers are lazy or careless."
date: 2026-07-04
categories: software-development engineering technical-debt consulting
og_image: "/assets/images/technical-debt-doesnt-usually-come-from-bad-engineers.png"
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
  Technical debt usually starts when the engineering implications of a product decision are ignored, not when engineers are lazy. Deferring work is fine. Pretending the downstream consequences do not exist is what gets expensive.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/technical-debt-doesnt-usually-come-from-bad-engineers.avif" type="image/avif" />
  <source srcset="/assets/optimized/technical-debt-doesnt-usually-come-from-bad-engineers.webp" type="image/webp" />
  <img
    src="/assets/images/technical-debt-doesnt-usually-come-from-bad-engineers.png"
    alt="Software engineer mapping product decisions to downstream technical consequences"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

One of the biggest misconceptions in software is that technical debt comes from lazy engineers.

In my experience, it usually comes from something much more subtle.

It starts when engineering information never actually enters the decision.

## Engineering isn't just implementation

People often think software engineering is about writing code.

It isn't.

A large part of the job is explaining what today's decision implies tomorrow.

When I say:

> "If we do it this way, we'll also need to think about persistence, permissions, synchronization, and edge cases."

I'm not trying to make the project bigger.

I'm trying to describe the decision surface.

The implementation isn't larger because I want it to be.

It's larger because the product now has more states.

Ignoring those states doesn't eliminate them.

It simply means they'll reappear later as bugs.

## Every feature expands the decision surface

Take something that sounds simple:

> "Let's let users rename folders."

Seems straightforward.

Except it isn't.

Questions immediately appear:

- What happens to links that reference the old name?
- Does renaming affect shared folders?
- Do notifications display the new name immediately?
- Is the change synchronized across every logged-in device?
- What happens if two people rename the same folder at once?
- Can users rename system folders?

None of these questions are "extra engineering."

They're part of the feature.

## The dangerous conversation

The conversation often goes like this.

Engineer:

> "If we do X, we'll also have to decide A, B, and C."

Product manager:

> "Let's just do X."

A week later:

> "Why did everyone's bookmarks stop working?"

Or:

> "Why do I still see the old folder name on my phone?"

Or:

> "Why did one user's rename overwrite another's?"

Nothing new happened.

The consequences simply arrived.

## Deferring is good. Ignoring is expensive.

This is the important distinction.

I love deferring work.

Shipping smaller products is almost always the correct decision.

But that's different from pretending a decision has no downstream consequences.

A good engineering discussion looks like:

> "Yes, those implications exist.
>
> We understand them.
>
> We're intentionally accepting that debt until V2."

That's excellent engineering.

The bad version is:

> "Let's not think about those right now."

Eventually, reality thinks about them for you.

## Technical debt is often communication debt

Many software projects accumulate technical debt long before anyone writes bad code.

The debt begins when engineering constraints never become part of the product discussion.

The engineer isn't trying to make the software more complicated.

They're trying to make the invisible parts of the decision visible.

Ignoring those implications doesn't keep the product simple.

It just postpones the conversation until production.
