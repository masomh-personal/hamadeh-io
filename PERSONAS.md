# Agent Personas Playbook

This project uses optional persona rules in `.cursor/rules/` to shape how the agent approaches a task.

## Default Automation

- A lightweight auto-router is enabled via `.cursor/rules/persona-router.mdc`.
- You do not need to type `@persona-*` for most day-to-day work.
- The default behavior is implementer-focused unless the task clearly matches review, architecture, performance, or security intent.
- Explicit `@persona-*` references still work and always override the router.

## Available Personas

- `@persona-implementer`: Smallest correct change, minimal churn, practical verification.
- `@persona-architect`: Goals/constraints first, tradeoffs, boundaries, migration safety.
- `@persona-reviewer`: Severity-first findings, regressions/risks, targeted remediation.
- `@persona-performance`: Measure-first optimization, bottleneck focus, impact validation.
- `@persona-security`: Threat-aware design, input validation, auth/data protection posture.

## Quick Start

- Use one persona first to establish a baseline behavior.
- Add a second persona only when needed to avoid instruction conflicts.
- Prefer persona changes per task, not mid-task, unless the goal changes.

## Prompt Templates

### Implementer

`@persona-implementer Implement <feature> with the smallest correct scoped change. Reuse existing patterns and list quick verification steps.`

### Architect

`@persona-architect Plan implementation for <feature>. Include goals, constraints, non-goals, and 2-3 approaches with pros/cons, then recommend one incremental path.`

### Reviewer

`@persona-reviewer Review these changes for bugs, regressions, and missing tests. Report findings first in severity order with concrete fixes.`

### Performance

`@persona-performance Analyze <flow/component> performance. Identify bottlenecks, propose high-impact optimizations, and define before/after metrics.`

### Security

`@persona-security Review <feature/endpoint> for input validation, auth/authz gaps, data exposure risks, and practical mitigations in priority order.`

## Experiment Matrix

- New feature in known area -> `@persona-implementer`
- Large feature with unclear shape -> `@persona-architect`
- Pre-merge quality gate -> `@persona-reviewer`
- Slow pages/endpoints/jobs -> `@persona-performance`
- Auth, permissions, external input, secrets -> `@persona-security`

## Lightweight A/B Workflow

1. Run the same prompt with one baseline persona (usually implementer).
2. Re-run with a specialized persona (architect/performance/security/reviewer).
3. Compare:
   - Plan quality (clarity, feasibility, risk coverage)
   - Diff quality (scope, readability, maintainability)
   - Validation quality (tests/checks/metrics)
4. Keep the better outcome and capture prompt patterns that worked.

## Team Usage Tips

- Keep persona rules focused and non-overlapping.
- Avoid adding broad always-on persona behavior.
- Update persona wording when repeated failure patterns appear.
- Treat persona updates like code: review, iterate, and keep them concise.
