---
title: "Valid Parentheses"
slug: "valid-parentheses"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-03-07"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Use a stack of opening brackets and match each closing bracket against the most recent unmatched opener."
---

# Problem

Given a string `s` containing only the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine whether it is valid.

An input string is valid if:

1. Every closing bracket has a matching opening bracket of the same type.
2. Brackets close in the correct order.
3. Brackets are paired by the same bracket type.

## Constraints

- `1 <= s.length <= 10^4`
- `s` consists only of the characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`

## Clarifying Notes

- A single opening bracket without a matching closer is invalid.
- A closing bracket cannot appear before its matching opening bracket.
- Nested groups are valid only when the inner group closes before the outer group.
- Interleaved bracket types like `([)]` are invalid even though the counts match.

## Examples (LeetCode)

- `"()"` -> `true`
- `"()[]{}"` -> `true`
- `"(]"` -> `false`
- `"([])"` -> `true`
- `"([)]"` -> `false`

## Edge Cases Checklist

- Single pair
- Multiple adjacent valid pairs
- Nested valid pairs
- Mismatched closing type
- Unclosed opening brackets
- Closing bracket appears first
- Odd-length input
- Repeated deeply nested valid input

## Approach

Use a stack to track unmatched opening brackets.

1. If the string length is odd, return `false` immediately.
2. Scan left to right.
3. When you see an opening bracket, push it onto the stack.
4. When you see a closing bracket, pop the most recent opening bracket.
5. If the stack was empty or the popped opening bracket does not map to the current closing bracket, return `false`.
6. After the scan, the string is valid only if the stack is empty.

Why this works:

- The stack preserves order, so the most recent unmatched opening bracket must be the next one to close.
- This catches invalid nesting like `([)]` because `[` expects `]`, not `)`.
- It also catches leading closing brackets and missing closing brackets naturally.

Complexity:

- Time: `O(n)` because each bracket is processed once
- Space: `O(n)` in the worst case when all characters are opening brackets

### Why `pop()` immediately?

Once we know the current character is a closing bracket, the only opening bracket that can match it is the most recent unmatched one. That is the top of the stack, so we can `pop()` right away and validate the pair in one step.

This is a little cleaner than peeking first and then popping only on success.

### TypeScript note

The helper `isOpenBracket()` is written as a type guard:

```typescript
function isOpenBracket(bracket: string): bracket is OpeningBracket {
    return bracket === "{" || bracket === "[" || bracket === "(";
}
```

It still returns a boolean at runtime, but it also tells TypeScript that inside the `true` branch the value is an `OpeningBracket`. That keeps the stack and bracket map narrowly typed without extra casts.

## Implementation

```typescript
type OpeningBracket = "(" | "[" | "{";
type ClosingBracket = ")" | "]" | "}";

const OPEN_TO_CLOSE: Record<OpeningBracket, ClosingBracket> = {
    "{": "}",
    "[": "]",
    "(": ")",
};

function isOpenBracket(bracket: string): bracket is OpeningBracket {
    return bracket === "{" || bracket === "[" || bracket === "(";
}

export function isValid(s: string): boolean {
    if (s.length % 2 !== 0) return false;

    const stack: OpeningBracket[] = [];

    for (const currBracket of s) {
        if (isOpenBracket(currBracket)) {
            stack.push(currBracket);
        } else {
            const openingBracket = stack.pop();
            if (openingBracket === undefined || OPEN_TO_CLOSE[openingBracket] !== currBracket) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
```

### Why not count each bracket type?

Counting would catch mismatched totals, but it would miss ordering. For example, `([)]` has balanced counts and is still invalid. The stack is what preserves the nesting order.

## Test Coverage

The test suite covers:

- LeetCode baseline examples
- Adjacent valid pairs of multiple bracket types
- Nested valid structures
- Incorrect closing order
- Missing closing brackets
- Leading invalid closing bracket
- Odd-length invalid strings
- Deterministic large balanced input near the max constraint
- Defensive contract check that the input string is not mutated
