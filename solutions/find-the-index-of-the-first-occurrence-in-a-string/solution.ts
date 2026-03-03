/**
 * Find the Index of the First Occurrence in a String
 * Difficulty: Easy
 * Topics: Two Pointers, String, String Matching
 *
 * Return the first index where `needle` appears in `haystack`,
 * or -1 if no occurrence exists.
 */
export function strStr(haystack: string, needle: string): number {
    for (let anchor = 0, slider = 0; anchor < haystack.length; anchor++) {
        slider = anchor;
        let currTest = haystack[slider];

        while (needle.startsWith(currTest)) {
            if (currTest === needle) return anchor;
            slider++;
            currTest += haystack[slider];
        }
    }

    // All tets fail, return -1
    return -1;
}
