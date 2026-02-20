import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
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
            <PageHeader
                title="Styling Guide"
                description="Typography, colors, fonts, spacing, and interactive patterns using our design tokens and shared components."
                className="mb-10"
                titleSize="large"
                descriptionClassName="max-w-2xl text-base leading-relaxed"
            />

            <StylingTypography />
            <StylingFontShowcase />
            <StylingColorPalette />
            <StylingInteractive />
            <StylingCodeBlock />
            <StylingSpacing />
        </PageContainer>
    );
}
