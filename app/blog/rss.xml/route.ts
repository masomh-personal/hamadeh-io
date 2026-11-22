import { listPublishedBlogPosts } from "@/lib/content/blog";
import { absoluteUrl, AUTHOR_EMAIL, AUTHOR_NAME, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

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

export async function GET(): Promise<Response> {
    const posts = await listPublishedBlogPosts();
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
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
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
</rss>`;

    return new Response(xml, {
        headers: {
            "Cache-Control":
                "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
