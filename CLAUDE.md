# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # Run ESLint
pnpm format       # Check Prettier formatting
pnpm format:fix   # Fix Prettier formatting
pnpm test         # Run all Playwright E2E tests
```

Run a single Playwright test file:

```bash
pnpm test tests/<file>.spec.ts
```

## Best Practices

All code must conform to the Prettier configuration in `.prettierrc.json`. Run
`pnpm format` to check and `pnpm format:fix` to auto-correct before committing.
Write code that already satisfies these rules to avoid needing repeated fix runs:

- **Trailing commas**: Add trailing commas wherever ES5 allows (objects, arrays,
  function parameters).
- **Semicolons**: Always end statements with a semicolon.
- **Indentation**: Use 2 spaces (no tabs).
- **Quotes**: Use single quotes in JS/TS (`'value'`). Use single quotes in JSX
  attributes (`prop='value'`).
- **Tailwind class order**: Classes are sorted automatically by
  `prettier-plugin-tailwindcss`; do not manually reorder them.

## Architecture

This is a **Next.js 15** personal portfolio and blog, using the Pages Router (not App Router). TypeScript, Tailwind CSS, and `pnpm` are standard throughout.

### Internationalization

The site is bilingual (Spanish default, English alternative), powered by `next-translate`. All UI strings live in `/locales/{en,es}/`. Blog posts are separate MDX files per locale under `/lib/_posts/{es,en}/`. The locale is threaded through `getStaticProps` to every page.

### Blog System

Posts are MDX files with YAML frontmatter (`title`, `publishedOn`, `description`, `readingTime`, `published`). Setting `published: false` hides a post. `/lib/posts.ts` handles file system reading, frontmatter parsing (`gray-matter`), and MDX bundling (`mdx-bundler`). Rendering uses `remark-gfm`, `rehype-slug`, `rehype-video`, and `rehype-github-alerts`.

### Routing

- `/pages/blog/[slug].tsx` — dynamic blog post page
- `/pages/api/contact.ts` — Mailgun-backed contact form
- `/pages/api/og.tsx` — dynamic OG image generation
- `/pages/sitemap.xml.ts` — XML sitemap

### Styling

Tailwind CSS with CSS custom properties for theming (see `globals.css` for `--foreground`, `--background`, `--primary`, `--secondary` tokens). Dark mode uses `next-themes` with class-based switching. Page-specific styles use CSS Modules alongside Tailwind.

### Component Conventions

`/components/elements/` contains thin semantic wrappers (`A`, `P`, `H1`–`H4`, `Pre`, etc.) — use these instead of raw HTML elements in page content. Import paths use the `@/` alias (maps to project root).

### External Services

| Service          | Purpose            | Config                             |
| ---------------- | ------------------ | ---------------------------------- |
| Cloudinary       | Image optimization | `next.config.js` image domains     |
| Mailgun          | Contact form email | `MAILGUN_*` env vars               |
| Disqus           | Blog comments      | `NEXT_PUBLIC_DISQUS_*` env vars    |
| Google Analytics | Analytics          | `NEXT_PUBLIC_ANALYTICS_ID` env var |

### Key Config Files

- `next.config.js` — i18n routing, image domains, redirects from old WordPress URLs
- `tailwind.config.ts` — custom theme extending CSS variables
- `playwright.config.ts` — E2E tests across Chromium, Firefox, WebKit, and mobile viewports
- `i18n.js` — locale list and default locale (`es`)
- `redirects.js` — permanent redirects preserving old WordPress SEO URLs
