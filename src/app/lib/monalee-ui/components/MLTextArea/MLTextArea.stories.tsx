import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLTextArea, type MLTextAreaProps } from './index';

const meta: Meta<typeof MLTextArea> = {
  title: 'Components/TextArea',
  component: MLTextArea,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    readonly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<MLTextAreaProps>;

// ============================================
// Default (No label, no description)
// ============================================
export const Default: Story = {
  args: {
    placeholder: 'Type your message here',
    className: 'w-[525px]',
  },
};

// ============================================
// Error State
// ============================================
export const Error: Story = {
  args: {
    placeholder: 'Type your message here',
    error: 'This field has an error',
    className: 'w-[525px]',
  },
};

// ============================================
// With Label
// ============================================
export const WithLabel: Story = {
  args: {
    label: 'Label',
    placeholder: 'Type your message here',
    className: 'w-[525px]',
  },
};

// ============================================
// With Label and Description
// ============================================
export const WithLabelAndDescription: Story = {
  args: {
    label: 'With label and description',
    placeholder: 'Type your message here',
    description: 'Type your message and press enter to send.',
    className: 'w-[525px]',
  },
};

// ============================================
// Disabled
// ============================================
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Type your message here',
    disabled: true,
    className: 'w-[525px]',
  },
};

// ============================================
// Required
// ============================================
export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required...',
    required: true,
    className: 'w-[525px]',
  },
};

// ============================================
// With Tooltip
// ============================================
export const WithLabelAndTooltip: Story = {
  args: {
    label: 'Description',
    labelTooltip: 'Provide a detailed description of your request',
    placeholder: 'Enter description...',
    className: 'w-[525px]',
  },
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode = () => {
  return (
    <div className="p-6 bg-[#0a0a0a] rounded-lg space-y-8 dark w-[600px]">
      <MLTextArea placeholder="Type your message here" />

      <MLTextArea placeholder="Type your message here" error="This field has an error" />

      <MLTextArea label="Label" placeholder="Type your message here" />

      <MLTextArea
        label="With label and description"
        placeholder="Type your message here"
        description="Type your message and press enter to send."
      />

      <MLTextArea label="Disabled" placeholder="Type your message here" disabled />
    </div>
  );
};

// ============================================
// All Variants (Figma Design)
// ============================================
export const AllVariants = () => {
  return (
    <div className="p-6 space-y-8 w-[600px]">
      <MLTextArea placeholder="Type your message here" />

      <MLTextArea placeholder="Type your message here" error="Error message" />

      <MLTextArea label="Label" placeholder="Type your message here" />

      <MLTextArea
        label="With label and description"
        placeholder="Type your message here"
        description="Type your message and press enter to send."
      />

      <MLTextArea label="Disabled" placeholder="Type your message here" disabled />
    </div>
  );
};

// ============================================
// Sizes
// ============================================
export const Sizes = () => {
  return (
    <div className="p-6 space-y-8 w-[600px]">
      <MLTextArea label="Small" size="sm" placeholder="Small textarea..." />
      <MLTextArea label="Medium (Default)" size="md" placeholder="Medium textarea..." />
      <MLTextArea label="Large" size="lg" placeholder="Large textarea..." />
    </div>
  );
};

// ============================================
// Resize Options
// ============================================
export const ResizeOptions = () => {
  return (
    <div className="p-6 space-y-8 w-[600px]">
      <MLTextArea label="No Resize" resize="none" placeholder="Cannot be resized..." />
      <MLTextArea
        label="Vertical Resize (Default)"
        resize="vertical"
        placeholder="Can be resized vertically..."
      />
      <MLTextArea
        label="Horizontal Resize"
        resize="horizontal"
        placeholder="Can be resized horizontally..."
      />
      <MLTextArea
        label="Both Directions"
        resize="both"
        placeholder="Can be resized in both directions..."
      />
    </div>
  );
};
