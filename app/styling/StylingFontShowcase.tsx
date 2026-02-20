export function StylingFontShowcase(): React.ReactElement {
    return (
        <section className="mb-20" aria-labelledby="fonts-heading">
            <h2
                id="fonts-heading"
                className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl"
            >
                Font Family Showcase
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="surface-card radius-card p-6">
                    <h3 className="mb-4 font-heading text-xl font-bold text-white">
                        Quicksand (Headings)
                    </h3>
                    <p className="text-content-subtle mb-2 text-sm">
                        Rounded, friendly, section titles
                    </p>
                    <p className="text-content text-sm leading-relaxed">
                        Used for h1–h3 and buttons. Provides clear hierarchy and
                        a modern, approachable feel.
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <h3 className="mb-4 font-body text-xl font-semibold text-white">
                        Lexend (Body)
                    </h3>
                    <p className="text-content-subtle mb-2 text-sm">
                        Highly readable, geometric
                    </p>
                    <p className="text-content text-sm leading-relaxed">
                        Default body font for paragraphs and content. Optimized
                        for readability at all sizes.
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <h3 className="mb-4 font-baloo text-xl font-bold text-white">
                        Baloo 2 (Accent)
                    </h3>
                    <p className="text-content-subtle mb-2 text-sm">
                        Playful, rounded, personality
                    </p>
                    <p className="text-content text-sm leading-relaxed">
                        Used for logo, badges, and decorative accents where we
                        want warmth and character.
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <h3 className="mb-4 font-mono text-xl font-semibold text-white">
                        Fira Code (Code)
                    </h3>
                    <p className="text-content-subtle mb-2 text-sm">
                        Monospace with ligatures
                    </p>
                    <p className="font-mono text-content text-sm leading-relaxed">
                        Primary monospace for code blocks and technical
                        snippets. Ligatures improve code readability.
                    </p>
                </div>
            </div>
        </section>
    );
}
