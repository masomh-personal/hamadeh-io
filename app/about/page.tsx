import { HiArrowLeft } from "react-icons/hi";
import { Link } from "@/components/ui";

export default function AboutPage(): React.ReactElement {
    return (
        <div className="mx-auto max-w-4xl px-6 py-10 md:py-12">
            <header className="mb-8">
                <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
                    About
                </h1>
                <p className="mt-2 text-slate-400">
                    A quick snapshot of who I am and how I approach engineering.
                </p>
                <Link
                    href="/"
                    variant="muted"
                    className="mt-4 inline-flex items-center gap-1"
                >
                    <HiArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </header>

            <section className="rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6">
                <p className="leading-7 text-slate-300">
                    I&apos;m a full-stack engineer who cares about readable
                    code, practical architecture, and thoughtful user
                    experience. This page will grow into a deeper story over
                    time, but for now it serves as a simple profile and
                    direction-setting space for the portfolio.
                </p>
            </section>
        </div>
    );
}
