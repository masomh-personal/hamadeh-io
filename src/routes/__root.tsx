import {
    createRootRoute,
    type ErrorComponentProps,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { Footer } from "@/components/layout/Footer";
import { GoBackButton } from "@/components/layout/GoBackButton";
import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button, Link } from "@/components/ui";
import {
    absoluteUrl,
    AUTHOR_EMAIL,
    AUTHOR_NAME,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_OG_IMAGE_PATH,
    SITE_DESCRIPTION,
    SITE_NAME,
} from "@/lib/site";
import appCss from "../styles/globals.css?url";

export function NotFoundContent(): React.ReactElement {
    return (
        <PageContainer className="py-10 md:py-12">
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <div className="mb-8">
                    <h1 className="font-mono text-7xl font-bold text-primary md:text-8xl">
                        404
                    </h1>
                    <div className="mt-2 font-mono text-sm text-muted">
                        <span className="font-bold">HTTP Status:</span>{" "}
                        <span className="text-tertiary">Not Found</span>
                    </div>
                </div>

                <div className="mb-8 max-w-2xl space-y-4">
                    <h2 className="font-bold text-white">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-content text-lg">
                        Looks like this route doesn&apos;t exist in our
                        codebase.
                    </p>
                    <div className="surface-card rounded-lg p-4 text-left font-mono text-sm">
                        <div className="text-content-subtle">
                            {"// Error details:"}
                        </div>
                        <div className="mt-1">
                            <span className="text-secondary">const</span>{" "}
                            <span className="text-sky-300">error</span> ={" "}
                            <span className="text-amber-400">
                                &quot;Page not found&quot;
                            </span>
                            ;
                        </div>
                        <div className="mt-1">
                            <span className="text-secondary">const</span>{" "}
                            <span className="text-sky-300">suggestion</span> ={" "}
                            <span className="text-amber-400">
                                &quot;Try going back home?&quot;
                            </span>
                            ;
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button href="/" icon={<HiHome />} iconSize="lg">
                        Go Home
                    </Button>
                    <GoBackButton />
                </div>

                <div className="text-content-subtle mt-12 text-sm">
                    Or explore: <Link href="/problems">Code Problems</Link>
                    {" • "}
                    <Link href="/blog">Blog</Link>
                    {" • "}
                    <Link href="/about">About</Link>
                </div>
            </div>
        </PageContainer>
    );
}

function RootErrorComponent({
    error,
    reset,
}: ErrorComponentProps): React.ReactElement {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <PageContainer className="py-16">
            <div
                role="alert"
                className="surface-card radius-card mx-auto max-w-xl p-8 text-center"
            >
                <h1 className="font-bold text-white">Something went wrong</h1>
                <p className="text-content mt-3">
                    The page could not be rendered. You can retry without losing
                    your place.
                </p>
                <Button className="mt-6" onClick={reset}>
                    Try again
                </Button>
            </div>
        </PageContainer>
    );
}

function RootDocument({
    children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body className="min-h-screen antialiased dark">
                <div className="flex min-h-screen flex-col">
                    <a
                        href="#main-content"
                        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-sky-500 px-4 py-2 font-bold text-slate-950 transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Skip to main content
                    </a>
                    <Header />
                    <main id="main-content" className="relative flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent(): React.ReactElement {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: `${SITE_NAME} | ${AUTHOR_NAME}` },
            { name: "description", content: SITE_DESCRIPTION },
            { name: "application-name", content: SITE_NAME },
            { name: "author", content: AUTHOR_NAME },
            { name: "creator", content: AUTHOR_NAME },
            { name: "color-scheme", content: "dark" },
            { name: "theme-color", content: "#0f172a" },
            { name: "contact:email", content: AUTHOR_EMAIL },
            { property: "og:type", content: "website" },
            { property: "og:url", content: absoluteUrl("/") },
            { property: "og:site_name", content: SITE_NAME },
            { property: "og:title", content: `${SITE_NAME} | ${AUTHOR_NAME}` },
            { property: "og:description", content: SITE_DESCRIPTION },
            {
                property: "og:image",
                content: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
            },
            { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
            { name: "twitter:card", content: "summary_large_image" },
            {
                name: "twitter:title",
                content: `${SITE_NAME} | ${AUTHOR_NAME}`,
            },
            { name: "twitter:description", content: SITE_DESCRIPTION },
            {
                name: "twitter:image",
                content: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
            },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            { rel: "icon", href: "/branding/favicon.svg" },
            { rel: "shortcut icon", href: "/branding/favicon.svg" },
            { rel: "apple-touch-icon", href: "/branding/favicon.svg" },
            {
                rel: "alternate",
                type: "application/rss+xml",
                title: `${SITE_NAME} Blog RSS`,
                href: "/blog/rss.xml",
            },
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFoundContent,
    errorComponent: RootErrorComponent,
});
