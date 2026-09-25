---
name: pr-description
description: Generates a copy-paste PR title and description for the current branch against origin/main in conventional-commit style. Use when the user asks for a PR title, PR description, PR body, or to open a pull request.
---

# PR Title and Description

## Steps

1. Run `git fetch origin main`.
2. Compare the current branch (usually `release/x.y.z` or a feature branch) with `main`:
    - `git log origin/main..HEAD --oneline`
    - `git diff origin/main...HEAD --stat`
3. If the PR targets `main`, confirm `package.json` has a version higher than `origin/main` (`git show origin/main:package.json`) and that `CHANGELOG.md` has a matching entry. If either is missing, stop and point to the `release` skill instead of producing output.

## Output format

Produce exactly this, nothing before or after:

````markdown
## PR Title

```
<type: short imperative summary>
```

## PR Description

```markdown
## Summary

<2-4 sentences of prose: the problem, what changed at a high level, and why. Write for your future self six months from now.>

## Changes

### <Features | Bug Fixes | Refactoring | Styles | Documentation | Chores>

- <scope>: <what changed and why, self-contained in one line>

## Notes

<Optional caveats, follow-up work, or tradeoffs. Omit the section if empty.>
```
````

## Rules

- The title is conventional-commit style: `type: summary`, or `type/type: summary` for mixed batches. For releases, `chore: release version x.y.z` is acceptable.
- The summary is prose, not bullets. Explain intent and context, not the file list.
- Group changes by commit type (feat is Features, fix is Bug Fixes, refactor is Refactoring, style is Styles, docs is Documentation, chore is Chores). Omit empty groups.
- No marketing language, no "this PR", no "I", no filler, no file-changes or diff-stat block.
- Never include attribution: no "co-authored-by", no "Made with Cursor", "Made with [Cursor](https://cursor.com)", "Generated with Cursor", or any reference to AI tooling.
- Only run `gh pr create` after explicit approval, and re-check the body for attribution lines right before running it.
