---
title: 'SOLID in the AI Era (Part 3): Liskov Substitution Without Fragile Hierarchies'
slug: 'solid-lsp-ai-era-part-3'
datePublished: '2026-03-03'
excerpt: 'Part 3 of a SOLID series: how to apply Liskov Substitution Principle with behavioral contracts, safe polymorphism, and composition over inheritance.'
tags: ['engineering', 'ai', 'solid']
---

In Part 1, I covered SRP. In Part 2, I covered OCP. Part 3 is **L: Liskov Substitution Principle (LSP)**: **if code works with a base type, it should also work with any of its subtypes without surprise behavior**. This is a behavior rule, not a syntax rule. You can compile perfectly and still violate LSP if a subtype breaks expectations at runtime.

## What LSP Actually Protects

LSP protects **contracts**. A contract includes:

- What a method promises to do
- What inputs are valid
- What outputs are guaranteed
- What side effects are expected
- What error conditions are allowed

If a subtype changes those expectations in a way that breaks callers, substitution fails. That means your design is fragile even if inheritance looks correct on paper.

## The Core Idea in One Sentence

**Subtypes may specialize behavior, but they must not violate the caller's assumptions.** Callers should not need `if (x is SpecialChild)` checks just to avoid crashes or bad behavior. When they do, that is usually an LSP smell.

## A Better Example: Notifications

The common "bird can't fly" example is useful but abstract. A production-style example is clearer. Imagine a system with a `Notifier` contract:

- Accept a message payload
- Attempt delivery
- Return a delivery result
- Never throw for normal delivery failure (return structured failure instead)

Now suppose you have:

- `EmailNotifier`
- `SmsNotifier`
- `PushNotifier`

All three satisfy the same behavioral contract. Then someone adds `WebhookNotifier` as a subtype but changes behavior:

- Throws exceptions on `4xx/5xx` instead of returning failure result
- Mutates payload by removing fields it does not need
- Retries forever internally, blocking request thread

It still implements the same interface, but it violates substitution:

- Caller expects a structured result, gets thrown errors
- Caller expects input immutability, gets data mutation
- Caller expects bounded execution, gets latency spikes

This creates real user impact: timeouts, inconsistent logs, partial processing, and hard-to-reproduce bugs.

## Why Inheritance Often Causes This

Inheritance makes code reuse easy, but it also makes it easy to inherit the wrong contract. A parent type can accidentally mix multiple assumptions:

- Capabilities not shared by all children
- Timing guarantees not realistic for all implementations
- Error semantics that only fit one transport

When that happens, child classes override behavior in incompatible ways. Callers then add defensive conditionals, and the abstraction collapses.

## How Composition Fixes This

Composition means assembling behavior from smaller capabilities instead of forcing everything into one parent-child hierarchy. Instead of saying all notifiers must behave like one giant base class, define tighter contracts and compose implementations from focused parts. Example composition shape:

- `MessageSerializer`
- `DeliveryTransport`
- `RetryPolicy`
- `FailureMapper`
- `TimeoutPolicy`

Then `EmailNotifier`, `SmsNotifier`, and `WebhookNotifier` are compositions of these capabilities, but all still expose the same `Notifier` behavior contract to callers. This gives you two major wins:

1. **Behavior consistency at the boundary**  
   The public contract stays stable and substitutable.

2. **Variation inside the implementation**  
   Different transports can vary safely without leaking transport-specific surprises to callers.

In short, composition isolates differences internally while preserving external substitutability.

## The Overarching Ideology

LSP is not about using inheritance correctly. It is about protecting trust between modules. When module A depends on module B's contract, A should not care which concrete subtype is plugged in. This aligns with the rest of SOLID:

- **SRP:** focused contracts are easier to honor
- **OCP:** new implementations can be added safely
- **LSP:** those implementations remain behaviorally compatible

Without LSP, OCP becomes fragile. You can extend the system, but each extension risks breaking existing flows.

## Practical LSP Checklist

Before adding a new implementation, verify:

1. **Preconditions are not stricter**  
   New subtype should not demand more than caller was told.

2. **Postconditions are not weaker**  
   New subtype should not guarantee less than caller expects.

3. **Error model is consistent**  
   Do not switch from result-based failure to thrown exceptions unless contract says so.

4. **Side effects are preserved**  
   Do not add surprising mutations or hidden global state changes.

5. **Performance envelope is compatible**  
   Keep timeout/retry behavior inside expected operational bounds.

If one of these checks fails, do not force it into the same abstraction. Split the contract or redesign with composition.

## Common Misunderstandings

- **Myth:** "Same method signature means LSP is satisfied."  
  **Reality:** LSP is about behavior, not shape.

- **Myth:** "LSP only matters when using inheritance."  
  **Reality:** It applies to any substitutable contract (interfaces, protocols, function types).

- **Myth:** "Composition replaces LSP."  
  **Reality:** Composition is a design technique that helps you satisfy LSP more reliably.

## Wrap Up

Liskov Substitution Principle is contract discipline:

- Keep caller expectations stable
- Let implementations vary behind that boundary
- Use composition to model capability differences without breaking substitutability

If a new implementation forces caller conditionals, surprise exceptions, or altered semantics, the abstraction is wrong. Design for replaceability with predictable behavior. That is LSP in practice.
