import type { Route } from "next";
import { HiCode } from "react-icons/hi";
import { Badge } from "@/components/ui";
import { PostCard } from "@/components/ui/PostCard";
import type { ProblemSummary } from "@/lib/content/problems";

interface ProblemPostCardProps {
    problem: ProblemSummary;
    headingAs?: "h2" | "h3";
}

export function ProblemPostCard({ problem, headingAs }: ProblemPostCardProps) {
    const title =
        problem.source === "leetcode"
            ? `${problem.title} (LeetCode)`
            : problem.title;
    const difficultyVariant = `leetcode-${problem.difficulty}` as const;

    return (
        <PostCard
            href={`/problems/${problem.slug}` as Route}
            icon={
                <HiCode
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-sky-300"
                />
            }
            readingTimeMinutes={problem.readingTimeMinutes}
            title={title}
            titleClassName="md:min-h-[3.5rem]"
            excerpt={problem.excerpt}
            headingAs={headingAs}
            headerTrailing={
                <Badge
                    text={problem.difficulty}
                    variant={difficultyVariant}
                    size="sm"
                />
            }
        />
    );
}
