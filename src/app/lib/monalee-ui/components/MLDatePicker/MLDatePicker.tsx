'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  addDays,
  addWeeks,
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { Button, buttonVariants } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export interface DatePickerPreset {
  label: string;
  value: Date | DateRange;
}

export interface DatePickerProps {
  /**
   * Optional label for the date picker
   */
  label?: string;
  /**
   * The currently selected date
   */
  value?: Date;
  /**
   * Callback when the date changes
   */
  onChange?: (value: Date | undefined) => void;
  /**
   * Custom date formatter
   */
  dateFormatter?: (value: Date) => string;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Additional className for the trigger button
   */
  className?: string;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
}

export interface DatePickerWithPresetsProps {
  /**
   * Optional label for the date picker
   */
  label?: string;
  /**
   * The currently selected date
   */
  value?: Date;
  /**
   * Callback when the date changes
   */
  onChange?: (value: Date | undefined) => void;
  /**
   * Custom date formatter
   */
  dateFormatter?: (value: Date) => string;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Custom presets for quick selection
   */
  presets?: DatePickerPreset[];
  /**
   * Additional className for the trigger button
   */
  className?: string;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
}

export interface DateRangePickerProps {
  /**
   * Optional label for the date picker
   */
  label?: string;
  /**
   * The currently selected date range
   */
  value?: DateRange;
  /**
   * Callback when the date range changes
   */
  onChange?: (value: DateRange | undefined) => void;
  /**
   * Custom date formatter
   */
  dateFormatter?: (value: Date) => string;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Number of months to display
   * @default 2
   */
  numberOfMonths?: number;
  /**
   * Additional className for the trigger button
   */
  className?: string;
  /**
   * Whether the date picker is disabled
   */
  disabled?: boolean;
}

// ============================================
// Default Presets
// ============================================

const defaultPresets: DatePickerPreset[] = [
  { label: 'Today', value: new Date() },
  { label: 'Tomorrow', value: addDays(new Date(), 1) },
  { label: 'In 3 days', value: addDays(new Date(), 3) },
  { label: 'In a week', value: addWeeks(new Date(), 1) },
  { label: 'In 2 weeks', value: addWeeks(new Date(), 2) },
  { label: 'In a month', value: addMonths(new Date(), 1) },
];

// ============================================
// DatePicker (Simple)
// ============================================

function DatePicker({
  label,
  value,
  onChange,
  dateFormatter = (date) => format(date, 'PPP'),
  placeholder = 'Pick a date',
  className,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    if (selectedDate) {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm font-medium text-base-foreground">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              'w-60 justify-start text-left font-normal',
              'bg-base-background border-base-input shadow-xs',
              'hover:bg-cream-50 transition-colors duration-150',
              !date && 'text-base-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 size-4 text-base-foreground" />
            {date ? dateFormatter(date) : <MLText as="span">{placeholder}</MLText>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-base-border shadow-md bg-base-popover"
          align="start"
          sideOffset={4}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ============================================
// DatePickerWithPresets
// ============================================

function DatePickerWithPresets({
  label,
  value,
  onChange,
  dateFormatter = (date) => format(date, 'PPP'),
  placeholder = 'Pick a date',
  presets = defaultPresets,
  className,
  disabled,
}: DatePickerWithPresetsProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    if (selectedDate) {
      setOpen(false);
    }
  };

  const handlePresetSelect = (presetValue: string) => {
    const preset = presets.find((p) => p.label === presetValue);
    if (preset && preset.value instanceof Date) {
      handleSelect(preset.value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm font-medium text-base-foreground">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              'w-60 justify-start text-left font-normal',
              'bg-base-background border-base-input shadow-xs',
              'hover:bg-cream-50 transition-colors duration-150',
              !date && 'text-base-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 size-4 text-base-foreground" />
            {date ? dateFormatter(date) : <MLText as="span">{placeholder}</MLText>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col gap-2 p-2 border-base-border shadow-md bg-base-popover"
          align="start"
          sideOffset={4}
        >
          <Select onValueChange={handlePresetSelect}>
            <SelectTrigger className="bg-base-background border-base-input shadow-xs text-base-muted-foreground hover:bg-cream-50 transition-colors duration-150">
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset) => (
                <SelectItem
                  key={preset.label}
                  value={preset.label}
                  className="hover:bg-cream-100 focus:bg-cream-100 transition-colors duration-150"
                >
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-lg border border-base-border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              captionLayout="dropdown"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ============================================
// DateRangePicker
// ============================================

function DateRangePicker({
  label,
  value,
  onChange,
  dateFormatter = (date) => format(date, 'LLL dd, y'),
  placeholder = 'Pick a date range',
  numberOfMonths = 2,
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(value);

  useEffect(() => {
    setDateRange(value);
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onChange?.(range);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return placeholder;
    if (dateRange.to) {
      return `${dateFormatter(dateRange.from)} - ${dateFormatter(dateRange.to)}`;
    }
    return dateFormatter(dateRange.from);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm font-medium text-base-foreground">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              'w-80 justify-start text-left font-normal',
              'bg-base-background border-base-input shadow-xs',
              'hover:bg-cream-50 transition-colors duration-150',
              !dateRange?.from && 'text-base-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 size-4 text-base-foreground" />
            <MLText as="span" className="truncate">
              {formatDateRange()}
            </MLText>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-base-border shadow-md bg-base-popover"
          align="start"
          sideOffset={4}
        >
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
            captionLayout="dropdown"
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ============================================
// Legacy MLDatePicker (for backwards compatibility)
// ============================================

export interface MLDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (value: Date) => void;
  dateFormatter?: (value: Date) => React.ReactNode;
  placeholder?: string;
}

function MLDatePicker({
  label,
  value,
  onChange,
  dateFormatter = (date) => format(date, 'PPP'),
  placeholder = 'Pick a date',
}: MLDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onChange?.(selectedDate);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-base-foreground">
      {label && (
        <Label htmlFor="date" className="px-1 text-sm font-medium">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'w-60 justify-start font-normal',
            'bg-base-background border-base-input shadow-xs',
            'hover:bg-cream-50 transition-colors duration-150'
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? dateFormatter(date) : placeholder}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 border-base-border shadow-md bg-base-popover"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DatePicker, DatePickerWithPresets, DateRangePicker, MLDatePicker };
