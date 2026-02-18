import { format, parseISO } from "date-fns";

/**
 * Format ISO date strings for UI display.
 */
export function formatPublishedDate(isoDate: string): string {
    return format(parseISO(isoDate), "MMMM d, yyyy");
}
