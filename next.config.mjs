import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    // ESLint config removed - Next.js 16 no longer supports it
    // Using Biome for linting/formatting instead
    turbopack: {
        root: process.cwd(),
    },
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

// Configure MDX with rehype plugins for syntax highlighting
const withMDX = createMDX({
    options: {
        rehypePlugins: [
            [
                rehypeHighlight,
                {
                    // Only load languages we actually use (tree-shaking)
                    languages: [
                        "typescript",
                        "javascript",
                        "python",
                        "bash",
                        "json",
                    ],
                },
            ],
        ],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
