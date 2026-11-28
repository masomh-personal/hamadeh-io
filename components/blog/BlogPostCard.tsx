import { HiDocumentText } from "react-icons/hi";
import { Badge } from "@/components/ui";
import { PostCard } from "@/components/ui/PostCard";
import type { BlogPostSummary } from "@/lib/content/blog";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogPostCardProps {
    post: BlogPostSummary;
    headingAs?: "h2" | "h3";
}

export function BlogPostCard({ post, headingAs }: BlogPostCardProps) {
    const tags = post.tags ?? [];

    return (
        <PostCard
            href={`/blog/${post.slug}`}
            icon={
                <HiDocumentText
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-sky-300"
                />
            }
            readingTimeMinutes={post.readingTimeMinutes}
            title={post.title}
            excerpt={post.excerpt}
            headingAs={headingAs}
            footer={
                tags.length > 0 ? (
                    <div className="flex flex-wrap gap-x-2 gap-y-2.5">
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
                ) : null
            }
        />
    );
}
