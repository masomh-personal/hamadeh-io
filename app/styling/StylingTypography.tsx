export function StylingTypography(): React.ReactElement {
    return (
        <section className="mb-20" aria-labelledby="typography-heading">
            <h2
                id="typography-heading"
                className="mb-8 font-heading text-2xl font-bold leading-tight text-white md:text-3xl"
            >
                Typography Hierarchy
            </h2>

            <div className="space-y-8">
                <div>
                    <h1 className="mb-2 font-heading text-3xl font-extrabold leading-tight text-white md:text-4xl">
                        Heading 1 – Quicksand
                    </h1>
                    <p className="text-content-muted text-sm">
                        Used for hero sections and main page titles
                    </p>
                </div>

                <div>
                    <h2 className="mb-2 font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                        Heading 2 – Quicksand
                    </h2>
                    <p className="text-content-muted text-sm">
                        Used for major section headings
                    </p>
                </div>

                <div>
                    <h3 className="mb-2 font-heading text-xl font-semibold leading-tight text-white md:text-2xl">
                        Heading 3 – Quicksand
                    </h3>
                    <p className="text-content-muted text-sm">
                        Used for subsection headings
                    </p>
                </div>

                <div>
                    <h4 className="mb-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                        Heading 4 – Lexend
                    </h4>
                    <p className="text-content-muted text-sm">
                        Used for minor headings
                    </p>
                </div>

                <div>
                    <p className="text-content mb-4 text-base leading-relaxed">
                        Body text uses Lexend (body font) for optimal
                        readability. This is the default for paragraphs, lists,
                        and general content. Line height is 1.6 for comfortable
                        reading.
                    </p>
                    <p className="text-content-muted text-sm leading-relaxed">
                        Small text uses the body font at 14px (0.875rem) for
                        captions, metadata, and secondary information.
                    </p>
                </div>
            </div>
        </section>
    );
}
