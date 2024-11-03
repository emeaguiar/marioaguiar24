/**
 * Extrenal dependencies
 */
import clsx from "clsx";

export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <table className='w-full max-w-screen-md table-auto p-4'>{children}</table>
  );
}

export function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className={clsx(
      'bg-zinc-900 p-4 text-start font-bold text-background ring-1 ring-zinc-900/60 first:pl-4',
      'dark:text-foreground dark:bg-slate-800 dark:ring-slate-800'
    )}>
      {children}
    </th>
  );
}

export function Tr({ children }: { children?: React.ReactNode }) {
  return <tr className={clsx(
    'even:bg-slate-300',
    'dark:text-foreground dark:even:text-foreground dark:even:bg-slate-700 dark:border-slate-800'
  )}>{children}</tr>;
}

export function Td({ children }: { children?: React.ReactNode }) {
  return <td className='px-4 py-2 text-start first:pl-4'>{children}</td>;
}
