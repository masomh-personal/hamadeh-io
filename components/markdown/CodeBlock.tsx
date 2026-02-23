import type { ComponentPropsWithoutRef } from "react";
import { CopyCodeButton } from "./CopyCodeButton";

function extractTextContent(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";

    if (Array.isArray(node)) {
        return node.map(extractTextContent).join("");
    }

    if (typeof node === "object" && "props" in node) {
        const element = node as React.ReactElement<{
            children?: React.ReactNode;
        }>;
        return extractTextContent(element.props.children);
    }

    return "";
}

interface CodeChildProps {
    "data-language"?: string;
    children?: React.ReactNode;
}

const LANGUAGE_LABELS: Record<string, string> = {
    ts: "typescript",
    js: "javascript",
    tsx: "typescript (react)",
    jsx: "javascript (react)",
    py: "python",
    rb: "ruby",
    sh: "shell",
    bash: "bash",
    yml: "yaml",
    md: "markdown",
};

function extractLanguage(children: React.ReactNode): string | undefined {
    if (!children || typeof children !== "object" || !("props" in children)) {
        return undefined;
    }
    const props = (children as React.ReactElement<CodeChildProps>).props;
    return props["data-language"] ?? undefined;
}

function getLanguageLabel(language: string): string {
    return LANGUAGE_LABELS[language] ?? language;
}

export function CodeBlock(
    props: ComponentPropsWithoutRef<"pre">
): React.ReactElement {
    const code = extractTextContent(props.children).trimEnd();
    const language = extractLanguage(props.children);

    const label = language ? getLanguageLabel(language) : undefined;

    return (
        <div className="relative">
            <div className="absolute top-2.5 right-2.5 z-10">
                <CopyCodeButton code={code} language={label} />
            </div>
            <pre {...props} />
        </div>
    );
}
