"use client";

import NextLink from "next/link";
import { useState } from "react";
import {
    HiArrowRight,
    HiCheckCircle,
    HiExternalLink,
    HiHome,
    HiRefresh,
} from "react-icons/hi";
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

    const handleSubmitDemo = (): void => {
        if (isSubmittingDemo) {
            return;
        }

        setIsSubmittingDemo(true);
    };

    return (
        <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <header className="mb-10">
                <h1 className="font-extrabold text-white">
                    Components Showcase
                </h1>
                <p className="text-content-muted mt-2">
                    A living gallery for design iteration, usability checks, and
                    Radix-first wrapper polish.
                </p>
                <Link href="/" variant="muted" className="mt-4 inline-block">
                    ← Back to Home
                </Link>
            </header>

            <Tabs
                defaultValue="button"
                className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:items-start"
            >
                <TabsList
                    aria-label="Component showcase sections"
                    className="flex h-full min-h-[520px] w-full flex-col items-stretch justify-start gap-2 rounded-xl border-2 border-slate-600 bg-linear-to-b from-slate-800/95 to-slate-900/95 p-3 shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_12px_30px_rgba(2,6,23,0.45)] md:sticky md:top-20"
                >
                    <TabsTrigger
                        value="button"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        <span className="flex flex-col items-start leading-tight">
                            <span>Button</span>
                            <span className="text-content-subtle text-xs font-normal">
                                Actions and states
                            </span>
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="link"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        <span className="flex flex-col items-start leading-tight">
                            <span>Link</span>
                            <span className="text-content-subtle text-xs font-normal">
                                Navigation patterns
                            </span>
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="card"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        <span className="flex flex-col items-start leading-tight">
                            <span>Card</span>
                            <span className="text-content-subtle text-xs font-normal">
                                Content containers
                            </span>
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="badge"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        <span className="flex flex-col items-start leading-tight">
                            <span>Badge</span>
                            <span className="text-content-subtle text-xs font-normal">
                                Labels and status
                            </span>
                        </span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="qa"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        <span className="flex flex-col items-start leading-tight">
                            <span>A11y QA</span>
                            <span className="text-content-subtle text-xs font-normal">
                                Keyboard and focus
                            </span>
                        </span>
                    </TabsTrigger>
                </TabsList>

                <div>
                    <TabsContent
                        value="button"
                        className="surface-card radius-card min-h-[520px] p-6 md:p-8"
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
                                            loadingText="Saving changes..."
                                        />
                                        <Button variant="secondary" isLoading />
                                        <Button
                                            variant="tertiary"
                                            isLoading
                                            loadingText="Syncing..."
                                            loadingIcon={
                                                <HiRefresh className="h-4 w-4 animate-spin" />
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
                        className="surface-card radius-card min-h-[520px] p-6 md:p-8"
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
                                        <Link href="/" variant="muted">
                                            Muted link
                                        </Link>
                                        <Link
                                            href="https://nextjs.org"
                                            external
                                            variant="secondary"
                                        >
                                            External doc
                                            <HiExternalLink className="ml-1 inline h-3.5 w-3.5" />
                                        </Link>
                                    </div>
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
                        className="surface-card radius-card min-h-[520px] p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Card</h2>
                            <p className="text-content-muted mb-6">
                                Container hierarchy, information density, and
                                action placement.
                            </p>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Default Card</Card.Title>
                                        <Card.Description>
                                            A simple card with all slots
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content>
                                        <p>Body content goes here.</p>
                                    </Card.Content>
                                    <Card.Footer>
                                        <Button size="sm">Action</Button>
                                    </Card.Footer>
                                </Card>

                                <Card>
                                    <Card.Header>
                                        <Card.Title>Minimal</Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <p>Just title and content.</p>
                                    </Card.Content>
                                </Card>

                                <Card variant="secondary">
                                    <Card.Header>
                                        <Card.Title>
                                            Secondary Variant
                                        </Card.Title>
                                        <Card.Description>
                                            Medium prominence
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content>
                                        <p>Different visual weight.</p>
                                    </Card.Content>
                                </Card>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="badge"
                        className="surface-card radius-card min-h-[520px] p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-bold text-white">Badge</h2>
                            <p className="text-content-muted mb-6">
                                Label density, color clarity, and context usage.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Colors
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge color="primary">Primary</Badge>
                                        <Badge color="secondary">
                                            Secondary
                                        </Badge>
                                        <Badge color="tertiary">Tertiary</Badge>
                                        <Badge color="default">Default</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Sizes
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge size="sm">Small</Badge>
                                        <Badge size="md">Medium</Badge>
                                        <Badge size="lg">Large</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        In context
                                    </h3>
                                    <p className="text-content flex flex-wrap items-center gap-2">
                                        <Badge size="sm">Easy</Badge>
                                        <Badge size="sm" color="secondary">
                                            Medium
                                        </Badge>
                                        <Badge size="sm" color="tertiary">
                                            Hard
                                        </Badge>
                                        — LeetCode difficulty tags
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                                        Long Label
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge color="secondary">
                                            Open to opportunities
                                        </Badge>
                                        <Badge color="primary">
                                            Portfolio in active development
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="qa"
                        className="surface-card radius-card min-h-[520px] p-6 md:p-8"
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
