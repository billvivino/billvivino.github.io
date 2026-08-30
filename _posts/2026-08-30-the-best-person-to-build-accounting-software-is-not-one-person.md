---
layout: post
title: "The Best Person to Build Accounting Software Is Not One Person"
date: 2026-08-30 07:00:00 -0400
author: Bill Vivino
categories: [AI, Software Engineering]
tags: [AI coding, domain expertise, software democratization, accounting software, agentic development]
description: "LLMs let domain experts build software directly, but production systems still require both business-domain judgment and technical-system judgment."
og_image: "/assets/optimized/domain-experts-engineers-ai-software.webp"
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
  AI is democratizing software by letting domain experts participate directly in building it. But accounting software has two domains: accounting and software systems. The accountant should own the accounting truth. The engineer should own the technical truth. AI removes much of the translation tax between them; it does not make either kind of expertise unnecessary.
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/domain-experts-engineers-ai-software.avif" type="image/avif" />
  <source srcset="/assets/optimized/domain-experts-engineers-ai-software.webp" type="image/webp" />
  <img
    src="/assets/images/domain-experts-engineers-ai-software.png"
    alt="An accountant and a senior software engineer combining domain and technical expertise through an AI translation layer to build one resilient software system"
    width="420"
    height="280"
    loading="lazy"
    decoding="async"
  />
</picture>

I recently watched a clip of Boris Cherny, the creator and head of Claude Code, making a compelling argument about the future of software.

In the [full conversation](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens), he compares AI coding to the printing press. Literacy was once scarce, books were expensive, and professional scribes were required to reproduce them. The printing press changed the economics of writing and helped literacy spread.

Software, he argues, is about to go through a similar democratization. If AI makes coding easy enough, the best person to build accounting software may be an accountant who deeply understands accounting—not a software engineer who has to learn the domain secondhand.

I agree with the direction.

I think the conclusion is incomplete.

The best person to build production accounting software is not one person.

## The Clip Is Right About the Bottleneck

Domain knowledge is one of the biggest bottlenecks in software development.

An engineer can build exactly what was requested and still build the wrong product because the request left out the part everyone in the business assumed was obvious.

An accountant may know that a reconciliation exception must remain visible after the period closes, that a correction cannot quietly rewrite an earlier audit trail, or that two transactions that look identical have different meanings because of when and how they entered the ledger.

Those rules may never appear in a requirements document. They live in experience.

LLMs give that experience a much shorter path into working software. A domain expert can describe a workflow, generate a prototype, exercise the edge cases, revise the rules, and inspect the result without waiting for every idea to pass through a product manager, business analyst, designer, and developer.

That is real democratization.

Anthropic's analysis of roughly [400,000 Claude Code sessions](https://www.anthropic.com/research/claude-code-expertise) found a similar division of labor: people usually made more of the planning decisions about what to do, while the agent made more of the execution decisions about how to do it. Domain expertise predicted success and helped people recover when the agent misunderstood the task.

The closer the person is to the real problem, the better that person can steer the AI.

## Accounting Software Has Two Domains

The mistake is treating accounting as the only domain in accounting software.

There are at least two.

The first is the business domain:

* Reconciliation rules
* Reporting periods
* Adjustments and reversals
* Approval workflows
* Tax and regulatory obligations
* The difference between a correction and a historical rewrite

The second is the technical domain:

* Authentication and authorization
* Tenant isolation
* Concurrency and idempotency
* Data migrations
* Audit logging
* Encryption and secrets
* Backups and disaster recovery
* Monitoring, retries, and failure handling

Those are not generic details surrounding the accounting product. Once the product handles real money and real records, they become part of its correctness.

Suppose an accountant directs an agent to import transactions and post them to a ledger. The happy path may look perfect.

Then the same bank file arrives twice.

An import runs while the books are closing.

A user changes an entry after an auditor has reviewed it.

An administrator from one client can query records belonging to another.

A deployment fails halfway through a data migration.

The accountant may be the best person to define what the ledger should mean. A senior engineer may be the best person to anticipate how the system can violate that meaning under load, failure, misuse, or change.

An engineer working alone can build a reliable version of the wrong accounting workflow.

An accountant working alone can build the correct happy path inside a fragile system.

AI can accelerate either outcome.

## LLMs Remove the Translation Tax

The old software process often looked like this:

> domain expert<br />
> → requirements document<br />
> → product interpretation<br />
> → engineering interpretation<br />
> → implementation<br />
> → user feedback

Every handoff introduced delay and information loss.

By the time the domain expert saw working software, the team might have spent weeks implementing an assumption that could have been corrected in ten minutes with an interactive prototype.

LLMs compress that loop.

The accountant can now express rules as examples, build a prototype, generate representative data, and show the engineer exactly where the behavior is wrong.

The engineer can ask the AI to trace those rules across the data model, API, user interface, background jobs, and audit history. The team can turn the accountant's edge cases into executable acceptance tests instead of leaving them buried in a meeting transcript.

The AI becomes a shared implementation and translation layer.

That is more consequential than simply generating code faster. It allows the people who understand the problem and the people who understand the system to work on the same artifact at the same time.

## Risk Should Decide Who Needs to Be Involved

Not every piece of software needs a senior engineering team.

If an accountant wants to automate a personal spreadsheet, transform a local export, or prototype a better month-end checklist, an AI coding tool may be all that is needed. The cost of failure is limited, the user understands the workflow, and the result can be inspected directly.

The calculus changes as consequences grow.

An internal prototype is different from a multi-tenant accounting platform. A report generator is different from a payroll system. A local script is different from a service that moves money, stores sensitive records, or supplies numbers used in regulatory filings.

