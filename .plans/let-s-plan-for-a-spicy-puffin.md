# Fix `EEXIST` crash on blog posts under Hostinger (lsnode)

## Context

Moving the deploy to **Hostinger Node.js Web Apps (hPanel)** — which runs the app under
LiteSpeed's `lsnode` — the site boots and serves fine, but **any blog post URL crashes**:

```
⨯ Error: open EEXIST
    at new Socket (node:net:437:13)
    at process.getStdin [as stdin] (node:internal/bootstrap/switches/is_main_thread:227:17)
    at BuiltinModule.syncExports (node:internal/bootstrap/realm:379:31)
    at BuiltinModule.getESMFacade (node:internal/bootstrap/realm:364:17)
    at ModuleLoader.builtinStrategy (node:internal/modules/esm/translators:363:17)
```

### Root cause (confirmed)

1. `pages/blog/[slug].tsx:6-14` imports the whole MDX build toolchain at **top level** —
   `mdx-bundler`, `remark-gfm`, `rehype-github-alerts`, `rehype-slug`, `rehype-video`,
   `rehype-unwrap-images`.
2. Those are pure-ESM and pull in `unified` → `vfile`. The file
   `node_modules/.pnpm/vfile@6.0.1/node_modules/vfile/lib/minproc.js` is one line:
   ```js
   export {default as proc} from 'node:process'
   ```
3. To build the ESM facade for the `node:process` builtin, Node **enumerates every own
   property**, which fires the lazy `process.stdin` getter → `new Socket({ fd: 0 })`.
4. `lsnode` does not hand the app a usable fd 0, so libuv returns `EEXIST`.

Only `/blog/[slug]` breaks because it is the only route whose server module drags in that
chain — verified: `grep -rn "mdx-bundler\|remark-\|rehype-\|unified\|bundleMDX" pages components lib`
matches **only** `pages/blog/[slug].tsx`.

### Why we fix it structurally rather than stubbing stdin

`getStaticPaths` returns `fallback: false` with no `revalidate` (`pages/blog/[slug].tsx:230-233`),
so **`bundleMDX` only ever runs at build time**. The entire MDX + esbuild + unified toolchain is
being loaded into the runtime server for nothing. Removing it from the runtime path kills the
crash at the source *and* meaningfully cuts memory on shared hosting — which matters here.

### Intended outcome

`next start` on Hostinger never loads `mdx-bundler`, `esbuild`, `unified`, or `vfile`. MDX is
compiled once during `pnpm build` into plain JSON that the page reads with `fs`.

---

## Approach

Precompile all posts to JSON in a step chained ahead of `next build`; the page reads JSON at
runtime. Dev keeps on-demand compilation so editing a post still hot-reloads.

### 1. `lib/mdx.mjs` (new) — single source of truth for MDX compilation

Plain ESM JavaScript, matching the existing `lib/hooks/frontmatter.mjs` precedent (already
listed in `tsconfig.json` `include`). It must be `.mjs` so `scripts/build-posts.mjs` can import
it directly from plain `node`, without adding a TS runner.

Exports one function that takes an **absolute file path** (not slug + lang) so it does not have
to duplicate the directory logic that already lives in `getPostsDirectory` (`lib/posts.ts:18-20`):

```js
export async function compilePost(filePath) { /* bundleMDX({ file: filePath, mdxOptions }) */ }
```

Move the `mdxOptions` body verbatim from `pages/blog/[slug].tsx:191-203` — same plugin list and
order (`remarkGfm`; then `rehypeGithubAlerts`, `rehypeSlug`, `rehypeUnwrapImages`,
`[rehypeVideo, { details: false }]`). Add JSDoc types so TS can infer across the dynamic import.

### 2. `scripts/build-posts.mjs` (new)

- `rm -rf .compiled-posts/` first, so deleted or newly-unpublished posts leave no stale JSON.
- For each `.mdx` in `lib/_posts/{es,en}/`, read frontmatter with `gray-matter` and **skip
  `published: false`** — `getStaticPaths` already filters those out via `getPosts`
  (`lib/posts.ts:41`), so compiling them is wasted build time.
- Write `.compiled-posts/{lang}/{slug}.json` containing `{ code, frontmatter }`.
- Log the per-locale count so a silently-empty run is obvious in Hostinger's build log.

### 3. `lib/posts.ts` — add `getCompiledPost`

Reuse the existing `fs` + `join(process.cwd(), …)` pattern already used by `getPostsDirectory`.
Throw a loud, actionable error if the JSON is missing (points at `pnpm build:posts`) so a broken
build fails at build time rather than 500-ing in production.

