export const examples = {
  Default: `<MLRadioGroup defaultValue="example">
  <MLRadio value="example" label="Radio Button" />
</MLRadioGroup>`,

  WithDescription: `<MLRadioGroup defaultValue="example">
  <MLRadio 
    value="example" 
    label="Radio Button Text" 
    description="This is a radio description." 
  />
</MLRadioGroup>`,

  SolidVariant: `<MLRadioGroup defaultValue="example">
  <MLRadio 
    value="example" 
    label="Solid Variant" 
    description="This is the default solid variant." 
    variant="solid" 
  />
</MLRadioGroup>`,

  BoxVariant: `<MLRadioGroup defaultValue="example" className="w-[360px]">
  <MLRadio 
    value="example" 
    label="Box Variant" 
    description="Card-style radio with border." 
    variant="box" 
  />
</MLRadioGroup>`,

  DefaultColor: `<MLRadioGroup defaultValue="example">
  <MLRadio value="example" label="Default Color" color="default" />
</MLRadioGroup>`,

  BlackColor: `<MLRadioGroup defaultValue="example">
  <MLRadio value="example" label="Black Color" color="black" />
</MLRadioGroup>`,

  BlackBoxVariant: `<MLRadioGroup defaultValue="example" className="w-[360px]">
  <MLRadio 
    value="example" 
    label="Black Box Variant" 
    description="Box variant with black color scheme." 
    variant="box" 
    color="black" 
  />
</MLRadioGroup>`,

  Unchecked: `<MLRadioGroup defaultValue="">
  <MLRadio value="unchecked" label="Unchecked Radio" />
</MLRadioGroup>`,

  Checked: `<MLRadioGroup defaultValue="checked">
  <MLRadio value="checked" label="Checked Radio" />
</MLRadioGroup>`,
};
