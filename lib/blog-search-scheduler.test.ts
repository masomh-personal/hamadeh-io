import { describe, expect, test } from "bun:test";
import {
    createBlogSearchScheduler,
    SEARCH_DEBOUNCE_MS,
    SEARCH_DELAY_MS,
    type SearchTimerAdapter,
} from "./blog-search-scheduler";

interface FakeClock {
    timers: SearchTimerAdapter;
    advanceBy: (ms: number) => void;
    pendingCount: () => number;
}

function createFakeClock(): FakeClock {
    let now = 0;
    let nextId = 1;
    const tasks = new Map<number, { runAt: number; callback: () => void }>();

    const timers: SearchTimerAdapter = {
        setTimeout(callback, ms) {
            const id = nextId++;
            tasks.set(id, { runAt: now + ms, callback });
            return id as unknown as ReturnType<typeof setTimeout>;
        },
        clearTimeout(id) {
            tasks.delete(id as unknown as number);
        },
    };

    function advanceBy(ms: number): void {
        const target = now + ms;

        while (true) {
            let nextEntry:
                | [number, { runAt: number; callback: () => void }]
                | null = null;
            for (const entry of tasks.entries()) {
                if (
                    entry[1].runAt <= target &&
                    (nextEntry === null || entry[1].runAt < nextEntry[1].runAt)
                ) {
                    nextEntry = entry;
                }
            }

            if (nextEntry === null) {
                break;
            }

            const [id, task] = nextEntry;
            tasks.delete(id);
            now = task.runAt;
            task.callback();
        }

        now = target;
    }

    return {
        timers,
        advanceBy,
        pendingCount: () => tasks.size,
    };
}

describe("createBlogSearchScheduler", () => {
    describe("Basics", () => {
        test("waits for debounce, enters searching state, then commits after the search delay", () => {
            const clock = createFakeClock();
            const events: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: (searching) =>
                    events.push(`searching:${searching}`),
                onCommit: (query) => events.push(`commit:${query}`),
            });

            scheduler.schedule("jitter");

            clock.advanceBy(SEARCH_DEBOUNCE_MS - 1);
            expect(events).toEqual([]);

            clock.advanceBy(1);
            expect(events).toEqual(["searching:true"]);

            clock.advanceBy(SEARCH_DELAY_MS - 1);
            expect(events).toEqual(["searching:true"]);

            clock.advanceBy(1);
            const expected = [
                "searching:true",
                "searching:false",
                "commit:jitter",
            ];
            expect(events).toEqual(expected);
        });

        test("resets the debounce timer on rapid keystrokes and only searches the final query", () => {
            const clock = createFakeClock();
            const committed: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: () => {},
                onCommit: (query) => committed.push(query),
            });

            scheduler.schedule("c");
            clock.advanceBy(200);
            scheduler.schedule("ca");
            clock.advanceBy(200);
            scheduler.schedule("cache");

            clock.advanceBy(SEARCH_DEBOUNCE_MS + SEARCH_DELAY_MS);
            const expected = ["cache"];
            expect(committed).toEqual(expected);
        });
    });

    describe("Edge Cases", () => {
        test("typing during the searching delay cancels the stale commit and restarts debounce", () => {
            const clock = createFakeClock();
            const events: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: (searching) =>
                    events.push(`searching:${searching}`),
                onCommit: (query) => events.push(`commit:${query}`),
            });

            scheduler.schedule("time");
            clock.advanceBy(SEARCH_DEBOUNCE_MS + 100);
            expect(events).toEqual(["searching:true"]);

            scheduler.schedule("timeouts");
            clock.advanceBy(SEARCH_DEBOUNCE_MS + SEARCH_DELAY_MS);

            const expected = [
                "searching:true",
                "searching:false",
                "searching:true",
                "searching:false",
                "commit:timeouts",
            ];
            expect(events).toEqual(expected);
        });

        test("clearing to an empty string commits without entering the searching spinner state", () => {
            const clock = createFakeClock();
            const events: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: (searching) =>
                    events.push(`searching:${searching}`),
                onCommit: (query) => events.push(`commit:${query}`),
            });

            scheduler.schedule("");
            clock.advanceBy(SEARCH_DEBOUNCE_MS);

            const expected = ["commit:"];
            expect(events).toEqual(expected);
        });

        test("submitImmediate skips debounce and runs the searching delay before committing", () => {
            const clock = createFakeClock();
            const events: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: (searching) =>
                    events.push(`searching:${searching}`),
                onCommit: (query) => events.push(`commit:${query}`),
            });

            scheduler.submitImmediate("solid");
            expect(events).toEqual(["searching:true"]);

            clock.advanceBy(SEARCH_DELAY_MS);
            const expected = [
                "searching:true",
                "searching:false",
                "commit:solid",
            ];
            expect(events).toEqual(expected);
        });

        test("cancel clears all pending timers and resets searching state", () => {
            const clock = createFakeClock();
            const events: string[] = [];
            const scheduler = createBlogSearchScheduler({
                timers: clock.timers,
                onSearchingChange: (searching) =>
                    events.push(`searching:${searching}`),
                onCommit: (query) => events.push(`commit:${query}`),
            });

            scheduler.schedule("cache");
            clock.advanceBy(SEARCH_DEBOUNCE_MS);
            scheduler.cancel();
            clock.advanceBy(SEARCH_DELAY_MS * 2);

            const expected = ["searching:true", "searching:false"];
            expect(events).toEqual(expected);
            expect(clock.pendingCount()).toBe(0);
        });
    });
});
