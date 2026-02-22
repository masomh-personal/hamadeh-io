import Image from "next/image";
import {
    HiAcademicCap,
    HiChip,
    HiCode,
    HiExternalLink,
    HiLightningBolt,
    HiUser,
} from "react-icons/hi";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui";
import { hasResumePdf, RESUME_PUBLIC_PATH } from "@/lib/resume";

const SECTION_DIVIDER = "my-3 border-b border-surface-outline/80";

export default function AboutPage(): React.ReactElement {
    const showResumeButton = hasResumePdf();

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
                description="I'm a full-stack software engineer based in Atlanta. I build maintainable systems, translate business requirements into technical plans, and ship production features end-to-end. Committed to spec-driven development with AI as a copilot, not an autopilot—maintaining engineering fundamentals and human oversight throughout."
                descriptionClassName="max-w-4xl"
                actions={
                    showResumeButton ? (
                        <Button
                            href={RESUME_PUBLIC_PATH}
                            variant="secondary"
                            icon={<HiExternalLink />}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center whitespace-nowrap"
                        >
                            View Full Resume
                        </Button>
                    ) : undefined
                }
            />

            <section className="mb-6 grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiUser className="h-4 w-4 text-sky-300" />
                        Professional Snapshot
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <p className="text-content">
                        I specialize in RESTful APIs, backend systems, and
                        modern web applications using TypeScript, Node.js, and
                        React. I serve as a Senior Software Engineer at Converse
                        (Nike), where I recently stepped into a technical lead
                        role for a team of 4, driving sprint planning, backlog
                        refinement, and technical specification across
                        customer-facing commerce features.
                    </p>
                </article>

                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiLightningBolt className="h-4 w-4 text-amber-300" />
                        Current Focus
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <p className="text-content">
                        I&apos;m focused on building systems that scale in both
                        performance and maintainability: component libraries and
                        Storybook-driven design, clear API contracts, practical
                        CI/CD discipline, and technical specifications that help
                        teams move faster with less ambiguity.
                    </p>
                </article>
            </section>

            <section className="surface-card radius-card mb-6 p-6">
                <h2 className="inline-flex items-center gap-2 font-bold text-white">
                    <HiCode className="h-4 w-4 text-emerald-300" />
                    Experience Highlights
                </h2>
                <div className={SECTION_DIVIDER} />
                <div className="mt-4 space-y-5">
                    <article>
                        <h3 className="font-semibold text-white">
                            Senior Software Engineer, Converse (Nike)
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            May 2025 - Present
                        </p>
                        <p className="text-content mt-2">
                            Technical lead for a team of 4 engineers, driving
                            sprint planning, backlog refinement, and code
                            reviews while remaining hands-on. Leads development
                            of the DDS component library (30+ components in
                            Storybook). Translates functional specs into
                            technical specifications, data models, and API
                            contracts. Builds customer-facing commerce features
                            with React, TypeScript, and Salesforce Commerce
                            Cloud (PWA Kit). Authors content schemas in
                            Amplience CMS, integrates RESTful APIs for commerce
                            workflows, and supports CI/CD with GitHub Actions
                            and Jenkins.
                        </p>
                    </article>

                    <article>
                        <h3 className="font-semibold text-white">
                            Software Engineer I, Uber Technologies (via
                            Routematch acquisition)
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            October 2020 - February 2022
                        </p>
                        <p className="text-content mt-2">
                            Retained through Uber&apos;s acquisition of
                            Routematch. Migrated 3 legacy monoliths to
                            service-oriented architecture using Node.js and
                            JavaScript. Built RESTful APIs and internal tools
                            for transit routing and scheduling. Maintained web
                            apps in Angular and Vue. Increased unit and API test
                            coverage by 15% with Mocha, Chai, and Postman.
                            Participated in on-call incident response for 24/7
                            transit operations.
                        </p>
                    </article>

                    <article>
                        <h3 className="font-semibold text-white">
                            Freelance Software Engineer, MHDesigns
                        </h3>
                        <p className="text-content-muted text-sm italic">
                            February 2022 - May 2025
                        </p>
                        <p className="text-content mt-2">
                            Built full-stack applications with TypeScript,
                            React, Next.js, Supabase, Appwrite, and Tailwind
                            CSS. Adopted Bun as primary runtime and test runner.
                            Reduced technical debt for early-stage companies via
                            Agile workflows and modularized legacy codebases.
                            Refactored CPaaS API integrations with database
                            indexing and endpoint optimization.
                        </p>
                    </article>

                    <article>
                        <h3 className="font-semibold text-white">
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
                        <h3 className="font-semibold text-white">
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
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                <article className="surface-card radius-card p-5">
                    <h2 className="inline-flex items-center gap-2 font-bold text-white">
                        <HiAcademicCap className="h-4 w-4 text-sky-300" />
                        Education
                    </h2>
                    <div className={SECTION_DIVIDER} />
                    <ul className="text-content mt-3 space-y-2">
                        <li>
                            <strong>M.S. Software Engineering</strong> (in
                            progress, expected December 2027), Kennesaw State
                            University
                        </li>
                        <li>
                            <strong>M.S. Management Information Systems</strong>
                            , Kennesaw State University (May 2024, GPA 4.0),
                            including Graduate Certificate in Information
                            Security and Assurance
                        </li>
                        <li>
                            <strong>B.S. Computer Science</strong>, Kennesaw
                            State University (May 2010)
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
                        <li>
                            <strong>Languages:</strong> TypeScript, JavaScript,
                            SQL, Python, Lua
                        </li>
                        <li>
                            <strong>Runtimes & Frameworks:</strong> Node.js,
                            Bun, React, Next.js, Express, Vue
                        </li>
                        <li>
                            <strong>Systems:</strong> REST API design,
                            PostgreSQL, Supabase, Appwrite, Amplience CMS,
                            Docker, GitHub Actions, Jenkins
                        </li>
                        <li>
                            <strong>Testing:</strong> Vitest, bun:test, Jest,
                            Mocha, Chai
                        </li>
                        <li>
                            <strong>Workflow:</strong> spec-driven development,
                            AI-assisted engineering (Cursor, Copilot, Claude) as
                            copilot, Jira, Confluence, Agile/Scrum
                        </li>
                    </ul>
                </article>
            </section>
        </PageContainer>
    );
}
