/**
 * Mock modules for Next.js dependencies
 * This file is imported in test files that need Next.js mocks
 */

import { mock } from "bun:test";

// Mock next/navigation
mock.module("next/navigation", () => ({
    usePathname: () => "/",
}));

// Mock next-themes
export const mockSetTheme = mock(() => {});
mock.module("next-themes", () => ({
    useTheme: () => ({
        theme: "light",
        setTheme: mockSetTheme,
    }),
}));
