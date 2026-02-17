import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLRadioGroup, type MLRadioGroupProps } from './index';
import { MLRadio } from '../MLRadio';

const meta: Meta<typeof MLRadioGroup> = {
  title: 'Components/RadioGroup',
  component: MLRadioGroup,
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
    color: {
      control: 'select',
      options: ['default', 'black'],
    },
  },
};

export default meta;
type Story = StoryObj<MLRadioGroupProps>;

// ============================================
// Basic Stories (Figma Design)
// ============================================

export const SingleRadioUnchecked: Story = {
  render: () => (
    <MLRadioGroup defaultValue="">
      <MLRadio value="radio" label="Radio Button" />
    </MLRadioGroup>
  ),
};

export const SingleRadioChecked: Story = {
  render: () => (
    <MLRadioGroup defaultValue="radio">
      <MLRadio value="radio" label="Radio Button" />
    </MLRadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <MLRadioGroup defaultValue="">
      <MLRadio value="radio" label="Radio Button Text" description="This is a radio description." />
    </MLRadioGroup>
  ),
};

export const WithDescriptionChecked: Story = {
  render: () => (
    <MLRadioGroup defaultValue="radio">
      <MLRadio value="radio" label="Radio Button Text" description="This is a radio description." />
    </MLRadioGroup>
  ),
};

// ============================================
// Radio Group (Multiple Options)
// ============================================

export const Default: Story = {
  args: {
    defaultValue: 'comfortable',
  },
  render: (args) => (
    <MLRadioGroup {...args}>
      <MLRadio value="default" label="Default" />
      <MLRadio value="comfortable" label="Comfortable" />
      <MLRadio value="compact" label="Compact" />
    </MLRadioGroup>
  ),
};

export const WithDescriptions: Story = {
  args: {
    defaultValue: 'option1',
  },
  render: (args) => (
    <MLRadioGroup {...args}>
      <MLRadio
        value="option1"
        label="Default Setting"
        description="Use the default configuration for most users."
      />
      <MLRadio
        value="option2"
        label="Custom Setting"
        description="Customize the configuration to your needs."
      />
      <MLRadio
        value="option3"
        label="Advanced Setting"
        description="Advanced options for power users."
      />
    </MLRadioGroup>
  ),
};

// ============================================
// Box Variant (Card Style)
// ============================================

export const BoxVariant: Story = {
  render: () => (
    <MLRadioGroup defaultValue="starter" className="w-[360px]">
      <MLRadio
        value="starter"
        variant="box"
        label="Starter Plan"
        description="Perfect for small businesses getting started with our platform"
      />
      <MLRadio
        value="pro"
        variant="box"
        label="Pro Plan"
        description="Advanced features for growing businesses with higher demands"
      />
    </MLRadioGroup>
  ),
};

export const BoxVariantThreeOptions: Story = {
  render: () => (
    <MLRadioGroup defaultValue="monthly" className="w-[360px]">
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
    </MLRadioGroup>
  ),
};

// ============================================
// Color Variants
// ============================================

export const BlackVariant: Story = {
  args: {
    color: 'black',
    defaultValue: 'option2',
  },
  render: (args) => (
    <MLRadioGroup {...args}>
      <MLRadio value="option1" label="Option One" color="black" />
      <MLRadio value="option2" label="Option Two" color="black" />
      <MLRadio value="option3" label="Option Three" color="black" />
    </MLRadioGroup>
  ),
};

export const BlackBoxVariant: Story = {
  render: () => (
    <MLRadioGroup defaultValue="basic" className="w-[360px]" color="black">
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
    </MLRadioGroup>
  ),
};

// ============================================
// Controlled Example
// ============================================

export const Controlled = () => {
  const [value, setValue] = React.useState('comfortable');

  return (
    <div className="flex flex-col gap-4">
      <MLRadioGroup value={value} onValueChange={setValue}>
        <MLRadio value="default" label="Default" />
        <MLRadio value="comfortable" label="Comfortable" />
        <MLRadio value="compact" label="Compact" />
      </MLRadioGroup>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium">{value}</span>
      </p>
    </div>
  );
};

// ============================================
// Form Example
// ============================================

export const FormExample = () => {
  const [plan, setPlan] = React.useState('starter');

  return (
    <div className="flex flex-col gap-6 w-[400px] p-6 border border-base-border rounded-lg">
      <div>
        <h3 className="text-lg font-semibold text-base-foreground">Choose your plan</h3>
        <p className="text-sm text-muted-foreground">Select the plan that works best for you.</p>
      </div>

      <MLRadioGroup value={plan} onValueChange={setPlan}>
        <MLRadio
          value="starter"
          variant="box"
          label="Starter Plan"
          description="Perfect for small businesses getting started with our platform"
        />
        <MLRadio
          value="pro"
          variant="box"
          label="Pro Plan"
          description="Advanced features for growing businesses with higher demands"
        />
        <MLRadio
          value="enterprise"
          variant="box"
          label="Enterprise Plan"
          description="Custom solutions for large organizations"
        />
      </MLRadioGroup>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90">
          Continue with {plan.charAt(0).toUpperCase() + plan.slice(1)}
        </button>
      </div>
    </div>
  );
};

// ============================================
// All Variants Overview
// ============================================

export const AllVariants = () => (
  <div className="flex flex-col gap-16 items-center">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Radio Button (Unchecked)</h3>
      <MLRadioGroup defaultValue="">
        <MLRadio value="radio" label="Radio Button" />
      </MLRadioGroup>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Radio Button (Checked)</h3>
      <MLRadioGroup defaultValue="radio">
        <MLRadio value="radio" label="Radio Button" />
      </MLRadioGroup>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">With Description (Unchecked)</h3>
      <MLRadioGroup defaultValue="">
        <MLRadio
          value="radio"
          label="Radio Button Text"
          description="This is a radio description."
        />
      </MLRadioGroup>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">With Description (Checked)</h3>
      <MLRadioGroup defaultValue="radio">
        <MLRadio
          value="radio"
          label="Radio Button Text"
          description="This is a radio description."
        />
      </MLRadioGroup>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Radio Group</h3>
      <MLRadioGroup defaultValue="comfortable">
        <MLRadio value="default" label="Default" />
        <MLRadio value="comfortable" label="Comfortable" />
        <MLRadio value="compact" label="Compact" />
      </MLRadioGroup>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Box Variant</h3>
      <MLRadioGroup defaultValue="starter" className="w-[360px]">
        <MLRadio
          value="starter"
          variant="box"
          label="Starter Plan"
          description="Perfect for small businesses getting started with our platform"
        />
        <MLRadio
          value="pro"
          variant="box"
          label="Pro Plan"
          description="Advanced features for growing businesses with higher demands"
        />
      </MLRadioGroup>
    </div>
  </div>
);
