/**
 * Header Component Tests
 * Tests for Header component rendering and behavior
 */

/// <reference lib="dom" />

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Dynamic import to ensure mocks are applied first
const { Header } = await import("@/components/layout/Header");

describe("Header component", () => {
    beforeEach(() => {
        cleanup();
    });

    describe("Basics", () => {
        test("renders the logo/brand name", () => {
            render(<Header />);
            expect(screen.getByText("ThoughtfulCode")).toBeInTheDocument();
        });

        test("renders navigation links", () => {
            render(<Header />);
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("LeetCode")).toBeInTheDocument();
            expect(screen.getByText("Blog")).toBeInTheDocument();
            expect(screen.getByText("About")).toBeInTheDocument();
        });

        test("renders mobile menu button", () => {
            render(<Header />);
            expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
        });
    });

    describe("Navigation Links", () => {
        test("logo links to home", () => {
            render(<Header />);
            const logo = screen.getByText("ThoughtfulCode");
            expect(logo.closest("a")).toHaveAttribute("href", "/");
        });

        test("navigation links have correct hrefs", () => {
            render(<Header />);
            expect(screen.getByText("Home").closest("a")).toHaveAttribute(
                "href",
                "/"
            );
            expect(screen.getByText("LeetCode").closest("a")).toHaveAttribute(
                "href",
                "/leetcode"
            );
            expect(screen.getByText("Blog").closest("a")).toHaveAttribute(
                "href",
                "/blog"
            );
            expect(screen.getByText("About").closest("a")).toHaveAttribute(
                "href",
                "/about"
            );
        });
    });

    describe("Mobile Menu", () => {
        test("mobile menu is closed by default", () => {
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");
            expect(menuButton).toHaveAttribute("aria-expanded", "false");
        });

        test("mobile menu opens when toggle is clicked", async () => {
            const user = userEvent.setup();
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");
            await user.click(menuButton);
            expect(menuButton).toHaveAttribute("aria-expanded", "true");
        });

        test("mobile menu closes when toggle is clicked again", async () => {
            const user = userEvent.setup();
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");
            await user.click(menuButton); // Open
            await user.click(menuButton); // Close
            expect(menuButton).toHaveAttribute("aria-expanded", "false");
        });
    });

    describe("Accessibility", () => {
        test("header has semantic landmark", () => {
            render(<Header />);
            expect(screen.getByRole("banner")).toBeInTheDocument();
        });

        test("mobile menu button has accessible label", () => {
            render(<Header />);
            expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
        });
    });
});
