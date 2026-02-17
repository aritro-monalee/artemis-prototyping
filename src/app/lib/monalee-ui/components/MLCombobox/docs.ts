export const examples = {
  Default: `const frameworks = [
  { value: 'next.js', label: 'Next.js', desc: 'The React Framework' },
  { value: 'react', label: 'React', desc: 'A JavaScript library' },
  { value: 'vue', label: 'Vue.js', desc: 'The Progressive Framework' },
];

<MLCombobox
  options={frameworks}
  placeholder="Select framework..."
  searchPlaceholder="Search frameworks..."
/>`,

  Interactive: `const [value, setValue] = useState(null);

<MLCombobox
  options={frameworks}
  placeholder="Select framework..."
  value={value}
  onChange={setValue}
/>`,

  WithLabel: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  searchPlaceholder="Search frameworks..."
/>`,

  Required: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  required
/>`,

  WithError: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  error="Please select a framework"
/>`,

  Disabled: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  disabled
/>`,

  Readonly: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  readonly
  defaultValue={frameworks[1]}
/>`,

  FullWidth: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  fullwidth
/>`,

  WithPrefix: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  prefix="🚀"
/>`,

  BlackColor: `<MLCombobox
  options={frameworks}
  label="Framework"
  placeholder="Select framework..."
  color="black"
/>`,

  CustomNoResults: `<MLCombobox
  options={[]}
  label="Framework"
  placeholder="Select framework..."
  noResultsText="No frameworks found."
/>`,
};
