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
