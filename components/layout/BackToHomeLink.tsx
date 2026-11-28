import { HiArrowLeft } from "react-icons/hi";
import { Link } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BackToHomeLinkProps {
    className?: string;
}

export function BackToHomeLink({ className }: BackToHomeLinkProps) {
    return (
        <Link
            href="/"
            variant="muted"
            icon={
                <HiArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
            }
            iconPosition="left"
            className={cn(
                "group inline-flex items-center whitespace-nowrap",
                className
            )}
        >
            Back to Home
        </Link>
    );
}
