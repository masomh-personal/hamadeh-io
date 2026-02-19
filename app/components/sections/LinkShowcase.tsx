import NextLink from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "@/components/ui";

export function LinkShowcase(): React.ReactElement {
    return (
        <section>
            <h2 className="font-bold text-white">Link</h2>
            <p className="text-content-muted mb-4">
                Internal/external navigation with consistent visual intent.
            </p>

            <div className="space-y-6">
                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
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
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        Icon Behavior
                    </h3>
                    <div className="flex flex-wrap items-center gap-6">
                        <Link href="/resume">Default icon (right)</Link>
                        <Link href="/about" iconPosition="left">
                            Icon on left
                        </Link>
                        <Link href="/blog" showIcon={false}>
                            No icon
                        </Link>
                        <Link
                            href="/components"
                            icon={<HiArrowRight className="h-3.5 w-3.5" />}
                        >
                            Custom icon
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        As Child (Radix Slot)
                    </h3>
                    <Link asChild variant="secondary">
                        <NextLink href="/resume">
                            Open resume with NextLink child
                        </NextLink>
                    </Link>
                </div>
                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        In context
                    </h3>
                    <p className="text-content">
                        Navigate to <Link href="/leetcode">Problems</Link>,{" "}
                        <Link href="/blog">Blog</Link>, or{" "}
                        <Link href="/about">About</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
