export function Table({ children }: { children?: React.ReactNode }) {
  return (
    <table className='w-full max-w-screen-md table-auto p-4'>{children}</table>
  );
}

export function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className='bg-primary px-4 py-2 text-start font-bold text-white ring-1 ring-primary first:rounded-tl-lg last:rounded-tr-lg'>
      {children}
    </th>
  );
}

export function Tr({ children }: { children?: React.ReactNode }) {
  return <tr className='even:bg-slate-100'>{children}</tr>;
}

export function Td({ children }: { children?: React.ReactNode }) {
  return <td className='px-4 py-2 text-start'>{children}</td>;
}
