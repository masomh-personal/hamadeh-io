/**
 * Coordinates the two-stage blog search lifecycle:
 * 1. Debounce while the user is typing (`debounceMs`).
 * 2. Short searching state (`searchDelayMs`) so the spinner and result
 *    transition feel intentional rather than abrupt.
 *
 * Timers are injectable so unit tests can verify every timing edge case
 * deterministically without real sleeps.
 */

export const SEARCH_DEBOUNCE_MS = 400;
export const SEARCH_DELAY_MS = 1000;

export interface SearchTimerAdapter {
    setTimeout: (
        callback: () => void,
        ms: number
    ) => ReturnType<typeof setTimeout>;
    clearTimeout: (id: ReturnType<typeof setTimeout>) => void;
}

export interface BlogSearchSchedulerOptions {
    debounceMs?: number;
    searchDelayMs?: number;
    timers?: SearchTimerAdapter;
    onSearchingChange: (isSearching: boolean) => void;
    onCommit: (query: string) => void;
}

export interface BlogSearchScheduler {
    /** Schedules a debounced search for the latest input value. */
    schedule: (query: string) => void;
    /** Skips the debounce wait and enters the searching phase immediately. */
    submitImmediate: (query: string) => void;
    /** Cancels all pending timers and clears the searching state. */
    cancel: () => void;
}

const defaultTimers: SearchTimerAdapter = {
    setTimeout: (callback, ms) => globalThis.setTimeout(callback, ms),
    clearTimeout: (id) => globalThis.clearTimeout(id),
};

export function createBlogSearchScheduler({
    debounceMs = SEARCH_DEBOUNCE_MS,
    searchDelayMs = SEARCH_DELAY_MS,
    timers = defaultTimers,
    onSearchingChange,
    onCommit,
}: BlogSearchSchedulerOptions): BlogSearchScheduler {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let searchTimer: ReturnType<typeof setTimeout> | null = null;
    let isSearching = false;

    function setSearching(next: boolean): void {
        if (isSearching !== next) {
            isSearching = next;
            onSearchingChange(next);
        }
    }

    function clearTimers(): void {
        if (debounceTimer !== null) {
            timers.clearTimeout(debounceTimer);
            debounceTimer = null;
        }
        if (searchTimer !== null) {
            timers.clearTimeout(searchTimer);
            searchTimer = null;
        }
    }

    function beginSearch(query: string): void {
        clearTimers();

        if (!query) {
            setSearching(false);
            onCommit("");
            return;
        }

        setSearching(true);
        searchTimer = timers.setTimeout(() => {
            searchTimer = null;
            setSearching(false);
            onCommit(query);
        }, searchDelayMs);
    }

    return {
        schedule(query: string): void {
            clearTimers();
            setSearching(false);

            debounceTimer = timers.setTimeout(() => {
                debounceTimer = null;
                beginSearch(query);
            }, debounceMs);
        },

        submitImmediate(query: string): void {
            beginSearch(query);
        },

        cancel(): void {
            clearTimers();
            setSearching(false);
        },
    };
}
