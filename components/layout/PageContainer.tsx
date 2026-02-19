import { cn } from "@/lib/utils";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PAGE_CONTAINER_BASE_CLASS = "mx-auto w-full max-w-6xl px-6 py-8 md:py-10";

export function PageContainer({
    children,
    className,
}: PageContainerProps): React.ReactElement {
    return (
        <div className={cn(PAGE_CONTAINER_BASE_CLASS, className)}>
            {children}
        </div>
    );
}
