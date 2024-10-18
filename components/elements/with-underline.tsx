export function WithUnderline({ children }: { children?: React.ReactNode }) {
  return (
    <span className='relative isolate'>
      <span className='absolute bottom-1 left-0 h-1 w-full bg-underline opacity-80 lg:h-2' />

      <span className='relative z-10'>{children}</span>
    </span>
  );
}
