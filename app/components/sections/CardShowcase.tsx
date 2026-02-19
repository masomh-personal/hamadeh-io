import { HiCheckCircle } from "react-icons/hi";
import { Card } from "@/components/ui";

export function CardShowcase(): React.ReactElement {
    return (
        <section>
            <h2 className="font-bold text-white">Card</h2>
            <p className="text-content-muted mb-6">
                Container hierarchy, information density, and action placement
                with polished rhythm and interaction states.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Default + Divider"
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
                    title="Secondary Variant"
                    subtitle="Two actions split 50/50 with left primary and right secondary."
                    variant="secondary"
                    className="min-h-68"
                    actions={[
                        { label: "Primary", href: "/components" },
                        { label: "Secondary", href: "/about" },
                    ]}
                >
                    <p>Different visual weight and tone.</p>
                </Card>

                <Card
                    title="Transparent Variant"
                    subtitle="Great for subtle contexts where you want structure without heavy surface contrast."
                    variant="transparent"
                    className="min-h-68"
                >
                    <p>
                        Transparent keeps hierarchy while blending more with the
                        page background.
                    </p>
                </Card>

                <Card
                    title="Tertiary Variant"
                    subtitle="Useful for warm highlight moments or friendly emphasis blocks."
                    variant="tertiary"
                    className="min-h-68"
                    actions={[
                        { label: "Start", href: "/components" },
                        { label: "Learn more", href: "/about" },
                    ]}
                >
                    <p>
                        Tertiary provides a different tone while preserving the
                        same card structure.
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
