export function OL({ children }: { children?: React.ReactNode }) {
  return (
    <ol className='w-full max-w-screen-sm list-outside list-decimal pl-8'>
      {children}
    </ol>
  );
}
