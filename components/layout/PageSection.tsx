import { cn } from "@/lib/utils";

interface PageSectionProps extends React.ComponentPropsWithoutRef<"section"> {
    children: React.ReactNode;
}

const PAGE_SECTION_BASE_CLASS = "mb-8 md:mb-10 last:mb-0";

export function PageSection({
    children,
    className,
    ...props
}: PageSectionProps): React.ReactElement {
    return (
        <section className={cn(PAGE_SECTION_BASE_CLASS, className)} {...props}>
            {children}
        </section>
    );
}
