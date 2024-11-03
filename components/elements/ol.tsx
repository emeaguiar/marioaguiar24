export function OL({ children }: { children?: React.ReactNode }) {
  return (
    <ol className='w-full lg:max-w-screen-sm list-outside list-decimal pl-8 lg:mx-auto'>
      {children}
    </ol>
  );
}
