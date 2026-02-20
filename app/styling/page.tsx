import { PageContainer } from "@/components/layout/PageContainer";
import { StylingCodeBlock } from "./StylingCodeBlock";
import { StylingColorPalette } from "./StylingColorPalette";
import { StylingFontShowcase } from "./StylingFontShowcase";
import { StylingHero } from "./StylingHero";
import { StylingInteractive } from "./StylingInteractive";
import { StylingSpacing } from "./StylingSpacing";
import { StylingTypography } from "./StylingTypography";

export default function StylingShowcase(): React.ReactElement {
    return (
        <PageContainer>
            <StylingHero />
            <StylingTypography />
            <StylingColorPalette />
            <StylingInteractive />
            <StylingCodeBlock />
            <StylingSpacing />
            <StylingFontShowcase />
        </PageContainer>
    );
}
