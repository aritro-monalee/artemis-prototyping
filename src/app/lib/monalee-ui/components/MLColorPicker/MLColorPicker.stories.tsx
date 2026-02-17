import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLColorPicker as ColorPicker } from './index';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
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
    value: {
      control: 'color',
      description: 'The current color value',
    },
    label: {
      control: 'text',
      description: 'Label for the color picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the color picker is disabled',
    },
    showOpacity: {
      control: 'boolean',
      description: 'Show opacity slider',
    },
    defaultFormat: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: 'Default color format to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  args: {
    label: 'Select Color',
    value: '#4F46E5',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Brand Color',
    value: '#4F46E5',
  },
};

export const NoLabel: Story = {
  args: {
    value: '#10B981',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select Color',
    value: '#4F46E5',
    disabled: true,
  },
};

// ============================================
// Different Colors
// ============================================

export const RedColor: Story = {
  args: {
    label: 'Error Color',
    value: '#EF4444',
  },
};

export const GreenColor: Story = {
  args: {
    label: 'Success Color',
    value: '#22C55E',
  },
};

export const BlueColor: Story = {
  args: {
    label: 'Info Color',
    value: '#3B82F6',
  },
};

export const YellowColor: Story = {
  args: {
    label: 'Warning Color',
    value: '#F59E0B',
  },
};

// ============================================
// Format Options
// ============================================

export const HexFormat: Story = {
  args: {
    label: 'Hex Format',
    value: '#4F46E5',
    defaultFormat: 'hex',
  },
};

export const RGBFormat: Story = {
  args: {
    label: 'RGB Format',
    value: '#4F46E5',
    defaultFormat: 'rgb',
  },
};

export const HSLFormat: Story = {
  args: {
    label: 'HSL Format',
    value: '#4F46E5',
    defaultFormat: 'hsl',
  },
};

// ============================================
// Without Opacity
// ============================================

export const NoOpacity: Story = {
  args: {
    label: 'Select Color',
    value: '#4F46E5',
    showOpacity: false,
  },
};

// ============================================
// Controlled Example
// ============================================

export const Controlled = () => {
  const [color, setColor] = React.useState('#4F46E5');

  return (
    <div className="flex flex-col gap-4 items-center">
      <ColorPicker label="Select Color" value={color} onChange={setColor} />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Selected:</span>
        <div
          className="size-8 rounded-md border border-base-border"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-mono">{color}</span>
      </div>
    </div>
  );
};

// ============================================
// Form Example
// ============================================

export const FormExample = () => {
  const [primaryColor, setPrimaryColor] = React.useState('#4F46E5');
  const [secondaryColor, setSecondaryColor] = React.useState('#10B981');
  const [accentColor, setAccentColor] = React.useState('#F59E0B');

  return (
    <div className="flex flex-col gap-6 p-6 border border-base-border rounded-lg bg-base-background">
      <h3 className="text-lg font-semibold text-base-foreground">Theme Colors</h3>
      <div className="flex flex-col gap-4">
        <ColorPicker label="Primary Color" value={primaryColor} onChange={setPrimaryColor} />
        <ColorPicker label="Secondary Color" value={secondaryColor} onChange={setSecondaryColor} />
        <ColorPicker label="Accent Color" value={accentColor} onChange={setAccentColor} />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-12 rounded-md" style={{ backgroundColor: primaryColor }} />
        <div className="flex-1 h-12 rounded-md" style={{ backgroundColor: secondaryColor }} />
        <div className="flex-1 h-12 rounded-md" style={{ backgroundColor: accentColor }} />
      </div>
    </div>
  );
};

// ============================================
// Initially Open
// ============================================

export const InitiallyOpen: Story = {
  args: {
    label: 'Select Color',
    value: '#4F46E5',
    defaultOpen: true,
  },
};
