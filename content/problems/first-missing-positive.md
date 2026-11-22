---
title: "First Missing Positive"
slug: "first-missing-positive"
source: "leetcode"
difficulty: "hard"
timeComplexity: "O(n)"
spaceComplexity: "O(1)"
excerpt: "Given an unsorted integer array, find the smallest positive integer missing from it in O(n) time and O(1) auxiliary space."
---

# Problem

Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums`.

You must implement an algorithm that runs in `O(n)` time and uses `O(1)` auxiliary space.

## Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Examples

```text
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
```

```text
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
```

```text
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
```

## Approach

My first instinct was to throw every number into a `Set` or `Map` and check `1, 2, 3, ...` until I hit a gap. That runs in `O(n)` time, and conceptually it's spot on. The catch is the `O(1)` auxiliary space requirement: we can't allocate an extra structure that grows with `n`. We can, however, reuse `nums` itself in place.

The insight that unlocks the in-place approach is realizing the answer is always bounded by the array's length, even though the values inside `nums` can be huge or negative. For an array of length `n`, the smallest missing positive can never be larger than `n + 1`. The only way to hit `n + 1` is if the array literally contains every integer from `1` to `n`. Any negative number, zero, duplicate, or value larger than `n` just wastes a slot and forces the answer down into `1..n`.

That gives us a clean 1-to-1 mapping without allocating a hash table: every valid number `value` in `1..n` belongs at index `value - 1`.

From there, the algorithm is two simple passes:

1. **Cyclic sort with in-place index swaps.** Walk through `nums`. While `nums[i]` is in `1..n` and its home slot `nums[value - 1]` doesn't already hold `value`, swap them using a small destructuring `swap` helper. Checking `nums[homeIndex] === value` is critical so duplicates like `[1, 1]` don't spin forever.
2. **Linear scan for the first mismatch.** Walk `i` from `0` to `n - 1`. The first index where `nums[i] !== i + 1` means `i + 1` is missing. If every slot matches, every number from `1` to `n` is present, so return `n + 1`.

Even though there is a `while` loop inside a `for` loop, each swap puts at least one number into its permanent home slot, so we perform at most `n` swaps across the entire run.

## Implementation

```typescript
function swap(nums: number[], firstIndex: number, secondIndex: number): void {
    const first = nums[firstIndex];
    const second = nums[secondIndex];
    if (first === undefined || second === undefined) return;

    [nums[firstIndex], nums[secondIndex]] = [second, first];
}

export function firstMissingPositive(nums: number[]): number {
    const n = nums.length;

    // Pass 1: put each value in 1..n into its home slot (index value - 1).
    for (let i = 0; i < n; i++) {
        while (true) {
            const value = nums[i];
            if (value === undefined || value < 1 || value > n) break;

            const homeIndex = value - 1;
            // Guard against duplicates so equal values never swap in a loop.
            if (nums[homeIndex] === value) break;

            swap(nums, i, homeIndex);
        }
    }

    // Pass 2: the first slot that does not hold i + 1 is the missing positive.
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    return n + 1;
}
```

## Complexity

- **Time O(n):** Each element is swapped into its home index at most once during the first pass, followed by one linear scan in the second pass.
- **Space O(1):** All rearrangements happen in place inside `nums`. The destructuring swap helper only uses a fixed two-element temporary tuple, which is constant auxiliary space.

## Edge Cases Checklist

- Single-element arrays: `[1]` (returns 2), `[2]` (returns 1), `[0]` (returns 1)
- All negative numbers and zeros
- Contiguous `1..n` arrays where the answer is `n + 1`
- Duplicate positive values (must not cause infinite loops or skipped slots)
- Values larger than `nums.length` and 32-bit integer extremes (`-2^31`, `2^31 - 1`)
- Reverse-sorted inputs and large arrays at the `10^5` constraint

## Test Coverage

The suite covers all three LeetCode examples, contiguous `1..n` arrays, single-element inputs, all-non-positive arrays, duplicates, 32-bit integer bounds, reverse-sorted arrays, two deterministic 100,000-element stress tests, and a determinism contract test.

## Source

- [LeetCode 41: First Missing Positive](https://leetcode.com/problems/first-missing-positive/)
