---
layout: post
title: "Chess Has a Board. Software Has a World."
description: "Stockfish, AI software factories, and the limits of turning programming into search."
date: 2026-07-26
permalink: /blog/chess-has-a-board-software-has-a-world/
categories: ai software-development software-engineering
tags:
  - Stockfish-level coding
  - AI software factories
  - agentic coding
  - software engineering
  - program synthesis
  - Turing machine
  - Rice's theorem
og_image: "/assets/optimized/chess-has-a-board-software-has-a-world-v2.webp"
---

<style>
  .article-subtitle {
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  .tldr-box {
    background: #fff7d6;
    border-left: 4px solid #f4c542;
    padding: 16px 20px;
    border-radius: 6px;
    margin: 20px 0;
  }

  .tldr-box p:last-child {
    margin-bottom: 0;
  }

  article blockquote {
    background: transparent;
    border-left: 3px solid #d1d5db;
    color: inherit;
    font-size: inherit;
    font-style: normal;
    line-height: inherit;
    margin: 1.35rem 0;
    padding: 0.15rem 0 0.15rem 1.15rem;
  }

  article blockquote > :last-child {
    margin-bottom: 0;
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

  .formula-block {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-left: 4px solid #6c757d;
    border-radius: 6px;
    color: #212529;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 1rem;
    line-height: 1.65;
    margin: 1.25rem 0;
    max-width: 100%;
    overflow-x: auto;
    padding: 0.9rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  .formula-line {
    display: block;
    min-width: max-content;
    white-space: nowrap;
  }

  .article-table {
    margin: 1.25rem 0;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .article-table table {
    min-width: 640px;
  }

  @media (max-width: 768px) {
    .article-subtitle {
      font-size: 1.1rem;
    }

    article blockquote {
      margin: 1.2rem 0;
      padding-left: 0.95rem;
    }

    .blog-img-right {
      max-width: 100%;
      float: none;
      margin: 20px 0;
    }

    .blog-img-right img {
      max-width: 100%;
    }

    .formula-block {
      font-size: 0.9rem;
      padding: 0.75rem;
    }
  }
</style>

<h1 class="fw-bold">Chess Has a Board. Software Has a World.</h1>

<p class="article-subtitle">Stockfish, AI software factories, and the limits of turning programming into search</p>

<p class="text-muted">July 26, 2026 · Long read</p>

<div class="tldr-box">
  <p><strong>TL;DR</strong></p>

  <p>The Stockfish analogy captures one plausible future: AI systems may become so much better at many programming tasks that human programmers cannot compete with them directly. But the analogy does not show that software engineering is structurally the same problem as chess, nor that compute is the only constraint.</p>

  <p>Chess supplies a fixed state space, exact rules, legal moves, deterministic transitions, and a universal definition of winning. Original and enterprise software frequently lack all five. The problem, the desired behavior, the existing environment, and even the meaning of “correct” evolve while the system is being built.</p>

  <p>Tests and behavioral contracts can convert portions of software development into something more like chess. But somebody must choose the state representation, decide which behavior matters, construct the evaluator, and determine whether the formalized board adequately represents reality. That scaffolding can be the real engineering work.</p>

  <p>An AI software factory is superior when a compact, durable specification generates a much larger amount of trustworthy implementation. It is inferior when the engineer writes nearly the whole program in prompts and tests, the model translates it stochastically into source code, and the engineer then has to reconstruct and verify the result.</p>

  <p>Turing’s work places a real theoretical limit on the strongest version of this vision. There is no universal, always-terminating, always-correct procedure for determining arbitrary program behavior. Rice’s theorem extends that limit to nontrivial semantic properties of arbitrary programs. This does not make automated synthesis, testing, or formal verification futile. It means they work by restricting software into decidable islands rather than by creating a universal correctness oracle.</p>

  <p>The most productive division may therefore be: humans retain control of the semantic spine—the state model, ownership, transitions, architecture, policy, and irreversible decisions—while AI expands the mechanical surface area, generates tests, applies established patterns, explores alternatives, and performs broad verification.</p>
</div>

<picture class="blog-img-right">
  <source srcset="/assets/optimized/chess-has-a-board-software-has-a-world-v2.avif" type="image/avif" />
  <source srcset="/assets/optimized/chess-has-a-board-software-has-a-world-v2.webp" type="image/webp" />
  <img
    src="/assets/optimized/chess-has-a-board-software-has-a-world-v2.webp"
    alt="A finite chessboard opening into a complex, evolving world of software systems, networks, data, and people"
    width="768"
    loading="lazy"
    decoding="async"
  />
</picture>

Elon Musk recently compressed an entire theory of software automation into [one sentence on X](https://x.com/elonmusk/status/2066880262668247091):

> “AI will achieve Stockfish-level coding and generalized computer use.”

That is a powerful phrase. Stockfish does not merely assist a human chess player. It plays at a level beyond any human. Applied to programming, the implication seems obvious: AI will not remain an autocomplete tool, junior developer, pair programmer, or even senior engineer. It will eventually outclass every human programmer in the way chess engines outclass grandmasters.

That prediction may turn out to be right.

But the analogy can mean two very different things.

The first is a claim about relative capability:

> AI will become much better at software engineering than any human.

The second is a stronger inference about the structure of the problem—one that Musk’s sentence does not itself prove:

> Software engineering is fundamentally a search problem like chess. Once models and algorithms are sufficiently capable, additional compute can search the coding solution space until it finds the correct program.

The first claim does not require the second.

An AI could become superhuman at software engineering without software engineering having the mathematical structure of chess. It might do so by interviewing stakeholders, inspecting production systems, designing experiments, negotiating conflicting constraints, generating implementations, proving bounded properties, monitoring deployments, and changing its understanding after observing the consequences.

That would be an extraordinary system. It would also be closer to an autonomous engineering organization than to Stockfish.

My concern with the Stockfish analogy began as a question about the difference between the chess solution space and the coding solution space. It then became a question about how AI changes the act of programming. Instead of writing the mechanism, I increasingly found myself scaffolding a generator: defining test cases, behavioral contracts, repository context, constraints, and stopping conditions so that a model could stochastically produce the implementation.

That led to a more uncomfortable question:

> Am I building software, or am I hand-building a software factory for every ticket?

And that, in turn, led to Alan Turing.

If there are fundamental limits on deciding the behavior of arbitrary programs, then a universal software factory cannot simply search implementations and rely on a perfect evaluator to announce when it has found the right one. The evaluator itself becomes the problem.

The four questions form one continuous argument:

1. How much is coding actually like chess?
2. Is behavior-first agentic coding equivalent to constructing the mechanism directly?
3. Is building the stochastic software factory really superior, or can it be inferior?
4. Do Turing and Rice establish a hard boundary on the entire project?

The answers fit together. The central distinction is between searching a board and constructing the board on which search becomes meaningful.

Chess gives us the board for free.

Software usually does not.

## Part I: How Well Does the Stockfish Analogy Hold?

> “Elon constantly makes the analogy of the coding solution space to Stockfish solving chess. Can we evaluate how well this analogy holds up under analysis? Under his analysis, this means that ultimately the only constraint to solving coding is compute itself. What does the solution space of chess look like compared with coding an original or enterprise app?”

That compute-only conclusion is the strongest structural-search reading of the analogy, not something Musk’s quoted sentence itself establishes.

### The strongest charitable reading

The [most defensible interpretation of “Stockfish-level coding”](https://elonmuskarchive.org/video/economist-elon-musk-2026-07-23) is not that an AI will literally enumerate every possible program until it discovers the mathematically correct enterprise application.

It is that AI will become so consistently superior at programming that a human will have essentially no competitive chance against it.

That is coherent.

Stockfish does not need to have solved the game-theoretic value of every chess position in order to be overwhelmingly better than humans. It only needs to choose better moves, with greater consistency, under the conditions in which games are actually played.

Similarly, an AI does not need a complete mathematical solution to software engineering in order to outperform human engineers. It could make better architectural decisions, produce fewer defects, understand more repositories, remember more details, test more paths, work faster, operate continuously, and coordinate more implementation attempts than any individual human.

Under that interpretation, “Stockfish-level” is primarily a statement about the performance gap between machines and humans.

The analogy becomes much weaker when it is used to support a second claim:

> Because chess succumbed to search, software will also succumb to search, and compute will eventually be the only meaningful constraint.

That conclusion depends on software and chess having similar evaluative structures. They do not.

### What chess gives the search algorithm

A chess position can be represented as a state <em>s</em>. From that state, the rules determine a finite set of legal actions <em>A</em>(<em>s</em>). Applying action <em>a</em> produces a new state:

<div class="formula-block" role="group" aria-label="s prime equals T of s comma a">
  <span class="formula-line"><em>s</em>′ = <em>T</em>(<em>s</em>, <em>a</em>)</span>
</div>

The transition function is deterministic. Given the full legally relevant state and a move, there is no disagreement about the resulting position.

At terminal states, the game supplies an exact value:

<div class="formula-block" role="group" aria-label="U of s is an element of the set negative one, zero, one">
  <span class="formula-line"><em>U</em>(<em>s</em>) ∈ {−1, 0, 1}</span>
</div>

representing loss, draw, or win from the relevant player’s perspective.

Perfect play can therefore be represented recursively:

<div class="formula-block" role="group" aria-label="V star of s equals the maximum over a in A of s of negative V star of T of s comma a">
  <span class="formula-line"><em>V</em><sup>*</sup>(<em>s</em>) = max<sub><em>a</em> ∈ <em>A</em>(<em>s</em>)</sub> −<em>V</em><sup>*</sup>(<em>T</em>(<em>s</em>, <em>a</em>))</span>
</div>

That equation is computationally difficult to evaluate across the full game, but its meaning is not ambiguous.

Chess has several extraordinary properties:

* The rules are fixed.
* The state is completely observable.
* Legal actions can be enumerated.
* Transitions can be simulated exactly.
* The opponent’s goal is known.
* The payoff is universal.
* The environment does not change its rules after deployment.
* A candidate move can be tested without risking a production database, violating a regulation, or confusing a customer.
* Simulated experience is cheap and authoritative.

[Claude Shannon’s foundational paper on computer chess](https://doi.org/10.1080/14786445008521796) explicitly treated chess as a useful wedge into broader machine intelligence. But even in that paper, Shannon distinguished these tasks from strict numerical computation: they involve judgment, trial and error, and a continuous range of quality. Chess was valuable partly because it packaged those difficulties inside an unusually crisp formal environment.

The chess search space is enormous. But it is a closed enormous space.

That difference is more important than its raw size.

### Stockfish is not simply brute force

It is also misleading to describe Stockfish as a machine that wins because it mechanically examines every possible continuation.

Stockfish combines an evaluation function with highly selective alpha-beta search. Its [NNUE network assigns values to positions](https://official-stockfish.github.io/docs/stockfish-wiki/Advanced-topics.html#classical-versus-nnue-evaluation), while search algorithms decide which parts of the game tree deserve more investigation. The engine prunes branches that appear unpromising, reduces the depth of lower-priority lines, extends tactically important lines, reuses previously analyzed positions, and orders moves to make the search more efficient. Its own documentation explains that [search depth is not uniform and pruning can skip moves](https://official-stockfish.github.io/docs/stockfish-wiki/Stockfish-FAQ.html#what-is-depth) that a complete minimax search to the same nominal depth would have found.

Even in chess, then, the relevant production function is not:

<div class="formula-block" role="group" aria-label="more compute leads to the correct answer">
  <span class="formula-line">more compute → correct answer</span>
</div>

It is closer to:

<div class="formula-block" role="group" aria-label="capability equals compute times representation times evaluation times search strategy times training and testing">
  <span class="formula-line">capability = compute × representation × evaluation × search strategy × training and testing</span>
</div>

Compute matters enormously. But compute applied to a poor representation, bad evaluator, or naive search policy does not automatically produce Stockfish.

Stockfish is also not an exhaustive proof of chess. It is a selective, approximate decision system with extraordinary practical performance.

That distinction matters for coding. An AI might attain Stockfish-like dominance by being a better approximate engineer than humans—not by turning all software behavior into a solved mathematical object.

### When coding really does resemble chess

Imagine that we freeze all of the following:

* The programming language.
* The dependency versions.
* The operating environment.
* The input domain.
* The maximum program size.
* The desired behavior.
* The performance constraints.
* The security properties.
* The test and verification procedure.
* The definition of an acceptable solution.

The problem can then be represented as program synthesis:

<div class="formula-block" role="group" aria-label="p star equals the program p in P minimizing C of p, subject to p satisfying R">
  <span class="formula-line"><em>p</em><sup>*</sup> = arg min<sub><em>p</em> ∈ <em>P</em></sub> <em>C</em>(<em>p</em>)</span>
  <span class="formula-line">subject to: <em>p</em> ⊨ <em>R</em></span>
</div>

where <em>P</em> is the candidate-program space, <em>R</em> is the specification, and <em>C</em> is some cost function over correct implementations.

Under those assumptions, coding becomes substantially Stockfish-like.

An agent can:

* Generate a candidate.
* Compile it.
* Run the evaluator.
* Observe failures.
* Mutate or replace the candidate.
* Search alternative implementations.
* Compare performance.
* Backtrack from failed branches.
* Continue until the contract is satisfied.

This model fits many real programming tasks extremely well.

An algorithm problem with exact tests is highly chess-like. So is a reproducible regression with a clearly known correct result. A protocol implementation with a formal wire specification is relatively chess-like. A bounded migration with explicit preconditions and postconditions can be chess-like. A mechanical repository-wide refactor with a strong behavioral test suite is also a good candidate.

These tasks already possess most of the board.

The mistake is generalizing from those tasks to all of software engineering.

### The raw program space is not the decisive problem

An unrestricted programming language contains a countably infinite number of programs. Even after imposing a maximum length, the number of possible source strings is vast.

But raw size alone does not invalidate search.

Almost all arbitrary strings are syntactically meaningless. Language models impose strong priors over plausible code. Compilers immediately reject large regions of the space. Types eliminate others. Existing architecture and repository context constrain the design further. Many different source programs implement behavior that is equivalent for practical purposes.

An AI does not search source code by incrementing bytes in lexicographic order. It moves through a highly structured distribution of familiar patterns, abstractions, libraries, and transformations.

The critical problem is therefore not:

> Are there too many candidate programs?

It is:

> What makes one candidate a solution?

Chess supplies that answer independently of the engine. Software often does not.

### The evaluator is the hidden assumption

For program search to work, there must be some evaluator:

<div class="formula-block" role="group" aria-label="E of p equals one if p is acceptable, and zero otherwise">
  <span class="formula-line"><em>E</em>(<em>p</em>) = { 1, if <em>p</em> is acceptable; 0, otherwise }</span>
</div>

Or, more realistically, a scoring function:

<div class="formula-block" role="group" aria-label="E of p is a real number">
  <span class="formula-line"><em>E</em>(<em>p</em>) ∈ ℝ</span>
</div>

that ranks implementations by correctness, maintainability, performance, safety, usability, and other desired qualities.

The Stockfish analogy quietly assumes this evaluator already exists.

In chess, it does. The rules and outcome function were defined long before Stockfish.

In software, constructing a trustworthy evaluator can be most of the work.

The evaluator may need to answer questions such as:

* Did the system satisfy the intended business need?
* Was the data migration safe?
* Were undocumented workflows preserved?
* Is authorization correct for every relevant role?
* Does the system remain understandable and modifiable?
* Will the architecture tolerate future requirements?
* Does the user understand the interface?
* Did the deployment create a new operational burden?
* Does a technically correct behavior violate policy?
* Is a production anomaly evidence of a defect or an unrecorded business rule?

A unit-test runner can answer only the subset that has been translated into executable observations.

Somebody still has to determine which observations matter.

### Original applications do not begin with a fixed objective

Consider an original product.

At the beginning, the team may not know:

* which user has the most important problem;
* what that problem really is;
* which workflow will be understandable;
* which tradeoff users will accept;
* which behavior will create trust;
* whether the product should exist at all;
* what users will do once the system changes their environment.

The “correct app” is not hidden somewhere in a static code tree waiting to be found.

The problem formulation and solution concept develop together.

[Design research describes this as the co-evolution of problem and solution spaces](https://doi.org/10.1016/S0142-694X%2801%2900009-6). Designers propose partial solutions, discover implications, reinterpret the problem, modify the solution, and temporarily stabilize a matching problem-solution pair. The process is not generally “finish defining the problem, then search the fixed solution space.”

This resembles actual programming practice.

A developer implements a thin version of a feature. The implementation reveals that the state model is wrong. That discovery changes the interface. The new interface exposes a different user workflow. The workflow changes the product requirement. The revised requirement suggests a different architecture.

The code is not merely the result of prior understanding. It participates in producing the understanding.

An AI might eventually outperform humans at this process. It could interview users, generate prototypes, analyze behavior, design experiments, and revise the product strategy.

But once the system is doing all of that, it is no longer merely searching a coding solution space with a fixed evaluator. It is participating in the creation of the objective.

### Enterprise applications do not have a single clean state

Enterprise software is difficult in another way.

The desired business function may be reasonably clear, but the present system is not.

The relevant state includes far more than the repository:

<div class="formula-block" role="group" aria-label="Enterprise state is the set containing source code, databases, production anomalies, integrations, vendor behavior, permissions, business processes, regulations, user expectations, deployment history, operational workarounds, and organizational incentives">
  <span class="formula-line"><em>S</em><sub>enterprise</sub> = {</span>
  <span class="formula-line">&nbsp;&nbsp;source code, databases, production anomalies, integrations,</span>
  <span class="formula-line">&nbsp;&nbsp;vendor behavior, permissions, business processes, regulations,</span>
  <span class="formula-line">&nbsp;&nbsp;user expectations, deployment history, operational workarounds,</span>
  <span class="formula-line">&nbsp;&nbsp;organizational incentives</span>
  <span class="formula-line">}</span>
</div>

Much of this state is incompletely observed.

A legacy field may look unused but drive a monthly export. An odd database value may be corruption, or it may represent a workflow that never reached the documentation. A duplicated API route may be accidental, or one mobile client may still depend on it. A stakeholder may describe the desired behavior one way while production users rely on something else.

The technically cleanest final architecture is not automatically the best solution. The transition path matters:

<div class="formula-block" role="group" aria-label="solution does not equal final codebase alone">
  <span class="formula-line">solution ≠ final codebase alone</span>
</div>

Instead:

<div class="formula-block" role="group" aria-label="solution equals target system plus migration path plus compatibility strategy plus rollout plus rollback plus operations">
  <span class="formula-line">solution = target system + migration path + compatibility strategy + rollout + rollback + operations</span>
</div>

A perfect destination reached through an unsafe migration is not an enterprise solution.

The live organization is part of the machine.

### Four kinds of uncertainty

The Stockfish analogy tends to treat all uncertainty as search uncertainty. But software contains at least four different categories.

#### Computational uncertainty

This is the most chess-like form:

> Given a known objective and environment, which implementation satisfies the contract most effectively?

More search, more agents, stronger models, and more compute directly help.

#### Epistemic uncertainty

This concerns facts about the current world:

> What does the existing system actually do?

The missing answer may be buried in production data, an inaccessible vendor system, an undocumented dependency, a user’s memory, or a workflow no one thought to mention.

Compute can analyze information it receives. It cannot recover arbitrary facts that have never been observed or made available.

#### Normative uncertainty

This concerns what should be chosen:

> Which behavior does the organization want?

Suppose an authentication record says multi-factor authentication is enabled, but no verified factor exists. Several policies are technically possible:

* Lock the user out.
* Disable the malformed factor and allow reenrollment.
* Require manual recovery.
* Fall back to another verified factor.
* Escalate to an administrator.

No amount of searching implementations determines which policy the organization ought to adopt. Compute can model consequences, identify risks, and expose inconsistencies. But a policy choice must still be established.

#### Causal uncertainty

This concerns how the open world will respond:

> What happens after deployment?

Users may change their behavior. Attackers may find an unexpected incentive. A vendor may throttle the new traffic pattern. A workflow improvement may move the bottleneck somewhere else.

Simulation can reduce uncertainty, but only relative to the fidelity of the model. Sometimes the only authoritative test is a staged deployment followed by observation.

More compute cannot deliver next month’s production evidence today.

### Tests manufacture a local chessboard

Tests, schemas, contracts, mocks, types, and acceptance criteria are powerful because they transform an open-ended engineering problem into a more closed evaluative environment.

“Make authentication secure” is not a useful search objective.

These are much more useful:

* A new challenge supersedes the previous challenge.
* A verified factor cannot be silently bypassed after a provider failure.
* A factor without a verified destination is unusable.
* Attempt limits apply per user, session, and destination.
* Existing valid factors survive the migration.
* Recovery cannot promote an unverified profile field into a trusted factor.

Each invariant creates a local rule.

Once enough rules are made executable, an agent can search implementations, reject failures, compare alternatives, and stop when the evaluator is satisfied.

That is exactly the point at which coding begins to resemble Stockfish.

But notice what happened: software was not naturally a chessboard. The engineering process constructed one.

The human or system defining the contract had to decide:

* what state mattered;
* which transitions were legal;
* what counted as failure;
* what could be abstracted away;
* which properties deserved enforcement;
* how much of reality the evaluator needed to represent.

The Stockfish analogy is strongest only after this work is done.

And this work can be the hardest part.

## Part II: Is Agentic Coding the Opposite of Direct Coding?

> “Another issue I have with this is that, so far, when working with a model, it feels like I spend a lot of time scaffolding the model and defining test cases instead of spending that time coding. It could be one-for-one while I wait for the model to solve the test cases, and then I go back and refine the contract as I get new information. Is this a more or less efficient way of thinking about coding and practicing the art of coding? It almost seems like approaching the problem from the opposite side. I can’t tell whether this is an equal approach to simply defining the code.”

It is the opposite direction.

And it is not generally equivalent.

### Mechanism-first and behavior-first development

Traditional direct programming often follows a mechanism-first path:

<div class="formula-block" role="group" aria-label="intent leads to mental model, then implementation, then observed behavior, then revised understanding">
  <span class="formula-line">intent → mental model → implementation → observed behavior → revised understanding</span>
</div>

Agentic, contract-driven development often follows a behavior-first path:

<div class="formula-block" role="group" aria-label="intent leads to constraints and tests, then generated implementation, then verification, then revised constraints">
  <span class="formula-line">intent → constraints and tests → generated implementation → verification → revised constraints</span>
</div>

In the first process, the developer constructs the mechanism and learns from its shape.

In the second, the developer attempts to define the observable boundaries of an acceptable mechanism and lets the model search inside them.

Both processes can converge on good software. They do not necessarily produce the same information along the way.

### Coding is often an instrument of thought

It is tempting to describe programming as the transcription of an already completed design.

Under that picture, the engineer first determines exactly what should exist and then performs the relatively mechanical work of expressing it in code.

Real programming often does not work that way.

I may begin with an approximate model:

* this object should own the state;
* this service should perform the transition;
* this operation should be atomic;
* this event should trigger the side effect.

Then I start writing.

The implementation reveals that ownership is awkward. A dependency points in the wrong direction. A seemingly local update actually spans three aggregates. An asynchronous callback breaks the original transaction boundary. The interface requires information that the proposed abstraction does not possess.

The code pushes back.

I reorganize it, and the new organization changes my understanding of the problem.

This is the same [co-evolutionary structure seen in other forms of design](https://doi.org/10.1016/S0142-694X%2801%2900009-6): partial solutions reveal implications that alter the problem formulation itself.

Direct coding is therefore not just construction after thought.

It is often thought conducted through construction.

### Code and tests describe different things

Source code and tests do not contain the same kind of information.

Code is primarily intensional. It describes how behavior is produced.

Tests are primarily extensional. They describe selected observations of what the system should produce under certain conditions.

Consider a test saying:

> Given a valid authenticated session and a verified MFA factor, a provider error must not bypass the second factor.

That is an important invariant.

It does not determine:

* where challenge state should live;
* how the challenge is correlated with the session;
* whether invalidation is transactional;
* how retries interact with concurrent login attempts;
* which events are audited;
* how alternate factors coexist;
* how recovery changes session trust;
* which abstraction should own provider-specific behavior;
* whether the resulting design can support another factor later.

Many implementations can pass the same test.

Some will contain a coherent state machine. Others will contain conditionals distributed across controllers, services, and callbacks that happen to produce the expected output in the tested cases.

The test constrains the machine. It does not fully specify the machine.

### Finite observations underdetermine behavior

Suppose the intended function is <em>f</em>, and the test suite evaluates only the finite input set <em>T</em>.

A candidate program can be defined as:

<div class="formula-block" role="group" aria-label="q of x equals f of x when x is in T, and the wrong result when x is not in T">
  <span class="formula-line"><em>q</em>(<em>x</em>) = { <em>f</em>(<em>x</em>), if <em>x</em> ∈ <em>T</em>; wrong result, if <em>x</em> ∉ <em>T</em> }</span>
</div>

The program passes every test while being wrong outside the tested set.

Real models do not normally produce such an explicit lookup-table cheat. But the logical problem remains: a finite collection of examples does not uniquely determine arbitrary behavior over a larger domain.

The generated implementation is selected using additional information:

* natural-language instructions;
* repository conventions;
* types;
* familiar architectural patterns;
* examples in nearby code;
* learned programming priors;
* the model’s interpretation of unstated intent.

That is why scaffolding grows.

Every added invariant, example, prohibition, schema, and test eliminates additional undesirable implementations that remained compatible with the earlier evaluator.

### Behavior-first development can require premature certainty

The strict contract-first workflow asks:

> What exactly must be true when the work is complete?

That is a good question when the desired behavior is already understood.

It can be the wrong first question when implementing the mechanism is how the engineer would have learned what matters.

Suppose I am designing a new stateful subsystem. Before touching the code, I try to enumerate every test:

* all transitions;
* every error path;
* all concurrency conditions;
* every invalid state;
* recovery behavior;
* compatibility;
* performance expectations.

But I do not yet understand the state model.

I am trying to formalize knowledge I have not produced.

The likely outcomes are:

1. I write a shallow contract that lets the model guess the architecture.
2. I over-specify an early design and freeze a mistaken model.
3. I describe the implementation almost line by line in English.
4. I repeatedly revise the tests after generated code reveals missing assumptions.

At that point, the contract-first workflow is no longer avoiding discovery. It is performing discovery through a more indirect medium.

### The real efficiency equation

Direct development has a cost:

<div class="formula-block" role="group" aria-label="C direct equals C design plus C implementation plus C debugging plus C verification">
  <span class="formula-line"><em>C</em><sub>direct</sub> = <em>C</em><sub>design</sub> + <em>C</em><sub>implementation</sub> + <em>C</em><sub>debugging</sub> + <em>C</em><sub>verification</sub></span>
</div>

Agentic development has a different cost:

<div class="formula-block" role="group" aria-label="C agent equals C design plus C context plus C specification plus C harness plus C review plus C correction plus C integration">
  <span class="formula-line"><em>C</em><sub>agent</sub> = <em>C</em><sub>design</sub> + <em>C</em><sub>context</sub> + <em>C</em><sub>specification</sub></span>
  <span class="formula-line">&nbsp;&nbsp;+ <em>C</em><sub>harness</sub> + <em>C</em><sub>review</sub> + <em>C</em><sub>correction</sub> + <em>C</em><sub>integration</sub></span>
</div>

The design term does not disappear.

The AI workflow wins when the implementation and debugging effort it removes is greater than the context, specification, review, correction, and integration effort it introduces.

For a junior programmer, typing and local implementation may constitute a large share of the total cost.

For a senior engineer working in a familiar stack, the code itself may be relatively inexpensive. The expensive part is deciding:

* what the state means;
* where responsibility belongs;
* what must remain invariant;
* which compatibility behavior matters;
* how deployment can fail;
* what policy the system should implement.

If I spend forty-five minutes scaffolding an agent to avoid forty-five minutes of coding, I have not automatically improved productivity.

I may have simply exchanged one form of concentrated engineering for another.

### One-for-one time can still produce value

Equal immediate time does not necessarily mean the agent workflow is pointless.

The resulting tests may become durable assets. The specification may support several platform implementations. The agent may produce documentation, edge-case coverage, and migration validation that I would not have written manually. Parallel agents may allow other work to advance during execution.

The agentic process may therefore create:

* quality leverage;
* reuse;
* breadth;
* parallelism;
* regression protection;
* institutional memory.

Those are real gains.

But they should not be confused with immediate implementation speed.

The meaningful question is not:

> Did the model type the code faster than I could?

It is:

> Did the process produce more trusted, integrated, maintainable behavior per unit of scarce human attention?

### Waiting time is not the same as saved attention

Agent workflows often feel efficient because the model is visibly working while the engineer does something else.

That can be genuine parallelism.

It can also create delayed review debt.

Suppose three agents produce three substantial patches while I design a fourth feature. I now have:

* three unfamiliar implementations;
* three sets of assumptions to reconstruct;
* possible overlap or architectural drift;
* integration decisions;
* a queue of plausible-looking code requiring high-attention review.

The work ran in parallel, but understanding and integration may remain serial.

If generated output arrives faster than I can establish confidence in it, I have increased work in progress rather than completed software.

This is the same reason a factory’s output is not measured by how many parts leave individual machines. It is measured by how many conforming products pass through the whole system.

### Different practices develop different skills

Direct programming develops:

* causal tracing;
* fluency with state and control flow;
* sensitivity to abstraction boundaries;
* language and runtime intuition;
* awareness of where complexity accumulates;
* the ability to recognize that a mechanism feels mechanically wrong.

Agent supervision develops:

* invariant definition;
* behavioral decomposition;
* test design;
* evaluator construction;
* adversarial thinking;
* specification review;
* integration of implementations written by others.

Both are forms of engineering.

They are not interchangeable practice.

If I stop constructing mechanisms almost entirely, I may become better at specifying boundaries while losing some of the tactile understanding that lets me detect a bad internal design before a test exposes it.

That matters because every evaluator is incomplete relative to the full system.

The supervisor of an AI factory still needs enough mechanical understanding to recognize when the factory has optimized the proxy instead of the machine.

### Tests are measurement fixtures

A useful way to reconcile the two approaches is to stop treating the test suite as a complete alternate representation of the software.

Tests are measurement fixtures placed around the machine.

They tell us:

* this transition must remain possible;
* this transition must never occur;
* this output must follow this input;
* this historical defect must not return;
* this invariant must hold across a defined boundary.

They do not necessarily describe the complete internal motion of the system.

The mechanism-oriented engineer asks:

> How does state move through this machine?

The contract-oriented engineer asks:

> Which externally meaningful properties must remain true while it moves?

Those perspectives are complementary.

The mistake is asking either one to replace the other completely.

### A better hybrid loop

For novel, stateful, or architecturally significant work, a more natural process is:

<div class="formula-block" role="group" aria-label="mechanism leads to discovery, then invariant, then automation, then revised mechanism">
  <span class="formula-line">mechanism → discovery → invariant → automation → revised mechanism</span>
</div>

First, trace the state and identify ownership, transitions, side effects, and failure boundaries.

Then build a thin vertical slice. It may be hand-written or model-generated, but its purpose is to expose the actual structure rather than to claim completeness.

Inspect the implementation causally:

* What calls what?
* Where does state truly change?
* What happens if the operation fails halfway through?
* Can two instances interleave?
* Which component possesses the information required to make the decision?
* Is an abstraction carrying responsibility it cannot actually own?

Once the mechanism reveals the important facts, extract durable invariants.

Then let the model expand:

* edge cases;
* adapters;
* platform parity;
* call-site changes;
* regression coverage;
* documentation;
* adversarial tests;
* mechanical cleanup.

This division preserves direct mechanical reasoning where it produces the most information and uses automated search where the desired behavior is sufficiently stable.

The rule is not “always code first” or “always test first.”

It is:

> Code first enough to learn. Contract first enough to control.

## Part III: Am I Hand-Coding a Stochastic Software Factory?

> “In other words, instead of hand coding the software, I’m hand coding the software factory for the AI to stochastically generate the software. I’m not sure why this is superior, and I’m wondering whether it is perhaps inferior.”

Yes.

It can be inferior.

The fact that an activity occurs at a level above source code does not make it more efficient, more sophisticated, or more valuable.

### What the factory actually is

The effective AI production system consists of more than the model:

<div class="formula-block" role="group" aria-label="F is the set containing prompt, repository context, instructions, tests, tools, agent loop, and review process">
  <span class="formula-line"><em>F</em> = { prompt, repository context, instructions, tests, tools, agent loop, review process }</span>
</div>

The factory accepts an intention and emits a candidate patch:

<div class="formula-block" role="group" aria-label="F of I comma omega produces p">
  <span class="formula-line"><em>F</em>(<em>I</em>, ω) → <em>p</em></span>
</div>

where ω represents stochastic variation in the model’s generation and tool use.

Because the output is probabilistic, the factory also requires quality control:

<div class="formula-block" role="group" aria-label="Q of p produces accept, reject, or repair">
  <span class="formula-line"><em>Q</em>(<em>p</em>) → { accept, reject, repair }</span>
</div>

The complete production process is therefore not merely generation:

<div class="formula-block" role="group" aria-label="intent leads to factory construction, then candidate, then inspection, then correction, then integration">
  <span class="formula-line">intent → factory construction → candidate → inspection → correction → integration</span>
</div>

The economic question is whether this entire path is cheaper or more productive than direct construction.

### A factory rebuilt for every part is not much of a factory

A real factory justifies its capital cost through reuse.

Fixtures, tooling, process controls, machinery, training, and quality systems are built once and applied repeatedly. The marginal cost of the next unit falls because the production system persists.

The same should be true of an AI software factory.

Durable assets might include:

* repository-level architectural rules;
* stable agent instructions;
* executable API contracts;
* reusable fixtures;
* realistic integration environments;
* automated security checks;
* deployment validation;
* shared schemas;
* code-generation conventions;
* cross-platform parity checks;
* reliable review and integration pipelines.

Those assets remain useful after a single ticket.

But suppose every task requires me to:

* explain the repository again;
* identify the relevant files;
* restate architectural conventions;
* define the state flow;
* enumerate edge cases;
* prohibit unrelated refactors;
* correct the model’s first interpretation;
* explain why a locally plausible approach violates the wider system;
* inspect every generated branch;
* clean up the result.

I have not built a durable software factory.

I am managing a stochastic subcontractor on a bespoke engagement.

The work may still be worthwhile. But its value must be established task by task.

### The factory needs semantic compression

The factory model becomes compelling when a small amount of human semantic input produces a much larger amount of reliable output.

We can define an informal leverage ratio:

<div class="formula-block" role="group" aria-label="Lambda equals trusted integrated behavior produced divided by scarce human attention required">
  <span class="formula-line">Λ = trusted, integrated behavior produced ÷ scarce human attention required</span>
</div>

A high-leverage task looks like this:

> Apply this established authorization rule consistently across forty endpoints, generate regression tests, update the shared types, and report every incompatible call site.

The human policy is compact. The implementation surface is large. The evaluator is reasonably strong. The pattern is reusable.

A low-leverage task looks like this:

> In this function, fetch this record, inspect these three fields, branch under these exact conditions, call this dependency before that dependency, preserve this side effect, wrap these changes in a transaction, catch these two failures differently, and update this other record afterward.

At that point, I have supplied most of the program’s semantic content.

The model’s job is largely translation.

If I then need to verify every detail, the leverage ratio may fall below one.

### The worst case is programming twice

The workflow can become:

<div class="formula-block" role="group" aria-label="English pseudo-program leads to stochastic translation, then source code, then human reconstruction">
  <span class="formula-line">English pseudo-program → stochastic translation → source code → human reconstruction</span>
</div>

Instead of:

<div class="formula-block" role="group" aria-label="source code">
  <span class="formula-line">source code</span>
</div>

Natural language is not automatically a higher-level programming language.

A higher-level language is valuable when it offers reliable semantic compression. I can express an operation compactly because the compiler, runtime, framework, or library has stable rules for expanding it.

Prompts do not always possess those stable semantics.

The meaning of an instruction depends on:

* which context was supplied;
* what the model noticed;
* what assumptions it made;
* which examples influenced it;
* which version of the model is running;
* how the agent navigated the repository;
* what happened in earlier generations.

The prompt may be shorter than the implementation while containing less precision.

Then the model fills in the missing precision from its priors.

Sometimes it guesses well. Sometimes it generates a design that is locally conventional and globally wrong.

### Source code is already an excellent specification medium

For an experienced engineer, code has important advantages:

* It is exact.
* It is executable.
* It is type-checkable.
* It is versioned.
* Its semantics are comparatively stable.
* It exposes state transitions.
* It composes with surrounding code.
* It can be inspected by static tools.
* It does not need to interpret vague modifiers such as “appropriately,” “normally,” or “handle safely.”

If I already understand the desired mechanism, writing the source may be the most compressed way to express it.

Replacing code with prose is not automatically abstraction.

Sometimes it is loss of information.

### Review can be more expensive than authorship

When I write a mechanism directly, understanding is produced as part of the act.

I know why the branch exists because I encountered the case that required it. I know why the transaction boundary is there because I reasoned through the failure path. I know why the abstraction is narrow because I rejected a broader one.

When an agent writes the code, I receive the final artifact without the sequence of decisions that produced it.

I must reconstruct:

* the state model;
* the assumptions;
* the dependency flow;
* the error semantics;
* the hidden coupling;
* the reasons behind new abstractions.

That reconstruction can take longer than writing the code.

This is particularly true of generated code because it often looks polished. It can use familiar patterns, plausible naming, and complete-looking error handling while containing a subtle misunderstanding of the domain.

A compiler error announces itself.

A green test suite around a mistaken state model can survive for months.

### The factory creates another debugging layer

Direct development primarily asks:

> Is the implementation wrong?

Agentic development introduces additional possibilities:

* The context was incomplete.
* The requirements were wrong.
* The prompt was ambiguous.
* The tests encoded the wrong behavior.
* The agent misunderstood repository conventions.
* The model made a poor architectural inference.
* The model optimized only the visible tests.
* The selected sample was worse than another possible sample.
* Multiple correct local patches do not compose globally.
* The review process failed to notice the mismatch.

I am debugging both the software and the process that generated the software.

That additional layer is justified only when it creates enough leverage.

### Intrinsic engineering versus AI supervision tax

Not all scaffolding is waste.

A crucial distinction exists between work that the system genuinely requires and work caused by model limitations.

<div class="table-responsive article-table">
  <table class="table table-striped table-bordered align-middle">
    <thead>
      <tr>
        <th scope="col">Intrinsic engineering</th>
        <th scope="col">AI-specific supervision overhead</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Choosing the security policy</td>
        <td>Repeatedly explaining which files implement it</td>
      </tr>
      <tr>
        <td>Defining transaction boundaries</td>
        <td>Correcting unnecessary refactors</td>
      </tr>
      <tr>
        <td>Establishing migration postconditions</td>
        <td>Reminding the agent about repository conventions</td>
      </tr>
      <tr>
        <td>Writing a durable regression test</td>
        <td>Adding tests only to stop a recurring model mistake</td>
      </tr>
      <tr>
        <td>Defining authorization invariants</td>
        <td>Re-supplying context the agent failed to preserve</td>
      </tr>
      <tr>
        <td>Resolving stakeholder conflicts</td>
        <td>Reviewing boilerplate that did not need to exist</td>
      </tr>
      <tr>
        <td>Designing recovery behavior</td>
        <td>Running repeated generations because the first drifted</td>
      </tr>
    </tbody>
  </table>
</div>

The left column is valuable even if I write the implementation personally.

The right column is a tax imposed by the current production mechanism.

It is a mistake to relabel the entire right column “higher-order engineering” merely because it occurs above the code.

Sometimes it is just supervision.

### Proxy optimization is a factory defect

The factory can only optimize what its evaluator exposes.

Suppose the evaluator checks:

* tests pass;
* types compile;
* lint is clean;
* the endpoint returns the expected response.

The real objective may additionally include:

* consistency with the domain model;
* future extensibility;
* operational observability;
* compatibility with an undocumented client;
* correct behavior under production-scale concurrency;
* minimizing migration risk;
* preserving a security boundary not represented in the test;
* avoiding a new abstraction that duplicates an existing one.

The generated patch may maximize the visible score while reducing the actual quality of the system.

This is not unique to AI. Human organizations also optimize proxies. AI increases the speed and volume at which proxy-optimized implementations can be produced.

A strong factory therefore needs more than generation capacity. It needs a high-quality, continuously updated model of what “good” means.

That evaluator may be more expensive than the code generator.

### Parallelism changes throughput, not truth

Parallel agents are one of the strongest arguments for the factory model.

One agent can implement a feature while another writes adversarial tests, a third inspects security boundaries, and a fourth reviews repository-wide consequences.

This can produce examination at a scale difficult for one human to perform manually.

It can also move the bottleneck downstream.

Every branch eventually requires:

* architectural reconciliation;
* conflict resolution;
* integrated testing;
* prioritization;
* deployment judgment;
* ownership.

If agent output grows faster than trusted integration capacity, the queue expands.

The scarce resource becomes not code generation but justified confidence.

That is why the correct productivity metric is:

<div class="formula-block" role="group" aria-label="completed productivity equals trusted behavior operating in the product divided by human attention, elapsed time, and risk">
  <span class="formula-line">completed productivity =</span>
  <span class="formula-line">&nbsp;&nbsp;trusted behavior operating in the product</span>
  <span class="formula-line">&nbsp;&nbsp;─────────────────────────────────────────</span>
  <span class="formula-line">&nbsp;&nbsp;human attention, elapsed time, and risk</span>
</div>

Lines generated, tokens consumed, branches opened, and tests written are intermediate measures.

They are not the product.

### When the factory is genuinely superior

The AI factory is most attractive when several conditions align.

The intended behavior is stable. The pattern repeats. Verification is cheaper than construction. The output surface is much larger than the semantic input. Errors are local or reversible. The repository provides strong conventions. The generated work can be integrated independently.

Examples include:

* applying one known pattern to many endpoints;
* implementing the same contract across web, iOS, and Android;
* generating adapters and data-transfer objects;
* expanding edge-case tests around known invariants;
* migrating call sites during a mechanical refactor;
* generating repetitive schemas and fixtures;
* checking platform parity;
* documenting an established implementation;
* running adversarial review from several perspectives.

In these cases, one compact human decision controls a broad implementation surface.

That is real automation.

### When the factory may be inferior

Direct construction often remains attractive when the work is:

* small;
* one-off;
* highly coupled;
* architecturally novel;
* difficult to verify independently;
* dependent on tacit production knowledge;
* primarily about discovering the state model;
* easier to express in code than in prose and tests.

A unique 100-line state transition can be harder to specify and review than to write.

A new subsystem whose architecture is still forming may not benefit from being generated against a prematurely frozen contract.

A subtle concurrency mechanism may require the reviewer to trace every path regardless of who authored it.

In those cases, delegating implementation may remove typing but preserve—or increase—the hard cognitive work.

### The semantic spine and mechanical surface

A useful division is to separate the semantic spine from the mechanical surface area.

The semantic spine includes:

* the state model;
* ownership;
* legal transitions;
* transaction boundaries;
* trust boundaries;
* concurrency semantics;
* architectural responsibilities;
* recovery behavior;
* irreversible product and security decisions.

The mechanical surface includes:

* repetitive adapters;
* call-site changes;
* platform-specific translations;
* fixtures;
* common validation;
* test expansion;
* documentation;
* established error-handling patterns;
* routine refactors.

For my style of engineering, the strongest workflow may be:

<div class="formula-block" role="group" aria-label="human-designed semantic spine plus AI-expanded mechanical surface plus AI-assisted adversarial verification">
  <span class="formula-line">human-designed semantic spine + AI-expanded mechanical surface + AI-assisted adversarial verification</span>
</div>

That is different from:

<div class="formula-block" role="group" aria-label="human-built evaluator plus AI guesses the entire machine">
  <span class="formula-line">human-built evaluator + AI guesses the entire machine</span>
</div>

The former uses AI as force multiplication.

The latter risks replacing a precise implementation process with an ambiguous specification process and an expensive review process.

### A practical decision matrix

Two variables largely determine whether the factory is attractive:

1. How well is the desired behavior understood?
2. How often will the pattern be reused?

<div class="table-responsive article-table">
  <table class="table table-striped table-bordered align-middle">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">One-off or novel</th>
        <th scope="col">Repeated or broad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Behavior understood</th>
        <td>Direct coding or a tight hybrid may be fastest</td>
        <td>Build the factory; amortization is strong</td>
      </tr>
      <tr>
        <th scope="row">Behavior uncertain</th>
        <td>Human-led exploration and thin prototypes</td>
        <td>Discover the pattern first, then encode and automate it</td>
      </tr>
    </tbody>
  </table>
</div>

The worst place to build an elaborate factory is the upper-left corner’s opposite: a one-off mechanism whose behavior and architecture are both still being discovered.

The best place is a stable rule with a broad, repetitive implementation surface.

### A stopping rule

I should stop scaffolding and write the code when the prompt begins to specify control flow line by line, when the instruction is longer than the likely implementation, when nothing in the scaffolding will survive the ticket, or when reviewing the generated result requires reconstructing every path anyway.

I should continue investing in the factory when the evaluator will remain in the repository, the contract supports multiple implementations, the pattern is likely to recur, or the generated surface is far larger than the human policy.

The principle is simple:

> Do not build a factory to manufacture one part that is easier to machine by hand.

## Part IV: What Turing Says About Searching and Understanding Programs

> “How does all of this square with the Turing machine and Alan Turing’s research about understanding the behavior of a computer program? I feel that, if I understand the research correctly, it might definitively place a limit on being able to search the solution space and define the test cases and behavioral contract correctly. Let me know if this is wrong.”

The intuition is substantially correct, with an important qualification.

Turing’s work does not prove that programs cannot be understood.

It does not prove that testing is futile.

It does not prove that formal verification is impossible.

It does not prove that AI cannot become radically better than humans at software engineering.

It establishes a narrower and more consequential result:

> There is no universal algorithm that takes arbitrary programs and always terminates with a correct answer to certain general questions about their behavior.

That defeats the strongest possible version of the universal software factory.

### Computability is different from complexity

Three barriers are often blended together.

#### Under-specification

The desired answer has not been fully defined.

> What should the system do?

This is common in product and enterprise engineering.

#### Undecidability

No algorithm can be guaranteed to compute the answer for every instance in the unrestricted problem class.

> Can a universal procedure always determine this property?

This is where Turing and Rice apply.

#### Intractability

An algorithm exists, but executing it may require unreasonable resources.

> Can we afford to compute the answer?

Chess is primarily associated with the third barrier. The game is finite and specified, but exact exhaustive analysis is enormous.

General software can suffer from all three at once.

More compute can attack intractability.

It does not, by itself, supply an absent objective.

And it does not turn an undecidable general problem into a decidable one.

### Turing’s result

[Turing’s 1936–37 paper](https://doi.org/10.1112/plms/s2-42.1.230) introduced an abstract machine with a finite control, a tape, symbols, and mechanical transition rules. He then investigated whether there could be a general finite process for determining whether a machine was “circle-free”—roughly, whether it would continue producing the relevant output rather than becoming trapped in an unproductive process. He proved that no such general process exists.

The modern halting problem is commonly expressed through a hypothetical analyzer:

<div class="formula-block" role="group" aria-label="H of P comma x equals one if P of x eventually halts, and zero if P of x runs forever">
  <span class="formula-line"><em>H</em>(<em>P</em>, <em>x</em>) = { 1, if <em>P</em>(<em>x</em>) eventually halts; 0, if <em>P</em>(<em>x</em>) runs forever }</span>
</div>

Assume <em>H</em> is always correct and always terminates.

Now construct a program <em>D</em> that receives a program description and behaves as follows:

* If <em>H</em>(<em>P</em>, <em>P</em>) predicts that <em>P</em>(<em>P</em>) halts, loop forever.
* If <em>H</em>(<em>P</em>, <em>P</em>) predicts that <em>P</em>(<em>P</em>) runs forever, halt.

Now ask what happens when <em>D</em> receives its own description.

If <em>H</em>(<em>D</em>, <em>D</em>) predicts that <em>D</em>(<em>D</em>) halts, <em>D</em> loops.

If <em>H</em>(<em>D</em>, <em>D</em>) predicts that <em>D</em>(<em>D</em>) loops, <em>D</em> halts.

Either prediction contradicts the program constructed from it.

Therefore the assumed universal analyzer cannot exist.

The obstacle is not insufficient hardware.

The specification of the analyzer is internally impossible.

### Rice’s theorem moves from halting to semantics

[Rice’s theorem](https://www.ams.org/journals/tran/1953-074-02/S0002-9947-1953-0053041-6/S0002-9947-1953-0053041-6.pdf) generalizes the idea.

In its standard form, it says that every nontrivial extensional property of the partial function computed by an arbitrary program is undecidable.

“Extensional” means that the property concerns what the program computes, rather than its source-code spelling.

“Nontrivial” means that at least one program has the property and at least one program does not.

Examples include questions such as:

* Does this program compute the same function as a reference program?
* Does it return zero for every input?
* Is there any input for which it produces an output?
* Does it terminate on every input?
* Does it implement this arbitrary semantic behavior?

This must be stated precisely.

Rice’s theorem does not mean that every question about code is undecidable. Syntactic properties are often easy to decide. We can determine whether a file contains a particular import, whether an abstract syntax tree contains a loop, or whether a program type-checks.

Nor does it mean that no useful semantic property can ever be proved for a particular program.

It means there is no universal total procedure that correctly decides every instance of a nontrivial semantic property across arbitrary programs.

### The evaluator becomes the impossible component

A generalized software-search system needs a verifier:

<div class="formula-block" role="group" aria-label="V of p comma S equals one if p satisfies S, and zero if p does not satisfy S">
  <span class="formula-line"><em>V</em>(<em>p</em>, <em>S</em>) = { 1, if <em>p</em> ⊨ <em>S</em>; 0, if <em>p</em> ⊭ <em>S</em> }</span>
</div>

The system can enumerate or generate candidate programs:

<div class="formula-block" role="group" aria-label="p one, p two, p three, and so on">
  <span class="formula-line"><em>p</em><sub>1</sub>, <em>p</em><sub>2</sub>, <em>p</em><sub>3</sub>, …</span>
</div>

But it needs to determine when one of them is truly correct.

For arbitrary programs and arbitrary semantic specifications, no verifier can universally possess all three of these properties:

1. Soundness: it never approves an incorrect program.
2. Completeness: it approves every correct program.
3. Termination: it always returns an answer.

For an undecidable property, an always-terminating verifier must sacrifice soundness, completeness, or both.

Practical systems make different tradeoffs.

Tests terminate under controlled conditions but cover only selected executions.

Static analyzers use abstractions and may produce false positives or fail to capture some behavior.

Proof checkers can reliably check a supplied formal derivation, but automated proof search may not always find a proof or counterexample and terminate.

Runtime monitors observe actual executions, not every possible future execution.

Bounded model checkers can be exhaustive inside a chosen finite model while making no universal claim outside the bounds.

These are not merely embarrassing limitations of present-day tools. For unrestricted programs, some form of restriction or incompleteness is mathematically unavoidable.

### Search is possible; perfect stopping is not

Turing does not prevent a machine from generating programs.

It prevents a universal solution to the stopping question:

> Have we now found a program that is correct in every relevant semantic sense?

A search process may:

* find a correct implementation;
* find a proof for a restricted property;
* discover counterexamples;
* improve average performance;
* solve nearly every practical instance in a distribution;
* outperform every human engineer.

What it cannot have, in the unrestricted case, is a universal infallible procedure that always announces either:

* “This program is fully correct,” or
* “No correct program exists,”

and always finishes.

That distinction is essential.

Superhuman practical competence does not require universal decidability.

But universal decidability cannot be derived from superhuman practical competence.

### Why complete automatic test generation is impossible in general

Suppose there were an algorithm that accepted any arbitrary specification and program and generated a finite, always-terminating test suite with this property:

<div class="formula-block" role="group" aria-label="program passes the suite if and only if program is semantically correct">
  <span class="formula-line">program passes the suite ⇔ program is semantically correct</span>
</div>

We could run the generated suite and decide whether the program satisfies the specification.

For unrestricted semantic properties, that would produce the universal decider that Turing and Rice rule out.

Therefore, at least one limitation must appear:

* The test suite is incomplete.
* The domain is restricted.
* The execution is bounded.
* The generator can fail.
* Some tests may not terminate.
* The result can be wrong.
* The specification excludes meaningful behavior.
* The process applies only to a decidable subset of programs.

Automatic test generation can still be extraordinarily valuable.

The asymmetry is:

> A valid, reproducible failing test supplies a counterexample to the asserted contract.

But:

> Passing every currently known test does not generally prove the absence of all defects.

One valid counterexample is sufficient to refute a universal claim.

A finite absence of counterexamples is not normally sufficient to establish it.

### Behavioral contracts are stronger, but not magical

A formal contract can express much more than a list of examples.

Instead of testing ten unauthorized users, we might specify:

<div class="formula-block" role="group" aria-label="for all u and r, if u is not authorized for r, then u cannot read r">
  <span class="formula-line">∀ <em>u</em>, <em>r</em>: ¬authorized(<em>u</em>, <em>r</em>) ⇒ ¬canRead(<em>u</em>, <em>r</em>)</span>
</div>

That quantified property is stronger than a finite test set.

[C. A. R. Hoare’s axiomatic approach](https://doi.org/10.1145/363235.363259) formalized program reasoning using assertions such as:

<div class="formula-block" role="group" aria-label="Hoare triple P Q R">
  <span class="formula-line">{ <em>P</em> } <em>Q</em> { <em>R</em> }</span>
</div>

where <em>P</em> is a precondition, <em>Q</em> is a program, and <em>R</em> is a postcondition. In Hoare’s original partial-correctness reading, the triple establishes that if <em>P</em> holds and <em>Q</em> terminates, then <em>R</em> holds; termination requires a separate argument. The method allows us to prove that a program preserves specified logical relationships.

But formal verification separates two questions.

#### Does the implementation satisfy the contract?

This is a mathematical relationship between the program, model, and specification.

#### Is the contract an adequate statement of what the real system should do?

This is a modeling and requirements question.

A perfectly valid proof can establish the wrong business rule.

For example, we might formally prove that a malformed MFA record always locks out the user. The proof does not tell us whether locking out that user is the desired recovery policy.

We might prove that path and query identifiers are accepted whenever they match. The proof does not tell us whether allowing mixed identifier sources creates an ambiguity or attack surface the organization wishes to prohibit.

Formalism can prove the consequences of the premises.

It does not choose the premises for us.

### Specification and implementation correctness are different

Let:

<div class="formula-block" role="group" aria-label="R formal">
  <span class="formula-line"><em>R</em><sub>formal</sub></span>
</div>

be the formal contract, and:

<div class="formula-block" role="group" aria-label="R actual">
  <span class="formula-line"><em>R</em><sub>actual</sub></span>
</div>

be the real, perhaps only partially understood, organizational need.

Verification may establish:

<div class="formula-block" role="group" aria-label="p satisfies R formal">
  <span class="formula-line"><em>p</em> ⊨ <em>R</em><sub>formal</sub></span>
</div>

The product is successful only if:

<div class="formula-block" role="group" aria-label="R formal approximately equals R actual">
  <span class="formula-line"><em>R</em><sub>formal</sub> ≈ <em>R</em><sub>actual</sub></span>
</div>

The first relationship may be mathematically strong.

The second is often empirical, political, historical, and revisable.

This creates two independent failure modes:

1. The implementation fails to satisfy the specification.
2. The specification fails to represent the need.

Turing and Rice constrain universal automation of the first problem.

They do not solve the second problem at all.

### Randomness does not escape undecidability

A stochastic generator can sample candidates in productive ways.

Randomness can:

* diversify implementations;
* avoid repetitive local failures;
* improve expected performance;
* explore alternatives;
* produce several independent attempts;
* help search large practical spaces.

But randomness does not create a universal correctness oracle.

For any fixed random seed, the system is still performing a computation. Across seeds, it may attach probabilities to outcomes. It can be highly reliable on a useful distribution.

To remain compatible with undecidability, it must sometimes:

* be wrong;
* fail to answer;
* run indefinitely;
* restrict the problem;
* depend on an incomplete evaluator;
* ask for external judgment;
* observe the deployed system;
* revise after a counterexample.

That is exactly what practical coding agents do.

Their stochastic nature improves search. It does not eliminate the theoretical limit on universal evaluation.

### The finite-computer objection

A real physical computer has finite storage.

If we freeze:

* the exact hardware;
* all memory limits;
* every possible input;
* every external event;
* every dependency;
* the maximum execution duration;
* the entire environment;

then the system has a finite number of states.

In principle, one could explore states until reaching a terminal state or a previously visited state.

This moves the problem from undecidable to decidable.

But two qualifications matter.

First, the finite state space may be unimaginably large. The exhaustive procedure may be useless in practice even though it terminates in principle.

Second, real software claims usually quantify beyond a single frozen bound:

* any future user;
* any valid request sequence;
* continuing service operation;
* future database growth;
* arbitrary external timing;
* new vendor responses;
* changing versions;
* future integrations.

Once those dimensions are bounded, the actual claim becomes:

> The program satisfies this property inside this model and within these limits.

That can be an exceptionally valuable guarantee.

It is not the same as universal correctness in the open world.

### Restriction is the practical escape

Software engineering has not responded to undecidability by abandoning verification.

It responds by restricting the problem.

We use:

* finite-state models;
* bounded integers;
* restricted total languages that make selected termination questions decidable;
* domain-specific languages;
* restricted specification logics;
* type systems;
* ownership systems;
* capability models;
* protocol state machines;
* bounded model checking;
* carefully chosen abstractions.

[Clarke and Emerson’s foundational work on temporal-logic synthesis](https://doi.org/10.1016/0167-6423%2883%2990017-5) explicitly relied on finite-state synchronization skeletons and a finite-model property. Within that restricted setting, a decision procedure could determine satisfiability, construct a finite model, and derive a program skeleton satisfying the temporal specification.

This is the productive lesson.

We do not solve arbitrary program correctness.

We create decidable islands.

A broad requirement such as:

> Make concurrent access safe.

is transformed into a finite-state model with specific transitions and temporal properties.

A broad security goal such as:

> Never bypass a verified factor.

becomes a collection of state transitions and invariants that can be tested, modeled, or proved under explicit assumptions.

The narrower and more formal the island becomes, the stronger automation can be inside it.

But narrowing the island requires judgment.

Somebody must determine which state to include, which behavior to abstract away, and whether the model captures the risks that matter.

### Turing does not prove direct coding is superior

The undecidability result applies to human-written code too.

A human engineer cannot universally determine the behavior of every arbitrary program.

Direct coding does not escape the theorem.

The theoretical result therefore does not prove:

> Humans should always write code manually.

It proves:

> The AI-factory path cannot justify itself through a universal promise that enough computation will eventually generate and conclusively verify every desired program.

The practical comparison remains contextual.

For a bounded protocol with a formal state machine, synthesis may be dramatically superior.

For a repetitive application pattern with a powerful test harness, an agent may generate reliable work at great scale.

For a novel socio-technical system whose objective and environment are changing, constructing the evaluator may remain as difficult as constructing the mechanism.

Turing tells us that this evaluator problem cannot be made universally perfect merely by adding compute.

## How the Four Questions Fit Together

The four questions are not separate objections. They describe one chain.

### 1. Stockfish works because the board already exists

Chess provides:

* state;
* actions;
* transitions;
* rules;
* payoff;
* simulation;
* a stopping condition.

Its search problem is vast but unusually well-defined.

### 2. Agentic coding asks the engineer to construct a board

Prompts, tests, schemas, contracts, tools, and fixtures define a local search environment.

The agent becomes more effective as that environment becomes clearer.

This is why the scaffolding can consume so much time. The engineer is not merely requesting code. The engineer is manufacturing the conditions under which code generation can be evaluated.

### 3. The factory pays only when the board is reusable

If the same rules govern many implementations, constructing the board creates leverage.

If the board is rebuilt for one small mechanism, its construction cost may exceed the implementation cost.

A factory is economically compelling when its fixed cost is amortized.

Otherwise it may be a more indirect way of producing one bespoke part.

### 4. Turing limits the possibility of a universal board

For unrestricted programs, there is no perfect general evaluator that is simultaneously sound, complete, and guaranteed to terminate.

Therefore the software factory must work within restricted domains, incomplete evaluators, probabilistic confidence, external observations, or human judgment.

That is not a temporary embarrassment.

It is the mathematical shape of the problem.

We can summarize the whole argument this way:

<div class="formula-block" role="group" aria-label="AI coding becomes Stockfish-like only after engineering creates a trustworthy board">
  <span class="formula-line"><strong>AI coding becomes Stockfish-like only after engineering creates a trustworthy board.</strong></span>
</div>

<div class="formula-block" role="group" aria-label="Creating that board can be the central engineering task">
  <span class="formula-line"><strong>Creating that board can be the central engineering task.</strong></span>
</div>

<div class="formula-block" role="group" aria-label="The board is valuable when reusable and costly when bespoke">
  <span class="formula-line"><strong>The board is valuable when reusable and costly when bespoke.</strong></span>
</div>

<div class="formula-block" role="group" aria-label="No universal board can perfectly decide arbitrary program behavior">
  <span class="formula-line"><strong>No universal board can perfectly decide arbitrary program behavior.</strong></span>
</div>

## A More Accurate Model of AI Software Engineering

The better analogy may not be chess.

It may be a mixture of:

* design;
* science;
* manufacturing;
* theorem proving;
* organizational coordination;
* control theory.

The process looks less like a single fixed game tree and more like:

<div class="formula-block" role="group" aria-label="observe the world, form a model, propose a mechanism, construct an evaluator, search implementations, deploy cautiously, observe consequences, and revise the model">
  <span class="formula-line">observe the world</span>
  <span class="formula-line">→ form a model</span>
  <span class="formula-line">→ propose a mechanism</span>
  <span class="formula-line">→ construct an evaluator</span>
  <span class="formula-line">→ search implementations</span>
  <span class="formula-line">→ deploy cautiously</span>
  <span class="formula-line">→ observe consequences</span>
  <span class="formula-line">→ revise the model</span>
</div>

Within this loop, many subproblems are highly searchable.

AI can generate code variants. It can design tests. It can discover edge cases. It can inspect repositories. It can compare architectures. It can attempt proofs. It can simulate load. It can review changes from security, performance, and maintainability perspectives.

But the loop remains coupled to the world.

The world supplies new information that was not present in the original prompt.

### Compute may dominate without being the only constraint

There is a metaphysical argument that all machine intelligence ultimately runs on computation. Under that broad definition, stakeholder interviews, experimentation, observation, and policy analysis can all be performed by a sufficiently capable computational system.

But that usage makes “compute is the only constraint” nearly empty.

An autonomous AI engineering organization would still need:

* access to systems;
* authority to change them;
* observations from users;
* elapsed time for real-world consequences to emerge;
* permission to conduct experiments;
* institutional responsibility;
* mechanisms for resolving conflicting preferences;
* a model of legal and operational risk.

Its cognition may be powered by compute.

Compute alone does not grant the system access, authority, evidence, or legitimate objectives.

A model can decide which production experiment would be informative. It cannot observe the result before the production environment has generated it.

A model can identify a policy conflict. It cannot derive a unique organizational preference from logic when several value choices are coherent.

A model can infer hidden behavior with high probability. It cannot guarantee knowledge of an arbitrary fact absent from its observations.

These are not all “compute constraints” in the operational sense relevant to engineering.

### Superhuman engineering remains plausible

None of this implies that humans retain a permanent exclusive role.

An AI system may eventually become better than humans at:

* eliciting requirements;
* detecting contradictions;
* constructing formal models;
* designing experiments;
* understanding legacy systems;
* choosing abstractions;
* generating implementations;
* proving bounded properties;
* coordinating deployments;
* monitoring consequences;
* revising designs.

Such a system may make human programming economically marginal.

But its success would come from mastering the entire open-world engineering loop, not merely from searching code strings more deeply.

Calling that system “Stockfish for coding” would understate what it had become.

It would be an autonomous product designer, systems architect, developer, tester, operator, security reviewer, and organizational decision agent.

## What This Means for the Practice of Coding

The practical question is not whether to use AI.

The practical question is where AI creates leverage and where it merely relocates the work.

### Preserve direct contact with the machine

For stateful, novel, or high-risk mechanisms, I should retain enough direct implementation work to understand:

* where state lives;
* how it changes;
* what owns each decision;
* how failures propagate;
* where concurrency enters;
* which effects are reversible;
* which assumptions are architectural.

This is not nostalgia for typing.

It is preservation of causal knowledge.

### Turn discoveries into durable constraints

Once implementation or investigation reveals an important rule, encode it:

* as a type;
* as a schema;
* as a transaction invariant;
* as a regression test;
* as a model-checking property;
* as an API contract;
* as repository guidance;
* as deployment validation.

The most valuable contracts are not arbitrary hoops constructed to control one generation.

They are compressed engineering knowledge that protects the system after the original engineer has moved on.

### Delegate breadth after the semantic center stabilizes

Once the state model and policy are clear, AI can be used aggressively.

It can expand one decision across:

* many endpoints;
* several clients;
* multiple platforms;
* broad test matrices;
* adapters;
* migrations;
* documentation;
* compatibility checks.

This is where stochastic generation becomes a factory rather than a translation service.

### Use multiple agents to challenge, not merely multiply

Parallel agents are most valuable when they provide independent perspectives:

* one implements;
* one searches for counterexamples;
* one inspects authorization;
* one traces concurrency;
* one evaluates migration safety;
* one checks integration with surrounding architecture.

Generating five versions of the same plausible patch is less valuable than giving five agents distinct evaluative responsibilities.

### Review causally, not cosmetically

A generated patch should not be accepted merely because it looks idiomatic and passes visible tests.

The reviewer should still ask:

* What state transition is this implementing?
* What assumptions does it make?
* Which paths are not represented in the tests?
* Where can partial failure leave the system?
* Does the abstraction own the correct responsibility?
* What production behavior could invalidate this model?
* What happens when this feature evolves?

The machine must still make sense as a machine.

## The Final Verdict on the Stockfish Analogy

The analogy is useful in one important sense:

AI may eventually outperform every human programmer so decisively that competing through unaided manual implementation becomes pointless.

That is a plausible prediction.

The analogy is also useful for bounded programming tasks:

Once a problem has a stable state representation, explicit rules, an executable contract, cheap simulation, and a trustworthy evaluator, additional search and compute can produce increasingly capable solutions.

That already describes many algorithmic tasks, refactors, regressions, protocol implementations, and test-driven changes.

But the analogy fails as a complete theory of original and enterprise software.

Chess begins with the rules already written.

Software engineering often begins with incomplete evidence about what the rules should be.

Chess separates the player from the board.

Enterprise software changes the board on which the organization is operating.

Chess has a universal payoff.

Software has stakeholders with conflicting objectives, policies that must be chosen, risks that cannot be reduced to a single scalar, and consequences that become visible only after deployment.

Chess permits exact simulation.

Software interacts with people, vendors, institutions, attackers, physical devices, and future events.

Chess search is hard because the tree is enormous.

Software search can be hard because the tree is enormous, the evaluator is incomplete, the environment is partially observed, the objective is evolving, and some general semantic questions are formally undecidable.

That is the deepest flaw in the compute-only argument.

The argument treats the correct evaluator as free.

It is not free.

Sometimes the evaluator is a small test suite that can be written in ten minutes.

Sometimes it is a formal state model requiring days of work.

Sometimes it is a production experiment requiring weeks of observation.

Sometimes it is a policy decision that no amount of computation can uniquely derive from technical facts.

Sometimes, under unrestricted assumptions, the perfect evaluator cannot exist at all.

## Conclusion: The Board Is Part of the Product

The future of programming may involve far less hand-written implementation.

It may involve agents continuously generating, testing, reviewing, and deploying software. A single engineer may coordinate a level of implementation capacity that once required a large team. Reusable contracts and repository-aware harnesses may turn broad categories of application development into highly automated production systems.

But that future is not obtained merely by pointing enough compute at the space of all possible code.

Software becomes searchable only after enough of the problem has been represented:

* the state;
* the rules;
* the environment;
* the objective;
* the evaluator;
* the bounds.

Constructing that representation is not administrative overhead around the engineering.

It is often the engineering.

Sometimes the representation is far more reusable than the implementation. In those cases, building the factory is a profound improvement. One durable contract can generate several implementations, support future changes, prevent regressions, and enable parallel verification.

Sometimes the representation is merely an imprecise duplicate of a small program. In those cases, the engineer writes the program in English, the model translates it into source code, and the engineer reviews the translation. The factory is inferior to the machine it was built to produce.

Turing adds the final boundary. No universal procedure can perfectly determine arbitrary program behavior. Tests, contracts, proofs, types, and model checkers succeed by restricting the domain, choosing abstractions, and constructing decidable islands. They can provide extraordinary assurance inside those islands. They cannot eliminate the need to decide whether the island represents the world that matters.

So the mature position is neither:

> AI coding is merely autocomplete and will never replace direct programming.

Nor:

> Software is chess, and enough compute will mechanically search its way to every correct application.

It is this:

> AI can make implementation search extraordinarily powerful. The limiting problem increasingly becomes the construction of trustworthy objectives, models, evaluators, and integration processes.

That is why the experience of modern agentic coding can feel inverted.

Instead of hand-coding the machine, I may find myself hand-coding the environment that generates and judges the machine.

Whether that is progress depends on what survives.

If the contract becomes durable knowledge, the tests preserve important behavior, the harness supports many changes, and the implementation surface greatly exceeds the human semantic input, I have built a factory.

If the scaffolding disappears with the conversation, the model merely translates my pseudo-program, and I must retrace every generated path to trust it, I have written the software twice.

Chess has a board.

Software has a world.

And in software engineering, the board itself is often part of what we are being paid to build.
