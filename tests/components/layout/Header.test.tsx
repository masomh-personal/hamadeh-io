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

        test("mobile menu closes when navigation link is clicked", async () => {
            const user = userEvent.setup();
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");

            // Open mobile menu
            await user.click(menuButton);
            expect(menuButton).toHaveAttribute("aria-expanded", "true");

            // Click a navigation link in mobile menu
            const mobileLinks = screen.getAllByText("About");
            await user.click(mobileLinks[mobileLinks.length - 1]); // Click mobile version

            // Menu should close
            expect(menuButton).toHaveAttribute("aria-expanded", "false");
        });

        test("mobile menu shows correct icon when closed", () => {
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");
            // When closed, should show menu icon (not X icon)
            expect(menuButton).toBeInTheDocument();
        });

        test("mobile menu shows correct icon when open", async () => {
            const user = userEvent.setup();
            render(<Header />);
            const menuButton = screen.getByLabelText("Toggle menu");
            await user.click(menuButton);
            // When open, aria-expanded should be true
            expect(menuButton).toHaveAttribute("aria-expanded", "true");
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

        test("navigation has semantic nav element", () => {
            render(<Header />);
            expect(screen.getByRole("navigation")).toBeInTheDocument();
        });
    });

    describe("Active Link Styling", () => {
        test("home link is active when pathname is /", () => {
            render(<Header />);
            const homeLinks = screen.getAllByText("Home");
            const homeLink = homeLinks[0].closest("a");
            // Should have active or inactive styling based on current pathname
            expect(homeLink).toBeInTheDocument();
            // Check that styling classes are applied
            expect(homeLink?.className).toContain("text-");
        });

        test("links apply correct conditional styling classes", () => {
            render(<Header />);
            const allLinks = [
                ...screen.getAllByText("Home"),
                ...screen.getAllByText("LeetCode"),
                ...screen.getAllByText("Blog"),
                ...screen.getAllByText("About"),
            ];

            // All links should have base styling
            for (const link of allLinks) {
                const anchor = link.closest("a");
                expect(anchor?.className).toMatch(/text-(cyan|slate)/);
            }
        });

        test("non-home links are not active on home page", () => {
            render(<Header />);
            const leetcodeLinks = screen.getAllByText("LeetCode");
            // Should have inactive styling when not on /leetcode route
            expect(leetcodeLinks[0].closest("a")).toHaveClass("text-slate-400");
        });

        test("blog link gets hover styling when not active", () => {
            render(<Header />);
            const blogLinks = screen.getAllByText("Blog");
            expect(blogLinks[0].closest("a")).toHaveClass(
                "hover:text-cyan-500"
            );
        });

        test("about link gets hover styling when not active", () => {
            render(<Header />);
            const aboutLinks = screen.getAllByText("About");
            expect(aboutLinks[0].closest("a")).toHaveClass(
                "hover:text-cyan-500"
            );
        });
    });

    describe("Desktop vs Mobile Navigation", () => {
        test("desktop navigation is hidden on mobile", () => {
            render(<Header />);
            const desktopNav = screen.getByText("Home").closest("div");
            expect(desktopNav).toHaveClass("hidden");
            expect(desktopNav).toHaveClass("md:flex");
        });

        test("mobile menu button is hidden on desktop", () => {
            render(<Header />);
            const mobileButton = screen
                .getByLabelText("Toggle menu")
                .closest("div");
            expect(mobileButton).toHaveClass("md:hidden");
        });

        test("renders all navigation items in both desktop and mobile", async () => {
            const user = userEvent.setup();
            render(<Header />);

            // Desktop links (4 items)
            expect(screen.getByText("Home")).toBeInTheDocument();

            // Open mobile menu
            const menuButton = screen.getByLabelText("Toggle menu");
            await user.click(menuButton);

            // Mobile links should now be visible (4 more items)
            const allHomeLinks = screen.getAllByText("Home");
            expect(allHomeLinks.length).toBe(2); // Desktop + Mobile
        });
    });
});
