/**
 * MDX Content Renderer
 * Renders markdown content with syntax highlighting
 */

import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";

interface MDXContentProps {
    content: string;
}

export async function MDXContent({
    content,
}: MDXContentProps): Promise<React.ReactElement> {
    const codeTheme = {
        dark: "github-dark-default",
        light: "github-light-default",
    } as const;

    return (
        <div className="prose max-w-none">
            <MarkdownAsync
                rehypePlugins={[
                    [
                        rehypePrettyCode,
                        {
                            theme: codeTheme,
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
