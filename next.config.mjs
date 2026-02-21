import { execSync } from "node:child_process";

function getGitInfo() {
    try {
        const branch = execSync("git rev-parse --abbrev-ref HEAD")
            .toString()
            .trim();
        const sha = execSync("git rev-parse HEAD").toString().trim();
        return { branch, sha };
    } catch {
        return { branch: "---", sha: "" };
    }
}

const { branch, sha } = getGitInfo();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_GIT_BRANCH: branch,
        NEXT_PUBLIC_GIT_SHA: sha,
        NEXT_PUBLIC_GIT_FULL_SHA: sha,
    },
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    // ESLint config removed - Next.js 16 no longer supports it
    // Using Biome for linting/formatting instead
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
