import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProblemPostCard } from "@/components/problems/ProblemPostCard";
import { listPublishedProblems } from "@/lib/content/problems";

export const metadata: Metadata = {
    title: "Code Problems | hamadeh.io",
    description:
        "Practice problems with concise writeups, tested local solutions, and complexity analysis.",
};

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
                        <ProblemPostCard key={problem.slug} problem={problem} />
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
