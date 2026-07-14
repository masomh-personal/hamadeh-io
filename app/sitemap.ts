import type { MetadataRoute } from "next";
import { listPublishedBlogPosts } from "@/lib/content/blog";
import { listPublishedProblems } from "@/lib/content/problems";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, problems] = await Promise.all([
        listPublishedBlogPosts(),
        listPublishedProblems(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl("/"),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: absoluteUrl("/about"),
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: absoluteUrl("/blog"),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: absoluteUrl("/problems"),
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ];
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: new Date(post.updatedAt ?? post.datePublished),
        changeFrequency: "monthly",
        priority: 0.8,
    }));
    const problemRoutes: MetadataRoute.Sitemap = problems.map((problem) => ({
        url: absoluteUrl(`/problems/${problem.slug}`),
        lastModified: new Date(problem.datePublished),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes, ...problemRoutes];
}
