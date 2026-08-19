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
  - agentic software development
description: "A merge-only topic graduation workflow is legitimate, but integration QA and production still exercise different complete trees. The final release candidate must be validated."
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
  A feature-graduation strategy can preserve the exact same feature commits across develop and main while still testing and shipping different complete source trees. The critical direction is that develop absorbs the feature; the canonical feature never absorbs develop. Rebasing or replaying the feature after publication creates the avoidable duplicate-history problem. Even with perfect commit preservation, the final main-based candidate still requires validation.
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

Some teams use a merge-only topic-graduation workflow:

1. Create a feature branch from main.
2. Build the feature without incorporating develop.
3. Merge the same feature commits into develop for integration testing.
4. Resolve develop-specific conflicts in the develop-side merge.
5. Merge the unchanged feature commits into main when approved.
6. Validate the resulting main-based release candidate.

This model preserves one canonical feature history. A workflow that instead lets the feature absorb develop and then reconstructs the feature for main creates two independently evolving representations of the same logical change.

The more precise thesis is:

> A feature-graduation strategy can preserve the exact same feature commits across develop and main, yet still test and ship different complete source trees.

Preserving commit identity solves the historical-duplication problem.

It does not make the develop integration tree equivalent to the main release tree.

## This Strategy Has a Legitimate Pedigree

The closest established name for the intended model is a **topic-branch graduation workflow with a testing integration branch**.

For a generic feature, the intended develop-side graph is:

```
          D1────D2────────Mdev       develop
         /               /
A──B──C─┤               /
         \             /
          F1────F2─────             feature branch
```

The feature branch stays based on main. The unchanged `F1` and `F2` commits are merged into develop. If `D1` or `D2` conflicts with `F1` or `F2`, the resolution belongs in `Mdev`, the develop-side merge commit.

Later, the same feature commits go to main:

```
A──B──C────────────Mmain             main
         \         /
          F1───F2─
```

So:

```
develop contains F1 and F2
main contains F1 and F2
```

Develop and main may have different merge commits, different conflict resolutions, and different complete trees. The underlying feature commits retain the same identities.

[Git’s branching and merging documentation](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging.html) describes this exact mechanism: Git performs a three-way merge using the two branch tips and their common ancestor, then records the reconciled snapshot in a merge commit with both histories as parents. If overlapping changes cannot be reconciled automatically, Git pauses so the conflict can be resolved in that merge.

Once that topic has been merged anywhere, it must not be rebased. A rebase would replace the published commits with new commits and new identities.

