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
        easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
        hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
            {/* Header */}
            <header className="mb-12">
                <div className="mb-6 flex items-center gap-4">
                    <span
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${difficultyColors[solution.difficulty]}`}
                    >
                        {solution.difficulty}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {solution.datePublished}
                    </span>
                </div>
                <h1 className="mb-4 font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    {solution.title}
                </h1>
                <p className="text-xl leading-7 text-slate-600 dark:text-slate-300">
                    {solution.excerpt}
                </p>
            </header>

            {/* Topics */}
            <div className="mb-10 flex flex-wrap gap-2">
                {solution.topics.map((topic) => (
                    <span
                        key={topic}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                        {topic}
                    </span>
                ))}
            </div>

            {/* Complexity */}
            <div className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Time Complexity
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            {solution.timeComplexity}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Space Complexity
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            {solution.spaceComplexity}
                        </p>
                    </div>
                </div>
            </div>

            {/* MDX Content */}
            <div className="mt-12">
                <MDXContent content={solution.content} />
            </div>
        </article>
    );
}
