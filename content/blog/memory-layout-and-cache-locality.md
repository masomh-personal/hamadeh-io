---
title: "Memory Layout and Cache Locality: Why Your Data Structure Choice Matters More Than You Think"
slug: "memory-layout-and-cache-locality"
datePublished: "2026-05-23"
excerpt: "Memory layout and cache locality explain why two O(n) algorithms can perform completely differently. Here's what's actually happening and how it shows up in everyday engineering work."
tags: ["dsa", "fundamentals", "engineering"]
---

Last week we looked at why Big O notation doesn't capture the full performance picture. Constants matter. Cache behavior matters. Memory access patterns matter. None of those appear in the notation.

This post is about that missing piece: what memory layout and cache locality actually mean, and how understanding them changes the decisions you make as an engineer.

## The CPU Is Not Talking Directly to RAM

This is the part most developers never get taught.

When your program reads a value from memory, the CPU does not reach all the way into RAM and pull out just that one byte. That round trip would be too slow. Instead, modern CPUs are built with layers of small, fast memory sitting between the processor and RAM. These layers are called caches, typically labeled L1, L2, and L3.

L1 is the smallest and fastest, often a few dozen kilobytes, and lives directly on the processor core. L3 is larger, slower, and shared between cores. RAM is enormous by comparison and orders of magnitude slower to access.

When the CPU needs a value, it checks L1 first. If it's there, that's a cache hit. If not, it checks L2, then L3, then finally reaches out to RAM. That last step, a cache miss all the way to RAM, can cost 100 to 300 processor cycles. During those cycles, the CPU is largely waiting.

Your code can't control the cache directly. But how you lay out your data in memory determines how often the CPU finds what it needs there.

## Cache Lines: The Atom of Memory Access

The CPU doesn't fetch a single byte when it reads from RAM. It fetches a block of contiguous memory called a cache line. On most modern hardware, a cache line is 64 bytes.

That means when you access one element, the surrounding neighbors come along for free. If you're about to access them anyway, that's a warm cache and fast iteration. If you're jumping to a completely different part of memory next, you wasted that prefetch and paid the full miss penalty.

This is why sequential access patterns are almost always faster than random ones, regardless of what the Big O says.

## Arrays vs Linked Lists: A Concrete Example

Take the classic comparison: an array and a linked list, both holding 1,000 integers.

Iterating the array is fast. All the integers are laid out in contiguous memory. The CPU loads the first cache line, reads several elements, then loads the next cache line. The access pattern is perfectly sequential and the CPU's hardware prefetcher can predict it and load ahead.

Now do the same with a linked list. Each node holds an integer and a pointer to the next node. Those nodes were allocated at different times and live at different addresses scattered across the heap. Traversing the list means following pointers to arbitrary memory locations. Almost every node is a potential cache miss.

Both structures give you O(n) traversal. In practice, on large inputs, the array will significantly outperform the linked list because of cache efficiency, not algorithmic complexity.

This is not a pathological case. It's the default. And it's why Vec in Rust, ArrayList in Java, and slice in Go are the default collection types in their respective standard libraries. Contiguous allocation wins for most workloads.

## When This Shows Up at Work

You don't need to be writing a game engine or a database kernel to encounter this. It comes up in ordinary backend and frontend work.

**Iterating objects vs flat arrays.** A loop over a flat array of numbers is fast. A loop over an array of richly nested objects that dereferences pointers on each iteration is slower. If you're doing this millions of times in a hot path, the memory layout matters.

**Row-major vs column-major access.** If you have a 2D array or matrix and you iterate row by row, you're accessing contiguous memory. If you iterate column by column, you're jumping by the row stride with every step. For large matrices, iterating in the wrong direction means a cache miss on nearly every access.

**Database and ORM patterns.** Fetching large sets of rows and accessing one or two fields on each is effectively a column-major access pattern on data that was stored row by row. This is part of why columnar storage formats like Parquet and the whole category of column-oriented databases exist. They store data so that reading a single column is a sequential scan, not a series of jumps through row-oriented records.

**Struct layout and field ordering.** In systems languages, the order you declare fields in a struct affects how much padding the compiler inserts for alignment and how many cache lines a struct spans. Placing frequently accessed fields together reduces the chance that a hot access touches two cache lines instead of one.

```typescript
// Iterating a flat array: sequential, cache-friendly
const prices = [1.99, 2.49, 3.0, 0.99]; // contiguous in memory
const total = prices.reduce((sum, p) => sum + p, 0);

// Iterating objects: each object is a separate heap allocation
const items = [
    { name: "apple", price: 1.99 },
    { name: "banana", price: 2.49 },
    { name: "cherry", price: 3.0 },
    { name: "date", price: 0.99 },
];
const totalFromObjects = items.reduce((sum, item) => sum + item.price, 0);
```

For four items, the difference is irrelevant. For four million items in a tight loop, it isn't.

## Temporal vs Spatial Locality

Cache behavior is often described through two concepts.

Spatial locality means that if you access one memory address, you're likely to access nearby addresses soon. Arrays exploit spatial locality well because elements are adjacent.

Temporal locality means that if you access an address, you're likely to access it again soon. Frequently reused values stay warm in cache. Values accessed once and discarded cool off quickly.

Good data structure and algorithm design tends to exploit both. Poor designs scatter data through memory and access it unpredictably, burning cache lines on data that won't be reused.

## What You Can Actually Do With This

You won't be redesigning your data structures after every standup. But this knowledge changes how you think about a few things.

When you're in a hot path, reach for flat, contiguous collections first. Profile before assuming an abstraction is free.

When you see performance problems in data-heavy code, consider whether the access pattern is sequential or random. Restructuring iteration order is sometimes free performance.

When reading unfamiliar performance-sensitive code, look at how data is laid out and traversed. That often explains why the code is written the way it is.

## Wrap Up

The CPU has a hierarchy of caches between the processor and RAM. Reading from RAM is expensive. Reading from L1 cache is cheap. Whether your code hits one or the other is largely determined by how your data is laid out in memory and in what order you access it.

Arrays are cache-friendly because they're contiguous. Linked structures are not because they scatter allocations. Iteration order matters because CPUs fetch 64-byte cache lines, not individual bytes.

None of this shows up in Big O. It's the layer underneath the notation that explains why two O(n) algorithms can have very different real-world performance. Big O tells you how an algorithm scales. Cache behavior tells you how it actually runs on the hardware you're shipping to.
