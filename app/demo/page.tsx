export default function TypographyDemo(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="mb-20 text-center">
                <h1 className="mb-6 font-baloo text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                    Build thoughtful software. Fast.
                </h1>
                <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400 md:text-2xl">
                    Full-stack portfolio showcasing engineering skills, LeetCode
                    solutions, and technical writing.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        className="rounded-md bg-sky-400 px-6 py-3 font-baloo text-base font-semibold text-white transition-colors hover:bg-sky-300"
                    >
                        Get Started
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-baloo text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-950/20 hover:text-sky-400 hover:shadow-lg"
                    >
                        Learn More
                    </button>
                </div>
            </section>

            {/* Typography Hierarchy */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Typography Hierarchy
                </h2>

                <div className="space-y-8">
                    {/* H1 Example */}
                    <div>
                        <h1 className="mb-2 font-baloo text-4xl font-extrabold leading-tight text-white md:text-5xl">
                            Heading 1 - Baloo 2 ExtraBold
                        </h1>
                        <p className="text-sm text-slate-400">
                            Used for hero sections and main page titles
                        </p>
                    </div>

                    {/* H2 Example */}
                    <div>
                        <h2 className="mb-2 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                            Heading 2 - Baloo 2 Bold
                        </h2>
                        <p className="text-sm text-slate-400">
                            Used for major section headings
                        </p>
                    </div>

                    {/* H3 Example */}
                    <div>
                        <h3 className="mb-2 font-baloo text-2xl font-semibold leading-tight text-white md:text-3xl">
                            Heading 3 - Baloo 2 SemiBold
                        </h3>
                        <p className="text-sm text-slate-400">
                            Used for subsection headings
                        </p>
                    </div>

                    {/* H4 Example */}
                    <div>
                        <h4 className="mb-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                            Heading 4 - Plus Jakarta Sans SemiBold
                        </h4>
                        <p className="text-sm text-slate-400">
                            Used for minor headings
                        </p>
                    </div>

                    {/* Body Text */}
                    <div>
                        <p className="mb-4 text-base leading-relaxed text-slate-300">
                            Body text uses Plus Jakarta Sans Regular (400) for
                            optimal readability. This is the default font for
                            all paragraphs, lists, and general content. The line
                            height is set to 1.6 for comfortable reading
                            experience.
                        </p>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Small text uses Plus Jakarta Sans Regular at 14px
                            (0.875rem) for captions, metadata, and secondary
                            information.
                        </p>
                    </div>
                </div>
            </section>

            {/* Color Palette */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Color Palette
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Primary Accent - Indigo */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-sky-400"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Primary Accent
                        </h3>
                        <p className="text-sm text-slate-400">Sky Blue 400</p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for links, buttons, and interactive elements
                        </p>
                    </div>

                    {/* Secondary Accent - Emerald */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-emerald-400"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Secondary Accent
                        </h3>
                        <p className="text-sm text-slate-400">Emerald 400</p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for success states and positive indicators
                        </p>
                    </div>

                    {/* Tertiary Accent - Purple */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-amber-400"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Tertiary Accent
                        </h3>
                        <p className="text-sm text-slate-400">
                            Amber 400 (Gold)
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for highlights, badges, and special emphasis
                        </p>
                    </div>

                    {/* Neutral - Slate */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-slate-50"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Neutral
                        </h3>
                        <p className="text-sm text-slate-400">
                            Slate scale (50-950)
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for backgrounds, text, and borders
                        </p>
                    </div>
                </div>
            </section>

            {/* Buttons & Interactive Elements */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Buttons & Interactive Elements
                </h2>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-baloo text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                    >
                        Primary Button
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-baloo text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-950/20 hover:text-sky-400 hover:shadow-lg"
                    >
                        Secondary Button
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-2 border-transparent bg-emerald-500 px-6 py-3 font-baloo text-base font-semibold text-white transition-all hover:border-emerald-300 hover:bg-emerald-400"
                    >
                        Success Button
                    </button>
                    <button
                        type="button"
                        className="font-baloo text-base font-semibold text-sky-400 transition-colors hover:text-sky-300 hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                        Link Example
                    </button>
                </div>
            </section>

            {/* Monospace Font Comparison */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Monospace Font Comparison
                </h2>
                <p className="mb-8 text-base text-slate-400">
                    Compare 10 popular monospace fonts side-by-side. All showing
                    the same code sample for easy visual comparison.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* IBM Plex Mono */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                1. IBM Plex Mono
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* JetBrains Mono */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                2. JetBrains Mono
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily: "var(--font-mono-jetbrains)",
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Fira Code */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                3. Fira Code
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{ fontFamily: "var(--font-mono-fira)" }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Source Code Pro */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                4. Source Code Pro
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily: "var(--font-mono-source)",
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Inconsolata */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                5. Inconsolata
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily: "var(--font-mono-inconsolata)",
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Anonymous Pro */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                6. Anonymous Pro
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily: "var(--font-mono-anonymous)",
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* PT Mono */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                7. PT Mono
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{ fontFamily: "var(--font-mono-pt)" }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Space Mono */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                8. Space Mono
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{ fontFamily: "var(--font-mono-space)" }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Roboto Mono */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                9. Roboto Mono
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily: "var(--font-mono-roboto)",
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>

                    {/* Courier Prime (System fallback) */}
                    <div className="rounded-md border-2 border-slate-700">
                        <div className="border-b-2 border-slate-700 bg-slate-800 px-4 py-2">
                            <h3 className="text-sm font-semibold text-white">
                                10. System Mono (Courier)
                            </h3>
                        </div>
                        <pre className="overflow-x-auto rounded-b-md bg-[#282c34]/50 p-4">
                            <code
                                className="text-xs text-slate-100"
                                style={{
                                    fontFamily:
                                        'ui-monospace, "Courier New", Courier, monospace',
                                }}
                            >
                                {`function greet(name) {
  return \`Hello, \${name}!\`;
}

const msg = greet("World");
console.log(msg);`}
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Large Code Block Example */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Large Code Block with Syntax Highlighting
                </h2>
                <p className="mb-6 text-base text-slate-400">
                    Example using Fira Code as the primary monospace font with
                    syntax highlighting:
                </p>

                <pre className="overflow-x-auto rounded-md border-2 border-slate-700 bg-[#282c34]/50 p-6">
                    <code className="font-mono text-sm leading-relaxed text-slate-100">
                        {`/**
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
}

// Test cases
const testCases = [
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { nums: [3, 3], target: 6, expected: [0, 1] },
];

testCases.forEach((test, index) => {
    const result = twoSum(test.nums, test.target);
    const passed = result?.indices[0] === test.expected[0] &&
                   result?.indices[1] === test.expected[1];
    console.log(\`Test \${index + 1}: \${passed ? "✅ PASS" : "❌ FAIL"}\`);
});`}
                    </code>
                </pre>
            </section>

            {/* Spacing Examples */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Spacing & Layout
                </h2>

                <div className="space-y-6 rounded-md border-2 border-slate-700 p-8">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Generous Whitespace
                        </h3>
                        <p className="text-slate-400">
                            Inspired by Decodable&apos;s design, we use generous
                            spacing between sections (py-20 to py-32) and
                            comfortable padding within components.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Clear Hierarchy
                        </h3>
                        <p className="text-slate-400">
                            Headings have proper spacing (mb-4 to mb-6), and
                            paragraphs maintain consistent rhythm with mb-6
                            spacing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="mb-20">
                <h2 className="mb-8 font-baloo text-3xl font-bold leading-tight text-white md:text-4xl">
                    Font Comparison
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <h3 className="mb-4 font-baloo text-2xl font-bold text-white">
                            Baloo 2 (Headings)
                        </h3>
                        <p className="mb-2 text-sm text-slate-400">
                            Friendly, rounded, attention-grabbing
                        </p>
                        <p className="text-base leading-relaxed text-slate-300">
                            This font adds personality and warmth to your
                            portfolio. Perfect for hero sections and major
                            headings where you want to make an impact.
                        </p>
                    </div>

                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <h3 className="mb-4 text-2xl font-semibold text-white">
                            Plus Jakarta Sans (Body)
                        </h3>
                        <p className="mb-2 text-sm text-slate-400">
                            Modern, geometric, highly readable
                        </p>
                        <p className="text-base leading-relaxed text-slate-300">
                            This modern sans-serif font ensures excellent
                            readability at all sizes with a contemporary
                            geometric feel. Perfect for body text, paragraphs,
                            and content where clarity and modern aesthetics are
                            paramount.
                        </p>
                    </div>
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <h3 className="mb-4 font-mono text-2xl font-semibold text-white">
                            Fira Code (Code)
                        </h3>
                        <p className="mb-2 text-sm text-slate-400">
                            Modern monospace with ligatures, crisp &
                            professional
                        </p>
                        <p className="font-mono text-base leading-relaxed text-slate-300">
                            This modern monospace font features programming
                            ligatures that improve code readability. It&apos;s
                            crisp, professional, and designed specifically for
                            coding with excellent character distinction and
                            balanced proportions.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
