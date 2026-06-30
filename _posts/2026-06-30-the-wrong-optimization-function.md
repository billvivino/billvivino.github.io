---
layout: post
title: "The Wrong Optimization Function"
description: "Software projects get into trouble when teams optimize for the cheapest individual feature instead of the engineering investment that creates the greatest operational improvement."
date: 2026-06-30
categories: software-development consulting operational-software
og_image: "/assets/images/the-wrong-optimization-function.png"
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
  Software projects do not fail because cost matters. They get into trouble when cost becomes the objective instead of a constraint, and teams optimize for cheap implementation instead of operational value.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/the-wrong-optimization-function.avif" type="image/avif" />
  <source srcset="/assets/optimized/the-wrong-optimization-function.webp" type="image/webp" />
  <img
    src="/assets/images/the-wrong-optimization-function.png"
    alt="Workflow board showing a cheap local optimization creating an operational bottleneck and a better system-level software workflow"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

One of the biggest mistakes I see in software projects isn't bad code.

It isn't bad architecture.

It isn't even a lack of engineering talent.

It's optimizing the wrong objective.

Every software project has constraints. Time matters. Budget matters. Deadlines matter. Nobody has infinite resources.

But over the years I've noticed something that happens surprisingly often.

A conversation begins with:

> "What's the cheapest way to implement this feature?"

That sounds reasonable.

Until you realize it may be the wrong question.

## Local Optimization vs. System Optimization

Imagine someone asks for delete permissions.

A local solution might be:

> "Only three administrators can delete."

It's inexpensive.

It solves today's problem.

But what happens next?

A technician accidentally creates the wrong hierarchy.

Now they can't fix it themselves.

Every correction requires an administrator.

The software has introduced a new operational bottleneck that didn't exist before.

The engineering problem wasn't actually "Who can delete?"

It was:

* hierarchy lifecycle
* restore workflow
* permissions
* operational ownership
* user autonomy
* data consistency

The delete button was only the visible symptom.

## The Decision Surface

One feature request often expands into an entire subsystem.

What begins as:

> "Can we restore a deleted item?"

quickly becomes:

* restore workflow
* hierarchy consistency
* permissions
* parent/child restoration
* auditability
* user expectations

Good engineering doesn't prematurely collapse that decision surface.

It expands it first.

Only after understanding the relevant constraints does it begin optimizing.

## Cost Is a Constraint, Not the Objective

Engineering cost absolutely matters.

Ignoring cost isn't responsible.

But minimizing engineering cost is not the same thing as maximizing return on investment.

Those are different objective functions.

If optimizing for lower engineering cost creates additional manual work, operational bottlenecks, confusing workflows, or reduced adoption, then the software may actually produce less business value despite costing less to build.

Sometimes spending another week on a workflow saves thousands of hours over the next several years.

Sometimes it doesn't.

The point is that you cannot answer that question until you've understood the entire operational problem.

## Operational Software Is Different

This distinction becomes especially important when software is replacing an existing operational workflow.

A startup searching for product-market fit is trying to answer:

> "Should this product exist?"

An internal operational system is answering a different question:

> "How do we improve an existing business operation?"

Those are different engineering disciplines.

When software becomes part of the company's daily operations, it succeeds or fails based on how well it supports those operations.

Not how cheaply each individual feature was implemented.

## The Wrong Optimization Function

I don't believe software projects fail because people care about cost.

Every responsible business should.

I think projects get into trouble when cost becomes the primary objective instead of one of the constraints.

The question shouldn't be:

> "What's the cheapest way to build this feature?"

The question should be:

> "What engineering investment creates the greatest operational improvement, given our budget?"

Those sound similar.

They're not.

One optimizes engineering cost.

The other optimizes business value.

That difference changes nearly every engineering conversation.

## Final Thought

Cheaper engineering isn't a moat.

Beautiful architecture isn't a moat either.

Operational software creates value when it faithfully improves the way people work.

Engineering should optimize for that outcome first.

Everything else, including cost, should be evaluated in service of that objective, not instead of it.
