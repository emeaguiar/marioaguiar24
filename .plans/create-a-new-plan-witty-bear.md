# Blinking Command-Line Cursor for Typewriter (Single-Cursor Variant)

## Context

The Typewriter component (`components/typewriter.tsx`) reveals characters one-by-one via Motion's `staggerChildren`. The homepage (`pages/index.tsx`) renders two sequential Typewriter instances: a **greeting** (`<p>`) and a **headline** (`<h1>`) that only mounts after the greeting finishes (`greetingDone` state).

We want to add a terminal-style block cursor with these behaviors:

1. Cursor blinks in place for ~2 cycles **before** typing starts (initial delay).
2. Cursor follows each newly-revealed character.
3. **Only one cursor exists on screen at any time.** When the greeting finishes, its cursor disappears completely. The headline then mounts, blinks its own cursor, types, and that cursor **stays blinking** at the end.

**Key constraint:** Characters animate via `opacity: 0 → 1`, so they occupy layout space even when invisible. A trailing inline cursor would sit at the far end from the start. The cursor must be absolutely positioned inside the container and moved via direct DOM measurement (`getBoundingClientRect`) on each character's `onAnimationStart` — no React re-renders per character.

This plan adapts the original `animations-blinking-cursor.md` plan with two changes:

- New `keepCursor` prop so the greeting's cursor can disappear on complete while the headline's stays.
- Slightly cleaner ref/state management using a global character-index counter resolved at render.

---

## Changes

### 1. `styles/globals.css` — keyframes + cursor class

Append:

```css
@keyframes typewriter-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.typewriter-cursor {
  position: absolute;
  display: inline-block;
  width: 0.6ch;
  height: 1.1em;
  background: currentColor;
  pointer-events: none;
  animation: typewriter-blink 700ms step-end infinite;
  top: 0;
  left: 0;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    display: none;
  }
}
```

- `step-end` produces the hard terminal blink.
- `currentColor` inherits text color → free dark-mode support.
- `ch` / `em` units scale the cursor with the surrounding font size (greeting is `text-7xl`/`text-8xl`, headline is `text-4xl`/`text-6xl`).

---

### 2. `components/typewriter.tsx` — main changes

**New props:**

```ts
showCursor?: boolean;   // default true
keepCursor?: boolean;   // default true — when false, cursor hides on animation complete
```

**New imports:** `useRef`, `useEffect`, `useCallback`, `useState` from `react`.

**Refs / state inside component:**

```tsx
const containerRef = useRef<HTMLElement>(null);
const cursorRef = useRef<HTMLSpanElement>(null);
const [animationDone, setAnimationDone] = useState(false);
```

**Container variants — add `delayChildren`** so the cursor blinks before typing:

```ts
const cursorDelay = showCursor && !prefersReduced ? 1.4 : 0; // ~2 blinks at 700ms

const containerVariants = {
  hidden: {},
  visible: {
    transition: prefersReduced
      ? {}
      : { staggerChildren: speed / 1000, delayChildren: cursorDelay },
  },
};
```

**Cursor positioning helper** (no React re-render):

```tsx
const moveCursor = useCallback((el: HTMLElement, placeBefore = false) => {
  if (!containerRef.current || !cursorRef.current) return;
  const cr = containerRef.current.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  const x = (placeBefore ? er.left : er.right) - cr.left;
  const y = er.top - cr.top;
  cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
}, []);
```

**Initial position via `useEffect`** — place cursor at the left edge of the first character so it blinks at the prompt position during the 1.4s delay:

```tsx
useEffect(() => {
  if (prefersReduced || !showCursor) return;
  const first = containerRef.current?.querySelector<HTMLElement>(
    '[data-char-index="0"]'
  );
  if (first) moveCursor(first, true);
}, [prefersReduced, showCursor, moveCursor]);
```

`useEffect` (not `useLayoutEffect`) is sufficient because the 1.4s blink delay gives ample buffer before the user perceives any motion.

**Per-character span changes** — assign a running global index during render, attach `data-char-index`, and call `moveCursor` on `onAnimationStart`:

```tsx
let globalCharIndex = 0;
// ...inside the inner char map:
const myIndex = globalCharIndex++;
return (
  <motion.span
    key={charIndex}
    variants={charVariants}
    data-char-index={myIndex}
    onAnimationStart={(definition) => {
      if (definition !== 'visible') return;
      const el = containerRef.current?.querySelector<HTMLElement>(
        `[data-char-index="${myIndex}"]`
      );
      if (el) moveCursor(el);
    }}
  >
    {char}
  </motion.span>
);
```

