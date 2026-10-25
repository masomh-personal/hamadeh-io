const PROSE_WORDS_PER_MINUTE = 200;
// Code is read line by line and more slowly than prose, so it is weighted apart.
const CODE_LINES_PER_MINUTE = 20;

const FENCED_CODE_PATTERN = /^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm;

/**
 * Estimates reading time in whole minutes (minimum 1) from a Markdown body.
 */
export function getReadingTimeMinutes(markdown: string): number {
    let codeLines = 0;
    const prose = markdown.replace(FENCED_CODE_PATTERN, (block) => {
        // Subtract the opening and closing fence lines.
        codeLines += Math.max(0, block.split("\n").length - 2);
        return " ";
    });

    const words = prose.split(/\s+/).filter(Boolean).length;
    const minutes =
        words / PROSE_WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE;

    return Math.max(1, Math.ceil(minutes));
}

export function formatReadingTime(minutes: number): string {
    return `${minutes} min read`;
}
