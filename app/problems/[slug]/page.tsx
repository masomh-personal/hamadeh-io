import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import {
    getPublishedProblemBySlug,
    listPublishedProblems,
} from "@/lib/content/problems";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const difficultyClasses = {
    easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
} as const;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const problems = await listPublishedProblems();
    return problems.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const problem = await getPublishedProblemBySlug(slug);
        return {
            title: `${problem.title} | hamadeh.io`,
            description: problem.excerpt,
        };
    } catch {
        return {
            title: "Problem Not Found | hamadeh.io",
        };
    }
}

export default async function ProblemPostPage({
    params,
}: PageProps): Promise<React.ReactElement> {
    const { slug } = await params;

    let problem: Awaited<ReturnType<typeof getPublishedProblemBySlug>>;
    try {
        problem = await getPublishedProblemBySlug(slug);
    } catch {
        notFound();
    }

    return (
        <PageContainer>
            <article className="surface-card radius-card card-chrome p-6 md:p-10">
                <header className="mb-8">
                    <div className="mb-5 flex items-center gap-3">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${difficultyClasses[problem.difficulty]}`}
                        >
                            {problem.difficulty}
                        </span>
                        <span className="text-content-subtle text-sm uppercase">
                            {problem.source}
                        </span>
                        <span className="text-content-subtle text-sm">
                            {problem.datePublished}
                        </span>
                    </div>
                    <h1 className="font-heading text-white">{problem.title}</h1>
                    <p className="text-content-subtle mt-3 text-lg leading-7">
                        {problem.excerpt}
                    </p>
                </header>

                <div className="mb-8 rounded-lg border border-surface-outline/70 bg-surface-card/50 p-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-content-subtle text-xs uppercase tracking-wide">
                                Time Complexity
                            </p>
                            <p className="text-content mt-2 text-xl font-semibold">
                                {problem.timeComplexity}
                            </p>
                        </div>
                        <div>
                            <p className="text-content-subtle text-xs uppercase tracking-wide">
                                Space Complexity
                            </p>
                            <p className="text-content mt-2 text-xl font-semibold">
                                {problem.spaceComplexity}
                            </p>
                        </div>
                    </div>
                </div>

                <RichMarkdownContent content={problem.content} />
            </article>
        </PageContainer>
    );
}
