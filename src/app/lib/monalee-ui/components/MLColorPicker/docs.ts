export const examples = {
  Default: `<MLColorPicker label="Select Color" value="#4F46E5" />`,

  WithLabel: `<MLColorPicker label="Brand Color" value="#4F46E5" />`,

  NoLabel: `<MLColorPicker value="#10B981" />`,

  Disabled: `<MLColorPicker label="Select Color" value="#4F46E5" disabled />`,

  RedColor: `<MLColorPicker label="Error Color" value="#EF4444" />`,

  GreenColor: `<MLColorPicker label="Success Color" value="#22C55E" />`,

  BlueColor: `<MLColorPicker label="Info Color" value="#3B82F6" />`,

  YellowColor: `<MLColorPicker label="Warning Color" value="#F59E0B" />`,

  HexFormat: `<MLColorPicker label="Hex Format" value="#4F46E5" defaultFormat="hex" />`,

  RGBFormat: `<MLColorPicker label="RGB Format" value="#4F46E5" defaultFormat="rgb" />`,

  HSLFormat: `<MLColorPicker label="HSL Format" value="#4F46E5" defaultFormat="hsl" />`,

  NoOpacity: `<MLColorPicker label="Select Color" value="#4F46E5" showOpacity={false} />`,

  Controlled: `const [color, setColor] = useState('#4F46E5');

<MLColorPicker 
  label="Select Color" 
  value={color} 
  onChange={setColor} 
/>`,

  FormExample: `const [primaryColor, setPrimaryColor] = useState('#4F46E5');
const [secondaryColor, setSecondaryColor] = useState('#10B981');

<div className="flex flex-col gap-4">
  <MLColorPicker label="Primary" value={primaryColor} onChange={setPrimaryColor} />
  <MLColorPicker label="Secondary" value={secondaryColor} onChange={setSecondaryColor} />
</div>`,

  InitiallyOpen: `<MLColorPicker label="Select Color" value="#4F46E5" defaultOpen />`,
};
