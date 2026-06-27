---
title: "Choosing Data Structures Without Overengineering"
slug: "choosing-data-structures-with-yagni"
datePublished: "2026-06-27"
excerpt: "Data structures are design choices, not collectibles. Arrays, Sets, Maps, and Heaps each answer a different question, and YAGNI helps you stop at the simplest one that fits."
tags: ["dsa", "fundamentals", "engineering"]
---

Data structures are easy to treat like collectibles.

You learn arrays, sets, maps, stacks, queues, heaps, tries, graphs, trees, and suddenly every problem starts looking like an excuse to use the fanciest thing in the drawer. I get it. There is a satisfying little dopamine hit when you recognize a clever structure.

But clever is not the same as clear.

Most everyday code does not need the most powerful data structure. It needs the smallest one that answers the question your code is asking. That is where YAGNI earns its keep. "You aren't gonna need it" is not an excuse to avoid thinking. It is a reminder to stop before you add machinery the problem has not asked for yet.

## Ask What Operation Dominates

The better question is not "which data structure is best?"

The better question is: **what does this code need to do over and over?**

If the code mostly walks items in order, an array is probably enough. If it mostly asks whether a value exists, a set is a better fit. If it needs to attach information to a key, reach for a map. If it repeatedly needs the next smallest or largest thing, now a heap is starting to make sense.

That framing keeps the choice grounded in behavior instead of vibes.

## Array First, Until It Hurts

Arrays are boring in the best possible way.

They preserve order, they are simple to iterate, and they are usually the easiest structure for the next engineer to understand. As we covered in [Big O Notation: What It Actually Measures](/blog/big-o-notation-fundamentals) and [Memory Layout and Cache Locality](/blog/memory-layout-and-cache-locality), a small linear scan can beat a theoretically better lookup because constants and memory access patterns matter.

```typescript
const roles = ["admin", "editor", "viewer"];

function canAccess(role: string): boolean {
    return roles.includes(role);
}
```

For three roles, this is fine. Honestly, it is better than fine. It is obvious.

Could you use a `Set`? Sure. But unless this list is growing, hot, or reused across a lot of checks, the array is not the problem. The problem would be pretending a tiny list needs infrastructure.

Arrays start to hurt when the operation changes. If membership checks dominate and the collection grows, scanning every time becomes noise you do not need.

## Set: When Existence Is the Whole Question

A `Set` stores unique values. That makes it a good fit when the main question is "have I seen this before?" or "is this allowed?"

```typescript
function hasDuplicateIds(ids: string[]): boolean {
    const seen = new Set<string>();

    for (const id of ids) {
        if (seen.has(id)) {
            return true;
        }

        seen.add(id);
    }

    return false;
}
```

The set expresses the intent directly. We are not counting ids. We are not storing metadata. We only care whether an id has appeared already.

This is where `Set` beats an array both in performance and readability. `seen.has(id)` says exactly what the code means.

The warning sign is when a set starts attracting side tables. If you have a `Set` for membership, plus a parallel array for order, plus another object for counts, the code is telling you something. You probably do not have a set problem anymore. You have a key-value problem.

## Map: When a Key Needs a Value

A `Map` is the right move when each key needs attached data.

Frequency counts are the classic example:

```typescript
function countWords(words: string[]): Map<string, number> {
    const counts = new Map<string, number>();

    for (const word of words) {
        counts.set(word, (counts.get(word) ?? 0) + 1);
    }

    return counts;
}
```

Now the question is not just "have I seen this word?" The question is "how many times have I seen it?" That value matters, so a set would be awkward.

Maps also fit last-seen indexes, grouping, memoization, and lookup tables where keys are not just strings. In JavaScript, `Map` keys can be objects, functions, numbers, strings, or other values, and iteration follows insertion order. That makes it a better default than a plain object when you are storing arbitrary key-value data rather than modeling a fixed shape.

The YAGNI part still applies. A `Map` is not automatically better than an object or an array. If you have a small fixed config shape, an object is clearer. If you have a tiny list, an array is fine. Use `Map` when the behavior is actually map-like.

## Heap: When Priority Is the Point

A heap is different from the others because JavaScript does not ship one as a built-in collection. That alone raises the bar.

Reach for a heap when you repeatedly need the next smallest or largest item and sorting the whole collection each time would be wasteful.

Good examples include:

- Keeping the top `k` scores from a large stream.
- Scheduling jobs by next run time.
- Merging several already sorted lists.
- Running graph algorithms like Dijkstra's shortest path.

If you only need sorted output once, sorting an array is usually simpler:

```typescript
const cheapest = products.toSorted((a, b) => a.price - b.price).slice(0, 10);
```

That is easy to read. Use it until the problem changes.

A heap becomes useful when the collection is changing and you keep asking for the next priority item. At that point, repeatedly sorting is doing too much work. The heap keeps just enough order to answer the priority question efficiently.

That last phrase matters: just enough order. A heap does not give you a fully sorted list. It gives you quick access to the min or max. If your code needs total ordering, a heap may be the wrong tool.

## A Practical Checklist

When I am unsure, I like asking these questions:

- Do I need to preserve order, or only visit everything?
- Do I need uniqueness or membership checks?
- Does each key need attached data?
- Do I repeatedly need the next highest or lowest priority item?
- Is the input small, fixed, or bounded?
- Am I solving a measured problem, or just preparing for one I do not have?
- Would the next engineer understand this choice in ten seconds?

That last one catches more mistakes than it should. A data structure can be technically appropriate and still be too much for the job. If it makes simple code feel ceremonial, pause.

## Wrap Up

Data structures are design choices. They communicate what the code cares about.

An array says order and iteration matter. A set says uniqueness or membership matters. A map says keys need values. A heap says priority matters more than full sorting.

YAGNI does not mean "always use the simplest thing forever." It means start with the simplest structure that matches the current operation. Then upgrade when the shape of the problem proves you need more.

That habit keeps code honest. It also keeps you from building a tiny distributed systems conference inside a helper function, which is good for everyone involved.
