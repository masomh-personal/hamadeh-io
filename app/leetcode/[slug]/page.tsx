import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { getAllSolutions, getSolutionBySlug } from "@/lib/mdx";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const solutions = await getAllSolutions();
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const solution = await getSolutionBySlug(slug);
        return {
            title: `${solution.title} | ThoughtfulCode`,
            description: solution.excerpt,
        };
    } catch {
        return {
            title: "Solution Not Found | ThoughtfulCode",
        };
    }
}

export default async function SolutionPage({
    params,
}: PageProps): Promise<React.ReactElement> {
    const { slug } = await params;

    let solution: Awaited<ReturnType<typeof getSolutionBySlug>>;
    try {
        solution = await getSolutionBySlug(slug);
    } catch {
        notFound();
    }

    const difficultyColors = {
        easy: "bg-tertiary-100 text-tertiary-700 dark:bg-tertiary-900 dark:text-tertiary-300",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                    <span
                        className={`rounded px-3 py-1 text-sm font-medium ${difficultyColors[solution.difficulty]}`}
                    >
                        {solution.difficulty}
                    </span>
                    <span className="text-sm text-primary-500 dark:text-primary-400">
                        {solution.datePublished}
                    </span>
                </div>
                <h1 className="mb-4 text-4xl font-bold text-primary-900 dark:text-primary-50">
                    {solution.title}
                </h1>
                <p className="text-lg text-primary-600 dark:text-primary-300">
                    {solution.excerpt}
                </p>
            </header>

            {/* Topics */}
            <div className="mb-8 flex flex-wrap gap-2">
                {solution.topics.map((topic) => (
                    <span
                        key={topic}
                        className="rounded bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-700 dark:text-primary-300"
                    >
                        {topic}
                    </span>
                ))}
            </div>

            {/* Complexity */}
            <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-700 dark:bg-primary-800">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-300">
                            Time Complexity
                        </p>
                        <p className="text-lg font-semibold text-primary-900 dark:text-primary-50">
                            {solution.timeComplexity}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-300">
                            Space Complexity
                        </p>
                        <p className="text-lg font-semibold text-primary-900 dark:text-primary-50">
                            {solution.spaceComplexity}
                        </p>
                    </div>
                </div>
            </div>

            {/* MDX Content */}
            <MDXContent content={solution.content} />
        </article>
    );
}
