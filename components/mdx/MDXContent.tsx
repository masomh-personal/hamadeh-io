/**
 * MDX Content Renderer
 * Renders markdown content with syntax highlighting
 */

import ReactMarkdown from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";

interface MDXContentProps {
    content: string;
}

export function MDXContent({ content }: MDXContentProps): React.ReactElement {
    const codeTheme = {
        dark: "github-dark-default",
        light: "github-light-default",
    } as const;

    return (
        <div className="prose max-w-none">
            <ReactMarkdown
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
            </ReactMarkdown>
        </div>
    );
}
