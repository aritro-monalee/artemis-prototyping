'use client';

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MLCalendar as Calendar, type MLCalendarProps as CalendarProps } from './index';
import type { DateRange as RDPDateRange } from 'react-day-picker';

const meta: Meta<CalendarProps> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Selection mode',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the caption is displayed',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from adjacent months',
    },
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
  },
};

export default meta;
type Story = StoryObj<CalendarProps>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const WithDropdowns: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" />;
  },
};

export const TwoMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} numberOfMonths={2} />;
  },
};

export const ThreeMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} numberOfMonths={3} />;
  },
};

export const DateRangeSelection: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<RDPDateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return (
      <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
    );
  },
};

export const MultipleDates: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    ]);
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
  },
};

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    // Disable weekends
    const disabledDays = (date: Date) => {
      return date.getDay() === 0 || date.getDay() === 6;
    };
    return <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDays} />;
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        fromDate={today}
        toDate={nextMonth}
      />
    );
  },
};

export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} showOutsideDays={false} />;
  },
};
