"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TagFilterBar, type TagFilterOption } from "@/components/ui";
import type { BlogPost } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { BlogPostCard } from "./BlogPostCard";
import { getBlogTagPresentation } from "./blog-tags";

/** Duration must match the CSS transition duration below (ms). */
const TRANSITION_DURATION_MS = 250;

interface BlogClientSectionProps {
    posts: BlogPost[];
    allTags: string[];
}

export function BlogClientSection({ posts, allTags }: BlogClientSectionProps) {
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const tagOptions = useMemo<TagFilterOption[]>(
        () =>
            allTags.map((tag) => {
                const { text, color, bgColor } = getBlogTagPresentation(tag);
                return { value: tag, label: text, color, bgColor };
            }),
        [allTags]
    );

    const handleTagToggle = useCallback((tag: string) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    }, []);

    const handleClearAll = useCallback(() => {
        setActiveTags([]);
    }, []);

    // The set of slugs that pass the current filter (controls opacity/scale).
    const visibleSlugs = useMemo<Set<string>>(() => {
        if (activeTags.length === 0) {
            return new Set(posts.map((p) => p.slug));
        }
        return new Set(
            posts
                .filter((p) => p.tags?.some((t) => activeTags.includes(t)))
                .map((p) => p.slug)
        );
    }, [posts, activeTags]);

    // The set of slugs that are still in the DOM (lags visibleSlugs by one
    // transition so exit animations complete before the grid track collapses).
    const [renderedSlugs, setRenderedSlugs] = useState<Set<string>>(
        () => new Set(posts.map((p) => p.slug))
    );
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Immediately add newly visible slugs so their enter animation starts.
        setRenderedSlugs((prev) => {
            const next = new Set(prev);
            for (const slug of visibleSlugs) {
                next.add(slug);
            }
            return next;
        });

        // After the transition finishes, prune slugs that are no longer visible.
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setRenderedSlugs(new Set(visibleSlugs));
        }, TRANSITION_DURATION_MS);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [visibleSlugs]);

    return (
        <>
            <TagFilterBar
                tags={tagOptions}
                activeTags={activeTags}
                onTagToggle={handleTagToggle}
                onClearAll={handleClearAll}
            />

            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {posts
                    .filter((post) => renderedSlugs.has(post.slug))
                    .map((post) => {
                        const isVisible = visibleSlugs.has(post.slug);

                        return (
                            <div
                                key={post.slug}
                                className={cn(
                                    "transition-all ease-in-out",
                                    isVisible
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                )}
                                style={{
                                    transitionDuration: `${TRANSITION_DURATION_MS}ms`,
                                }}
                                aria-hidden={!isVisible}
                            >
                                <BlogPostCard post={post} />
                            </div>
                        );
                    })}
            </div>

            {activeTags.length > 0 && visibleSlugs.size === 0 && (
                <p className="text-content-subtle mt-8 text-center text-sm">
                    No posts match the selected tags.
                </p>
            )}
        </>
    );
}
