import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLSlider as Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ============================================
// Default (Single Value)
// ============================================

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// Range Slider
// ============================================

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// Vertical Slider
// ============================================

export const Vertical: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="h-[200px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// Vertical Range
// ============================================

export const VerticalRange: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="h-[200px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// With Labels
// ============================================

export const WithLabels: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    showLabels: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// Custom Step
// ============================================

export const CustomStep: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    disabled: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Slider {...args} />
    </div>
  ),
};

// ============================================
// All Variants (Figma Design)
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16 items-center p-8 bg-background rounded-2xl border border-border">
      {/* Horizontal Single */}
      <div className="w-[400px]">
        <p className="text-sm text-muted-foreground mb-2">Single Value</p>
        <Slider defaultValue={[60]} max={100} />
      </div>

      {/* Horizontal Range */}
      <div className="w-[400px]">
        <p className="text-sm text-muted-foreground mb-2">Range</p>
        <Slider defaultValue={[25, 75]} max={100} />
      </div>

      {/* Vertical sliders */}
      <div className="flex gap-16 items-start">
        <div className="h-[200px] flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Vertical</p>
          <Slider orientation="vertical" defaultValue={[50]} max={100} />
        </div>

        <div className="h-[200px] flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Vertical Range</p>
          <Slider orientation="vertical" defaultValue={[25, 75]} max={100} />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Controlled Example
// ============================================

function ControlledSlider() {
  const [value, setValue] = React.useState([50]);
  return (
    <div className="w-[400px] flex flex-col gap-4">
      <Slider value={value} onValueChange={setValue} max={100} />
      <p className="text-sm text-muted-foreground">
        Value: <span className="font-mono">{value[0]}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSlider />,
};

// ============================================
// Price Range Example
// ============================================

function PriceRangeSlider() {
  const [value, setValue] = React.useState([100, 500]);
  return (
    <div className="w-[400px] flex flex-col gap-4">
      <label className="text-sm font-medium">Price Range</label>
      <Slider value={value} onValueChange={setValue} min={0} max={1000} step={10} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}

export const PriceRange: Story = {
  render: () => <PriceRangeSlider />,
};

// ============================================
// Volume Control Example
// ============================================

function VolumeControlSlider() {
  const [volume, setVolume] = React.useState([75]);
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">🔈</span>
      <div className="w-[200px]">
        <Slider value={volume} onValueChange={setVolume} max={100} />
      </div>
      <span className="text-sm">🔊</span>
      <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
    </div>
  );
}

export const VolumeControl: Story = {
  render: () => <VolumeControlSlider />,
};
