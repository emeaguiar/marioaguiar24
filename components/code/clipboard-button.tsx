/**
 * External dependencies
 */
import { useState } from 'react';
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

/**
 * Internal dependencies
 */

export default function ClipboardButton({ code }: { code: string }) {
  const { t } = useTranslation('common');
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      aria-label={t('copyToClipboard')}
      className='group absolute right-4 top-4 transform-gpu rounded-md border border-stone-800 bg-stone-900 p-2 text-white'
    >
      {isCopied ? (
        <ClipboardDocumentCheckIcon
          className={clsx(
            'h-4 w-4 transition-transform',
            'group-hover:scale-125'
          )}
          aria-hidden
        />
      ) : (
        <ClipboardIcon
          className={clsx(
            'h-4 w-4 transition-transform',
            'group-hover:scale-125'
          )}
          aria-hidden
          onClick={() => {
            navigator.clipboard.writeText(code);
            setIsCopied(true);
          }}
        />
      )}
    </button>
  );
}
