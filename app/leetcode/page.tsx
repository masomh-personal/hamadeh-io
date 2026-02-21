import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAllSolutions } from "@/lib/mdx";

export const metadata: Metadata = {
    title: "LeetCode Solutions | hamadeh.io",
    description:
        "Collection of LeetCode solutions with detailed explanations and complexity analysis",
};

export default async function LeetCodePage(): Promise<React.ReactElement> {
    const solutions = await getAllSolutions();

    const difficultyColors = {
        easy: "bg-tertiary-100 text-tertiary-700 dark:bg-tertiary-900 dark:text-tertiary-300",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <PageContainer>
            <PageHeader
                title="LeetCode Solutions"
                description="Detailed solutions with explanations, complexity analysis, and thought process"
            />

            {solutions.length === 0 ? (
                <div className="rounded-lg border border-primary-200 bg-primary-50 p-8 text-center dark:border-primary-700 dark:bg-primary-800">
                    <p className="text-primary-600 dark:text-primary-300">
                        No solutions yet. Check back soon!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {solutions.map((solution) => (
                        <Link
                            key={solution.slug}
                            href={`/leetcode/${solution.slug}`}
                            prefetch={false}
                            className="group rounded-lg border border-primary-200 bg-white p-6 transition-all hover:border-secondary-300 hover:shadow-lg dark:border-primary-700 dark:bg-primary-800 dark:hover:border-secondary-600"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <h2 className="text-lg font-semibold text-primary-900 group-hover:text-secondary-600 dark:text-primary-50 dark:group-hover:text-secondary-400">
                                    {solution.title}
                                </h2>
                                <span
                                    className={`rounded px-2 py-1 text-xs font-medium ${difficultyColors[solution.difficulty]}`}
                                >
                                    {solution.difficulty}
                                </span>
                            </div>
                            <p className="mb-4 text-sm text-primary-600 dark:text-primary-300">
                                {solution.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {solution.topics.slice(0, 3).map((topic) => (
                                    <span
                                        key={topic}
                                        className="rounded bg-primary-100 px-2 py-1 text-xs text-primary-700 dark:bg-primary-700 dark:text-primary-300"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-primary-500 dark:text-primary-400">
                                <span>{solution.timeComplexity}</span>
                                <span>{solution.spaceComplexity}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
