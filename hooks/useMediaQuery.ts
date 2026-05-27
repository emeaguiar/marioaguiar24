/**
 * useMediaQuery
 *
 * SSR-safe hook that tracks whether a CSS media query currently matches.
 * Defaults to `false` on the server and on first render, then updates
 * after mount and on every subsequent change event (e.g. resize / rotation).
 *
 * @param query - A valid CSS media query string, e.g. '(min-width: 1024px)'
 * @returns `true` when the query matches, `false` otherwise
 */

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Set initial value after mount (avoids SSR mismatch)
    setMatches(mediaQueryList.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handler);
    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
