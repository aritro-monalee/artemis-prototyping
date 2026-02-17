import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLRadio, type MLRadioProps } from './index';
import { MLRadioGroup } from '../MLRadioGroup';

const meta: Meta<typeof MLRadio> = {
  title: 'Components/Radio',
  component: MLRadio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio label text',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    variant: {
      control: 'select',
      options: ['solid', 'box'],
      description: 'Visual variant of the radio',
    },
    color: {
      control: 'select',
      options: ['default', 'black'],
      description: 'Color of the radio',
    },
  },
  decorators: [
    (Story) => (
      <MLRadioGroup defaultValue="example">
        <Story />
      </MLRadioGroup>
    ),
  ],
};

export default meta;
type Story = StoryObj<MLRadioProps>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  args: {
    value: 'example',
    label: 'Radio Button',
  },
};

export const WithDescription: Story = {
  args: {
    value: 'example',
    label: 'Radio Button Text',
    description: 'This is a radio description.',
  },
};

// ============================================
// Variants
// ============================================

export const SolidVariant: Story = {
  args: {
    value: 'example',
    label: 'Solid Variant',
    description: 'This is the default solid variant.',
    variant: 'solid',
  },
};

export const BoxVariant: Story = {
  args: {
    value: 'example',
    label: 'Box Variant',
    description: 'Card-style radio with border that changes on selection.',
    variant: 'box',
  },
  decorators: [
    (Story) => (
      <MLRadioGroup defaultValue="example" className="w-[360px]">
        <Story />
      </MLRadioGroup>
    ),
  ],
};

// ============================================
// Color Variants
// ============================================

export const DefaultColor: Story = {
  args: {
    value: 'example',
    label: 'Default Color',
    color: 'default',
  },
};

export const BlackColor: Story = {
  args: {
    value: 'example',
    label: 'Black Color',
    color: 'black',
  },
};

export const BlackBoxVariant: Story = {
  args: {
    value: 'example',
    label: 'Black Box Variant',
    description: 'Box variant with black color scheme.',
    variant: 'box',
    color: 'black',
  },
  decorators: [
    (Story) => (
      <MLRadioGroup defaultValue="example" className="w-[360px]">
        <Story />
      </MLRadioGroup>
    ),
  ],
};

// ============================================
// States
// ============================================

export const Unchecked: Story = {
  args: {
    value: 'unchecked',
    label: 'Unchecked Radio',
  },
  decorators: [
    (Story) => (
      <MLRadioGroup defaultValue="">
        <Story />
      </MLRadioGroup>
    ),
  ],
};

export const Checked: Story = {
  args: {
    value: 'checked',
    label: 'Checked Radio',
  },
  decorators: [
    (Story) => (
      <MLRadioGroup defaultValue="checked">
        <Story />
      </MLRadioGroup>
    ),
  ],
};
