'use client';

import * as React from 'react';
import {
  Calendar as CalendarPrimitive,
  CalendarDayButton,
  type CalendarProps as CalendarPrimitiveProps,
} from '../ui/calendar';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export type CalendarProps = CalendarPrimitiveProps;

// ============================================
// Component
// ============================================

/**
 * Calendar - A date picker component with support for single, multiple, and range selection.
 *
 * Built on top of react-day-picker with Artemis Design System styling.
 *
 * @example
 * ```tsx
 * // Single date selection
 * const [date, setDate] = useState<Date | undefined>(new Date());
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 *
 * // Date range selection
 * const [dateRange, setDateRange] = useState<DateRange | undefined>();
 * <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
 *
 * // Multiple months
 * <Calendar numberOfMonths={2} mode="range" />
 *
 * // With dropdown navigation
 * <Calendar captionLayout="dropdown" />
 * ```
 */
function Calendar({ className, ...props }: CalendarProps) {
  return (
    <CalendarPrimitive
      className={cn('rounded-lg border border-base-border p-3', className)}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar, CalendarDayButton };
