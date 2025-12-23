/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import { parseISO, formatDistance, format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function FormatDate({
  dateString = '',
  locale = '',
}: {
  dateString?: string;
  locale?: string;
}) {
  const [formattedDate, setFormattedDate] = useState('');
  const [fullDate, setFullDate] = useState('');

  useEffect(() => {
    const date = parseISO(dateString);
    const options = { locale: locale === 'es' ? es : undefined };

    setFormattedDate(formatDistance(date, new Date(), options));
    setFullDate(format(date, 'PPP', options));
  }, [dateString, locale]);

  return (
    <time dateTime={dateString} title={fullDate}>
      {formattedDate}
    </time>
  );
}

export function FormatDateShort({
  dateString = '',
  locale = '',
  className = '',
}: {
  dateString?: string;
  locale?: string;
  className?: string;
}) {
  const date = parseISO(dateString);
  const options = { locale: locale === 'es' ? es : undefined };
  const fullDate = format(date, 'PPP', options);
  const dateFormat = locale === 'es' ? 'dd.MM.yy' : 'MM.dd.yy';
  const formattedDate = format(date, dateFormat, options);

  return (
    <time dateTime={dateString} title={fullDate} className={className}>
      {formattedDate}
    </time>
  );
}