This is remarkably similar to the workflow described in the [Git project’s own workflow documentation](https://git-scm.com/docs/gitworkflows):

* `next` is used to test topics before they are accepted into `master`.
* A topic can be merged into `next`, tested, and later merged into a more stable branch.
* A topic that has already been merged elsewhere should not subsequently be rebased.
* A separate throwaway integration branch can test combinations of topics.
* An integration branch can periodically be rebuilt from the stable branch and the topics that remain under evaluation.

That explains the rule:

> Merge preserves commit identity; rebase manufactures new commits.

Within this model, that is not an arbitrary Git taboo.

Preserving the feature commits is a central invariant.

## It Is Not Simply “The Strategy Large Companies Use”

The strategy is legitimate.

It is also specialized.

It is not the generic industry default for large software companies, and size alone is not a reason to adopt it.

Other prominent large-scale workflows are considerably simpler:

* [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow) uses a short-lived branch, review and checks, then a merge into the default branch.
* [Microsoft’s release flow](https://learn.microsoft.com/en-us/devops/develop/how-microsoft-develops-devops) uses short-lived topic branches from one buildable main branch, merges them into main, and creates release branches from main. Microsoft says this single-main approach reduces merge debt; the documented workflow supports products processing more than 200 pull requests and 300 continuous-integration builds per day.
* [GitLab Flow’s documented best practices](https://about.gitlab.com/topics/version-control/what-are-gitlab-flow-best-practices/) say everyone starts from main and targets main, pushed commits generally should not be rebased, and every commit should be tested. For branch-level manual testing, [GitLab Review Apps](https://docs.gitlab.com/ci/review_apps/) provide a temporary environment for each branch or merge request.
* The [2021 Accelerate State of DevOps research](https://cloud.google.com/resources/state-of-devops) found that elite performers meeting their reliability targets were 2.3 times more likely to use trunk-based development. Low performers were more likely to use long-lived branches and delay integration.

So the accurate answer is:

> Sophisticated and very large projects have used a strategy closely related to this. It is not the prevailing modern SaaS default.

Topic graduation makes the most sense where maintainers need to move independently reviewable work through several stability levels while selectively deciding which topics reach the stable branch.

That is closer to maintaining Git, an operating system, a database, or a versioned product line than to the simplest continuous-deployment workflow for a small web product.

Even Git’s documentation says its complete workflow is rarely necessary for smaller projects and that merge-based graduation requires careful branch management.

## The Current Model Is Exacting by Design

For this strategy to work as intended, all of these details must remain true:

1. The feature starts from main.
2. The feature is merged into develop.
3. Develop is never merged into the feature merely for routine integration testing.
4. The feature is never rebased onto develop.
5. Once the feature commits have been published through a develop merge, those commits are never rebased.
6. Develop uses a real merge, not a squash that replaces the feature commits.
7. Main later receives the same feature commits.
8. Fixes discovered during integration are committed to the feature branch, then merged into develop again.
9. Main and develop are periodically reconciled according to a documented procedure.
10. The final main composition receives appropriate validation.

Changing the GitHub merge method alone can break the commit-identity premise.

A squash merge into develop creates a new combined commit. A later squash or ordinary merge into main no longer produces the clean shared feature ancestry the workflow depends on.

GitHub’s [merge-method documentation](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github) makes the distinction explicit: a standard merge adds the feature commits to the base through a merge commit, while squash and rebase methods create different commit histories. GitHub’s rebase-and-merge option creates new commit SHAs.

That does not make the strategy invalid.

It means the strategy should not exist only as tribal knowledge.

## Two Branch Names Were Not the Technical Problem

These structures are not equivalent.

### Two Independent Feature Histories

```
feature-develop: F1  ── F2  ── develop adaptations
feature-main:    F1' ── F2' ── main adaptations
```

The feature has effectively forked. Each target receives a different patch series.

### One Feature History Plus a Disposable Integration Branch

```
canonical feature:
A──B──C──F1──F2

temporary integration branch:
develop──D1──D2──M
                 /
             F1──F2
```

The temporary branch starts from develop and merges the canonical feature into itself. It does not replay or reimplement the feature. `F1` and `F2` remain the same commits.

The temporary integration branch can carry:

* The merge commit.
* Conflict resolutions needed only for develop.
* Reconciliation needed only for that integration tree.

It can then be merged into develop and deleted.

That is not “doing the feature in two branches.”

It is using a temporary branch to construct the develop merge result while preserving one canonical feature history.

Whether a team permits this temporary carrier branch is a policy question. Technically, it is not the same pathology as maintaining two independently replayed versions of the feature.

## Separate the Inherent Tradeoff From the Avoidable Failure

The central thesis is:

> The tree tested on develop is not necessarily the tree ultimately released from main.

The workflow produces two different compositions:

```
QA:
develop-only work + feature

Production:
main-only work + feature
```

Shared integration testing can conceal dependencies or create failures caused by unrelated pending work, even when the merge-only procedure is followed perfectly. The workflow is specifically designed to avoid duplicate feature identities, so the more precise distinction is:

### The Inherent Tradeoff

Even with perfect merges and preserved commit identity, integration QA and release validation operate on different complete trees.

### The Avoidable Failure Mode

Rebasing a published feature branch onto develop destroys the commit-identity mechanism and makes later reconciliation substantially harder.

Those are separate concerns.

## Two Different Complete Trees

Suppose main and develop share commit `C`:

```
A──B──C
```

Develop receives unreleased work while a feature branch independently receives its own changes:

```
          D1──D2             develop
         /
A──B──C
         \
          F1──F2             feature
```

The unchanged `F1` and `F2` commits are merged into develop. If the two lines conflict, the develop-side merge records the reconciliation in `Mdev`.

QA tests something conceptually equivalent to:

```
base + develop-only changes + F1/F2 + Mdev resolution
```

Main may also have changed while integration testing took place. When approved, the same `F1` and `F2` commits are merged into main, producing `Mmain` and any main-side reconciliation required there.

```
base + main-only changes + F1/F2 + Mmain resolution
```

The intended strategy has preserved the feature commits.

It has not preserved the surrounding system.

QA tested:

```
develop-only changes + F1/F2 + develop merge resolution
```

Production receives:

```
main-only changes + F1/F2 + main merge resolution
```

The feature identity is the same.

The complete source tree is not.

That distinction matters.

## A Main Merge Still Creates a Release Candidate

The final main merge does not need to rewrite the feature commits to produce a new release candidate.

The merge composition itself creates a source-tree state that QA has not yet exercised.

Main may contain new behavior. Dependencies may have changed. APIs may have evolved. A function’s signature may be identical while its runtime behavior has changed.

None of this requires a Git conflict.

This leads to a useful release-engineering principle:

> If the complete source tree changes after QA, you have a new release candidate.

That does not necessarily mean repeating an entire manual regression cycle.

It does mean that the final main-based candidate deserves automated validation, targeted smoke testing, and appropriate integration testing.

QA approval should ultimately correspond to a release candidate—not merely to a feature name or an unchanged set of feature commits.

## The Hidden Dependency Problem Still Exists

Imagine develop contains Feature A:

**Feature A:**
Adds a database column.

Your Feature B contains:

**Feature B:**
Reads the new database column.

Feature B is merged into the integration environment.

Everything works.

QA approves it.

Then the team follows the isolation strategy and merges only Feature B into main.

Production does not have Feature A.

The feature that passed every integration test can now fail immediately.

The integration environment concealed an undeclared dependency.

This becomes especially dangerous across several layers:

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

## Shared Integration Can Produce False Negatives Too

Shared integration branches do not only hide problems.

They can create them.

Suppose Feature A introduces a regression into develop.

Feature B is valid when applied to main, but its QA tests fail because Feature A broke something nearby.

Now Feature B is blocked by code that is not part of Feature B and is not intended to ship with it.

A permanently shared develop environment can therefore produce both:

* **False confidence:** Another feature supplies something your feature secretly requires.
* **False failures:** Another feature breaks something your feature does not actually affect.

This makes debugging harder because “Does Feature B work?” becomes entangled with “What happens to be deployed on develop today?”

## A Main-Based Feature Can Still Conflict With Develop

Regularly merging main into develop does not guarantee that a main-based feature will merge cleanly into develop.

Suppose main and develop are synchronized at commit `C`:

```
A──B──C                 main and develop
```

Develop then receives an unreleased change:

```
A──B──C──D1             develop
```

A feature independently branches from `C`:

```
A──B──C──F1             feature
```

If `D1` and `F1` modify overlapping code, the combined graph is:

```
          D1             develop
         /
A──B──C
         \
          F1             feature
```

Merging main into develop immediately beforehand contributes nothing new. The disagreement is between the develop-only change `D1` and the feature change `F1`.

That conflict is normal Git behavior. It does not mean the feature started from the wrong branch.

It is accurate to say:

> Since develop has a different commit history, Git has to do something to combine this branch with it.

Under the merge-only policy, the “something” is:

```
merge feature into develop
resolve conflicts in the develop-side merge
```

It is not:

```
merge develop into feature
```

And it is not:

```
replay the feature separately for each target
```

## The Dangerous Workaround: Letting the Feature Absorb Develop

Merge direction determines which branch acquires the combined ancestry.

The wrong direction for the canonical feature is:

```bash
git switch feature/example-change
git merge develop
```

The result is:

```
feature = main-based feature + develop ancestry + develop reconciliation
```

The feature can no longer represent only its own changes against main.

The safe direction is:

```bash
git switch develop
git merge feature/example-change
```

The result is:

```
develop = develop history + unchanged feature commits + merge resolution
feature = unchanged main-based feature history
```

When direct work on protected develop is unavailable, a disposable integration branch can represent the same merge direction:

```bash
git switch develop
git switch -c integration/example-change
git merge feature/example-change
# resolve develop-specific conflicts here
# open PR: integration/example-change → develop
```

The critical invariant is:

> The integration branch absorbs the feature. The canonical feature never absorbs the integration branch.

Rebasing the contaminated feature back onto main does not restore the original history. It creates replayed commits such as `F1'` and `F2'`.

If `F1` and `F2` were already merged into develop, the two targets now contain different historical representations of the same logical work.

Later reconciliation can produce:

* Duplicate logical changes.
* Confusing merge bases.
* Repeated conflicts.
* Difficult pull-request comparisons.
* Uncertainty about which version was tested.

This is not an unavoidable consequence of testing on develop.

It occurs when the canonical feature is rewritten or replayed instead of preserving its original commits.

If integration testing finds a feature defect, commit the fix to the canonical feature branch, merge that new feature commit into develop again, and retest.

Develop-specific merge reconciliation stays in the develop-side merge.

## Exacting Workflows Need Mechanical Enforcement

A mature implementation should encode the procedure in repository settings and tooling:

* Require the intended merge type.
* Block force pushes to published feature branches.
* Protect main and develop.
* Require checks and review.
* Give coding agents a repository-local workflow document.
* Add a preflight check that detects whether a feature branch contains develop-only ancestry.
* Use disposable integration branches created from develop when protected-branch pull requests are required.
* Show the graph before any integration push.
* Record which exact commit and tree QA approved.

[GitHub rulesets](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) can require pull requests and status checks, restrict the allowed merge type, and block force pushes.

If correctness depends on ten invisible rules and none are mechanically enforced, the workflow is too fragile for routine use.

A branching strategy should make the safe path the easy path.

## Is This Complexity Worth It Here?

My judgment is: probably not in a manually enforced form unless the company has a concrete requirement that simpler models cannot satisfy.

The graduation model buys two real things:

1. Test a feature with all pending integrated work.
2. Release that feature without releasing every other pending feature.

It pays for them with:

* Dual pull requests for each feature.
* Exact merge-method requirements.
* A permanent branch that can diverge from production.
* Extra synchronization work.
* Ambiguous QA meaning.
* Potential hidden dependencies.
* A high cognitive burden on every engineer and coding agent.
* A final release candidate that still needs validation against main.

For a small company, that is a lot of procedural machinery.

The Git project can justify a complex graduation model because it has a large distributed contributor population, multiple stability tiers, release-maintenance branches, subsystem maintainers, and a mature culture built around those rules.

A small product company should have a specific answer to this question:

> What business or technical constraint makes this complexity cheaper than preview environments, feature flags, or short-lived release branches?

If the answer is merely, “We have one shared develop deployment where QA tests things,” then the branch model may be compensating for missing deployment infrastructure.

## Three Serious Alternatives

### 1. Mainline With Per-Feature Testing

```
main → feature branch → PR candidate
                         ↓
                    temporary QA environment
                         ↓
                    merge to main
```

Use feature flags when code needs to merge before functionality should be exposed.

Use a merge queue when the final candidate must be tested with the latest target branch. GitHub’s [merge queue](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) creates a temporary merge group containing the pull request, the latest target branch, and changes ahead of it in the queue; required checks must pass before the changes merge.

This is the cleanest long-term option when QA can examine the actual candidate instead of whatever happens to coexist on develop.

### 2. A Short-Lived Release or Integration Branch

```
main
  └── release/candidate
        ├── selected feature A
        ├── selected feature B
        └── selected feature C
```

Test the exact release branch, merge that tested composition to main, and delete it.

This is appropriate when several changes genuinely need to ship together.

It still requires discipline, but it makes the release unit explicit and avoids keeping a permanent alternate branch full of unrelated pending work.

### 3. Keep the Graduation Model—but Treat It as Specialized

```
main-based topic
    → merge unchanged into develop/next
    → integration test
    → merge the same topic into main
    → validate the final main candidate
```

No rebase after the topic has been merged anywhere.

No squash if commit identity matters.

Consider periodically rebuilding develop from main plus the topics still under evaluation, analogous to Git’s treatment of its integration branches.

## The Broader Principle

Branching strategies are often discussed as Git preferences:

Do we use develop?

Should we rebase or merge?

Should features branch from main?

Those are secondary questions.

The more important question is:

> What does a successful test actually prove about the code we are about to release?

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

## My Bottom Line

The underlying Git constraint is real:

> A feature based on main may conflict when it is merged into an ahead-of-main develop branch, even when main is regularly synchronized into develop.

The analysis has four parts:

1. **Inherent challenge:** Develop and the feature can conflict because they contain different changes after their common ancestor.
2. **Intended solution:** Merge the unchanged feature commits into develop and keep any develop-specific reconciliation in the develop-side merge.
3. **Failure to avoid:** Do not let the canonical feature absorb develop and then recreate the feature separately for main.
4. **Remaining tradeoff:** Even when commit identity is preserved perfectly, develop QA and the main release still exercise different complete trees.

Technically, the strategy is legitimate and has precedent in large distributed projects.

It is not the generic large-company standard.

It has known costs.

Even the Git project’s documentation describes this family of workflows as requiring careful branch management and often being unnecessary for smaller teams.

The original release-engineering invariant still holds:

> The closer the code you test is to the code you ship, the stronger your release process becomes.
