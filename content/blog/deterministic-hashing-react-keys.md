---
title: "Why Random IDs Break React Hydration (And How Deterministic Hashing Fixed It)"
slug: "deterministic-hashing-react-keys"
datePublished: "2026-02-22"
excerpt: "A production SSR bug caused by random list keys in React, and how deterministic ID generation resolved hydration mismatches with predictable behavior."
tags: ["engineering", "react", "dsa"]
---

## Situation

Early in my career, I worked on a project rebuilding a component library from scratch. We were pulling product data from an internal CMS and rendering dynamic product lists in React.

The data came in as arrays of objects. Each object had rich product information: name, price, category, image URLs, and so on. But the CMS did not include a unique identifier on any of them. No `id` field. No `uuid`. Nothing.

This scenario is more common than most teams expect. It appears when data comes from sources that were never designed with frontend rendering in mind: flat-file feeds, third-party catalogs, legacy APIs, and older internal content tools. The content itself is valid, but it lacks the identity metadata React relies on.

React requires a stable, unique `key` prop on every element in a rendered list. Without it, React cannot reliably track which items changed, moved, or were removed between renders. The framework will warn you, performance degrades, and in server-side rendering scenarios things can break in ways that are much harder to debug.

We needed unique IDs. The data was not giving them to us. So we had to generate them ourselves.

---

## Task

The goal was straightforward: enrich each incoming product object with a unique `id` before it ever reached a React component.

The function needed to run on the raw CMS array, walk each object, and attach a stable identifier. It also had to be reusable because product lists appeared in multiple places across the component library.

Simple enough in theory. That is where things went sideways.

---

## Action

A developer on the team wrote the initial solution. The structure was sound: iterate through the array, attach an ID, and return the enriched objects. The issue was the ID strategy itself.

```typescript
import { nanoid } from "nanoid";

/**
 * Attaches a random unique ID to each object in an array.
 * ⚠️ Problem: IDs are non-deterministic. A new ID is generated on every call.
 *
 * @param items - Array of objects to enrich
 * @returns Array with a random `id` field added to each object
 */
function attachRandomIds<T extends object>(items: T[]): (T & { id: string })[] {
  return items.map((item) => ({
    ...item,
    id: nanoid(),
  }));
}
```

Random IDs. Every call to this function produced a completely different set of IDs, even if the underlying data had not changed at all.

In a purely client-rendered app, this might have gone unnoticed for a while. But we were using server-side rendering, and that is where hydration errors started appearing.

### Why React Behaves This Way

React's reconciliation depends on keys to match list items between renders. If a key changes, React treats that item as new: it unmounts the old node and mounts a new one, which can reset local state and trigger unnecessary work.

In our case, the server rendered one set of random IDs and the client generated another from the same data. React compared those trees, saw key mismatches, and flagged hydration issues. The console filled with warnings, and list items remounted unnecessarily.

The root issue was that the function violated a fundamental requirement: **given the same input, it must always return the same output.** A UUID generator by design does the opposite.

### The Fix: Deterministic Hashing

We replaced random generation with a deterministic hashing approach.

A hash function takes an input and maps it to a fixed-size output. The critical property is determinism: the same input always produces the same hash. If you hash the product object itself, you get an ID derived from the object's content. As long as the object does not change, neither does its ID. That is exactly the stability guarantee React needs.

Two caveats still matter: keys must be stable and unique among siblings, and determinism depends on consistent serialization.

In a perfect world, every CMS would provide a unique ID on every object. Good systems do exactly that. But production data is rarely perfect, so the practical approach is to check first: if an `id` already exists, keep it. Only generate a deterministic hash when one is missing. That makes the function defensive rather than case-specific.

```typescript
import hash from "object-hash";

/**
 * Generates a deterministic hash for serializable input using object-hash.
 *
 * Approach: Uses a maintained library implementation and explicit options
 * to keep output stable across object key ordering.
 *
 * Time Complexity: O(n) where n is the serialized input size
 * Space Complexity: O(n) for hashing internals/output
 *
 * @param value - Serializable value to hash
 * @returns A stable hex hash string
 */
function deterministicHash(value: unknown): string {
  return hash(value, {
    algorithm: "sha1",
    encoding: "hex",
    unorderedObjects: true,
    unorderedArrays: false,
  });
}

/**
 * Ensures every object in an array has a stable `id` field.
 *
 * Approach: If the object already has an `id`, it is left untouched.
 * If not, the object is hashed with object-hash. Duplicate hashes are
 * disambiguated with a deterministic occurrence suffix (`-1`, `-2`, ...),
 * keeping keys unique among siblings.
 *
 * Time Complexity: O(n * m) where n is array length and m is avg object size
 * Space Complexity: O(n) for the returned array
 *
 * @param items - Array of objects to enrich
 * @returns Array where every object is guaranteed to have a stable `id`
 */
function ensureDeterministicIds<T extends Record<string, unknown>>(
  items: T[]
): (T & { id: string })[] {
  const seenIds = new Map<string, number>();

  const uniquifyId = (baseId: string): string => {
    const occurrence = seenIds.get(baseId) ?? 0;
    seenIds.set(baseId, occurrence + 1);
    return occurrence === 0 ? baseId : `${baseId}-${occurrence}`;
  };

  return items.map((item) => {
    // If the data source already provided an id, trust it and move on
    if (item.id && typeof item.id === "string" && item.id.length > 0) {
      return item as T & { id: string };
    }

    // Otherwise, derive an id from object content.
    const derivedId = uniquifyId(deterministicHash(item));
    return { ...item, id: derivedId };
  });
}
```
Now the server and client ran the same function on the same data and arrived at the same IDs each time, so reconciliation behaved as intended.

---

## Result

Swapping random generation for deterministic ID derivation resolved hydration issues across our product-list surfaces. Warning noise dropped, unnecessary remounts stopped, and initial-load state loss disappeared.

This utility is now my default pattern: keep upstream IDs when present, derive stable IDs when missing, and preserve predictable behavior across server and client.

There is a broader algorithm principle here that shows up far beyond React. Hash functions are the foundation of hash maps, caches, database indexing, and deduplication systems for exactly this reason. The determinism is the feature. The same input always maps to the same output, and that predictability is what makes those systems fast and correct.

Random ID generation has its place: cryptographically secure tokens, session identifiers, and any case where unpredictability is a security requirement. But for enriching data objects that need stable React keys, randomness is the wrong tool.

The cleaner mental model is this: React list keys should be stable across renders and unique among siblings. A deterministic strategy gives you stability by default; a UUID generator does not. Once you understand how reconciliation depends on key stability, this stops feeling like a workaround and starts feeling like robust engineering hygiene.
