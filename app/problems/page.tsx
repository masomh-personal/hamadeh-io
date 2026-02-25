import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { listPublishedProblems } from "@/lib/content/problems";

export const metadata: Metadata = {
    title: "Code Problems | hamadeh.io",
    description:
        "Practice problems with concise writeups, tested local solutions, and complexity analysis.",
};

const difficultyClasses = {
    easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
} as const;

export default async function ProblemsPage(): Promise<React.ReactElement> {
    const problems = await listPublishedProblems();

    return (
        <PageContainer>
            <PageHeader
                title="Code Problems"
                description="A growing set of coding problems solved locally with tests, then published as concise markdown explanations."
                showDivider
            />

            {problems.length === 0 ? (
                <div className="surface-card radius-card p-8">
                    <p className="text-content">
                        No problems published yet. Check back soon.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {problems.map((problem) => (
                        <Link
                            key={problem.slug}
                            href={`/problems/${problem.slug}`}
                            prefetch={false}
                            className="surface-card radius-card card-chrome card-hover flex h-full flex-col p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="font-heading text-xl font-semibold text-white">
                                    {problem.title}
                                </h2>
                                <span
                                    className={`rounded px-2 py-1 text-xs font-semibold uppercase ${difficultyClasses[problem.difficulty]}`}
                                >
                                    {problem.difficulty}
                                </span>
                            </div>

                            <p className="text-content-subtle mt-3 text-sm">
                                {problem.excerpt}
                            </p>

                            <div className="text-content-subtle mt-auto flex items-center justify-between border-t border-surface-outline/70 pt-4 text-xs uppercase tracking-wide">
                                <span>{problem.source}</span>
                                <span>{problem.datePublished}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
