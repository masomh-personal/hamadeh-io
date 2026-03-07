/**
 * Valid Parentheses
 * Difficulty: Easy
 * Topics: String, Stack
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given a string containing only bracket characters, determine whether it is valid.
 */

type OpeningBracket = "(" | "[" | "{";
type ClosingBracket = ")" | "]" | "}";

const OPEN_TO_CLOSE: Record<OpeningBracket, ClosingBracket> = {
    "{": "}",
    "[": "]",
    "(": ")",
};

function isOpenBracket(bracket: string): bracket is OpeningBracket {
    return bracket === "{" || bracket === "[" || bracket === "(";
}

export function isValid(s: string): boolean {
    if (s.length % 2 !== 0) return false;

    const stack: OpeningBracket[] = [];

    for (const currBracket of s) {
        if (isOpenBracket(currBracket)) {
            stack.push(currBracket);
        } else {
            const openingBracket = stack.pop();
            if (
                openingBracket === undefined ||
                OPEN_TO_CLOSE[openingBracket] !== currBracket
            ) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
