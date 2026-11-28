import { useEffect, useRef } from "react";

export { createHeadingIdAllocator, slugifyHeading } from "@/lib/heading-id";

interface RichMarkdownContentProps {
    html: string;
}

/**
 * Renders precompiled, Shiki-highlighted Markdown HTML and wires copy-code
 * buttons through a single delegated click listener.
 */
export function RichMarkdownContent({
    html,
}: RichMarkdownContentProps): React.ReactElement {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const timers = new Map<
            HTMLButtonElement,
            ReturnType<typeof setTimeout>
        >();

        const handleClick = (event: MouseEvent): void => {
            const target = event.target as HTMLElement | null;
            const button = target?.closest<HTMLButtonElement>(
                "button[data-copy-code]"
            );
            if (!button) {
                return;
            }

            const block = button.closest("[data-code-block]");
            const code =
                block?.querySelector("pre code")?.textContent?.trimEnd() ?? "";
            const copyIcon =
                button.querySelector<SVGElement>("[data-copy-icon]");
            const copiedIcon =
                button.querySelector<SVGElement>("[data-copied-icon]");
            const statusOutput =
                block?.querySelector<HTMLOutputElement>("[data-copy-status]");

            const setStatus = (status: "idle" | "copied" | "failed"): void => {
                if (status === "copied") {
                    button.setAttribute("aria-label", "Copied");
                    copyIcon?.classList.add("hidden");
                    copiedIcon?.classList.remove("hidden");
                    if (statusOutput) {
                        statusOutput.textContent = "Code copied to clipboard";
                    }
                    return;
                }

                if (status === "failed") {
                    button.setAttribute("aria-label", "Copy failed, try again");
                    copyIcon?.classList.remove("hidden");
                    copyIcon?.classList.add("text-red-300");
                    copiedIcon?.classList.add("hidden");
                    if (statusOutput) {
                        statusOutput.textContent = "Copy failed, try again";
                    }
                    return;
                }

                button.setAttribute("aria-label", "Copy code");
                copyIcon?.classList.remove("hidden", "text-red-300");
                copiedIcon?.classList.add("hidden");
                if (statusOutput) {
                    statusOutput.textContent = "";
                }
            };

            void (async () => {
                try {
                    await navigator.clipboard.writeText(code);
                    setStatus("copied");
                } catch {
                    setStatus("failed");
                }

                const existingTimer = timers.get(button);
                if (existingTimer !== undefined) {
                    clearTimeout(existingTimer);
                }
                const nextTimer = setTimeout(() => {
                    setStatus("idle");
                    timers.delete(button);
                }, 2000);
                timers.set(button, nextTimer);
            })();
        };

        container.addEventListener("click", handleClick);

        return () => {
            container.removeEventListener("click", handleClick);
            for (const timer of timers.values()) {
                clearTimeout(timer);
            }
            timers.clear();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="prose prose-invert prose-content max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
