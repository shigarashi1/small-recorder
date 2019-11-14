import {
  parse,
  format,
  isBefore,
  isAfter,
  addDays,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  startOfMonth,
  addMonths,
  addWeeks,
} from 'date-fns';
import { DATE_FORMAT } from '../../lookups/date';
import { TDateRange } from '../../store-observable/record/action-reducers';

const today = new Date();

export const isInvalidDate = (date: Date) => date.toString() === 'Invalid Date';
export const parseDate = (dateString: string) => parse(dateString, DATE_FORMAT, today);
export const formatDate = (date: Date) => format(date, DATE_FORMAT);
export const isFuture = (date: Date) => isAfter(date, today);
export const isPast = (date: Date) => isBefore(date, addDays(today, 1));

export const getStartOfWeek = (date: Date = today) => startOfWeek(date);
export const getEndOfWeek = (date: Date = today) => endOfWeek(date);
export const getStartOfMonth = (date: Date = today) => startOfMonth(date);
export const getEndOfMonth = (date: Date = today) => endOfMonth(date);

export const getAddMonths = (amount: number, date: Date = today) => addMonths(date, amount);
export const getAddWeeks = (amount: number, date: Date = today) => addWeeks(date, amount);

const isRangeDate = (range: TDateRange<string> | TDateRange<Date>): range is TDateRange<Date> =>
  typeof range.from !== 'string' || typeof range.to !== 'string';

export function toDateRange(range: TDateRange<string>): TDateRange<Date>;
export function toDateRange(range: TDateRange<Date>): TDateRange<string>;
export function toDateRange(range: TDateRange<string> | TDateRange<Date>) {
  return isRangeDate(range)
    ? {
        from: formatDate(range.from),
        to: formatDate(range.to),
      }
    : {
        from: parseDate(range.from),
        to: parseDate(range.to),
      };
}

export const getThisDateRange = (isMonth: boolean, date: Date = today) => ({
  from: isMonth ? getStartOfMonth(date) : getStartOfWeek(date),
  to: isMonth ? getEndOfMonth(date) : getEndOfWeek(date),
});

export const getDateRange = (
  key: keyof TDateRange,
  addDate: (date: Date, num: number) => Date,
  date: Date = today,
): TDateRange<Date> =>
  key === 'from' ? { [key]: date, to: addDate(date, 1) } : { [key]: date, from: addDate(date, -1) };
