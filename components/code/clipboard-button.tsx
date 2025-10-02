/**
 * External dependencies
 */
import { useEffect, useRef, useState } from 'react';
import {
  ClipboardDocumentIcon,
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

  const copiedTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isCopied) {
      copiedTimeout.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => {
      if (copiedTimeout.current) {
        clearTimeout(copiedTimeout.current);
      }
    };
  }, [isCopied]);

  return (
    <button
      aria-label={t('copyToClipboard')}
      className={clsx(
        'group/button absolute right-4 top-4 rounded-md border border-stone-800 bg-stone-900 p-2 text-white opacity-0 transition-opacity',
        'group-hover:opacity-100'
      )}
      onClick={() => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <ClipboardDocumentCheckIcon
          className={clsx(
            'h-4 w-4 transform-gpu transition-transform',
            'group-hover/button:scale-125'
          )}
          aria-hidden
        />
      ) : (
        <ClipboardDocumentIcon
          className={clsx(
            'h-4 w-4 transform-gpu transition-transform',
            'group-hover/button:scale-125'
          )}
          aria-hidden
        />
      )}
    </button>
  );
}
