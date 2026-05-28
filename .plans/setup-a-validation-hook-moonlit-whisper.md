# Plan: Setup Validation Hook for pnpm lint and pnpm format

## Context

The project already enforces Prettier and ESLint rules (documented in CLAUDE.md), but there's no automated check that runs these tools after Claude edits a file. This hook will catch formatting or lint errors immediately after every file save, surfacing problems before they accumulate.

## Approach

Add a `PostToolUse` hook to the project-level Claude Code settings file. The hook fires after every `Write` or `Edit` tool call and runs `pnpm lint && pnpm format` in the project root.

## Changes

### File to modify: `/Users/emeaguiar/Sites/marioaguiar24/.claude/settings.json`

Add a `hooks` key alongside the existing `permissions` and `plansDirectory` keys:

```json
{
  "permissions": {
    "defaultMode": "plan"
  },
  "plansDirectory": "./.plans",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm lint && pnpm format"
          }
        ]
      }
    ]
  }
}
```

**Key decisions:**

- **`PostToolUse` event** — fires after a file is written or edited, which is the closest equivalent to "file save" in Claude Code.
- **Matcher `Write|Edit`** — covers both full file writes and partial edits.
- **`pnpm format`** (not `pnpm format:fix`) — validates formatting without silently auto-correcting, so failures are visible.
- **Project-level settings** — scoped to this repo only, not the user's global config.

## Verification

1. Ask Claude to edit any source file (e.g., add a trailing space to a `.ts` file).
2. After the edit, the hook output should appear in the terminal showing the lint/format run.
3. Intentionally introduce a lint error; verify the hook reports a non-zero exit and surfaces the error message.
