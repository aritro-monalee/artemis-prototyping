export const examples = {
  Default: `const [date, setDate] = useState<Date | undefined>(new Date());

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
/>`,

  WithDropdowns: `const [date, setDate] = useState<Date | undefined>(new Date());

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
  captionLayout="dropdown" 
/>`,

  TwoMonths: `const [date, setDate] = useState<Date | undefined>(new Date());

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
  numberOfMonths={2} 
/>`,

  ThreeMonths: `const [date, setDate] = useState<Date | undefined>(new Date());

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
  numberOfMonths={3} 
/>`,

  DateRangeSelection: `const [dateRange, setDateRange] = useState<DateRange | undefined>({
  from: new Date(),
  to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

<MLCalendar 
  mode="range" 
  selected={dateRange} 
  onSelect={setDateRange} 
  numberOfMonths={2} 
/>`,

  MultipleDates: `const [dates, setDates] = useState<Date[] | undefined>([
  new Date(),
  new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
]);

<MLCalendar 
  mode="multiple" 
  selected={dates} 
  onSelect={setDates} 
/>`,

  DisabledDates: `const [date, setDate] = useState<Date | undefined>(new Date());
const disabledDays = (date: Date) => {
  return date.getDay() === 0 || date.getDay() === 6; // Disable weekends
};

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
  disabled={disabledDays} 
/>`,

  WithMinMaxDates: `const [date, setDate] = useState<Date | undefined>(new Date());
const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

<MLCalendar
  mode="single"
  selected={date}
  onSelect={setDate}
  fromDate={today}
  toDate={nextMonth}
/>`,

  HideOutsideDays: `const [date, setDate] = useState<Date | undefined>(new Date());

<MLCalendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
  showOutsideDays={false} 
/>`,
};
