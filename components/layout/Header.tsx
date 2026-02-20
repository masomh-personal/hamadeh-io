"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
    HiCode,
    HiCollection,
    HiDocument,
    HiDocumentText,
    HiHome,
    HiMenu,
    HiUser,
    HiX,
} from "react-icons/hi";
import { Logo } from "@/components/Logo";
import { Link } from "@/components/ui";

export function Header(): React.ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation: Array<{ name: string; href: string; icon: IconType }> = [
        { name: "Home", href: "/", icon: HiHome },
        { name: "Components", href: "/components", icon: HiCollection },
        { name: "Problems", href: "/leetcode", icon: HiCode },
        { name: "Blog", href: "/blog", icon: HiDocumentText },
        { name: "About", href: "/about", icon: HiUser },
        { name: "Resume", href: "/resume", icon: HiDocument },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--background)">
            <nav className="mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Logo size="default" />

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-4 md:flex">
                        {navigation.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" &&
                                    pathname?.startsWith(item.href));
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    icon={<Icon className="h-3.5 w-3.5" />}
                                    iconPosition="left"
                                    className={`text-sm transition-colors ${
                                        isActive
                                            ? "text-primary"
                                            : "text-muted hover:text-primary"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-md p-2 text-muted transition-colors hover:bg-slate-800 hover:text-primary"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <HiX className="h-5 w-5" />
                            ) : (
                                <HiMenu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="border-t border-surface-card py-4 md:hidden">
                        <div className="flex flex-col gap-3">
                            {navigation.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" &&
                                        pathname?.startsWith(item.href));
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        icon={<Icon className="h-4 w-4" />}
                                        iconPosition="left"
                                        className={`text-sm transition-colors ${
                                            isActive
                                                ? "text-primary"
                                                : "text-muted hover:text-primary"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
