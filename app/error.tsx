"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui";

interface AppErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AppError({
    error,
    reset,
}: AppErrorProps): React.ReactElement {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <PageContainer className="py-16">
            <div
                role="alert"
                className="surface-card radius-card mx-auto max-w-xl p-8 text-center"
            >
                <h1 className="font-bold text-white">Something went wrong</h1>
                <p className="text-content mt-3">
                    The page could not be rendered. You can retry without losing
                    your place.
                </p>
                <Button className="mt-6" onClick={reset}>
                    Try again
                </Button>
            </div>
        </PageContainer>
    );
}
