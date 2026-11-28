import {
    test as base,
    type ConsoleMessage,
    expect,
    type Page,
} from "@playwright/test";

const HYDRATION_ERROR_PATTERN =
    /hydration failed|did not match|there was an error while hydrating|hydration mismatch/i;

export const test = base.extend<{ runtimeErrorGuard: undefined }>({
    runtimeErrorGuard: [
        async ({ page }, use) => {
            const errors: string[] = [];

            const handlePageError = (error: Error): void => {
                errors.push(`Uncaught pageerror: ${error.message}`);
            };

            const handleConsole = (message: ConsoleMessage): void => {
                const text = message.text();
                if (message.type() === "error") {
                    errors.push(`Console error: ${text}`);
                } else if (HYDRATION_ERROR_PATTERN.test(text)) {
                    errors.push(`Hydration warning: ${text}`);
                }
            };

            page.on("pageerror", handlePageError);
            page.on("console", handleConsole);

            await use(undefined);

            page.off("pageerror", handlePageError);
            page.off("console", handleConsole);

            expect(
                errors,
                `Unexpected runtime errors:\n${errors.join("\n")}`
            ).toEqual([]);
        },
        { auto: true },
    ],
});

export { expect };

/**
 * Verifies the document does not introduce unintended horizontal scrollbars
 * at the active viewport width.
 */
export async function assertNoHorizontalOverflow(page: Page): Promise<void> {
    const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
    }));

    expect(
        metrics.scrollWidth,
        `Horizontal overflow detected: scrollWidth (${metrics.scrollWidth}) > clientWidth (${metrics.clientWidth})`
    ).toBeLessThanOrEqual(metrics.clientWidth);
}
