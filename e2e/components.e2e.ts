import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Components showcase", () => {
    test("switches tabs via click and keyboard navigation", async ({
        page,
    }) => {
        await page.goto("/components");
        await assertNoHorizontalOverflow(page);

        const buttonTab = page.getByRole("tab", { name: /Button/i });
        const linkTab = page.getByRole("tab", { name: /Link/i });
        const searchTab = page.getByRole("tab", { name: /Search/i });

        await expect(buttonTab).toHaveAttribute("aria-selected", "true");

        // Keyboard arrow navigation between Radix tabs
        await buttonTab.focus();
        await page.keyboard.press("ArrowRight");
        await expect(linkTab).toBeFocused();
        await expect(linkTab).toHaveAttribute("aria-selected", "true");

        // Click tab directly
        await searchTab.click();
        await expect(searchTab).toHaveAttribute("aria-selected", "true");
        await expect(
            page.getByRole("heading", { level: 2, name: "Search Input" })
        ).toBeVisible();
    });

    test("exercises SearchInput interactive, searching, and disabled states", async ({
        page,
    }) => {
        await page.goto("/components");

        await page.getByRole("tab", { name: /Search/i }).click();

        const interactiveInput = page.getByRole("searchbox", {
            name: "Interactive search demo",
        });
        await interactiveInput.fill("solid principles");
        await interactiveInput.press("Enter");
        await expect(page.getByText("Submitted:")).toBeVisible();
        await expect(page.getByText("solid principles")).toBeVisible();

        // Escape clears input and submitted indicator
        await interactiveInput.press("Escape");
        await expect(interactiveInput).toHaveValue("");
        await expect(page.getByText("Submitted:")).toBeHidden();

        // Searching equalizer & terminal demos expose status indicators
        const searchingStatuses = page.getByRole("status", {
            name: "Searching",
        });
        expect(await searchingStatuses.count()).toBe(2);

        // Disabled input is non-editable
        const disabledInput = page.getByRole("searchbox", {
            name: "Disabled search demo",
        });
        await expect(disabledInput).toBeDisabled();
    });

    test("renders visible focus indicators during keyboard Tab navigation", async ({
        page,
        isMobile,
    }) => {
        test.skip(isMobile, "Keyboard focus ring check targets desktop");

        await page.goto("/components");

        const firstTab = page.getByRole("tab", { name: /Button/i });
        await page.keyboard.press("Tab");
        // Tab until we reach a focusable control inside main or focus the tab directly via keyboard
        await firstTab.focus();
        await page.keyboard.press("ArrowRight");

        const focusedStyle = await page.evaluate(() => {
            const active = document.activeElement;
            if (!active) {
                return null;
            }
            const style = window.getComputedStyle(active);
            return {
                matchesFocusVisible: active.matches(":focus-visible"),
                boxShadow: style.boxShadow,
                outlineStyle: style.outlineStyle,
            };
        });

        expect(focusedStyle).not.toBeNull();
        expect(focusedStyle?.matchesFocusVisible).toBe(true);
        const hasVisibleRing =
            focusedStyle?.boxShadow !== "none" ||
            focusedStyle?.outlineStyle !== "none";
        expect(hasVisibleRing).toBe(true);
    });

    test("renders every showcase tab without errors or horizontal overflow", async ({
        page,
    }) => {
        await page.goto("/components");

        const tabs = page.getByRole("tab");
        await expect(tabs.first()).toBeVisible();
        const count = await tabs.count();
        expect(count).toBeGreaterThanOrEqual(9);

        for (let i = 0; i < count; i++) {
            const tab = tabs.nth(i);
            await tab.click();
            await expect(tab).toHaveAttribute("aria-selected", "true");
            await expect(page.getByRole("tabpanel")).toBeVisible();
            await assertNoHorizontalOverflow(page);
        }
    });
});
