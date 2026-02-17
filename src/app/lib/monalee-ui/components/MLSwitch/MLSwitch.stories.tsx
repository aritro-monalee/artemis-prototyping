import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLSwitch, type MLSwitchProps } from './index';
import React from 'react';

const meta: Meta<typeof MLSwitch> = {
  title: 'Components/Switch',
  component: MLSwitch,
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
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'select', options: ['default', 'box'] },
    align: { control: 'select', options: ['left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<MLSwitchProps>;

export const Default: Story = {
  args: {
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
};

export const PlaygroundControlled: Story = {
  args: {
    checked: false,
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
  render: (args) => {
    const [val, setVal] = React.useState(Boolean(args.checked));
    React.useEffect(() => setVal(Boolean(args.checked)), [args.checked]);
    return (
      <MLSwitch
        {...args}
        checked={val}
        onChange={(e) => {
          setVal(e.target.checked);
          args.onChange?.(e as any);
        }}
      />
    );
  },
};

export const UncontrolledDefault: Story = {
  args: {
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
};

export const UncontrolledDefaultChecked: Story = {
  args: {
    defaultChecked: true,
    label: 'Switch Text',
    description: 'This is a switch description.',
  },
};

export const RightAligned: Story = {
  args: {
    defaultChecked: true,
    label: 'Switch Text',
    description: 'This is a switch description.',
    align: 'right',
  },
};

export const BoxVariant: Story = {
  args: {
    defaultChecked: true,
    label: 'Switch Text',
    description: 'This is a switch description.',
    variant: 'box',
    align: 'right',
  },
};
