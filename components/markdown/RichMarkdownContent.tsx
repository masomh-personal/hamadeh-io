/**
 * Rich Markdown Content Renderer
 * Renders markdown content with syntax highlighting via highlight.js.
 * highlight.js has no dynamic imports or WASM, so it works cleanly with
 * Next.js Turbopack and Bun without module aliasing issues.
 */

import bash from "highlight.js/lib/languages/bash";
import http from "highlight.js/lib/languages/http";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { MarkdownAsync } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface RichMarkdownContentProps {
    content: string;
}

/**
 * Registering languages explicitly keeps the default set of 37 out of the
 * bundle. Aliases such as `ts` come from the language definitions themselves.
 * `content:check` fails on fences using a language that is not listed here, so
 * adding one is a deliberate step rather than a silent loss of highlighting.
 */
const highlightLanguages = {
    bash,
    http,
    javascript,
    json,
    typescript,
} as const;

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [[rehypeHighlight, { languages: highlightLanguages }]];

function extractHeadingText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(extractHeadingText).join("");
    }
    if (node && typeof node === "object" && "props" in node) {
        const element = node as React.ReactElement<{ children?: ReactNode }>;
        return extractHeadingText(element.props.children);
    }
    return "";
}

export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Allocates unique heading IDs within a single document render, avoiding
 * collisions even when explicit numbered headings (e.g. "Foo 1") appear.
 */
export function createHeadingIdAllocator(): (text: string) => string | null {
    const usedIds = new Set<string>();

    return (text: string): string | null => {
        const baseSlug = slugifyHeading(text);
        if (!baseSlug) {
            return null;
        }

        let candidate = baseSlug;
        let suffix = 1;
        while (usedIds.has(candidate)) {
            candidate = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        usedIds.add(candidate);
        return candidate;
    };
}

function createAnchorHeading(
    TagName: "h2" | "h3" | "h4",
    allocateId: (text: string) => string | null
) {
    return function AnchorHeading({
        children,
        className,
        ...props
    }: ComponentPropsWithoutRef<"h2">) {
        const headingText = extractHeadingText(children).trim();
        const id = allocateId(headingText);
        if (!id) {
            return (
                <TagName className={className} {...props}>
                    {children}
                </TagName>
            );
        }

        return (
            <TagName
                id={id}
                className={`group scroll-mt-24 ${className ?? ""}`.trim()}
                {...props}
            >
                {children}
                <a
                    href={`#${id}`}
                    aria-label={`Link to section ${headingText}`}
                    className="ml-2 rounded-sm text-primary/0 no-underline transition-colors group-hover:text-primary/80 hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                    #
                </a>
            </TagName>
        );
    };
}

export async function RichMarkdownContent({
    content,
}: RichMarkdownContentProps): Promise<React.ReactElement> {
    const allocateId = createHeadingIdAllocator();
    const markdownComponents = {
        pre: CodeBlock,
        h2: createAnchorHeading("h2", allocateId),
        h3: createAnchorHeading("h3", allocateId),
        h4: createAnchorHeading("h4", allocateId),
    };

    return (
        <div className="prose prose-invert prose-content max-w-none">
            <MarkdownAsync
                components={markdownComponents}
                remarkPlugins={REMARK_PLUGINS}
                rehypePlugins={
                    REHYPE_PLUGINS as React.ComponentProps<
                        typeof MarkdownAsync
                    >["rehypePlugins"]
                }
            >
                {content}
            </MarkdownAsync>
        </div>
    );
}
