# RSS Image Fallback + README Frontmatter Example

## Context

The RSS feed in `lib/rss.ts` only includes a `<media:content>` image when a post has an explicit `image` frontmatter field. The site already generates dynamic OG images at `/api/og?title=[title]` — these make a good automatic fallback so every RSS item always has an image. Additionally, the README's frontmatter example doesn't document the `image` field, leaving contributors unaware it exists.

## Changes

### 1. `lib/rss.ts` — OG image fallback

Inside `posts.forEach`, replace the conditional `custom_elements` with one that always emits an image:

**Before:**

```typescript
custom_elements: post.image
  ? [{ 'media:content': { _attr: { url: post.image, medium: 'image' } } }]
  : [],
```

**After:**

```typescript
const imageUrl =
  post.image ?? `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;
custom_elements: [
  { 'media:content': { _attr: { url: imageUrl, medium: 'image' } } },
],
```

`SITE_URL` is already imported at the top of `lib/rss.ts`.

### 2. `README.md` — Add `image` to the frontmatter example

The existing frontmatter block at line 90 shows required fields only. Expand it to show the optional `image` field with a comment, and add a note about the RSS fallback.

**Before:**

```yaml
---
title: 'Post title'
publishedOn: '2024-01-15'
description: 'Short description for listings and SEO'
readingTime: 5
published: true
---
```

**After:**

```yaml
---
title: 'Post title'
publishedOn: '2024-01-15'
description: 'Short description for listings and SEO'
readingTime: 5
published: true
image: 'https://res.cloudinary.com/example/image/upload/v1/post-cover.jpg' # optional — used in RSS feed; falls back to /api/og?title=... when omitted
---
```

## Files to modify

- `/lib/rss.ts` — two-line change inside `posts.forEach`
- `/README.md` — expand frontmatter code block (line ~90) with optional `image` field

## Verification

1. `pnpm dev`, visit `http://localhost:3000/rss.xml`
2. Find a post without an `image` frontmatter field — its `<media:content url>` should be `http://localhost:3000/api/og?title=<encoded title>`
3. Visit that OG URL directly to confirm the image renders
4. `pnpm build` — no type errors
