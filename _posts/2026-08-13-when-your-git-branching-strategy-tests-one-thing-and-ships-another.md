---
layout: post
title: "When Your Git Branching Strategy Tests One Thing and Ships Another"
date: 2026-08-13
author: Bill Vivino
categories: [Software Development, Software Engineering, Git, Release Engineering]
og_image: "/assets/optimized/git-branching-tests-one-thing-ships-another.webp"
tags:
  - Git branching strategy
  - release engineering
  - integration testing
  - quality assurance
  - feature branches
  - trunk-based development
  - feature flags
description: "A Git workflow can pass QA on develop and ship a different main-based tree. Preserve feature isolation while testing the actual release candidate."
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

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  If QA tests a feature combined with develop, then production receives that feature rebased onto a newer main, approval does not cover the source tree being shipped. Keep the canonical feature branch clean, use temporary integration candidates, and validate the exact main-based release candidate.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/git-branching-tests-one-thing-ships-another.avif" type="image/avif" />
  <source srcset="/assets/optimized/git-branching-tests-one-thing-ships-another.webp" type="image/webp" />
  <img
    src="/assets/images/git-branching-tests-one-thing-ships-another.png"
    alt="A source-control graph splitting into a QA-approved integration artifact and a different main-based production artifact"
    width="420"
    height="224"
    loading="lazy"
    decoding="async"
  />
</picture>

There is a Git branching pattern that sounds reasonable when you first hear it:

1. Create a feature branch from main.
2. Build the feature.
3. Merge or rebase it into develop for integration testing.
4. Once QA approves it, return to the feature branch.
5. Rebase the feature onto the latest main.
6. Open a PR containing only that feature into main.

The motivation is understandable.

develop provides a shared environment where multiple pieces of work can interact. But when it is time to release, you don’t want every unfinished change sitting on develop to ride along with the feature that passed QA.

So develop becomes the laboratory, while the original feature branch becomes the release vehicle.

There is just one fundamental problem:

> The code you tested is not necessarily the code you ship.

## Two Different Source Trees

Suppose a feature starts from main:

```
main
  \
   F1 -- F2
```

Meanwhile, other work is accumulating on develop:

```
main
  \
   D1 -- D2 -- D3
```

To test the feature, the two histories are combined:

```
develop + feature
```

QA is therefore testing something conceptually equivalent to:

```
main + D1 + D2 + D3 + F1 + F2
```

Everything looks good.

Now imagine main has changed while testing was taking place:

```
main + M1 + M2
```

The feature branch is rebased onto the latest main:

```
main + M1 + M2 + F1' + F2'
```

That is what gets submitted for production.

But that isn’t what QA tested.

QA tested:

```
main + D1 + D2 + D3 + F1 + F2
```

Production receives:

```
main + M1 + M2 + F1' + F2'
```

The feature may be logically identical. The surrounding system isn’t.

That distinction matters.

## A Rebase After QA Creates a New Release Candidate

Rebasing is sometimes treated as Git housekeeping.

In this situation, it isn’t.

If a branch is rebased after testing, the resulting commit graph represents a new candidate for release. Conflicts may have been resolved differently. Dependencies may have changed. APIs may have evolved. Surrounding code may now behave differently.

And none of this requires a Git conflict.

Consider a function whose signature hasn’t changed, but whose behavior has. Git happily applies the feature commit. The compiler is happy. Yet the interaction that QA previously verified is different.

This leads to a useful release-engineering principle:

> If the code changes after QA, you have a new release candidate.

That doesn’t necessarily mean repeating an entire manual regression cycle. It does mean the final main-based candidate deserves automated validation, targeted smoke testing, and appropriate integration testing.

QA approval should ultimately correspond to a particular release candidate—not merely to a feature name.

## Rebasing Onto develop Makes the Problem Worse

There is another subtle danger.

Suppose the canonical feature branch itself is rebased onto develop before testing.

Originally:

```
main
  \
   F1
```

And:

```
main
  \
   D1 -- D2
```

After rebasing the feature onto develop, its ancestry becomes conceptually:

```
main
  \
   D1 -- D2 -- F1'
```

The feature branch no longer represents simply:

```
main + feature
```

It represents:

```
main + develop changes + feature
```

Now someone wants to return that branch to main while preserving “only the feature.”

That requires Git history surgery.

It can be done. rebase --onto, cherry-picking, or careful commit-range manipulation can reconstruct the desired branch.

But the workflow has created a problem that Git now has to solve.

A safer rule is much simpler:

> Never modify the canonical feature branch merely to test it in an integration environment.

Keep the feature branch clean.

## The Hidden Dependency Problem

The more serious problem isn’t Git history. It’s software behavior.

Imagine develop contains Feature A:

**Feature A:**
Adds a database column.

Your Feature B contains:

**Feature B:**
Reads the new database column.

Feature B is deployed to the integration environment.

Everything works.

QA approves it.

Then the team follows the isolation strategy: only Feature B gets rebased onto main and released.

Production doesn’t have Feature A.

The feature that passed every integration test can now fail immediately.

The integration environment accidentally concealed an undeclared dependency.

This becomes especially dangerous in systems involving multiple layers:

```
Database
   ↓
Backend API
   ↓
Web application
   ↓
Mobile applications
```

A mobile change might pass because the integration backend contains an unreleased API change.

A backend feature might pass because an unreleased migration already exists.

A UI might work because another pending feature changed permissions or configuration.

Testing on a shared develop branch proves:

> This feature works with the current contents of develop.

It does not prove:

> This feature works independently on the current contents of main.

Those are different claims.

## Integration Testing Can Produce False Negatives Too

Shared integration branches don’t only hide problems.

