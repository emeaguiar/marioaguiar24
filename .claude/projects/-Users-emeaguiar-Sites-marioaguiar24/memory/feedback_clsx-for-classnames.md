---
name: feedback_clsx-for-classnames
description: Use clsx for conditional className management in this project, not template literals with ternaries
metadata:
  type: feedback
---

Use `clsx` for conditional className logic — not template literal ternaries like `` `${condition ? 'a' : 'b'} base-class` ``.

**Why:** Project convention; the user corrected this when a plan used inline ternary string interpolation.

**How to apply:** Any time className values depend on state or props, import `clsx` and compose classes through it. Example:

```tsx
import clsx from 'clsx';
// ...
className={clsx('base-class', condition && 'conditional-class', toggle ? 'a' : 'b')}
```
