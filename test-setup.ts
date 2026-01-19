/**
 * Test setup for Bun + React Testing Library + happy-dom
 * This file is preloaded before all tests via bunfig.toml
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register happy-dom globally to provide DOM APIs (window, document, etc.)
GlobalRegistrator.register();

// Import jest-dom matchers for better assertions (.toBeInTheDocument(), etc.)
import "@testing-library/jest-dom";

// Mock window.matchMedia for components that use media queries
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
