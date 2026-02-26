/**
 * Contains Duplicate
 * Difficulty: Easy
 * Topics: Array, Hash Table, Sorting
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given an integer array `nums`, return `true` if any value appears at least
 * twice in the array, and return `false` if every element is distinct.
 */

export function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) return true;

        seen.add(num);
    }

    return false;
}
