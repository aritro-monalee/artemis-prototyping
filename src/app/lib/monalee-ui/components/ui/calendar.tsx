'use client';

import * as React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '../../utils/cn';
import { Button, buttonVariants } from './button';
import { MLIconContainer } from '../MLIconContainer';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /**
   * The variant of the navigation buttons
   * @default 'ghost'
   */
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
};

/**
 * Calendar - A date picker component with support for single, multiple, and range selection.
 *
 * @example
 * ```tsx
 * // Single date selection
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 *
 * // Date range selection
 * <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
 *
 * // Multiple months
 * <Calendar numberOfMonths={2} mode="range" />
 *
 * // With dropdown navigation
 * <Calendar captionLayout="dropdown" />
 * ```
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-base-background group/calendar p-3 [--cell-size:32px]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-8 aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-8 aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-8 w-full px-8',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-8 gap-1.5',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative has-focus:border-base-ring border border-base-input bg-base-background shadow-xs has-focus:ring-base-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute bg-base-popover inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium text-base-foreground',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-base-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-base-muted-foreground rounded-md flex-1 font-normal text-xs select-none w-8 text-center',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-8', defaultClassNames.week_number_header),
        week_number: cn(
          'text-xs select-none text-base-muted-foreground',
          defaultClassNames.week_number
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l-md bg-base-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-base-accent', defaultClassNames.range_end),
        today: cn(
          'bg-base-accent text-base-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-base-muted-foreground opacity-50 aria-selected:text-base-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-base-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({
          className,
          rootRef,
          ...props
        }: React.HTMLAttributes<HTMLDivElement> & {
          rootRef?: React.Ref<HTMLDivElement>;
        }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({
          className,
          orientation,
        }: React.HTMLAttributes<HTMLElement> & {
          orientation?: 'left' | 'right' | 'up' | 'down';
          disabled?: boolean;
        }) => {
          if (orientation === 'left') {
            return <MLIconContainer icon={<ChevronLeft />} size="base" className={className} />;
          }

          if (orientation === 'right') {
            return <MLIconContainer icon={<ChevronRight />} size="base" className={className} />;
          }

          return <MLIconContainer icon={<ChevronDown />} size="base" className={className} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-8 items-center justify-center text-center">{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Selected single day
        'data-[selected-single=true]:bg-artemis-600 data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-artemis-700',
        // Range middle
        'data-[range-middle=true]:bg-base-accent data-[range-middle=true]:text-base-accent-foreground',
        // Range start
        'data-[range-start=true]:bg-artemis-600 data-[range-start=true]:text-white',
        // Range end
        'data-[range-end=true]:bg-artemis-600 data-[range-end=true]:text-white',
        // Focus styles
        'group-data-[focused=true]/day:border-base-ring group-data-[focused=true]/day:ring-artemis-500/50 group-data-[focused=true]/day:ring-[3px]',
        // Layout
        'flex aspect-square size-8 flex-col gap-1 leading-none font-normal text-sm',
        // Focus z-index
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10',
        // Range rounding
        'data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md',
        'data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md',
        // Day label styles
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
