import { SiGithub, SiLinkedin } from "react-icons/si";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-sm text-slate-400">
                        © {currentYear} ThoughtfulCode. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 transition-colors hover:text-sky-400"
                            aria-label="GitHub"
                        >
                            <SiGithub className="h-5 w-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 transition-colors hover:text-sky-400"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
