---
layout: post
title: "Technical Documentation Must Separate Current and Planned Behavior"
description: "Software documentation becomes dangerous when it mixes current behavior with future plans. Learn how to document product reality, intended changes, known gaps, and implementation status clearly."
date: 2026-07-28
permalink: /blog/current-vs-planned-software-documentation/
categories: software-development technical-documentation ai
tags:
  - software documentation best practices
  - technical documentation
  - product documentation
  - documentation for AI coding agents
  - current vs planned behavior
og_image: "/assets/optimized/current-vs-planned-software-documentation.webp"
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

  .article-table {
    margin: 1.25rem 0;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .article-table table {
    min-width: 680px;
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

<h1 class="fw-bold">Technical Documentation Must Separate What the Product Does From What We Want It to Do</h1>

<p class="text-muted">July 28, 2026 · 7 min read</p>

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  One of the most important software documentation best practices is separating released behavior from intended behavior, known gaps, platform differences, and implementation status. That distinction gives both engineers and AI coding agents reliable context.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/current-vs-planned-software-documentation.avif" type="image/avif" />
  <source srcset="/assets/optimized/current-vs-planned-software-documentation.webp" type="image/webp" />
  <img
    src="/assets/optimized/current-vs-planned-software-documentation.webp"
    alt="Solid current software, planned blueprint architecture, and documentation layers that keep the two states distinct"
    width="768"
    loading="lazy"
    decoding="async"
  />
</picture>

Technical documentation is often treated as an explanation of the software.

In practice, it can describe several different things:

* What the product does today
* What the product is supposed to do
* What the team plans to build
* What an earlier version did
* What someone assumed had already been implemented

Those descriptions may overlap. They are not interchangeable.

The distinction becomes especially important in inherited systems, [multi-platform products](/blog/mobile-app-feature-parity-ios-android/), and AI-assisted development. A human engineer may notice that a document sounds aspirational and verify the behavior in the code. A coding agent may read the same statement as an authoritative description of the existing system and confidently build on top of something that does not exist.

My work has included technical handoff, production maintenance, architecture, documentation, mobile and web delivery, APIs, cloud systems, and inherited codebases. Across those environments, documentation is most useful when it makes the state of the product more legible—not when it makes the roadmap sound finished.

The fundamental rule is simple:

> Documentation should tell the reader whether it describes current behavior, intended behavior, or a known gap between them.

Without that distinction, documentation can become a source of defects.

## Accurate Documentation Can Describe an Imperfect Product

Teams sometimes hesitate to document current behavior because the current behavior is incomplete.

A cancellation workflow may update the record but not yet send a notification. A profile screen may contain a placeholder. A user guide may describe navigation that is only available to certain roles. A planned integration may still depend on manual work.

The temptation is to document the finished vision instead.

That feels cleaner. It may also help stakeholders understand where the product is going.

But a document that describes the intended future as though it already exists is not product documentation. It is an unmarked specification.

The reader cannot tell which parts are safe to rely on.

Accurate documentation does not need to pretend that the product is complete. It can say:

> Canceling an appointment currently updates its status. Automated cancellation notifications are planned but are not yet sent.

That sentence is more useful than either extreme:

> Canceling an appointment sends notifications.

or:

> The cancellation feature is incomplete.

It tells the reader what works, what does not, and where the boundary currently sits.

## Product Documentation and Specifications Have Different Jobs

A product guide answers:

> How does the software behave now?

A feature specification answers:

> How should the software behave after this work is completed?

A roadmap answers:

> Which capabilities does the team intend to pursue?

A gap analysis answers:

> Where does current behavior differ from the intended product?

These artifacts can reference one another, but combining them carelessly creates ambiguity.

Suppose a guide says that canceling an operation sends a notification. The application does not currently send one.

A developer reading the guide has several possible interpretations:

1. The feature exists, and the current behavior is a bug.
2. The guide describes a future requirement.
3. The feature exists on another platform but not this one.
4. The documentation is stale.
5. The notification occurs through a background process the developer has not found.

Until someone investigates, the document has increased uncertainty rather than reducing it.

A small status label can resolve the problem:

* Current behavior
* Planned behavior
* Known gap
* Platform-specific behavior
* Deprecated behavior

The content may remain in one document, but its meaning becomes explicit.

## Current Behavior Is Not Automatically Correct Behavior

There is a risk in moving too far in the other direction.

“Document what the app does” can become an excuse to turn every existing defect into an official rule.

The code may contain accidental behavior:

* A missing permission check
* A notification that was never implemented
* An obsolete route
* A workaround for an old dependency
* Different interpretations across iOS and Android
* A failure state that the interface incorrectly reports as success

Describing current behavior accurately does not mean endorsing it.

Documentation can say:

> **Current behavior:** users with either role can see this control.<br />
> **Intended behavior:** access should depend on the export capability.<br />
> **Status:** authorization-model migration is planned.

That preserves reality without granting it permanence.

The document becomes a map of the system and its direction rather than propaganda for either one.

## Planned Behavior Needs an Implementation Status

Future-facing documentation is valuable.

It helps product leaders, designers, engineers, and stakeholders agree on where the software should go. It can also give coding agents a durable specification instead of leaving product decisions scattered across conversations.

The danger is not documenting future behavior.

The danger is failing to identify it as future behavior.

A planned feature should usually include enough status to answer:

* Has this been approved?
* Is it designed?
* Is it implemented?
* Is it partially implemented?
* Is it available on every platform?
* Is it behind a feature flag?
* Has it been released?
* Is it still only an idea?

“Planned” itself may be too vague.

A behavior that has been approved for the next release is different from a long-term possibility that nobody has scoped.

A simple lifecycle might be:

1. Proposed
2. Approved
3. In implementation
4. Implemented but unreleased
5. Released
6. Deprecated

The exact labels matter less than using them consistently.

## Multi-Platform Products Need a Behavior Matrix

Documentation becomes harder when the product includes web, iOS, Android, backend services, and administrative tools.

A statement such as “users can upload profile images” may be true on one platform and false on another.

It may also conceal several levels of implementation:

* Display an existing image
* Select a new image
* Upload the file
* Update the profile record
* Refresh cached state
* Handle authentication
* Remove or replace the image
* Support the same formats and limits

A useful document should avoid treating a feature as one undivided checkbox.

A compact behavior matrix can show the real state:

<div class="article-table" markdown="1">

| Capability | Web | iOS | Android | Backend |
| --- | --- | --- | --- | --- |
| Display image | Released | Released | Released | Supported |
| Upload image | Released | Planned | Released | Supported |
| Delete image | Not supported | Not supported | Not supported | Not implemented |

</div>

This makes parity gaps visible without requiring readers to infer them from screenshots, tickets, or source code.

It also prevents “implemented somewhere” from becoming “implemented everywhere.”

## Documentation Is Part of the AI Coding Harness

[AI coding agents](/blog/parallel-ai-coding-agents-worktrees/) increase the cost of ambiguous documentation because they can act on it quickly.

An agent asked to implement a feature may search the repository, find a product guide, and treat its statements as current contracts.

That can lead it to:

* Call an endpoint that does not exist
* Assume a notification is already emitted elsewhere
* Preserve a placeholder as intentional
* Build a client around a future response model
* Write tests against planned behavior while labeling a current regression
* “Repair” code that correctly reflects the actual product

AI does not eliminate the need for documentation hygiene.

It turns documentation into executable context.

Repository-local instructions should therefore explain which documents are:

* Descriptive of the released product
* Specifications for future work
* Historical references
* Known-gap inventories
* Platform-specific guides
* Authoritative technical contracts

The agent still needs to inspect the code and tests. But it should not have to guess what kind of truth each document claims to contain.

## Documentation Should Be Verified Against the System

Documentation reviews often focus on grammar, structure, completeness, and readability.

Technical documentation also needs behavioral verification.

For an important workflow, the reviewer should ask:

* Can I reproduce what this document describes?
* Does the route or service exist?
* Do the listed roles actually have access?
* Does the operation persist after refresh?
* Are notifications really sent?
* Is this behavior released on every named platform?
* Does the error path match the guide?
* Is the document describing current or future behavior?

This does not mean manually retesting the entire product whenever one paragraph changes.

It means treating claims about software behavior as claims that should be traceable to evidence.

That evidence may be:

* A released implementation
* An automated test
* An API contract
* A feature flag
* A deployment record
* A product decision
* A linked implementation ticket

The closer the documentation sits to executable evidence, the less likely it is to drift into fiction.

## A Practical Documentation Structure

For products that are actively changing, I prefer a structure with five explicit elements.

### 1. Current behavior

Describe what a user can rely on in the released product.

### 2. Intended behavior

Describe the approved destination when it differs from the current state.

### 3. Known gaps

List incomplete, inconsistent, or platform-specific behavior.

### 4. Implementation status

State whether the change is proposed, approved, in progress, implemented, or released.

### 5. Evidence

Link the relevant test, API contract, release, ticket, or implementation area where practical.

This structure does not require every page to become a project-management system.

It requires the document to reveal what kind of statement it is making.

## Conclusion

Software documentation should reduce uncertainty.

It fails when current behavior, future plans, historical assumptions, and known defects are blended into one confident description of “the product.”

Documenting reality does not mean accepting every current behavior as correct. Documenting the future does not mean pretending it has already arrived.

A strong documentation system preserves both:

* What users and engineers can rely on today
* What the team has deliberately decided to change tomorrow

That distinction becomes critical when several platforms evolve at different speeds and AI agents use repository documents as implementation context.

The question is no longer merely whether the documentation is well written.

It is whether the reader can tell which version of reality it describes.
