/**
 * Trapping Rain Water
 * Difficulty: Hard
 * Topics: Array, Two Pointers, Dynamic Programming, Stack
 *
 * Time: O(n)
 * Space: O(1)
 *
 * Given n non-negative bars of unit width, compute how much water is trapped
 * between them after raining.
 */

export function trap(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxLeft = 0;
    let maxRight = 0;
    let trapped = 0;

    while (left < right) {
        // The shorter bar is the binding wall, so its side can be committed
        // now: a taller-or-equal bar already exists on the other end.
        const leftHeight = height[left] ?? 0;
        const rightHeight = height[right] ?? 0;

        if (leftHeight <= rightHeight) {
            maxLeft = Math.max(maxLeft, leftHeight);
            trapped += maxLeft - leftHeight;
            left++;
            continue;
        }

        maxRight = Math.max(maxRight, rightHeight);
        trapped += maxRight - rightHeight;
        right--;
    }

    return trapped;
}
