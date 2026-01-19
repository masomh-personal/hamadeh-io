import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ThoughtfulCode | Masom's Portfolio",
    description:
        "Full-stack portfolio showcasing software engineering skills, LeetCode solutions, and technical writing",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
