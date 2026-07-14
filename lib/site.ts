const DEFAULT_SITE_URL = "https://hamadeh.io";

function resolveSiteUrl(value: string | undefined): URL {
    if (!value) {
        return new URL(DEFAULT_SITE_URL);
    }

    try {
        return new URL(value);
    } catch {
        throw new Error(
            `NEXT_PUBLIC_SITE_URL must be an absolute URL, received "${value}"`
        );
    }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME =
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "hamadeh.io";
export const AUTHOR_NAME =
    process.env.NEXT_PUBLIC_AUTHOR_NAME?.trim() || "Masom Hamadeh";
export const AUTHOR_EMAIL =
    process.env.NEXT_PUBLIC_AUTHOR_EMAIL?.trim() || "masom@hamadeh.io";

/**
 * Builds an absolute URL using the configured public site origin.
 */
export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}
