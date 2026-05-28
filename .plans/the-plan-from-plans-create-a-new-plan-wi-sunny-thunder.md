# Fix: Cursor Does Not Follow Text During Typewriter Animation

## Context

The Typewriter component (`components/typewriter.tsx`) was implemented with a blinking terminal cursor
that was supposed to follow each character as it typed in. The cursor appears and blinks correctly
before typing starts, but it stays frozen at its initial position — it never moves to follow the text.

Two compounding bugs in the original plan caused this:

1. **Wrong lifecycle hook**: `onAnimationStart` was used on each character `motion.span`. In
   Motion v12 (`motion/react ^12.40`), `onAnimationStart` on child elements that inherit their
   animation from a staggered parent may not reliably pass the variant name string as the
   `definition` argument, causing the `definition !== 'visible'` guard to always return early.
   `onAnimationComplete` is the correct hook and is well-documented to pass the variant name.
   Since `charVariants` has `transition: { duration: 0 }`, start ≈ complete timing-wise.

2. **Fragile DOM query**: The handler called `containerRef.current?.querySelector('[data-char-index="N"]')`
   inside an animation callback. A direct element ref stored during render is more reliable.

---

## Change: `components/typewriter.tsx` only

### 1. Add `charRefsMap` ref (after the existing `animationDone` state)

```tsx
const charRefsMap = useRef<Map<number, HTMLElement>>(new Map());
```

### 2. Replace querySelector in initial `useEffect`

```tsx
// Before
const first = containerRef.current?.querySelector<HTMLElement>(
  '[data-char-index="0"]'
);

// After
const first = charRefsMap.current.get(0);
```

### 3. Replace `motion.span` per character

```tsx
// Before
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

// After
<motion.span
  key={charIndex}
  variants={charVariants}
  ref={(el) => {
    if (el) charRefsMap.current.set(myIndex, el);
  }}
  onAnimationComplete={(definition) => {
    if (definition !== 'visible') return;
    const el = charRefsMap.current.get(myIndex);
    if (el) moveCursor(el);
  }}
>
  {char}
</motion.span>
```

`data-char-index` is removed — it has no references outside this file.

---

## Critical File

- `components/typewriter.tsx`

---

## Verification

1. `pnpm dev` → visit `/`:
   - Cursor blinks ~2 cycles before greeting begins typing.
   - Cursor advances character-by-character through "Hello, world." and "It's-a **Mario**".
   - On greeting completion the cursor disappears (no cursor visible in the gap between greeting and headline).
   - After ~1.4 s the headline mounts: cursor blinks again, then types character-by-character.
   - At end of headline the cursor continues blinking indefinitely.
   - At no point are two cursors visible simultaneously.
2. DevTools → emulate `prefers-reduced-motion: reduce`: text appears instantly, no cursor rendered.
3. `pnpm lint && pnpm format` pass.
