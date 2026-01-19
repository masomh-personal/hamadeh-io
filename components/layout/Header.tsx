"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Header(): React.ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "LeetCode", href: "/leetcode" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-primary-200 bg-white dark:border-primary-700 dark:bg-primary-900">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-semibold text-primary-900 dark:text-primary-50"
                    >
                        ThoughtfulCode
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-primary-600 transition-colors hover:text-secondary-600 dark:text-primary-300 dark:hover:text-secondary-400"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Dark Mode Toggle */}
                        <button
                            type="button"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="rounded-md p-2 text-primary-600 transition-colors hover:bg-primary-100 hover:text-secondary-600 dark:text-primary-300 dark:hover:bg-primary-800 dark:hover:text-secondary-400"
                            aria-label="Toggle dark mode"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="rounded-md p-2 text-primary-600 transition-colors hover:bg-primary-100 dark:text-primary-300 dark:hover:bg-primary-800"
                            aria-label="Toggle dark mode"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-md p-2 text-primary-600 transition-colors hover:bg-primary-100 dark:text-primary-300 dark:hover:bg-primary-800"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="border-t border-primary-200 py-4 dark:border-primary-700 md:hidden">
                        <div className="flex flex-col space-y-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-base font-medium text-primary-600 transition-colors hover:text-secondary-600 dark:text-primary-300 dark:hover:text-secondary-400"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
