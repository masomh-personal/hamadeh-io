import { HiArrowLeft, HiDocumentText } from "react-icons/hi";
import { Badge, Button } from "@/components/ui";
import { formatPublishedDate } from "@/lib/date";
import type { BlogPost } from "@/lib/mdx";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogPostHeaderProps {
    post: BlogPost;
}

export function BlogPostHeader({
    post,
}: BlogPostHeaderProps): React.ReactElement {
    const { datePublished, title, excerpt, tags = [] } = post;

    return (
        <header className="mb-8">
            <div className="text-content-subtle font-mono mb-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs uppercase tracking-wide">
                <HiDocumentText
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-sky-300"
                />
                <span>Published {formatPublishedDate(datePublished)}</span>
                <Button
                    href="/blog"
                    variant="secondary"
                    size="xs"
                    icon={<HiArrowLeft className="h-3.5 w-3.5" />}
                    iconPosition="left"
                    enforceMinWidth={false}
                    className="mt-3 basis-full justify-center px-4 sm:mt-0 sm:basis-auto sm:justify-start sm:px-3 sm:ml-auto"
                >
                    Back to Blog
                </Button>
            </div>

            <h1 className="font-heading text-xl font-extrabold tracking-tight text-white md:text-2xl lg:text-3xl">
                {title}
            </h1>

            <p className="text-content-muted mt-3 max-w-3xl text-base leading-relaxed md:text-lg">
                {excerpt}
            </p>

            {tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const { text, color, bgColor } =
                            getBlogTagPresentation(tag);

                        return (
                            <Badge
                                key={tag}
                                text={text}
                                size="sm"
                                isBlogTag
                                tagColor={color}
                                tagBackgroundColor={bgColor}
                                className="font-baloo font-normal"
                            />
                        );
                    })}
                </div>
            ) : null}

            <hr className="mt-6 border-surface-outline/60" />
        </header>
    );
}
