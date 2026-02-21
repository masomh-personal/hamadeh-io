import { SiGithub } from "react-icons/si";

const GITHUB_REPO = "masomh-personal/thoughtfulcode";

export function Footer(): React.ReactElement {
    const currentYear = new Date().getFullYear();
    const gitBranch = process.env.NEXT_PUBLIC_GIT_BRANCH;
    const gitSha = process.env.NEXT_PUBLIC_GIT_SHA;
    const gitFullSha = process.env.NEXT_PUBLIC_GIT_FULL_SHA;
    const shaLast5 = gitSha ? gitSha.slice(-8) : null;
    const badgeLabel = [gitBranch || "---", shaLast5 || "---"].join(" | ");
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
                    {/* Line 1: GitHub badge (branch-sha, sha = last 5 chars) */}
                    <a
                        href={commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title || "View repository"}
                        aria-label="GitHub repository"
                        className="group inline-flex items-center gap-2 rounded-md border border-slate-300/60 bg-slate-600/90 px-2.5 py-1.5 text-[0.625rem] font-medium text-slate-200 shadow-[0_0_14px_rgba(203,213,225,0.12)] backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-500/90 hover:text-white hover:shadow-[0_0_18px_rgba(226,232,240,0.18)]"
                    >
                        <span className="flex items-center gap-1.5 font-mono">
                            <SiGithub
                                className="size-4 shrink-0 opacity-80"
                                aria-hidden
                            />
                            {badgeLabel}
                        </span>
                    </a>

                    {/* Line 2: Copyright and tagline */}
                    <p className="text-content-subtle flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-xs leading-tight">
                        <span>
                            © <strong>{currentYear}</strong> ThoughtfulCode ·
                            Hamadeh.io
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
