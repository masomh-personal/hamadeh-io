"use client";

import { Button, Link } from "@/components/ui";

export function StylingInteractive(): React.ReactElement {
    return (
        <section className="mb-20" aria-labelledby="interactive-heading">
            <h2
                id="interactive-heading"
                className="mb-8 font-heading text-2xl font-bold leading-tight text-white md:text-3xl"
            >
                Buttons &amp; Interactive Elements
            </h2>

            <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="md">
                    Primary
                </Button>
                <Button variant="outline" size="md">
                    Outline
                </Button>
                <Button variant="secondary" size="md">
                    Secondary
                </Button>
                <Button variant="tertiary" size="md">
                    Tertiary
                </Button>
                <Link href="/components" variant="primary">
                    Link example
                </Link>
            </div>
        </section>
    );
}
