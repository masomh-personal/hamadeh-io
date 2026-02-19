import type { Metadata } from "next";
import {
    Anonymous_Pro,
    Baloo_2,
    Fira_Code,
    IBM_Plex_Mono,
    Inconsolata,
    Inter,
    JetBrains_Mono,
    Lexend,
    M_PLUS_Rounded_1c,
    Manrope,
    Open_Sans,
    Plus_Jakarta_Sans,
    PT_Mono,
    Quicksand,
    Roboto_Mono,
    Source_Code_Pro,
    Source_Sans_3,
    Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

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

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-heading-gf",
    display: "swap",
    weight: ["500", "600", "700"],
});

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-body-gf",
    display: "swap",
    weight: ["400", "500", "600"],
});

const baloo2 = Baloo_2({
    subsets: ["latin"],
    variable: "--font-accent-gf",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

const mPlusRounded1c = M_PLUS_Rounded_1c({
    subsets: ["latin"],
    variable: "--font-rounded",
    display: "swap",
    weight: ["400", "500", "700", "800", "900"],
});

// Default monospace (IBM Plex Mono)
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

// Additional monospace fonts for comparison
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono-jetbrains",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono-fira",
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

export const metadata: Metadata = {
    title: "ThoughtfulCode | Masom's Portfolio",
    description:
        "Full-stack portfolio showcasing software engineering skills, LeetCode solutions, and technical writing",
    icons: {
        icon: "/branding/favicon.svg",
        shortcut: "/branding/favicon.svg",
        apple: "/branding/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactElement {
    return (
        <html
            lang="en"
            className={`${quicksand.variable} ${lexend.variable} ${baloo2.variable} ${plusJakartaSans.variable} ${inter.variable} ${manrope.variable} ${openSans.variable} ${sourceSans3.variable} ${mPlusRounded1c.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable} ${inconsolata.variable} ${anonymousPro.variable} ${ptMono.variable} ${spaceMono.variable} ${robotoMono.variable}`}
            suppressHydrationWarning
        >
            <body
                className="min-h-screen antialiased dark"
                suppressHydrationWarning
            >
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <main id="main-content" className="relative flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
