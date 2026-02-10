"use client";

import { HiArrowRight, HiHome, HiRefresh } from "react-icons/hi";
import { Badge, Button, Card, Link } from "@/components/ui";

/**
 * Component showcase page for testing and iterating on UI components.
 * Visit /components to see all components and their variants.
 */
export default function ComponentsPage(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <header className="mb-16">
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

            {/* Buttons */}
            <section className="mb-16">
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
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="tertiary">Tertiary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="danger">Danger</Button>
                            <Button variant="danger-soft">Danger Soft</Button>
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

            {/* Links */}
            <section className="mb-16">
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
                            Navigate to <Link href="/leetcode">Problems</Link>,{" "}
                            <Link href="/blog">Blog</Link>, or{" "}
                            <Link href="/about">About</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="mb-16">
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
                            <Card.Title>Secondary Variant</Card.Title>
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

            {/* Badges */}
            <section>
                <h2 className="font-baloo text-2xl font-bold text-white">
                    Badge
                </h2>
                <p className="mb-6 text-slate-400">Color variants and sizes</p>

                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 font-mono text-sm text-slate-500">
                            Colors
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge color="primary">Primary</Badge>
                            <Badge color="secondary">Secondary</Badge>
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
        </div>
    );
}
