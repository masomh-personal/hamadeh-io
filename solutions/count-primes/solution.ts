/**
 * Count Primes
 * Difficulty: Medium
 * Topics: Math, Number Theory, Sieve of Eratosthenes
 *
 * Time: O(n log log n)
 * Space: O(n)
 *
 * Sieve of Eratosthenes: assume every number is prime, then cross out the
 * multiples of each prime. Crossing out can start at p * p because smaller
 * multiples already have a smaller prime factor.
 */
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
