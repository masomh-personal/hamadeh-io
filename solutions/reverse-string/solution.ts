/**
 * Reverse String
 * Difficulty: Easy
 * Topics: Two Pointers, String
 *
 * Time: O(n)
 * Space: O(1)
 *
 * Write a function that reverses an array of characters in-place.
 * Do not allocate extra space for another array.
 */

export function reverseString(s: string[]): void {
    function swap(arr: string[], idx1: number, idx2: number): void {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        swap(s, l, r);

        l++;
        r--;
    }
}
