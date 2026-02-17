export const examples = {
  Default: `<DatePicker placeholder="Pick a date" />`,

  WithLabel: `<DatePicker label="Select Date" placeholder="Pick a date" />`,

  WithValue: `<DatePicker 
  label="Event Date" 
  value={new Date(2025, 0, 15)} 
  placeholder="Pick a date" 
/>`,

  Disabled: `<DatePicker 
  label="Disabled Date Picker" 
  placeholder="Pick a date" 
  disabled 
/>`,

  CustomFormatter: `<DatePicker
  label="Custom Format"
  value={new Date(2025, 0, 15)}
  dateFormatter={(date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
/>`,

  WithPresets: `<DatePickerWithPresets 
  label="Due Date" 
  placeholder="Select a date" 
/>`,

  WithPresetsAndValue: `<DatePickerWithPresets
  label="Deadline"
  value={addDays(new Date(), 7)}
  placeholder="Select a date"
/>`,

  WithCustomPresets: `const customPresets = [
  { label: 'Today', value: new Date() },
  { label: 'Tomorrow', value: addDays(new Date(), 1) },
  { label: 'This weekend', value: endOfWeek(new Date()) },
  { label: 'Next Monday', value: addDays(startOfWeek(addWeeks(new Date(), 1)), 1) },
];

<DatePickerWithPresets
  label="Schedule For"
  placeholder="Select a date"
  presets={customPresets}
/>`,

  RangePicker: `<DateRangePicker 
  label="Date Range" 
  placeholder="Pick a date range" 
/>`,

  DateRangeWithValue: `<DateRangePicker
  label="Vacation Dates"
  value={{
    from: new Date(2025, 0, 10),
    to: new Date(2025, 0, 20),
  }}
/>`,

  SingleMonthRange: `<DateRangePicker
  label="Date Range (Single Month)"
  placeholder="Pick a date range"
  numberOfMonths={1}
/>`,

  Controlled: `const [date, setDate] = useState<Date | undefined>(new Date());

<DatePicker
  label="Controlled Date Picker"
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`,

  ControlledRange: `const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(),
  to: addDays(new Date(), 7),
});

<DateRangePicker
  label="Controlled Range Picker"
  value={range}
  onChange={setRange}
  placeholder="Pick a date range"
/>`,

  AllVariants: `<div className="flex flex-col gap-8">
  <DatePicker label="Simple Date Picker" placeholder="Pick a date" />
  <DatePickerWithPresets label="With Presets" placeholder="Pick a date" />
  <DateRangePicker label="Date Range" placeholder="Pick a date range" />
</div>`,
};
