# Add Branch Discipline Rule to CLAUDE.md

## Context

Code was pushed directly to `main` during the RSS feed implementation. All feature work must go through a branch and PR, never directly on `main`. This rule needs to be made explicit in `CLAUDE.md` so future Claude Code sessions enforce it from the start.

## Change

Add a **Branch Discipline** section to `/CLAUDE.md` under **Best Practices**, immediately after the Prettier rules. The rule must be stated as a hard constraint — not a suggestion.

### Text to add

```markdown
## Branch Discipline

**Never touch files on `main` directly.** Before starting any feature, fix, or
refactor — no matter how small — create a new branch:

```bash
git checkout -b <branch-name>
```

All changes must reach `main` through a pull request that is approved and merged
via GitHub. Direct commits to `main` are not allowed.
```

## File to modify

- `/CLAUDE.md` — insert new section after the existing **Best Practices** block (after line 36), before **Architecture**

## Verification

Read the updated `CLAUDE.md` and confirm the rule is clearly visible at the top-level section level, stated as a hard constraint.
