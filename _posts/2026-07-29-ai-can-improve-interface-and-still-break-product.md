---
layout: post
title: "AI Can Improve the Interface and Still Break the Product"
description: "A coding agent cleaned up our craft app's UI, then broke the state-machine logic behind emoji reactions. The experience shows how harnesses, deterministic automation, and human review create the appearance of autonomous AI coding."
date: 2026-07-29
permalink: /blog/ai-can-improve-interface-and-still-break-product/
categories: ai software-development software-engineering
tags:
  - AI coding agents
  - coding agent harnesses
  - LLM automation
  - UI refactoring
  - state machine design
  - human in the loop software development
og_image: "/assets/optimized/ai-can-improve-interface-and-still-break-product.webp"
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

<h1 class="fw-bold">The Code Looked Superfluous—Until You Dragged an Emoji</h1>

<p class="text-muted">July 29, 2026 · 7 min read</p>

<div class="tldr-box">
  <strong>TL;DR</strong><br />
  Codex gave the craft app my brothers and I are building a better-looking interface, then broke the state machine behind a drag-based emoji reaction by treating intentional code as superfluous. The lesson is not that AI cannot code. It is that an apparently autonomous coding agent is a probabilistic model surrounded by expensive deterministic harnesses—and those harnesses are only as good as their behavioral oracle. I kept the useful visual changes, but I integrated them one piece at a time.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/ai-can-improve-interface-and-still-break-product.avif" type="image/avif" />
  <source srcset="/assets/optimized/ai-can-improve-interface-and-still-break-product.webp" type="image/webp" />
  <img
    src="/assets/optimized/ai-can-improve-interface-and-still-break-product.webp"
    alt="A finger drags an enlarged reaction across a polished phone interface above an exposed state machine and an AI system supported by extensive engineering scaffolding"
    width="420"
    loading="lazy"
    decoding="async"
  />
</picture>

One of my brothers recently texted that activity in the craft app we are building had started to feel stagnant. A few people were still posting, but we needed some new blood.

I had already tried a different kind of new blood: Codex.

The result was one of those commits that makes AI coding easy to overrate and underrate at the same time.

The visual work was good. It cleaned up parts of the interface and produced login-screen changes I wanted to keep.

It also broke some of the deepest interaction logic I had written for emoji reactions.

I summarized the problem in our group text:

> It thinks that code is “superfluous.”

I added a laughing emoji because sometimes that is the only reasonable response to watching carefully written behavior disappear in the name of cleanup.

I could not safely adopt the whole commit. I had to bring the changes in piece by piece, starting with the harmless visual improvements and leaving the reaction logic alone until I could inspect it properly.

That experience is a more accurate picture of AI coding than either the demo or the backlash.

## The Visual Improvement Was Real

The agent did not fail at everything.

It made legitimate interface improvements. The screen looked cleaner. Some layout decisions were better. The login work was bounded enough that I could evaluate it quickly and preserve the useful parts.

This is a meaningful capability.

Interface work often provides a fast feedback loop. Spacing, alignment, hierarchy, repeated components, and inconsistent styling can be visible in a still frame. An agent can compare nearby patterns, modify the code, build the screen, and produce something that is obviously better.

The mistake would be treating that visible success as evidence that the entire implementation is correct.

A cleaner screen is not the same thing as a preserved product.

## The Hardest Part Lived Under a Finger

The emoji reaction control was not merely a row of buttons.

As a finger moves across the reactions, an emoji enlarges beneath it. The selected reaction, drag position, animation, and gesture state have to remain synchronized. Pressing, moving, crossing from one reaction to another, releasing, and canceling are not interchangeable events.

The behavior exists across time.

That makes it less like laying out a form and more like implementing input in a video game. The code has to reason about motion, transitions, feedback, and what the interface should do during every intermediate state—not only how it should look after the gesture is over.

An LLM can write a state machine when the states and transitions are specified clearly.

What it cannot safely assume is that an awkward-looking guard, flag, branch, or sequence in an existing interaction is accidental. The code may look repetitive when viewed as text and still be essential when experienced through a fingertip.

The product is not the screenshot.

The product is the behavior between screenshots.

## The Code AI Calls Redundant May Be Compressed Product Knowledge

Mature interaction code accumulates history.

A condition may exist because an animation once fired twice. A separate state may prevent selection from jumping when a finger crosses a boundary. A small delay may keep visual feedback aligned with the gesture. Two similar branches may represent moments that look alike in code but feel completely different to the user.

Without that history, cleanup can become erasure.

This is one reason AI-generated refactors can be so convincing. The result is often locally cleaner. The diff removes apparent duplication. The types still line up. The application may compile. A static screenshot may even look better.

Then somebody touches the control.

The regression appears only in motion because the “mess” was carrying product knowledge that had never been written down anywhere else.

## People See the Model, but They Underestimate the Harness

People often talk about an AI coding agent as if the model alone opened a repository, understood it, edited the right files, validated the work, and delivered a finished result.

That collapses an entire engineered system into one word: AI.

