'use client';

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MLCheckBox, type MLCheckBoxProps } from './index';

const meta: Meta<typeof MLCheckBox> = {
  title: 'Components/Checkbox',
  component: MLCheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: ['default', 'black'],
    },
    onCheckedChange: { action: 'checked changed' },
  },
};

export default meta;
type Story = StoryObj<MLCheckBoxProps>;

export const Default: Story = {
  args: {
    label: 'Checkbox Text',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Checkbox Text',
    description: 'This is a checkbox description.',
  },
};

export const WithDescriptionChecked: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
    description: 'This is a checkbox description.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Checkbox Text',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
    disabled: true,
  },
};

export const DisabledWithDescription: Story = {
  args: {
    label: 'Checkbox Text',
    description: 'This is a checkbox description.',
    disabled: true,
  },
};

export const DisabledCheckedWithDescription: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
    description: 'This is a checkbox description.',
    disabled: true,
  },
};

export const Standalone: Story = {
  args: {},
};

export const StandaloneChecked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const BlackColor: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
    color: 'black',
  },
};

export const BlackColorWithDescription: Story = {
  args: {
    defaultChecked: true,
    label: 'Checkbox Text',
    description: 'This is a checkbox description.',
    color: 'black',
  },
};

export const WithMarkdownLabel: Story = {
  args: {
    defaultChecked: true,
    markdown: true,
    label: '**Accept terms and conditions**',
    description:
      'You agree to our [Terms of Service](https://www.google.com) and [Privacy Policy](https://www.google.com).',
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <MLCheckBox
          label="Controlled checkbox"
          description="This checkbox is controlled by state."
          checked={checked}
          onCheckedChange={(val) => setChecked(val === true)}
        />
        <p className="text-sm text-base-muted-foreground">Checked: {checked ? 'Yes' : 'No'}</p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-x-8 gap-y-6">
      {/* Row 1: With Description - Default / Focus / Disabled */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - Default</span>
        <MLCheckBox
          defaultChecked
          label="Checkbox Text"
          description="This is a checkbox description."
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - Focus</span>
        <MLCheckBox
          defaultChecked
          label="Checkbox Text"
          description="This is a checkbox description."
          className="[&>button]:ring-2 [&>button]:ring-base-ring [&>button]:ring-offset-2"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - Disabled</span>
        <MLCheckBox
          defaultChecked
          label="Checkbox Text"
          description="This is a checkbox description."
          disabled
        />
      </div>

      {/* Row 2: With Description - Inactive */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - Default</span>
        <MLCheckBox label="Checkbox Text" description="This is a checkbox description." />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - Focus</span>
        <MLCheckBox
          label="Checkbox Text"
          description="This is a checkbox description."
          className="[&>button]:ring-2 [&>button]:ring-base-ring [&>button]:ring-offset-2"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - Disabled</span>
        <MLCheckBox label="Checkbox Text" description="This is a checkbox description." disabled />
      </div>

      {/* Row 3: Without Description - Active */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - No Description</span>
        <MLCheckBox defaultChecked label="Checkbox Text" />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - Focus</span>
        <MLCheckBox
          defaultChecked
          label="Checkbox Text"
          className="[&>button]:ring-2 [&>button]:ring-base-ring [&>button]:ring-offset-2"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Active - Disabled</span>
        <MLCheckBox defaultChecked label="Checkbox Text" disabled />
      </div>

      {/* Row 4: Without Description - Inactive */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - No Description</span>
        <MLCheckBox label="Checkbox Text" />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - Focus</span>
        <MLCheckBox
          label="Checkbox Text"
          className="[&>button]:ring-2 [&>button]:ring-base-ring [&>button]:ring-offset-2"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-base-muted-foreground">Inactive - Disabled</span>
        <MLCheckBox label="Checkbox Text" disabled />
      </div>
    </div>
  ),
};
