import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function listContentSlugs(subdir: "blog" | "problems"): string[] {
    const dir = join(process.cwd(), "content", subdir);
    try {
        return readdirSync(dir)
            .filter((file) => file.endsWith(".md"))
            .map((file) => file.slice(0, -3));
    } catch {
        return [];
    }
}

function runGitCommand(args: string[]): string {
    try {
        return execFileSync("git", args).toString().trim();
    } catch {
        return "";
    }
}

function getGitInfo(): { branch: string; sha: string } {
    const branchFromEnv =
        process.env.VITE_GIT_BRANCH ??
        process.env.VERCEL_GIT_COMMIT_REF ??
        process.env.GITHUB_REF_NAME;
    const shaFromEnv =
        process.env.VITE_GIT_SHA ??
        process.env.VERCEL_GIT_COMMIT_SHA ??
        process.env.GITHUB_SHA;

    const branch =
        branchFromEnv || runGitCommand(["rev-parse", "--abbrev-ref", "HEAD"]);
    const sha = shaFromEnv || runGitCommand(["rev-parse", "HEAD"]);

    return { branch: branch || "---", sha: sha || "" };
}

const { branch, sha } = getGitInfo();

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    define: {
        "import.meta.env.VITE_GIT_BRANCH": JSON.stringify(branch),
        "import.meta.env.VITE_GIT_SHA": JSON.stringify(sha),
    },
    plugins: [
        tailwindcss(),
        tanstackStart({
            prerender: {
                enabled: true,
                autoStaticPathsDiscovery: true,
                autoSubfolderIndex: false,
                crawlLinks: false,
                failOnError: true,
            },
            pages: [
                { path: "/" },
                { path: "/about" },
                { path: "/blog" },
                { path: "/problems" },
                { path: "/components" },
                { path: "/404" },
                ...listContentSlugs("blog").map((slug) => ({
                    path: `/blog/${slug}`,
                })),
                ...listContentSlugs("problems").map((slug) => ({
                    path: `/problems/${slug}`,
                })),
            ],
        }),
        // React's Vite plugin must come after TanStack Start's plugin.
        viteReact(),
    ],
});
