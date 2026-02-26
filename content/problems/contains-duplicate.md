---
title: "Contains Duplicate"
slug: "contains-duplicate"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-02-26"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given an integer array nums, return true if any value appears at least twice, and false if all elements are distinct."
---

# Problem

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Approach

Use a hash set with a single pass:

1. Create an empty `Set<number>` named `seen`.
2. Iterate through each number in `nums`.
3. If the current number already exists in `seen`, return `true` immediately.
4. Otherwise, add the number to `seen` and continue.
5. If the loop finishes without finding a repeat, return `false`.

Why this works:
- `seen` stores every unique number encountered so far.
- The first time a value repeats, `seen.has(value)` detects it in constant average time.

## Implementation

```typescript
export function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) return true;

        seen.add(num);
    }

    return false;
}
```

## Complexity

- **Time O(n):** single pass over `nums`, with average `O(1)` set lookup/insert per element.
- **Space O(n):** in the worst case (all unique values), the set stores every number once.

## Test Coverage

The test suite validates:
- LeetCode baseline examples
- Empty and single-element inputs
- Negative values and zeros
- Duplicates that appear far apart
- Unique unsorted arrays
- Large deterministic inputs (10k values)
- Input non-mutation behavior
