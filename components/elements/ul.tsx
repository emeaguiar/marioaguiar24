export function UL({ children }: { children?: React.ReactNode }) {
  return (
    <ul className='w-full lg:max-w-screen-md list-outside list-disc pl-8 lg:mx-auto'>
      {children}
    </ul>
  );
}
