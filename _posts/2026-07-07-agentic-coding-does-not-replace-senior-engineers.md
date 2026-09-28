---
layout: post
title: "Using Coding Agents to Trace a Change Across a Codebase"
description: "How I use coding agents to investigate dependencies, compare mobile clients, and identify contract mismatches before deciding what to change."
date: 2026-07-07
last_modified_at: 2026-09-03
permalink: /posts/agentic-coding-does-not-replace-senior-engineers.html
seo_cluster: practical-ai
categories: ai software-development consulting technical-leadership
og_image: "/assets/optimized/agentic-coding-wider-architectural-vision.webp"
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
  Before changing a shared API or business rule, use a coding agent to trace its consumers. Ask for file paths, contract differences, and unanswered questions. Treat that map as an investigation to verify, not permission to rewrite everything it touches.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/agentic-coding-wider-architectural-vision.avif" type="image/avif" />
  <source srcset="/assets/optimized/agentic-coding-wider-architectural-vision.webp" type="image/webp" />
  <img
    src="/assets/optimized/agentic-coding-wider-architectural-vision.webp"
    alt="Senior software engineer directing AI coding agents across an architecture map of code, APIs, databases, tests, and app clients"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

One of the most useful things I can ask a coding agent is: "What else depends on this?"

That question matters when a feature crosses a backend, a web app, and mobile clients. The file in front of me may be correct while another consumer still relies on a different assumption. I use agentic tools to widen that investigation before deciding where a change belongs.

This is an investigation workflow, not a case study with a measured time saving. Its value is in making the dependencies and uncertainties visible enough to review.

## Start with One Rule or Flow

"Review the architecture" is a broad request. I get a more useful starting point from a question with a boundary:

- Find all places where this status is interpreted.
- Compare the iOS and Android behavior for this flow.
- Show the API response shapes this screen depends on.
- Look for places where null might be treated differently from false.

For a shared status change, a useful investigation request is:

> Trace where this status is written, returned by the API, and interpreted by each client. Report the relevant file paths and differences in behavior. Separate confirmed findings from assumptions. Do not edit files yet.

The last sentence keeps discovery separate from implementation. Finding a related file does not mean it needs to change.

## Follow the Contract Across Its Consumers

The questions change as the investigation moves through the system:

- **Storage:** Is the default enforced, or is a caller merely assuming it?
- **API:** What values can the response actually contain? Where is the business rule enforced?
- **Clients:** Do web, iOS, and Android interpret those values the same way?
- **Tests:** Which expected behaviors are covered, and which assumptions remain unchecked?

For example, if one client treats a missing value as false and another displays an unknown state, matching their variable names will not resolve the difference. Someone has to decide what the missing value means for the product. The difference may be a defect, or it may be intentional.

This is where broad code search helps me. I can compare implementations and follow dependencies without relying only on my memory of where a feature was built.

## Ask for Evidence You Can Inspect

A useful report connects each claim to a location in the code. "The clients are inconsistent" is not enough; I need to see the response definition and the branches that interpret it.

I would expect the investigation to leave me with:

- The producer and known consumers of the value.
- The specific behavior that differs between them.
- The product decision needed to resolve that difference.
- The tests or runtime checks still needed to verify the finding.

An agent can miss an indirect consumer or misunderstand a branch. A convincing summary is a starting point for review, not proof that the dependency map is complete.

## Decide What Should Change Before Expanding the Patch

The investigation may uncover duplication, an old workaround, and an actual release blocker in the same area. Those findings do not automatically belong in one patch.

I still have to account for product intent, deployment risk, and the reason a compromise exists. Sometimes the right decision is a narrow fix and a separate ticket for the deeper architectural problem. Sometimes two flows should remain different.

My [AI-assisted code review guide](/posts/ai-doesnt-replace-senior-engineers-it-expands-their-reach.html) covers the next decision: how to review a proposed change and its verification before it ships.

## Know When the Code Map Is Not Enough

Source inspection cannot answer every operational question. A response shape can be correct while a request lacks authentication. A send function can exist while its service client was never initialized.

I describe those two concrete failures in [debugging Firebase notifications and Android image loading](/posts/ai-has-not-replaced-senior-developers.html). They required following runtime evidence, not just locating the expected code.

For me, the benefit of a coding agent here is a wider field of view. The useful outcome is a better-founded change decision, including a clear account of what I have not verified yet.
