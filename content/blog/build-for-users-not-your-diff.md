---
title: "Build for Users, Not for Your Diff"
slug: "build-for-users-not-your-diff"
excerpt: "Clean code means nothing if it solves the wrong problem or leaves users stuck. How to decide what to build, what to cut, and how to judge work from the user's seat."
tags: ["engineering", "leadership", "career"]
---

In [Engineers Are Problem Solvers, Not Just Coders](/blog/engineers-are-problem-solvers-not-just-coders), I talked about looking past the ticket to understand business context. This post is the next step: actually sitting in the end user's chair when deciding what to build and what to cut.

It's weirdly easy to spend a whole week writing clean, well-tested code and still ship a bad experience. I've done it. Most engineers have. You feel great about the pull request, the tests are green, the types are tight, and then you watch a real person try to use the feature and immediately get confused.

That sting is a useful reminder. The code is for us. The product is for them.

## The Comfort Trap of Code-Only Thinking

Code is comfortable because it plays by rules.

If a type doesn't match, the compiler tells you. If a refactor makes a module cleaner, you get a neat diff and a quiet sense of order. Users and business priorities are the opposite. They're messy, ambiguous, and occasionally contradict what felt obvious on Monday morning.

So when things feel fuzzy, our instinct is to retreat into the codebase. We polish an internal abstraction. We debate folder layouts. We spend two days making a component reusable for three hypothetical future screens that nobody has asked for yet.

Meanwhile, the actual user is staring at a generic "Something went wrong" banner with no idea whether their payment went through.

Caring about craft is good. Caring _only_ about the craft while ignoring what the person on the other side of the screen experiences is just hiding behind the keyboard.

## Users Don't See Your Architecture

Picture a familiar sprint. A team needs to ship an invoice export feature for customers who close their books at the end of every month.

One engineer spends four days building a pluggable export pipeline with custom adapters for CSV, PDF, XML, and future formats. The abstractions are spotless. Because time runs tight on Friday, the UI gets a plain button with no loading indicator, no progress feedback for large accounts, and a timeout error if the export takes more than ten seconds.

Ask yourself: what did the customer actually get?

They didn't get a pluggable pipeline. They got a button that looks broken when they click it.

Users don't read your git history, and they don't care how elegant your dependency graph is. They feel a much shorter list of things:

- **Speed.** Does this feel responsive, or am I waiting around wondering if my click registered?
- **Clarity.** Do I know what happened, what went wrong, and what I can do next?
- **Trust.** If I submit this form or click this button, am I confident my data is safe?
- **Friction.** How many hoops do I have to jump through to get my job done?

Good architecture matters because it helps you keep delivering those things reliably over time. It's a means to an end, not the scoreboard.

## Deciding What to Build (and What to Cut)

Once you start looking through the user's eyes, prioritization gets sharper. You stop asking "what would be cool to build?" and start asking "what actually moves the needle?"

Most engineering teams don't suffer from a shortage of ideas. They suffer from building low-impact things thoroughly while high-impact things sit half-finished.

When I'm deciding where to spend engineering time, I weigh three questions:

1. **Who feels the pain, and how often?** A five-second lag on a daily workflow hurts far more than an ugly layout on a settings page someone opens once a year.
2. **What is the business cost of doing nothing?** Does this block a sale, create support tickets, cause churn, or slow down an internal team every week? If nobody can name the cost, it's probably not urgent.
3. **What is the smallest version that delivers real value?** Shipping a reliable CSV export with clear loading and error states beats shipping a half-baked multi-format engine. You can always extend what people actually use.

Cutting scope isn't being lazy. It's protecting your team's time so the parts that _do_ ship actually feel good to use. Honestly, some of the highest-value engineering decisions I've been part of were conversations where we agreed not to build half the original spec so we could nail the core flow.

## A Quick Pre-Code Check

Before you create a branch on your next feature, run through this short list. It takes five minutes and saves days of misdirected work:

- **Walk the user's path yourself.** Click through the existing flow as a customer, not as a developer with seeded test data and fast local Wi-Fi.
- **Check the unhappy paths first.** What happens on slow networks, empty states, bad input, or partial failures? Those moments shape user trust more than the happy path ever will.
- **Separate "nice for engineers" from "valuable for users."** Refactoring is healthy when it unblocks delivery or reduces bugs. If it's just scratching an aesthetic itch while user pain sits untouched, defer it.
- **Define what success looks like after launch.** Fewer support tickets? Faster checkout completion? Higher adoption? If you don't know how you'll tell whether it worked, ask before you build.

## Wrap Up

Writing good code is table stakes. Deciding _what_ is worth writing, and judging it by the experience it creates, is what separates a coder from a product-minded engineer.

- Treat code quality as a tool that serves reliability and speed of change, not an end in itself.
- Judge features from the user's seat: speed, clarity, trust, and friction beat internal elegance every time.
- Cut speculative scope early so you have room to polish the core flow and the unhappy paths.
- Before you start coding, know whose problem you're solving and how you'll measure whether it actually helped.
