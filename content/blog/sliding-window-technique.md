---
title: "The Sliding Window Technique: How an Invariant Turns O(n²) into O(n)"
slug: "sliding-window-technique"
datePublished: "2026-06-06"
excerpt: "Sliding window is not just two pointers moving together. It's a window that holds an invariant, and understanding that invariant is what makes the O(n) bound make sense."
tags: ["dsa", "fundamentals", "engineering"]
---

A lot of problems that look quadratic at first glance turn out to be linear once you notice the right pattern. Sliding window is one of the cleanest examples of that.

The naive approach to most subarray problems looks the same: for every starting index, scan forward until some condition breaks. Two nested loops. O(n²). Fine for small inputs, painful at scale. As we covered in [Big O Notation: What It Actually Measures](/blog/big-o-notation-fundamentals), that growth rate starts to hurt the moment your input size doubles a few times.

Sliding window breaks that pattern. The insight is straightforward: you already know most of what you need from the last step. Why throw it away and start over?

## What a Window Actually Is

A window is just two indices, `left` and `right`, that define a contiguous slice of the input. `right` expands the window by moving forward. `left` shrinks it by also moving forward.

What makes it a _sliding_ window instead of two arbitrary pointers is the rule: `left` never passes `right`. The window always covers a valid, contiguous range.

That structural guarantee is what makes the complexity analysis clean. Each element enters the window once (when `right` passes over it) and leaves the window once (when `left` passes over it). Across the full traversal, every element is touched at most twice. That's O(n), regardless of what computation you're doing inside the loop.

## The Invariant Is Everything

Here's the part that actually matters: a sliding window is not just a range. It's a range that holds a property.

Call it the invariant. Something like "this window contains at most k distinct characters," or "the sum of this window does not exceed the target." The logic of the algorithm is entirely about maintaining that property as you move through the input.

- When `right` advances, the new element enters the window. If the invariant still holds, keep expanding.
- When the invariant breaks, advance `left` until it holds again.

That decision is the whole algorithm. Everything else is bookkeeping.

## Fixed vs. Variable Size

Sliding window comes in two flavors, and they feel a little different in practice.

**Fixed size** means the window has a set width. A classic example: find the maximum sum of any k consecutive elements. Slide by removing the leftmost element and adding the new rightmost one. No shrinking logic needed since `left` always follows `right` by exactly `k` steps.

```typescript
function maxSumSubarray(nums: number[], k: number): number {
    let windowSum = nums.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;

    for (let right = k; right < nums.length; right++) {
        windowSum += nums[right] - nums[right - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

The window sum updates in O(1) per step: add the incoming element, subtract the outgoing one. No recomputing from scratch on each iteration.

**Variable size** is more interesting. The window grows and shrinks depending on whether the invariant holds. The canonical example is finding the longest substring without repeating characters.

```typescript
function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (seen.has(char) && seen.get(char)! >= left) {
            left = seen.get(char)! + 1;
        }

        seen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
```

When a duplicate character enters from the right, the invariant breaks. We don't restart from zero. We move `left` just past the previous occurrence of that character, shrinking the window until it's valid again.

The critical detail is the `>= left` check. Without it, you could accidentally move `left` backwards if a character appeared before the current window started. `left` only ever moves forward. That's part of the invariant too.

## How This Connects to Two Pointers

If you've worked through [Trapping Rain Water](/problems/trapping-rain-water), sliding window will feel familiar. Both patterns use two pointers and avoid nested loops by maintaining running state across iterations.

The difference is directionality. Two-pointer problems tend to converge: `left` starts at the beginning, `right` at the end, and they move toward each other. Sliding window problems move in the same direction: both pointers travel left to right, with `right` always leading. Same family, different shape.

## When to Reach for It

Sliding window works cleanly when three things are true. You're looking for a contiguous subarray or substring. The problem has a monotonic character: adding elements to the window makes the answer "more" in some sense (longer, higher sum, more varied), and removing elements makes it "less." And you only need one pass.

If those don't hold, the technique probably doesn't fit cleanly. Some problems look like sliding window but have non-monotonic constraints that force a restart, or involve non-contiguous subsequences where dynamic programming is the right frame. The contiguous requirement is the sharpest signal. If the problem asks about subsequences rather than subarrays, look elsewhere first.

## Wrap Up

Sliding window is worth understanding at the conceptual level, not just as a pattern to recognize. It's not a trick. It's an application of a simple invariant: `left` and `right` define a valid window, `right` expands until the window becomes invalid, `left` repairs it.

Once you see that invariant clearly, the pointer management falls out of it naturally. And the O(n) bound isn't something you have to take on faith. Each element enters the window once and leaves once. That's it.

If you find yourself writing nested loops to scan subarrays, this is the question worth asking first: is there a window here that just needs to slide?
