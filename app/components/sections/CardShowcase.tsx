import { HiCheckCircle, HiLightningBolt, HiTemplate } from "react-icons/hi";
import { Card } from "@/components/ui";

export function CardShowcase(): React.ReactElement {
    return (
        <section>
            <h2 className="font-bold text-white">Card</h2>
            <p className="text-content-muted mb-4">
                Container hierarchy, information density, and action placement
                with polished rhythm and interaction states.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Single Action"
                    subtitle="Single-action cards render one full-width primary button."
                    icon={<HiCheckCircle className="text-emerald-300" />}
                    className="min-h-68"
                    actions={[{ label: "Action", href: "/components" }]}
                >
                    <p>Body content goes here.</p>
                </Card>

                <Card
                    title="No Actions"
                    subtitle="When no actions are provided, no actions area renders."
                    className="min-h-68"
                >
                    <p>
                        This keeps the layout clean for purely informational
                        cards.
                    </p>
                </Card>

                <Card
                    title="Two Actions"
                    subtitle="Two actions split 50/50 with left primary and right secondary."
                    className="min-h-68"
                    actions={[
                        { label: "Primary", href: "/components" },
                        { label: "Secondary", href: "/about" },
                    ]}
                >
                    <p>Dual actions for confirm/cancel patterns.</p>
                </Card>

                <Card
                    title="With Icon"
                    subtitle="Icons add a visual anchor to the card header."
                    icon={<HiLightningBolt className="text-amber-300" />}
                    className="min-h-68"
                >
                    <p>
                        Icons help differentiate cards at a glance in grid
                        layouts.
                    </p>
                </Card>

                <Card
                    title="Dense Content"
                    subtitle="Cards handle varying content lengths gracefully."
                    icon={<HiTemplate className="text-sky-300" />}
                    className="min-h-68"
                    actions={[{ label: "View details", href: "/components" }]}
                >
                    <p>
                        The body area grows to fill available space while
                        actions stay pinned to the bottom.
                    </p>
                </Card>

                <Card
                    title="Long Subtitle Handling"
                    subtitle="This subtitle is intentionally much longer than ideal to show the presentational-first behavior. The component renders provided content as-is, so consumers can see when copy gets too verbose and decide where to enforce content constraints."
                    className="min-h-68"
                    actions={[{ label: "Review content", href: "/components" }]}
                >
                    <p>Long copy is visible by design.</p>
                </Card>
            </div>
        </section>
    );
}
