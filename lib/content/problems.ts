import type { ProblemPost } from "@/lib/mdx";
import { getAllProblems, getProblemBySlug } from "@/lib/mdx";

export type ProblemSummary = Omit<ProblemPost, "content" | "filePath">;

/**
 * Content-access boundary for code problem data.
 * Returns only fields needed by list views; full content is kept off the wire.
 */
export async function listPublishedProblems(): Promise<ProblemSummary[]> {
    const problems = await getAllProblems();

    return problems.map(
        ({
            datePublished,
            difficulty,
            excerpt,
            slug,
            source,
            spaceComplexity,
            timeComplexity,
            title,
        }) => ({
            datePublished,
            difficulty,
            excerpt,
            slug,
            source,
            spaceComplexity,
            timeComplexity,
            title,
        })
    );
}

export async function getPublishedProblemBySlug(
    slug: string
): Promise<ProblemPost> {
    return getProblemBySlug(slug);
}
