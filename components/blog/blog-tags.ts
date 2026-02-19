import type { BadgeProps } from "@/components/ui";

type BlogTagVariant = Extract<
    BadgeProps["variant"],
    "primary" | "secondary" | "tertiary" | "brand" | "error"
>;
type BlogTagTone = NonNullable<BadgeProps["tone"]>;

interface BlogTagDefinition {
    text: string;
    tone: BlogTagTone;
    variant: BlogTagVariant;
}

const TAG_TONE: BlogTagTone = "soft";

/**
 * Central tag style registry for blog UI.
 * If tags later come from a database, we can map DB values to this registry.
 */
export const BLOG_TAGS: Record<string, BlogTagDefinition> = {
    engineering: { text: "engineering", variant: "primary", tone: TAG_TONE },
    nextjs: { text: "nextjs", variant: "brand", tone: TAG_TONE },
    markdown: { text: "markdown", variant: "secondary", tone: TAG_TONE },
    shiki: { text: "shiki", variant: "tertiary", tone: TAG_TONE },
    typescript: { text: "typescript", variant: "primary", tone: TAG_TONE },
    backend: { text: "backend", variant: "secondary", tone: TAG_TONE },
    async: { text: "async", variant: "error", tone: TAG_TONE },
};

interface BlogTagPresentation {
    text: string;
    tone: BlogTagTone;
    variant: BlogTagVariant;
}

export function getBlogTagPresentation(tag: string): BlogTagPresentation {
    const normalizedTag = tag.trim().toLowerCase();
    const configuredTag = BLOG_TAGS[normalizedTag];

    if (configuredTag) {
        return {
            text: `#${configuredTag.text.toUpperCase()}`,
            variant: configuredTag.variant,
            tone: configuredTag.tone,
        };
    }

    return {
        text: `#${normalizedTag.toUpperCase()}`,
        variant: "brand",
        tone: TAG_TONE,
    };
}
