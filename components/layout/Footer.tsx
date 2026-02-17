import { IoHeart } from "react-icons/io5";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Link } from "@/components/ui";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="mx-auto max-w-6xl px-6 py-6">
                <div className="flex flex-col items-center gap-1.5">
                    {/* Social Links */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="https://github.com/masomh-personal"
                            target="_blank"
                            external
                            variant="muted"
                            showIcon={false}
                            className="inline-flex items-center justify-center rounded-md p-1.5 leading-none"
                            aria-label="GitHub"
                        >
                            <SiGithub className="footer-icon" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/masomh/"
                            target="_blank"
                            external
                            variant="muted"
                            showIcon={false}
                            className="inline-flex items-center justify-center rounded-md p-1.5 leading-none"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="footer-icon" />
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-content-subtle text-xs leading-tight">
                        &copy; {currentYear} | ThoughtfulCode. All rights
                        reserved.
                    </p>

                    {/* Tagline */}
                    <p className="text-content-subtle flex items-center gap-1.5 font-baloo text-sm leading-tight font-bold">
                        Made with
                        <IoHeart className="text-rose-500" aria-hidden="true" />
                        in ATL
                    </p>
                </div>
            </div>
        </footer>
    );
}
