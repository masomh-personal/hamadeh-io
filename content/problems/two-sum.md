---
title: "Two Sum"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-02-25"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given an array of integers and a target, return the indices of two numbers that add up to the target."
---

# Problem

[Write the problem statement in 2-4 concise lines.]

## Approach

[Explain your solution approach briefly.]

## Implementation

```typescript
export function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();

    for (let idx = 0; idx < nums.length; idx++) {
        const curr = nums[idx];
        const complement = target - curr;
        const complementIndex = seen.get(complement);

        if (complementIndex !== undefined) {
            return [complementIndex, idx];
        }

        seen.set(curr, idx);
    }

    return [];
}
```

## Complexity

- Time: O(n)
- Space: O(n)
