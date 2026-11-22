import { describe, expect, test } from "bun:test";
import { isNavRouteActive } from "./NavLink";

describe("isNavRouteActive", () => {
    test("matches exact routes and nested child segments", () => {
        expect(isNavRouteActive("/", "/")).toBe(true);
        expect(isNavRouteActive("/blog", "/blog")).toBe(true);
        expect(isNavRouteActive("/blog/two-sum", "/blog")).toBe(true);
    });

    test("does not match sibling prefixes or null pathnames", () => {
        expect(isNavRouteActive("/blog-archive", "/blog")).toBe(false);
        expect(isNavRouteActive("/about-us", "/about")).toBe(false);
        expect(isNavRouteActive("/blog", "/")).toBe(false);
        expect(isNavRouteActive(null, "/blog")).toBe(false);
    });
});
