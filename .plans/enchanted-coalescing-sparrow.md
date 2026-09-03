# Vercel build failure: compiled posts missing at build time

## Outcome: no code change

Root cause (confirmed with user): Vercel's Project Settings has Build Command
overridden to `next build`, bypassing `package.json`'s `build` script
(`node scripts/build-posts.mjs && next build` from PR #55), so `.compiled-posts/`
never gets created before `getStaticProps` runs during static generation.

A `next.config.js`-based fix (gating `buildPosts()` on
`phase === PHASE_PRODUCTION_BUILD`) was drafted and verified feasible (Next.js
supports async config functions awaited by `normalizeConfig`, and static-generation
workers don't re-execute `next.config.js`, so it's race-safe) — but the user opted
instead to fix this directly in Vercel's dashboard by changing the Build Command to
run the `pnpm` build script, preserving the ability to change it per-platform later
rather than have it force-enforced in code.

**Action item (user, outside this repo):** update Vercel Project Settings → Build &
Development Settings → Build Command to `pnpm run build` (or equivalent), so it picks
up the existing `build:posts` chaining already committed in `package.json`.

No files in this repo need to change for this issue.
