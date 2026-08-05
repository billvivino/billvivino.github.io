---
layout: post
title: "AI-Assisted Refactoring Works Best in Measured Stages"
description: "I am using AI to refactor the Discover feed in our social media app through measured stages: isolate the bottleneck, preserve behavior, cache safely, and gradually move expensive ranking calculations off the phone."
date: 2026-07-31
permalink: /blog/even-ai-development-benefits-from-engineering/
categories: ai software-development software-engineering mobile-development
tags:
  - AI-assisted development
  - staged refactoring
  - Firebase Cloud Functions
  - mobile performance
  - Discover feed ranking
  - human in the loop software development
og_image: "/assets/optimized/even-ai-development-benefits-from-engineering.webp"
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
    max-width: 34%;
    float: right;
    margin: 0 0 20px 24px;
    display: block;
  }

  .blog-img-right img {
    width: 100%;
    max-width: 420px;
    border-radius: 8px;
    height: auto;
  }

  @media (max-width: 768px) {
    .blog-img-right {
      max-width: 100%;
      float: none;
      margin: 20px 0;
    }

    .blog-img-right img {
      max-width: 100%;
    }
  }
</style>

<h1 class="fw-bold">AI-Assisted Refactoring Works Best in Measured Stages</h1>

<p class="text-muted">July 31, 2026 · 7 min read</p>

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  I am working with AI to refactor the Discover feed in the social media app my brothers and I are building. We are isolating one bottleneck at a time, measuring it on a real device, preserving the current interface, and gradually moving expensive ranking work away from the phone. AI makes each stage faster; iterative validation connects that speed to production evidence.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/even-ai-development-benefits-from-engineering.avif" type="image/avif" />
  <source srcset="/assets/optimized/even-ai-development-benefits-from-engineering.webp" type="image/webp" />
  <img
    src="/assets/images/even-ai-development-benefits-from-engineering.png"
    alt="A generic social media Discover feed improving through staged image loading, ranking calculations, privacy checks, and cloud aggregation"
    width="420"
    height="280"
    loading="lazy"
    decoding="async"
  />
</picture>

I am currently using AI to help refactor the Discover feed in the social media app my brothers and I are building.

The app has a familiar social-discovery problem. It needs to surface posts, people, topics, communities, places, and groups without making somebody wait while the phone searches, sorts, scores, filters, and loads every image at once.

From the outside, that can sound like one prompt:

> Make Discover faster.

Inside a real product, that is not one problem.

It is a sequence of performance, data, privacy, caching, ranking, and product-semantics decisions. AI can inspect the code and implement changes quickly, but the work still benefits from the same discipline I would apply without AI: form a hypothesis, isolate a variable, measure the result, and preserve everything that is outside the experiment.

That is how we are approaching the refactor now.

## The First Refactor Is Intentionally Small

The current Discover ranking has a concrete inefficiency. While sorting several featured content types, it can rebuild the eligible post pool and its tag-count lookups repeatedly inside the sort path.

A calculation that should happen once can happen many times.

The first refactor does not redesign the ranking formula. It does not change the layout. It does not move the feed to the backend. It does not add a new recommendation system.

It does three narrow things:

1. Build the privacy-eligible post set once.
2. Calculate the content tag counts once.
3. Reuse those finished inputs throughout the existing ranking.

Even the internal naming matters. The code called the set `visiblePosts`, but that did not mean posts physically visible on the screen. It meant the eligible, image-bearing posts already loaded into the app's memory. Renaming the concept to something like `eligibleDiscoveryPosts` makes the boundary harder to misunderstand the next time the code changes.

This is not the final architecture.

It is the smallest change that removes known repeated work without changing what users see.

## We Tested the Image Hypothesis Separately

Before touching the ranking calculation, I noticed that switching back to the Top view could take almost a second on a real device.

It was tempting to assume the scoring code was responsible. It was also possible that Top was simply trying to put too many images on the screen in one frame.

So we tested one variable.

We kept the exact layout and fixed-size image boxes, but temporarily prevented the Top view from making image requests. We did not change sorting, ranking, animation, or content selection.

The result showed that the image wave was a meaningful part of the delay.

That pointed toward a UX-first loading stage: let the tab switch immediately, preserve the layout with lightweight placeholders, and activate the existing viewport-based image loader just after the interface commits. Images near the viewport can then appear progressively instead of competing with the tab transition.

That experiment did not prove that the calculations were free. It proved that images mattered.

Now the calculation work can be isolated and tested independently.

This is ordinary engineering. AI made it faster to trace the code, add a diagnostic gate, build the app, and prepare the next change. My real-device smoke test still supplied the evidence that decided what to do next.

## The Next Boundary Is a 24-Hour Local Snapshot

