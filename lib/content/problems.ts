import { stripMarkdownForSearch } from "@/lib/blog-search";
import {
    getAllProblems,
    getProblemBySlug,
    isContentNotFoundError,
    type ProblemPost,
} from "@/lib/mdx";

export type PublishedProblemPost = Omit<ProblemPost, "filePath">;
export type ProblemSummary = Omit<PublishedProblemPost, "content">;

export { isContentNotFoundError };

/**
 * Content-access boundary for code problem data.
 * Keeps page and UI components decoupled from filesystem details like filePath.
 */
export async function listPublishedProblems(): Promise<ProblemSummary[]> {
    const problems = await getAllProblems();

    return problems.map(
        ({
            difficulty,
            excerpt,
            featured,
            readingTimeMinutes,
            slug,
            source,
            spaceComplexity,
            timeComplexity,
            title,
        }) => ({
            difficulty,
            excerpt,
            featured,
            readingTimeMinutes,
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
): Promise<PublishedProblemPost> {
    const { filePath: _filePath, ...problem } = await getProblemBySlug(slug);
    return problem;
}

/**
 * Builds a slug-to-plain-text map for static client-side problem body search.
 */
export async function listProblemSearchIndex(): Promise<
    Record<string, string>
> {
    const problems = await getAllProblems();
    const index: Record<string, string> = {};

    for (const problem of problems) {
        index[problem.slug] = stripMarkdownForSearch(problem.content);
    }

    return index;
}
