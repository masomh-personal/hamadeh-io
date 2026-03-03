/**
 * Find the Index of the First Occurrence in a String
 * Difficulty: Easy
 * Topics: Two Pointers, String, String Matching
 *
 * Return the first index where `needle` appears in `haystack`,
 * or -1 if no occurrence exists.
 */
export function strStr(haystack: string, needle: string): number {
    // Last index where a full needle-sized window can start.
    const maxAnchor = haystack.length - needle.length;

    // If needle is longer, a match is impossible.
    if (maxAnchor < 0) return -1;

    // Try every possible starting position in haystack.
    for (let anchor = 0; anchor <= maxAnchor; anchor++) {
        // Assume this window matches until we find a mismatch.
        let matches = true;

        // Compare needle characters to the current haystack window.
        for (let offset = 0; offset < needle.length; offset++) {
            if (haystack[anchor + offset] !== needle[offset]) {
                matches = false;
                break;
            }
        }

        // First full match is the answer.
        if (matches) return anchor;
    }

    // No window matched needle.
    return -1;
}
