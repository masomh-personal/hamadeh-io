import { cn } from "@/lib/utils";
import { BackToHomeLink } from "./BackToHomeLink";

interface PageHeaderProps {
    /** Main page title (h1) */
    title: string;
    /** Optional avatar/headshot shown to the left of the title */
    avatar?: React.ReactNode;
    /** Optional short description below the title */
    description?: React.ReactNode;
    /** Extra class for the header wrapper (e.g. mb-10) */
    className?: string;
    /** Size of the title: default (standard h1) or large (hero-style) */
    titleSize?: "default" | "large";
    /** Extra class for the description paragraph */
    descriptionClassName?: string;
    /** Whether to show the Back to Home link (default true) */
    showBackLink?: boolean;
    /** Optional actions (e.g. buttons/links). Rendered below the description and Back to Home link, inside the main content flow. */
    actions?: React.ReactNode;
}

const titleSizeClasses = {
    default: "font-extrabold text-white",
    large: "font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl",
};

export function PageHeader({
    title,
    avatar,
    description,
    className,
    titleSize = "default",
    descriptionClassName,
    showBackLink = true,
    actions,
}: PageHeaderProps): React.ReactElement {
    const content = (
        <>
            <h1
                className={cn(
                    titleSizeClasses[titleSize],
                    "text-center md:text-left"
                )}
            >
                {title}
            </h1>
            {description != null && (
                <p
                    className={cn(
                        "text-content-muted mt-2",
                        descriptionClassName
                    )}
                >
                    {description}
                </p>
            )}
            {(showBackLink || actions != null) && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold">
                    {showBackLink ? <BackToHomeLink /> : <span />}
                    {actions}
                </div>
            )}
        </>
    );

    if (avatar != null) {
        return (
            <header
                className={cn(
                    "mb-4 grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr] md:gap-6 md:items-start",
                    className
                )}
            >
                <div className="shrink-0 place-self-center pr-4 md:place-self-start md:border-r-2 md:border-slate-600/80 md:pr-8">
                    {avatar}
                </div>
                <div>{content}</div>
            </header>
        );
    }

    return <header className={cn("mb-4", className)}>{content}</header>;
}
