/**
 * Global type definitions for Bun test runner
 * Makes test, describe, expect, etc. available globally without imports
 */

import type { TestContext } from "bun:test";

declare global {
    /**
     * Define a test suite
     * @param name - Suite name
     * @param fn - Suite function
     */
    function describe(name: string, fn: () => void): void;

    /**
     * Define a test case
     * @param name - Test name
     * @param fn - Test function
     * @param timeout - Optional timeout in milliseconds
     */
    function test(
        name: string,
        fn: (context: TestContext) => void | Promise<void>,
        timeout?: number
    ): void;

    /**
     * Test namespace for modifiers
     */
    namespace test {
        /**
         * Skip a test case
         * @param name - Test name
         * @param fn - Test function
         */
        function skip(
            name: string,
            fn: (context: TestContext) => void | Promise<void>
        ): void;

        /**
         * Only run this test case
         * @param name - Test name
         * @param fn - Test function
         */
        function only(
            name: string,
            fn: (context: TestContext) => void | Promise<void>
        ): void;

        /**
         * Mark a test as TODO
         * @param name - Test name
         */
        function todo(name: string): void;
    }

    /**
     * Test conditional method (use bracket notation: test['if'](...))
     * Note: 'if' is a reserved keyword in TypeScript
     */
    interface TestWithIf {
        if(
            condition: boolean,
            name: string,
            fn: (context: TestContext) => void | Promise<void>
        ): void;
    }

    /**
     * Expect assertion library
     */
    const expect: typeof import("bun:test").expect;

    /**
     * Before all hook
     * @param fn - Function to run before all tests
     */
    function beforeAll(fn: () => void | Promise<void>): void;

    /**
     * After all hook
     * @param fn - Function to run after all tests
     */
    function afterAll(fn: () => void | Promise<void>): void;

    /**
     * Before each hook
     * @param fn - Function to run before each test
     */
    function beforeEach(fn: () => void | Promise<void>): void;

    /**
     * After each hook
     * @param fn - Function to run after each test
     */
    function afterEach(fn: () => void | Promise<void>): void;
}
