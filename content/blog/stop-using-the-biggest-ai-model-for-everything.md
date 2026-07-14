---
title: "Stop Using the Biggest AI Model for Everything"
slug: "stop-using-the-biggest-ai-model-for-everything"
datePublished: "2026-07-13"
excerpt: "AI cost control starts with matching the model and reasoning effort to the task, then spending more only when complexity earns it."
tags: ["ai", "engineering", "cost"]
---

AI is becoming a normal operating expense for engineering teams. It isn't a novelty budget anymore, and it probably isn't going away.

That makes one habit increasingly expensive: selecting the strongest model, turning reasoning effort to maximum, and leaving it there for every task.

I understand why people do it. The best model feels like the safest choice. If the company is paying, why risk a weaker answer? But fetching a Jira ticket and designing a cross-service data migration don't require the same amount of intelligence. Paying for both as if they do is like renting a crane to move a desk. It works, but that isn't the same as being sensible.

The goal isn't to use less AI. It's to spend the most intelligence where it creates the most value.

## Model Choice Is Part of the Design

We already match engineering tools to the job. We don't reach for a distributed database when a local file will do. We don't run an entire end-to-end suite to check whether a pure function returns the right value.

AI models deserve the same judgment.

Most model families now give us two useful controls:

- **Model capability:** Frontier models handle ambiguity, long context, and difficult reasoning better. Smaller or balanced models are faster and cheaper for routine work.
- **Reasoning effort:** Higher effort gives a model more room to analyze, explore, and verify before answering. That can improve hard tasks, but it also increases latency and token use.

These controls solve different problems. A capable model at low effort can be great for a short, precise task. A balanced model at medium effort may handle everyday implementation perfectly well. A frontier model at high or maximum effort earns its cost when the task is genuinely ambiguous, risky, or spread across several systems.

The mistake is treating the most expensive combination as a universal default.

## Start With the Task, Not the Model

Before choosing a model, I ask a simpler question: what kind of work am I asking it to do?

### Retrieval and Transformation

Fetching a ticket, summarizing a document, reformatting notes, extracting requirements, or drafting a predictable status update usually needs low effort. The model is moving known information from one shape to another.

This is where a fast model or low reasoning setting shines. More thinking rarely changes the result enough to justify the cost.

### Focused Implementation

A scoped code change with clear acceptance criteria needs more judgment, but not always the frontier. A balanced model at medium effort can often handle a small component, a validation rule, or a targeted test.

If the task has a known pattern and a narrow blast radius, start in the middle. Move up only if the model misses constraints or produces a weak plan.

### Architecture and Ambiguous Problems

Cross-repository discovery, system design, unfamiliar code, race conditions, migrations, and production incidents are different. Missing one hidden dependency can cost far more than the model call.

This is where I deliberately choose a frontier model and high reasoning effort. I want it to trace boundaries, challenge assumptions, and spend time looking for failure modes. Maximum effort can make sense when the downside of a shallow answer is large.

### Review and Verification

Review deserves its own pass. A model that wrote the code can become anchored to its first answer, so I often open a fresh context and ask for a critical review. High effort is useful when checking security, concurrency, data consistency, or subtle regressions.

For formatting, naming, and mechanical lint issues, it isn't.

## The Workflow I Use at Work

I created two small flow documents for my day-to-day work. One covers technical documentation. The other takes a Jira ticket through planning, implementation, review, and a pull request.

The important part isn't the exact model names. Those will change. The useful part is that each phase has an explicit capability and effort budget.

My Jira-to-PR flow looks roughly like this:

1. **Fetch requirements at low effort.** Retrieving and summarizing a ticket doesn't need deep reasoning.
2. **Plan at high or maximum effort.** This is where the model explores code boundaries, identifies affected files, and looks for state or data risks.
3. **Refine at medium effort.** Once the hard discovery is done, clarifying and tightening the plan needs less compute.
4. **Build at medium or high effort.** The setting depends on the size and risk of the approved plan.
5. **Review at high effort in a fresh context.** This is the time to be skeptical and search for expensive mistakes.

My documentation flow uses a similar split. I use a strong reasoning model to discover architecture across repositories and stress-test the design. Once the facts are settled, I switch to the model that produces the clearest technical prose. The best researcher isn't automatically the best writer.

That last point matters. Model routing isn't only about cheap versus expensive. Different models have different strengths. Cost efficiency means buying the capability the current phase needs.

## Escalate Instead of Defaulting to Maximum

I think the safest default is an escalation ladder.

Start with the lowest-cost setup that has a reasonable chance of succeeding. Give it a clear prompt, the right context, and an explicit output contract. If the result is incomplete, move up one effort level or choose a more capable model.

Escalate when you see evidence:

- The model misses constraints already present in the context.
- The task crosses several services or repositories.
- The answer requires difficult tradeoffs instead of simple recall.
- A mistake could affect security, money, customer data, or production availability.
- Repeated corrections cost more time and tokens than using a stronger model once.

Don't escalate because the answer arrived quickly. Speed isn't proof that the model didn't think enough. Judge the result against the task.

## Prompt Quality Is a Cost Control

A vague prompt makes every model more expensive.

If I ask, "Review this code," the model has to guess what matters. If I ask it to review changed files for authorization gaps, async bugs, and missing edge cases while ignoring cosmetic style, I reduce the search space.

Good context helps too. Point to the relevant ticket, files, constraints, and expected output. Don't attach three repositories when one module contains the answer. Large context windows are useful, but filling them without a reason still adds cost and noise.

A strong prompt doesn't need to be long. It needs a clear goal, enough evidence, boundaries, and a definition of done.

## Measure Outcomes, Not Token Pride

The cheapest model call isn't always the most cost-efficient one. A weak answer that takes four retries may cost more than one strong pass. A flawed migration plan can cost considerably more than either.

Track the full outcome:

- Did the task succeed without rework?
- How many retries or corrections did it need?
- How long did the engineer spend reviewing it?
- Did higher effort find risks the lower setting missed?
- What did a successful task cost at each setting?

Use real work as your evaluation set. Try one level lower on repeatable tasks and compare the result. If quality stays acceptable, keep the savings. If it drops, move back up.

The point is not to build a perfect routing system on day one. A short team guide with a few task categories is already better than "maximum everything."

## Wrap Up

AI usage is becoming non-negotiable for many engineering teams. Cost discipline has to become non-negotiable with it.

Use fast models and low effort for retrieval and predictable transformations. Use balanced settings for scoped implementation. Spend frontier capability and deep reasoning on architecture, ambiguity, and high-risk review. Escalate when the task proves it needs more.

Most importantly, separate the phases. Research, planning, implementation, writing, and review don't all need the same model or the same reasoning budget.

The best AI setup isn't the one with every dial turned to maximum. It's the one that spends maximum effort only when maximum effort can change the outcome.
