import { HiArrowLeft } from "react-icons/hi";
import { Link } from "@/components/ui";

export default function AboutPage(): React.ReactElement {
    return (
        <div className="mx-auto max-w-4xl px-6 py-8 md:py-10">
            <header className="mb-8">
                <h1 className="font-extrabold text-white">About</h1>
                <p className="text-content-muted mt-2">
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

            <section className="surface-card radius-card p-6">
                <p className="text-content leading-7">
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
