# Plan: Hero Section Typewriter + Fade Animation

## Context

The homepage intro (`#intro` in `pages/index.tsx`) needs entry animations: a character-by-character typewriter for the greeting and headline (sequenced — headline starts only after the greeting finishes), and a simple fade-in for the portrait image.

The site is bilingual (ES default, EN alternative via `next-translate`). All user-visible strings stay in the locale files — new segment keys will be added. The `motion` package (`motion/react`) drives all animations.

---

## Steps

### 1. Install `motion`

```bash
pnpm add motion
```

`motion` is the current package name for what was previously `framer-motion`. Import path is `motion/react`.

---

### 2. Add segment keys to both locale files

The `Trans` component mixes HTML tags into translation strings, which can't be split character-by-character. We add flat-text keys for each "segment" the typewriter needs.

**`locales/en/home.json`** — add:

```json
"helloLine1":         "Hello, world.",
"helloLine2Pre":      "It's-a ",
"helloLine2Accent":   "Mario",
"headlineLine1Pre":   "I do ",
"headlineLine1Accent":"Front-End",
"headlineLine2":      "Development"
```

**`locales/es/home.json`** — add:

```json
"helloLine1":         "Hola, mundo.",
"helloLine2Pre":      "Soy ",
"helloLine2Accent":   "Mario",
"headlineLine1Pre":   "Hago Desarrollo de ",
"headlineLine1Accent":"Front-End",
"headlineLine2":      ""
```

`headlineLine2` is empty for Spanish (the layout only has one content line). The component will skip rendering empty segments.

---

### 3. Create `/components/typewriter.tsx`

A generic component driven by `motion/react`'s `staggerChildren`.

```
type Segment = { text: string; bold?: boolean };

Props:
  lines: Segment[][]    // each inner array = one visual line, separated by <br/>
  className?: string
  onComplete?: () => void
  speed?: number         // ms per character, default 40
```

**Animation design:**

- Outer wrapper: `motion.p` (or `motion.h1` — passed via `as` prop) with `variants` set to `{ hidden: {}, visible: { transition: { staggerChildren: speed } } }`
- Each character: `motion.span` with `variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }`
- Lines are joined with `<br />` between them; bold segments use `<strong className='font-black'>`
- `onAnimationComplete` on the outer wrapper fires `onComplete()` once all stagger children finish
- `prefers-reduced-motion`: use `useReducedMotion()` from `motion/react` — when true, skip stagger and render all characters immediately with `animate="visible"` and `initial="visible"` (no delay)

---

### 4. Modify `pages/index.tsx`

**Imports to add:**

```ts
import { motion } from 'motion/react';
import { useState } from 'react';
import Typewriter from '@/components/typewriter';
```

**State:**

```ts
const [greetingDone, setGreetingDone] = useState(false);
```

**Greeting** — replace the `<p>` / `<Trans i18nKey='home:hello'>` block:

```tsx
<Typewriter
  as='p'
  className='-order-10 text-7xl font-light uppercase lg:text-8xl'
  lines={[
    [{ text: t('helloLine1') }],
    [{ text: t('helloLine2Pre') }, { text: t('helloLine2Accent'), bold: true }],
  ]}
  onComplete={() => setGreetingDone(true)}
/>
```

**Headline** — replace the `<h1>` / `<Trans i18nKey='home:headline'>` block. Render only when `greetingDone` is true:

```tsx
{
  greetingDone && (
    <Typewriter
      as='h1'
      className='self-start text-4xl uppercase lg:mb-0 lg:mt-auto lg:text-6xl'
      lines={[
        [
          { text: t('headlineLine1Pre') },
          { text: t('headlineLine1Accent'), bold: true },
        ],
        ...(t('headlineLine2') ? [[{ text: t('headlineLine2') }]] : []),
      ]}
    />
  );
}
```

**Image** — wrap existing `div` in `motion.div`:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className={`items-baseline lg:mx-auto lg:flex lg:justify-start ${styles.aboutImage}`}
>
  <Image ... />   {/* unchanged */}
</motion.div>
```

---

## Files Modified

| File                              | Change                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `package.json` / `pnpm-lock.yaml` | Add `motion`                                                                        |
| `locales/en/home.json`            | Add 6 typewriter segment keys                                                       |
| `locales/es/home.json`            | Add 6 typewriter segment keys                                                       |
| `components/typewriter.tsx`       | New generic typewriter component                                                    |
| `pages/index.tsx`                 | Replace `p`/`h1` Trans blocks; add `motion.div` for image; add `greetingDone` state |

The original `Trans`-based `hello` and `headline` blocks are removed from `index.tsx`; those keys can remain in the locale files for any future use.

---

## Verification

1. `pnpm dev` → open `localhost:3000`
2. Hard-refresh: greeting types out → headline types out after greeting finishes → image fades in concurrently.
3. Switch to English at `localhost:3000/en` — English text types correctly.
4. DevTools → Rendering → `prefers-reduced-motion: reduce` → all text appears instantly.
5. `pnpm lint && pnpm format` — no errors.
6. `pnpm test` — existing Playwright suite passes.