Capturing `myIndex` in a `const` per iteration avoids the classic closure-over-mutable-counter bug.

**`handleAnimationComplete`:**

```tsx
const handleAnimationComplete = useCallback(() => {
  setAnimationDone(true);
  onComplete?.();
}, [onComplete]);
```

**Container Tag** — add ref, `position: relative`, and the new handler:

```tsx
<Tag
  ref={containerRef as React.Ref<HTMLElement>}
  className={className}
  style={{ position: 'relative' }}
  variants={containerVariants}
  initial={initial}
  animate='visible'
  onAnimationComplete={handleAnimationComplete}
>
```

**Cursor element** — rendered last inside the Tag, with inline style controlling visibility when `keepCursor=false`:

```tsx
{
  showCursor && !prefersReduced && (
    <span
      ref={cursorRef}
      className='typewriter-cursor'
      aria-hidden='true'
      style={
        animationDone && !keepCursor
          ? { opacity: 0, animation: 'none' }
          : undefined
      }
    />
  );
}
```

The cursor is a plain `<span>` (not `motion.span`) with no variants, so it is not affected by the parent's `staggerChildren`.

---

### 3. `pages/index.tsx` — set per-instance cursor behavior

**Greeting** (the `<p>`) — cursor must disappear when done so only one cursor is ever on screen:

```tsx
<Typewriter
  as='p'
  className='-order-10 text-7xl font-light uppercase lg:text-8xl'
  lines={
    [
      /* unchanged */
    ]
  }
  onComplete={() => setGreetingDone(true)}
  keepCursor={false}
/>
```

**Headline** (the `<h1>`) — defaults are fine (`showCursor=true`, `keepCursor=true`):

```tsx
<Typewriter
  as='h1'
  className='self-start text-4xl uppercase lg:mb-0 lg:mt-auto lg:text-6xl'
  lines={
    [
      /* unchanged */
    ]
  }
/>
```

No other consumer changes needed.

---

## Cursor Lifecycle

1. Page loads → greeting Typewriter mounts. All chars are `opacity: 0`. Cursor `<span>` mounts inside the `<p>`.
2. `useEffect` positions the cursor at the left edge of char index 0. CSS animation makes it blink.
3. `delayChildren: 1.4` holds typing for 1400 ms (~2 full blinks).
4. Stagger begins. Each character's `onAnimationStart('visible')` fires → `moveCursor` updates `transform`. Cursor visually follows the last revealed character.
5. Greeting's `onAnimationComplete` fires → `animationDone=true`. Because `keepCursor=false`, the cursor's inline style applies `opacity: 0; animation: none`. Cursor vanishes. `onComplete` sets `greetingDone=true`.
6. Headline mounts. Same lifecycle: cursor appears, blinks ~1.4s (the user-confirmed natural gap), types, then stays blinking forever at the final character (`keepCursor=true`).

---

## Edge Cases

- **Reduced motion:** `useReducedMotion()` returns true → cursor not rendered at all (guard `showCursor && !prefersReduced`). CSS `@media` rule is a second-line defense. Text appears instantly via existing `initial='visible'` behavior.
- **Dark mode:** `currentColor` inherits from text color; no extra tokens needed.
- **Line wrapping (mobile):** `moveCursor` computes both `x` and `y` relative to the container, so wrapping characters carry the cursor to the new line correctly.
- **`<br>` between lines:** `<br>` has no `data-char-index`; the cursor simply jumps from the last char of line N to the first char of line N+1 (different `top`).

---

## Verification

1. `pnpm dev` → visit `/`:
   - Cursor blinks ~2 cycles before greeting begins typing.
   - Cursor advances character-by-character through "Hello, world." and "It's-a **Mario**".
   - On greeting completion the cursor **disappears** (verify no cursor visible in the gap).
   - After ~1.4 s the headline mounts: cursor blinks again, then types.
   - At end of headline the cursor **continues blinking indefinitely**.
   - At no point are two cursors visible simultaneously.
2. DevTools → emulate `prefers-reduced-motion: reduce`: text appears instantly, no cursor in DOM.
3. Toggle dark mode: cursor color matches text via `currentColor`.
4. Mobile viewport (`<400px` width): text wraps; cursor follows to the new line.
5. `pnpm lint && pnpm format` pass.

---

## Critical Files

- `styles/globals.css` — append keyframes + `.typewriter-cursor` class
- `components/typewriter.tsx` — add props, refs, cursor logic, cursor element
- `pages/index.tsx` — pass `keepCursor={false}` to the greeting instance only
