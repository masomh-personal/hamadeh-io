---
name: architecture-planning
description: Plans features, refactors, and migrations for hamadeh.io by weighing goals, constraints, and tradeoffs before any code changes. Use when the user asks to plan, design, or architect something, compare approaches or tradeoffs, redesign a module or boundary, or migrate a tool or library.
---

# Architecture Planning

Current decisions and their rationale live in `docs/architecture.md`. Read it before proposing a change that touches the stack, content pipeline, or rendering strategy.

## Workflow

1. **Frame it.** State goals, constraints, and non-goals. Constraints that usually apply here:
    - Static generation for all content pages.
    - The 200KB initial bundle target.
    - Bun-only tooling.
    - Oxc for lint and format.
    - No new dependencies without clear benefit.
2. **Options.** Present 2 or 3 viable approaches, each with pros, cons, and risks. Include "do nothing" or "the simplest change" when it is credible.
3. **Recommend one** incremental path. Prefer staged migrations over rewrites, and say how each stage can be verified and rolled back.
4. **Boundaries.** Name which modules own which responsibility:
    - `app/` for routing and rendering
    - `components/` for UI
    - `lib/` for domain logic and parsing
    - `scripts/` for tooling
5. **Call out** compatibility, rollback, and observability concerns, plus any docs that must change (`docs/architecture.md`, `README.md`, `.cursor/rules`).

## Style

- Keep recommendations concrete and implementation-ready, citing file paths.
- Favor designs that reduce long-term maintenance cost over clever abstractions. Abstraction needs current change pressure or a clear testability gain.
- Ask a clarifying question only when the answer materially changes the architecture.
