export function StylingColorPalette(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Color Palette
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="surface-outline rounded-md p-6">
                    <div className="mb-4 h-24 rounded-md bg-sky-500"></div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Primary Accent
                    </h3>
                    <p className="text-sm text-slate-400">Sky Blue 500</p>
                    <p className="mt-2 text-xs text-slate-500">
                        Used for links, buttons, and interactive elements
                    </p>
                </div>

                <div className="surface-outline rounded-md p-6">
                    <div className="mb-4 h-24 rounded-md bg-emerald-500"></div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Secondary Accent
                    </h3>
                    <p className="text-sm text-slate-400">Emerald 500</p>
                    <p className="mt-2 text-xs text-slate-500">
                        Used for success states and positive indicators
                    </p>
                </div>

                <div className="surface-outline rounded-md p-6">
                    <div className="mb-4 h-24 rounded-md bg-amber-400"></div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Tertiary Accent
                    </h3>
                    <p className="text-sm text-slate-400">Amber 400 (Gold)</p>
                    <p className="mt-2 text-xs text-slate-500">
                        Used for highlights, badges, and special emphasis
                    </p>
                </div>

                <div className="surface-outline rounded-md p-6">
                    <div className="mb-4 h-24 rounded-md bg-slate-50"></div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                        Neutral
                    </h3>
                    <p className="text-sm text-slate-400">
                        Slate scale (50-950)
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                        Used for backgrounds, text, and borders
                    </p>
                </div>
            </div>
        </section>
    );
}
