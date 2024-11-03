import { ArrowUpIcon } from '@heroicons/react/24/solid';

export function SampleButton() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className='mx-auto block self-center rounded-full bg-primary p-2 text-white shadow-lg ring-1 ring-secondary dark:bg-slate-700 dark:ring-slate-900'
    >
      <ArrowUpIcon className='h-6 w-6' />

      <span className='sr-only'>Volver arriba</span>
    </button>
  );
}
