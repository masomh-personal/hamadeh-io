export function StylingHero(): React.ReactElement {
    return (
        <section className="mb-20 text-center">
            <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                ThoughtfulCode Styling Guide
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400 md:text-2xl">
                A comprehensive showcase of our typography, colors, and
                component styling.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
                <button
                    type="button"
                    className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400"
                >
                    Get Started
                </button>
                <button
                    type="button"
                    className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-heading text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg"
                >
                    Learn More
                </button>
            </div>
        </section>
    );
}
