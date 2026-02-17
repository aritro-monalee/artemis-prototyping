import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLToggleGroup, type MLToggleGroupProps } from './index';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof MLToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: MLToggleGroup,
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
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<MLToggleGroupProps>;

// ============================================
// Text Formatting - Default Variant (Icons)
// ============================================
export const TextFormatting = () => {
  const [value, setValue] = useState<string[]>(['bold']);

  return (
    <div className="p-6">
      <p className="text-sm text-muted-foreground mb-4">
        Default variant - icons with gap, no container border
      </p>
      <MLToggleGroup
        type="multiple"
        variant="default"
        options={[
          { value: 'bold', label: <Bold className="size-4" /> },
          { value: 'italic', label: <Italic className="size-4" /> },
          { value: 'underline', label: <Underline className="size-4" /> },
        ]}
        value={value}
        onChange={(newValue) => setValue(newValue as string[])}
      />
    </div>
  );
};

// ============================================
// Filter Toggles - Outline Variant
// ============================================
export const FilterToggles = () => {
  const [value, setValue] = useState<string>('all');

  return (
    <div className="p-6">
      <p className="text-sm text-muted-foreground mb-4">
        Outline variant - border around the entire group
      </p>
      <MLToggleGroup
        type="single"
        variant="outline"
        options={[
          { value: 'all', label: 'All' },
          { value: 'missed', label: 'Missed' },
        ]}
        value={value}
        onChange={(newValue) => setValue(newValue as string)}
      />
    </div>
  );
};

// ============================================
// Date Range Toggles
// ============================================
export const DateRangeToggles = () => {
  const [value1, setValue1] = useState<string>('24h');
  const [value2, setValue2] = useState<string>('24h');

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Outline variant with container border</p>
        <MLToggleGroup
          type="single"
          variant="outline"
          size="sm"
          options={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
          ]}
          value={value1}
          onChange={(newValue) => setValue1(newValue as string)}
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Ghost variant - no border</p>
        <MLToggleGroup
          type="single"
          variant="ghost"
          size="sm"
          options={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
          ]}
          value={value2}
          onChange={(newValue) => setValue2(newValue as string)}
        />
      </div>
    </div>
  );
};

// ============================================
// Default (Single Selection)
// ============================================
export const Default: Story = {
  args: {
    type: 'single',
    variant: 'outline',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option1',
  },
  render: (args) => {
    const [value, setValue] = useState<string | string[]>(
      args.type === 'multiple' ? [] : (args.value as string)
    );

    return (
      <div className="p-6">
        <MLToggleGroup {...args} value={value} onChange={(newValue) => setValue(newValue)} />
      </div>
    );
  },
};

// ============================================
// All Variants (Figma Design Match)
// ============================================
export const AllVariants = () => {
  const [value1, setValue1] = useState<string[]>(['bold']);
  const [value2, setValue2] = useState<string>('all');
  const [value3, setValue3] = useState<string>('24h');
  const [value4, setValue4] = useState<string>('24h');

  return (
    <div className="space-y-16">
      {/* Light Mode */}
      <div className="p-8 bg-[#fefbf7] rounded-2xl border border-[#d7cfc5] space-y-16">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Light Mode</p>

        <div className="flex flex-col items-center gap-16">
          {/* Icon toggles - default variant */}
          <MLToggleGroup
            type="multiple"
            variant="default"
            options={[
              { value: 'bold', label: <Bold className="size-4" /> },
              { value: 'italic', label: <Italic className="size-4" /> },
              { value: 'underline', label: <Underline className="size-4" /> },
            ]}
            value={value1}
            onChange={(newValue) => setValue1(newValue as string[])}
          />

          {/* Filter toggles - outline variant */}
          <MLToggleGroup
            type="single"
            variant="outline"
            options={[
              { value: 'all', label: 'All' },
              { value: 'missed', label: 'Missed' },
            ]}
            value={value2}
            onChange={(newValue) => setValue2(newValue as string)}
          />

          {/* Date range toggles - outline variant, small */}
          <MLToggleGroup
            type="single"
            variant="outline"
            size="sm"
            options={[
              { value: '24h', label: 'Last 24 hours' },
              { value: '7d', label: 'Last 7 days' },
            ]}
            value={value3}
            onChange={(newValue) => setValue3(newValue as string)}
          />

          {/* Date range toggles - ghost variant, small (no borders) */}
          <MLToggleGroup
            type="single"
            variant="ghost"
            size="sm"
            options={[
              { value: '24h', label: 'Last 24 hours' },
              { value: '7d', label: 'Last 7 days' },
            ]}
            value={value4}
            onChange={(newValue) => setValue4(newValue as string)}
          />
        </div>
      </div>

      {/* Dark Mode */}
      <DarkModeAllVariants />
    </div>
  );
};

