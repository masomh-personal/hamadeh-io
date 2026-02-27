/**
 * Valid Palindrome
 * Difficulty: Easy
 * Topics: Two Pointers, String
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.
 *
 * Rules:
 * - Consider only alphanumeric characters.
 * - Ignore letter casing.
 */

export function isPalindrome(s: string): boolean {
    const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normalized.length <= 1) return true;

    let l = 0;
    let r = normalized.length - 1;

    while (l < r) {
        if (normalized[l] !== normalized[r]) {
            return false;
        }

        l++;
        r--;
    }

    return true;
}
