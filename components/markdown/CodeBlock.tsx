import type { ComponentPropsWithoutRef } from "react";
import { CopyCodeButton } from "./CopyCodeButton";

interface CodeChildProps {
    className?: string;
    children?: React.ReactNode;
}

const LANGUAGE_LABELS: Record<string, string> = {
    ts: "typescript",
    js: "javascript",
    sh: "shell",
    bash: "bash",
    http: "http",
    json: "json",
    javascript: "javascript",
    typescript: "typescript",
};

// rehype-highlight sets className="hljs language-<lang>" on the <code> element.
function extractLanguage(children: React.ReactNode): string | undefined {
    if (!children || typeof children !== "object" || !("props" in children)) {
        return undefined;
    }
    const props = (children as React.ReactElement<CodeChildProps>).props;
    const className = props.className ?? "";
    const match = /\blanguage-(\w+)\b/.exec(className);
    return match?.[1] ?? undefined;
}

function getLanguageLabel(language: string): string {
    return Object.hasOwn(LANGUAGE_LABELS, language)
        ? (LANGUAGE_LABELS[language] ?? language)
        : language;
}

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
    const language = extractLanguage(props.children);
    const label = language ? getLanguageLabel(language) : undefined;

    return (
        <div className="relative" data-code-block>
            <div className="absolute top-2.5 right-2.5 z-10">
                <CopyCodeButton language={label} />
            </div>
            <pre {...props} />
        </div>
    );
}
