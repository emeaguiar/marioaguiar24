# Add Local slack-notify Hooks for Task Completion and User Input

## Context

The user wants Claude Code to automatically send Slack notifications via the `/slack-notify` skill in two situations:

1. When a task is completed (Claude finishes a turn) → `Stop` hook
2. When user input is needed (Claude sends a notification) → `Notification` hook

This should be a **project-local** setting not committed to git, so it goes in `.claude/settings.local.json` (already listed in `.gitignore` at line 49).

## Findings

- Slack-notify plugin is installed at `~/.claude/plugins/slack-notify/`
- Compiled script: `/Users/emeaguiar/.claude/plugins/slack-notify/dist/scripts/slack-notify.js`
- Plugin config (webhook URL, profiles) already exists at `~/.claude/plugins/slack-notify/.claude-plugins.json`
- Project `settings.json` uses the hook format: array of `{ matcher?, hooks: [{ type, command }] }`
- `Stop` and `Notification` hook events require no `matcher` field
- `settings.local.json` does not exist yet in `.claude/`

## Implementation

**Create** `.claude/settings.local.json` with `Stop` and `Notification` hooks:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node /Users/emeaguiar/.claude/plugins/slack-notify/dist/scripts/slack-notify.js"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node /Users/emeaguiar/.claude/plugins/slack-notify/dist/scripts/slack-notify.js"
          }
        ]
      }
    ]
  }
}
```

The script reads hook context from stdin (JSON with `session_id`, `transcript_path`, `hook_event_name`) and uses the existing `~/.claude/plugins/slack-notify/.claude-plugins.json` config for the webhook URL — no additional configuration needed.

## Verification

1. Start a session, complete a small task with TodoWrite
2. When Claude's turn ends, the `Stop` hook fires → Slack message should arrive
3. Trigger a `Notification` event (e.g., a long task where Claude asks for input) → Slack message should arrive
4. Confirm `.claude/settings.local.json` does not appear in `git status` (it's gitignored)
