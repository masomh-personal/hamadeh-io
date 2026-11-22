"use client";

import type { Route } from "next";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "@/components/ui/Link";
import { isNavRouteActive } from "./NavLink";

export interface MobileNavItem {
    name: string;
    href: Route;
    icon: ReactNode;
    external?: boolean;
}

interface MobileMenuProps {
    items: MobileNavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
    const pathname = usePathname();
    const [openForPathname, setOpenForPathname] = useState<string | null>(null);
    const isOpen = openForPathname !== null && openForPathname === pathname;
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const firstLink =
            menuPanelRef.current?.querySelector<HTMLAnchorElement>("a[href]");
        firstLink?.focus();

        function handleKeyDown(event: KeyboardEvent): void {
            if (event.key === "Escape") {
                setOpenForPathname(null);
                menuButtonRef.current?.focus();
            }
        }

        function handlePointerDown(event: PointerEvent): void {
            const target = event.target as Node | null;
            if (
                target &&
                !menuPanelRef.current?.contains(target) &&
                !menuButtonRef.current?.contains(target)
            ) {
                setOpenForPathname(null);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <div className="flex items-center gap-2">
                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() =>
                        setOpenForPathname((current) =>
                            current === pathname ? null : pathname
                        )
                    }
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-muted transition-colors hover:bg-slate-800 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)"
                    aria-label={
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                >
                    {isOpen ? (
                        <HiX aria-hidden="true" className="h-5 w-5" />
                    ) : (
                        <HiMenu aria-hidden="true" className="h-5 w-5" />
                    )}
                </button>
            </div>

            {isOpen ? (
                <div
                    ref={menuPanelRef}
                    id="mobile-navigation"
                    className="absolute inset-x-0 top-16 border-b border-(--border) bg-(--background) px-6 py-4 shadow-lg"
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-3">
                        {items.map((item) => {
                            const isActive =
                                !item.external &&
                                isNavRouteActive(pathname, item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={
                                        item.external ? "_blank" : undefined
                                    }
                                    external={item.external}
                                    onClick={() => setOpenForPathname(null)}
                                    icon={item.icon}
                                    iconPosition="left"
                                    className={`text-sm transition-colors ${
                                        isActive
                                            ? "text-primary"
                                            : "text-muted hover:text-primary"
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
