/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ContactCTA() {
    const pathname = usePathname();
    const { t } = useTranslation('common');
    
    return (
        <Link
            href={{ pathname, search: '?modal=1' }}
            className='font-extrabold p-4 ml-0 mr-auto border-zinc-900 text-zinc-900 border-2 uppercase text-lg lg:mr-0'
        >
            {t('contact')}
        </Link>
    );
}