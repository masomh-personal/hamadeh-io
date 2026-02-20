export function StylingFontShowcase(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Font Family Showcase
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="surface-outline rounded-md p-6">
                    <h3 className="mb-4 font-heading text-2xl font-bold text-white">
                        Baloo 2 (Headings)
                    </h3>
                    <p className="mb-2 text-sm text-slate-400">
                        Friendly, rounded, attention-grabbing
                    </p>
                    <p className="text-base leading-relaxed text-slate-300">
                        This font adds personality and warmth to your portfolio.
                        Perfect for hero sections and major headings where you
                        want to make an impact.
                    </p>
                </div>

                <div className="surface-outline rounded-md p-6">
                    <h3 className="mb-4 text-2xl font-semibold text-white">
                        Plus Jakarta Sans (Body)
                    </h3>
                    <p className="mb-2 text-sm text-slate-400">
                        Modern, geometric, highly readable
                    </p>
                    <p className="text-base leading-relaxed text-slate-300">
                        This modern sans-serif font ensures excellent
                        readability at all sizes with a contemporary geometric
                        feel. Perfect for body text, paragraphs, and content
                        where clarity and modern aesthetics are paramount.
                    </p>
                </div>

                <div className="surface-outline rounded-md p-6">
                    <h3 className="mb-4 font-mono text-2xl font-semibold text-white">
                        Fira Code (Code)
                    </h3>
                    <p className="mb-2 text-sm text-slate-400">
                        Modern monospace with ligatures, crisp & professional
                    </p>
                    <p className="font-mono text-base leading-relaxed text-slate-300">
                        This modern monospace font features programming
                        ligatures that improve code readability. It&apos;s
                        crisp, professional, and designed specifically for
                        coding with excellent character distinction and balanced
                        proportions.
                    </p>
                </div>
            </div>
        </section>
    );
}
