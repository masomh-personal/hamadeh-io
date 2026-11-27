import { listBlogSearchIndex } from "@/lib/content/blog";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
    const index = await listBlogSearchIndex();

    return Response.json(index, {
        headers: {
            "Cache-Control":
                "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        },
    });
}
