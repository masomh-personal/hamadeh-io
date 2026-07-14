import type { Metadata } from "next";
import {
    Anonymous_Pro,
    IBM_Plex_Mono,
    Inconsolata,
    Inter,
    JetBrains_Mono,
    M_PLUS_Rounded_1c,
    Manrope,
    Open_Sans,
    Plus_Jakarta_Sans,
    PT_Mono,
    Roboto_Mono,
    Source_Code_Pro,
    Source_Sans_3,
    Space_Mono,
} from "next/font/google";

export const metadata: Metadata = {
    title: "Components Showcase",
    description:
        "A live component lab for the reusable UI primitives used across hamadeh.io.",
    alternates: {
        canonical: "/components",
    },
    robots: {
        index: false,
        follow: false,
    },
};

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const sourceSans3 = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-source-sans-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const mPlusRounded1c = M_PLUS_Rounded_1c({
    subsets: ["latin"],
    variable: "--font-rounded",
    display: "swap",
    weight: ["400", "500", "700", "800", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono-ibm",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono-jetbrains",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--font-mono-source",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const inconsolata = Inconsolata({
    subsets: ["latin"],
    variable: "--font-mono-inconsolata",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const anonymousPro = Anonymous_Pro({
    subsets: ["latin"],
    variable: "--font-mono-anonymous",
    display: "swap",
    weight: ["400", "700"],
});

const ptMono = PT_Mono({
    subsets: ["latin"],
    variable: "--font-mono-pt",
    display: "swap",
    weight: ["400"],
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    variable: "--font-mono-space",
    display: "swap",
    weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-mono-roboto",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const showcaseFonts = [
    plusJakartaSans.variable,
    inter.variable,
    manrope.variable,
    openSans.variable,
    sourceSans3.variable,
    mPlusRounded1c.variable,
    ibmPlexMono.variable,
    jetbrainsMono.variable,
    sourceCodePro.variable,
    inconsolata.variable,
    anonymousPro.variable,
    ptMono.variable,
    spaceMono.variable,
    robotoMono.variable,
].join(" ");

interface ComponentsLayoutProps {
    children: React.ReactNode;
}

export default function ComponentsLayout({
    children,
}: ComponentsLayoutProps): React.ReactElement {
    return <div className={showcaseFonts}>{children}</div>;
}
