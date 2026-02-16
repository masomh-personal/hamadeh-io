import Image from "next/image";
import { HiCode, HiCollection, HiDocumentText, HiUser } from "react-icons/hi";
import { Button, Card, Link } from "@/components/ui";

export default function Home(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-10 md:space-y-16 md:py-14">
            <section className="grid gap-8 md:grid-cols-[1fr_260px] md:items-center">
                <div>
                    <p className="mb-3 inline-flex rounded-md border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
                        ThoughtfulCode Portfolio
                    </p>
                    <h1 className="font-extrabold leading-tight text-white">
                        Hi, I&apos;m Masom.
                        <br />I build thoughtful software.
                    </h1>
                    <p className="text-content mt-4 max-w-2xl md:text-lg">
                        This site is my engineering workspace where I document
                        problem solving, ship reusable UI, and write practical
                        notes on building maintainable software.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Button href="/leetcode" size="md">
                            View LeetCode Solutions
                        </Button>
                        <Button href="/resume" variant="secondary" size="md">
                            View Resume
                        </Button>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-[240px]">
                    <div className="overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-900/60 p-2 shadow-[0_10px_35px_rgba(2,6,23,0.45)]">
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
                <h2 className="font-bold text-white">Quick Intro</h2>
                <p className="text-content mt-3 max-w-3xl">
                    I&apos;m a full-stack engineer focused on clean
                    architecture, practical UX, and steady iteration. I use this
                    portfolio to show not just finished outcomes, but how I
                    think through tradeoffs and improve systems over time.
                </p>
            </section>

            <section>
                <h2 className="font-bold text-white">
                    What&apos;s On This Site
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <Card variant="secondary">
                        <div className="pb-3">
                            <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-100">
                                <HiCode className="h-4 w-4 text-sky-300" />
                                LeetCode Solutions
                            </h3>
                            <p className="text-content-muted">
                                Problem breakdowns, patterns, and complexity
                                insights.
                            </p>
                        </div>
                        <div className="text-content pt-3">
                            <Link href="/leetcode">Explore solutions</Link>
                        </div>
                    </Card>

                    <Card variant="secondary">
                        <div className="pb-3">
                            <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-100">
                                <HiDocumentText className="h-4 w-4 text-emerald-300" />
                                Blog
                            </h3>
                            <p className="text-content-muted">
                                Engineering notes, lessons learned, and build
                                logs.
                            </p>
                        </div>
                        <div className="text-content pt-3">
                            <Link href="/blog">Read posts</Link>
                        </div>
                    </Card>

                    <Card variant="secondary">
                        <div className="pb-3">
                            <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-100">
                                <HiCollection className="h-4 w-4 text-amber-300" />
                                Components
                            </h3>
                            <p className="text-content-muted">
                                A live gallery of reusable UI components and
                                design tweaks.
                            </p>
                        </div>
                        <div className="text-content pt-3">
                            <Link href="/components">Open showcase</Link>
                        </div>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="font-bold text-white">Current Focus</h2>
                <div className="surface-card mt-4 rounded-xl p-5">
                    <p className="text-content">
                        I&apos;m currently building the foundation of this
                        portfolio: reusable UI wrappers, structured problem
                        content, and a clean developer workflow with Bun +
                        Biome.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/about"
                            variant="muted"
                            className="inline-flex items-center gap-1"
                        >
                            <HiUser className="h-4 w-4" />
                            Learn more about me
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
