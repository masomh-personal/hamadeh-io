const PROSE_WORDS_PER_MINUTE = 200;
// Code is read line by line and more slowly than prose, so it is weighted apart.
const CODE_LINES_PER_MINUTE = 20;

const FENCE_MARKERS = ["```", "~~~"] as const;

function getFenceMarker(line: string): string | undefined {
    const trimmed = line.trimStart();
    return FENCE_MARKERS.find((marker) => trimmed.startsWith(marker));
}

function countWords(line: string): number {
    let words = 0;
    let inWord = false;

    for (const char of line) {
        const isSpace = char.trim() === "";

        if (!isSpace && !inWord) {
            words++;
        }
        inWord = !isSpace;
    }

    return words;
}

/**
 * Estimates reading time in whole minutes (minimum 1) from a Markdown body.
 * Single pass over the lines: lines inside a fenced block count as code, all
 * others count as prose words. An unclosed fence treats the rest as code.
 */
export function getReadingTimeMinutes(markdown: string): number {
    let words = 0;
    let codeLines = 0;
    let openFence: string | undefined;

    for (const line of markdown.split("\n")) {
        const marker = getFenceMarker(line);

        if (openFence === undefined) {
            if (marker === undefined) {
                words += countWords(line);
            } else {
                openFence = marker;
            }
        } else if (marker === openFence) {
            openFence = undefined;
        } else {
            codeLines++;
        }
    }

    const minutes =
        words / PROSE_WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE;

    return Math.max(1, Math.ceil(minutes));
}

export function formatReadingTime(minutes: number): string {
    return `${minutes} min read`;
}
