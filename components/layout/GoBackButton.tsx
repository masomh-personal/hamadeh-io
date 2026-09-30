"use client";

import { HiArrowLeft } from "react-icons/hi";
import { Button } from "@/components/ui";

export function GoBackButton(): React.ReactElement {
    return (
        <Button
            variant="secondary"
            icon={<HiArrowLeft />}
            iconSize="lg"
            onClick={() => window.history.back()}
        >
            Go Back
        </Button>
    );
}
