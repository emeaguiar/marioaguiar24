/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { notoSansMono } from '@/components/fonts';

export function Code({ children }: { children?: React.ReactNode }) {
  return (
    <code
      className={clsx(
        `rounded-md bg-slate-100 ${notoSansMono.className} px-1.5 py-1`,
        `dark:bg-slate-700 dark:text-foreground`
      )}
    >
      {children}
    </code>
  );
}
