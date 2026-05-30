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
        if (height[left] <= height[right]) {
            maxLeft = Math.max(maxLeft, height[left]);
            trapped += maxLeft - height[left];
            left++;
            continue;
        }

        maxRight = Math.max(maxRight, height[right]);
        trapped += maxRight - height[right];
        right--;
    }

    return trapped;
}
