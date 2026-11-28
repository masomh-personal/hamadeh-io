import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProblemListing } from "@/components/problems/ProblemListing";
import { buildPageHead } from "@/lib/site";
import { loadProblemListingData } from "@/src/data/content";

const ProblemSearchSchema = v.object({
    difficulty: v.optional(v.string()),
    q: v.optional(v.string()),
    page: v.optional(
        v.pipe(
            v.union([v.number(), v.string()]),
            v.transform((val) => Number(val)),
            v.number(),
            v.finite()
        )
    ),
});

export const Route = createFileRoute("/problems/")({
    validateSearch: (search) => {
        const parsed = v.safeParse(ProblemSearchSchema, search);
        return parsed.success ? parsed.output : {};
    },
    loader: () => loadProblemListingData(),
    head: () =>
        buildPageHead({
            title: "Code Problems",
            description:
                "Practice problems with concise writeups, tested local solutions, and complexity analysis.",
            path: "/problems",
        }),
    component: ProblemsPage,
});

function ProblemsPage(): React.ReactElement {
    const { problems, difficultyCounts } = Route.useLoaderData();
    const search = Route.useSearch();

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
                <ProblemListing
                    problems={problems}
                    difficultyCounts={difficultyCounts}
                    search={{
                        difficulty: search.difficulty,
                        q: search.q,
                        page:
                            search.page !== undefined
                                ? String(search.page)
                                : undefined,
                    }}
                />
            )}
        </PageContainer>
    );
}
