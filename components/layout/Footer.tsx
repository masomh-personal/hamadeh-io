import { IoHeart } from "react-icons/io5";
import { SiGithub, SiLinkedin } from "react-icons/si";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-2.5">
                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/masomh-personal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors hover:text-primary"
                            aria-label="GitHub"
                        >
                            <SiGithub className="footer-icon" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/masomh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors hover:text-primary"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="footer-icon" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-slate-400">
                        &copy; {currentYear} ThoughtfulCode | All rights
                        reserved.
                    </p>

                    {/* Tagline */}
                    <p className="flex items-center gap-2 font-baloo text-sm text-slate-400 font-semibold">
                        Made with
                        <IoHeart className="text-rose-500" aria-hidden="true" />
                        in ATL
                    </p>
                </div>
            </div>
        </footer>
    );
}
