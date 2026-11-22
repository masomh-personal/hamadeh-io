import { execFileSync } from "node:child_process";

function runGitCommand(args) {
    try {
        return execFileSync("git", args).toString().trim();
    } catch {
        return "";
    }
}

function getGitInfo() {
    const branchFromEnv =
        process.env.NEXT_PUBLIC_GIT_BRANCH ??
        process.env.VERCEL_GIT_COMMIT_REF ??
        process.env.GITHUB_REF_NAME;
    const shaFromEnv =
        process.env.NEXT_PUBLIC_GIT_SHA ??
        process.env.VERCEL_GIT_COMMIT_SHA ??
        process.env.GITHUB_SHA;

    const branch =
        branchFromEnv || runGitCommand(["rev-parse", "--abbrev-ref", "HEAD"]);
    const sha = shaFromEnv || runGitCommand(["rev-parse", "HEAD"]);

    return { branch: branch || "---", sha: sha || "" };
}

const { branch, sha } = getGitInfo();

const isDev = process.env.NODE_ENV === "development";

// Nonces would force every page to render dynamically, and hash-based CSP via
// experimental.sri is webpack-only, so a static site on Turbopack has to allow
// inline scripts for the RSC payload Next.js inlines into each page.
const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(!isDev ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    ...(!isDev
        ? [
              {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
              },
          ]
        : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    env: {
        NEXT_PUBLIC_GIT_BRANCH: branch,
        NEXT_PUBLIC_GIT_SHA: sha,
    },
    // Agent guidance lives in .cursor/rules and docs/agent-setup.md, so keep
    // `next dev` from generating a second, overlapping AGENTS.md and CLAUDE.md.
    agentRules: false,
    reactStrictMode: true,
    typedRoutes: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    // Next.js 16 no longer supports built-in ESLint config.
    // Oxfmt and Oxlint handle formatting and linting through package scripts.
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
