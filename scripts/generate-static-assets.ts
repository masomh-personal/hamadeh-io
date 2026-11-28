#!/usr/bin/env bun

/**
 * Generates static machine-readable assets into `public/` and precompiled
 * content data (including Shiki-highlighted HTML) into `src/generated/` before
 * `vite build` / `vite dev`:
 * - public/blog/rss.xml
 * - public/blog/search-index.json
 * - public/problems/search-index.json
 * - public/sitemap.xml
 * - public/robots.txt
 * - public/opengraph-image.png
 * - public/blog/<slug>/opengraph-image.png
 * - public/problems/<slug>/opengraph-image.png
 * - src/generated/{home,blog-listing,problems-listing}.json
 * - src/generated/blog/<slug>.json
 * - src/generated/problems/<slug>.json
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
    getRelatedPosts,
    getSeriesNavigation,
    getTagCounts,
} from "@/lib/blog-listing";
import {
    getPublishedBlogPostBySlug,
    listBlogSearchIndex,
    listPublishedBlogPosts,
} from "@/lib/content/blog";
import {
    getPublishedProblemBySlug,
    listProblemSearchIndex,
    listPublishedProblems,
} from "@/lib/content/problems";
import { renderOgImagePng } from "@/lib/og";
import { getDifficultyCounts } from "@/lib/problem-listing";
import { splitProblemSections } from "@/lib/problem-markdown";
import { absoluteUrl, AUTHOR_EMAIL, AUTHOR_NAME, SITE_NAME } from "@/lib/site";
import { renderMarkdownToHtml } from "@/src/server/markdown";

const PUBLIC_DIR = join(process.cwd(), "public");
const GENERATED_DIR = join(process.cwd(), "src", "generated");

const XML_ILLEGAL_CONTROL_CHARS =
    // eslint-disable-next-line no-control-regex
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

function escapeXml(value: string): string {
    return value
        .replace(XML_ILLEGAL_CONTROL_CHARS, "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

async function writeFileEnsured(
    baseDir: string,
    relativePath: string,
    contents: string | Uint8Array
): Promise<void> {
    const fullPath = join(baseDir, relativePath);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, contents);
}

function buildRssXml(
    posts: Awaited<ReturnType<typeof listPublishedBlogPosts>>
): string {
    const items = posts
        .map((post) => {
            const url = escapeXml(absoluteUrl(`/blog/${post.slug}`));

            return `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.excerpt)}</description>
</item>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>Engineering notes on software development, system design, and practical coding.</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(`${AUTHOR_EMAIL} (${AUTHOR_NAME})`)}</managingEditor>
    <atom:link href="${escapeXml(absoluteUrl("/blog/rss.xml"))}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;
}

function buildSitemapXml(
    posts: Awaited<ReturnType<typeof listPublishedBlogPosts>>,
    problems: Awaited<ReturnType<typeof listPublishedProblems>>
): string {
    const entries: Array<{
        url: string;
        changefreq: string;
        priority: string;
    }> = [
        { url: absoluteUrl("/"), changefreq: "monthly", priority: "1.0" },
        { url: absoluteUrl("/about"), changefreq: "yearly", priority: "0.7" },
        { url: absoluteUrl("/blog"), changefreq: "weekly", priority: "0.9" },
        {
            url: absoluteUrl("/problems"),
            changefreq: "weekly",
            priority: "0.9",
        },
        ...posts.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            changefreq: "monthly",
            priority: "0.8",
        })),
        ...problems.map((problem) => ({
            url: absoluteUrl(`/problems/${problem.slug}`),
            changefreq: "monthly",
            priority: "0.7",
        })),
    ];

    const urlNodes = entries
        .map(
            (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
        )
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>
`;
}

function buildRobotsTxt(): string {
    return `User-Agent: *
Allow: /
Disallow: /components

Host: ${absoluteUrl("/")}
Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}

async function generateStaticAssets(): Promise<void> {
    const start = performance.now();
    await rm(GENERATED_DIR, { recursive: true, force: true });

    const [posts, problems, blogSearchIndex, problemSearchIndex] =
        await Promise.all([
            listPublishedBlogPosts(),
            listPublishedProblems(),
            listBlogSearchIndex(),
            listProblemSearchIndex(),
        ]);

    const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
    const showcasePosts =
        featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);
    const featuredProblems = problems
        .filter((problem) => problem.featured)
        .slice(0, 3);
    const showcaseProblems =
        featuredProblems.length > 0 ? featuredProblems : problems.slice(0, 3);

    await Promise.all([
        writeFileEnsured(PUBLIC_DIR, "blog/rss.xml", buildRssXml(posts)),
        writeFileEnsured(
            PUBLIC_DIR,
            "blog/search-index.json",
            JSON.stringify(blogSearchIndex)
        ),
        writeFileEnsured(
            PUBLIC_DIR,
            "problems/search-index.json",
            JSON.stringify(problemSearchIndex)
        ),
        writeFileEnsured(
            PUBLIC_DIR,
            "sitemap.xml",
            buildSitemapXml(posts, problems)
        ),
        writeFileEnsured(PUBLIC_DIR, "robots.txt", buildRobotsTxt()),
        writeFileEnsured(
            GENERATED_DIR,
            "home.json",
            JSON.stringify({
                showcasePosts,
                showcaseProblems,
                totalPosts: posts.length,
                totalProblems: problems.length,
            })
        ),
        writeFileEnsured(
            GENERATED_DIR,
            "blog-listing.json",
            JSON.stringify({
                posts,
                tagCounts: getTagCounts(posts),
            })
        ),
        writeFileEnsured(
            GENERATED_DIR,
            "problems-listing.json",
            JSON.stringify({
                problems,
                difficultyCounts: getDifficultyCounts(problems),
            })
        ),
    ]);

    // Precompile every blog post and problem Markdown body with Shiki so zero
    // Markdown/highlighter code ever enters the client or SSR bundle.
    await Promise.all([
        ...posts.map(async (summary) => {
            const fullPost = await getPublishedBlogPostBySlug(summary.slug);
            const html = await renderMarkdownToHtml(fullPost.content);
            const seriesNav = getSeriesNavigation(posts, summary);
            const relatedPosts = getRelatedPosts(posts, summary, 3);
            const wordCount = fullPost.content
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;

            await writeFileEnsured(
                GENERATED_DIR,
                `blog/${summary.slug}.json`,
                JSON.stringify({
                    post: summary,
                    html,
                    wordCount,
                    seriesNav,
                    relatedPosts,
                })
            );
        }),
        ...problems.map(async (summary) => {
            const fullProblem = await getPublishedProblemBySlug(summary.slug);
            const { problemContent, remainingContent } = splitProblemSections(
                fullProblem.content
            );
            const [problemHtml, remainingHtml] = await Promise.all([
                renderMarkdownToHtml(problemContent),
                renderMarkdownToHtml(remainingContent),
            ]);
            const wordCount = fullProblem.content
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;

            await writeFileEnsured(
                GENERATED_DIR,
                `problems/${summary.slug}.json`,
                JSON.stringify({
                    problem: summary,
                    problemHtml,
                    remainingHtml,
                    wordCount,
                })
            );
        }),
    ]);

    const ogJobs: Array<{
        path: string;
        eyebrow: string;
        title: string;
        meta?: Array<{ id: string; text: string }>;
    }> = [
        {
            path: "opengraph-image.png",
            eyebrow: AUTHOR_NAME,
            title: "Software engineering notes, system design, and tested code problems",
        },
        ...posts.map((post) => ({
            path: `blog/${post.slug}/opengraph-image.png`,
            eyebrow: "Blog",
            title: post.title,
            meta: (post.tags ?? []).map((tag) => ({ id: tag, text: tag })),
        })),
        ...problems.map((problem) => ({
            path: `problems/${problem.slug}/opengraph-image.png`,
            eyebrow: "Code Problem",
            title: problem.title,
            meta: [
                {
                    id: "difficulty",
                    text:
                        problem.difficulty.charAt(0).toUpperCase() +
                        problem.difficulty.slice(1),
                },
                { id: "time-complexity", text: problem.timeComplexity },
                { id: "space-complexity", text: problem.spaceComplexity },
            ],
        })),
    ];

    await Promise.all(
        ogJobs.map(async (job) => {
            const png = await renderOgImagePng({
                eyebrow: job.eyebrow,
                title: job.title,
                meta: job.meta,
            });
            await writeFileEnsured(PUBLIC_DIR, job.path, png);
        })
    );

    const elapsedMs = Math.round(performance.now() - start);
    console.log(
        `Generated static assets (${posts.length} blog + ${problems.length} problem Shiki HTML payloads, ${ogJobs.length} OG PNGs, RSS, sitemap, robots, 2 search indexes) in ${elapsedMs}ms`
    );
}

await generateStaticAssets();
