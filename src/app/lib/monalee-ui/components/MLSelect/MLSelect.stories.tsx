import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLSelect, type MLSelectProps } from './index';
import { MLSelectOption } from './types';
import { LineChart, BarChartHorizontal, PieChart } from 'lucide-react';

const meta: Meta<typeof MLSelect> = {
  title: 'Components/Select',
  component: MLSelect,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'object' },
    options: { control: 'object' },
    fullwidth: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    prefix: { control: false },
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<MLSelectProps<string>>;

// ============================================
// Figma Design Examples
// ============================================

export const FruitSelection: Story = {
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
      { label: 'Grapes', value: 'grapes' },
      { label: 'Pineapple', value: 'pineapple' },
    ],
    defaultValue: { label: 'Blueberry', value: 'blueberry' },
    placeholder: 'Select Fruit',
  },
};

export const LargeList: Story = {
  args: {
    options: [
      { label: 'Item 0', value: 'item0' },
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
      { label: 'Item 3', value: 'item3' },
      { label: 'Item 4', value: 'item4' },
      { label: 'Item 5', value: 'item5' },
      { label: 'Item 6', value: 'item6' },
    ],
    defaultValue: { label: 'Item 3', value: 'item3' },
    placeholder: 'Large List',
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
    ],
    placeholder: 'Disabled',
    disabled: true,
  },
};

const ChartOptionWithIcon = (option: MLSelectOption, icon: React.ReactNode) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{option.label}</span>
  </div>
);

export const WithIcons: Story = {
  args: {
    options: [
      {
        label: 'Line',
        value: 'line',
        render: (opt) => ChartOptionWithIcon(opt, <LineChart className="size-4" />),
      },
      {
        label: 'Bar',
        value: 'bar',
        render: (opt) => ChartOptionWithIcon(opt, <BarChartHorizontal className="size-4" />),
      },
      {
        label: 'Pie',
        value: 'pie',
        render: (opt) => ChartOptionWithIcon(opt, <PieChart className="size-4" />),
      },
    ],
    defaultValue: {
      label: 'Bar',
      value: 'bar',
      render: (opt) => ChartOptionWithIcon(opt, <BarChartHorizontal className="size-4" />),
    },
    placeholder: 'With Icon',
  },
};

// ============================================
// Basic Examples
// ============================================

export const Default: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1', recommended: true },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    fullwidth: true,
  },
};

export const Recommended: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1', recommended: true },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option Two', value: 'option1', recommended: true },
    fullwidth: true,
  },
};

export const Description: Story = {
  args: {
    options: [
      {
        label: 'Option One',
        value: 'option1',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        recommended: true,
      },
      {
        label: 'Option Two',
        value: 'option2',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      },
      {
        label: 'Option Three',
        value: 'option3',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      },
    ],
    defaultValue: {
      label: 'Option Two',
      value: 'option1',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      recommended: true,
    },
    fullwidth: true,
  },
};

export const Required: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    label: 'Label',
    required: true,
  },
};

export const Label: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    label: 'Label',
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    fullwidth: true,
  },
};

export const Error: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    error: 'Error',
  },
};

export const ErrorWithLabel: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    label: 'Label',
    error: 'Error',
  },
};

export const Prefix: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    label: 'Label',
    placeholder: 'Select',
    prefix: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5213 0.922113C12.8217 0.66084 12.0463 1.01201 11.7851 1.71155L10.799 4.34114C10.7484 2.39704 9.15829 0.835022 7.20296 0.835022C5.21672 0.835022 3.60694 2.4448 3.60694 4.43104C3.60694 4.49285 3.60975 4.55185 3.61256 4.61365L5.45271 4.84402C5.4218 4.71198 5.40495 4.57432 5.40495 4.43104C5.40495 3.43933 6.21124 2.63303 7.20296 2.63303C8.19467 2.63303 9.00097 3.43933 9.00097 4.43104C9.00097 4.73165 8.92792 5.01259 8.79869 5.26262L9.00097 5.28791L13.5353 4.72041L14.3079 2.65832C14.5692 1.96159 14.2152 1.18339 13.5185 0.922113H13.5213Z"
          fill="#4E4F55"
        />
      </svg>
    ),
  },
};

