import React, { useState } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import { MLMultiSelect } from './index';

const meta: Meta<typeof MLMultiSelect> = {
  title: 'Components/MultiSelect',
  component: MLMultiSelect,
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
    options: {
      control: 'object',
    },
    value: {
      control: 'object',
    },
    defaultValue: {
      control: 'object',
    },
    onChange: { action: 'changed' },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    isSearchable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MLMultiSelect>;

const Template: StoryFn<typeof MLMultiSelect> = (args) => {
  const [value, setValue] = useState<string[]>(args.value ?? []);
  return (
    <div style={{ height: '600px', padding: '20px' }}>
      <MLMultiSelect {...args} value={value} onChange={(v) => setValue(v)} />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'Select an option',
    required: true,
    isSearchable: true,
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    value: ['option1', 'option3'],
  },
};

export const WithLabel: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
    ],
    value: ['option1', 'option3'],
    label: 'Select Options',
  },
};

export const Required: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
    ],
    value: ['option1', 'option3'],
    label: 'Select Options',
    required: true,
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
    ],
    value: ['option1'],
    label: 'Select Options',
    error: 'Please select at least two options',
  },
};

export const CustomPlaceholder: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
    ],
    value: [],
    placeholder: 'Choose multiple options...',
  },
};

export const Empty: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
    ],
    value: [],
  },
};

export const Searchable: Story = {
  render: Template,
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
      { label: 'Elderberry', value: 'elderberry' },
      { label: 'Fig', value: 'fig' },
      { label: 'Grape', value: 'grape' },
      { label: 'Honeydew', value: 'honeydew' },
      { label: 'Kiwi', value: 'kiwi' },
      { label: 'Lemon', value: 'lemon' },
      { label: 'Mango', value: 'mango' },
    ],
    value: ['apple', 'banana'],
    isSearchable: true,
    label: 'Select Fruits',
  },
};

export const ManySelected: Story = {
  render: Template,
  args: {
    size: 'lg',
    isSearchable: true,
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
      { label: 'Option Four', value: 'option4' },
      { label: 'Option Five', value: 'option5' },
      { label: 'Option Six', value: 'option6' },
      { label: 'Option Seven', value: 'option7' },
      { label: 'Option Eigth', value: 'option8' },
      { label: 'Option Nine', value: 'option9' },
      { label: 'Option Ten', value: 'option10' },
    ],
    value: ['option1', 'option2', 'option3', 'option4', 'option5'],
    label: 'Multiple Selected',
  },
};

export const UncontrolledWithDefaultValue: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: ['option1', 'option3'],
    label: 'Uncontrolled Multi-Select',
  },
};

export const UncontrolledEmpty: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    label: 'Uncontrolled (Empty)',
  },
};
