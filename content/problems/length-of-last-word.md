---
title: "Length of Last Word"
slug: "length-of-last-word"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-03-07"
timeComplexity: "O(n)"
spaceComplexity: "O(1)"
excerpt: "Given a string of words and spaces, return the length of the last word."
---

# Problem

Given a string `s` consisting of words and spaces, return the length of the **last word** in the string.

A **word** is a maximal substring consisting of non-space characters only.

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`
- There will be at least one word in `s`

## Clarifying Notes

- Trailing spaces must be skipped before counting.
- The last word is the rightmost maximal non-space sequence.
- The constraint guarantees at least one word, so the result is always >= 1.

## Examples (LeetCode)

- `"Hello World"` -> `5`
- `"   fly me   to   the moon  "` -> `4`
- `"luffy is still joyboy"` -> `6`

## Approach

Scan from the right with an index pointer:

1. Start `i` at the last character and `result` at `0`.
2. For each character from right to left:
   - If it is a space and `result > 0`, the last word has been counted. Break.
   - If it is a space and `result === 0`, it is trailing whitespace. Skip it.
   - If it is not a space, increment `result`.
3. Return `result`.

Why it works:
- Scanning from the right hits the last word before anything else.
- The `result > 0` guard is what separates trailing spaces (skip) from the word boundary (stop).
- No extra strings or arrays are allocated. Only a counter and an index.

Complexity:
- Time: `O(n)` - worst case scans the full string (no trailing spaces, one long word)
- Space: `O(1)` - two integer variables regardless of input size

### Why not trimEnd + split?

A simpler version works with `s.trimEnd().split(' ').at(-1)`. It is more readable at a glance, but `trimEnd` allocates a new string and `split` allocates a full token array, making it `O(n)` space. For this constraint (`s.length <= 10^4`) the difference is negligible in practice. The backwards scan is the correct O(1) answer.

The `currChar` variable is kept by choice. It costs nothing extra and makes the loop easier to follow and step through in a debugger.

## Implementation

```typescript
export function lengthOfLastWord(s: string): number {
    let result = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        const currChar = s[i];
        if (currChar === ' ') {
            if (result > 0) break;
        } else {
            result++;
        }
    }

    return result;
}
```

## Edge Cases Checklist

- Trailing spaces (e.g. `"moon  "` -> `4`)
- Leading spaces before single word (e.g. `"  word"` -> `4`)
- Single character word (e.g. `"a"` -> `1`)
- Single word with no spaces (e.g. `"hello"` -> `5`)
- Multiple spaces between words
- Entire string is one word of max length (`10^4` chars)

## Test Coverage

The test suite covers:

- LeetCode baseline examples
- Trailing spaces (single and multiple)
- Leading spaces only before word
- Multiple spaces between words
- Single-character word with and without surrounding spaces
- Last word shorter and longer than earlier words
- Deterministic large input near max constraint
- Single long word at max length
- Defensive: input string is not mutated
