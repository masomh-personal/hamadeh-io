import { BackToHomeLink } from "@/components/layout/BackToHomeLink";
import { PageContainer } from "@/components/layout/PageContainer";
import { StylingCodeBlock } from "./StylingCodeBlock";
import { StylingColorPalette } from "./StylingColorPalette";
import { StylingFontShowcase } from "./StylingFontShowcase";
import { StylingInteractive } from "./StylingInteractive";
import { StylingSpacing } from "./StylingSpacing";
import { StylingTypography } from "./StylingTypography";

/**
 * Styling showcase: typography, colors, fonts, spacing, and component patterns.
 * Uses design tokens and shared UI components for consistency.
 */
export default function StylingShowcase(): React.ReactElement {
    return (
        <PageContainer>
            <header className="mb-10">
                <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                    Styling Guide
                </h1>
                <p className="text-content-muted mt-2 max-w-2xl text-base leading-relaxed">
                    Typography, colors, fonts, spacing, and interactive patterns
                    using our design tokens and shared components.
                </p>
                <BackToHomeLink className="mt-4" />
            </header>

            <StylingTypography />
            <StylingFontShowcase />
            <StylingColorPalette />
            <StylingInteractive />
            <StylingCodeBlock />
            <StylingSpacing />
        </PageContainer>
    );
}
