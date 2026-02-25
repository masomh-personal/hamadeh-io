import type { ProblemPost } from "@/lib/mdx";
import { getAllProblems, getProblemBySlug } from "@/lib/mdx";

/**
 * Content-access boundary for code problem data.
 */
export async function listPublishedProblems(): Promise<ProblemPost[]> {
    return getAllProblems();
}

export async function getPublishedProblemBySlug(
    slug: string
): Promise<ProblemPost> {
    return getProblemBySlug(slug);
}
