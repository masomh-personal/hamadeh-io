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

export function CodeBlock(
    props: ComponentPropsWithoutRef<"pre">
): React.ReactElement {
    const code = extractTextContent(props.children).trimEnd();

    return (
        <div className="relative">
            <CopyCodeButton code={code} />
            <pre {...props} />
        </div>
    );
}
