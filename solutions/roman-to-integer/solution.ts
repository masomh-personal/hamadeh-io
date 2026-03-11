/**
 * Roman to Integer
 * Difficulty: Easy
 * Topics: Hash Table, Math, String
 *
 * Time: O(n) — single pass over the string
 * Space: O(1) — fixed-size symbol map, no input-proportional allocations
 *
 * Given a Roman numeral string, return its integer value.
 * When a symbol precedes one of greater value, subtract it; otherwise add it.
 */

export function romanToInt(s: string): number {
    const romanMap = new Map<string, number>([
        ["I", 1],
        ["V", 5],
        ["X", 10],
        ["L", 50],
        ["C", 100],
        ["D", 500],
        ["M", 1000],
    ]);

    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const currCharInt = romanMap.get(s[i]) ?? 0;
        const nextCharInt = romanMap.get(s[i + 1]) ?? 0;

        if (currCharInt < nextCharInt) {
            result += nextCharInt - currCharInt;
            i++; // consume both characters of the subtraction pair
        } else {
            result += currCharInt;
        }
    }

    return result;
}
