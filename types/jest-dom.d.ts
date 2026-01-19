/**
 * Extend Bun's expect matchers with jest-dom matchers
 */

import "bun:test";

declare module "bun:test" {
    interface Matchers<_T> {
        toBeInTheDocument(): void;
        toBeVisible(): void;
        toBeEmptyDOMElement(): void;
        toBeEnabled(): void;
        toBeDisabled(): void;
        toBeRequired(): void;
        toBeInvalid(): void;
        toBeValid(): void;
        toHaveAttribute(attr: string, value?: string): void;
        toHaveClass(...classNames: string[]): void;
        toHaveFocus(): void;
        toHaveFormValues(values: Record<string, unknown>): void;
        toHaveStyle(css: string | Record<string, unknown>): void;
        toHaveTextContent(
            text: string | RegExp,
            options?: { normalizeWhitespace: boolean }
        ): void;
        toHaveValue(value: string | string[] | number | null): void;
        toHaveDisplayValue(
            value: string | RegExp | Array<string | RegExp>
        ): void;
        toBeChecked(): void;
        toBePartiallyChecked(): void;
        toHaveAccessibleDescription(description?: string | RegExp): void;
        toHaveAccessibleErrorMessage(message?: string | RegExp): void;
        toHaveAccessibleName(name?: string | RegExp): void;
        toHaveRole(role: string): void;
        toContainElement(element: HTMLElement | null): void;
        toContainHTML(html: string): void;
    }
}
