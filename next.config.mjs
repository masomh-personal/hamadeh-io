import { execSync } from "node:child_process";

function runGitCommand(command) {
    try {
        return execSync(command).toString().trim();
    } catch {
        return "";
    }
}

function getGitInfo() {
    const branchFromEnv =
        process.env.NEXT_PUBLIC_GIT_BRANCH ?? process.env.GITHUB_REF_NAME;
    const shaFromEnv =
        process.env.NEXT_PUBLIC_GIT_SHA ?? process.env.GITHUB_SHA;

    const branch =
        branchFromEnv || runGitCommand("git rev-parse --abbrev-ref HEAD");
    const sha = shaFromEnv || runGitCommand("git rev-parse HEAD");

    return { branch: branch || "---", sha: sha || "" };
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
