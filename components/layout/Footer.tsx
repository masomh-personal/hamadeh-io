import { IoHeart } from "react-icons/io5";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4">
                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/masomh-personal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 transition-colors hover:text-sky-400"
                            aria-label="GitHub"
                        >
                            <SiGithub className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/masomh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 transition-colors hover:text-sky-400"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="h-5 w-5" />
                        </a>
                    </div>

                    {/* Tagline */}
                    <p className="flex items-center gap-2 text-sm text-slate-400">
                        Made with{" "}
                        <IoHeart className="text-rose-500" aria-hidden="true" />{" "}
                        in ATL
                    </p>

                    {/* Copyright */}
                    <p className="text-sm text-slate-400">
                        © {currentYear} ThoughtfulCode. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
