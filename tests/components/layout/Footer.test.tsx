/**
 * Footer Component Tests
 * Tests for Footer component rendering and behavior
 */

/// <reference lib="dom" />

import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer component", () => {
    describe("Basics", () => {
        test("renders copyright text with current year", () => {
            render(<Footer />);
            const currentYear = new Date().getFullYear().toString();
            expect(
                screen.getByText(new RegExp(currentYear))
            ).toBeInTheDocument();
        });

        test("renders ThoughtfulCode brand name", () => {
            render(<Footer />);
            expect(screen.getByText(/ThoughtfulCode/)).toBeInTheDocument();
        });

        test("renders 'All rights reserved' text", () => {
            render(<Footer />);
            expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
        });
    });

    describe("Social Links", () => {
        test("renders GitHub link", () => {
            render(<Footer />);
            const githubLink = screen.getByLabelText("GitHub");
            expect(githubLink).toBeInTheDocument();
            expect(githubLink).toHaveAttribute("href", "https://github.com");
        });

        test("renders LinkedIn link", () => {
            render(<Footer />);
            const linkedinLink = screen.getByLabelText("LinkedIn");
            expect(linkedinLink).toBeInTheDocument();
            expect(linkedinLink).toHaveAttribute(
                "href",
                "https://linkedin.com"
            );
        });

        test("social links open in new tab", () => {
            render(<Footer />);
            const githubLink = screen.getByLabelText("GitHub");
            const linkedinLink = screen.getByLabelText("LinkedIn");

            expect(githubLink).toHaveAttribute("target", "_blank");
            expect(linkedinLink).toHaveAttribute("target", "_blank");
        });

        test("social links have security attributes", () => {
            render(<Footer />);
            const githubLink = screen.getByLabelText("GitHub");
            const linkedinLink = screen.getByLabelText("LinkedIn");

            expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
            expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    describe("Accessibility", () => {
        test("footer has semantic landmark", () => {
            render(<Footer />);
            expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        });

        test("social links have accessible labels", () => {
            render(<Footer />);
            expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
            expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
        });
    });
});
