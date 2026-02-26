---
title: "Valid Anagram"
slug: "valid-anagram"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-02-26"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given two strings s and t, return true if t is an anagram of s, and false otherwise."
---

# Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

## Approach

Use a frequency map with two passes:

1. Return early if the strings are equal or their lengths differ.
2. Build a character-count map from `s`.
3. Iterate `t`, checking and decrementing each character count.
4. If a character is missing or exhausted (`0`), return `false`.
5. If all characters decrement cleanly, return `true`.

Why this works:
- Anagrams must have identical character frequencies.
- Counting from `s` and consuming with `t` verifies both presence and exact counts.

## Implementation

```typescript
export function isAnagram(s: string, t: string): boolean {
    if (s === t) return true;
    if (s.length !== t.length) return false;

    const sFreqMap = new Map<string, number>();

    for (const char of s) {
        sFreqMap.set(char, (sFreqMap.get(char) ?? 0) + 1);
    }

    for (const char of t) {
        const count = sFreqMap.get(char);
        if (!count) return false;

        sFreqMap.set(char, count - 1);
    }

    return true;
}
```

## Complexity

- **Time O(n):** one pass to build counts and one pass to consume counts, where `n` is string length.
- **Space O(n):** the map can store up to all unique characters in `s`.

## Test Coverage

The test suite validates:
- LeetCode baseline examples
- Empty, identical, and length-mismatch cases
- Repeated-character frequency matches and mismatches
- Ordering and case-sensitivity behavior
- Large deterministic true/false inputs
