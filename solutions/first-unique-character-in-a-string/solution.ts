/**
 * First Unique Character in a String
 * Difficulty: Easy
 * Topics: Hash Table, String, Queue, Counting
 *
 * Return the index of the first non-repeating character in `s`,
 * or -1 when no unique character exists.
 */
export function firstUniqChar(s: string): number {
    const frequency = new Map<string, number>();

    for (const char of s) {
        frequency.set(char, (frequency.get(char) ?? 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (frequency.get(char) === 1) return i;
    }

    return -1;
}
