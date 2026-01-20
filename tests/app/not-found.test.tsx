import { beforeEach, describe, expect, mock, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import NotFound from "@/app/not-found";

// Mock next/navigation
mock.module("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({
        push: mock(() => {}),
        replace: mock(() => {}),
        back: mock(() => {}),
    }),
}));

beforeEach(() => {
    cleanup();
});

describe("NotFound Page", () => {
    describe("Basics", () => {
        test("renders the 404 error code", () => {
            render(<NotFound />);
            expect(screen.getByText("404")).toBeInTheDocument();
        });

        test("renders the HTTP status message", () => {
            render(<NotFound />);
            expect(
                screen.getByText("HTTP Status: Not Found")
            ).toBeInTheDocument();
        });

        test("renders the main error heading", () => {
            render(<NotFound />);
            expect(
                screen.getByText("Oops! Page Not Found")
            ).toBeInTheDocument();
        });

        test("renders the error description", () => {
            render(<NotFound />);
            expect(
                screen.getByText(
                    "Looks like this route doesn't exist in our codebase."
                )
            ).toBeInTheDocument();
        });

        test("renders the code snippet with error details", () => {
            render(<NotFound />);
            expect(screen.getByText("error")).toBeInTheDocument();
            expect(screen.getByText("suggestion")).toBeInTheDocument();
            expect(screen.getByText('"Page not found"')).toBeInTheDocument();
            expect(
                screen.getByText('"Try going back home?"')
            ).toBeInTheDocument();
        });

        test("renders the pro tip message", () => {
            render(<NotFound />);
            expect(screen.getByText(/Pro tip:/)).toBeInTheDocument();
            expect(
                screen.getByText(
                    /This isn't a bug, it's an undocumented feature/
                )
            ).toBeInTheDocument();
        });
    });

    describe("Navigation Links", () => {
        test("renders 'Go Home' link with correct href", () => {
            render(<NotFound />);
            const homeLink = screen.getByRole("link", { name: /go home/i });
            expect(homeLink).toBeInTheDocument();
            expect(homeLink).toHaveAttribute("href", "/");
        });

        test("renders 'Go Back' button", () => {
            render(<NotFound />);
            const backButton = screen.getByRole("button", { name: /go back/i });
            expect(backButton).toBeInTheDocument();
        });

        test("renders quick navigation links", () => {
            render(<NotFound />);
            expect(
                screen.getByRole("link", { name: "Problems" })
            ).toHaveAttribute("href", "/leetcode");
            expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
                "href",
                "/blog"
            );
            expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
                "href",
                "/about"
            );
        });
    });

    describe("Styling", () => {
        test("404 error code has primary color styling", () => {
            render(<NotFound />);
            const errorCode = screen.getByText("404");
            expect(errorCode.className).toContain("text-primary");
        });

        test("main heading uses Baloo 2 font", () => {
            render(<NotFound />);
            const heading = screen.getByText("Oops! Page Not Found");
            expect(heading.className).toContain("font-baloo");
        });

        test("code snippet has monospace font", () => {
            render(<NotFound />);
            const codeSnippet = screen.getByText("error").closest(".font-mono");
            expect(codeSnippet).toBeInTheDocument();
            expect(codeSnippet?.className).toContain("font-mono");
        });

        test("Go Home button has primary button styling", () => {
            render(<NotFound />);
            const homeLink = screen.getByRole("link", { name: /go home/i });
            expect(homeLink.className).toContain("bg-sky-500");
            expect(homeLink.className).toContain("hover:bg-sky-400");
        });

        test("Go Back button has secondary button styling", () => {
            render(<NotFound />);
            const backButton = screen.getByRole("button", { name: /go back/i });
            expect(backButton.className).toContain("border-slate-600");
            expect(backButton.className).toContain("hover:border-sky-400");
        });
    });

    describe("Interactivity", () => {
        test("Go Back button calls window.history.back", async () => {
            const user = userEvent.setup();
            const mockBack = mock(() => {});
            const originalBack = window.history.back;
            window.history.back = mockBack;

            render(<NotFound />);
            const backButton = screen.getByRole("button", { name: /go back/i });
            await user.click(backButton);

            expect(mockBack).toHaveBeenCalledTimes(1);

            // Restore original
            window.history.back = originalBack;
        });
    });

    describe("Icons", () => {
        test("renders home icon in Go Home button", () => {
            render(<NotFound />);
            const homeLink = screen.getByRole("link", { name: /go home/i });
            const icon = homeLink.querySelector("svg");
            expect(icon).toBeInTheDocument();
        });

        test("renders arrow icon in Go Back button", () => {
            render(<NotFound />);
            const backButton = screen.getByRole("button", { name: /go back/i });
            const icon = backButton.querySelector("svg");
            expect(icon).toBeInTheDocument();
        });
    });

    describe("Responsive Layout", () => {
        test("uses standard content container pattern", () => {
            const { container } = render(<NotFound />);
            const mainDiv = container.firstChild as HTMLElement;
            expect(mainDiv.className).toContain("max-w-6xl");
            expect(mainDiv.className).toContain("mx-auto");
            expect(mainDiv.className).toContain("px-6");
        });

        test("has proper vertical spacing", () => {
            const { container } = render(<NotFound />);
            const mainDiv = container.firstChild as HTMLElement;
            expect(mainDiv.className).toContain("py-16");
        });

        test("content is centered and has minimum height", () => {
            const { container } = render(<NotFound />);
            const contentDiv = container.querySelector(
                ".flex.min-h-\\[60vh\\]"
            ) as HTMLElement;
            expect(contentDiv).toBeInTheDocument();
            expect(contentDiv.className).toContain("items-center");
            expect(contentDiv.className).toContain("justify-center");
        });
    });
});
