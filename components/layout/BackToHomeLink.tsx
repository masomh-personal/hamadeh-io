import { HiArrowLeft } from "react-icons/hi";
import { Link } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BackToHomeLinkProps {
    className?: string;
}

export function BackToHomeLink({
    className,
}: BackToHomeLinkProps): React.ReactElement {
    return (
        <Link
            href="/"
            variant="muted"
            icon={<HiArrowLeft className="h-3.5 w-3.5" />}
            iconPosition="left"
            className={cn(
                "inline-flex items-center whitespace-nowrap",
                className
            )}
        >
            Back to Home
        </Link>
    );
}
