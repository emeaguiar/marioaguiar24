import { parseISO, formatDistance, format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function FormatDate({
  dateString = '',
  locale = '',
}: {
  dateString?: string;
  locale?: string;
}) {
  const date = parseISO(dateString);
  const options = { locale: locale === 'es' ? es : undefined };
  const formattedDate = formatDistance(date, new Date(), options);
  const fullDate = format(date, 'PPP', options);

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
