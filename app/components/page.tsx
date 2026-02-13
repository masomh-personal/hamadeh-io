"use client";

import { HiArrowRight, HiHome, HiRefresh } from "react-icons/hi";
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
    return (
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
            <header className="mb-10">
                <h1 className="font-baloo text-4xl font-extrabold text-white md:text-5xl">
                    Components Showcase
                </h1>
                <p className="mt-2 text-slate-400">
                    A living component gallery for iteration and design QA.
                </p>
                <Link href="/" variant="muted" className="mt-4 inline-block">
                    ← Back to Home
                </Link>
            </header>

            <Tabs
                defaultValue="button"
                className="grid gap-8 md:grid-cols-[250px_1fr] md:items-stretch"
            >
                <TabsList className="flex h-full min-h-[560px] w-full flex-col items-stretch justify-start rounded-xl border-2 border-slate-600 bg-gradient-to-b from-slate-800/95 to-slate-900/95 p-3 shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_12px_30px_rgba(2,6,23,0.45)]">
                    <TabsTrigger
                        value="button"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        Button
                    </TabsTrigger>
                    <TabsTrigger
                        value="link"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        Link
                    </TabsTrigger>
                    <TabsTrigger
                        value="card"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        Card
                    </TabsTrigger>
                    <TabsTrigger
                        value="badge"
                        className="w-full justify-start rounded-md border border-transparent px-4 py-3 text-left text-base data-[state=active]:border-sky-400 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-300"
                    >
                        Badge
                    </TabsTrigger>
                </TabsList>

                <div>
                    <TabsContent
                        value="button"
                        className="min-h-[560px] rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-baloo text-2xl font-bold text-white">
                                Button
                            </h2>
                            <p className="mb-6 text-slate-400">
                                Variants, sizes, with icons, as link
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
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
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="danger">Danger</Button>
                                        <Button variant="danger-soft">
                                            Danger Soft
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
                                        Sizes
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button size="sm">Small</Button>
                                        <Button size="md">Medium</Button>
                                        <Button size="lg">Large</Button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
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
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
                                        As Link (href)
                                    </h3>
                                    <Button href="/">
                                        <HiHome />
                                        Link to Home
                                    </Button>
                                </div>

                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
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
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent
                        value="link"
                        className="min-h-[560px] rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-baloo text-2xl font-bold text-white">
                                Link
                            </h2>
                            <p className="mb-6 text-slate-400">
                                Internal and external, variants
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
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
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
                                        In context
                                    </h3>
                                    <p className="text-slate-300">
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
                        className="min-h-[560px] rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-baloo text-2xl font-bold text-white">
                                Card
                            </h2>
                            <p className="mb-6 text-slate-400">
                                Header, title, description, content, footer
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
                        className="min-h-[560px] rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6 md:p-8"
                    >
                        <section>
                            <h2 className="font-baloo text-2xl font-bold text-white">
                                Badge
                            </h2>
                            <p className="mb-6 text-slate-400">
                                Color variants and sizes
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
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
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
                                        Sizes
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge size="sm">Small</Badge>
                                        <Badge size="md">Medium</Badge>
                                        <Badge size="lg">Large</Badge>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-3 font-mono text-sm text-slate-500">
                                        In context
                                    </h3>
                                    <p className="flex flex-wrap items-center gap-2 text-slate-300">
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
                            </div>
                        </section>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
