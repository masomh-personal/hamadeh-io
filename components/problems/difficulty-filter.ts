import type { Difficulty } from "@/lib/problem-listing";

interface DifficultyPresentation {
    label: string;
    color: string;
    bgColor: string;
}

const DIFFICULTY_BACKGROUND_ALPHA = "2E";

// Foreground colors match the `leetcode-*` Badge variants so a card's badge
// and the filter pill that selects it read as the same thing.
const DIFFICULTY_COLORS: Record<Difficulty, DifficultyPresentation["color"]> = {
    easy: "#00D3BC",
    medium: "#FFD35E",
    hard: "#FF6B88",
};

export function getDifficultyPresentation(
    difficulty: Difficulty
): DifficultyPresentation {
    const color = DIFFICULTY_COLORS[difficulty];

    return {
        label: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        color,
        bgColor: `${color}${DIFFICULTY_BACKGROUND_ALPHA}`,
    };
}
