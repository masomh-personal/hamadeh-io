export function StylingSpacing(): React.ReactElement {
    return (
        <section className="mb-20" aria-labelledby="spacing-heading">
            <h2
                id="spacing-heading"
                className="mb-8 font-heading text-2xl font-bold leading-tight text-white md:text-3xl"
            >
                Spacing &amp; Layout
            </h2>

            <div className="surface-card radius-card space-y-6 p-8">
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Generous whitespace
                    </h3>
                    <p className="text-content-muted">
                        Sections use mb-20; components use comfortable padding
                        for readability.
                    </p>
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Clear hierarchy
                    </h3>
                    <p className="text-content-muted">
                        Section headings use mb-8; paragraphs use consistent
                        rhythm (e.g. mb-6).
                    </p>
                </div>
            </div>
        </section>
    );
}
