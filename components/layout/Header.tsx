"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
    HiCode,
    HiDocument,
    HiDocumentText,
    HiHome,
    HiMenu,
    HiUser,
    HiX,
} from "react-icons/hi";

export function Header(): React.ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation: Array<{ name: string; href: string; icon: IconType }> = [
        { name: "Home", href: "/", icon: HiHome },
        { name: "Problems", href: "/leetcode", icon: HiCode },
        { name: "Blog", href: "/blog", icon: HiDocumentText },
        { name: "About", href: "/about", icon: HiUser },
        { name: "Resume", href: "/resume", icon: HiDocument },
    ];

    return (
        <header className="site-header">
            <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-baloo text-xl font-bold tracking-tight text-slate-50 transition-colors hover:text-primary"
                    >
                        ThoughtfulCode
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
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
                                    className={`flex items-center gap-1 text-sm font-bold transition-colors ${
                                        isActive
                                            ? "text-primary"
                                            : "text-muted hover:text-primary"
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
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
                    <div className="border-t-2 border-slate-700 py-4 md:hidden">
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
                                        className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                                            isActive
                                                ? "text-primary"
                                                : "text-muted hover:text-primary"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
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
