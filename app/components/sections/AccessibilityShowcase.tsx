import { HiCheckCircle } from "react-icons/hi";

export function AccessibilityShowcase(): React.ReactElement {
    return (
        <section>
            <h2 className="font-bold text-white">Accessibility QA Checklist</h2>
            <p className="text-content-muted mb-6">
                Quick manual checks for every component polish pass.
            </p>

            <div className="surface-card space-y-3 rounded-lg p-4">
                <p className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                    Manual checklist
                </p>
                <ul className="text-content space-y-2">
                    <li className="flex items-start gap-2">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        Keyboard-only navigation works for tabs and interactive
                        examples.
                    </li>
                    <li className="flex items-start gap-2">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        Focus indicators remain visible on dark surfaces.
                    </li>
                    <li className="flex items-start gap-2">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        Disabled and loading states are distinguishable from
                        default states.
                    </li>
                    <li className="flex items-start gap-2">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        Icon-only actions include
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                            aria-label
                        </code>
                        or equivalent text alternatives.
                    </li>
                    <li className="flex items-start gap-2">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        Text contrast is readable against card backgrounds and
                        active tab states.
                    </li>
                </ul>
            </div>
        </section>
    );
}
