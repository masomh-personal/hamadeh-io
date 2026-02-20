import {
    HiAcademicCap,
    HiChip,
    HiCode,
    HiLightningBolt,
    HiUser,
} from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@/components/ui";

export default function AboutPage(): React.ReactElement {
    return (
        <PageContainer>
            <PageHeader
                title="About Me"
                description="I'm a full-stack software engineer based in Atlanta. I build maintainable systems, lead with clarity, and bridge product goals with practical engineering execution. This portfolio reflects how I think, ship, and continuously raise quality over time."
                descriptionClassName="max-w-4xl"
            />

            <section className="mb-6 grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiUser className="h-4 w-4 text-sky-300" />
                        Professional Snapshot
                    </h2>
                    <p className="text-content mt-3">
                        I specialize in API architecture, backend systems, and
                        modern web applications. I currently serve as a Senior
                        Software Engineer at Converse (Nike), where I lead a
                        small team and help shape implementation strategy across
                        customer-facing commerce features.
                    </p>
                </article>

                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiLightningBolt className="h-4 w-4 text-amber-300" />
                        Current Focus
                    </h2>
                    <p className="text-content mt-3">
                        I&apos;m focused on building systems that scale in both
                        performance and maintainability: reusable UI patterns,
                        clear API contracts, practical CI/CD discipline, and
                        documentation that helps teams move faster with less
                        ambiguity.
                    </p>
                </article>
            </section>

            <section className="surface-card radius-card mb-6 p-6">
                <h2 className="inline-flex items-center gap-2 font-bold text-white">
                    <HiCode className="h-4 w-4 text-emerald-300" />
                    Experience Highlights
                </h2>
                <div className="mt-4 space-y-5">
                    <article>
                        <h3 className="font-semibold text-white">
                            Senior Software Engineer, Converse (Nike)
                        </h3>
                        <p className="text-content-muted text-sm">
                            May 2025 - Present
                        </p>
                        <p className="text-content mt-2">
                            Technical lead for a team of 4 engineers, driving
                            sprint planning, backlog refinement, and technical
                            decision making. I translate functional
                            specifications into implementation-ready technical
                            plans, and lead development across React,
                            TypeScript, and Salesforce Commerce Cloud (PWA Kit)
                            product lines.
                        </p>
                    </article>

                    <article>
                        <h3 className="font-semibold text-white">
                            Software Engineer I, Uber Technologies (via
                            Routematch acquisition)
                        </h3>
                        <p className="text-content-muted text-sm">
                            October 2020 - February 2022
                        </p>
                        <p className="text-content mt-2">
                            Contributed to migrating 3 legacy monoliths toward
                            service-oriented architecture using Node.js and
                            modern JavaScript. Built APIs and internal tools for
                            transit operations, increased test coverage by 15%,
                            and supported incident response for 24/7 critical
                            systems.
                        </p>
                    </article>

                    <article>
                        <h3 className="font-semibold text-white">
                            Freelance Software Engineer, MHDesigns
                        </h3>
                        <p className="text-content-muted text-sm">
                            February 2022 - May 2025
                        </p>
                        <p className="text-content mt-2">
                            Designed and delivered full-stack applications while
                            completing graduate studies. Reduced technical debt
                            for early-stage companies, improved API integration
                            performance, and introduced structured Agile
                            execution with clearer technical documentation.
                        </p>
                    </article>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiAcademicCap className="h-4 w-4 text-sky-300" />
                        Education
                    </h2>
                    <ul className="text-content mt-3 space-y-2">
                        <li>
                            M.S. Software Engineering (in progress, expected
                            2027), Kennesaw State University
                        </li>
                        <li>
                            M.S. Management Information Systems, Kennesaw State
                            University (2024, GPA 4.0)
                        </li>
                        <li>
                            B.S. Computer Science, Kennesaw State University
                            (2010)
                        </li>
                    </ul>
                </article>

                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiChip className="h-4 w-4 text-emerald-300" />
                        Technical Strengths
                    </h2>
                    <ul className="text-content mt-3 space-y-2">
                        <li>Languages: JavaScript, TypeScript, Python, SQL</li>
                        <li>
                            Frameworks: Node.js, Express, React, Vue, Next.js
                        </li>
                        <li>
                            Systems: REST API design, PostgreSQL/Supabase,
                            CI/CD, Docker
                        </li>
                        <li>
                            Workflow: spec-driven planning, clear technical
                            documentation, pragmatic execution
                        </li>
                    </ul>
                </article>
            </section>

            <div className="mt-6">
                <Link
                    href="/resume"
                    variant="secondary"
                    className="inline-flex items-center"
                >
                    View Full Resume
                </Link>
            </div>
        </PageContainer>
    );
}
