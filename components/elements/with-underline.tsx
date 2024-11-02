/**
 * External dependencies
 */
import clsx from "clsx";

export function WithUnderline({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}

      <div className={
        clsx(
          "h-1 -mt-2 preserve-3d bg-zinc-900/60 origin-left will-change-transform transition-transform scale-x-0 group-hover:scale-x-100",
          "dark:bg-slate-300"
        )
      } />    
    </>
  );
}
