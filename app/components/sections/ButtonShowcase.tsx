"use client";

import NextLink from "next/link";
import { useState } from "react";
import { HiArrowRight, HiCode, HiCog, HiHome, HiRefresh } from "react-icons/hi";
import { Button } from "@/components/ui";

export function ButtonShowcase(): React.ReactElement {
    const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);

    const handleSubmitDemo = (): void => {
        if (isSubmittingDemo) return;
        setIsSubmittingDemo(true);
    };

    return (
        <section>
            <h2 className="font-bold text-white">Button</h2>
            <p className="text-content-muted mb-4">
                Variants, sizing rhythm, action semantics, and edge states.
            </p>

            <div className="space-y-6">
                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        Variants
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="tertiary">Tertiary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="danger">Danger</Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        Sizes
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="xs">Extra Small</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        With Icons
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button icon={<HiHome />}>Go Home</Button>
                        <Button
                            variant="secondary"
                            icon={<HiArrowRight />}
                            iconPosition="right"
                        >
                            Next
                        </Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        Size Contrast (No Icon vs Icon)
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="xs" variant="tertiary">
                            XS Label
                        </Button>
                        <Button size="xs" variant="tertiary" icon={<HiHome />}>
                            XS Icon
                        </Button>
                        <Button size="sm" variant="secondary">
                            SM Label
                        </Button>
                        <Button size="sm" variant="secondary" icon={<HiHome />}>
                            SM Icon
                        </Button>
                        <Button size="md" variant="primary">
                            MD Label
                        </Button>
                        <Button size="md" variant="primary" icon={<HiHome />}>
                            MD Icon
                        </Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        As Link (href)
                    </h3>
                    <Button href="/" icon={<HiHome />}>
                        Link to Home
                    </Button>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        As Child (Radix Slot)
                    </h3>
                    <Button asChild variant="secondary">
                        <NextLink href="/about">
                            Open About
                            <HiArrowRight />
                        </NextLink>
                    </Button>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        Edge States
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button disabled>Disabled Action</Button>
                        <Button variant="secondary" disabled>
                            Disabled Secondary
                        </Button>
                        <Button variant="tertiary" className="max-w-[250px]">
                            Continue with very long confirmation label
                        </Button>
                        <Button
                            variant="outline"
                            enforceMinWidth={false}
                            icon={<HiHome />}
                            aria-label="Home"
                            title="Home"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
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
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
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
                            icon={<HiRefresh />}
                            onClick={() => setIsSubmittingDemo(false)}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
