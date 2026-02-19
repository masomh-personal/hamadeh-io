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

function defineTag(
    text: string,
    variant: BlogTagVariant,
    overrides?: Partial<Pick<BlogTagDefinition, "tone">>
): BlogTagDefinition {
    return {
        text,
        variant,
        tone: overrides?.tone ?? TAG_TONE,
    };
}

/**
 * Central tag style registry for blog UI.
 * If tags later come from a database, we can map DB values to this registry.
 */
export const BLOG_TAGS: Record<string, BlogTagDefinition> = {
    engineering: defineTag("engineering", "primary"),
    nextjs: defineTag("nextjs", "brand"),
    markdown: defineTag("markdown", "secondary"),
    shiki: defineTag("shiki", "tertiary"),
    typescript: defineTag("typescript", "primary"),
    backend: defineTag("backend", "secondary"),
    async: defineTag("async", "error"),
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
