/**
 * Next dependencies
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SkipNavigation() {
  const pathname = usePathname();

  return (
    <Link
      href={{
        pathname,
        hash: 'main-content',
      }}
      className='absolute left-0 top-0 z-50 -translate-y-16 bg-slate-200 p-4 text-blue-900 transition-transform focus:translate-y-1'
    >
      Skip to main content
    </Link>
  );
}