A serious coding agent is surrounded by a harness that can:

* Assemble repository context
* Apply project-specific instructions
* Read and edit files through controlled tools
* Run commands in a sandbox or isolated worktree
* Compile the application and execute tests
* Retry after failures
* Inspect diffs and report what changed
* Stage, commit, and push through Git

People see the conversational surface. They do not see how much product engineering and capital went into the scaffolding around an otherwise probabilistic and stochastic model.

That scaffolding is not incidental. It is what makes the model look “autonomous” and, in the best demos, almost “flawless.”

The achievement is real, but it belongs to the whole system.

The harness narrows the model’s choices, gives it deterministic tools, catches some failures, and routes output through software that behaves far more predictably than the model itself. Without those rails, an LLM produces a response. With them, it can participate in a development workflow.

I have described this before as an [execution layer around AI coding tools](/posts/ai-coding-tools-still-need-an-execution-layer.html). The more capable the agents become, the more important it is to distinguish improvements in the model from improvements in everything built around it.

## The Most Flawless Part May Not Need an LLM

I love being able to tell an agent to commit my work and push it to GitHub.

It feels futuristic. I can state the outcome in plain English, and the system inspects the repository, creates a commit, and sends it to the remote.

But that workflow could have been automated without AI.

`git status`, `git add`, `git commit`, and `git push` are deterministic commands. A shell script, alias, button, or continuous-integration job could sequence them. The LLM adds a conversational control surface and decides which tools to invoke; Git performs the reliable operation.

I am not even sure how much time this saves an experienced programmer compared with using the command line.

Some, I will concede.

The agent can inspect the current state, stage only the intended files when instructed correctly, draft a useful commit message, push the branch, and summarize the result. That saves keystrokes and attention. It can also reduce context switching when commit-and-push is only the final administrative step in a larger task.

But the time savings should not be confused with a new reasoning capability. Often the most flawless-looking part of an agent workflow is the moment when the model hands the task to older, deterministic software.

The LLM makes the interface more convenient.

Git makes the operation dependable.

## Every Harness Eventually Needs an Oracle

A harness can tell an agent whether the code compiles.

Git can tell it whether the commit exists. A linter can tell it whether the syntax follows a rule. A unit test can tell it whether a defined input produced an expected output.

What told the agent whether the emoji felt right under my finger?

Nothing.

The available checks did not encode that behavior. A screenshot could verify the row of reactions without exercising the drag. A build could succeed while the interaction was wrong. Even a broad instruction to “preserve existing behavior” could not replace a precise evaluator for the states that mattered.

That missing oracle is where apparent autonomy reaches its boundary.

The answer is not always permanent human intuition. We can improve the harness with interaction tests, recorded behavior, explicit state diagrams, better acceptance criteria, runtime instrumentation, and project documentation. We can make more of the product observable and verifiable.

But that is additional engineering.

Someone still has to identify the important behavior, encode it, and decide whether the test represents what users actually need. The capital spent on scaffolding does not make semantics disappear. It moves more of those semantics into the scaffold.

## I Adopt the Work One Piece at a Time

Once the commit mixed useful interface work with a broken interaction, accepting or rejecting the entire result became the wrong choice.

I separated the changes by risk:

1. Preserve the bounded visual improvements that can be inspected directly.
2. Start with the login-screen changes because they do not touch the reaction state machine.
3. Review behavioral code independently from styling and layout.
4. Exercise the real gesture instead of relying on a successful build.
5. Keep only the changes that earn their way into the product.

This is slower than clicking “accept all.”

It is faster than shipping a subtle regression and rediscovering the intent after the original code has been erased.

The agent can generate a large diff faster than I can validate it. That is useful capacity, but it does not automatically create proportional time savings. Review and integration remain part of the cost.

The best AI coding workflow is not blind acceptance or reflexive rejection. It is selective adoption.

## Generation Is Becoming Accessible Faster Than Ownership

My brother’s reaction was that everyday people are probably still a long way from having AI build software for them without someone who knows how to clean it up afterward.

That depends on the software.

For a new, bounded interface with obvious behavior, the gap may already be surprisingly small. For an existing product with interaction history, hidden invariants, real users, and code whose complexity encodes lessons from earlier failures, the gap is much larger.

AI is making it easier for more people to propose software changes.

It is not making every change equally safe to own.

The easier it becomes to generate plausible code, the more important it becomes to recognize when plausibility has diverged from the product.

## The Agent Can Push. I Still Decide What Deserves to Ship.

I am not arguing against AI coding agents. I use them, and I expect the model, the harness, and the surrounding automation to keep improving.

The useful distinction is between what each layer actually contributes.

The model gave me options. The harness let it inspect files, make edits, run tools, and prepare a result. Deterministic systems could build the project and push a commit. Human review identified that a visually polished refactor had damaged the interaction that made the feature feel right.

The screen was cleaner.

The emoji no longer behaved correctly.

Both facts were true at the same time.

That is why I kept the good parts and rejected the rest.

The agent can commit and push my code.

I still decide which code deserves to be committed.
