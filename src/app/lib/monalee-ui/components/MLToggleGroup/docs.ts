export const examples = {
  TextFormatting: `const [value, setValue] = useState(['bold']);

<MLToggleGroup
  type="multiple"
  variant="default"
  options={[
    { value: 'bold', label: <Bold className="size-4" /> },
    { value: 'italic', label: <Italic className="size-4" /> },
    { value: 'underline', label: <Underline className="size-4" /> },
  ]}
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,

  FilterToggles: `const [value, setValue] = useState('all');

<MLToggleGroup
  type="single"
  variant="outline"
  options={[
    { value: 'all', label: 'All' },
    { value: 'missed', label: 'Missed' },
  ]}
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,

  DateRangeToggles: `const [value, setValue] = useState('24h');

<MLToggleGroup
  type="single"
  variant="outline"
  size="sm"
  options={[
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
  ]}
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,

  Default: `const [value, setValue] = useState('option1');

<MLToggleGroup
  type="single"
  variant="outline"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,

  GhostVariant: `const [value, setValue] = useState('24h');

<MLToggleGroup
  type="single"
  variant="ghost"
  size="sm"
  options={[
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
  ]}
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,

  AllVariants: `const [iconValue, setIconValue] = useState(['bold']);
const [filterValue, setFilterValue] = useState('all');
const [dateValue, setDateValue] = useState('24h');

<div className="flex flex-col items-center gap-16">
  {/* Icon toggles - default variant */}
  <MLToggleGroup
    type="multiple"
    variant="default"
    options={[
      { value: 'bold', label: <Bold className="size-4" /> },
      { value: 'italic', label: <Italic className="size-4" /> },
      { value: 'underline', label: <Underline className="size-4" /> },
    ]}
    value={iconValue}
    onChange={(newValue) => setIconValue(newValue)}
  />

  {/* Filter toggles - outline variant */}
  <MLToggleGroup
    type="single"
    variant="outline"
    options={[
      { value: 'all', label: 'All' },
      { value: 'missed', label: 'Missed' },
    ]}
    value={filterValue}
    onChange={(newValue) => setFilterValue(newValue)}
  />

  {/* Date range toggles - ghost variant */}
  <MLToggleGroup
    type="single"
    variant="ghost"
    size="sm"
    options={[
      { value: '24h', label: 'Last 24 hours' },
      { value: '7d', label: 'Last 7 days' },
    ]}
    value={dateValue}
    onChange={(newValue) => setDateValue(newValue)}
  />
</div>`,
};
