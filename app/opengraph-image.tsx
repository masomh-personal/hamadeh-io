import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { AUTHOR_NAME, DEFAULT_OG_IMAGE_ALT } from "@/lib/site";

export const alt = DEFAULT_OG_IMAGE_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage(): Response {
    return renderOgImage({
        eyebrow: AUTHOR_NAME,
        title: "Software engineering notes, system design, and tested code problems",
    });
}
