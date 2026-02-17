import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLChip, type MLChipProps } from '.';

const meta: Meta<typeof MLChip> = {
  title: 'Components/Chip',
  component: MLChip,
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
    value: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<MLChipProps>;

export const WithValue: Story = {
  args: {
    label: 'Label',
    size: 'lg',
    value: 12,
  },
};

export const WithoutValue: Story = {
  args: {
    label: 'Label',
    size: 'lg',
  },
};

export const Black: Story = {
  args: {
    label: 'Label',
    color: 'black',
  },
};

export const Closeable: Story = {
  args: {
    label: 'Label',
    closable: true,
  },
};
