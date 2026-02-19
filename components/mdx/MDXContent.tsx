/**
 * MDX Content Renderer
 * Renders markdown content with syntax highlighting
 */

import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock } from "./CodeBlock";

interface MDXContentProps {
    content: string;
}

const markdownComponents = {
    pre: CodeBlock,
} as const;

export async function MDXContent({
    content,
}: MDXContentProps): Promise<React.ReactElement> {
    return (
        <div className="prose prose-invert max-w-none">
            <MarkdownAsync
                components={markdownComponents}
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
