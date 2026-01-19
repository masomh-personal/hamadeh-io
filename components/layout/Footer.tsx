import { Github, Linkedin } from "lucide-react";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-primary-200 bg-white dark:border-primary-700 dark:bg-primary-900">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-primary-600 dark:text-primary-300">
                        © {currentYear} ThoughtfulCode. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 transition-colors hover:text-secondary-600 dark:text-primary-300 dark:hover:text-secondary-400"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 transition-colors hover:text-secondary-600 dark:text-primary-300 dark:hover:text-secondary-400"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
