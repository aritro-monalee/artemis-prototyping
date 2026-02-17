import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { MLCombobox } from './MLCombobox';
import { MLComboboxOption } from './types';

const frameworks: MLComboboxOption<string>[] = [
  {
    value: 'next.js',
    label: 'Next.js',
    desc: 'The React Framework for Production',
  },
  {
    value: 'react',
    label: 'React',
    desc: 'A JavaScript library for building user interfaces',
  },
  {
    value: 'vue',
    label: 'Vue.js',
    desc: 'The Progressive JavaScript Framework',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    desc: 'Cybernetically enhanced web apps',
    recommended: true,
  },
  {
    value: 'angular',
    label: 'Angular',
    desc: 'Platform for building mobile and desktop web applications',
  },
];

const meta: Meta<typeof MLCombobox<string>> = {
  title: 'Components/Combobox',
  component: MLCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['default', 'black'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    fullwidth: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<MLComboboxOption<string> | null>(null);

    return (
      <MLCombobox
        options={frameworks}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
  },
};

export const Required: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    error: 'Please select a framework',
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    readonly: true,
    defaultValue: frameworks[1], // React
  },
};

export const FullWidth: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    fullwidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const FullWidthInteractive: Story = {
  render: () => {
    const [value, setValue] = useState<MLComboboxOption<string> | null>(null);

    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <MLCombobox
          options={frameworks}
          label="Framework (Very Wide)"
          placeholder="Select framework..."
          searchPlaceholder="Search frameworks..."
          value={value}
          onChange={setValue}
          fullwidth={true}
        />
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithPrefix: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    prefix: '🚀',
  },
};

export const BlackColor: Story = {
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    color: 'black',
  },
};

export const CustomNoResults: Story = {
  args: {
    options: [],
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    noResultsText: 'No frameworks found.',
  },
};

export const ControlledSearchTest: Story = {
  render: () => {
    const [value, setValue] = useState<MLComboboxOption<string> | null>(null);

    const testOptions: MLComboboxOption<string>[] = [
      {
        value: 'id_001',
        label: 'Apple Framework',
        desc: 'A fruit-based framework',
      },
      {
        value: 'id_002',
        label: 'Banana Library',
        desc: 'A yellow development tool',
      },
      {
        value: 'id_003',
        label: 'Cherry Component',
        desc: 'A red UI library',
        recommended: true,
      },
      {
        value: 'id_004',
        label: 'Date Picker',
        desc: 'Calendar integration framework',
      },
      {
        value: 'very_long_technical_id_005',
        label: 'Elderberry',
        desc: 'Dark purple framework',
      },
    ];

    return (
      <div style={{ width: '400px' }}>
        <MLCombobox
          options={testOptions}
          label="Test Search (Type 'Apple', 'Banana', etc.)"
          placeholder="Search by label name..."
          searchPlaceholder="Type to search by label..."
          value={value}
          onChange={setValue}
          fullwidth={true}
        />
        {value && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              background: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <strong>Selected:</strong> {value.label} (ID: {value.value})
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
