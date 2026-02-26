import Image from "next/image";
import {
    HiCode,
    HiCollection,
    HiDocumentText,
    HiExternalLink,
    HiUser,
} from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button, Card } from "@/components/ui";
import { hasResumePdf, RESUME_PUBLIC_PATH } from "@/lib/resume";

export default function Home(): React.ReactElement {
    const showResumeButton = hasResumePdf();

    return (
        <PageContainer>
            <PageSection className="grid gap-8 md:grid-cols-[1fr_260px] md:items-center">
                <div>
                    <h1 className="text-center font-extrabold leading-tight text-white md:text-left">
                        Hi! I&apos;m Masom.
                        <br />I love building thoughtful software.
                    </h1>
                    <p className="text-content mt-4 max-w-2xl md:text-lg">
                        This is my portfolio and engineering workspace. I use it
                        to share real projects, break down coding problems,
                        document what I&apos;m learning through blog posts, and
                        build a component library from scratch. It&apos;s where
                        I practice writing clearer requirements, turning them
                        into explicit specs, and making system design decisions
                        that help teams build software on strong foundations
                        that lasts over time.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        {showResumeButton && (
                            <Button
                                href={RESUME_PUBLIC_PATH}
                                variant="secondary"
                                size="md"
                                icon={<HiExternalLink />}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </Button>
                        )}
                        <Button href="/problems" size="md">
                            View Code Problems
                        </Button>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-[240px]">
                    <div className="shadow-elevated overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-900/60 p-2">
                        <Image
                            src="/images/avatar_prof.jpg"
                            alt="Masom profile photo"
                            width={480}
                            height={480}
                            className="h-auto w-full rounded-xl object-cover"
                            priority
                        />
                    </div>
                </div>
            </PageSection>

            <PageSection>
                <h2 className="font-bold text-white">About Me</h2>
                <div className="surface-card radius-card mt-4 p-5">
                    <p className="text-content">
                        I&apos;m a full-stack engineer who enjoys building with
                        others at the intersection of business and code. My
                        background includes Computer Science, a Master&apos;s in
                        Information Systems, and I&apos;m currently pursuing a
                        second Master&apos;s in Software Engineering because I
                        genuinely never want to stop learning.
                    </p>
                    <p className="text-content mt-3">
                        I love the craft of building software, but I&apos;ve
                        learned that great products come from more than just
                        great code. They come from clear communication, good
                        judgment on tradeoffs, and teams that trust each other.
                        Those are the skills I invest in just as much as the
                        technical ones.
                    </p>
                    <p className="text-content-muted mt-3">
                        AI is changing how we write code, and I think that makes
                        the human side even more important: strategy, context,
                        and knowing what to build and why. I care about helping
                        teams make thoughtful technical decisions. I&apos;m
                        still early in my architecture and tech lead journey,
                        and this site is where I practice that growth in the
                        open.
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            href="/blog"
                            variant="secondary"
                            size="sm"
                            icon={<HiDocumentText />}
                        >
                            Read my blog
                        </Button>
                        <Button
                            href="/about"
                            variant="tertiary"
                            size="sm"
                            icon={<HiUser />}
                        >
                            Learn more about me
                        </Button>
                    </div>
                </div>
            </PageSection>

            <PageSection>
                <h2 className="font-bold text-white">
                    What&apos;s On This Site
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <Card
                        title="Code Problems"
                        subtitle="Problem breakdowns, patterns, and complexity insights."
                        icon={<HiCode className="h-4 w-4 text-primary" />}
                        className="min-h-56"
                        actions={[
                            { label: "Explore problems", href: "/problems" },
                        ]}
                    >
                        <p>
                            Practice-focused writeups with clear tradeoffs and
                            complexity analysis.
                        </p>
                    </Card>

                    <Card
                        title="Blog"
                        subtitle="Engineering notes, lessons learned, and build logs."
                        icon={
                            <HiDocumentText className="h-4 w-4 text-secondary" />
                        }
                        className="min-h-56"
                        actions={[{ label: "Read posts", href: "/blog" }]}
                    >
                        <p>
                            Short technical posts about implementation choices
                            and iteration.
                        </p>
                    </Card>

                    <Card
                        title="Components"
                        subtitle="A live gallery of reusable UI components and design tweaks."
                        icon={
                            <HiCollection className="h-4 w-4 text-tertiary" />
                        }
                        className="min-h-56"
                        actions={[
                            { label: "Open showcase", href: "/components" },
                        ]}
                    >
                        <p>
                            UI primitives and wrappers that evolve with
                            practical design feedback.
                        </p>
                    </Card>
                </div>
            </PageSection>
        </PageContainer>
    );
}
