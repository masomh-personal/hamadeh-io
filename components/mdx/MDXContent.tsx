/**
 * MDX Content Renderer
 * Renders markdown content with syntax highlighting
 */

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface MDXContentProps {
    content: string;
}

export function MDXContent({ content }: MDXContentProps): React.ReactElement {
    return (
        <div className="prose prose-slate max-w-none dark:prose-invert prose-pre:bg-primary-900 prose-code:text-tertiary-400">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
