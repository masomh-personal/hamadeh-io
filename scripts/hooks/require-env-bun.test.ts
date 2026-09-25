import { describe, expect, test } from "bun:test";
import { needsEnvPrefix } from "./require-env-bun";

describe("needsEnvPrefix", () => {
    describe("Basics", () => {
        test("flags a bare bun command", () => {
            const expected = true;
            const result = needsEnvPrefix("bun run healthcheck");

            expect(result).toBe(expected);
        });

        test("flags a bare bunx command", () => {
            const expected = true;
            const result = needsEnvPrefix("bunx knip");

            expect(result).toBe(expected);
        });

        test("allows bun invoked through env", () => {
            const expected = false;
            const result = needsEnvPrefix("env bun run healthcheck");

            expect(result).toBe(expected);
        });

        test("allows commands that do not run bun", () => {
            const expected = false;
            const result = needsEnvPrefix("git status --short");

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("flags bare bun after a chained command", () => {
            const expected = true;
            const result = needsEnvPrefix("cd app && bun test");

            expect(result).toBe(expected);
        });

        test("flags bare bun after a pipe, semicolon, or subshell", () => {
            const commands = [
                "echo ok | bun x.ts",
                "true; bun test",
                "(cd lib && bun test)",
                "echo $(bun --version)",
            ];
            const expected = [true, true, true, true];
            const result = commands.map(needsEnvPrefix);

            expect(result).toEqual(expected);
        });

        test("flags bare bun behind environment assignments", () => {
            const expected = true;
            const result = needsEnvPrefix("HUSKY=0 bun install");

            expect(result).toBe(expected);
        });

        test("flags a bun binary called by path", () => {
            const expected = true;
            const result = needsEnvPrefix("/usr/local/bin/bun --version");

            expect(result).toBe(expected);
        });

        test("allows env with assignments before bun", () => {
            const expected = false;
            const result = needsEnvPrefix("env HUSKY=0 bun install");

            expect(result).toBe(expected);
        });

        test("ignores bun inside quoted arguments", () => {
            const expected = false;
            const result = needsEnvPrefix(
                'git commit -m "chore: run bun; then bun test"'
            );

            expect(result).toBe(expected);
        });

        test("ignores words that merely start with bun", () => {
            const expected = false;
            const result = needsEnvPrefix("cat bun.lock && bunyan --help");

            expect(result).toBe(expected);
        });

        test("allows every segment when each uses env", () => {
            const expected = false;
            const result = needsEnvPrefix(
                "env bun audit && env bun run healthcheck && env bun run build"
            );

            expect(result).toBe(expected);
        });

        test("treats an empty command as allowed", () => {
            const expected = false;
            const result = needsEnvPrefix("");

            expect(result).toBe(expected);
        });
    });
});
