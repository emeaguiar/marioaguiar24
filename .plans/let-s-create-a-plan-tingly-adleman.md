# Fix Issue #46 — Slideshow links not working

## Context

The homepage "From the blog" slider renders blog post cards, each with a clickable title and a "Read More" link. Clicking either link should navigate to the blog post. Currently, neither link works — clicks are silently swallowed.

**Root cause:** `slider.tsx` calls `e.currentTarget.setPointerCapture(e.pointerId)` inside `handlePointerDown`. Pointer capture routes all subsequent pointer events (including `pointerup`) to the capturing element (the slider div). Browsers synthesize `click` events from the element that received both `pointerdown` and `pointerup`; with capture active, that element is the slider div — not the child `<Link>` — so the link's click handler never fires and Next.js never navigates.

The links in `cards.tsx` are correctly implemented; the bug is entirely in `slider.tsx`.

## Fix

**File:** `components/blog/slider.tsx`

### Changes

1. **Remove `setPointerCapture`** from `handlePointerDown` so that `pointerup` and the resulting `click` event are delivered to the element the user actually touched/clicked (the link).

2. **Add a `hasDragged` ref** (initialized `false`) to track whether the gesture was a real drag vs. a tap/click.

3. **Update `handlePointerDown`** to reset `hasDragged.current = false` at the start of each interaction.

4. **Update `handlePointerMove`** to set `hasDragged.current = true` when `|offset| > 5` px (distinguishes accidental micro-movement from a real drag).

5. **Add `onClickCapture`** on the sliding container div. In the capture phase this fires before any child's click handler. If `hasDragged.current` is true, call `e.preventDefault()` + `e.stopPropagation()` to block accidental link navigation at the end of a drag, then reset the ref.

```tsx
// New ref alongside existing ones
const hasDragged = useRef(false);

// handlePointerDown — remove setPointerCapture, reset hasDragged
const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  isDragging.current = true;
  hasDragged.current = false;
  startX.current = e.clientX;
  setEnableTransition(false);
  // setPointerCapture REMOVED — it was preventing child link clicks
};

// handlePointerMove — mark real drags
const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  if (!isDragging.current) return;
  const offset = e.clientX - startX.current;
  setDragOffset(offset);
  if (Math.abs(offset) > 5) {
    hasDragged.current = true;
  }
};

// onClickCapture on the container div
const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
  if (hasDragged.current) {
    e.preventDefault();
    e.stopPropagation();
    hasDragged.current = false;
  }
};
```

The outer slider container JSX gains `onClickCapture={handleClickCapture}` and loses nothing else.

## Files to modify

- `components/blog/slider.tsx` — only file changed

## Verification

1. `pnpm dev` — open homepage
2. Click a card title → should navigate to the blog post
3. Click "Read More" → should navigate to the blog post
4. Drag the slider left/right → should paginate without navigating
5. `pnpm test` — existing Playwright suite should remain green