They can create them.

Suppose Feature A introduces a regression into develop.

Feature B is perfectly valid when applied to main, but its QA tests fail because Feature A broke something nearby.

Now Feature B is blocked by code that isn’t part of Feature B and isn’t intended to ship with it.

So a permanently shared develop environment can produce both:

* False confidence: another feature supplies something your feature secretly requires.
* False failures: another feature breaks something your feature doesn’t actually affect.

This makes debugging harder because “Does Feature B work?” becomes entangled with “What happens to be deployed on develop today?”

## Duplicate Logical Commits Create Another Problem

There is also a Git-history consequence.

Suppose a feature is merged into develop:

```
develop: F1
```

Then its original branch is rebased onto a newer main:

```
main: F1'
```

F1 and F1' may represent essentially the same logical change, but they are different Git commits with different hashes.

Later, someone synchronizes main and develop.

Git now has to reconcile two histories containing different representations of the same work.

Repeat this across dozens of features and the repository can accumulate:

* Duplicate logical changes.
* Confusing merge bases.
* Repeated conflicts.
* Difficult PR comparisons.
* Hard-to-explain commit histories.
* Uncertainty about which version of a feature was actually tested.

The branching strategy begins requiring increasingly sophisticated Git operations simply to maintain itself.

That’s usually a warning sign.

## Preserve the Goal, Change the Mechanics

The original goals are good:

Goal 1: Test features alongside other work.

Goal 2: Don’t release unrelated unfinished work.

We don’t need to abandon either.

Instead, separate the feature branch from the integration artifact.

Start with:

```
main
  \
   feature
```

Keep that feature branch based on main.

For integration testing, create a temporary composition:

```
develop
   \
    qa/feature
       +
     feature
```

Or conceptually:

```
main ─────────────── feature
  \
   develop ───────────────\
                           integration candidate
feature ──────────────────/
```

Now the integration candidate can contain all the messy shared state necessary for testing.

The canonical feature branch doesn’t.

If integration testing discovers a bug, fix it on the feature branch:

```
feature
   ↓
fix
   ↓
rebuild integration candidate
   ↓
retest
```

Don’t make unique fixes directly on the integration branch.

That ensures every meaningful feature change remains part of the branch that will eventually ship.

## Then Test the Actual Release Candidate

After integration testing succeeds, update the feature against the latest main:

```
latest main
    \
     feature
```

Now run validation against that exact candidate.

Depending on the risk of the change, that could include:

* Unit and integration tests.
* Build validation.
* Database migration tests.
* API compatibility tests.
* Targeted manual smoke testing.
* End-to-end tests.
* A final diff review.

The important question is:

> Have we tested the tree we’re actually proposing to merge?

If the answer is yes, the release process has a much stronger guarantee.

## Sometimes the Features Shouldn’t Be Separate

There is an even deeper lesson hidden in the dependency problem.

Suppose Feature B genuinely cannot work without Feature A.

Trying to preserve a “strict Feature B only” production PR may be the wrong goal.

Those features form a release unit.

An integration or epic branch can express that honestly:

```
main
  \
   release-feature
      ├── Feature A
      ├── Feature B
      └── Feature C
```

Test:

```
release-feature
```

Then release:

```
release-feature → main
```

Now the thing tested is the thing shipped.

This doesn’t mean every related ticket belongs on a long-lived branch. Long-lived branches introduce their own problems and should generally be avoided.

But if several changes truly constitute one atomic production capability, pretending they’re independent doesn’t make the architecture independent.

## What About Feature Flags?

Another approach avoids much of this branch choreography altogether.

Merge frequently into main:

```
feature → main
```

but place unfinished functionality behind feature flags.

Now main can contain:

```
Feature A: disabled
Feature B: enabled
Feature C: disabled
```

The code is integrated continuously without making every integrated capability publicly available.

This is one reason trunk-based development and feature flags are attractive. They move release coordination away from complicated Git ancestry and into explicit product configuration.

Feature flags aren’t free. They require cleanup, testing of flag states, and discipline around migrations and backward compatibility.

But they often scale better than maintaining multiple semipermanent versions of the repository.

## The Broader Principle

Branching strategies are often discussed as Git preferences:

Do we use develop?

Should we rebase or merge?

Should features branch from main?

Those are secondary questions.

The more important question is:

> What does a successful test actually prove about the code we’re about to release?

A good branching strategy should make that answer obvious.

Ideally:

```
BUILD
  ↓
TEST
  ↓
APPROVE
  ↓
SHIP
```

all operate on the same source-tree state—or on artifacts whose equivalence can be demonstrated.

When the workflow instead becomes:

```
build feature
     ↓
transform branch
     ↓
test with develop
     ↓
transform branch again
     ↓
combine with newer main
     ↓
ship
```

every transformation creates another opportunity for the tested and released states to diverge.

Git may execute all of those operations perfectly.

The process can still be wrong.

## A Useful Rule of Thumb

A branching strategy should make the safe path the easy path.

If engineers routinely need to remember:

* Which branch originally forked from which commit.
* Which commits belong exclusively to the feature.
* Whether develop changes should survive a rebase.
* Which commit range needs rebase --onto.
* Whether a dependency on develop has reached main.
* Whether the post-QA rebase requires another round of testing.

then too much release correctness depends on individual Git expertise.

Simpler is usually better:

```
main
  ↓
feature
  ↓
test the candidate
  ↓
main
```

Use temporary integration environments when you need integration.

Use release branches when several changes genuinely form one release.

Use feature flags when code integration and product release need to happen independently.

And whatever model you choose, preserve the most important invariant:

> The closer the code you test is to the code you ship, the stronger your release process becomes.
