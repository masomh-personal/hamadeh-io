---
title: "Count Primes"
slug: "count-primes"
source: "leetcode"
difficulty: "medium"
timeComplexity: "O(n log log n)"
spaceComplexity: "O(n)"
excerpt: "Count the primes below n with the Sieve of Eratosthenes: cross out multiples of each prime, starting at p squared, for O(n log log n) instead of testing every number."
---

# Problem

Given an integer `n`, return the number of prime numbers that are strictly less than `n`.

## Constraints

- `0 <= n <= 5 * 10^6`

## Examples

```text
Input: n = 10
Output: 4
Explanation: The primes below 10 are 2, 3, 5, and 7.
```

```text
Input: n = 0
Output: 0
```

```text
Input: n = 1
Output: 0
```

## Approach

The obvious move is to test every number from 2 up to `n - 1` for primality. Even with the usual trick of only checking divisors up to the square root, that's roughly O(n√n). At `n = 5,000,000` you're doing billions of divisions. It works on paper and dies on the clock.

The better question is to stop asking "is this number prime?" one at a time and instead ask "which numbers can I rule out for free?" That's the Sieve of Eratosthenes, and it's a nice example of math paying for itself (I wrote about that idea in [Why Math Makes Better Programmers](/blog/why-math-makes-better-programmers)).

The idea:

- Start by assuming every number from 2 up is prime.
- Walk upward. The first unmarked number is prime, so count it.
- Cross out every multiple of that prime. Those are composite by definition.

Two small facts from number theory make it fast:

- **Start crossing out at `p * p`.** Any smaller multiple of `p`, like `p * 2` or `p * 3`, has a smaller prime factor and was already crossed out earlier.
- **Composites always have a small factor.** Every composite below `n` has a prime factor at most `√n`. That's why the inner loop barely runs once `candidate * candidate` passes `n`, and why the total work lands near `n log log n` instead of `n√n`.

A `Uint8Array` is a good fit for the flags. It's one byte per number, it starts zeroed, and it's far lighter than an array of booleans at five million entries.

## Implementation

```typescript
export function countPrimes(n: number): number {
    if (n < 3) return 0;

    // isComposite[i] is true once some smaller prime is known to divide i.
    const isComposite = new Uint8Array(n);
    let primeCount = 0;

    for (let candidate = 2; candidate < n; candidate++) {
        if (isComposite[candidate] === 1) continue;

        primeCount++;

        // Any composite below n has a prime factor <= sqrt(n), so starting at
        // candidate * candidate skips work that earlier primes already did.
        for (
            let multiple = candidate * candidate;
            multiple < n;
            multiple += candidate
        ) {
            isComposite[multiple] = 1;
        }
    }

    return primeCount;
}
```

## Complexity

- **Time O(n log log n):** Each prime `p` crosses out about `n / p` numbers, and the sum of `1 / p` over primes up to `n` grows like `log log n`.
- **Space O(n):** One flag per number below `n`.

## Edge Cases Checklist

- `n` of 0, 1, and 2, where nothing is below the bound
- `n` equal to 3, where only 2 counts
- `n` itself prime, which must not be counted
- Squares of primes like 49
- Large input at the maximum constraint
- Repeated calls give the same answer

## Test Coverage

The suite covers all three LeetCode examples, the exclusive upper bound around 2 and 3, a prime `n` versus a composite `n`, prime squares, known prime counts at 100, 1,000, and 1,000,000, and the maximum constraint of 5,000,000 (348,513 primes).

## Source

- [LeetCode 204: Count Primes](https://leetcode.com/problems/count-primes/)
