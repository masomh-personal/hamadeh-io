/**
 * Longest Common Prefix
 * Difficulty: Easy
 * Topics: String
 *
 * Time: O(S)
 * Space: O(1)
 *
 * Return the longest common prefix string among an array of strings.
 */
export function longestCommonPrefix(strs: string[]): string {
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        const word = strs[i];

        while (!word.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }

    return prefix;
}
