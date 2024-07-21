/**
 * External dependencies
 */
import {
  CalendarIcon,
  ClockIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

/**
 * Internal dependencies
 */
import FormatDate from '@/components/format-date';

export default function BlogHeader({
  publishedOn,
  updatedOn,
  readingTime,
  locale,
}: {
  publishedOn: string;
  updatedOn: string;
  readingTime: number;
  locale: string;
}) {
  const { t } = useTranslation('blog');

  return (
    <div className='flex gap-8 text-sm text-gray-500 dark:text-gray-400'>
      {publishedOn && (
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-4 w-4' />

          <span>
            <Trans
              i18nKey='blog:publishedOn'
              components={[
                <FormatDate
                  key='publishedOn'
                  dateString={publishedOn}
                  locale={locale}
                />,
              ]}
            />
          </span>
        </div>
      )}

      {updatedOn && (
        <div className='flex items-center gap-2'>
          <PencilSquareIcon className='h-4 w-4' />

          <span>
            <Trans
              i18nKey='blog:updatedOn'
              components={[
                <FormatDate
                  key='updatedOn'
                  dateString={updatedOn}
                  locale={locale}
                />,
              ]}
            />
          </span>
        </div>
      )}

      {readingTime && (
        <div className='flex items-center gap-2'>
          <ClockIcon className='h-4 w-4' />

          <span>{t('blog:readingTime', { minutes: readingTime })}</span>
        </div>
      )}
    </div>
  );
}
