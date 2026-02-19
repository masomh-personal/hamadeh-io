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
            className="absolute top-3 right-3 z-10 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
        >
            {copied ? (
                <HiCheck className="h-4 w-4 text-green-400" />
            ) : (
                <HiClipboard className="h-4 w-4" />
            )}
        </button>
    );
}
