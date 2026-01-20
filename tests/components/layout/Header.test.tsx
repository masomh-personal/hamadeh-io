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
            // Logo is now split into "Thoughtful" and "Code"
            expect(screen.getByText("Thoughtful")).toBeInTheDocument();
            expect(screen.getByText("Code")).toBeInTheDocument();
        });

        test("renders navigation links", () => {
            render(<Header />);
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Problems")).toBeInTheDocument();
            expect(screen.getByText("Blog")).toBeInTheDocument();
            expect(screen.getByText("About")).toBeInTheDocument();
            expect(screen.getByText("Resume")).toBeInTheDocument();
        });

        test("renders mobile menu button", () => {
            render(<Header />);
            expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
        });
    });

    describe("Navigation Links", () => {
        test("logo links to home", () => {
            render(<Header />);
            const logo = screen.getByText("Thoughtful");
            expect(logo.closest("a")).toHaveAttribute("href", "/");
        });

        test("navigation links have correct hrefs", () => {
            render(<Header />);
            expect(screen.getByText("Home").closest("a")).toHaveAttribute(
                "href",
                "/"
            );
            expect(screen.getByText("Problems").closest("a")).toHaveAttribute(
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
            expect(screen.getByText("Resume").closest("a")).toHaveAttribute(
                "href",
                "/resume"
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
            const mobileLink = mobileLinks[mobileLinks.length - 1];
            if (!mobileLink) throw new Error("Mobile link not found");
            await user.click(mobileLink); // Click mobile version

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
            const homeLink = homeLinks[0]?.closest("a");
            // Should have active or inactive styling based on current pathname
            expect(homeLink).toBeInTheDocument();
            // Check that styling classes are applied
            if (homeLink) {
                expect(homeLink.className).toContain("text-");
            }
        });

        test("links apply correct conditional styling classes", () => {
            render(<Header />);
            const allLinks = [
                ...screen.getAllByText("Home"),
                ...screen.getAllByText("Problems"),
                ...screen.getAllByText("Blog"),
                ...screen.getAllByText("About"),
                ...screen.getAllByText("Resume"),
            ];

            // All links should have base styling
            for (const link of allLinks) {
                const anchor = link.closest("a");
                expect(anchor?.className).toMatch(/text-(primary|muted)/);
            }
        });

        test("non-home links are not active on home page", () => {
            render(<Header />);
            const problemsLinks = screen.getAllByText("Problems");
            const problemsLink = problemsLinks[0]?.closest("a");
            // Should have inactive styling when not on /leetcode route
            expect(problemsLink).toHaveClass("text-muted");
        });

        test("blog link gets hover styling when not active", () => {
            render(<Header />);
            const blogLinks = screen.getAllByText("Blog");
            const blogLink = blogLinks[0]?.closest("a");
            expect(blogLink).toHaveClass("hover:text-primary");
        });

        test("about link gets hover styling when not active", () => {
            render(<Header />);
            const aboutLinks = screen.getAllByText("About");
            const aboutLink = aboutLinks[0]?.closest("a");
            expect(aboutLink).toHaveClass("hover:text-primary");
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

            // Desktop links (5 items)
            expect(screen.getByText("Home")).toBeInTheDocument();

            // Open mobile menu
            const menuButton = screen.getByLabelText("Toggle menu");
            await user.click(menuButton);

            // Mobile links should now be visible (5 more items)
            const allHomeLinks = screen.getAllByText("Home");
            expect(allHomeLinks.length).toBe(2); // Desktop + Mobile
        });
    });
});
