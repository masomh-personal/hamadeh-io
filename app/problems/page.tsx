import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProblemPostCard } from "@/components/problems/ProblemPostCard";
import { PaginationNav } from "@/components/ui";
import { listPublishedProblems } from "@/lib/content/problems";

const PROBLEMS_PER_PAGE = 9;

interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

function parsePageNumber(page: string | undefined): number {
    if (!page) {
        return 1;
    }

    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return 1;
    }

    return parsedPage;
}

function getProblemsPageHref(page: number): string {
    if (page <= 1) {
        return "/problems";
    }

    return `/problems?page=${page}`;
}

export const metadata: Metadata = {
    title: "Code Problems | hamadeh.io",
    description:
        "Practice problems with concise writeups, tested local solutions, and complexity analysis.",
};

export default async function ProblemsPage({ searchParams }: PageProps) {
    const problems = await listPublishedProblems();
    const resolvedSearchParams = await searchParams;
    const requestedPage = parsePageNumber(resolvedSearchParams.page);
    const totalPages = Math.max(
        1,
        Math.ceil(problems.length / PROBLEMS_PER_PAGE)
    );
    const currentPage = Math.min(requestedPage, totalPages);
    const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
    const visibleProblems = problems.slice(
        startIndex,
        startIndex + PROBLEMS_PER_PAGE
    );

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
                <>
                    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        {visibleProblems.map((problem) => (
                            <ProblemPostCard
                                key={problem.slug}
                                problem={problem}
                            />
                        ))}
                    </div>

                    <PaginationNav
                        currentPage={currentPage}
                        totalPages={totalPages}
                        getPageHref={getProblemsPageHref}
                        className="mt-10"
                    />
                </>
            )}
        </PageContainer>
    );
}
