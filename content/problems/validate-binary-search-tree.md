---
title: "Validate Binary Search Tree"
slug: "validate-binary-search-tree"
source: "leetcode"
difficulty: "medium"
datePublished: "2026-09-28"
timeComplexity: "O(n)"
spaceComplexity: "O(h)"
excerpt: "Check whether a binary tree is a valid BST, solved twice: once with recursion and once with an explicit stack."
---

# Problem

Given the `root` of a binary tree, return `true` if it is a valid binary search tree (BST).

A valid BST follows three rules:

- Every node in the left subtree holds a value strictly less than the node's value.
- Every node in the right subtree holds a value strictly greater than the node's value.
- Both subtrees are themselves valid BSTs.

The word that matters is _subtree_. Checking each node against its direct children is not enough, because a value deep in the tree has to respect every ancestor above it.

## Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Examples

**Example 1:**

```text
Input:  root = [2,1,3]
Output: true
```

**Example 2:**

```text
Input:  root = [5,1,4,null,null,3,6]
Output: false
```

The root is `5`, but its right child is `4`.

## Approach

The trap here is checking each node against its direct children and calling it a day. That passes Example 1 and quietly passes a tree like `[5,4,6,null,null,3,7]`, where `3` is a perfectly good left child of `6` but sits in the right subtree of `5`. Every node has to respect every ancestor above it, not just its parent.

I solved it twice, and the two versions come at that rule from opposite directions.

### Recursive: build the answer from the leaves up

Go all the way down to the leaves, then build your way back up. Each call validates its subtree and hands its parent a small summary: the smallest and largest values inside it. With that summary, the parent's check is one line. Everything on the left has to be less than me, so `left.max < node.val`. Everything on the right has to be greater, so `right.min > node.val`.

If any subtree comes back invalid, the call returns `null` immediately and that failure bubbles straight up. A bad left subtree means the right side is never even visited.

A nice side effect is that there are no sentinel bounds. Every comparison is between two real node values, so a tree holding `-2^31` or `2^31 - 1` needs no special handling.

### Iterative: DFS with an explicit stack

The iterative version is a depth-first walk with a stack, and it fails fast the same way. The catch is that a stack entry cannot just be a node. A plain DFS only knows a node's parent, and that is exactly the check that misses the deep violations. So each entry carries the node plus the exclusive `(lower, upper)` range its ancestors allow.

The root starts with `(-Infinity, Infinity)`. Going left, the upper bound tightens to the current value. Going right, the lower bound does. Pop a node, check it against its range, and bail on the first one that falls outside. Infinity is safe as the open end because node values are always finite 32-bit integers, so they can never tie with it.

Notice that this is not a mechanical rewrite of the recursive version. The recursion works bottom-up because each answer depends on the children's results, and that shape is awkward to unroll into a loop. Pushing bounds top-down turns the whole thing into "check this node, push its kids," which a stack handles naturally.

## Implementation

```typescript
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
```

## Complexity

- **Time O(n):** both versions visit each node at most once, and a failure only ends the walk sooner.
- **Space O(h):** the recursive version's call stack and the iterative version's explicit stack both grow with the tree height `h`. That is `O(log n)` for a balanced tree and `O(n)` for a tree that is really a linked list. The test suite includes a 10^4-deep chain, and the recursion handles it fine at this size, but the explicit stack is the one that never depends on the engine's call stack limit.

## Edge Cases Checklist

- An empty tree, which counts as valid
- A single node
- Duplicate values on either side, which are invalid because ordering is strict
- A grandchild that fits its parent but breaks an ancestor's bound
- Negative values
- Values at `-2^31` and `2^31 - 1`, where a sentinel bound of the same value would wrongly reject or accept
- A 10^4-deep chain, the worst case for recursion depth

## Test Coverage

Every test runs against both implementations:

- Both LeetCode examples and a three-level valid tree
- Empty tree, single node, and strict duplicates on each side
- Deep violations on the left and right that only an ancestor bound catches
- Negative values and both 32-bit extremes, including duplicate extremes
- Input tree non-mutation
- A balanced 10^4-node BST, the same tree with one value out of order, and 10^4-deep chains leaning each way
- A contract test that both implementations agree on 500 deterministic random trees

## Wrap Up

The whole problem hinges on one idea: a node answers to all of its ancestors, not just its parent. Once that clicks, you get to pick which direction the information flows. Bottom-up, children report their value ranges to the parent. Top-down, the parent hands its children the range they're allowed to live in.

Both are O(n) and both fail fast. The recursive version reads more like the definition of a BST. The iterative one keeps you off the call stack. If I had to reach for one in production code on untrusted, possibly lopsided trees, I'd take the stack.

## Source

- [LeetCode 98: Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
