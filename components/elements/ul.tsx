export function UL({ children }: { children?: React.ReactNode }) {
  return (
    <ul className='w-full max-w-screen-sm list-outside list-disc pl-8'>
      {children}
    </ul>
  );
}
