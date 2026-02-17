import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLProgress as Progress } from './index';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
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
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive'],
      description: 'Color variant',
    },
    showValue: {
      control: 'boolean',
      description: 'Show the progress percentage as text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// ============================================
// Basic Stories (Figma Design)
// ============================================

export const Default: Story = {
  args: {
    value: 100,
    className: 'w-[400px]',
  },
};

export const SeventyFivePercent: Story = {
  args: {
    value: 75,
    className: 'w-[400px]',
  },
};

export const FiftyPercent: Story = {
  args: {
    value: 50,
    className: 'w-[400px]',
  },
};

export const TwentyFivePercent: Story = {
  args: {
    value: 25,
    className: 'w-[400px]',
  },
};

export const ZeroPercent: Story = {
  args: {
    value: 0,
    className: 'w-[400px]',
  },
};

// ============================================
// All Percentages (Figma Design Match)
// ============================================

export const AllPercentages: Story = {
  render: () => (
    <div className="flex flex-col gap-16 w-[400px]">
      <Progress value={100} />
      <Progress value={75} />
      <Progress value={50} />
      <Progress value={25} />
      <Progress value={0} />
    </div>
  ),
};

// ============================================
// Size Variants
// ============================================

export const SizeSmall: Story = {
  args: {
    value: 60,
    size: 'sm',
    className: 'w-[400px]',
  },
};

export const SizeMedium: Story = {
  args: {
    value: 60,
    size: 'md',
    className: 'w-[400px]',
  },
};

export const SizeLarge: Story = {
  args: {
    value: 60,
    size: 'lg',
    className: 'w-[400px]',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-12">Small</span>
        <Progress value={60} size="sm" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-12">Medium</span>
        <Progress value={60} size="md" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-12">Large</span>
        <Progress value={60} size="lg" className="flex-1" />
      </div>
    </div>
  ),
};

// ============================================
// Color Variants
// ============================================

export const VariantDefault: Story = {
  args: {
    value: 60,
    variant: 'default',
    className: 'w-[400px]',
  },
};

export const VariantSuccess: Story = {
  args: {
    value: 60,
    variant: 'success',
    className: 'w-[400px]',
  },
};

export const VariantWarning: Story = {
  args: {
    value: 60,
    variant: 'warning',
    className: 'w-[400px]',
  },
};

export const VariantDestructive: Story = {
  args: {
    value: 60,
    variant: 'destructive',
    className: 'w-[400px]',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Default</span>
        <Progress value={60} variant="default" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Success</span>
        <Progress value={60} variant="success" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Warning</span>
        <Progress value={60} variant="warning" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Destructive</span>
        <Progress value={60} variant="destructive" className="flex-1" />
      </div>
    </div>
  ),
};

// ============================================
// With Value Display
// ============================================

export const WithValue: Story = {
  args: {
    value: 65,
    showValue: true,
    className: 'w-[400px]',
  },
};

// ============================================
// Animated Example
// ============================================

export const Animated = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <Progress value={progress} showValue />
      <p className="text-sm text-muted-foreground text-center">Auto-incrementing progress</p>
    </div>
  );
};

// ============================================
// Loading Example
// ============================================

export const LoadingStates = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isLoading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
    if (progress >= 100) {
      setIsLoading(false);
    }
  }, [isLoading, progress]);

  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <Progress value={progress} showValue />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{isLoading ? 'Loading...' : 'Complete!'}</span>
        <button
          className="text-primary hover:underline"
          onClick={() => {
            setProgress(0);
            setIsLoading(true);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

// ============================================
// Multiple Progress Bars
// ============================================

export const MultipleProgressBars: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Storage</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Bandwidth</span>
          <span className="text-muted-foreground">45%</span>
        </div>
        <Progress value={45} variant="success" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">CPU Usage</span>
          <span className="text-muted-foreground">92%</span>
        </div>
        <Progress value={92} variant="destructive" />
      </div>
    </div>
  ),
};
