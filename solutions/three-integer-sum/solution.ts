/**
 * 3Sum
 * Difficulty: Medium
 * Topics: Array, Two Pointers, Sorting
 *
 * Time: O(n^2)
 * Space: O(n)
 *
 * Return all unique triplets where the three values sum to zero.
 */

export function threeSum(nums: number[]): number[][] {
    const sorted = nums.toSorted((a, b) => a - b);
    const triplets: number[][] = [];

    for (let i = 0; i < sorted.length - 2; i++) {
        if (i > 0 && sorted[i] === sorted[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = sorted.length - 1;

        while (left < right) {
            const sum = sorted[i] + sorted[left] + sorted[right];

            if (sum === 0) {
                triplets.push([sorted[i], sorted[left], sorted[right]]);
                left++;
                right--;

                while (left < right && sorted[left] === sorted[left - 1]) {
                    left++;
                }

                while (left < right && sorted[right] === sorted[right + 1]) {
                    right--;
                }
                continue;
            }

            if (sum < 0) {
                left++;
                continue;
            }

            right--;
        }
    }

    return triplets;
}
