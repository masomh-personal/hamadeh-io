export function StylingInteractive(): React.ReactElement {
    return (
        <section className="mb-20">
            <h2 className="mb-8 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                Buttons & Interactive Elements
            </h2>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="button"
                    className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                >
                    Primary Button
                </button>
                <button
                    type="button"
                    className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-heading text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg"
                >
                    Secondary Button
                </button>
                <button
                    type="button"
                    className="rounded-md border-2 border-transparent bg-emerald-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-emerald-300 hover:bg-emerald-400"
                >
                    Success Button
                </button>
                <button
                    type="button"
                    className="cursor-pointer border-none bg-transparent p-0 font-heading text-base font-semibold text-sky-500 transition-colors hover:text-sky-400 hover:underline"
                >
                    Link Example
                </button>
            </div>
        </section>
    );
}
