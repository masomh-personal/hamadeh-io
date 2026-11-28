#!/usr/bin/env bun

/**
 * Local static server for `dist/client/` that mirrors Vercel's static hosting
 * behavior: clean URLs, custom 404.html with HTTP 404 status, and response
 * headers from `vercel.json`. Used by `bun run start` and Playwright E2E.
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const DIST_DIR = join(process.cwd(), "dist", "client");
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "127.0.0.1";

interface VercelHeaderRule {
    source: string;
    headers: Array<{ key: string; value: string }>;
}

interface VercelConfig {
    headers?: VercelHeaderRule[];
}

const vercelConfig = JSON.parse(
    readFileSync(join(process.cwd(), "vercel.json"), "utf-8")
) as VercelConfig;

const compiledHeaderRules = (vercelConfig.headers ?? []).map((rule) => ({
    regex: new RegExp(`^${rule.source}$`),
    headers: rule.headers,
}));

const MIME_TYPES: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ico": "image/x-icon",
};

function resolveFilePath(pathname: string): string | null {
    const safePath = normalize(decodeURIComponent(pathname)).replace(
        /^(\.\.(\/|\\|$))+/,
        ""
    );
    const trimmed = safePath.replace(/^\/+/, "").replace(/\/+$/, "");

    const candidates =
        trimmed === ""
            ? [join(DIST_DIR, "index.html")]
            : [
                  join(DIST_DIR, trimmed),
                  join(DIST_DIR, `${trimmed}.html`),
                  join(DIST_DIR, trimmed, "index.html"),
              ];

    for (const candidate of candidates) {
        if (
            candidate.startsWith(DIST_DIR) &&
            existsSync(candidate) &&
            statSync(candidate).isFile()
        ) {
            return candidate;
        }
    }

    return null;
}

function applyHeaders(pathname: string, filePath: string): Headers {
    const headers = new Headers();
    const ext = extname(filePath).toLowerCase();
    headers.set("Content-Type", MIME_TYPES[ext] ?? "application/octet-stream");

    for (const rule of compiledHeaderRules) {
        if (rule.regex.test(pathname)) {
            for (const header of rule.headers) {
                headers.set(header.key, header.value);
            }
        }
    }

    return headers;
}

const COMPRESSIBLE_EXTENSIONS = new Set([
    ".html",
    ".js",
    ".mjs",
    ".css",
    ".json",
    ".xml",
    ".txt",
    ".svg",
]);

async function serveFile(
    request: Request,
    pathname: string,
    filePath: string,
    status: number
): Promise<Response> {
    const headers = applyHeaders(pathname, filePath);
    const ext = extname(filePath).toLowerCase();
    const acceptsGzip =
        request.headers.get("accept-encoding")?.includes("gzip") ?? false;

    if (acceptsGzip && COMPRESSIBLE_EXTENSIONS.has(ext)) {
        const raw = await Bun.file(filePath).bytes();
        const compressed = Bun.gzipSync(raw);
        headers.set("Content-Encoding", "gzip");
        headers.set("Vary", "Accept-Encoding");
        return new Response(compressed, { status, headers });
    }

    return new Response(Bun.file(filePath), { status, headers });
}

const server = Bun.serve({
    hostname: HOST,
    port: PORT,
    async fetch(request) {
        const url = new URL(request.url);
        const filePath = resolveFilePath(url.pathname);

        if (filePath) {
            return serveFile(request, url.pathname, filePath, 200);
        }

        const notFoundPath = join(DIST_DIR, "404.html");
        if (existsSync(notFoundPath)) {
            return serveFile(request, url.pathname, notFoundPath, 404);
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Serving dist/client at http://${server.hostname}:${server.port}`);
