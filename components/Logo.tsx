import Link from "next/link";
import { HiTerminal } from "react-icons/hi";

/**
 * Logo component for ThoughtfulCode brand
 *
 * Design concept:
 * - HiTerminal icon (code/terminal) on the left
 * - "Thoughtful" in Baloo 2 (human, approachable)
 * - "Code" in monospace (technical, programming)
 * - "()" method invocation suffix (developer-friendly)
 * - Different font weights for visual hierarchy
 *
 * Result: [Terminal Icon] ThoughtfulCode()
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
            parens: "text-sm",
            icon: "h-5 w-5",
        },
        default: {
            container: "text-xl",
            parens: "text-lg",
            icon: "h-7 w-7",
        },
        large: {
            container: "text-3xl",
            parens: "text-2xl",
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
                {/* "Thoughtful" - Baloo 2, lighter weight (modifier) */}
                <span className="font-baloo font-medium text-slate-50">
                    Thoughtful
                </span>
                {/* "Code" - Monospace, bold weight (primary focus) */}
                <span className="font-mono font-bold text-primary">Code</span>
                {/* "()" - Method invocation, subtle */}
                <span
                    className={`font-mono font-normal text-muted ${sizes[size].parens}`}
                >
                    ()
                </span>
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
            aria-label="ThoughtfulCode Home"
        >
            {logoContent}
        </Link>
    );
}
