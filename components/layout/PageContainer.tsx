import { cn } from "@/lib/utils";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PAGE_CONTAINER_BASE_CLASS = "mx-auto w-full max-w-6xl px-6 py-4 md:py-6";

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
