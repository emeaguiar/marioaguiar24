export function OL({ children }: { children?: React.ReactNode }) {
  return (
    <ol className='w-full list-outside list-decimal pl-8 dark:text-foreground lg:mx-auto lg:max-w-screen-sm'>
      {children}
    </ol>
  );
}
