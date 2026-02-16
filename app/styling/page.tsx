export default function StylingShowcase(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="mb-20 text-center">
                <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                    ThoughtfulCode Styling Guide
                </h1>
                <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400 md:text-2xl">
                    A comprehensive showcase of our typography, colors, and
                    component styling.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                    >
                        Get Started
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-heading text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg"
                    >
                        Learn More
                    </button>
                </div>
            </section>

            {/* Typography Hierarchy */}
            <section className="mb-20">
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Typography Hierarchy
                </h2>

                <div className="space-y-8">
                    {/* H1 Example */}
                    <div>
                        <h1 className="mb-2 font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">
                            Heading 1 - Baloo 2 ExtraBold
                        </h1>
                        <p className="text-sm text-slate-400">
                            Used for hero sections and main page titles
                        </p>
                    </div>

                    {/* H2 Example */}
                    <div>
                        <h2 className="mb-2 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                            Heading 2 - Baloo 2 Bold
                        </h2>
                        <p className="text-sm text-slate-400">
                            Used for major section headings
                        </p>
                    </div>

                    {/* H3 Example */}
                    <div>
                        <h3 className="mb-2 font-heading text-2xl font-semibold leading-tight text-white md:text-3xl">
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
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Color Palette
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {/* Primary Accent - Sky Blue */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-sky-500"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Primary Accent
                        </h3>
                        <p className="text-sm text-slate-400">Sky Blue 500</p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for links, buttons, and interactive elements
                        </p>
                    </div>

                    {/* Secondary Accent - Emerald */}
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <div className="mb-4 h-24 rounded-md bg-emerald-500"></div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Secondary Accent
                        </h3>
                        <p className="text-sm text-slate-400">Emerald 500</p>
                        <p className="mt-2 text-xs text-slate-500">
                            Used for success states and positive indicators
                        </p>
                    </div>

                    {/* Tertiary Accent - Amber */}
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
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Buttons & Interactive Elements
                </h2>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                    >
                        Primary Button
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-heading text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg"
                    >
                        Secondary Button
                    </button>
                    <button
                        type="button"
                        className="rounded-md border-2 border-transparent bg-emerald-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-emerald-300 hover:bg-emerald-400"
                    >
                        Success Button
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer border-none bg-transparent p-0 font-heading text-base font-semibold text-sky-500 transition-colors hover:text-sky-400 hover:underline"
                    >
                        Link Example
                    </button>
                </div>
            </section>

            {/* Code Block Example */}
            <section className="mb-20">
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Code Block Example
                </h2>
                <p className="mb-6 text-base text-slate-400">
                    Example using Fira Code as the primary monospace font:
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
}`}
                    </code>
                </pre>
            </section>

            {/* Spacing Examples */}
            <section className="mb-20">
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Spacing & Layout
                </h2>

                <div className="space-y-6 rounded-md border-2 border-slate-700 p-8">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Generous Whitespace
                        </h3>
                        <p className="text-slate-400">
                            We use generous spacing between sections (py-20 to
                            py-32) and comfortable padding within components for
                            better readability.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Clear Hierarchy
                        </h3>
                        <p className="text-slate-400">
                            Headings have proper spacing (mb-6 to mb-8), and
                            paragraphs maintain consistent rhythm with mb-6
                            spacing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Font Comparison */}
            <section className="mb-20">
                <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Font Family Showcase
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-md border-2 border-slate-700 p-6">
                        <h3 className="mb-4 font-heading text-2xl font-bold text-white">
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
