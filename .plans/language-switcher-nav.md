# Language Switcher Toggle — Navigation

## Context

The site is fully bilingual (Spanish default, English alternate) but offers no way for users to switch between languages from the global navigation. The only language toggle that exists is in individual blog post pages (`/components/blog/language-switcher.tsx`). A global "ES | EN" toggle is needed in the main nav bar, before the dark mode button, on both desktop and mobile.

When a locale label is clicked, Next.js replaces the locale prefix in the URL (adding `/en/` or stripping it back to `/`) and reloads the page in the selected language.

---

## Files to Create

### `/components/language-toggle.tsx` _(new)_

A `'use client'` component. Uses `useRouter()` from `next/router` for `locale` and `asPath`, and `useTranslation('common')` for the aria-label.

```tsx
'use client';

/**
 * External dependencies
 */
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageToggle({ className }: { className?: string }) {
  const { t } = useTranslation('common');
  const { locale, asPath } = useRouter();
  const isEs = locale === 'es';

  return (
    <nav
      aria-label={t('changeLanguage')}
      className={clsx(
        'flex items-center gap-1 text-sm font-bold uppercase',
        className
      )}
    >
      {isEs ? (
        <span className='text-primary' aria-current='true'>
          ES
        </span>
      ) : (
        <Link
          href={asPath}
          locale='es'
          className='text-foreground/50 transition-colors hover:text-primary'
        >
          ES
        </Link>
      )}

      <span aria-hidden='true' className='text-foreground/30'>
        |
      </span>

      {!isEs ? (
        <span className='text-primary' aria-current='true'>
          EN
        </span>
      ) : (
        <Link
          href={asPath}
          locale='en'
          className='text-foreground/50 transition-colors hover:text-primary'
        >
          EN
        </Link>
      )}
    </nav>
  );
}
```

**Design notes:**

- Active locale → `<span aria-current="true">` in `text-primary` (not a link — avoids self-referential navigation)
- Inactive locale → `<Link locale="es|en">` using `asPath` so query strings are preserved on switch
- Separator `|` is `aria-hidden` for clean screen reader output
- Accepts optional `className` (same signature as `DarkModeToggle`)

---

## Files to Modify

### `/components/menu/desktop.tsx`

Add import and insert a new `<li>` **before** the `DarkModeToggle` `<li>`:

```tsx
import LanguageToggle from '@/components/language-toggle';

// Inside <ul>, before the DarkModeToggle li:
<li>
  <LanguageToggle />
</li>

<li>
  <DarkModeToggle />
</li>
```

The existing `gap-18` on `<ul>` spaces the new `<li>` automatically — no extra classes needed.

### `/components/menu/mobile.tsx`

Add import and replace the single `DarkModeToggle` line so `LanguageToggle` comes first and carries the `ml-auto`:

```tsx
import LanguageToggle from '@/components/language-toggle';

// Replace:
<DarkModeToggle className='ml-auto mr-8 md:hidden' />

// With:
<LanguageToggle className='ml-auto mr-4 md:hidden' />
<DarkModeToggle className='mr-8 md:hidden' />
```

`ml-auto` shifts to `LanguageToggle` so both controls stay right-aligned as a group. `DarkModeToggle` keeps `mr-8` to maintain its spacing from the hamburger.

### `/locales/en/common.json`

Add one key:

```json
"changeLanguage": "Change language"
```

### `/locales/es/common.json`

Add one key:

```json
"changeLanguage": "Cambiar idioma"
```

No `i18n.js` changes needed — `common` is already loaded on every page via `'*': ['common', 'alerts']`.

---

## Reused Patterns

- `locale` prop on `<Link>` for switching locale — same pattern as `components/blog/language-switcher.tsx:24`
- Optional `className` prop — same signature as `components/dark-mode-toggle.tsx:9`
- `clsx` for conditional classes — consistent with the whole codebase
- `useTranslation('common')` for nav-level strings — consistent with `desktop.tsx` and `mobile.tsx`

---

## Verification

1. `pnpm dev` — start dev server
2. Visit `http://localhost:3000/` (Spanish default)
   - Nav should show **ES** | EN in the header (ES highlighted)
   - Click "EN" → URL changes to `/en/` and page reloads in English
   - Nav now shows ES | **EN** (EN highlighted)
3. Visit a blog post (e.g., `/blog/some-slug`) and switch language
   - URL should change to `/en/blog/some-slug`
4. Visit `/en/blog` and click "ES"
   - URL should revert to `/blog` (no prefix for default locale)
5. Check mobile viewport (< 768px)
   - "ES | EN" should appear in the top bar, to the left of the dark mode toggle
6. `pnpm lint` — no lint errors
