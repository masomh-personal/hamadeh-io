import Link from "next/link";

/**
 * Logo component for ThoughtfulCode brand
 *
 * Design concept:
 * - "Thoughtful" in Baloo 2 (human, approachable)
 * - "Code" in monospace (technical, programming)
 * - "()" method invocation suffix (developer-friendly)
 * - Different font weights for visual hierarchy
 *
 * Result: ThoughtfulCode()
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
            container: "text-base", // 16px
            parens: "text-sm", // 14px
        },
        default: {
            container: "text-xl", // 20px
            parens: "text-lg", // 18px
        },
        large: {
            container: "text-3xl", // 30px
            parens: "text-2xl", // 24px
        },
    };

    const logoContent = (
        <span className={`flex items-baseline ${sizes[size].container}`}>
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
    );

    if (!clickable) {
        return logoContent;
    }

    return (
        <Link
            href="/"
            className="transition-opacity hover:opacity-80"
            aria-label="ThoughtfulCode Home"
        >
            {logoContent}
        </Link>
    );
}
