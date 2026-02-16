"use client";

import { HiArrowLeft, HiHome } from "react-icons/hi";
import { Button, Link } from "@/components/ui";

/**
 * Custom 404 Not Found page
 * Displays a developer-friendly error message with navigation options
 */
export default function NotFound(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="font-mono text-7xl font-bold text-primary md:text-8xl">
                        404
                    </h1>
                    <div className="mt-2 font-mono text-sm text-muted">
                        <span className="font-bold">HTTP Status:</span>{" "}
                        <span className="text-tertiary">Not Found</span>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 max-w-2xl space-y-4">
                    <h2 className="font-bold text-white">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-content text-lg">
                        Looks like this route doesn't exist in our codebase.
                    </p>
                    <div className="surface-card-strong rounded-lg p-4 font-mono text-left text-sm">
                        <div className="text-content-subtle">
                            {"// Error details:"}
                        </div>
                        <div className="mt-1">
                            <span className="text-secondary">const</span>{" "}
                            <span className="text-sky-300">error</span> ={" "}
                            <span className="text-amber-400">
                                "Page not found"
                            </span>
                            ;
                        </div>
                        <div className="mt-1">
                            <span className="text-secondary">const</span>{" "}
                            <span className="text-sky-300">suggestion</span> ={" "}
                            <span className="text-amber-400">
                                "Try going back home?"
                            </span>
                            ;
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button href="/" className="gap-2">
                        <HiHome className="h-5 w-5" />
                        Go Home
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => window.history.back()}
                        className="gap-2"
                    >
                        <HiArrowLeft className="h-5 w-5" />
                        Go Back
                    </Button>
                </div>

                {/* Additional Links */}
                <div className="text-content-subtle mt-12 text-sm">
                    Or explore: <Link href="/leetcode">Problems</Link>
                    {" • "}
                    <Link href="/blog">Blog</Link>
                    {" • "}
                    <Link href="/about">About</Link>
                </div>
            </div>
        </div>
    );
}
