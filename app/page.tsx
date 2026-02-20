import Image from "next/image";
import { HiCode, HiCollection, HiDocumentText, HiUser } from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button, Card } from "@/components/ui";

export default function Home(): React.ReactElement {
    return (
        <PageContainer className="space-y-10 md:space-y-12">
            <section className="grid gap-8 md:grid-cols-[1fr_260px] md:items-center">
                <div>
                    <h1 className="font-extrabold leading-tight text-white">
                        Hi! I&apos;m Masom.
                        <br />I love building thoughtful software.
                    </h1>
                    <p className="text-content mt-4 max-w-2xl md:text-lg">
                        This is my portfolio and engineering workspace. I use it
                        to showcase real projects, break down LeetCode problems,
                        share what I&apos;m learning through blog posts, and
                        build a component library from scratch. Everything here
                        reflects how I think about software: start with a clear
                        spec, keep it well-structured, and build it to last.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Button href="/resume" variant="secondary" size="md">
                            View Resume
                        </Button>
                        <Button href="/leetcode" size="md">
                            View LeetCode Solutions
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
            </section>

            <section>
                <h2 className="font-bold text-white">About Me</h2>
                <div className="surface-card radius-card mt-4 p-5">
                    <p className="text-content">
                        I&apos;m a full-stack engineer who&apos;s had the chance
                        to lead teams, mentor developers, and sit at the
                        intersection of business and code. I have a background
                        in Computer Science, a Master&apos;s in Information
                        Systems, and I&apos;m currently pursuing a second
                        Master&apos;s in Software Engineering because I
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
                        knowing what to build and why. I&apos;m working toward a
                        lead engineering role where I can stay hands-on with
                        architecture while bringing real business understanding
                        to technical decisions. This site is where I practice
                        all of it in the open.
                    </p>
                    <div className="mt-1 flex justify-end gap-3">
                        <Button href="/blog" variant="secondary" size="sm">
                            <HiDocumentText />
                            Read the blog
                        </Button>
                        <Button href="/about" variant="tertiary" size="sm">
                            <HiUser />
                            Learn more about me
                        </Button>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="font-bold text-white">
                    What&apos;s On This Site
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <Card
                        title="LeetCode Solutions"
                        subtitle="Problem breakdowns, patterns, and complexity insights."
                        icon={<HiCode className="h-4 w-4 text-sky-300" />}
                        className="min-h-56"
                        actions={[
                            { label: "Explore solutions", href: "/leetcode" },
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
                            <HiDocumentText className="h-4 w-4 text-emerald-300" />
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
                            <HiCollection className="h-4 w-4 text-amber-300" />
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
            </section>
        </PageContainer>
    );
}
