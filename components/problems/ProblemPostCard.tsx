import Link from "next/link";
import { HiCode, HiEye } from "react-icons/hi";
import { NavigationOverlay } from "@/components/layout/NavigationOverlay";
import { formatPublishedDate } from "@/lib/date";
import type { ProblemPost } from "@/lib/mdx";

interface ProblemPostCardProps {
    problem: ProblemPost;
}

const difficultyClasses = {
    easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
} as const;

export function ProblemPostCard({
    problem,
}: ProblemPostCardProps): React.ReactElement {
    const title =
        problem.source === "leetcode"
            ? `${problem.title} (LeetCode)`
            : problem.title;

    return (
        <Link
            href={`/problems/${problem.slug}`}
            prefetch={false}
            className="surface-card radius-card card-chrome card-hover flex h-full flex-col p-4 text-content transition-all sm:p-5"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                    <HiCode
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-sky-300"
                    />
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                        {formatPublishedDate(problem.datePublished)}
                    </p>
                </div>
                <span
                    className={`rounded px-2 py-1 text-xs font-semibold uppercase ${difficultyClasses[problem.difficulty]}`}
                >
                    {problem.difficulty}
                </span>
            </div>

            <h2 className="font-heading mt-2 text-xl font-semibold text-white">
                {title}
            </h2>

            <div className="my-3 border-b border-surface-outline/80" />

            <p className="text-content-subtle pb-5 text-sm leading-relaxed">
                {problem.excerpt}
            </p>

            <div className="mt-auto flex justify-center border-t border-surface-outline/70 pt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-sky-200">
                    <HiEye className="h-4 w-4" aria-hidden="true" />
                    See Solution
                </span>
            </div>
            <NavigationOverlay message="Loading solution..." />
        </Link>
    );
}
