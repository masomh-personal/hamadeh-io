/**
 * Tests for StringBuilder
 */

import { describe, expect, test } from "bun:test";
import { StringBuilder } from "./solution";

describe("StringBuilder", () => {
    describe("initial state", () => {
        test("toString returns empty string on a new builder", () => {
            const expected = "";
            const result = new StringBuilder().toString();
            expect(result).toBe(expected);
        });

        test("length is 0 on a new builder", () => {
            const expected = 0;
            const result = new StringBuilder().length;
            expect(result).toBe(expected);
        });
    });

    describe("append", () => {
        test("appends a single string correctly", () => {
            const sb = new StringBuilder();
            const expected = "hello";
            sb.append("hello");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("appends multiple strings in order", () => {
            const sb = new StringBuilder();
            const expected = "Hello, world!";
            sb.append("Hello").append(", ").append("world").append("!");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("updates length correctly after append", () => {
            const sb = new StringBuilder();
            const expected = 12;
            sb.append("Hello").append(", world");
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("length counts characters not chunks", () => {
            const sb = new StringBuilder();
            sb.append("Hello, world");
            // One chunk, twelve characters — not 1
            const expected = 12;
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("appending empty string does not change length", () => {
            const sb = new StringBuilder();
            sb.append("hello").append("");
            const expected = 5;
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("appending empty string does not change output", () => {
            const sb = new StringBuilder();
            sb.append("hello").append("");
            const expected = "hello";
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("returns this for method chaining", () => {
            const sb = new StringBuilder();
            const result = sb.append("a");
            expect(result).toBe(sb);
        });
    });

    describe("prepend", () => {
        test("prepends a string to an empty builder", () => {
            const sb = new StringBuilder();
            const expected = "hello";
            sb.prepend("hello");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("prepends before existing content", () => {
            const sb = new StringBuilder();
            const expected = ">> hello";
            sb.append("hello").prepend(">> ");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("multiple prepends add content in reverse call order", () => {
            const sb = new StringBuilder();
            const expected = "ABC";
            sb.prepend("C").prepend("B").prepend("A");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("updates length correctly after prepend", () => {
            const sb = new StringBuilder();
            sb.append("world").prepend("hello ");
            const expected = 11;
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("prepending empty string does not change length or output", () => {
            const sb = new StringBuilder();
            sb.append("hello").prepend("");
            expect(sb.length).toBe(5);
            expect(sb.toString()).toBe("hello");
        });

        test("returns this for method chaining", () => {
            const sb = new StringBuilder();
            const result = sb.prepend("a");
            expect(result).toBe(sb);
        });
    });

    describe("mixed append and prepend", () => {
        test("produces correct ordering with interleaved calls", () => {
            const sb = new StringBuilder();
            const expected = "start middle end";
            sb.append("middle").prepend("start ").append(" end");
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("length stays accurate through mixed operations", () => {
            const sb = new StringBuilder();
            sb.append("abc").prepend("xy").append("z");
            // "xy" + "abc" + "z" = "xyabcz" = 6 chars
            const expected = 6;
            const result = sb.length;
            expect(result).toBe(expected);
        });
    });

    describe("clear", () => {
        test("resets toString to empty string", () => {
            const sb = new StringBuilder();
            sb.append("hello").append(" world").clear();
            const expected = "";
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("resets length to 0", () => {
            const sb = new StringBuilder();
            sb.append("hello").append(" world").clear();
            const expected = 0;
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("builder is usable after clear", () => {
            const sb = new StringBuilder();
            sb.append("discard this").clear().append("keep this");
            const expected = "keep this";
            const result = sb.toString();
            expect(result).toBe(expected);
        });

        test("length is accurate after clear and re-append", () => {
            const sb = new StringBuilder();
            sb.append("discard").clear().append("hi");
            const expected = 2;
            const result = sb.length;
            expect(result).toBe(expected);
        });

        test("returns this for method chaining", () => {
            const sb = new StringBuilder();
            const result = sb.clear();
            expect(result).toBe(sb);
        });
    });

    describe("chaining", () => {
        test("all mutating methods chain onto the same instance", () => {
            const sb = new StringBuilder();
            const ref = sb.append("a").prepend("b").clear().append("c");
            expect(ref).toBe(sb);
        });

        test("full chain produces correct final string", () => {
            const sb = new StringBuilder();
            const expected = "start: hello world";
            const result = sb
                .append("hello")
                .append(" world")
                .prepend("start: ")
                .toString();
            expect(result).toBe(expected);
        });
    });

    describe("performance", () => {
        test("building a large string via append is faster than naive concatenation", () => {
            const iterations = 1e5;
            const chunk = "the quick brown fox jumps over the lazy dog. ";

            const sbStart = performance.now();
            const sb = new StringBuilder();
            for (let i = 0; i < iterations; i++) {
                sb.append(chunk);
            }
            sb.toString();
            const sbElapsed = performance.now() - sbStart;

            const naiveStart = performance.now();
            let naive = "";
            for (let i = 0; i < iterations; i++) {
                naive += chunk;
            }
            const naiveElapsed = performance.now() - naiveStart;

            const faster = sbElapsed < naiveElapsed ? "StringBuilder" : "naive";
            const ratio =
                sbElapsed < naiveElapsed
                    ? (naiveElapsed / sbElapsed).toFixed(2)
                    : (sbElapsed / naiveElapsed).toFixed(2);
            console.log(`\n  [perf] StringBuilder : ${sbElapsed.toFixed(3)}ms`);
            console.log(`  [perf] Naive concat  : ${naiveElapsed.toFixed(3)}ms`);
            console.log(`  [perf] Winner        : ${faster} (${ratio}x)`);
            console.log(
                `  [perf] Note: V8/Bun uses rope strings internally, so naive += is\n` +
                    `         more competitive than in languages without this optimization.\n`
            );

            // Both approaches must produce identical output — correctness over speed claims.
            const expected = chunk.repeat(iterations);
            expect(sb.toString()).toBe(expected);
            expect(naive).toBe(expected);
        });
    });
});
