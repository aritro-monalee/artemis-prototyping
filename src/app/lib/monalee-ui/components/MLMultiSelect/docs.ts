export const examples = {
  Default: `const [value, setValue] = useState(['option1', 'option3']);

<MLMultiSelect
  label="Select an option"
  required
  isSearchable
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  value={value}
  onChange={(v) => setValue(v)}
/>`,

  WithLabel: `const [value, setValue] = useState(['option1', 'option3']);

<MLMultiSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  value={value}
  onChange={setValue}
  label="Select Options"
/>`,

  Required: `<MLMultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Select Options"
  required
/>`,

  WithError: `<MLMultiSelect
  options={options}
  value={['option1']}
  onChange={setValue}
  label="Select Options"
  error="Please select at least two options"
/>`,

  CustomPlaceholder: `<MLMultiSelect
  options={options}
  value={[]}
  onChange={setValue}
  placeholder="Choose multiple options..."
/>`,

  Empty: `<MLMultiSelect
  options={options}
  value={[]}
  onChange={setValue}
/>`,

  Searchable: `const [value, setValue] = useState(['apple', 'banana']);

<MLMultiSelect
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
  ]}
  value={value}
  onChange={setValue}
  isSearchable
  label="Select Fruits"
/>`,

  ManySelected: `const [value, setValue] = useState(['option1', 'option2', 'option3', 'option4', 'option5']);

<MLMultiSelect
  size="lg"
  isSearchable
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
    { label: 'Option Four', value: 'option4' },
    { label: 'Option Five', value: 'option5' },
    { label: 'Option Six', value: 'option6' },
    { label: 'Option Seven', value: 'option7' },
  ]}
  value={value}
  onChange={setValue}
  label="Multiple Selected"
/>`,

  UncontrolledWithDefaultValue: `<MLMultiSelect
  options={[
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ]}
  defaultValue={['option1', 'option3']}
  label="Uncontrolled Multi-Select"
/>`,
};
