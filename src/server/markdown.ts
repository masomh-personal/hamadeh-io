/**
 * Build/server-side Markdown-to-HTML compiler powered by unified and Shiki.
 *
 * Runs strictly on the server during prerendering so zero Markdown parsing or
 * syntax highlighting JavaScript is ever shipped to the client bundle.
 */

import rehypeShiki from "@shikijs/rehype";
import type { Element, ElementContent, Root, Text } from "hast";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { createHeadingIdAllocator } from "@/lib/heading-id";

const LANGUAGE_LABELS: Record<string, string> = {
    ts: "typescript",
    js: "javascript",
    sh: "shell",
    bash: "bash",
    http: "http",
    json: "json",
    javascript: "javascript",
    typescript: "typescript",
};

const HEADING_TAGS = new Set(["h2", "h3", "h4"]);

function extractHastText(children: ElementContent[]): string {
    let result = "";
    for (const child of children) {
        if (child.type === "text") {
            result += (child as Text).value;
        } else if (child.type === "element") {
            result += extractHastText(child.children);
        }
    }
    return result;
}

function getLanguageLabel(language: string): string {
    return Object.hasOwn(LANGUAGE_LABELS, language)
        ? (LANGUAGE_LABELS[language] ?? language)
        : language;
}

function extractCodeLanguage(preNode: Element): string | undefined {
    const dataLang = preNode.properties?.dataLanguage;
    if (typeof dataLang === "string" && dataLang && dataLang !== "text") {
        return dataLang;
    }

    const codeChild = preNode.children.find(
        (child): child is Element =>
            child.type === "element" && child.tagName === "code"
    );
    const className = codeChild?.properties?.className;
    const classes = Array.isArray(className)
        ? className.join(" ")
        : typeof className === "string"
          ? className
          : "";
    const match = /\blanguage-(\w+)\b/.exec(classes);
    return match?.[1] && match[1] !== "text" ? match[1] : undefined;
}

function rehypeHeadingAnchors() {
    return (tree: Root): void => {
        const allocateId = createHeadingIdAllocator();

        visit(tree, "element", (node: Element) => {
            if (!HEADING_TAGS.has(node.tagName)) {
                return;
            }

            const headingText = extractHastText(node.children).trim();
            const id = allocateId(headingText);
            if (!id) {
                return;
            }

            const existingClass: unknown = node.properties?.className;
            const classes = Array.isArray(existingClass)
                ? existingClass.map(String)
                : typeof existingClass === "string"
                  ? existingClass.split(/\s+/)
                  : [];

            node.properties = {
                ...node.properties,
                id,
                className: ["group", "scroll-mt-24", ...classes],
            };

            node.children.push({
                type: "element",
                tagName: "a",
                properties: {
                    href: `#${id}`,
                    ariaLabel: `Link to section ${headingText}`,
                    className: [
                        "ml-2",
                        "rounded-sm",
                        "text-primary/0",
                        "no-underline",
                        "transition-colors",
                        "group-hover:text-primary/80",
                        "hover:text-primary",
                        "focus-visible:text-primary",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-primary/60",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-slate-900",
                    ],
                },
                children: [{ type: "text", value: "#" }],
            });
        });
    };
}

function createClipboardSvg(): Element {
    return {
        type: "element",
        tagName: "svg",
        properties: {
            "data-copy-icon": "",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            ariaHidden: "true",
            className: ["h-3.5", "w-3.5"],
        },
        children: [
            {
                type: "element",
                tagName: "path",
                properties: {
                    d: "M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z",
                },
                children: [],
            },
            {
                type: "element",
                tagName: "path",
                properties: {
                    d: "M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z",
                },
                children: [],
            },
        ],
    };
}

function createCheckSvg(): Element {
    return {
        type: "element",
        tagName: "svg",
        properties: {
            "data-copied-icon": "",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            ariaHidden: "true",
            className: ["hidden", "h-3.5", "w-3.5", "text-green-400"],
        },
        children: [
            {
                type: "element",
                tagName: "path",
                properties: {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                },
                children: [],
            },
        ],
    };
}

