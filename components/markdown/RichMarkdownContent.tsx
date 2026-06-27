/**
 * Rich Markdown Content Renderer
 * Renders markdown content with syntax highlighting via highlight.js.
 * highlight.js has no dynamic imports or WASM, so it works cleanly with
 * Next.js Turbopack and Bun without module aliasing issues.
 */

import { MarkdownAsync } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface RichMarkdownContentProps {
    content: string;
}

const markdownComponents = {
    pre: CodeBlock,
} as const;

export async function RichMarkdownContent({
    content,
}: RichMarkdownContentProps): Promise<React.ReactElement> {
    return (
        <div className="prose prose-invert prose-content max-w-none">
            <MarkdownAsync
                components={markdownComponents}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeHighlight, { detect: true }]]}
            >
                {content}
            </MarkdownAsync>
        </div>
    );
}
