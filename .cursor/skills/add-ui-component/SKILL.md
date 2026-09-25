---
name: add-ui-component
description: Adds or extends a project-owned UI component in components/ui using the wrapper-first pattern, exports it, and validates it in the /components showcase with keyboard and focus checks. Use when the user asks to create, add, build, or change a reusable UI component such as a button, badge, card, tabs, dialog, or tooltip.
---

# Add a UI Component

Follow `.cursor/rules/ui-library-policy.mdc` and `.cursor/rules/styling-tailwind.mdc`. Never use the shadcn CLI or paste generated components.

## Workflow

1. **Check for reuse.** Read `components/ui/index.ts`. Extend an existing component with a variant before creating a new one.
2. **Create `components/ui/<Name>.tsx`.**
    - If the component needs interactive behavior (dialogs, popovers, tabs, and similar), wrap a Radix primitive and add the `@radix-ui/*` package only after confirming with the user. Otherwise use a semantic HTML element.
    - Props: `interface <Name>Props extends React.ComponentProps<"element">`, with variants as `type` unions and variant class maps declared `as const` (see `components/ui/Badge.tsx`).
    - Compose classes with `cn`, and use design tokens from `docs/styling.md` and `docs/color-system.md`.
    - Add `"use client"` only if the component needs state, effects, or browser APIs.
3. **Export it** from `components/ui/index.ts` as a named export.
4. **Showcase it.**
    - Create `app/components/sections/<Name>Showcase.tsx` covering every variant, size, and state, including disabled and focus.
    - Export it from `app/components/sections/index.ts`.
    - In `app/components/page.tsx`, add an entry to `showcaseSections` and a matching `TabsContent`.
5. **Verify.**
    - `env bun run type-check` and `env bun run check`.
    - Start `env bun run dev`, open `http://localhost:3000/components` with the browser tool, select the new tab, and confirm the component works with the keyboard (Tab, Enter or Space, Escape where relevant), shows a visible focus ring, and holds up on a narrow viewport.
