"use client";

import type { KeyboardEvent } from "react";
import { FaCircleNotch, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface BlogSearchInputProps {
    value: string;
    onChange?: (value: string) => void;
    onSubmitImmediate?: (value: string) => void;
    onClear?: () => void;
    onPrepareIndex?: () => void;
    isSearching?: boolean;
    disabled?: boolean;
    className?: string;
}

/**
 * Compact search input placed above the topic filters in the blog sidebar.
 * Shows an inline spinner in place of the clear button while searching.
 */
export function BlogSearchInput({
    value,
    onChange,
    onSubmitImmediate,
    onClear,
    onPrepareIndex,
    isSearching = false,
    disabled = false,
    className,
}: BlogSearchInputProps): React.ReactElement {
    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmitImmediate?.(value);
        } else if (event.key === "Escape" && value) {
            event.preventDefault();
            onClear?.();
        }
    }

    return (
        <div role="search" className={cn("relative", className)}>
            <label htmlFor="blog-search-input" className="sr-only">
                Search all blog posts
            </label>
            <FaMagnifyingGlass
                aria-hidden="true"
                className="text-content-subtle pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2"
            />
            <input
                id="blog-search-input"
                type="search"
                value={value}
                disabled={disabled}
                placeholder="Search all posts..."
                autoComplete="off"
                spellCheck={false}
                aria-busy={isSearching || undefined}
                onFocus={() => onPrepareIndex?.()}
                onChange={(event) => {
                    onPrepareIndex?.();
                    onChange?.(event.target.value);
                }}
                onKeyDown={handleKeyDown}
                className={cn(
                    "w-full rounded-md border border-surface-outline/60 bg-slate-900/50 py-2 pr-8 pl-8 font-sans text-xs text-content placeholder:text-content-subtle transition-colors duration-150",
                    "hover:border-surface-outline focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
                    disabled && "cursor-not-allowed opacity-60"
                )}
            />
            {isSearching && !disabled ? (
                <span
                    role="status"
                    aria-label="Searching posts"
                    className="text-primary pointer-events-none absolute top-1/2 right-1.5 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center"
                >
                    <FaCircleNotch
                        aria-hidden="true"
                        className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
                    />
                </span>
            ) : value && !disabled ? (
                <button
                    type="button"
                    onClick={() => onClear?.()}
                    aria-label="Clear search"
                    className="text-content-subtle hover:text-content focus-visible:ring-primary/60 absolute top-1/2 right-1.5 inline-flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-2"
                >
                    <FaXmark aria-hidden="true" className="h-3 w-3" />
                </button>
            ) : null}
        </div>
    );
}
