const publishedDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

/**
 * Format ISO date strings for UI display.
 */
export function formatPublishedDate(isoDate: string): string {
    return publishedDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
