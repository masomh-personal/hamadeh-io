import Image from "next/image";
import {
    HiAcademicCap,
    HiChip,
    HiCode,
    HiLightningBolt,
    HiUser,
} from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageSection } from "@/components/layout/PageSection";

const SECTION_DIVIDER = "my-3 border-b border-surface-outline/80";

export default function AboutPage() {
    return (
        <PageContainer>
            <PageHeader
                avatar={
                    <Image
                        src="/images/about.jpg"
                        alt="Masom Hamadeh"
                        width={160}
                        height={160}
                        className="size-32 rounded-full object-cover sm:size-40"
                        sizes="(max-width: 640px) 128px, 160px"
                    />
                }
                title="About Me"
                description="I'm a full-stack software engineer based in Atlanta. I build production software for a living, write about engineering decisions and system design, and use this site to practice the craft in public. I care about maintainable systems, clear technical communication, and shipping things that hold up over time."
                descriptionClassName="max-w-4xl"
                showDivider
            />

            <PageSection className="grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiUser className="h-4 w-4 text-sky-300" />
                        Professional Snapshot
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <p className="text-content">
                        I specialize in full-stack web applications, RESTful API
                        design, and modern frontend systems using TypeScript,
                        React, Node.js, and Tailwind CSS, with Bun in my
                        workflow for runtime and tooling. I currently work as a
                        Senior Software Engineer at Stord on the Engage team,
                        building applications that power shipping, fulfillment,
                        and commerce workflows.
                    </p>
                </article>

                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiLightningBolt className="h-4 w-4 text-amber-300" />
                        Current Focus
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <p className="text-content">
                        Building maintainable full-stack systems at Stord while
                        writing about software engineering, system design, and
                        the decisions that shape how good software gets made.
                        I&apos;m also working toward my M.S. in Software
                        Engineering and use this site to document what I learn
                        as I go.
                    </p>
                </article>
            </PageSection>

            <PageSection className="surface-card radius-card p-6">
                <h2 className="inline-flex items-center gap-2 font-bold text-white">
                    <HiCode className="h-4 w-4 text-emerald-300" />
                    Experience Highlights
                </h2>
                <div className={SECTION_DIVIDER} />
                <div className="mt-4 space-y-5">
                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Senior Software Engineer, Stord
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            March 2026 - Present
                        </p>
                        <p className="text-content mt-2">
                            On the Engage team, building full-stack applications
                            with TypeScript, React, and Tailwind CSS that power
                            shipping, fulfillment, and upselling workflows
                            across the Stord product ecosystem.
                        </p>
                    </article>

                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Senior Software Engineer, Converse (Nike)
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            May 2025 - February 2026
                        </p>
                        <p className="text-content mt-2">
                            Transitioned into a technical lead role for a team
                            of 4 engineers, supporting sprint planning, backlog
                            refinement, and code reviews while staying hands-on.
                            Contributed to the DDS component library (30+
                            components in Storybook), translated functional
                            specs into technical specifications and API
                            contracts, and built customer-facing commerce
                            features with React, TypeScript, and Salesforce
                            Commerce Cloud (PWA Kit). Authored content schemas
                            in Amplience CMS, integrated RESTful APIs for
                            commerce workflows, and supported CI/CD with GitHub
                            Actions and Jenkins.
                        </p>
                    </article>

                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Freelance Software Engineer, MHDesigns
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            February 2022 - May 2025
                        </p>
                        <p className="text-content mt-2">
                            Built full-stack applications with TypeScript,
                            React, Next.js, Supabase, Appwrite, and Tailwind
                            CSS. Adopted Bun as the primary runtime and test
                            runner on personal projects. Helped early-stage
                            teams reduce technical debt through Agile workflows
                            and modularized legacy codebases. Refactored CPaaS
                            API integrations with database indexing and endpoint
                            optimization.
                        </p>
                    </article>

                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Software Engineer I, Uber Technologies (via
                            Routematch acquisition)
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            October 2020 - February 2022
                        </p>
                        <p className="text-content mt-2">
                            Retained through Uber&apos;s acquisition of
                            Routematch and supported integration efforts across
                            teams serving transit agencies. Contributed to the
                            migration of 3 legacy monoliths to service-oriented
                            architecture using Node.js and JavaScript. Built
                            RESTful APIs and internal tools for transit routing
                            and scheduling, maintained Angular and Vue
                            applications, increased unit and API test coverage
                            by 15% with Mocha, Chai, and Postman, and
                            participated in on-call response for 24/7 transit
                            operations.
                        </p>
                    </article>

                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Software Engineer, Routematch (Acquired by Uber)
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            October 2018 - October 2020
                        </p>
                        <p className="text-content mt-2">
                            Developed RESTful APIs with Node.js and Express,
                            modernizing legacy integrations for transit
                            platforms. Maintained Vue and AngularJS web apps.
                            Wrote PostgreSQL queries and stored procedures.
                            Contributed to microservices architecture with
                            Docker.
                        </p>
                    </article>

                    <article>
                        <h3 className="flex items-center gap-2 font-semibold text-white">
                            <span
                                aria-hidden="true"
                                className="inline-block h-2 w-2 rounded-full bg-sky-300/70"
                            />
                            Associate Software Engineer, Connecture/DRX
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            October 2012 - February 2017
                        </p>
                        <p className="text-content mt-2">
                            Began professional software engineering career
                            supporting healthcare web applications for insurance
                            enrollment and benefits management.
                        </p>
                    </article>
                </div>
            </PageSection>

            <PageSection className="grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiAcademicCap className="h-4 w-4 text-sky-300" />
                        Education
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <ul className="text-content mt-3 space-y-2">
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-300/70"
                            />
                            <span>
                                <strong>M.S. Software Engineering</strong> (in
                                progress, expected December 2027), Kennesaw
                                State University
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-300/70"
                            />
                            <span>
                                <strong>
                                    M.S. Management Information Systems
                                </strong>
                                , Kennesaw State University (May 2024, GPA 4.0),
                                including Graduate Certificate in Information
                                Security and Assurance
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-300/70"
                            />
                            <span>
                                <strong>B.S. Computer Science</strong>, Kennesaw
                                State University (May 2010)
                            </span>
                        </li>
                    </ul>
                </article>

                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiChip className="h-4 w-4 text-emerald-300" />
                        Technical Strengths
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <ul className="text-content mt-3 space-y-2">
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-300/70"
                            />
                            <span>
                                <strong>Languages:</strong> TypeScript,
                                JavaScript, SQL, Python, Lua
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-300/70"
                            />
                            <span>
                                <strong>Runtimes & Frameworks:</strong> Node.js,
                                Bun, React, Next.js, Express, Vue
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-300/70"
                            />
                            <span>
                                <strong>Systems:</strong> REST API design,
                                PostgreSQL, Supabase, Appwrite, Docker, GitHub
                                Actions, Jenkins
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-300/70"
                            />
                            <span>
                                <strong>Testing:</strong> Vitest, bun:test,
                                Jest, Mocha, Chai
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span
                                aria-hidden="true"
                                className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-300/70"
                            />
                            <span>
                                <strong>Workflow:</strong> spec-driven
                                development, AI-assisted engineering (Cursor,
                                Copilot, Claude) as copilot, Jira, Confluence,
                                Agile/Scrum
                            </span>
                        </li>
                    </ul>
                </article>
            </PageSection>
        </PageContainer>
    );
}
