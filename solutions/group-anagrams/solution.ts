/**
 * Group Anagrams
 * Difficulty: Medium
 * Topics: Array, Hash Table, String, Sorting
 *
 * Time: O(n * k log k)
 * Space: O(n)
 *
 * Given an array of strings `strs`, group all anagrams together and return
 * the groups in any order.
 */

export function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const word of strs) {
        const key = word.split("").sort().join("");
        const group = groups.get(key) ?? [];
        group.push(word);
        groups.set(key, group);
    }

    return Array.from(groups.values());
}
