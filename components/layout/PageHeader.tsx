import { cn } from "@/lib/utils";
import { BackToHomeLink } from "./BackToHomeLink";

interface PageHeaderProps {
    /** Main page title (h1) */
    title: string;
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
    /** Optional actions (e.g. buttons/links). When set, header is flex: title+description+back link left, actions right. Back to Home stays underneath like other pages. */
    actions?: React.ReactNode;
}

const titleSizeClasses = {
    default: "font-extrabold text-white",
    large: "font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl",
};

export function PageHeader({
    title,
    description,
    className,
    titleSize = "default",
    descriptionClassName,
    showBackLink = true,
    actions,
}: PageHeaderProps): React.ReactElement {
    const content = (
        <>
            <h1 className={titleSizeClasses[titleSize]}>{title}</h1>
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
            {showBackLink && <BackToHomeLink className="mt-4" />}
        </>
    );

    if (actions != null) {
        return (
            <header
                className={cn(
                    "mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
                    className
                )}
            >
                <div>{content}</div>
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                    {actions}
                </div>
            </header>
        );
    }

    return <header className={cn("mb-4", className)}>{content}</header>;
}
