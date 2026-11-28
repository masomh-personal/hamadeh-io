import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Link } from "@/components/ui/Link";

export function isNavRouteActive(
    pathname: string | null,
    href: string
): boolean {
    if (!pathname) {
        return false;
    }

    return (
        pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
}

interface NavLinkProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
}

export function NavLink({ href, icon, children }: NavLinkProps) {
    const pathname = useRouterState({
        select: (state) => {
            const isNotFound = state.matches.some(
                (match) =>
                    match.status === "notFound" ||
                    match.routeId === "/$" ||
                    match.loaderData === null
            );
            return isNotFound ? null : state.location.pathname;
        },
    });
    const isActive = isNavRouteActive(pathname, href);

    return (
        <Link
            href={href}
            icon={icon}
            iconPosition="left"
            className={`text-sm transition-colors ${
                isActive ? "text-primary" : "text-muted hover:text-primary"
            }`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
    );
}
