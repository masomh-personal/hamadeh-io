import { SiGithub } from "react-icons/si";
import packageJson from "@/package.json";

const GITHUB_REPO = "masomh-personal/hamadeh-io";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();
    const version = packageJson.version ?? "?.?.?";
    const gitBranch = process.env.NEXT_PUBLIC_GIT_BRANCH;
    const gitSha = process.env.NEXT_PUBLIC_GIT_SHA;
    const gitFullSha = process.env.NEXT_PUBLIC_GIT_FULL_SHA;
    const shaLast5 = gitSha ? gitSha.slice(0, 7) : null;
    const repoUrl = `https://github.com/${GITHUB_REPO}`;
    const commitUrl = gitFullSha ? `${repoUrl}/commit/${gitFullSha}` : repoUrl;
    const title = [
        gitBranch && `Branch: ${gitBranch}`,
        gitSha && `SHA: ${gitFullSha || gitSha}`,
    ]
        .filter(Boolean)
        .join("\n");

    return (
        <footer className="w-full border-t border-(--border) bg-(--background)">
            <div className="mx-auto max-w-6xl px-6 py-6">
                <div className="flex flex-col items-center gap-2">
                    {/* Line 1: GitHub badge (v{version} @ {branch} | SHA: {last 5 chars}) */}
                    <a
                        href={commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title || "View repository"}
                        aria-label="GitHub repository"
                        className="group inline-flex items-center gap-2 rounded-md border border-slate-300/70 bg-slate-700/80 px-3 py-1.5 text-[0.6875rem] font-normal tracking-wide shadow-[0_0_14px_rgba(203,213,225,0.12)] backdrop-blur-sm transition-all duration-200 hover:border-slate-200 hover:bg-slate-600/90 hover:shadow-[0_0_18px_rgba(226,232,240,0.22)]"
                    >
                        <span className="flex items-center gap-1.5 font-mono text-white">
                            <SiGithub
                                className="size-3.5 shrink-0 text-slate-300"
                                aria-hidden
                            />
                            <span className="text-sky-400">v{version}</span>
                            <span className="text-slate-400">@</span>
                            <span className="text-emerald-400">
                                {gitBranch || "---"}
                            </span>
                            <span className="text-slate-400">|</span>
                            <span className="text-slate-300">
                                SHA: {shaLast5 || "-------"}
                            </span>
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
