export const examples = {
  SingleRadioUnchecked: `<MLRadioGroup defaultValue="">
  <MLRadio value="radio" label="Radio Button" />
</MLRadioGroup>`,

  SingleRadioChecked: `<MLRadioGroup defaultValue="radio">
  <MLRadio value="radio" label="Radio Button" />
</MLRadioGroup>`,

  WithDescription: `<MLRadioGroup defaultValue="">
  <MLRadio 
    value="radio" 
    label="Radio Button Text" 
    description="This is a radio description." 
  />
</MLRadioGroup>`,

  WithDescriptionChecked: `<MLRadioGroup defaultValue="radio">
  <MLRadio 
    value="radio" 
    label="Radio Button Text" 
    description="This is a radio description." 
  />
</MLRadioGroup>`,

  Default: `<MLRadioGroup defaultValue="comfortable">
  <MLRadio value="default" label="Default" />
  <MLRadio value="comfortable" label="Comfortable" />
  <MLRadio value="compact" label="Compact" />
</MLRadioGroup>`,

  WithDescriptions: `<MLRadioGroup defaultValue="option1">
  <MLRadio
    value="option1"
    label="Default Setting"
    description="Use the default configuration."
  />
  <MLRadio
    value="option2"
    label="Custom Setting"
    description="Customize the configuration."
  />
  <MLRadio
    value="option3"
    label="Advanced Setting"
    description="Advanced options for power users."
  />
</MLRadioGroup>`,

  BoxVariant: `<MLRadioGroup defaultValue="starter" className="w-[360px]">
  <MLRadio
    value="starter"
    variant="box"
    label="Starter Plan"
    description="Perfect for small businesses"
  />
  <MLRadio
    value="pro"
    variant="box"
    label="Pro Plan"
    description="Advanced features for growing businesses"
  />
</MLRadioGroup>`,

  BoxVariantThreeOptions: `<MLRadioGroup defaultValue="monthly" className="w-[360px]">
  <MLRadio
    value="monthly"
    variant="box"
    label="Monthly"
    description="Pay month-to-month, cancel anytime"
  />
  <MLRadio
    value="yearly"
    variant="box"
    label="Yearly"
    description="Save 20% with annual billing"
  />
  <MLRadio
    value="lifetime"
    variant="box"
    label="Lifetime"
    description="One-time payment, forever access"
  />
</MLRadioGroup>`,

  BlackVariant: `<MLRadioGroup color="black" defaultValue="option2">
  <MLRadio value="option1" label="Option One" color="black" />
  <MLRadio value="option2" label="Option Two" color="black" />
  <MLRadio value="option3" label="Option Three" color="black" />
</MLRadioGroup>`,

  BlackBoxVariant: `<MLRadioGroup defaultValue="basic" className="w-[360px]" color="black">
  <MLRadio
    value="basic"
    variant="box"
    color="black"
    label="Basic Plan"
    description="Essential features for individuals"
  />
  <MLRadio
    value="team"
    variant="box"
    color="black"
    label="Team Plan"
    description="Collaboration features for teams"
  />
</MLRadioGroup>`,

  Controlled: `const [value, setValue] = useState('comfortable');

<MLRadioGroup value={value} onValueChange={setValue}>
  <MLRadio value="default" label="Default" />
  <MLRadio value="comfortable" label="Comfortable" />
  <MLRadio value="compact" label="Compact" />
</MLRadioGroup>`,

  FormExample: `const [plan, setPlan] = useState('starter');

<div className="flex flex-col gap-6 w-[400px] p-6 border rounded-lg">
  <div>
    <h3 className="text-lg font-semibold">Choose your plan</h3>
    <p className="text-sm text-muted-foreground">Select the plan that works best.</p>
  </div>

  <MLRadioGroup value={plan} onValueChange={setPlan}>
    <MLRadio value="starter" variant="box" label="Starter Plan" description="..." />
    <MLRadio value="pro" variant="box" label="Pro Plan" description="..." />
    <MLRadio value="enterprise" variant="box" label="Enterprise Plan" description="..." />
  </MLRadioGroup>

  <button className="px-4 py-2 bg-primary text-white rounded-md">
    Continue with {plan}
  </button>
</div>`,
};
