export const examples = {
  Default: `<MLSwitch 
  label="Switch Text" 
  description="This is a switch description." 
/>`,

  Checked: `<MLSwitch 
  defaultChecked 
  label="Switch Text" 
  description="This is a switch description." 
/>`,

  PlaygroundControlled: `const [val, setVal] = useState(false);

<MLSwitch
  label="Switch Text"
  description="This is a switch description."
  checked={val}
  onChange={(e) => setVal(e.target.checked)}
/>`,

  UncontrolledDefault: `<MLSwitch 
  label="Switch Text" 
  description="This is a switch description." 
/>`,

  UncontrolledDefaultChecked: `<MLSwitch 
  defaultChecked 
  label="Switch Text" 
  description="This is a switch description." 
/>`,

  RightAligned: `<MLSwitch 
  defaultChecked 
  label="Switch Text" 
  description="This is a switch description." 
  align="right" 
/>`,

  BoxVariant: `<MLSwitch 
  defaultChecked 
  label="Switch Text" 
  description="This is a switch description." 
  variant="box" 
  align="right" 
/>`,
};
