---
layout: post
title: "I use AI coding tools on production enterprise systems. They still need an execution layer."
description: "AI coding tools accelerate production development, but enterprise software still needs human context, judgment, debugging, and responsibility."
date: 2026-07-11
categories: ai software-development consulting enterprise-software agentic-coding
og_image: "/assets/optimized/ai-coding-production-execution-layer.webp"
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
  AI coding tools can accelerate enterprise development, but they still need an execution layer of architecture, domain context, supervision, debugging, and human responsibility to turn plausible code into production software.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/ai-coding-production-execution-layer.avif" type="image/avif" />
  <source srcset="/assets/optimized/ai-coding-production-execution-layer.webp" type="image/webp" />
  <img
    src="/assets/optimized/ai-coding-production-execution-layer.webp"
    alt="Software engineer supervising interconnected mobile, web, backend, database, healthcare, and manufacturing systems with AI as one tool in the workflow"
    width="300"
    loading="lazy"
    decoding="async"
  />
</picture>

I use tools like Codex while building production enterprise systems used in healthcare and manufacturing operations.

These systems involve native iOS and Android applications, web interfaces, backend APIs, databases, permissions, reporting, workflow rules, and multiple repositories that all have to remain aligned.

AI absolutely helps. It can generate a first implementation, trace unfamiliar code, suggest tests, identify related files, draft documentation, and accelerate repetitive work.

My experience is more nuanced than the popular story that access to AI makes software-engineering experience irrelevant.

To make Codex useful on a large project, I first have to build an execution environment around it.

## The Model Needs Far More Context Than People Realize

An AI coding tool does not automatically understand why a system was designed a certain way, which requirements are authoritative, which apparent inconsistencies are intentional, or what the business actually means by words such as “delete,” “restore,” “ready,” “assigned,” or “completed.”

That is part of why I began using BMAD.

BMAD is not a magic coding agent. It is a structured way of giving the model product context, architecture documentation, implementation stories, acceptance criteria, engineering conventions, and explicit instructions about how the project should work.

I also have to point Codex toward the right context through repository instructions, architecture documents, and project-specific guidance. Without that scaffolding, it can make locally reasonable changes that are misaligned with the broader system.

Even with the documentation, the AI still has to be supervised.

## Plausible Code Is Not the Same Thing as Correct Software

AI-generated code frequently looks convincing. It compiles. It follows the surrounding syntax. It may even pass the obvious test.

Then you examine the actual behavior and discover that the model:

- Invented a requirement that was never given.
- Misunderstood a data relationship.
- Updated one application but missed another consumer of the same API.
- Used a technically valid pattern that conflicts with the project architecture.
- Handled the happy path but ignored permissions, tenant boundaries, audit consequences, or recovery behavior.
- Added abstractions and fallback logic that made the system more complicated without making it more correct.
- Assumed two similarly named concepts meant the same thing when the business treats them differently.

This is particularly consequential in enterprise software because many of the most important rules are not obvious from an individual function.

For example, “deleting” something may really mean canceling it while retaining history. Restoring a parent record may or may not restore every relationship beneath it. A user may be allowed to view a workflow without being allowed to modify its documents. A backend change may affect native mobile clients, reporting exports, and technician applications in different ways.

The model can write code for any one of those behaviors and can help compare the tradeoffs.

The result still needs business intent to be supplied and confirmed before anyone can trust which behavior belongs in production.

## My Real Workflow Still Looks Like Engineering

I do not give Codex a large request, accept whatever it produces, and move on.

I define the behavior first. I give it relevant context. I constrain the scope. Then I inspect the resulting diff and review every meaningful line.

I verify the database assumptions. I trace API contracts. I compare the implementation against the actual workflow. I run the application. I use the breakpoint debugger. I inspect runtime state. I test the paths the model did not think to test. I remove code that is unnecessary, misleading, or architecturally inconsistent.

Sometimes the generated implementation is useful and only needs correction.

Sometimes it reveals a file or dependency I might not have found as quickly.

Sometimes the fastest solution is to discard most of what it wrote and implement the behavior myself.

The value is not that the AI can always finish the work. The value is that it can accelerate parts of the work while a human engineer remains responsible for the outcome.

## AI Accelerates the Visible Portion of Development

A coding model can often move quickly through the first portion of a feature: creating files, connecting obvious components, generating boilerplate, and implementing the straightforward path.

The final portion is where real software tends to become expensive:

- Edge cases
- Existing data
- Conflicting requirements
- Cross-system behavior
- Permissions and security
- Performance
- Operational recovery
- Platform differences
- Deployment risk
- Real users doing unexpected things

That final stretch is not an inconvenience surrounding the “real” coding. It is the work.

A prototype can demonstrate that an idea is possible. Production engineering establishes that it will behave predictably when people depend on it.

## This Is the Execution Layer

When I say AI still needs an execution layer, I mean the person or team responsible for:

- Understanding the architecture
- Translating business language into precise system behavior
- Recognizing when generated code is merely plausible
- Debugging failures across multiple layers
- Preserving security and data boundaries
- Coordinating changes across applications
- Evaluating tradeoffs
- Deciding what not to build
- Taking responsibility when the system reaches production

Producing more code by itself does not replace that layer.

In many cases, producing code is no longer the bottleneck. Determining which code should exist—and proving that it works inside the larger system—is the bottleneck.

## One-Shot Software Depends on the Category

There are products that can be generated quickly. Some are genuinely useful. AI has made prototypes, internal utilities, simple websites, and narrow applications dramatically cheaper to create.

Whether software can be reliably generated in one pass depends on its scope, existing constraints, and consequences. The projects that call for senior engineering usually involve incomplete requirements, existing systems, messy data, competing stakeholders, exceptional workflows, or meaningful failure costs.

Faster code generation helps with all of those projects, but it does not make those conditions disappear.

In some ways, faster code generation makes judgment more important. A model can now produce an unverified implementation at extraordinary speed.

## AI Is Becoming Table Stakes, Not a Permanent Advantage

AI-assisted development is becoming normal. Founders, new builders, senior engineers, and competitors all have access to capable models.

The durable advantage will not be access to code generation.

It will be the ability to combine those tools with sound judgment, domain understanding, technical depth, and disciplined execution.

I use AI every day, and I am actively improving the documentation and workflows that make it more effective.

The more I use these tools inside real production systems, the more clearly I see the distinction between access to the tool and responsibility for the system.

AI can accelerate the work.

It does not assume responsibility for the system.

That is still the execution layer.

I’m interested in hearing from other developers using coding agents on substantial production systems. Where have they genuinely improved your workflow, and where do you still find yourself correcting or containing them?
