"use client";

import NextLink from "next/link";
import { useState } from "react";
import {
    HiArrowLeft,
    HiArrowRight,
    HiCheckCircle,
    HiChip,
    HiCode,
    HiCog,
    HiCollection,
    HiDocumentText,
    HiHome,
    HiRefresh,
} from "react-icons/hi";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import {
    Badge,
    Button,
    Card,
    Link,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui";

/**
 * Component showcase page for testing and iterating on UI components.
 * Visit /components to see all components and their variants.
 */
export default function ComponentsPage(): React.ReactElement {
    const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
    type ShowcaseBlogPost = Parameters<typeof BlogPostCard>[0]["post"];
    const triggerBaseClasses =
        "shrink-0 justify-center rounded-md border border-transparent px-3 py-1.5 text-sm data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300 hover:[&_svg.tab-trigger-icon]:text-sky-200 data-[state=active]:[&_svg.tab-trigger-icon]:text-sky-300 data-[state=active]:[&_span.tab-trigger-subtitle]:text-sky-100/80 md:relative md:w-full md:justify-start md:px-4 md:py-2 md:pl-5 md:text-left md:text-base md:before:pointer-events-none md:before:absolute md:before:left-2 md:before:top-1/2 md:before:h-6 md:before:w-1 md:before:-translate-y-1/2 md:before:rounded-full md:before:bg-sky-400 md:before:opacity-0 md:data-[state=active]:before:opacity-100 md:data-[state=active]:before:shadow-[0_0_8px_rgba(56,189,248,0.45)]";
    const showcaseSections = [
        {
            value: "button",
            label: "Button",
            subtitle: "Actions and states",
            icon: HiCog,
        },
        {
            value: "link",
            label: "Link",
            subtitle: "Navigation patterns",
            icon: HiArrowRight,
        },
        {
            value: "card",
            label: "Card",
            subtitle: "Content containers",
            icon: HiCollection,
        },
        {
            value: "badge",
            label: "Badge",
            subtitle: "Labels and status",
            icon: HiChip,
        },
        {
            value: "blog",
            label: "Blog",
            subtitle: "Cards and post meta",
            icon: HiDocumentText,
        },
        {
            value: "qa",
            label: "A11y QA",
            subtitle: "Keyboard and focus",
            icon: HiCheckCircle,
        },
    ] as const;

    const publishedBlogPost: ShowcaseBlogPost = {
        title: "Building the Blog Foundation (Markdown + Shiki)",
        slug: "building-blog-foundation-markdown-shiki",
        datePublished: "2026-02-18",
        status: "published",
        excerpt:
            "How I designed a clean blog architecture with Markdown-first content, premium syntax highlighting, and room to scale.",
        tags: ["engineering", "nextjs", "markdown"],
        content: "Sample markdown content for component showcase.",
        filePath: "content/blog/building-blog-foundation-markdown-shiki.md",
    };

    const draftBlogPost: ShowcaseBlogPost = {
        title: "Async Patterns in Modern TypeScript Services",
        slug: "async-patterns-modern-typescript-services",
        datePublished: "2026-02-20",
        status: "draft",
        excerpt:
            "Draft article exploring cancellation, timeouts, and error boundaries in async workflows.",
        tags: ["typescript", "backend", "async"],
        content: "Draft showcase content.",
        filePath: "content/blog/async-patterns-modern-typescript-services.md",
    };

    const handleSubmitDemo = (): void => {
        if (isSubmittingDemo) {
            return;
        }

        setIsSubmittingDemo(true);
    };

    return (
        <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <header className="mb-4">
                <h1 className="font-extrabold text-white">
                    Components Showcase
                </h1>
                <p className="text-content-muted mt-2">
                    This page is a living component lab for our UI system. We
                    use a wrapper-first approach: Radix primitives provide
                    accessible behavior and interaction patterns, while our own
                    components define styling, spacing, and visual identity. The
                    goal is to iterate quickly, validate UX and keyboard
                    behavior, and keep a clean, maintainable design system
                    without locking ourselves into heavy opinionated UI kits.
                </p>
                <Link
                    href="/"
                    variant="muted"
                    icon={<HiArrowLeft className="h-3.5 w-3.5" />}
                    iconPosition="left"
                    className="mt-4 inline-flex items-center whitespace-nowrap"
                >
                    Back to Home
                </Link>
            </header>

            <Tabs
                defaultValue="button"
                className="space-y-4 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:items-start md:gap-6 md:space-y-0"
            >
                <TabsList
                    aria-label="Component showcase sections"
                    className="flex w-full items-center gap-2 overflow-x-auto rounded-lg border border-slate-700/70 bg-slate-900/40 p-2 md:sticky md:top-20 md:h-auto md:self-start md:flex-col md:items-stretch md:justify-start md:gap-2 md:rounded-xl md:border md:border-slate-600/90 md:bg-linear-to-b md:from-slate-800/90 md:to-slate-900/90 md:p-3 md:shadow-[0_8px_20px_rgba(2,6,23,0.35)]"
                >
                    {showcaseSections.map((section) => (
                        <TabsTrigger
                            key={section.value}
                            value={section.value}
                            className={triggerBaseClasses}
                        >
                            <span className="flex flex-col items-start leading-tight">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                    <section.icon
                                        aria-hidden="true"
                                        className="tab-trigger-icon h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors duration-200"
                                    />
                                    {section.label}
                                </span>
                                <span className="tab-trigger-subtitle text-content-subtle hidden text-xs font-normal transition-colors duration-200 md:inline">
                                    {section.subtitle}
                                </span>
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div>
                    <TabsContent
                        value="button"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Button</h2>
                            <p className="text-content-muted mb-6">
                                Variants, sizing rhythm, action semantics, and
                                edge states.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Variants
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button>Primary</Button>
                                        <Button variant="secondary">
                                            Secondary
                                        </Button>
                                        <Button variant="tertiary">
                                            Tertiary
                                        </Button>
                                        <Button variant="outline">
                                            Outline
                                        </Button>
                                        <Button variant="danger">Danger</Button>
                                        <Button variant="danger-soft">
                                            Danger Soft
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Sizes
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button size="sm">Small</Button>
                                        <Button size="md">Medium</Button>
                                        <Button size="lg">Large</Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        With Icons
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button>
                                            <HiHome />
                                            Go Home
                                        </Button>
                                        <Button variant="secondary">
                                            Next
                                            <HiArrowRight />
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        As Link (href)
                                    </h3>
                                    <Button href="/">
                                        <HiHome />
                                        Link to Home
                                    </Button>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        As Child (Radix Slot)
                                    </h3>
                                    <Button asChild variant="secondary">
                                        <NextLink href="/resume">
                                            Open Resume
                                            <HiArrowRight />
                                        </NextLink>
                                    </Button>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Edge States
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button disabled>
                                            Disabled Action
                                        </Button>
                                        <Button variant="secondary" disabled>
                                            Disabled Secondary
                                        </Button>
                                        <Button
                                            variant="tertiary"
                                            className="max-w-[250px]"
                                        >
                                            Continue with very long confirmation
                                            label
                                        </Button>
                                        <Button
                                            variant="outline"
                                            enforceMinWidth={false}
                                            aria-label="Home"
                                            title="Home"
                                        >
                                            <HiHome />
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Loading States
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            variant="primary"
                                            isLoading
                                            loadingText="Refreshing..."
                                            loadingIcon={
                                                <HiRefresh className="h-4 w-4 animate-[spin_1.6s_linear_infinite]" />
                                            }
                                        />
                                        <Button
                                            variant="secondary"
                                            isLoading
                                            loadingText="Building..."
                                            loadingIcon={
                                                <HiCog className="h-4 w-4 animate-[spin_1.6s_linear_infinite]" />
                                            }
                                        />
                                        <Button
                                            variant="tertiary"
                                            isLoading
                                            loadingText="Processing..."
                                            loadingIcon={
                                                <HiCode className="h-4 w-4 animate-[spin_1.6s_linear_infinite]" />
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Live Submit Demo
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            variant="primary"
                                            isLoading={isSubmittingDemo}
                                            loadingText="Submitting..."
                                            onClick={handleSubmitDemo}
                                        >
                                            Submit Form
                                        </Button>
                                        <Button
                                            variant="outline"
                                            disabled={!isSubmittingDemo}
                                            onClick={() =>
                                                setIsSubmittingDemo(false)
                                            }
                                        >
                                            <HiRefresh />
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="link"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Link</h2>
                            <p className="text-content-muted mb-6">
                                Internal/external navigation with consistent
                                visual intent.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Variants
                                    </h3>
                                    <div className="flex flex-wrap gap-6">
                                        <Link href="/">Primary link</Link>
                                        <Link href="/" variant="secondary">
                                            Secondary link
                                        </Link>
                                        <Link href="/" variant="tertiary">
                                            Tertiary link
                                        </Link>
                                        <Link href="/" variant="muted">
                                            Muted link
                                        </Link>
                                        <Link
                                            href="https://nextjs.org"
                                            external
                                            variant="secondary"
                                        >
                                            External doc
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Icon Behavior
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <Link href="/resume">
                                            Default icon (right)
                                        </Link>
                                        <Link href="/about" iconPosition="left">
                                            Icon on left
                                        </Link>
                                        <Link href="/blog" showIcon={false}>
                                            No icon
                                        </Link>
                                        <Link
                                            href="/components"
                                            icon={
                                                <HiArrowRight className="h-3.5 w-3.5" />
                                            }
                                        >
                                            Custom icon
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        As Child (Radix Slot)
                                    </h3>
                                    <Link asChild variant="secondary">
                                        <NextLink href="/resume">
                                            Open resume with NextLink child
                                        </NextLink>
                                    </Link>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        In context
                                    </h3>
                                    <p className="text-content">
                                        Navigate to{" "}
                                        <Link href="/leetcode">Problems</Link>,{" "}
                                        <Link href="/blog">Blog</Link>, or{" "}
                                        <Link href="/about">About</Link>.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="card"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Card</h2>
                            <p className="text-content-muted mb-6">
                                Container hierarchy, information density, and
                                action placement with polished rhythm and
                                interaction states.
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <Card
                                    title="Default + Divider"
                                    subtitle="Single-action cards render one full-width primary button."
                                    icon={
                                        <HiCheckCircle className="text-emerald-300" />
                                    }
                                    className="min-h-68"
                                    actions={[
                                        {
                                            label: "Action",
                                            href: "/components",
                                        },
                                    ]}
                                >
                                    <p>Body content goes here.</p>
                                </Card>

                                <Card
                                    title="No Actions"
                                    subtitle="When no actions are provided, no actions area renders."
                                    className="min-h-68"
                                >
                                    <p>
                                        This keeps the layout clean for purely
                                        informational cards.
                                    </p>
                                </Card>

                                <Card
                                    title="Secondary Variant"
                                    subtitle="Two actions split 50/50 with left primary and right secondary."
                                    variant="secondary"
                                    className="min-h-68"
                                    actions={[
                                        {
                                            label: "Primary",
                                            href: "/components",
                                        },
                                        { label: "Secondary", href: "/about" },
                                    ]}
                                >
                                    <p>Different visual weight and tone.</p>
                                </Card>

                                <Card
                                    title="Transparent Variant"
                                    subtitle="Great for subtle contexts where you want structure without heavy surface contrast."
                                    variant="transparent"
                                    className="min-h-68"
                                >
                                    <p>
                                        Transparent keeps hierarchy while
                                        blending more with the page background.
                                    </p>
                                </Card>

                                <Card
                                    title="Tertiary Variant"
                                    subtitle="Useful for warm highlight moments or friendly emphasis blocks."
                                    variant="tertiary"
                                    className="min-h-68"
                                    actions={[
                                        { label: "Start", href: "/components" },
                                        { label: "Learn more", href: "/about" },
                                    ]}
                                >
                                    <p>
                                        Tertiary provides a different tone while
                                        preserving the same card structure.
                                    </p>
                                </Card>

                                <Card
                                    title="Long Subtitle Handling"
                                    subtitle="This subtitle is intentionally much longer than ideal to show the presentational-first behavior. The component renders provided content as-is, so consumers can see when copy gets too verbose and decide where to enforce content constraints."
                                    className="min-h-68"
                                    actions={[
                                        {
                                            label: "Review content",
                                            href: "/components",
                                        },
                                    ]}
                                >
                                    <p>Long copy is visible by design.</p>
                                </Card>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="badge"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Badge</h2>
                            <p className="text-content-muted mb-6">
                                Label density, color clarity, and context usage.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Variants
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge
                                            variant="primary"
                                            text="Primary"
                                        />
                                        <Badge
                                            variant="secondary"
                                            text="Secondary"
                                        />
                                        <Badge
                                            variant="tertiary"
                                            text="Tertiary"
                                        />
                                        <Badge variant="brand" text="Brand" />
                                        <Badge variant="error" text="Error" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Tones
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge
                                            variant="primary"
                                            tone="soft"
                                            text="Soft"
                                        />
                                        <Badge
                                            variant="primary"
                                            tone="outline"
                                            text="Outline"
                                        />
                                        <Badge
                                            variant="primary"
                                            tone="solid"
                                            text="Solid"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Sizes
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge size="sm" text="Small" />
                                        <Badge size="md" text="Medium" />
                                        <Badge size="lg" text="Large" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        With Icons
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge
                                            variant="secondary"
                                            icon={<HiCheckCircle />}
                                            text="Verified"
                                        />
                                        <Badge
                                            variant="primary"
                                            icon={<HiArrowRight />}
                                            iconPosition="right"
                                            text="Continue"
                                        />
                                        <Badge
                                            variant="brand"
                                            icon={<HiHome />}
                                            text="Home"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        In context (LeetCode difficulty tags)
                                    </h3>
                                    <p className="text-content flex flex-wrap items-center gap-2">
                                        <Badge
                                            size="sm"
                                            variant="leetcode-easy"
                                            text="Easy"
                                        />
                                        <Badge
                                            size="sm"
                                            variant="leetcode-medium"
                                            text="Medium"
                                        />
                                        <Badge
                                            size="sm"
                                            variant="leetcode-hard"
                                            text="Hard"
                                        />
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Font Comparison
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge
                                            variant="primary"
                                            className="font-baloo"
                                            text="Baloo"
                                        />
                                        <Badge
                                            variant="secondary"
                                            className="font-heading"
                                            text="Heading"
                                        />
                                        <Badge
                                            variant="tertiary"
                                            className="font-rounded"
                                            text="Rounded"
                                        />
                                        <Badge
                                            variant="brand"
                                            className="font-sans"
                                            text="Sans"
                                        />
                                        <Badge
                                            variant="error"
                                            className="font-mono"
                                            text="Mono"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Long Label
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge
                                            variant="secondary"
                                            text="Open to opportunities"
                                        />
                                        <Badge
                                            variant="primary"
                                            text="Portfolio in active development"
                                        />
                                        <Badge
                                            className="max-w-[220px] truncate"
                                            text="This label intentionally truncates in narrow layouts"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="blog"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Blog</h2>
                            <p className="text-content-muted mb-6">
                                Blog-specific components for list cards and post
                                headers, including metadata states.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        BlogPostCard states
                                    </h3>
                                    <div className="grid gap-4 lg:grid-cols-2">
                                        <BlogPostCard
                                            post={publishedBlogPost}
                                        />
                                        <BlogPostCard post={draftBlogPost} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        BlogPostHeader states
                                    </h3>
                                    <div className="space-y-4">
                                        <BlogPostHeader
                                            post={publishedBlogPost}
                                        />
                                        <BlogPostHeader post={draftBlogPost} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="qa"
                        className="surface-card radius-card min-h-0 p-5 md:min-h-[520px] md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">
                                Accessibility QA Checklist
                            </h2>
                            <p className="text-content-muted mb-6">
                                Quick manual checks for every component polish
                                pass.
                            </p>

                            <div className="surface-panel space-y-3 rounded-lg p-4">
                                <p className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                                    Manual checklist
                                </p>
                                <ul className="text-content space-y-2">
                                    <li className="flex items-start gap-2">
                                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                        Keyboard-only navigation works for tabs
                                        and interactive examples.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                        Focus indicators remain visible on dark
                                        surfaces.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                        Disabled and loading states are
                                        distinguishable from default states.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                        Icon-only actions include
                                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                                            aria-label
                                        </code>
                                        or equivalent text alternatives.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                        Text contrast is readable against card
                                        backgrounds and active tab states.
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
