import { createFileRoute } from "@tanstack/react-router";
import { NotFoundContent } from "./__root";

export const Route = createFileRoute("/$")({
    component: NotFoundContent,
});
