import type { Metadata } from "next";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProblemListing } from "@/components/problems/ProblemListing";
import { ProblemListingView } from "@/components/problems/ProblemListingView";
import { listPublishedProblems } from "@/lib/content/problems";
import { getDifficultyCounts } from "@/lib/problem-listing";
import { staticPageMetadata } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
    title: "Code Problems",
    description:
        "Practice problems with concise writeups, tested local solutions, and complexity analysis.",
    path: "/problems",
});

export default async function ProblemsPage(): Promise<React.ReactElement> {
    const problems = await listPublishedProblems();
    const difficultyCounts = getDifficultyCounts(problems);

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
                <Suspense
                    fallback={
                        <ProblemListingView
                            problems={problems}
                            difficultyCounts={difficultyCounts}
                            query={{}}
                        />
                    }
                >
                    <ProblemListing
                        problems={problems}
                        difficultyCounts={difficultyCounts}
                    />
                </Suspense>
            )}
        </PageContainer>
    );
}
