export const examples = {
  Default: `<MLTextArea placeholder="Type your message here" className="w-[525px]" />`,

  Error: `<MLTextArea
  placeholder="Type your message here"
  error="This field has an error"
  className="w-[525px]"
/>`,

  WithLabel: `<MLTextArea
  label="Label"
  placeholder="Type your message here"
  className="w-[525px]"
/>`,

  WithLabelAndDescription: `<MLTextArea
  label="With label and description"
  placeholder="Type your message here"
  description="Type your message and press enter to send."
  className="w-[525px]"
/>`,

  Disabled: `<MLTextArea
  label="Disabled"
  placeholder="Type your message here"
  disabled
  className="w-[525px]"
/>`,

  Required: `<MLTextArea
  label="Required Field"
  placeholder="This field is required..."
  required
  className="w-[525px]"
/>`,

  WithLabelAndTooltip: `<MLTextArea
  label="Description"
  labelTooltip="Provide a detailed description of your request"
  placeholder="Enter description..."
  className="w-[525px]"
/>`,

  AllVariants: `<div className="p-6 space-y-8 w-[600px]">
  <MLTextArea placeholder="Type your message here" />
  <MLTextArea placeholder="Type your message here" error="Error message" />
  <MLTextArea label="Label" placeholder="Type your message here" />
  <MLTextArea
    label="With label and description"
    placeholder="Type your message here"
    description="Type your message and press enter to send."
  />
  <MLTextArea label="Disabled" placeholder="Type your message here" disabled />
</div>`,

  Sizes: `<div className="p-6 space-y-8 w-[600px]">
  <MLTextArea label="Small" size="sm" placeholder="Small textarea..." />
  <MLTextArea label="Medium (Default)" size="md" placeholder="Medium textarea..." />
  <MLTextArea label="Large" size="lg" placeholder="Large textarea..." />
</div>`,

  ResizeOptions: `<div className="p-6 space-y-8 w-[600px]">
  <MLTextArea label="No Resize" resize="none" placeholder="Cannot be resized..." />
  <MLTextArea label="Vertical Resize (Default)" resize="vertical" placeholder="Can be resized vertically..." />
  <MLTextArea label="Horizontal Resize" resize="horizontal" placeholder="Can be resized horizontally..." />
  <MLTextArea label="Both Directions" resize="both" placeholder="Can be resized in both directions..." />
</div>`,
};
