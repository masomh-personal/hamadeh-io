---
title: "Find the Index of the First Occurrence in a String"
slug: "find-the-index-of-the-first-occurrence-in-a-string"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-03-03"
timeComplexity: "O(n * m)"
spaceComplexity: "O(1)"
excerpt: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 when needle is not part of haystack."
---

# Problem

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`.
If `needle` does not occur in `haystack`, return `-1`.

## Constraints

- `1 <= haystack.length, needle.length <= 10^4`
- `haystack` and `needle` consist of lowercase English characters.

## Examples

### Example 1

- Input: `haystack = "sadbutsad", needle = "sad"`
- Output: `0`
- Explanation: `"sad"` appears first at index `0` and again at index `6`; return the first index.

### Example 2

- Input: `haystack = "leetcode", needle = "leeto"`
- Output: `-1`
- Explanation: `"leeto"` is not a substring of `"leetcode"`.

### Example 3

- Input: `haystack = "aaaaa", needle = "bba"`
- Output: `-1`
- Explanation: No matching window exists.

## Edge-Case Checklist

- `needle` appears at the beginning of `haystack`
- `needle` appears at the end of `haystack`
- `needle` appears multiple times; first index must be returned
- no occurrence exists
- `needle` is longer than `haystack`
- repeated-character strings (e.g. `"aaaaa"` with `"aaa"` or `"bba"`)

## Test Coverage Plan

The scaffolded tests should validate:

- LeetCode baseline examples
- Basic exact-match and no-match behavior
- Overlapping and repeated substring patterns
- Boundary placement (start/end)
- Cases where `needle.length > haystack.length`
- Deterministic larger inputs
- Defensive contract behavior (string input immutability)

## Implementation

```typescript
// TODO: Implement strStr(haystack, needle)
// Suggested strategy:
// 1) Guard impossible matches (needle longer than haystack).
// 2) Scan candidate start positions in haystack.
// 3) Compare characters in needle against each candidate window.
// 4) Return the first matching index, else -1.
```
