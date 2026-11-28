import { createFileRoute, notFound } from "@tanstack/react-router";
import { HiArrowLeft, HiDocumentText } from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import { Badge, Button } from "@/components/ui";
import { formatReadingTime } from "@/lib/reading-time";
import { absoluteUrl, AUTHOR_NAME, buildPageHead } from "@/lib/site";
import { hasProblemSlug, loadProblemDetailData } from "@/src/data/content";
import { NotFoundContent } from "../__root";

export const Route = createFileRoute("/problems/$slug")({
    beforeLoad: ({ params }) => {
        if (!hasProblemSlug(params.slug)) {
            throw notFound();
        }
    },
    loader: ({ params }) => loadProblemDetailData(params.slug),
    head: ({ loaderData }) => {
        if (!loaderData) {
            return {};
        }
        const { problem } = loaderData;
        return buildPageHead({
            title: problem.title,
            description: problem.excerpt,
            path: `/problems/${problem.slug}`,
            ogImage: `/problems/${problem.slug}/opengraph-image.png`,
            ogAlt: problem.title,
            ogType: "article",
        });
    },
    component: ProblemPostPage,
});

function ProblemPostPage(): React.ReactElement {
    const data = Route.useLoaderData();
    if (!data) {
        return <NotFoundContent />;
    }
    const { problem, problemHtml, remainingHtml, wordCount } = data;
    const difficultyVariant = `leetcode-${problem.difficulty}` as const;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: problem.title,
        description: problem.excerpt,
        inLanguage: "en-US",
        wordCount,
        image: absoluteUrl(`/problems/${problem.slug}/opengraph-image.png`),
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
                                {problemHtml.length > 0 ? (
                                    <div className="problem-post-intro mt-3">
                                        <RichMarkdownContent
                                            html={problemHtml}
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

                {remainingHtml.length > 0 ? (
                    <div className="problem-post-content">
                        <RichMarkdownContent html={remainingHtml} />
                    </div>
                ) : null}
            </article>
        </PageContainer>
    );
}
