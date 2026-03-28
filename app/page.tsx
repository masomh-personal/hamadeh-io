import Image from "next/image";
import { HiCode, HiCollection, HiDocumentText, HiUser } from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button, Card } from "@/components/ui";

export default function Home() {
    return (
        <PageContainer>
            <PageSection className="grid gap-8 md:grid-cols-[1fr_260px] md:items-center">
                <div>
                    <h1 className="text-center font-extrabold leading-tight text-white md:text-left">
                        Hi! I&apos;m Masom.
                        <br />I love building thoughtful software.
                    </h1>
                    <p className="text-content mt-4 max-w-2xl md:text-lg">
                        This is my personal portfolio and engineering site. I
                        use it to write about software design, share technical
                        decisions, document what I&apos;m building and learning,
                        and work through coding problems with depth and honesty.
                        It&apos;s where I practice the craft in the open.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Button
                            href="/blog"
                            size="md"
                            icon={<HiDocumentText />}
                        >
                            Read the blog
                        </Button>
                        <Button href="/problems" size="md" variant="secondary">
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
                        I&apos;m a full-stack software engineer at Stord,
                        working on the Engage team to build applications that
                        power shipping, fulfillment, and commerce workflows. My
                        background spans Computer Science, a Master&apos;s in
                        Information Systems, and I&apos;m currently working
                        toward a second Master&apos;s in Software Engineering.
                    </p>
                    <p className="text-content mt-3">
                        I care deeply about the craft of building software:
                        clear system design, honest technical communication, and
                        shipping things that hold up. Great products come from
                        more than just good code. They come from good judgment
                        on tradeoffs, clear requirements, and teams that
                        communicate well.
                    </p>
                    <p className="text-content-muted mt-3">
                        AI is changing how we write code, and I think that makes
                        the human side more important: knowing what to build,
                        why it matters, and how to make the right call at the
                        right time. I use AI as a copilot, not an autopilot, and
                        this site is where I document that work in public.
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
                            Deep dives into algorithms, patterns, and complexity
                            with honest tradeoff analysis.
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
