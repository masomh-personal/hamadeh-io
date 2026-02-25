import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiCode } from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import { Badge, Button } from "@/components/ui";
import {
    getPublishedProblemBySlug,
    listPublishedProblems,
} from "@/lib/content/problems";
import { formatPublishedDate } from "@/lib/date";

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface ProblemSectionContent {
    problemParagraphs: string[];
    remainingContent: string;
}

function getProblemSectionContent(content: string): ProblemSectionContent {
    const problemHeaderRegex = /^# Problem\s*$/m;
    const headerMatch = problemHeaderRegex.exec(content);

    if (!headerMatch || headerMatch.index === undefined) {
        return {
            problemParagraphs: [],
            remainingContent: content,
        };
    }

    const sectionStart = headerMatch.index + headerMatch[0].length;
    const remainingSectionsRegex = /^##\s+/m;
    const remainingMatch = remainingSectionsRegex.exec(
        content.slice(sectionStart)
    );
    const sectionEnd =
        remainingMatch && remainingMatch.index !== undefined
            ? sectionStart + remainingMatch.index
            : content.length;

    const problemSectionRaw = content.slice(sectionStart, sectionEnd).trim();
    const remainingContent = content.slice(sectionEnd).trim();
    const problemParagraphs = problemSectionRaw
        .split(/\n\s*\n/)
        .map((paragraph) =>
            paragraph.replaceAll("`", "").replace(/\s+/g, " ").trim()
        )
        .filter((paragraph) => paragraph.length > 0);

    return {
        problemParagraphs,
        remainingContent,
    };
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const problems = await listPublishedProblems();
    return problems.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const problem = await getPublishedProblemBySlug(slug);
        return {
            title: `${problem.title} | hamadeh.io`,
            description: problem.excerpt,
        };
    } catch {
        return {
            title: "Problem Not Found | hamadeh.io",
        };
    }
}

export default async function ProblemPostPage({
    params,
}: PageProps): Promise<React.ReactElement> {
    const { slug } = await params;

    let problem: Awaited<ReturnType<typeof getPublishedProblemBySlug>>;
    try {
        problem = await getPublishedProblemBySlug(slug);
    } catch {
        notFound();
    }
    const difficultyVariant = `leetcode-${problem.difficulty}` as const;
    const sourceLabel =
        problem.source === "leetcode"
            ? "LeetCode"
            : problem.source === "dsa"
              ? "DSA"
              : "Custom";
    const { problemParagraphs, remainingContent } = getProblemSectionContent(
        problem.content
    );

    return (
        <PageContainer>
            <article className="surface-card radius-card card-chrome p-6 md:p-10">
                <header>
                    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <Badge
                            text={problem.difficulty}
                            variant={difficultyVariant}
                            size="sm"
                        />
                        <span className="text-content-subtle inline-flex items-center gap-1.5 text-xs uppercase tracking-wide">
                            <HiCode
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-sky-300"
                            />
                            <span>Source: {sourceLabel}</span>
                        </span>
                        <span
                            className="text-content-subtle text-xs"
                            aria-hidden="true"
                        >
                            |
                        </span>
                        <span className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                            {formatPublishedDate(problem.datePublished)}
                        </span>
                        <Button
                            href="/problems"
                            variant="secondary"
                            size="xs"
                            icon={<HiArrowLeft className="h-3.5 w-3.5" />}
                            iconPosition="left"
                            enforceMinWidth={false}
                            className="mt-3 basis-full justify-center px-4 sm:mt-0 sm:ml-auto sm:basis-auto sm:justify-start sm:px-3"
                        >
                            Back to Problems
                        </Button>
                    </div>

                    <div className="mt-4 pb-3">
                        <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
                            <div>
                                <h1 className="font-heading inline-block text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    {problem.title}
                                </h1>
                                <div className="mt-3 space-y-4">
                                    {problemParagraphs.map((paragraph) => (
                                        <p
                                            key={paragraph}
                                            className="text-content-subtle text-base leading-7"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-surface-outline/60 pt-4 md:flex md:flex-col md:justify-center md:border-t-0 md:border-l md:pl-5 md:pt-0">
                                <div>
                                    <p className="text-content-subtle text-xs uppercase tracking-wide">
                                        Time Complexity
                                    </p>
                                    <p className="text-content mt-2 text-xl font-bold">
                                        {problem.timeComplexity}
                                    </p>
                                </div>
                                <div className="mt-5 border-t border-surface-outline/60 pt-5">
                                    <p className="text-content-subtle text-xs uppercase tracking-wide">
                                        Space Complexity
                                    </p>
                                    <p className="text-content mt-2 text-xl font-bold">
                                        {problem.spaceComplexity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {remainingContent.length > 0 ? (
                    <RichMarkdownContent content={remainingContent} />
                ) : null}
            </article>
        </PageContainer>
    );
}
