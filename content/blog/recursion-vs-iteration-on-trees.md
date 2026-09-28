---
title: "Recursion vs. Iteration on Trees: The Call Stack Is Just a Stack"
slug: "recursion-vs-iteration-on-trees"
datePublished: "2026-09-28"
excerpt: "Every recursive tree walk already uses a stack. Knowing what the call stack is holding for you tells you when a loop is a mechanical rewrite and when it needs a different idea."
tags: ["dsa", "fundamentals", "typescript"]
---

I just solved [Validate Binary Search Tree](/problems/validate-binary-search-tree) twice, once recursively and once with a loop, and the interesting part wasn't either solution. It was noticing that the "iterative" version wasn't a translation of the recursive one at all. It was a different idea wearing a `while` loop.

That's worth unpacking, because "recursive vs. iterative" gets talked about like a style preference. It's really a question about who manages the stack: the runtime, or you.

## Every Recursive Call Already Uses a Stack

When a function calls itself, the engine pushes a frame onto the call stack. That frame holds the function's arguments, its local variables, and one more thing people forget about: where to pick up when the inner call returns.

So a recursive tree walk isn't stack-free. It's using a stack you never see. When you "convert recursion to iteration," you're not getting rid of the stack. You're taking over the job of deciding what goes in each frame.

That framing makes the conversion question concrete. What is the call stack holding for me, and how much of it do I actually need?

## Top-Down Recursion Converts for Free

Some recursion only passes information _down_. Each call gets what it needs from its parent, checks something, and hands new arguments to its children. Nothing flows back up except a boolean.

For a BST, that's the bounds version. Every node has a range it's allowed to live in, and each child inherits a tighter one:

```typescript
function inRange(node: TreeNode | null, lower: number, upper: number): boolean {
    if (node === null) {
        return true;
    }
    if (node.val <= lower || node.val >= upper) {
        return false;
    }
    return (
        inRange(node.left, lower, node.val) &&
        inRange(node.right, node.val, upper)
    );
}
```

Look at what a frame needs here: the node and its two bounds. That's it. There's no "resume point" worth saving, because once a node is checked, its children don't need anything else from it.

So the loop version just makes that frame an object and pushes it yourself:

```typescript
const stack = [{ node: root, lower: -Infinity, upper: Infinity }];
let pending = stack.pop();

while (pending) {
    const { node, lower, upper } = pending;
    if (node.val <= lower || node.val >= upper) {
        return false;
    }
    if (node.right) stack.push({ node: node.right, lower: node.val, upper });
    if (node.left) stack.push({ node: node.left, lower, upper: node.val });
    pending = stack.pop();
}
```

That's a mechanical rewrite. Arguments become fields, the recursive calls become `push`, and the function body becomes the loop body. If your recursion looks like this, the conversion is boring, and boring is good.

## Bottom-Up Recursion Is Where It Gets Awkward

My recursive solution went the other way. Go down to the leaves, then build the answer on the way back up. Each call returns its subtree's smallest and largest values, and the parent checks `left.max < node.val < right.min`.

That's a post-order walk: a node can't finish until both children have reported back. Now the frame has to hold more than arguments. It has to remember "I've done my left child and I'm waiting on my right," plus the result the left child already handed back.

You can absolutely write that with an explicit stack. You track a visited flag or a phase per frame, stash child results somewhere, and pop results back off in the right order. It works. It also reads like you're reimplementing the call stack by hand, because you are.

That's the moment to step back. Instead of forcing the bottom-up shape into a loop, ask whether the information can flow the other way. For BST validation it can. "My children tell me their ranges" and "I tell my children their allowed range" check the same rule. The second one converts for free.

## A Bug That Hides in the Conversion

Here's the trap that's easiest to fall into. The easy loop is "push nodes, compare each one to its parent." It looks like a faithful DFS, and it passes the simple examples.

It fails on `[5,4,6,null,null,3,7]`. The `3` is a fine left child of `6`, but it lives in `5`'s right subtree, so it has to be greater than `5`. A frame that only knows its parent can't see that. The recursive bounds version quietly carried that information in its arguments, and a sloppy conversion drops it on the floor.

That's the general lesson. When you convert, write down everything the frame depends on before you write the loop. If you leave something out, you won't get an error. You'll just get a subtly wrong answer.

## When Recursion Depth Actually Matters

Both versions use O(h) space, where h is the tree's height. The difference is whose memory that is.

The call stack has a fixed limit set by the engine. A balanced tree with a million nodes is only about 20 levels deep, so recursion is completely fine. A degenerate tree that's really a linked list is as deep as it is long, and at some size you'll get a `RangeError: Maximum call stack size exceeded` instead of an answer.

The test suite for this problem includes a 10,000-node chain, and the recursive version handles it without complaint. I wouldn't bet on that at a few hundred thousand. An explicit stack lives on the heap, so it grows as far as memory allows.

My rule of thumb:

- If the input is trusted and roughly balanced, write whichever version reads most clearly. That's usually the recursive one.
- If the input can be lopsided, comes from somewhere you don't control, or could get large, use an explicit stack.
- If the recursion is bottom-up and the loop is getting ugly, try flipping the direction before you fight it.

## Wrap Up

Recursion and iteration aren't two different algorithms. They're two ways of managing the same stack. Top-down recursion only passes state down, so it turns into a loop almost line for line. Bottom-up recursion depends on results coming back up, and converting it faithfully means rebuilding the call stack's bookkeeping yourself.

Next time you reach for "make it iterative," start with one question: what is each stack frame actually holding? Answer that honestly and the loop either writes itself or tells you to rethink the direction. And if you want to see both versions side by side with the edge cases that break them, the [Validate Binary Search Tree walkthrough](/problems/validate-binary-search-tree) has the tested code.
