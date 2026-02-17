import React, { forwardRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Download,
  Mail,
  ArrowRight,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Settings,
} from 'lucide-react';
import { MLButton, type MLButtonProps } from './index';

// Mock Link component to demonstrate Next.js usage
const MockLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ children, ...props }, ref) => (
  <a ref={ref} {...props}>
    {children}
  </a>
));

MockLink.displayName = 'MockLink';

const meta: Meta<typeof MLButton> = {
  title: 'Components/Button',
  component: MLButton,
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
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
    },
    fullwidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<MLButtonProps>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <MLButton variant="default">Default</MLButton>
      <MLButton variant="secondary">Secondary</MLButton>
      <MLButton variant="destructive">Destructive</MLButton>
      <MLButton variant="outline">Outline</MLButton>
      <MLButton variant="ghost">Ghost</MLButton>
      <MLButton variant="link">Link</MLButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <MLButton size="sm">Small</MLButton>
      <MLButton size="default">Default</MLButton>
      <MLButton size="lg">Large</MLButton>
      <MLButton size="icon">
        <Plus className="size-4" />
      </MLButton>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <MLButton size="icon" variant="default">
        <Plus className="size-4" />
      </MLButton>
      <MLButton size="icon" variant="secondary">
        <Settings className="size-4" />
      </MLButton>
      <MLButton size="icon" variant="outline">
        <Mail className="size-4" />
      </MLButton>
      <MLButton size="icon" variant="ghost">
        <Star className="size-4" />
      </MLButton>
    </div>
  ),
};

export const WithPrefix: Story = {
  args: {
    variant: 'default',
    prefix: <Download className="size-4" />,
    children: 'Download',
  },
};

export const WithSuffix: Story = {
  args: {
    variant: 'default',
    suffix: <ArrowRight className="size-4" />,
    children: 'Continue',
  },
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MLButton variant="default" prefix={<ChevronLeft className="size-4" />}>
        Back
      </MLButton>
      <MLButton variant="default" suffix={<ChevronRight className="size-4" />}>
        Next
      </MLButton>
      <MLButton
        variant="outline"
        prefix={<Mail className="size-4" />}
        suffix={<ArrowRight className="size-4" />}
      >
        Send Email
      </MLButton>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <MLButton variant="default" loading>
        Loading...
      </MLButton>
      <MLButton variant="secondary" loading>
        Loading...
      </MLButton>
      <MLButton variant="destructive" loading>
        Loading...
      </MLButton>
      <MLButton variant="outline" loading>
        Loading...
      </MLButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <MLButton variant="default" disabled>
        Default
      </MLButton>
      <MLButton variant="secondary" disabled>
        Secondary
      </MLButton>
      <MLButton variant="destructive" disabled>
        Destructive
      </MLButton>
      <MLButton variant="outline" disabled>
        Outline
      </MLButton>
      <MLButton variant="ghost" disabled>
        Ghost
      </MLButton>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80 flex flex-col gap-4">
      <MLButton variant="default" fullwidth>
        Full Width Button
      </MLButton>
      <MLButton variant="outline" fullwidth>
        Full Width Outline
      </MLButton>
    </div>
  ),
};

// AsChild Stories - Demonstrates Next.js Link usage

export const AsChildWithLink: Story = {
  render: () => (
    <MLButton asChild variant="default">
      <MockLink href="/dashboard">Go to Dashboard</MockLink>
    </MLButton>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use asChild to render button styling on Next.js Link components. Perfect for navigation that looks like buttons.',
      },
    },
  },
};

export const AsChildLinkVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MLButton asChild variant="default">
        <MockLink href="/dashboard">Default Link Button</MockLink>
      </MLButton>

      <MLButton asChild variant="outline">
        <MockLink href="/settings">Outline Link Button</MockLink>
      </MLButton>

      <MLButton asChild variant="secondary">
        <MockLink href="/profile">Secondary Link Button</MockLink>
      </MLButton>

      <MLButton asChild variant="ghost">
        <MockLink href="/help">Ghost Link Button</MockLink>
      </MLButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All button variants work with asChild pattern for consistent styling across different link types.',
      },
    },
  },
};
