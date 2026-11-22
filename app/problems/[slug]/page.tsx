import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiDocumentText } from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import { Badge, Button } from "@/components/ui";
import {
    getPublishedProblemBySlug,
    isContentNotFoundError,
    listPublishedProblems,
} from "@/lib/content/problems";
import { splitProblemSections } from "@/lib/problem-markdown";
import { formatReadingTime } from "@/lib/reading-time";
import { absoluteUrl, AUTHOR_NAME, SITE_NAME } from "@/lib/site";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

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
        const canonicalPath = `/problems/${problem.slug}`;

        return {
            title: problem.title,
            description: problem.excerpt,
            alternates: {
                canonical: canonicalPath,
            },
            openGraph: {
                type: "article",
                url: canonicalPath,
                siteName: SITE_NAME,
                title: problem.title,
                description: problem.excerpt,
                authors: [AUTHOR_NAME],
            },
            twitter: {
                card: "summary_large_image",
                title: problem.title,
                description: problem.excerpt,
            },
        };
    } catch (error) {
        if (!isContentNotFoundError(error)) {
            throw error;
        }
        return {
            title: "Problem Not Found",
            robots: {
                index: false,
                follow: false,
            },
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
    } catch (error) {
        if (isContentNotFoundError(error)) {
            notFound();
        }
        throw error;
    }
    const difficultyVariant = `leetcode-${problem.difficulty}` as const;
    const { problemContent, remainingContent } = splitProblemSections(
        problem.content
    );
    const wordCount = problem.content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: problem.title,
        description: problem.excerpt,
        inLanguage: "en-US",
        wordCount,
        image: absoluteUrl(`/problems/${problem.slug}/opengraph-image`),
        proficiencyLevel: problem.difficulty,
        author: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
        publisher: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
        mainEntityOfPage: absoluteUrl(`/problems/${problem.slug}`),
        url: absoluteUrl(`/problems/${problem.slug}`),
    };

    return (
        <PageContainer>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <article className="surface-card radius-card card-chrome p-6 md:p-10">
                <header>
                    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-content-subtle inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide">
                            <HiDocumentText
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 text-sky-300"
                            />
                            <span>
                                {formatReadingTime(problem.readingTimeMinutes)}
                            </span>
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
                                <div className="inline-flex items-center gap-3">
                                    <h1 className="font-heading inline-block text-xl font-bold tracking-tight text-white md:text-2xl">
                                        {problem.title}
                                    </h1>
                                    <Badge
                                        text={problem.difficulty}
                                        variant={difficultyVariant}
                                        size="sm"
                                    />
                                </div>
                                {problemContent.length > 0 ? (
                                    <div className="problem-post-intro mt-3">
                                        <RichMarkdownContent
                                            content={problemContent}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            <div className="border-t border-surface-outline/60 pt-4 md:flex md:flex-col md:justify-center md:border-t-0 md:border-l md:pl-5 md:pt-0">
                                <div>
                                    <p className="text-content-subtle text-xs uppercase tracking-wide opacity-75">
                                        Time Complexity
                                    </p>
                                    <p className="text-content mt-2 text-xl font-bold">
                                        {problem.timeComplexity}
                                    </p>
                                </div>
                                <div className="mt-5 border-t border-surface-outline/60 pt-5">
                                    <p className="text-content-subtle text-xs uppercase tracking-wide opacity-75">
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
                    <div className="problem-post-content">
                        <RichMarkdownContent content={remainingContent} />
                    </div>
                ) : null}
            </article>
        </PageContainer>
    );
}
