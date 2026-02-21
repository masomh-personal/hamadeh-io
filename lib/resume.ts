import { existsSync } from "node:fs";
import path from "node:path";

/** Public URL path for the resume PDF (served from public/ or future bucket). */
export const RESUME_PUBLIC_PATH = "/resume.pdf";

/** Returns true if resume.pdf exists in public/. Used for fallback when file is missing. */
export function hasResumePdf(): boolean {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    return existsSync(filePath);
}
