/**
 * Add Binary
 * Difficulty: Easy
 * Topics: Math, String
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Given two binary strings a and b, return their sum as a binary string.
 *
 * Approach: use BigInt instead of Number. JS numbers are IEEE 754 doubles
 * with only 53 bits of integer precision, so strings longer than ~53
 * characters silently produce wrong results. BigInt has no size ceiling,
 * handles the full 10,000-character constraint correctly, and keeps the
 * code just as readable. The two-pointer carry simulation would be the
 * right answer only if BigInt were unavailable.
 */

export function addBinary(a: string, b: string): string {
    const sum = BigInt(`0b${a}`) + BigInt(`0b${b}`);
    return sum.toString(2);
}
