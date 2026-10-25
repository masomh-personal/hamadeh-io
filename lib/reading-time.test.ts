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

    test("adds prose and code time together", () => {
        const code = `\`\`\`ts\n${Array(20).fill("x").join("\n")}\n\`\`\``;

        expect(getReadingTimeMinutes(`${words(200)}\n\n${code}`)).toBe(2);
    });
});

describe("formatReadingTime", () => {
    test("formats minutes for display", () => {
        expect(formatReadingTime(5)).toBe("5 min read");
    });
});
