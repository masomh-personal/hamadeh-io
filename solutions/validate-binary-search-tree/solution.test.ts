import { describe, expect, test } from "bun:test";
import { isValidBSTIterative, isValidBSTRecursive, TreeNode } from "./solution";

type LevelOrder = ReadonlyArray<number | null>;
type Validator = (root: TreeNode | null) => boolean;

const INT_MIN = -(2 ** 31);
const INT_MAX = 2 ** 31 - 1;

/** Builds a tree from LeetCode's level-order array form, where `null` marks a missing child. */
function buildTree(values: LevelOrder): TreeNode | null {
    const [rootValue, ...rest] = values;
    if (rootValue === undefined || rootValue === null) {
        return null;
    }

    const root = new TreeNode(rootValue);
    const parents: TreeNode[] = [root];
    let parentIndex = 0;
    let valueIndex = 0;

    while (valueIndex < rest.length) {
        const parent = parents[parentIndex++];
        if (!parent) {
            break;
        }

        const leftValue = rest[valueIndex++];
        if (leftValue !== undefined && leftValue !== null) {
            parent.left = new TreeNode(leftValue);
            parents.push(parent.left);
        }

        const rightValue = rest[valueIndex++];
        if (rightValue !== undefined && rightValue !== null) {
            parent.right = new TreeNode(rightValue);
            parents.push(parent.right);
        }
    }

    return root;
}

/** Builds a height-balanced tree whose in-order traversal is `values`. */
function buildBalanced(values: readonly number[]): TreeNode | null {
    function build(low: number, high: number): TreeNode | null {
        if (low > high) {
            return null;
        }

        const middle = Math.floor((low + high) / 2);
        return new TreeNode(
            values[middle],
            build(low, middle - 1),
            build(middle + 1, high)
        );
    }

    return build(0, values.length - 1);
}

/** Builds a single-path tree, the worst case for recursion depth. */
function buildChain(length: number, direction: "left" | "right"): TreeNode {
    const root = new TreeNode(0);
    let current = root;

    for (let step = 1; step < length; step++) {
        const value = direction === "right" ? step : -step;
        const next = new TreeNode(value);
        current[direction] = next;
        current = next;
    }

    return root;
}

function serialize(root: TreeNode | null): Array<number | null> {
    if (!root) {
        return [null];
    }

    return [root.val, ...serialize(root.left), ...serialize(root.right)];
}

/** Deterministic pseudo-random generator so the contract test is repeatable. */
function createRandom(seed: number): () => number {
    let state = seed;
    return () => {
        state = (state * 1103515245 + 12345) % 2 ** 31;
        return state / 2 ** 31;
    };
}

function buildRandomTree(random: () => number, size: number): TreeNode | null {
    const values: Array<number | null> = [];
    for (let index = 0; index < size; index++) {
        values.push(random() < 0.2 ? null : Math.floor(random() * 21) - 10);
    }

    return buildTree(values);
}

const implementations: ReadonlyArray<[string, Validator]> = [
    ["isValidBSTRecursive", isValidBSTRecursive],
    ["isValidBSTIterative", isValidBSTIterative],
];

for (const [name, isValidBST] of implementations) {
    describe(name, () => {
        describe("Basics", () => {
            test("accepts LeetCode example 1: [2,1,3]", () => {
                const root = buildTree([2, 1, 3]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects LeetCode example 2: [5,1,4,null,null,3,6]", () => {
                const root = buildTree([5, 1, 4, null, null, 3, 6]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts a three-level BST", () => {
                const root = buildTree([8, 4, 12, 2, 6, 10, 14]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });
        });

        describe("Edge Cases", () => {
            test("treats an empty tree as valid", () => {
                const expected = true;
                const result = isValidBST(null);

                expect(result).toBe(expected);
            });

            test("accepts a single node", () => {
                const root = buildTree([0]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a duplicate on the left, because ordering is strict", () => {
                const root = buildTree([2, 2]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a duplicate on the right, because ordering is strict", () => {
                const root = buildTree([2, null, 2]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a grandchild that is valid for its parent but breaks the root's bound", () => {
                // 3 is a fine left child of 6, but it sits in 5's right subtree.
                const root = buildTree([5, 4, 6, null, null, 3, 7]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a deep left-subtree value larger than the root", () => {
                // 11 is a fine right child of 5, but it sits in 10's left subtree.
                const root = buildTree([10, 5, 15, null, 11]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts negative values", () => {
                const root = buildTree([-1, -2, 0]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts nodes at both 32-bit bounds", () => {
                const root = buildTree([0, INT_MIN, INT_MAX]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts INT_MIN as a root with INT_MAX on the right", () => {
                const root = buildTree([INT_MIN, null, INT_MAX]);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a duplicate INT_MAX, which a sentinel bound would miss", () => {
                const root = buildTree([INT_MAX, null, INT_MAX]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a duplicate INT_MIN, which a sentinel bound would miss", () => {
                const root = buildTree([INT_MIN, INT_MIN]);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("does not mutate the input tree", () => {
                const root = buildTree([5, 3, 8, 1, 4, 7, 9]);
                const before = serialize(root);

                isValidBST(root);

                const expected = before;
                const result = serialize(root);

                expect(result).toEqual(expected);
            });
        });

        describe("Stress Tests", () => {
            const size = 10_000;
            const sortedValues = Array.from(
                { length: size },
                (_, index) => index
            );

            test("accepts a balanced 10^4-node BST", () => {
                const root = buildBalanced(sortedValues);

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("rejects a balanced 10^4-node tree with one out-of-order value", () => {
                const values = [...sortedValues];
                values[size - 2] = -1;
                const root = buildBalanced(values);

                const expected = false;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts a 10^4-deep right-leaning chain", () => {
                const root = buildChain(size, "right");

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });

            test("accepts a 10^4-deep left-leaning chain", () => {
                const root = buildChain(size, "left");

                const expected = true;
                const result = isValidBST(root);

                expect(result).toBe(expected);
            });
        });
    });
}

describe("Contract", () => {
    test("both implementations agree on 500 deterministic random trees", () => {
        const random = createRandom(42);
        const trees = Array.from({ length: 500 }, () =>
            buildRandomTree(random, 1 + Math.floor(random() * 15))
        );

        const expected = trees.map((root) => isValidBSTRecursive(root));
        const result = trees.map((root) => isValidBSTIterative(root));

        expect(result).toEqual(expected);
    });
});
