/**
 * Valid Anagram
 * Difficulty: Easy
 * Topics: Hash Table, String, Sorting
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`,
 * and `false` otherwise.
 */

export function isAnagram(s: string, t: string): boolean {
    if (s === t) return true;
    if (s.length !== t.length) return false;

    const sFreqMap = new Map<string, number>();

    for (const char of s) {
        sFreqMap.set(char, (sFreqMap.get(char) ?? 0) + 1);
    }

    for (const char of t) {
        const count = sFreqMap.get(char);
        if (!count) return false;

        sFreqMap.set(char, count - 1);
    }

    return true;
}
