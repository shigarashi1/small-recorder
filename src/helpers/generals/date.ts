import { parse, format, isBefore, isAfter, addDays } from 'date-fns';
import { DATE_FORMAT } from '../../lookups/date';

const today = new Date();

export const isInvalidDate = (date: Date) => date.toString() === 'Invalid Date';
export const parseDate = (dateString: string) => parse(dateString, DATE_FORMAT, today);
export const formatDate = (date: Date) => format(date, DATE_FORMAT);
export const isFuture = (date: Date) => isAfter(date, today);
export const isPast = (date: Date) => isBefore(date, addDays(today, 1));
