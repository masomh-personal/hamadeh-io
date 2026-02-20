import {
    Inter,
    Lexend,
    Manrope,
    Open_Sans,
    Plus_Jakarta_Sans,
    Quicksand,
    Source_Sans_3,
} from "next/font/google";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button, Link } from "@/components/ui";

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
        <PageContainer>
            <PageHeader
                title="Typography Lab"
                description="Internal preview page for evaluating heading/body font pairings. Each card shows a heading, paragraph text, a link, and a button sample."
                descriptionClassName="max-w-3xl"
            />

            <div className="grid gap-6 md:grid-cols-2">
                {typographyPairs.map((pair) => (
                    <section
                        key={pair.id}
                        className="surface-card radius-card p-6"
                    >
                        <p className="text-content-subtle mb-4 font-mono text-xs uppercase tracking-wide">
                            {pair.label}
                        </p>

                        <h2
                            className={`${pair.headingFont} text-2xl font-bold tracking-tight text-white`}
                        >
                            Build thoughtful software.
                        </h2>

                        <p
                            className={`${pair.bodyFont} text-content mt-4 text-base leading-7`}
                        >
                            This is sample body copy to evaluate readability,
                            rhythm, and visual tone across desktop and mobile
                            breakpoints. Use this to compare how comfortable the
                            paragraph feels for longer reading sessions.
                        </p>

                        <div
                            className={`${pair.bodyFont} mt-5 flex flex-wrap items-center gap-4`}
                        >
                            <Link
                                href="/components"
                                className={`${quicksand.className} inline-flex items-center whitespace-nowrap leading-none`}
                            >
                                Sample link
                            </Link>
                            <Button
                                variant="primary"
                                size="sm"
                                enforceMinWidth={false}
                                className={`${quicksand.className} normal-case font-semibold`}
                            >
                                Sample button
                            </Button>
                        </div>

                        <p className="text-content-subtle mt-4 text-sm">
                            {pair.notes}
                        </p>
                    </section>
                ))}
            </div>
        </PageContainer>
    );
}
