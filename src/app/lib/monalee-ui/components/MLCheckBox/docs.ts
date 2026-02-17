// Code examples for MLCheckBox component documentation

export const examples = {
  Default: `<MLCheckBox label="Checkbox Text" />`,

  Checked: `<MLCheckBox 
  defaultChecked 
  label="Checkbox Text" 
/>`,

  WithDescription: `<MLCheckBox
  label="Checkbox Text"
  description="This is a checkbox description."
/>`,

  WithDescriptionChecked: `<MLCheckBox
  defaultChecked
  label="Checkbox Text"
  description="This is a checkbox description."
/>`,

  Disabled: `<MLCheckBox
  label="Checkbox Text"
  disabled
/>`,

  DisabledChecked: `<MLCheckBox
  defaultChecked
  label="Checkbox Text"
  disabled
/>`,

  DisabledWithDescription: `<MLCheckBox
  label="Checkbox Text"
  description="This is a checkbox description."
  disabled
/>`,

  DisabledCheckedWithDescription: `<MLCheckBox
  defaultChecked
  label="Checkbox Text"
  description="This is a checkbox description."
  disabled
/>`,

  Standalone: `<MLCheckBox />`,

  StandaloneChecked: `<MLCheckBox defaultChecked />`,

  BlackColor: `<MLCheckBox
  defaultChecked
  label="Checkbox Text"
  color="black"
/>`,

  BlackColorWithDescription: `<MLCheckBox
  defaultChecked
  label="Checkbox Text"
  description="This is a checkbox description."
  color="black"
/>`,

  WithMarkdownLabel: `<MLCheckBox
  defaultChecked
  markdown
  label="**Accept terms and conditions**"
  description="You agree to our [Terms of Service](https://example.com) and [Privacy Policy](https://example.com)."
/>`,

  Controlled: `const [checked, setChecked] = useState(false);

<MLCheckBox
  label="Controlled checkbox"
  description="This checkbox is controlled by state."
  checked={checked}
  onCheckedChange={(val) => setChecked(val === true)}
/>`,

  AllStates: `<div className="grid grid-cols-3 gap-x-8 gap-y-6">
  {/* Active states */}
  <MLCheckBox
    defaultChecked
    label="Checkbox Text"
    description="This is a checkbox description."
  />
  
  {/* Inactive states */}
  <MLCheckBox
    label="Checkbox Text"
    description="This is a checkbox description."
  />
  
  {/* Disabled states */}
  <MLCheckBox
    label="Checkbox Text"
    description="This is a checkbox description."
    disabled
  />
</div>`,
};
