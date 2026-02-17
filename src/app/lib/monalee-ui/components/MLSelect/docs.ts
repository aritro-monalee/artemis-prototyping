export const examples = {
  FruitSelection: `<MLSelect
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
  ]}
  defaultValue={{ label: 'Blueberry', value: 'blueberry' }}
  placeholder="Select Fruit"
/>`,

  LargeList: `<MLSelect
  options={[
    { label: 'Item 0', value: 'item0' },
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
    { label: 'Item 4', value: 'item4' },
    { label: 'Item 5', value: 'item5' },
    { label: 'Item 6', value: 'item6' },
  ]}
  defaultValue={{ label: 'Item 3', value: 'item3' }}
  placeholder="Large List"
/>`,

  Disabled: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  placeholder="Disabled"
  disabled
/>`,

  WithIcons: `<MLSelect
  options={[
    { label: 'Line', value: 'line', render: (opt) => <div className="flex items-center gap-2"><LineChart className="size-4" />{opt.label}</div> },
    { label: 'Bar', value: 'bar', render: (opt) => <div className="flex items-center gap-2"><BarChartHorizontal className="size-4" />{opt.label}</div> },
    { label: 'Pie', value: 'pie', render: (opt) => <div className="flex items-center gap-2"><PieChart className="size-4" />{opt.label}</div> },
  ]}
  defaultValue={{ label: 'Bar', value: 'bar' }}
  placeholder="With Icon"
/>`,

  Default: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1', recommended: true },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  fullwidth
/>`,

  Recommended: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1', recommended: true },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  defaultValue={{ label: 'Option Two', value: 'option2' }}
  fullwidth
/>`,

  Description: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1', desc: 'Description for option one', recommended: true },
    { label: 'Option Two', value: 'option2', desc: 'Description for option two' },
    { label: 'Option Three', value: 'option3', desc: 'Description for option three' },
  ]}
  defaultValue={{ label: 'Option Two', value: 'option2' }}
  fullwidth
/>`,

  Required: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  label="Label"
  required
/>`,

  Label: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  label="Label"
/>`,

  FullWidth: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  fullwidth
/>`,

  Error: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  error="Error"
/>`,

  ErrorWithLabel: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  label="Label"
  error="Error"
/>`,

  Prefix: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
  ]}
  defaultValue={{ label: 'Option One', value: 'option1' }}
  label="Label"
  placeholder="Select"
  prefix={<Icon className="size-4" />}
/>`,

  InteractiveWithEmptyValue: `const [selectedValue, setSelectedValue] = useState({ label: 'None', value: '' });

const options = [
  { label: 'None', value: '' },
  { label: 'Option One', value: 'option1' },
  { label: 'Option Two', value: 'option2' },
];

<MLSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  label="Select an option (Controlled)"
  placeholder="Choose..."
  fullwidth
/>`,

  UncontrolledWithDefaultValue: `<MLSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  defaultValue={{ label: 'Option Two', value: 'option2' }}
  label="Uncontrolled Select"
/>`,
};
