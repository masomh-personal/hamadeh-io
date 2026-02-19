import type { BadgeProps } from "@/components/ui";

type BlogTagVariant = Extract<
    BadgeProps["variant"],
    "primary" | "secondary" | "tertiary" | "brand" | "error"
>;

interface BlogTagDefinition {
    text: string;
    variant: BlogTagVariant;
}

/**
 * Central tag style registry for blog UI.
 * If tags later come from a database, we can map DB values to this registry.
 */
export const BLOG_TAGS: Record<string, BlogTagDefinition> = {
    engineering: { text: "engineering", variant: "primary" },
    nextjs: { text: "nextjs", variant: "brand" },
    markdown: { text: "markdown", variant: "secondary" },
    shiki: { text: "shiki", variant: "tertiary" },
    typescript: { text: "typescript", variant: "primary" },
    backend: { text: "backend", variant: "secondary" },
    async: { text: "async", variant: "error" },
};

interface BlogTagPresentation {
    text: string;
    variant: BlogTagVariant;
}

export function getBlogTagPresentation(tag: string): BlogTagPresentation {
    const normalizedTag = tag.trim().toLowerCase();
    const configuredTag = BLOG_TAGS[normalizedTag];

    if (configuredTag) {
        return {
            text: `#${configuredTag.text.toUpperCase()}`,
            variant: configuredTag.variant,
        };
    }

    return {
        text: `#${normalizedTag.toUpperCase()}`,
        variant: "brand",
    };
}
