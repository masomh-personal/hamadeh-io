import { listPublishedBlogPosts } from "@/lib/content/blog";
import { absoluteUrl, AUTHOR_EMAIL, AUTHOR_NAME, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export async function GET(): Promise<Response> {
    const posts = await listPublishedBlogPosts();
    const items = posts
        .map((post) => {
            const url = absoluteUrl(`/blog/${post.slug}`);

            return `<item>
    <title>${escapeXml(post.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
</item>`;
        })
        .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Engineering notes on software development, system design, and practical coding.</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(`${AUTHOR_EMAIL} (${AUTHOR_NAME})`)}</managingEditor>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
