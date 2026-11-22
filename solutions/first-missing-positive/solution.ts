/**
 * First Missing Positive
 * Difficulty: Hard
 * Topics: Array, Hash Table
 *
 * Time: O(n)
 * Space: O(1)
 *
 * Places each value in 1..n into its home index (value - 1) via in-place
 * index swaps, then scans for the first index whose value does not match i + 1.
 */

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
