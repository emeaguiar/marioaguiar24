export function UL({ children }: { children?: React.ReactNode }) {
  return (
    <ul className='w-full list-outside list-disc pl-8 dark:text-foreground md:mx-auto md:max-w-screen-sm'>
      {children}
    </ul>
  );
}
