/**
 * Length of Last Word
 * Difficulty: Easy
 * Topics: String
 *
 * Time: O(n)
 * Space: O(1)
 *
 * Given a string of words and spaces, return the length of the last word.
 */
export function lengthOfLastWord(s: string): number {
    let result = 0;

    for (let i = s.length - 1; i >= 0; i--) {
        const currChar = s[i];
        if (currChar === " ") {
            if (result > 0) break;
        } else {
            result++;
        }
    }

    return result;
}
