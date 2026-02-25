---
title: "Two Sum"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-02-25"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given an array of integers nums and an integer target , return indices of the two numbers such that they add up to target . You may assume that each input would have exactly one solution , and you may"
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
