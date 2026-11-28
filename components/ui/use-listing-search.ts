import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    type BlogBodyIndex,
    normalizeSearchQuery,
    parseBlogBodyIndex,
} from "@/lib/blog-search";
import {
    type BlogSearchScheduler,
    createBlogSearchScheduler,
} from "@/lib/blog-search-scheduler";
import { parseInternalHref } from "./component-utils";

const cachedIndexes = new Map<string, BlogBodyIndex>();
const inFlightRequests = new Map<string, Promise<BlogBodyIndex>>();

async function fetchSearchIndex(indexUrl: string): Promise<BlogBodyIndex> {
    try {
        const response = await fetch(indexUrl);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch search index (${response.status})`
            );
        }

        const payload: unknown = await response.json();
        const parsed = parseBlogBodyIndex(payload);
        cachedIndexes.set(indexUrl, parsed);
        return parsed;
    } catch {
        inFlightRequests.delete(indexUrl);
        return {};
    }
}

function loadSearchIndex(indexUrl: string): Promise<BlogBodyIndex> {
    const cached = cachedIndexes.get(indexUrl);
    if (cached) {
        return Promise.resolve(cached);
    }

    const existing = inFlightRequests.get(indexUrl);
    if (existing) {
        return existing;
    }

    const request = fetchSearchIndex(indexUrl);
    inFlightRequests.set(indexUrl, request);
    return request;
}

interface UseListingSearchOptions {
    /** Static JSON index route, e.g. `/blog/search-index.json`. */
    indexUrl: string;
    /** Raw search query `q` from the validated route search params. */
    rawUrlQuery: string | null;
    /** Raw companion filter value (e.g. `tag` or `difficulty`) from the URL. */
    rawUrlFilter: string | null;
    /** Builds the canonical listing URL for a committed search query (or cleared state). */
    buildSearchPath: (q: string | null) => string;
}

export interface UseListingSearchResult {
    inputValue: string;
    rawUrlQuery: string | null;
    bodyIndex: BlogBodyIndex | undefined;
    isSearching: boolean;
    handleSearchChange: (nextValue: string) => void;
    handleSubmitImmediate: (rawValue: string) => void;
    handleClearSearch: () => void;
    ensureBodyIndex: () => void;
}

/**
 * Shared client search state for URL-driven static listing pages (`/blog`,
 * `/problems`). Handles 400ms debounce, 600ms searching state, lazy index
 * loading, and canceling pending searches when a sidebar filter is clicked.
 */
export function useListingSearch({
    indexUrl,
    rawUrlQuery,
    rawUrlFilter,
    buildSearchPath,
}: UseListingSearchOptions): UseListingSearchResult {
    const navigate = useNavigate();
    const urlQuery = normalizeSearchQuery(rawUrlQuery);

    const [inputValue, setInputValue] = useState(urlQuery);
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    const [prevUrlFilter, setPrevUrlFilter] = useState(rawUrlFilter);
    const [bodyIndex, setBodyIndex] = useState<BlogBodyIndex | undefined>(() =>
        cachedIndexes.get(indexUrl)
    );
    const [isSearching, setIsSearching] = useState(false);

    const urlQueryRef = useRef(urlQuery);
    urlQueryRef.current = urlQuery;
    const buildSearchPathRef = useRef(buildSearchPath);
    buildSearchPathRef.current = buildSearchPath;
    const schedulerRef = useRef<BlogSearchScheduler | null>(null);

    if (urlQuery !== prevUrlQuery || rawUrlFilter !== prevUrlFilter) {
        setPrevUrlQuery(urlQuery);
        setPrevUrlFilter(rawUrlFilter);
        setInputValue(urlQuery);
    }

    const ensureBodyIndex = useCallback(() => {
        const cached = cachedIndexes.get(indexUrl);
        if (cached) {
            setBodyIndex(cached);
            return;
        }

        void (async () => {
            const loaded = await loadSearchIndex(indexUrl);
            setBodyIndex(loaded);
        })();
    }, [indexUrl]);

    useEffect(() => {
        const scheduler = createBlogSearchScheduler({
            onSearchingChange: setIsSearching,
            onCommit: (normalizedQuery) => {
                if (normalizedQuery === urlQueryRef.current) {
                    return;
                }

                const next = parseInternalHref(
                    buildSearchPathRef.current(normalizedQuery || null)
                );
                void navigate({
                    to: next.to,
                    search: next.search ?? {},
                    replace: true,
                    resetScroll: false,
                });
            },
        });
        schedulerRef.current = scheduler;

        return () => {
            scheduler.cancel();
            schedulerRef.current = null;
        };
    }, [navigate]);

    useEffect(() => {
        if (urlQuery) {
            ensureBodyIndex();
        } else {
            schedulerRef.current?.cancel();
        }
    }, [urlQuery, rawUrlFilter, ensureBodyIndex]);

    const handleSearchChange = useCallback((nextValue: string) => {
        setInputValue(nextValue);
        schedulerRef.current?.schedule(normalizeSearchQuery(nextValue));
    }, []);

    const handleSubmitImmediate = useCallback((rawValue: string) => {
        schedulerRef.current?.submitImmediate(normalizeSearchQuery(rawValue));
    }, []);

    const handleClearSearch = useCallback(() => {
        schedulerRef.current?.cancel();
        setInputValue("");
        if (urlQueryRef.current) {
            const next = parseInternalHref(buildSearchPathRef.current(null));
            void navigate({
                to: next.to,
                search: next.search ?? {},
                replace: true,
                resetScroll: false,
            });
        }
    }, [navigate]);

    return {
        inputValue,
        rawUrlQuery,
        bodyIndex,
        isSearching,
        handleSearchChange,
        handleSubmitImmediate,
        handleClearSearch,
        ensureBodyIndex,
    };
}
