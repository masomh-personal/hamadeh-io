/**
 * Static content loaders backed by build-time generated JSON payloads in
 * `src/generated/`. Works identically during SSR prerendering and client-side
 * SPA navigation on static hosting (no runtime server RPC calls needed).
 */

import type { SeriesNavigation, TagCount } from "@/lib/blog-listing";
import type { BlogPostSummary } from "@/lib/content/blog";
import type { ProblemSummary } from "@/lib/content/problems";
import type { DifficultyCount } from "@/lib/problem-listing";
import blogListingJson from "../generated/blog-listing.json";
import homeJson from "../generated/home.json";
import problemsListingJson from "../generated/problems-listing.json";

export interface HomePageData {
    showcasePosts: BlogPostSummary[];
    showcaseProblems: ProblemSummary[];
    totalPosts: number;
    totalProblems: number;
}

export interface BlogListingData {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
}

export interface BlogDetailData {
    post: BlogPostSummary;
    html: string;
    wordCount: number;
    seriesNav: SeriesNavigation<BlogPostSummary> | null;
    relatedPosts: BlogPostSummary[];
}

export interface ProblemListingData {
    problems: ProblemSummary[];
    difficultyCounts: DifficultyCount[];
}

export interface ProblemDetailData {
    problem: ProblemSummary;
    problemHtml: string;
    remainingHtml: string;
    wordCount: number;
}

const blogDetailModules = import.meta.glob<{ default: BlogDetailData }>(
    "../generated/blog/*.json"
);

const problemDetailModules = import.meta.glob<{ default: ProblemDetailData }>(
    "../generated/problems/*.json"
);

export function loadHomePageData(): HomePageData {
    return homeJson as HomePageData;
}

export function loadBlogListingData(): BlogListingData {
    return blogListingJson as BlogListingData;
}

export function loadProblemListingData(): ProblemListingData {
    return problemsListingJson as ProblemListingData;
}

export function hasBlogSlug(slug: string): boolean {
    return Object.hasOwn(blogDetailModules, `../generated/blog/${slug}.json`);
}

export function hasProblemSlug(slug: string): boolean {
    return Object.hasOwn(
        problemDetailModules,
        `../generated/problems/${slug}.json`
    );
}

export async function loadBlogDetailData(
    slug: string
): Promise<BlogDetailData | null> {
    const loader = blogDetailModules[`../generated/blog/${slug}.json`];
    if (!loader) {
        return null;
    }

    const mod = await loader();
    return mod.default;
}

export async function loadProblemDetailData(
    slug: string
): Promise<ProblemDetailData | null> {
    const loader = problemDetailModules[`../generated/problems/${slug}.json`];
    if (!loader) {
        return null;
    }

    const mod = await loader();
    return mod.default;
}
