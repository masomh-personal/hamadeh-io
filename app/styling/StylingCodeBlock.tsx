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
        <section className="mb-20" aria-labelledby="code-heading">
            <h2
                id="code-heading"
                className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl"
            >
                Code Block Example
            </h2>
            <p className="text-content-muted mb-6 text-base">
                Fira Code is the primary monospace font for code blocks.
            </p>

            <pre className="surface-card radius-card overflow-x-auto p-6">
                <code className="font-mono text-content text-sm leading-relaxed">
                    {CODE_EXAMPLE}
                </code>
            </pre>
        </section>
    );
}
