# Mario Aguiar — Personal Portfolio & Blog

A bilingual (Spanish/English) personal portfolio and blog built with Next.js 14.

## Tech Stack

- **Next.js 14** (Pages Router) · TypeScript · Tailwind CSS
- **next-translate** — i18n (Spanish default, English alternative)
- **mdx-bundler** + **gray-matter** — MDX blog posts with YAML frontmatter
- **next-themes** — dark mode
- **next-seo** — SEO meta tags
- **Playwright** — E2E tests
- **pnpm** — package manager
- Cloudinary (image optimization) · Mailgun (contact form) · Disqus (comments)

## Getting Started

**1. Install dependencies**

```bash
pnpm install
```

**2. Set up environment variables**

Copy `.env.example` to `.env` (or create `.env`) and fill in the required values (see [Environment Variables](#environment-variables)).

**3. Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server at localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Check Prettier formatting |
| `pnpm format:fix` | Fix Prettier formatting |
| `pnpm test` | Run all Playwright E2E tests |

Run a single test file:

```bash
pnpm test tests/<file>.spec.ts
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `MAILGUN_API_KEY` | Mailgun API key for contact form |
| `MAILGUN_DOMAIN` | Mailgun domain |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Disqus shortname for blog comments |
| `NEXT_PUBLIC_ANALYTICS_ID` | Google Analytics measurement ID |

## Project Structure

```
pages/                  # Next.js routes
  index.tsx             # Home page
  blog/[slug].tsx       # Individual blog post
  conferences.tsx       # Conferences page
  api/                  # API routes (contact form, OG image, sitemap)
components/
  elements/             # Thin semantic wrappers (A, P, H1–H4, Pre, etc.)
  blog/                 # Blog-specific components
  ...                   # Layout, header, footer, dark mode toggle, etc.
lib/
  posts.ts              # Blog post file system reading, frontmatter parsing, MDX bundling
  _posts/
    es/                 # Spanish MDX blog posts
    en/                 # English MDX blog posts
locales/
  es/                   # Spanish UI translation strings
  en/                   # English UI translation strings
public/                 # Static assets
```

## Blog Posts

Posts are MDX files located in `lib/_posts/{es,en}/`. Each file requires YAML frontmatter:

```yaml
---
title: "Post title"
publishedOn: "2024-01-15"
description: "Short description for listings and SEO"
readingTime: 5
published: true
---
```

Set `published: false` to hide a post without deleting it.

## Internationalization

Spanish (`es`) is the default locale; English (`en`) is the alternative. The locale is determined by the URL prefix (`/en/...` for English, no prefix for Spanish).

- UI strings: `/locales/{en,es}/`
- Blog posts: `/lib/_posts/{en,es}/` — separate MDX files per locale
- Configuration: `i18n.js`
