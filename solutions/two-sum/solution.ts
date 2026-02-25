/**
 * Two Sum
 * Difficulty: Easy
 * Topics: Array, Hash Table
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Return indices of two numbers that add up to target.
 */

export function twoSum(nums: number[], target: number): number[] {
    // Fast path for minimum valid input size.
    if (nums.length === 2) {
        return nums[0] + nums[1] === target ? [0, 1] : [];
    }

    // Build value -> indices map for O(1) complement lookups.
    const numMap: Map<number, number[]> = nums.reduce((acc, num, idx) => {
        if (acc.has(num)) {
            acc.get(num)?.push(idx);
        } else {
            acc.set(num, [idx]);
        }

        return acc;
    }, new Map());

    // Scan values and return as soon as a valid complement is found.
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;
        const availableIndices = numMap.get(complement);

        if (!availableIndices) continue;

        const isSameNum = complement === num;

        // Same number case requires two distinct indices.
        if (isSameNum && availableIndices.length > 1) {
            return [availableIndices[0], availableIndices[1]];
        }

        // Different number case: ensure we do not reuse the same index.
        const complementIndex = availableIndices[0];
        if (complementIndex !== i) {
            return [i, complementIndex];
        }
    }

    // Defensive fall back, should not be hit.
    return [];
}
