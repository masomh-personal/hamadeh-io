import {
    Inter,
    Lexend,
    Manrope,
    Open_Sans,
    Plus_Jakarta_Sans,
    Quicksand,
    Source_Sans_3,
} from "next/font/google";
import { Link } from "@/components/ui";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const lexend = Lexend({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const sourceSans3 = Source_Sans_3({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const typographyPairs = [
    {
        id: "quicksand-plus-jakarta",
        label: "Quicksand + Plus Jakarta Sans",
        headingFont: quicksand.className,
        bodyFont: plusJakartaSans.className,
        notes: "Balanced and modern. Great readability for body copy.",
    },
    {
        id: "quicksand-inter",
        label: "Quicksand + Inter",
        headingFont: quicksand.className,
        bodyFont: inter.className,
        notes: "Safe and crisp. Strong default for technical portfolios.",
    },
    {
        id: "quicksand-manrope",
        label: "Quicksand + Manrope",
        headingFont: quicksand.className,
        bodyFont: manrope.className,
        notes: "Softer look with modern personality.",
    },
    {
        id: "quicksand-source-sans",
        label: "Quicksand + Source Sans 3",
        headingFont: quicksand.className,
        bodyFont: sourceSans3.className,
        notes: "Traditional readability with clean hierarchy.",
    },
    {
        id: "quicksand-lexend",
        label: "Quicksand + Lexend",
        headingFont: quicksand.className,
        bodyFont: lexend.className,
        notes: "Rounded and modern with strong personality while staying readable.",
    },
    {
        id: "quicksand-open-sans",
        label: "Quicksand + Open Sans",
        headingFont: quicksand.className,
        bodyFont: openSans.className,
        notes: "Classic and readable pairing with a neutral, familiar body feel.",
    },
] as const;

export default function TypographyPage(): React.ReactElement {
    return (
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
            <header className="mb-10">
                <h1 className="font-baloo text-4xl font-extrabold text-white md:text-5xl">
                    Typography Lab
                </h1>
                <p className="mt-2 max-w-3xl text-slate-400">
                    Internal preview page for evaluating heading/body font
                    pairings. Each card shows a heading, paragraph text, a link,
                    and a button sample.
                </p>
                <Link href="/" variant="muted" className="mt-4 inline-block">
                    ← Back to Home
                </Link>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                {typographyPairs.map((pair) => (
                    <section
                        key={pair.id}
                        className="rounded-xl border-2 border-slate-700/80 bg-slate-900/35 p-6"
                    >
                        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-slate-500">
                            {pair.label}
                        </p>

                        <h2
                            className={`${pair.headingFont} text-3xl font-bold tracking-tight text-white`}
                        >
                            Build thoughtful software.
                        </h2>

                        <p
                            className={`${pair.bodyFont} mt-4 text-base leading-7 text-slate-300`}
                        >
                            This is sample body copy to evaluate readability,
                            rhythm, and visual tone across desktop and mobile
                            breakpoints. Use this to compare how comfortable the
                            paragraph feels for longer reading sessions.
                        </p>

                        <div
                            className={`${pair.bodyFont} mt-5 flex flex-wrap items-center gap-4`}
                        >
                            <a
                                href="/components"
                                className={`${quicksand.className} font-semibold text-sky-400 underline-offset-2 hover:text-sky-300 hover:underline`}
                            >
                                Sample link
                            </a>
                            <button
                                type="button"
                                className={`${quicksand.className} rounded-sm border border-sky-300/40 bg-sky-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-sky-400`}
                            >
                                Sample button
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-slate-500">
                            {pair.notes}
                        </p>
                    </section>
                ))}
            </div>
        </div>
    );
}