function rehypeCodeBlocks() {
    return (tree: Root): void => {
        visit(tree, "element", (node: Element, index, parent) => {
            if (
                node.tagName !== "pre" ||
                index === undefined ||
                !parent ||
                ("properties" in parent &&
                    parent.properties &&
                    "dataCodeBlock" in parent.properties)
            ) {
                return;
            }

            const language = extractCodeLanguage(node);
            const label = language ? getLanguageLabel(language) : undefined;

            const buttonChildren: ElementContent[] = [];
            if (label) {
                buttonChildren.push({
                    type: "element",
                    tagName: "span",
                    properties: {
                        className: [
                            "font-mono",
                            "text-[0.7rem]",
                            "tracking-wide",
                            "select-none",
                        ],
                    },
                    children: [{ type: "text", value: label }],
                });
            }
            buttonChildren.push(createClipboardSvg(), createCheckSvg());

            const wrapper: Element = {
                type: "element",
                tagName: "div",
                properties: {
                    className: ["relative"],
                    "data-code-block": "",
                },
                children: [
                    {
                        type: "element",
                        tagName: "div",
                        properties: {
                            className: [
                                "absolute",
                                "top-2.5",
                                "right-2.5",
                                "z-10",
                            ],
                        },
                        children: [
                            {
                                type: "element",
                                tagName: "button",
                                properties: {
                                    type: "button",
                                    "data-copy-code": "",
                                    ariaLabel: "Copy code",
                                    className: [
                                        "flex",
                                        "min-h-9",
                                        "cursor-pointer",
                                        "items-center",
                                        "gap-1.5",
                                        "rounded-md",
                                        "border",
                                        "border-transparent",
                                        "px-2",
                                        "py-1.5",
                                        "text-slate-400",
                                        "transition-[transform,color,background-color,border-color]",
                                        "duration-300",
                                        "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                                        "hover:scale-105",
                                        "hover:border-primary/40",
                                        "hover:bg-primary/10",
                                        "hover:text-primary-hover",
                                        "active:scale-90",
                                        "active:duration-150",
                                        "motion-reduce:transform-none",
                                        "focus-visible:outline-none",
                                        "focus-visible:ring-2",
                                        "focus-visible:ring-primary/60",
                                        "focus-visible:ring-offset-2",
                                        "focus-visible:ring-offset-slate-900",
                                    ],
                                },
                                children: buttonChildren,
                            },
                            {
                                type: "element",
                                tagName: "output",
                                properties: {
                                    ariaLive: "polite",
                                    "data-copy-status": "",
                                    className: ["sr-only"],
                                },
                                children: [],
                            },
                        ],
                    },
                    node,
                ],
            };

            parent.children[index] = wrapper;
        });
    };
}

let processorPromise: Promise<ReturnType<typeof createProcessor>> | undefined;

function createProcessor() {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHeadingAnchors)
        .use(rehypeShiki, {
            theme: "github-dark-default",
            langs: ["bash", "http", "javascript", "json", "typescript"],
            fallbackLanguage: "text",
            transformers: [
                {
                    pre(node) {
                        if (this.options.lang) {
                            node.properties["data-language"] =
                                this.options.lang;
                        }
                    },
                },
            ],
        })
        .use(rehypeCodeBlocks)
        .use(rehypeStringify);
}

function getProcessor() {
    if (!processorPromise) {
        processorPromise = Promise.resolve(createProcessor());
    }
    return processorPromise;
}

/**
 * Compiles Markdown into sanitized, Shiki-highlighted HTML with heading
 * anchors and copy-button wrappers.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<string> {
    if (!markdown.trim()) {
        return "";
    }

    const processor = await getProcessor();
    const file = await processor.process(markdown);
    return String(file);
}
