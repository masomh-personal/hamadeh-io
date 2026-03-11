"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TagFilterBar, type TagFilterOption } from "@/components/ui";
import type { BlogPost } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { BlogPostCard } from "./BlogPostCard";
import { getBlogTagPresentation } from "./blog-tags";

const EXIT_MS = 150;
const ENTER_MS = 220;

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

    // Slugs currently mounted in the DOM — lags visibleSlugs so exits finish first.
    const [renderedSlugs, setRenderedSlugs] = useState<Set<string>>(
        () => new Set(posts.map((p) => p.slug))
    );
    // Stable ref so the effect can read the latest rendered set without it being a dependency.
    const renderedSlugsRef = useRef(renderedSlugs);
    renderedSlugsRef.current = renderedSlugs;

    // Slugs that just entered — cleared after ENTER_MS so lift animation is one-shot.
    const [enteringSlugs, setEnteringSlugs] = useState<Set<string>>(
        () => new Set()
    );

    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Compute which slugs are newly entering this render.
        const incoming = new Set<string>();
        for (const slug of visibleSlugs) {
            if (!renderedSlugsRef.current.has(slug)) {
                incoming.add(slug);
            }
        }

        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        if (enterTimerRef.current) clearTimeout(enterTimerRef.current);

        // Let exits play out, then swap rendered set and trigger enters.
        exitTimerRef.current = setTimeout(() => {
            setRenderedSlugs(new Set(visibleSlugs));

            // Mark newly added slugs as entering so they get the lift class.
            if (incoming.size > 0) {
                setEnteringSlugs(incoming);

                // Remove the entering state after the enter transition completes.
                enterTimerRef.current = setTimeout(() => {
                    setEnteringSlugs(new Set());
                }, ENTER_MS);
            }
        }, EXIT_MS);

        return () => {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
            if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
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
                        const isEntering = enteringSlugs.has(post.slug);

                        return (
                            <div
                                key={post.slug}
                                className={cn(
                                    "transition-all ease-out",
                                    isVisible
                                        ? isEntering
                                            ? "opacity-0 translate-y-2.5"
                                            : "opacity-100 translate-y-0"
                                        : "opacity-0 scale-[0.97] pointer-events-none"
                                )}
                                style={{
                                    transitionDuration: isEntering
                                        ? `${ENTER_MS}ms`
                                        : `${EXIT_MS}ms`,
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
