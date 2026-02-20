export function StylingTypography(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Typography Hierarchy
            </h2>

            <div className="space-y-8">
                <div>
                    <h1 className="mb-2 font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">
                        Heading 1 - Baloo 2 ExtraBold
                    </h1>
                    <p className="text-sm text-slate-400">
                        Used for hero sections and main page titles
                    </p>
                </div>

                <div>
                    <h2 className="mb-2 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                        Heading 2 - Baloo 2 Bold
                    </h2>
                    <p className="text-sm text-slate-400">
                        Used for major section headings
                    </p>
                </div>

                <div>
                    <h3 className="mb-2 font-heading text-2xl font-semibold leading-tight text-white md:text-3xl">
                        Heading 3 - Baloo 2 SemiBold
                    </h3>
                    <p className="text-sm text-slate-400">
                        Used for subsection headings
                    </p>
                </div>

                <div>
                    <h4 className="mb-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                        Heading 4 - Plus Jakarta Sans SemiBold
                    </h4>
                    <p className="text-sm text-slate-400">
                        Used for minor headings
                    </p>
                </div>

                <div>
                    <p className="mb-4 text-base leading-relaxed text-slate-300">
                        Body text uses Plus Jakarta Sans Regular (400) for
                        optimal readability. This is the default font for all
                        paragraphs, lists, and general content. The line height
                        is set to 1.6 for comfortable reading experience.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Small text uses Plus Jakarta Sans Regular at 14px
                        (0.875rem) for captions, metadata, and secondary
                        information.
                    </p>
                </div>
            </div>
        </section>
    );
}
