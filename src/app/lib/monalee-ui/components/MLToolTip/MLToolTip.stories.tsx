import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLToolTip, type MLToolTipProps } from './index';
import { MLButton } from '../MLButton';

const meta: Meta<typeof MLToolTip> = {
  title: 'Components/Tooltip',
  component: MLToolTip,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    tooltipContent: { control: 'text' },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

export default meta;
type Story = StoryObj<MLToolTipProps>;

// ============================================
// Default (Info Icon)
// ============================================
export const Default: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'top',
  },
};

// ============================================
// Top Position
// ============================================
export const Top: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'top',
    children: (
      <MLButton variant="outline" size="default">
        Top
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Right Position
// ============================================
export const Right: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'right',
    children: (
      <MLButton variant="outline" size="default">
        Right
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Bottom Position
// ============================================
export const Bottom: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'bottom',
    children: (
      <MLButton variant="outline" size="default">
        Bottom
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Left Position
// ============================================
export const Left: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'left',
    children: (
      <MLButton variant="outline" size="default">
        Left
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Long Content
// ============================================
export const LongContent: Story = {
  args: {
    tooltipContent:
      "You can add tooltips using absolute positioning or Figma's hover interactions, as shown below.",
    side: 'top',
    children: (
      <MLButton variant="outline" size="default">
        Hover for long tooltip
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode: Story = {
  args: {
    tooltipContent: 'You can add tooltips using absolute positioning',
    side: 'top',
    children: (
      <MLButton variant="outline" size="default">
        Top
      </MLButton>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-32 bg-[#0a0a0a] dark rounded-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ============================================
// All Positions
// ============================================
export const AllPositions = () => {
  return (
    <div className="flex flex-col items-center gap-20 p-16">
      {/* Light Mode */}
      <div className="p-16 bg-background rounded-2xl border border-border space-y-20">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-8">Light Mode</p>

        <div className="flex flex-col items-center gap-20">
          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="top">
            <MLButton variant="outline" size="default">
              Top
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="right">
            <MLButton variant="outline" size="default">
              Right
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="bottom">
            <MLButton variant="outline" size="default">
              Bottom
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="left">
            <MLButton variant="outline" size="default">
              Left
            </MLButton>
          </MLToolTip>

          <MLToolTip
            tooltipContent="Interaction state (open) preview"
            side="top"
            open
            onOpenChange={() => {}}
          >
            <MLButton variant="outline" size="default">
              Interaction
            </MLButton>
          </MLToolTip>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="p-16 bg-[#0a0a0a] rounded-xl border border-white/10 space-y-20 dark">
        <p className="text-xs text-white/60 uppercase tracking-wider mb-8">Dark Mode</p>

        <div className="flex flex-col items-center gap-20">
          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="top">
            <MLButton variant="outline" size="default">
              Top
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="right">
            <MLButton variant="outline" size="default">
              Right
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="bottom">
            <MLButton variant="outline" size="default">
              Bottom
            </MLButton>
          </MLToolTip>

          <MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="left">
            <MLButton variant="outline" size="default">
              Left
            </MLButton>
          </MLToolTip>

          <MLToolTip
            tooltipContent="Interaction state (open) preview"
            side="top"
            open
            onOpenChange={() => {}}
          >
            <MLButton variant="outline" size="default">
              Interaction
            </MLButton>
          </MLToolTip>
        </div>
      </div>
    </div>
  );
};
