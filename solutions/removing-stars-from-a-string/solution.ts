/**
 * Removing Stars From a String
 * Difficulty: Medium
 * Topics: String, Stack
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given a string containing lowercase letters and stars, remove each star
 * along with the nearest non-star character to its left. Return the result.
 */

export function removeStars(s: string): string {
    const stack: string[] = [];

    for (const char of s) {
        if (char === "*") {
            stack.pop();
        } else {
            stack.push(char);
        }
    }

    return stack.join("");
}
