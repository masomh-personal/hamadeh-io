/**
 * Shared page slicing and URL building for filterable list pages. Query values
 * come from the URL, so they are untrusted: anything unusable falls back to a
 * valid page instead of throwing.
 */

export interface PageSlice<T> {
    page: number;
    totalPages: number;
    items: T[];
}

export function paginate<T>(
    items: readonly T[],
    rawPage: string | null | undefined,
    pageSize: number
): PageSlice<T> {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const requestedPage = Number.parseInt(rawPage ?? "", 10);
    const page = Number.isNaN(requestedPage)
        ? 1
        : Math.min(Math.max(requestedPage, 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
        page,
        totalPages,
        items: items.slice(start, start + pageSize),
    };
}

/**
 * Builds a canonical list URL. Empty filters and page 1 are omitted so the
 * default view always collapses to the bare base path.
 */
export function buildListingPath(
    basePath: string,
    filters: Record<string, string | null | undefined>,
    page?: number
): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
        if (value) {
            params.set(key, value);
        }
    }
    if (page !== undefined && page > 1) {
        params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
}
