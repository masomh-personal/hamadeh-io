---
title: "Removing Stars From a String"
slug: "removing-stars-from-a-string"
source: "leetcode"
difficulty: "medium"
datePublished: "2026-06-27"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Use a stack to collect characters; each star pops the most recent one. Join the stack at the end to get the result."
---

# Problem

You are given a string `s` containing lowercase English letters and stars `*`.

In one operation, you can choose a star and remove it along with the closest non-star character to its left.

Return the string after all stars have been removed.

**Note:**

- The input is guaranteed to be valid: a star will always have a non-star character to its left at the time of removal.
- The resulting string is always unique.

## Constraints

- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters and `*`
- The operation is always possible on the given input

## Examples (LeetCode)

- `"leet**cod*e"` → `"lecoe"`
- `"erase*****"` → `""`

## Clarifying Notes

- Stars are processed left to right in the order they appear.
- Each star removes exactly one character: the nearest non-star character to its left at that moment.
- Multiple consecutive stars can remove multiple characters.
- The problem guarantees no star appears without a removable character to its left.

## Edge Cases Checklist

- No stars in string
- Single star removing last character in the string
- All characters removed by stars
- Consecutive stars
- Stars and letters interleaved one by one
- Large input with no stars
- Large alternating `a*` pattern

## Approach

Use a stack (a plain array) to collect characters as you scan left to right.

1. For every character that is not a `*`, push it onto the stack.
2. For every `*`, pop the top of the stack (the nearest unerased character to the left).
3. After the full scan, join the stack into a string and return it.

Why this works: the stack always holds exactly the characters that have not been erased, in order. The top of the stack is always the most recent surviving character, which is exactly the one a `*` needs to remove. There is no need to search backwards or count stars separately.

Complexity:

- Time: `O(n)` — each character is pushed or popped at most once
- Space: `O(n)` — the stack holds at most all `n` characters

## Implementation

```typescript
export function removeStars(s: string): string {
    const stack: string[] = [];

    for (const char of s) {
        if (char === "*") {
            stack.pop();
        } else {
            stack.push(char);
        }
    }

    return stack.join("");
}
```

## Test Coverage

The test suite covers:

- Both LeetCode baseline examples
- No stars (identity behavior)
- Single star removal
- Consecutive stars removing multiple characters
- All characters removed
- Interleaved star-letter pattern
- Stars that only affect characters to their left
- Large input with no stars (scale)
- Alternating `a*` pattern at scale
- Defensive contract check that the input string is not mutated
