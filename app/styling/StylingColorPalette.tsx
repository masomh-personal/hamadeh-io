export function StylingColorPalette(): React.ReactElement {
    return (
        <section className="mb-20" aria-labelledby="color-heading">
            <h2
                id="color-heading"
                className="mb-8 font-heading text-2xl font-bold leading-tight text-white md:text-3xl"
            >
                Color Palette
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="surface-card radius-card p-6">
                    <div className="mb-4 h-24 rounded-md bg-primary" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Primary
                    </h3>
                    <p className="text-content-subtle text-sm">Sky (accent)</p>
                    <p className="text-content-muted mt-2 text-xs">
                        Links, buttons, interactive elements
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <div className="mb-4 h-24 rounded-md bg-secondary" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Secondary
                    </h3>
                    <p className="text-content-subtle text-sm">Emerald</p>
                    <p className="text-content-muted mt-2 text-xs">
                        Success states, positive indicators
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <div className="mb-4 h-24 rounded-md bg-tertiary" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Tertiary
                    </h3>
                    <p className="text-content-subtle text-sm">Amber</p>
                    <p className="text-content-muted mt-2 text-xs">
                        Highlights, badges, emphasis
                    </p>
                </div>

                <div className="surface-card radius-card p-6">
                    <div className="mb-4 h-24 rounded-md bg-slate-100" />
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Neutral
                    </h3>
                    <p className="text-content-subtle text-sm">Slate scale</p>
                    <p className="text-content-muted mt-2 text-xs">
                        Backgrounds, text, borders
                    </p>
                </div>
            </div>
        </section>
    );
}