export const PrefixWithError: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option One', value: 'option1' },
    label: 'Label',
    placeholder: 'Select',
    prefix: (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5213 0.922113C12.8217 0.66084 12.0463 1.01201 11.7851 1.71155L10.799 4.34114C10.7484 2.39704 9.15829 0.835022 7.20296 0.835022C5.21672 0.835022 3.60694 2.4448 3.60694 4.43104C3.60694 4.49285 3.60975 4.55185 3.61256 4.61365L5.45271 4.84402C5.4218 4.71198 5.40495 4.57432 5.40495 4.43104C5.40495 3.43933 6.21124 2.63303 7.20296 2.63303C8.19467 2.63303 9.00097 3.43933 9.00097 4.43104C9.00097 4.73165 8.92792 5.01259 8.79869 5.26262L9.00097 5.28791L13.5353 4.72041L14.3079 2.65832C14.5692 1.96159 14.2152 1.18339 13.5185 0.922113H13.5213Z"
          fill="#4E4F55"
        />
      </svg>
    ),
    error: 'Error',
  },
};

const OptionComponent = (option: MLSelectOption) => (
  <div className="flex items-center gap-2 min-w-0">
    <span className="truncate">{option.label}</span>
    {option.desc ? (
      <span className="text-sm text-muted-foreground truncate">{option.desc}</span>
    ) : null}
  </div>
);

const OptionWithIcon = (option: MLSelectOption) => (
  <div className="flex items-center gap-2 min-w-0">
    <svg
      className="w-4 h-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <span className="truncate">{option.label}</span>
  </div>
);

export const CustomRender: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1', render: OptionComponent },
      { label: 'Option Two', value: 'option2', render: OptionComponent },
      { label: 'Option Three', value: 'option3', render: OptionComponent },
    ],
    defaultValue: { label: 'Option One', value: 'option1', render: OptionComponent },
  },
};

export const CustomRenderWithIcon: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1', render: OptionWithIcon },
      { label: 'Option Two', value: 'option2', render: OptionWithIcon },
      { label: 'Option Three', value: 'option3', render: OptionWithIcon },
    ],
    defaultValue: { label: 'Option One', value: 'option1', render: OptionWithIcon },
    fullwidth: true,
  },
};

export const CustomMenuClassNames: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1', render: OptionComponent },
      { label: 'Option Two', value: 'option2', render: OptionComponent },
      { label: 'Option Three', value: 'option3', render: OptionComponent },
    ],
    defaultValue: { label: 'Option One', value: 'option1', render: OptionComponent },
    // Tailwind important modifier must be prefix `!`
    menuClassNames: '!w-[240px]',
    selectClassNames: 'w-[160px]',
  },
};

export const WithEmptyValue: Story = {
  args: {
    options: [
      { label: 'None', value: '' },
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'None', value: '' },
    label: 'Select an option',
    placeholder: 'Choose...',
    fullwidth: true,
  },
};

export const InteractiveWithEmptyValue = () => {
  const [selectedValue, setSelectedValue] = useState<MLSelectOption<string> | null>({
    label: 'None',
    value: '',
  });

  const options = [
    { label: 'None', value: '' },
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ];

  return (
    <div className="p-4">
      <MLSelect
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        label="Select an option (Controlled)"
        placeholder="Choose..."
        fullwidth
      />
      <div className="mt-4 p-2">
        <strong>Selected Value:</strong> {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export const UncontrolledWithEmptyValue = () => {
  const options = [
    { label: 'None', value: '' },
    { label: 'Option One', value: 'option1' },
    { label: 'Option Two', value: 'option2' },
    { label: 'Option Three', value: 'option3' },
  ];

  return (
    <div className="p-4">
      <MLSelect
        options={options}
        label="Select an option (Uncontrolled)"
        placeholder="Choose..."
        fullwidth
      />
    </div>
  );
};

export const UncontrolledWithDefaultValue: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option1' },
      { label: 'Option Two', value: 'option2' },
      { label: 'Option Three', value: 'option3' },
    ],
    defaultValue: { label: 'Option Two', value: 'option2' },
    label: 'Uncontrolled Select',
  },
};
