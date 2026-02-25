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
    bgColor: "#1E293B",
};

/**
 * Central tag color map for blog UI.
 * Add new tags here as content grows.
 */
const BLOG_TAG_COLOR_MAP: Record<string, BlogTagColorDefinition> = {
    engineering: { color: "#FACC15", bgColor: "#3A320C" },
    nextjs: { color: "#60A5FA", bgColor: "#112640" },
    markdown: { color: "#F472B6", bgColor: "#3D1A31" },
    shiki: { color: "#A78BFA", bgColor: "#2B2145" },
    typescript: { color: "#38BDF8", bgColor: "#0F2A36" },
    backend: { color: "#34D399", bgColor: "#10372A" },
    async: { color: "#FB7185", bgColor: "#401A24" },
    ai: { color: "#22D3EE", bgColor: "#0E2F35" },
    react: { color: "#67E8F9", bgColor: "#133741" },
    dsa: { color: "#93C5FD", bgColor: "#192F46" },
    methodology: { color: "#C4B5FD", bgColor: "#2A2443" },
    fundamentals: { color: "#6EE7B7", bgColor: "#15382C" },
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