const DarkModeAllVariants = () => {
  const [value1, setValue1] = useState<string[]>(['bold']);
  const [value2, setValue2] = useState<string>('all');
  const [value3, setValue3] = useState<string>('24h');
  const [value4, setValue4] = useState<string>('24h');

  return (
    <div className="p-8 bg-[#0a0a0a] rounded-xl border border-white/10 space-y-16 dark">
      <p className="text-xs text-white/60 uppercase tracking-wider">Dark Mode</p>

      <div className="flex flex-col items-center gap-16">
        {/* Icon toggles - default variant */}
        <MLToggleGroup
          type="multiple"
          variant="default"
          options={[
            { value: 'bold', label: <Bold className="size-4" /> },
            { value: 'italic', label: <Italic className="size-4" /> },
            { value: 'underline', label: <Underline className="size-4" /> },
          ]}
          value={value1}
          onChange={(newValue) => setValue1(newValue as string[])}
        />

        {/* Filter toggles - outline variant */}
        <MLToggleGroup
          type="single"
          variant="outline"
          options={[
            { value: 'all', label: 'All' },
            { value: 'missed', label: 'Missed' },
          ]}
          value={value2}
          onChange={(newValue) => setValue2(newValue as string)}
        />

        {/* Date range toggles - outline variant, small */}
        <MLToggleGroup
          type="single"
          variant="outline"
          size="sm"
          options={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
          ]}
          value={value3}
          onChange={(newValue) => setValue3(newValue as string)}
        />

        {/* Date range toggles - ghost variant, small (no borders) */}
        <MLToggleGroup
          type="single"
          variant="ghost"
          size="sm"
          options={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
          ]}
          value={value4}
          onChange={(newValue) => setValue4(newValue as string)}
        />
      </div>
    </div>
  );
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode = () => {
  const [value1, setValue1] = useState<string[]>(['bold']);
  const [value2, setValue2] = useState<string>('all');
  const [value3, setValue3] = useState<string>('24h');

  return (
    <div className="p-6 bg-[#0a0a0a] rounded-lg space-y-8 dark w-[600px]">
      <div>
        <p className="text-sm text-white/60 mb-2">Default variant (icons)</p>
        <MLToggleGroup
          type="multiple"
          variant="default"
          options={[
            { value: 'bold', label: <Bold className="size-4" /> },
            { value: 'italic', label: <Italic className="size-4" /> },
            { value: 'underline', label: <Underline className="size-4" /> },
          ]}
          value={value1}
          onChange={(newValue) => setValue1(newValue as string[])}
        />
      </div>

      <div>
        <p className="text-sm text-white/60 mb-2">Outline variant</p>
        <MLToggleGroup
          type="single"
          variant="outline"
          options={[
            { value: 'all', label: 'All' },
            { value: 'missed', label: 'Missed' },
          ]}
          value={value2}
          onChange={(newValue) => setValue2(newValue as string)}
        />
      </div>

      <div>
        <p className="text-sm text-white/60 mb-2">Ghost variant (no border)</p>
        <MLToggleGroup
          type="single"
          variant="ghost"
          size="sm"
          options={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
          ]}
          value={value3}
          onChange={(newValue) => setValue3(newValue as string)}
        />
      </div>
    </div>
  );
};
