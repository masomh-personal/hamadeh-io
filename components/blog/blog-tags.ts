interface BlogTagPresentation {
    text: string;
    color: string;
    bgColor: string;
}

interface BlogTagColorDefinition {
    color: string;
    bgColor: string;
}

const DEFAULT_TAG_COLOR: BlogTagColorDefinition = {
    color: "#94A3B8",
    bgColor: "#94A3B814",
};

/**
 * Central tag color map for blog UI.
 * Add new tags here as content grows.
 */
const BLOG_TAG_COLOR_MAP: Record<string, BlogTagColorDefinition> = {
    engineering: { color: "#FACC15", bgColor: "#FACC1514" },
    nextjs: { color: "#60A5FA", bgColor: "#60A5FA14" },
    markdown: { color: "#F472B6", bgColor: "#F472B614" },
    shiki: { color: "#A78BFA", bgColor: "#A78BFA14" },
    typescript: { color: "#38BDF8", bgColor: "#38BDF814" },
    backend: { color: "#34D399", bgColor: "#34D39914" },
    async: { color: "#FB7185", bgColor: "#FB718514" },
    ai: { color: "#22D3EE", bgColor: "#22D3EE14" },
    react: { color: "#67E8F9", bgColor: "#67E8F914" },
    dsa: { color: "#93C5FD", bgColor: "#93C5FD14" },
    methodology: { color: "#C4B5FD", bgColor: "#C4B5FD14" },
    fundamentals: { color: "#6EE7B7", bgColor: "#6EE7B714" },
};

export function getBlogTagPresentation(tag: string): BlogTagPresentation {
    const normalizedTag = tag.trim().toLowerCase();
    const { color, bgColor } =
        BLOG_TAG_COLOR_MAP[normalizedTag] ?? DEFAULT_TAG_COLOR;

    return {
        text: normalizedTag.toUpperCase(),
        color,
        bgColor,
    };
}
