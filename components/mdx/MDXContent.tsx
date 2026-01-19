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
        <div className="prose max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
