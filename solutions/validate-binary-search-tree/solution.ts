/**
 * Validate Binary Search Tree
 * Difficulty: Medium
 * Topics: Tree, Depth-First Search, Binary Search Tree, Binary Tree
 *
 * Time: O(n)
 * Space: O(h), where h is the tree height
 *
 * Recursive: validate bottom-up, returning each subtree's value range to its
 * parent and failing fast on the first bad subtree. Iterative: DFS with an
 * explicit stack, pushing each node with the bounds its ancestors impose.
 */

export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(
        val = 0,
        left: TreeNode | null = null,
        right: TreeNode | null = null
    ) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

interface SubtreeRange {
    min: number;
    max: number;
}

export function isValidBSTRecursive(root: TreeNode | null): boolean {
    return root === null || validRange(root) !== null;
}

/**
 * Returns the smallest and largest values in a valid subtree, or null as soon
 * as any part of it breaks BST ordering.
 */
function validRange(node: TreeNode): SubtreeRange | null {
    let min = node.val;
    let max = node.val;

    if (node.left) {
        const left = validRange(node.left);
        if (left === null || left.max >= node.val) {
            return null;
        }
        min = left.min;
    }

    if (node.right) {
        const right = validRange(node.right);
        if (right === null || right.min <= node.val) {
            return null;
        }
        max = right.max;
    }

    return { min, max };
}

interface PendingNode {
    node: TreeNode;
    /** Exclusive bounds set by the node's ancestors. */
    lower: number;
    upper: number;
}

export function isValidBSTIterative(root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }

    // Node values are finite 32-bit integers, so infinities never collide with them.
    const stack: PendingNode[] = [
        { node: root, lower: -Infinity, upper: Infinity },
    ];

    let pending = stack.pop();
    while (pending) {
        const { node, lower, upper } = pending;

        if (node.val <= lower || node.val >= upper) {
            return false;
        }

        if (node.right) {
            stack.push({ node: node.right, lower: node.val, upper });
        }
        if (node.left) {
            stack.push({ node: node.left, lower, upper: node.val });
        }

        pending = stack.pop();
    }

    return true;
}
