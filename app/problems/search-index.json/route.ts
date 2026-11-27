import { listProblemSearchIndex } from "@/lib/content/problems";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
    const index = await listProblemSearchIndex();

    return Response.json(index, {
        headers: {
            "Cache-Control":
                "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        },
    });
}
