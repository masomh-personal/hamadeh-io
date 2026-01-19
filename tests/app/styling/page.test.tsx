/**
 * Styling Showcase Page Tests
 * Basic smoke tests to ensure the styling reference page renders correctly
 */

/// <reference lib="dom" />

import { cleanup, render, screen } from "@testing-library/react";

// Dynamic import to ensure mocks are applied first
const StylingShowcase = (await import("@/app/styling/page")).default;

describe("Styling Showcase Page", () => {
    beforeEach(() => {
        cleanup();
    });

    describe("Basics", () => {
        test("renders without crashing", () => {
            render(<StylingShowcase />);
            expect(document.body).toBeInTheDocument();
        });

        test("renders main heading", () => {
            render(<StylingShowcase />);
            expect(
                screen.getByText("ThoughtfulCode Styling Guide")
            ).toBeInTheDocument();
        });

        test("renders all major sections", () => {
            render(<StylingShowcase />);

            // Check for major section headings
            expect(
                screen.getByText("Typography Hierarchy")
            ).toBeInTheDocument();
            expect(screen.getByText("Color Palette")).toBeInTheDocument();
            expect(
                screen.getByText("Buttons & Interactive Elements")
            ).toBeInTheDocument();
            expect(screen.getByText("Code Block Example")).toBeInTheDocument();
        });
    });

    describe("Component Examples", () => {
        test("renders button examples", () => {
            render(<StylingShowcase />);

            expect(screen.getAllByText("Get Started").length).toBeGreaterThan(
                0
            );
            expect(
                screen.getAllByText("Primary Button").length
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText("Secondary Button").length
            ).toBeGreaterThan(0);
        });

        test("renders typography examples", () => {
            render(<StylingShowcase />);

            expect(
                screen.getByText("Heading 1 - Baloo 2 ExtraBold")
            ).toBeInTheDocument();
            expect(
                screen.getByText("Heading 2 - Baloo 2 Bold")
            ).toBeInTheDocument();
        });

        test("renders color palette swatches", () => {
            render(<StylingShowcase />);

            expect(screen.getByText("Primary Accent")).toBeInTheDocument();
            expect(screen.getByText("Secondary Accent")).toBeInTheDocument();
            expect(screen.getByText("Tertiary Accent")).toBeInTheDocument();
        });
    });

    describe("Content Sections", () => {
        test("renders font family showcase", () => {
            render(<StylingShowcase />);

            expect(
                screen.getByText("Font Family Showcase")
            ).toBeInTheDocument();
            expect(screen.getByText("Baloo 2 (Headings)")).toBeInTheDocument();
            expect(
                screen.getByText("Plus Jakarta Sans (Body)")
            ).toBeInTheDocument();
            expect(screen.getByText("Fira Code (Code)")).toBeInTheDocument();
        });

        test("renders spacing and layout section", () => {
            render(<StylingShowcase />);

            expect(screen.getByText("Spacing & Layout")).toBeInTheDocument();
            expect(screen.getByText("Generous Whitespace")).toBeInTheDocument();
        });
    });
});
