"use client";

import type { ComponentProps, KeyboardEvent } from "react";
import { useId } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { HiTerminal } from "react-icons/hi";
import { cn } from "@/lib/utils";

export type SearchLoadingIndicator = "equalizer" | "terminal";

export interface SearchInputProps extends Omit<
    ComponentProps<"input">,
    "type" | "value" | "onChange"
> {
    value: string;
    /** Screen-reader label for the input. */
    label: string;
    onValueChange?: (value: string) => void;
    onSubmitImmediate?: (value: string) => void;
    onClear?: () => void;
    onPrepareIndex?: () => void;
    isSearching?: boolean;
    /** Visual style of the inline searching indicator. */
    loadingIndicator?: SearchLoadingIndicator;
}

const EQUALIZER_DELAYS_MS = [0, 140, 280] as const;

function SearchingIndicator({
    variant,
}: {
    variant: SearchLoadingIndicator;
}): React.ReactElement {
    if (variant === "terminal") {
        return (
            <HiTerminal
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-[spin_1.2s_linear_infinite] text-sky-300 motion-reduce:animate-none"
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className="inline-flex h-3.5 items-end gap-[2px]"
        >
            {EQUALIZER_DELAYS_MS.map((delay) => (
                <span
                    key={delay}
                    className="search-equalizer-bar h-full w-[2.5px] rounded-full bg-sky-300"
                    style={{ animationDelay: `${delay}ms` }}
                />
            ))}
        </span>
    );
}

/**
 * Compact search input with built-in keyboard shortcuts (Enter to submit
 * immediately, Escape to clear) and an inline searching indicator that
 * replaces the clear button while searching.
 */
export function SearchInput({
    id,
    value,
    label,
    placeholder = "Search...",
    onValueChange,
    onSubmitImmediate,
    onClear,
    onPrepareIndex,
    isSearching = false,
    loadingIndicator = "equalizer",
    disabled = false,
    className,
    onFocus,
    onKeyDown,
    ...props
}: SearchInputProps): React.ReactElement {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        onKeyDown?.(event);
        if (event.defaultPrevented) {
            return;
        }

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
            <label htmlFor={inputId} className="sr-only">
                {label}
            </label>
            <FaMagnifyingGlass
                aria-hidden="true"
                className="text-content-subtle pointer-events-none absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2"
            />
            <input
                {...props}
                id={inputId}
                type="search"
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                aria-busy={isSearching || undefined}
                onFocus={(event) => {
                    onPrepareIndex?.();
                    onFocus?.(event);
                }}
                onChange={(event) => {
                    onPrepareIndex?.();
                    onValueChange?.(event.target.value);
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
                    aria-label="Searching"
                    className="pointer-events-none absolute top-1/2 right-1.5 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center"
                >
                    <SearchingIndicator variant={loadingIndicator} />
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
