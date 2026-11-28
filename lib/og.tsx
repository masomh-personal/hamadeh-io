/**
 * Shared Open Graph PNG image renderer powered by Satori and Resvg.
 *
 * Satori supports a narrow CSS subset: flexbox only, no grid, and every element
 * with multiple children needs an explicit display value. Keep the markup boring.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { SITE_NAME } from "./site";

export const OG_SIZE = {
    width: 1200,
    height: 630,
} as const;

export const OG_CONTENT_TYPE = "image/png";

/** A chip in the image footer. `id` is a stable identity, since `text` can repeat. */
export interface OgMetaItem {
    id: string;
    text: string;
}

export interface OgImageOptions {
    title: string;
    eyebrow: string;
    meta?: OgMetaItem[];
}

let fontsPromise:
    | Promise<
          Array<{
              name: string;
              data: ArrayBuffer;
              weight: 400 | 700;
              style: "normal";
          }>
      >
    | undefined;

function loadOgFonts() {
    if (!fontsPromise) {
        const fontDir = join(
            process.cwd(),
            "node_modules",
            "@fontsource",
            "baloo-2",
            "files"
        );
        fontsPromise = Promise.all([
            readFile(join(fontDir, "baloo-2-latin-400-normal.woff")),
            readFile(join(fontDir, "baloo-2-latin-700-normal.woff")),
        ]).then(([regular, bold]) => [
            {
                name: "Baloo 2",
                data: regular.buffer.slice(
                    regular.byteOffset,
                    regular.byteOffset + regular.byteLength
                ),
                weight: 400 as const,
                style: "normal" as const,
            },
            {
                name: "Baloo 2",
                data: bold.buffer.slice(
                    bold.byteOffset,
                    bold.byteOffset + bold.byteLength
                ),
                weight: 700 as const,
                style: "normal" as const,
            },
        ]);
    }
    return fontsPromise;
}

export async function renderOgImagePng({
    title,
    eyebrow,
    meta = [],
}: OgImageOptions): Promise<Uint8Array> {
    const fonts = await loadOgFonts();
    const svg = await satori(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#0f172a",
                padding: "72px",
                borderTop: "16px solid #0ea5e9",
                fontFamily: "Baloo 2",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        display: "flex",
                        fontSize: 28,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#38bdf8",
                    }}
                >
                    {eyebrow}
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 28,
                        fontSize: title.length > 60 ? 64 : 76,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        color: "#f8fafc",
                    }}
                >
                    {title}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{ display: "flex", fontSize: 30, color: "#94a3b8" }}
                >
                    {SITE_NAME}
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    {meta.map((entry) => (
                        <div
                            key={entry.id}
                            style={{
                                display: "flex",
                                padding: "10px 22px",
                                borderRadius: 999,
                                border: "2px solid #334155",
                                fontSize: 26,
                                color: "#cbd5e1",
                            }}
                        >
                            {entry.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        {
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            fonts,
        }
    );

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: "width",
            value: OG_SIZE.width,
        },
    });

    return resvg.render().asPng();
}
