import { SiGithub } from "react-icons/si";
import packageJson from "@/package.json";

const GITHUB_REPO = "masomh-personal/hamadeh-io";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();
    const version = packageJson.version ?? "?.?.?";
    const gitBranch = process.env.NEXT_PUBLIC_GIT_BRANCH;
    const gitSha = process.env.NEXT_PUBLIC_GIT_SHA;
    const shaShort = gitSha ? gitSha.slice(0, 7) : null;
    const repoUrl = `https://github.com/${GITHUB_REPO}`;
    const branchUrl = gitBranch ? `${repoUrl}/tree/${gitBranch}` : repoUrl;
    const title = [
        gitBranch && `Branch: ${gitBranch}`,
        gitSha && `SHA: ${gitSha}`,
    ]
        .filter(Boolean)
        .join("\n");

    return (
        <footer className="w-full border-t border-(--border) bg-(--background)">
            <div className="mx-auto max-w-6xl px-6 py-6">
                <div className="flex flex-col items-center gap-2">
                    {/* GitHub badge — colors align with Badge brand/soft tokens */}
                    <a
                        href={branchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title || "View repository"}
                        aria-label="View GitHub repository"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-300/80 bg-slate-500/25 px-4 py-2 font-baloo text-[0.8125rem] font-semibold tracking-[0.03em] text-slate-200 transform-gpu transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-slate-500/35 active:scale-[0.98] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                        <SiGithub className="size-3.5 shrink-0" aria-hidden />
                        <span className="text-secondary">v{version}</span>
                        <span>@ {gitBranch ?? "---"} | SHA:</span>
                        <span className="font-mono font-semibold text-primary">
                            {shaShort ?? "-------"}
                        </span>
                    </a>

                    {/* Line 2: Copyright and tagline */}
                    <p className="text-content-subtle flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-xs leading-tight">
                        <span>
                            © <strong>{currentYear}</strong> hamadeh.io
                        </span>
                        <span aria-hidden>·</span>
                        <span className="font-baloo font-bold">
                            Made with
                            <span className="mx-0.5" aria-hidden>
                                ❤️
                            </span>
                            in ATL
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
