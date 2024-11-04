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
