import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export function getReadableTime(date) {
  const formatDateToFullStr = (d) => format(new Date(d), 'EEE, MMM d, KK:mm aaa');
  return date && date.start && date.end !== null
    ? `${formatDateToFullStr(Number(date.start))} - ${formatDateToFullStr(Number(date.end))}`
    : formatDateToFullStr(Number(date.start));
}
