import type { Route } from "next";
import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import {
    HiCode,
    HiCollection,
    HiDocumentText,
    HiHome,
    HiUser,
} from "react-icons/hi";
import { Logo } from "@/components/Logo";
import { Link } from "@/components/ui/Link";
import { MobileMenu, type MobileNavItem } from "./MobileMenu";
import { NavLink } from "./NavLink";

interface NavItem {
    name: string;
    href: Route;
    icon: IconType;
    external?: boolean;
    iconOnlyOnDesktop?: boolean;
}

const NAVIGATION: readonly NavItem[] = [
    { name: "Home", href: "/", icon: HiHome },
    { name: "Components", href: "/components", icon: HiCollection },
    { name: "Code Problems", href: "/problems", icon: HiCode },
    { name: "Blog", href: "/blog", icon: HiDocumentText },
    { name: "About", href: "/about", icon: HiUser },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/masomh/",
        icon: FaLinkedin,
        external: true,
        iconOnlyOnDesktop: true,
    },
];

export function Header() {
    const mobileItems: MobileNavItem[] = NAVIGATION.map((item) => {
        const Icon = item.icon;
        return {
            name: item.name,
            href: item.href,
            external: item.external,
            icon: (
                <Icon
                    className={item.external ? "h-3.5 w-3.5 pr-0.5" : "h-4 w-4"}
                />
            ),
        };
    });

    return (
        <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--background)">
            <nav className="relative mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    <Logo size="default" />

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-4 md:flex">
                        {NAVIGATION.map((item) => {
                            const Icon = item.icon;

                            if (item.iconOnlyOnDesktop) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        external
                                        variant="muted"
                                        showIcon={false}
                                        className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md p-2 leading-none"
                                        aria-label={item.name}
                                    >
                                        <Icon className="size-(--icon-size-header)" />
                                    </Link>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    icon={<Icon className="h-3.5 w-3.5" />}
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </div>

                    <MobileMenu items={mobileItems} />
                </div>
            </nav>
        </header>
    );
}
