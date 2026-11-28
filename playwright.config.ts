import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
    testDir: "./e2e",
    testMatch: "**/*.e2e.ts",
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? 2 : undefined,
    reporter: isCI
        ? [["github"], ["list"], ["html", { open: "never" }]]
        : [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    projects: [
        {
            name: "desktop-chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1280, height: 800 },
            },
        },
        {
            name: "mobile-chromium",
            use: {
                ...devices["Pixel 5"],
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true,
            },
        },
    ],
    webServer: {
        command: `PORT=${PORT} HOST=127.0.0.1 bun scripts/serve-static.ts`,
        url: BASE_URL,
        reuseExistingServer: !isCI,
        timeout: 60_000,
    },
});
