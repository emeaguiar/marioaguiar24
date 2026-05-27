# Blog Slider — Responsive & Draggable

## Context

The current blog slider (`components/blog/slider.tsx`) always paginates 3 posts at a time regardless of screen size. On mobile, each "page" stacks 3 cards vertically (`grid-cols-1`), so users must scroll through all 3 before navigating — poor UX. The user wants:

1. **Mobile (<1024px):** Show 1 card per slide, navigate one at a time
2. **Tablet+ (>=1024px):** Show 3 cards per slide, side by side (current behavior)
3. **Drag/swipe** to navigate on mobile
4. **Mobile arrows:** Relocate prev/next buttons to the bottom-right corner of the card area
5. **Tablet+ arrows:** Restore to current flanking position (left/right of the cards)

## Approach

No new dependencies. Extend the existing custom slider with a breakpoint-aware hook, pointer-based drag handling, and responsive layout.

### 1. Create `useMediaQuery` hook

**New file:** `hooks/useMediaQuery.ts`

- Uses `window.matchMedia` inside `useEffect` to track a CSS media query
- Returns `boolean` indicating whether the query matches
- SSR-safe: defaults to `false` (mobile-first), updates on mount
- Listens for `change` events to react to resize/rotation

### 2. Refactor `components/blog/slider.tsx`

**Responsive pagination:**

- Import `useMediaQuery` and check `(min-width: 1024px)` — this matches the existing `lg` Tailwind breakpoint where `lg:grid-cols-3` kicks in
- Set `postsPerPage` to `3` when query matches, `1` otherwise
- Recompute `totalPages` and `pages` array from `postsPerPage`
- Clamp `currentPage` when `postsPerPage` changes (e.g., going from page 5/9 on mobile to tablet with 3 pages) — use `useEffect` watching `postsPerPage`

**Responsive layout structure:**

Mobile layout (stacked):

```
┌─────────────────────────┐
│         Card             │  ← full-width, swipeable
│                          │
└─────────────────────────┘
                      [◀] [▶]  ← bottom-right
```

Tablet+ layout (flanked, current behavior):

```
     ┌───────┬───────┬───────┐
[◀]  │ Card  │ Card  │ Card  │  [▶]
     └───────┴───────┴───────┘
```

Implementation:

- **Mobile:** The outer container becomes `flex flex-col` (vertical). The card area sits on top, and arrows are in a `flex justify-end gap-2` row below it.
- **Tablet+:** The outer container stays `flex flex-row items-center gap-4` (current horizontal layout) with arrows flanking the card area.
- Use Tailwind responsive classes to toggle between layouts: `flex-col lg:flex-row lg:items-center lg:gap-4`

**Card rendering:**

- On mobile (`postsPerPage === 1`): each "page" is a single full-width card
- On tablet+ (`postsPerPage === 3`): each "page" is a 3-column grid (current `grid-cols-3` behavior)
- `translateX(-${currentPage * 100}%)` math stays the same — each "page" is always 100% of the container

**Drag/swipe support:**

- Add `onPointerDown`, `onPointerMove`, `onPointerUp` handlers to the slider container
- Track drag state via `useRef`: `isDragging`, `startX`, `currentTranslateOffset`
- During drag: apply pixel offset on top of the page-based `translateX`
- Disable CSS transition during active drag for immediate responsiveness
- On release: if `|dragDelta|` > 50px threshold, go to next/prev page; otherwise snap back
- Set `touch-action: pan-y` on the slider container so vertical scrolling isn't blocked
- Drag works on all screen sizes (enhances UX everywhere)

### 3. Housekeeping

- Create `.plans/` directory at repo root, save this plan there
- Add `.plans/` to `.gitignore`

## Files to modify

| File                         | Action                                       |
| ---------------------------- | -------------------------------------------- |
| `hooks/useMediaQuery.ts`     | Create — reusable media query hook           |
| `components/blog/slider.tsx` | Modify — responsive pagination, layout, drag |
| `.gitignore`                 | Modify — add `.plans/` entry                 |

## Verification

1. `pnpm dev` — start dev server
2. Mobile viewport (~375px): confirm 1 card per slide, arrows at bottom-right, drag left/right to navigate
3. Resize to >=1024px: confirm 3 cards side by side, arrows flanking the slider
4. Resize back to mobile: confirm it switches back to 1-card view with correct page
5. `pnpm lint` — no lint errors
6. `pnpm build` — production build succeeds
7. `pnpm test` — existing E2E tests pass
