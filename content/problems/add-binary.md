---
title: "Add Binary"
slug: "add-binary"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-03-10"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given two binary strings, return their sum as a binary string. We use BigInt for correct arbitrary-precision arithmetic instead of a manual carry simulation."
---

# Problem

Given two binary strings `a` and `b`, return their sum as a binary string.

Both strings are non-empty and contain only the characters `'0'` and `'1'`. There are no leading zeros except for the string `"0"` itself.

## Constraints

- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the string `"0"`.

## Examples

```
Input:  a = "11", b = "1"
Output: "100"

Input:  a = "1010", b = "1011"
Output: "10101"
```

## Edge Case Checklist

- Both inputs are `"0"` -> result is `"0"`
- One input is `"0"` -> result equals the other string
- Carry propagates across every bit (e.g., `"1111" + "1"` -> `"10000"`)
- Inputs have very different lengths
- Result is one bit longer than the longer input due to a final carry

## Approach

Parse both strings as base-2 integers, add them, and convert the result back to binary. The key decision is which numeric type to use.

`parseInt(str, 2)` is the obvious first instinct. It works, but JavaScript numbers are IEEE 754 doubles with only 53 bits of integer precision. Binary strings longer than ~53 characters silently produce wrong answers. The constraint here goes up to 10,000 characters, so `parseInt` is not safe.

`BigInt` is the right tool. It has no size ceiling and handles arbitrary-precision integers natively. The `0b` prefix tells `BigInt` to interpret the string as binary, and `.toString(2)` converts the result back.

```typescript
export function addBinary(a: string, b: string): string {
    const sum = BigInt(`0b${a}`) + BigInt(`0b${b}`);
    return sum.toString(2);
}
```

## Why not the two-pointer simulation

The textbook answer to this problem is a right-to-left carry simulation: two pointers stepping through each string from the last character, summing bits and propagating a carry.

It is also fragile. More code means more places for off-by-one errors, forgetting to handle the final carry, or mismanaging exhausted pointers. It reimplements arithmetic the runtime already handles correctly, and it is harder to read at a glance.

The principle is simple: prefer correct built-ins over hand-rolled reimplementations. `BigInt` is part of the JS spec since ES2020, available in every modern runtime, and its correctness is not your problem to maintain. The simulation exists to test interview knowledge of binary arithmetic. Production code optimizes for correctness, readability, and maintainability, and `BigInt` wins on all three.

## Complexity

- **Time O(n):** `BigInt` parsing and `toString(2)` each scan the input once.
- **Space O(n):** the output string scales with the length of the longer input.

## Test Coverage

The test suite validates:
- LeetCode baseline examples (`"11" + "1"` and `"1010" + "1011"`)
- Both operands zero
- One operand zero (identity)
- Full carry propagation (`"1111" + "1"` -> `"10000"`)
- Inputs of mismatched lengths
- Single-bit addition with carry (`"1" + "1"` -> `"10"`)
- Input non-mutation (contract test)
- A 30-bit all-ones string plus one (large deterministic case)
