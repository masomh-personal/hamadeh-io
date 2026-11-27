"use client";

import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
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
    /** Query parameter name for the companion filter (e.g. `tag` or `difficulty`). */
    filterParam: string;
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
    filterParam,
    buildSearchPath,
}: UseListingSearchOptions): UseListingSearchResult {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawUrlQuery = searchParams.get("q");
    const rawUrlFilter = searchParams.get(filterParam);
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

                const nextPath = buildSearchPathRef.current(
                    normalizedQuery || null
                ) as Route;
                router.replace(nextPath, { scroll: false });
            },
        });
        schedulerRef.current = scheduler;

        return () => {
            scheduler.cancel();
            schedulerRef.current = null;
        };
    }, [router]);

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
            router.replace(buildSearchPathRef.current(null) as Route, {
                scroll: false,
            });
        }
    }, [router]);

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
