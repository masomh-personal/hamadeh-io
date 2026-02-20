export function StylingSpacing(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Spacing & Layout
            </h2>

            <div className="surface-outline space-y-6 rounded-md p-8">
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Generous Whitespace
                    </h3>
                    <p className="text-slate-400">
                        We use generous spacing between sections (py-20 to
                        py-32) and comfortable padding within components for
                        better readability.
                    </p>
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Clear Hierarchy
                    </h3>
                    <p className="text-slate-400">
                        Headings have proper spacing (mb-6 to mb-8), and
                        paragraphs maintain consistent rhythm with mb-6 spacing.
                    </p>
                </div>
            </div>
        </section>
    );
}
