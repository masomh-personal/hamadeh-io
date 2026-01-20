"use client";

import Link from "next/link";
import { HiArrowLeft, HiHome } from "react-icons/hi";

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
                    <h1 className="font-mono text-8xl font-bold text-primary md:text-9xl">
                        404
                    </h1>
                    <div className="mt-2 font-mono text-sm text-muted">
                        <span className="font-bold">HTTP Status:</span>{" "}
                        <span className="text-tertiary">Not Found</span>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 max-w-2xl space-y-4">
                    <h2 className="font-baloo text-3xl font-bold text-white md:text-4xl">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-slate-300">
                        Looks like this route doesn't exist in our codebase.
                    </p>
                    <div className="rounded-lg border-2 border-slate-700 bg-slate-900/50 p-4 font-mono text-sm text-left">
                        <div className="text-slate-500">
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

                {/* Fun Developer Message */}
                <div className="mb-8 max-w-2xl rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <p className="text-sm text-slate-400">
                        <span className="font-semibold text-primary">
                            Pro tip:
                        </span>{" "}
                        This isn't a bug, it's an undocumented feature. Just
                        kidding—this page really doesn't exist. 😅
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-baloo text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                    >
                        <HiHome className="h-5 w-5" />
                        Go Home
                    </Link>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-baloo text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-400 hover:bg-sky-950/20 hover:text-sky-400 hover:shadow-lg"
                    >
                        <HiArrowLeft className="h-5 w-5" />
                        Go Back
                    </button>
                </div>

                {/* Additional Links */}
                <div className="mt-12 text-sm text-slate-500">
                    Or explore:{" "}
                    <Link
                        href="/leetcode"
                        className="text-primary hover:text-primary-hover transition-colors"
                    >
                        Problems
                    </Link>
                    {" • "}
                    <Link
                        href="/blog"
                        className="text-primary hover:text-primary-hover transition-colors"
                    >
                        Blog
                    </Link>
                    {" • "}
                    <Link
                        href="/about"
                        className="text-primary hover:text-primary-hover transition-colors"
                    >
                        About
                    </Link>
                </div>
            </div>
        </div>
    );
}
