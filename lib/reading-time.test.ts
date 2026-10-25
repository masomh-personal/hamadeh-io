import { describe, expect, test } from "bun:test";
import { formatReadingTime, getReadingTimeMinutes } from "./reading-time";

const words = (count: number): string => Array(count).fill("word").join(" ");

describe("getReadingTimeMinutes", () => {
    test("returns at least one minute for empty content", () => {
        expect(getReadingTimeMinutes("")).toBe(1);
    });

    test("scales prose at 200 words per minute, rounding up", () => {
        expect(getReadingTimeMinutes(words(200))).toBe(1);
        expect(getReadingTimeMinutes(words(201))).toBe(2);
        expect(getReadingTimeMinutes(words(1000))).toBe(5);
    });

    test("weights fenced code by line count, not words", () => {
        const code = `\`\`\`ts\n${Array(40).fill("const a = 1;").join("\n")}\n\`\`\``;

        expect(getReadingTimeMinutes(code)).toBe(2);
    });

    test("counts a fence indented inside a list item as code", () => {
        const lines = Array(30).fill("    const a = 1;").join("\n");
        const markdown = `- step\n\n    \`\`\`ts\n${lines}\n    \`\`\``;

        const expected = 2;
        const result = getReadingTimeMinutes(markdown);

        expect(result).toBe(expected);
    });

    test("treats everything after an unclosed fence as code", () => {
        const lines = Array(40).fill("const a = 1;").join("\n");
        const markdown = `\`\`\`ts\n${lines}`;

        const expected = 2;
        const result = getReadingTimeMinutes(markdown);

        expect(result).toBe(expected);
    });

    test("does not close a backtick fence with a tilde fence", () => {
        const lines = Array(40).fill("const a = 1;").join("\n");
        const markdown = `\`\`\`ts\n${lines}\n~~~\n${lines}\n\`\`\``;

        const expected = 5;
        const result = getReadingTimeMinutes(markdown);

        expect(result).toBe(expected);
    });

    test("adds prose and code time together", () => {
        const code = `\`\`\`ts\n${Array(20).fill("x").join("\n")}\n\`\`\``;

        expect(getReadingTimeMinutes(`${words(200)}\n\n${code}`)).toBe(2);
    });
});

describe("Stress Tests", () => {
    test("handles a million words and 100k code lines in linear time", () => {
        const prose = Array(10_000).fill(words(100)).join("\n");
        const code = `\`\`\`ts\n${Array(100_000).fill("const a = 1;").join("\n")}\n\`\`\``;
        const markdown = `${prose}\n\n${code}`;

        // 1,000,000 words / 200 + 100,000 lines / 20 = 5,000 + 5,000 minutes.
        const expected = 10_000;
        const start = performance.now();
        const result = getReadingTimeMinutes(markdown);
        const elapsedMs = performance.now() - start;

        expect(result).toBe(expected);
        // Loose ceiling: guards against accidental quadratic behavior, not speed.
        expect(elapsedMs).toBeLessThan(1000);
    });
});

describe("formatReadingTime", () => {
    test("formats minutes for display", () => {
        expect(formatReadingTime(5)).toBe("5 min read");
    });
});
