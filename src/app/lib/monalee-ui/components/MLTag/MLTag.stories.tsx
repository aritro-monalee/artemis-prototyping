import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLTag, type MLTagProps } from './index';

const meta: Meta<typeof MLTag> = {
  title: 'Components/Tag',
  component: MLTag,
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
    text: { control: 'text' },
    color: {
      control: 'select',
      options: ['default', 'green', 'purple', 'blue', 'yellow', 'red', 'lightgray'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullwidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<MLTagProps>;

export const Default: Story = {
  args: {
    text: 'Tag',
    color: 'default',
  },
};

export const Green: Story = {
  args: {
    text: 'Tag',
    color: 'green',
  },
};

export const Purple: Story = {
  args: {
    text: 'Tag',
    color: 'purple',
  },
};

export const Blue: Story = {
  args: {
    text: 'Tag',
    color: 'blue',
  },
};

export const Yellow: Story = {
  args: {
    text: 'Tag',
    color: 'yellow',
  },
};

export const Red: Story = {
  args: {
    text: 'Tag',
    color: 'red',
  },
};

export const LightGray: Story = {
  args: {
    text: 'Tag',
    color: 'lightgray',
  },
};

export const Small: Story = {
  args: {
    text: 'Tag',
    color: 'default',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    text: 'Tag',
    color: 'default',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    text: 'Tag',
    color: 'default',
    size: 'lg',
  },
};
