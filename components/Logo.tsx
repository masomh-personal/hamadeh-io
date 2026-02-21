import Link from "next/link";
import { HiTerminal } from "react-icons/hi";

/**
 * Logo component for hamadeh.io brand
 *
 * Design concept:
 * - HiTerminal icon (code/terminal) on the left
 * - "hamadeh" in Baloo 2 (human, approachable)
 * - ".io" in monospace (technical, domain)
 * - Different font weights for visual hierarchy
 *
 * Result: [Terminal Icon] hamadeh.io
 *
 * @param size - Logo size variant
 * @param clickable - Whether the logo should be wrapped in a Link
 */
export function Logo({
    size = "default",
    clickable = true,
}: {
    size?: "small" | "default" | "large";
    clickable?: boolean;
}): React.ReactElement {
    const sizes = {
        small: {
            container: "text-base",
            icon: "h-5 w-5",
        },
        default: {
            container: "text-xl",
            icon: "h-7 w-7",
        },
        large: {
            container: "text-3xl",
            icon: "h-10 w-10",
        },
    };

    const logoContent = (
        <span className={`flex gap-1.5 items-center ${sizes[size].container}`}>
            <HiTerminal
                className={`${sizes[size].icon} shrink-0 text-primary`}
                aria-hidden="true"
            />
            {/* Text Logo */}
            <span className="flex items-baseline">
                {/* "hamadeh" - Baloo 2, lighter weight (brand) */}
                <span className="font-baloo font-medium text-slate-50">
                    hamadeh
                </span>
                {/* ".io" - Monospace, bold weight (domain) */}
                <span className="font-mono font-bold text-primary">.io</span>
            </span>
        </span>
    );

    if (!clickable) {
        return logoContent;
    }

    return (
        <Link
            href="/"
            className="inline-flex rounded-lg px-2 py-1 transition-[background-color,transform] duration-200 ease-out hover:bg-slate-700/50 active:scale-[0.98] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label="hamadeh.io Home"
        >
            {logoContent}
        </Link>
    );
}
