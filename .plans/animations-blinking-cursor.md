# Blinking Command-Line Cursor for Typewriter Animation

## Context

The Typewriter component (`components/typewriter.tsx`) reveals characters one-by-one using Motion's `staggerChildren`. Currently there is no cursor. The ask is to add a blinking terminal-style block cursor that:

- Blinks at the start position for ~2 cycles before typing begins (initial delay)
- Follows each character as it appears
- Continues blinking at the end after all text is revealed

**Key constraint:** Characters are animated via `opacity: 0 → 1`, so they occupy layout space even when invisible. A trailing inline cursor would sit at the far end of all text from the start—not after the last _visible_ character. The solution is an absolutely-positioned cursor moved via direct DOM manipulation on each character's `onAnimationStart`, avoiding any React re-renders.

---

## Changes

### 1. `styles/globals.css` — add keyframes + cursor class

Append after the existing rules:

```css
@keyframes tw-cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.tw-cursor {
  position: absolute;
  display: inline-block;
  width: 0.55em;
  background-color: currentColor;
  animation: tw-cursor-blink 700ms step-start infinite;
  pointer-events: none;
}
```

`step-start` produces the hard on/off blink characteristic of terminal cursors. `currentColor` inherits text color for free (works in dark mode with no extra tokens).

---

### 2. `components/typewriter.tsx` — main changes

**New prop:**

```ts
initialDelay?: number;   // ms before typing starts; default 1000 (≈2 cursor blinks)
```

**New refs (inside component body):**

```tsx
const containerRef = useRef<HTMLElement>(null);
const cursorRef = useRef<HTMLSpanElement>(null);
const charCounterRef = useRef(0); // render-time index counter, reset each render
const charRefsArr = useRef<(HTMLSpanElement | null)[]>([]);
```

Reset the counter at the top of the render body (before JSX):

```tsx
charCounterRef.current = 0;
```

**Updated `containerVariants`** — add `delayChildren`:

```ts
const containerVariants = {
  hidden: {},
  visible: {
    transition: prefersReduced
      ? {}
      : { delayChildren: initialDelay / 1000, staggerChildren: speed / 1000 },
  },
};
```

**Cursor helper functions:**

```tsx
const moveCursor = (el: HTMLSpanElement, placeBefore = false) => {
  if (!cursorRef.current || !containerRef.current) return;
  const cr = containerRef.current.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  cursorRef.current.style.left = `${(placeBefore ? er.left : er.right) - cr.left}px`;
  cursorRef.current.style.top = `${er.top - cr.top}px`;
  cursorRef.current.style.height = `${er.height}px`;
};
```

**`useLayoutEffect`** — position cursor before the first character during initial delay:

```tsx
useLayoutEffect(() => {
  if (prefersReduced) return;
  const first =
    containerRef.current?.querySelector<HTMLSpanElement>('[data-char]');
  if (first) moveCursor(first, /* placeBefore */ true);
}, []);
```

**Per-character span changes** — capture a ref + move cursor on `onAnimationStart`:

```tsx
const idx = charCounterRef.current++;
return (
  <motion.span
    key={charIndex}
    variants={charVariants}
    data-char
    ref={(el) => {
      charRefsArr.current[idx] = el;
    }}
    onAnimationStart={(definition) => {
      if (definition !== 'visible') return;
      const el = charRefsArr.current[idx];
      if (el) moveCursor(el);
    }}
  >
    {char}
  </motion.span>
);
```

**Tag element** — add `ref` and `position: relative`:

```tsx
<Tag
  ref={containerRef as React.Ref<HTMLElement>}
  style={{ position: 'relative' }}
  className={className}
  variants={containerVariants}
  initial={initial}
  animate='visible'
  onAnimationComplete={onComplete}
>
```

**Cursor element** — appended as last child inside Tag:

```tsx
{
  !prefersReduced && (
    <span ref={cursorRef} className='tw-cursor' aria-hidden='true' />
  );
}
```

---

### 3. `pages/index.tsx` — no changes required

The cursor renders by default for all Typewriter instances. Both the greeting (`p`) and headline (`h1`) will show cursors with a 1000 ms initial delay.

---

## Verification

1. `pnpm dev` → visit `/`:
   - Cursor blinks alone for ~1 s before greeting text starts typing
   - Cursor advances letter-by-letter through "Hello, world." and "It's-a **Mario**"
   - After greeting finishes, headline Typewriter mounts → cursor blinks 1 s → types headline
   - Cursor continues blinking at end of each completed text
2. DevTools → "prefers-reduced-motion: reduce": all text appears instantly, no cursor rendered
3. Toggle dark mode: cursor color matches text (via `currentColor`)
4. Mobile viewport: text wraps mid-line; cursor follows to the correct line via `getBoundingClientRect()`
5. `pnpm lint && pnpm format` pass