Once the repeated calculation is removed, the next stage is not to recalculate Top every time SwiftUI redraws the screen.

The local architecture we settled on is an account-scoped, block-aware snapshot:

* Store the last valid Top result on disk.
* Show it immediately when the app opens.
* Check its age when the app launches or returns to the foreground.
* If it is at least 24 hours old, keep showing the existing result while rebuilding in the background.
* Replace the snapshot atomically only after the new calculation succeeds.

Ordinary new posts do not need to trigger constant rebuilding in this first version.

Privacy changes do.

A logout, account change, block, or unblock must invalidate the snapshot. A scoring-algorithm change should invalidate it as well. Those boundaries prevent one person's cached content from appearing for another account and prevent blocked content from surviving inside an old recommendation result.

The 24-hour rule is not a universal truth. It is a product decision that trades absolute freshness for predictable device work and a faster interface. We can measure it, change it, and eventually replace the source without changing the Discover screen.

## Future Stages Move the Calculation off the Device

The phone is a reasonable place to improve the current algorithm because that is where it already runs.

It is not where a global ranking should live forever.

A future Firebase design can update content-ranking aggregates incrementally when a post, comment, reply, or reaction changes. A Firebase Cloud Function can materialize a compact global Top snapshot, and the app can download the finished result instead of downloading a large feed and rediscovering the same rankings on every device.

The migration can happen without replacing the Discover interface:

1. Keep the current account-scoped 24-hour snapshot on the phone.
2. Improve how its local inputs are calculated.
3. Build and reconcile global discovery aggregates in Firebase.
4. Replace the local calculation source with the Firebase-generated Top snapshot.
5. Continue applying account-specific privacy filtering before returning content.

This is why a staged refactor is valuable. The cache contract and interface can remain stable while the source behind them changes.

## Moving It to Firebase Does Not Erase the Privacy Decisions

It would be a mistake to implement the future version as a large client-side Firestore query that excludes every blocked user.

The filtering should happen inside a Cloud Function.

The function can load the authenticated user's block relationships in both directions: people the user blocked and people who blocked the user. It can exclude those authors before processing posts, comments, replies, reactions, and featured people, then return only safe filtered content to the app.

But global rankings introduce an important distinction.

A blocked user's post or identity should never appear. Their anonymous engagement might still influence a global content score.

Completely removing that influence would require personalized rankings or storing every aggregate contribution by author so it can be subtracted for each request. That is possible, but it is substantially more expensive.

My initial recommendation is therefore explicit:

* Filter blocked identities and content strictly.
* Allow anonymous global aggregate influence initially.
* Preserve the block-aware local snapshot contract.
* Revisit personalized aggregate subtraction only if the product actually requires it.

That is not merely an implementation detail. It defines what “blocked” means inside a ranked social system.

AI can explain the alternatives and write either version. It should not silently choose the product's privacy semantics.

## Why This Refactor Needs Evidence in Stages

A trustworthy refactor has to answer questions that are not all available before measurement:

* Whether the delay came from images, calculations, or both
* Which calculations were repeated unnecessarily
* Which ranking rules must remain identical
* How fresh Top results need to be
* When cached data becomes unsafe
* Which engagement signals are fully available on the device
* Whether blocked users may affect an anonymous aggregate
* When the cost of personalized ranking is justified

Those answers do not all live in the source code.

Some live in runtime behavior. Some live in product policy. Some appear only after a real person uses the app. Some are economic decisions about Firebase reads, writes, function executions, storage, and complexity.

AI can propose an impressive end-state architecture in one response.

That proposal still has to earn its way into the product through evidence.

The work still needs evidence.

## The Better AI Workflow Is a Faster Engineering Loop

I recently wrote about how an AI agent could [improve an app's interface and still break the product](/blog/ai-can-improve-interface-and-still-break-product/). The lesson there was selective adoption: preserve the useful visual work, isolate behavioral risk, and do not mistake a successful build for a preserved interaction.

The Discover refactor is the same lesson applied to performance and architecture.

AI is helping me inspect the hot path, identify repeated work, design cache boundaries, surface privacy consequences, implement narrow changes, and validate them. That is a substantial advantage.

The advantage becomes stronger when it is paired with engineering discipline:

* One hypothesis at a time
* One measurable change at a time
* Real-device verification
* Explicit cache and privacy contracts
* A migration path that preserves the interface
* Honest separation between what exists now and what comes later

AI makes the feedback loop around those habits faster.

It is table stakes: a new builder can take on far more of this work, while a senior engineer can use the same tools to apply architecture, debugging, and production judgment across every stage.

The tool raises both baselines. The difference is still visible in how the stages are designed, measured, and owned.