The more a system affects customers, employees, money, privacy, or legal obligations, the more deliberately its technical behavior must be designed and verified.

Democratization should widen the on-ramp to software.

It should not lower the safety bar for production systems.

## The Printing Press Analogy Goes Farther

The printing press made reproduction dramatically cheaper. It did not make creative mastery universal.

It is also misleading to imagine that Gutenberg suddenly gave everyone the ability to publish a book. A printing operation required capital, specialized labor, materials, distribution, and often permission from political, religious, or guild authorities. [Cambridge's history of Renaissance printing](https://www.cambridge.org/core/books/abs/cambridge-history-of-renaissance-philosophy/conditions-of-enquiry-printing-and-censorship/47FE6DBC2D7D7AB78BA8650431927B25) describes its effect on learning as enormous but neither sudden nor instantaneous. It unfolded over roughly 50 to 100 years as presses multiplied, their output diversified, and markets and distribution developed.

The press democratized access and reproduction much more directly than it democratized authorship.

### It Created More Authors—Slowly

Printing eventually helped create more authors. A larger reading public supported more books, more genres, more publishers, more editors, and eventually a market in which some people could earn a living by writing.

But that professional role did not appear the moment books became easier to reproduce. An [Oxford history of early modern authorship](https://academic.oup.com/edited-volume/43514/chapter/364249862) notes that professional print authorship in Britain was still only emerging at the end of the sixteenth century.

The historical sequence was closer to:

> cheaper reproduction<br />
> → a larger reading public<br />
> → more demand for written material<br />
> → more amateur and professional writers

It was not:

> anyone can print<br />
> → everyone becomes an author

Reading a book and writing a good one remained different skills. Producing a manuscript and finding an audience remained different problems. The press removed the scribe as the reproduction bottleneck; it did not supply ideas, taste, editorial judgment, or readers.

### It Expanded Music Without Making Everyone a Musician

Music followed a similar pattern.

Before large-scale music printing, notated music generally had to be copied by hand or learned by ear. Music books were concentrated in religious institutions, wealthy courts, and affluent households. After Ottaviano Petrucci published a major collection of polyphonic music in 1501, printing spread across Europe and made scores available to many more people.

The result included more musical literacy and more amateur performance. The [Metropolitan Museum of Art's history of Renaissance music](https://www.metmuseum.org/toah/hd/renm/hd_renm.htm) describes amateur musicians of means taking up instruments and using printed publications that had previously been unavailable to them.

By the nineteenth century, sheet music had become a consumer market. The [Library of Congress](https://www.loc.gov/loc/lcib/9907/music.html) documents strong demand for easier piano music written for amateur and student players.

That almost certainly expanded the number of people making music and gave composers access to much larger audiences. It did not turn every sheet-music buyer into a composer or professional performer. Reading notation still required education. Performing still required technique and an instrument. Composing something worth distributing remained a separate craft.

Printed music produced more listeners, students, amateur players, composers, publishers, and professional performers. The expanding amateur market did not eliminate professionals. It created a larger ecosystem around them.

### The Pattern Matters for Software

The more historically grounded prediction is not that everyone becomes a software engineer.

It is that many more people become software builders.

More people will create personal tools. More businesses will automate narrow workflows. More domain experts will turn ideas into prototypes without waiting for an engineering backlog. Some will develop substantial technical skill and cross the boundary into professional software work. Small teams will produce software that once required much larger organizations.

AI coding will likely create a similar abundance.

But an LLM is actually more powerful than a printing press in one important respect. A press reproduces a work that has already been written. An LLM can help formulate, translate, and implement the work. It is closer to combining a press with a tutor, translator, editor, and junior production team.

That may produce a much faster expansion in participation than print did.

It still does not make expertise universal.

It also means the world will contain far more code, more integrations, more automated decisions, and more systems that can fail in ways their creators did not anticipate.

The printing press created many more readers than authors and many more amateur musicians than professional composers. LLMs may similarly create many more software builders without turning everyone into a software engineer.

As software production becomes abundant, trusted software becomes the scarce product. Editing, verification, architecture, security, and professional judgment do not disappear. They become the mechanisms that separate abundant output from software people can responsibly depend on.

## The New Team Has Less Distance Between Its Experts

The future team may be smaller, but it does not have to be less rigorous.

The domain expert owns the business truth.

The engineer owns the technical truth.

The AI handles more of the translation, implementation, investigation, and repetitive verification between them.

In some cases, one person will carry both kinds of expertise. A software engineer who has spent years inside healthcare, logistics, finance, or manufacturing may be unusually capable because that person can recognize both the business failure and the system failure. A domain expert may also develop enough engineering judgment to own increasingly sophisticated tools.

Job titles will blur.

The responsibilities will remain.

Someone still has to decide what the rules mean. Someone still has to understand how the system breaks. Someone still has to evaluate the evidence and accept responsibility for releasing it.

AI makes those people more capable. It does not make those questions disappear.

## The Bill Vivino Technology Take

I use agentic coding tools every day. They let me inspect more of a system, test more alternatives, trace more dependencies, and implement ideas faster than I could before.

I want the accountant building.

I want the accountant prototyping workflows, supplying real edge cases, challenging assumptions, and working directly with the software instead of throwing requirements over a wall.

I also want an engineer involved when that software becomes a production system whose failures can corrupt data, expose records, interrupt operations, or create financial consequences.

And I do not want the engineer guessing at accounting rules any more than I want the accountant guessing at distributed-system failure modes.

The real opportunity is not to replace one expert with another.

It is to remove the distance between them.

The best accounting software will come from accountants who can build, engineers who can work directly with the domain, and AI that gives both sides far more leverage.

That is what software democratization should look like.
