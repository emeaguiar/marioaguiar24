# Document Import Order Convention in CLAUDE.md

## Context

The codebase already uses a consistent three-group import order (visible in files like
`pages/index.tsx` and `components/typewriter.tsx`) but it is not codified anywhere.
Adding it to CLAUDE.md makes the convention explicit so contributors and Claude Code
follow it without guessing.

## Approach

Add a **Import Order** subsection inside the existing **Best Practices** section of
`CLAUDE.md`. The three groups, separated by a blank line, are:

1. **External dependencies** — anything from `node_modules` (React, Framer Motion,
   third-party libraries, etc.)
2. **Next dependencies** — imports specifically from `next/*` packages (`next/head`,
   `next/image`, `next/link`, etc.)
3. **Internal dependencies** — project-local imports (components, lib utilities, styles,
   types, etc.) using the `@/` alias or relative paths

## File to Modify

`CLAUDE.md` — add the new subsection after the existing bullet list under **Best
Practices**, before the **Branch Discipline** heading.

Example block to include:

```ts
/**
 * External dependencies
 */
import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * Next dependencies
 */
import Head from 'next/head';
import Image from 'next/image';

/**
 * Internal dependencies
 */
import Typewriter from '@/components/typewriter';
import { getPosts } from '@/lib/posts';
```

## Verification

Read `CLAUDE.md` after editing to confirm the section renders clearly and the example
code block is syntactically correct.
