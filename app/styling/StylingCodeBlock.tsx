const CODE_EXAMPLE = `/**
 * LeetCode: Two Sum
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

interface TwoSumResult {
    indices: [number, number];
    values: [number, number];
    sum: number;
}

function twoSum(nums: number[], target: number): TwoSumResult | null {
    // Create a map to store number -> index
    const numMap = new Map<number, number>();

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const complement = target - current;

        // Check if complement exists in map
        if (numMap.has(complement)) {
            const complementIndex = numMap.get(complement)!;
            return {
                indices: [complementIndex, i],
                values: [nums[complementIndex], current],
                sum: nums[complementIndex] + current,
            };
        }

        // Store current number and its index
        numMap.set(current, i);
    }

    // No solution found
    return null;
}

// Example usage
const numbers = [2, 7, 11, 15];
const targetValue = 9;

const result = twoSum(numbers, targetValue);

if (result) {
    console.log(\`Indices: [\${result.indices.join(", ")}]\`);
    console.log(\`Values: [\${result.values.join(", ")}]\`);
    console.log(\`Sum: \${result.sum}\`);
} else {
    console.log("No solution found");
}`;

export function StylingCodeBlock(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Code Block Example
            </h2>
            <p className="mb-6 text-base text-slate-400">
                Example using Fira Code as the primary monospace font:
            </p>

            <pre className="surface-outline overflow-x-auto rounded-md bg-[#282c34]/50 p-6">
                <code className="font-mono text-sm leading-relaxed text-slate-100">
                    {CODE_EXAMPLE}
                </code>
            </pre>
        </section>
    );
}
