/**
 * External dependencies
 */
import clsx from 'clsx';

export function WithUnderline({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}

      <div
        className={clsx(
          'preserve-3d -mt-2 h-1 origin-left scale-x-0 bg-zinc-900/60 transition-transform will-change-transform group-hover:scale-x-100',
          'dark:bg-slate-300'
        )}
      />
    </>
  );
}