### 4. `pages/blog/[slug].tsx` — the actual fix

- **Delete** the six toolchain imports on lines 6, 7, 8, 10, 11, 14.
- **Keep line 9** (`getMDXComponent` from `mdx-bundler/client`) — verified safe: it is CJS and
  requires only `react`, `react-dom`, `react/jsx-runtime`. It never touches esbuild or vfile.
- Rewrite `getStaticProps` (currently lines 178-213):

```ts
export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string };
  locale: 'en' | 'es';
}) {
  if (process.env.NODE_ENV === 'development') {
    const { compilePost } = await import('@/lib/mdx.mjs');
    const { code, frontmatter } = await compilePost(
      `${getPostsDirectory(locale)}/${params.slug}.mdx`
    );

    return { props: { code, frontmatter, locale } };
  }

  const { code, frontmatter } = getCompiledPost(params.slug, locale);

  return { props: { code, frontmatter, locale } };
}
```

Why this is safe in production: webpack's `DefinePlugin` substitutes `process.env.NODE_ENV` in
the server build, so the branch collapses to `if (false)` and the dynamic `import()` is
dead-code-eliminated entirely. Even if it were not eliminated, `import()` stays lazy and the
branch never executes — the toolchain is unreachable either way.

Also fixes the existing `locale: ''` mistype on line 185.

### 5. `package.json` — chain the step explicitly

```json
"build:posts": "node scripts/build-posts.mjs",
"build": "node scripts/build-posts.mjs && next build",
```

**Do not use a `prebuild` lifecycle script.** pnpm does not run pre/post scripts by default
(`enable-pre-post-scripts` is off), so Hostinger's `pnpm run build` would silently skip it and
production would 500 on every post. Explicit `&&` chaining is required.

### 6. Ignore files and tsconfig

- `.gitignore` and `.prettierignore`: add `/.compiled-posts/`.
- `tsconfig.json`: add `lib/mdx.mjs` to `include`, alongside the existing
  `lib/hooks/frontmatter.mjs` entry.

### 7. Branch discipline

Per `CLAUDE.md`: branch first (`git checkout -b fix/mdx-runtime-toolchain`), land via PR. No
direct commits to `main`.

---

## Verification

**1. Build and serve**

```bash
rm -rf .compiled-posts .next && pnpm build
```
Expect the script to log ~41 `es` / ~39 `en` posts (minus unpublished), then a clean `next build`.

**2. Prove the toolchain is gone from the runtime bundle** — the decisive check:

```bash
grep -c "remark-gfm\|mdx-bundler/dist\|vfile" ".next/server/pages/blog/[slug].js"
```
Must be `0`. If it is not, the dead-code elimination did not happen and the fix is incomplete.

**3. Reproduce the Hostinger failure locally.** Poison `process.stdin` exactly the way `lsnode`
does. Write to the scratchpad:

```js
// poison-stdin.cjs
Object.defineProperty(process, 'stdin', {
  configurable: true,
  get() {
    throw new Error('EEXIST: simulated lsnode stdin');
  },
});
```

```bash
NODE_OPTIONS="--require /path/to/poison-stdin.cjs" pnpm start
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/blog/<slug>
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/en/blog/<slug>
```
Both must return `200`. Run this **on `main` first** to confirm it reproduces the crash — a
verification that cannot fail before the fix proves nothing.

**4. Regression pass**

```bash
pnpm lint && pnpm format && pnpm test
```
Then `pnpm dev` and edit a post to confirm dev-mode hot recompilation still works (this is the
path the `NODE_ENV` branch exists to preserve).

**5. Deploy** to Hostinger and hit a post in both locales.

---

## Notes and open risks

- **Keep `mdx-bundler` and `esbuild` installed on the box.** Hostinger runs `pnpm run build`
  there, so the build step needs them. Do not move them to `devDependencies` and do not switch
  the host to a production-only install.
- **`pages/api/og.tsx` uses `runtime: 'edge'`** (line 12-14). Self-hosted edge routes run in
  Next's sandbox and are untested on `lsnode`. Not in scope here, but worth hitting
  `/api/og?title=test` after deploy — blog posts reference it for OG images
  (`pages/blog/[slug].tsx:81`).
- **`.compiled-posts/` is read via `process.cwd()`**, consistent with the existing
  `getPostsDirectory` pattern. This holds because `next start` runs from the project root and
  the site does not use `output: 'standalone'`. If standalone is ever adopted, the directory
  will need explicit file-tracing inclusion.
- Static export is not an escape hatch here: `next.config.js` uses built-in `i18n`, which
  `output: 'export'` does not support.
