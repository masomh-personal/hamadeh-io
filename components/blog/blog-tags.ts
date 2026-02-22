import type { BadgeProps } from "@/components/ui";

type BlogTagVariant = Extract<
    BadgeProps["variant"],
    "tag-primary" | "tag-secondary" | "tag-tertiary" | "tag-brand" | "tag-error"
>;
type BlogTagTone = NonNullable<BadgeProps["tone"]>;

interface BlogTagDefinition {
    text: string;
    tone: BlogTagTone;
    variant: BlogTagVariant;
}

const TAG_TONE: BlogTagTone = "soft";
const TAG_VARIANT: BlogTagVariant = "tag-brand";

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
const BLOG_TAGS: Record<string, BlogTagDefinition> = {
    engineering: defineTag("engineering", "tag-primary"),
    nextjs: defineTag("nextjs", "tag-brand"),
    markdown: defineTag("markdown", "tag-secondary"),
    shiki: defineTag("shiki", "tag-tertiary"),
    typescript: defineTag("typescript", "tag-primary"),
    backend: defineTag("backend", "tag-secondary"),
    async: defineTag("async", "tag-error"),
    ai: defineTag("ai", "tag-brand"),
    methodology: defineTag("methodology", "tag-tertiary"),
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
            text: configuredTag.text.toUpperCase(),
            variant: configuredTag.variant,
            tone: configuredTag.tone,
        };
    }

    return {
        text: normalizedTag.toUpperCase(),
        variant: TAG_VARIANT,
        tone: TAG_TONE,
    };
}
