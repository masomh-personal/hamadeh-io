"use client";

import { useCallback, useState } from "react";
import { HiCheck, HiClipboard } from "react-icons/hi";

export function CopyCodeButton({ code }: { code: string }): React.ReactElement {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [code]);

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="cursor-pointer rounded-md border border-transparent p-1.5 text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform-gpu hover:scale-110 hover:border-primary/40 hover:bg-primary/10 hover:text-primary-hover active:scale-90 active:duration-150 motion-reduce:transform-none"
        >
            {copied ? (
                <HiCheck className="h-4 w-4 text-green-400" />
            ) : (
                <HiClipboard className="h-4 w-4" />
            )}
        </button>
    );
}
