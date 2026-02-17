import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  addDays,
  addWeeks,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import type { DateRange as DateRangeType } from 'react-day-picker';
import {
  DatePicker,
  DatePickerWithPresets,
  DateRangePicker,
  type DatePickerProps,
  type DatePickerWithPresetsProps,
  type DateRangePickerProps,
  type DatePickerPreset,
} from './MLDatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
    docs: {
      description: {
        component:
          'A date picker component with support for single date selection, presets, and date range selection.',
      },
    },
  },
};

export default meta;

// ============================================
// Simple DatePicker Stories
// ============================================

type SimpleDatePickerStory = StoryObj<DatePickerProps>;

export const Default: SimpleDatePickerStory = {
  args: {
    placeholder: 'Pick a date',
  },
};

export const WithLabel: SimpleDatePickerStory = {
  args: {
    label: 'Select Date',
    placeholder: 'Pick a date',
  },
};

export const WithValue: SimpleDatePickerStory = {
  args: {
    label: 'Event Date',
    value: new Date(2025, 0, 15),
    placeholder: 'Pick a date',
  },
};

export const Disabled: SimpleDatePickerStory = {
  args: {
    label: 'Disabled Date Picker',
    placeholder: 'Pick a date',
    disabled: true,
  },
};

export const CustomFormatter: SimpleDatePickerStory = {
  args: {
    label: 'Custom Format',
    value: new Date(2025, 0, 15),
    dateFormatter: (date) =>
      date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
  },
};

// ============================================
// DatePicker with Presets Stories
// ============================================

type PresetsDatePickerStory = StoryObj<DatePickerWithPresetsProps>;

export const WithPresets: PresetsDatePickerStory = {
  render: (args) => <DatePickerWithPresets {...args} />,
  args: {
    label: 'Due Date',
    placeholder: 'Select a date',
  },
};

export const WithPresetsAndValue: PresetsDatePickerStory = {
  render: (args) => <DatePickerWithPresets {...args} />,
  args: {
    label: 'Deadline',
    value: addDays(new Date(), 7),
    placeholder: 'Select a date',
  },
};

const customPresets: DatePickerPreset[] = [
  { label: 'Today', value: new Date() },
  { label: 'Tomorrow', value: addDays(new Date(), 1) },
  { label: 'This weekend', value: endOfWeek(new Date()) },
  { label: 'Next Monday', value: addDays(startOfWeek(addWeeks(new Date(), 1)), 1) },
  { label: 'End of month', value: endOfMonth(new Date()) },
  { label: 'Next month', value: startOfMonth(addMonths(new Date(), 1)) },
];

export const WithCustomPresets: PresetsDatePickerStory = {
  render: (args) => <DatePickerWithPresets {...args} />,
  args: {
    label: 'Schedule For',
    placeholder: 'Select a date',
    presets: customPresets,
  },
};

// ============================================
// DateRangePicker Stories
// ============================================

type DateRangePickerStory = StoryObj<DateRangePickerProps>;

export const RangePicker: DateRangePickerStory = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    label: 'Date Range',
    placeholder: 'Pick a date range',
  },
};

export const DateRangeWithValue: DateRangePickerStory = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    label: 'Vacation Dates',
    value: {
      from: new Date(2025, 0, 10),
      to: new Date(2025, 0, 20),
    },
  },
};

export const SingleMonthRange: DateRangePickerStory = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    label: 'Date Range (Single Month)',
    placeholder: 'Pick a date range',
    numberOfMonths: 1,
    className: 'w-60',
  },
};

// ============================================
// Interactive Demo
// ============================================

const ControlledDatePickerDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        label="Controlled Date Picker"
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
      />
      <p className="text-sm text-base-muted-foreground">
        Selected: {date ? date.toLocaleDateString() : 'None'}
      </p>
    </div>
  );
};

export const Controlled: SimpleDatePickerStory = {
  render: () => <ControlledDatePickerDemo />,
};

const ControlledRangeDemo = () => {
  const [range, setRange] = useState<DateRangeType | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="flex flex-col gap-4">
      <DateRangePicker
        label="Controlled Range Picker"
        value={range}
        onChange={setRange}
        placeholder="Pick a date range"
      />
      <p className="text-sm text-base-muted-foreground">
        From: {range?.from?.toLocaleDateString() ?? 'None'} - To:{' '}
        {range?.to?.toLocaleDateString() ?? 'None'}
      </p>
    </div>
  );
};

export const ControlledRange: DateRangePickerStory = {
  render: () => <ControlledRangeDemo />,
};

// ============================================
// All Variants Showcase
// ============================================

const AllVariantsShowcase = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-base-foreground">Simple Date Picker</h3>
        <DatePicker label="Select Date" placeholder="Pick a date" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-base-foreground">
          Date Picker with Presets
        </h3>
        <DatePickerWithPresets label="Schedule For" placeholder="Pick a date" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-base-foreground">Date Range Picker</h3>
        <DateRangePicker label="Date Range" placeholder="Pick a date range" />
      </div>
    </div>
  );
};

export const AllVariants: SimpleDatePickerStory = {
  render: () => <AllVariantsShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          'Showcases all three date picker variants: simple, with presets, and range selection.',
      },
    },
  },
};
