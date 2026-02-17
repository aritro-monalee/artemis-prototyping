export const examples = {
  Default: `<MLCounter min={1} max={10} value={5} />`,

  WithoutMinMax: `const [value, setValue] = useState(5);

<MLCounter value={value} onChange={setValue} />`,

  EditableInput: `<MLCounter
  min={1}
  max={10}
  value={5}
  editableNumberInput
/>`,

  EditableWithoutLimits: `<MLCounter value={42} editableNumberInput />`,

  Disabled: `<MLCounter min={1} max={10} value={5} disabled />`,

  EditableDemo: `const [value, setValue] = useState(15);

<MLCounter
  min={1}
  max={100}
  value={value}
  onChange={setValue}
  editableNumberInput
/>`,

  EditableWithTooltip: `const [value, setValue] = useState(5);

<MLToolTip tooltipContent="Edit directly by typing">
  <MLCounter
    min={1}
    max={10}
    value={value}
    onChange={setValue}
    editableNumberInput
  />
</MLToolTip>`,

  AccessibleCounter: `const [value, setValue] = useState(12);

<MLCounter 
  min={0} 
  max={50} 
  value={value} 
  onChange={setValue} 
  aria-label="Number of items"
/>`,
};
