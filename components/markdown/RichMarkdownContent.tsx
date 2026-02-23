/**
 * Rich Markdown Content Renderer
 * Renders markdown content with syntax highlighting
 */

import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
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
                rehypePlugins={[
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-dark-default",
                            keepBackground: false,
                        },
                    ],
                ]}
            >
                {content}
            </MarkdownAsync>
        </div>
    );
}
