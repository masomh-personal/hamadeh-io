"use client";

import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    type BlogListingQuery,
    getBlogListingPath,
    type TagCount,
} from "@/lib/blog-listing";
import {
    type BlogBodyIndex,
    normalizeSearchQuery,
    parseBlogBodyIndex,
} from "@/lib/blog-search";
import {
    type BlogSearchScheduler,
    createBlogSearchScheduler,
} from "@/lib/blog-search-scheduler";
import type { BlogPostSummary } from "@/lib/content/blog";
import { BlogListingView } from "./BlogListingView";
import { BlogSearchInput } from "./BlogSearchInput";

let cachedBodyIndex: BlogBodyIndex | null = null;
let inFlightBodyIndexPromise: Promise<BlogBodyIndex> | null = null;

function loadBlogBodyIndex(): Promise<BlogBodyIndex> {
    if (cachedBodyIndex) {
        return Promise.resolve(cachedBodyIndex);
    }

    if (!inFlightBodyIndexPromise) {
        inFlightBodyIndexPromise = fetch("/blog/search-index.json")
            .then((response) => (response.ok ? response.json() : {}))
            .then((payload: unknown) => {
                cachedBodyIndex = parseBlogBodyIndex(payload);
                return cachedBodyIndex;
            })
            .catch(() => {
                inFlightBodyIndexPromise = null;
                return {};
            });
    }

    return inFlightBodyIndexPromise;
}

interface BlogListingProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
}

/**
 * Reads the filter, search query, and page from the URL on the client so
 * `/blog` itself stays statically generated. Render it inside a Suspense
 * boundary.
 */
export function BlogListing({
    posts,
    tagCounts,
}: BlogListingProps): React.ReactElement {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawUrlQuery = searchParams.get("q");
    const rawUrlTag = searchParams.get("tag");
    const urlQuery = normalizeSearchQuery(rawUrlQuery);

    const [inputValue, setInputValue] = useState(urlQuery);
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
    const [prevUrlTag, setPrevUrlTag] = useState(rawUrlTag);
    const [bodyIndex, setBodyIndex] = useState<BlogBodyIndex | undefined>(
        () => cachedBodyIndex ?? undefined
    );
    const [isSearching, setIsSearching] = useState(false);

    const urlQueryRef = useRef(urlQuery);
    urlQueryRef.current = urlQuery;
    const schedulerRef = useRef<BlogSearchScheduler | null>(null);

    if (urlQuery !== prevUrlQuery || rawUrlTag !== prevUrlTag) {
        setPrevUrlQuery(urlQuery);
        setPrevUrlTag(rawUrlTag);
        setInputValue(urlQuery);
    }

    const ensureBodyIndex = useCallback(() => {
        if (cachedBodyIndex) {
            setBodyIndex(cachedBodyIndex);
            return;
        }

        void loadBlogBodyIndex().then((loaded) => {
            setBodyIndex(loaded);
        });
    }, []);

    useEffect(() => {
        const scheduler = createBlogSearchScheduler({
            onSearchingChange: setIsSearching,
            onCommit: (normalizedQuery) => {
                if (normalizedQuery === urlQueryRef.current) {
                    return;
                }

                const nextPath = getBlogListingPath({
                    q: normalizedQuery || null,
                }) as Route;
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
    }, [urlQuery, rawUrlTag, ensureBodyIndex]);

    const handleSearchChange = useCallback((nextValue: string) => {
        setInputValue(nextValue);
        const normalized = normalizeSearchQuery(nextValue);
        schedulerRef.current?.schedule(normalized);
    }, []);

    const handleSubmitImmediate = useCallback((rawValue: string) => {
        const normalized = normalizeSearchQuery(rawValue);
        schedulerRef.current?.submitImmediate(normalized);
    }, []);

    const handleClearSearch = useCallback(() => {
        schedulerRef.current?.cancel();
        setInputValue("");
        if (urlQueryRef.current) {
            router.replace(getBlogListingPath({}) as Route, { scroll: false });
        }
    }, [router]);

    const query: BlogListingQuery = {
        tag: searchParams.get("tag"),
        q: rawUrlQuery,
        page: searchParams.get("page"),
    };

    return (
        <BlogListingView
            posts={posts}
            tagCounts={tagCounts}
            query={query}
            bodyIndex={bodyIndex}
            onClearSearch={handleClearSearch}
            searchSlot={
                <BlogSearchInput
                    value={inputValue}
                    onChange={handleSearchChange}
                    onSubmitImmediate={handleSubmitImmediate}
                    onClear={handleClearSearch}
                    onPrepareIndex={ensureBodyIndex}
                    isSearching={isSearching}
                />
            }
        />
    );
}
