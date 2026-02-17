import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MLBadge, BadgeNumber, type MLBadgeProps } from './MLBadge';
import { Check, CircleAlert, ArrowRight } from 'lucide-react';

const meta: Meta<MLBadgeProps> = {
  title: 'Components/Badge',
  component: MLBadge,
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
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style of the badge',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as a different element using Radix Slot',
    },
  },
};

export default meta;
type Story = StoryObj<MLBadgeProps>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
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

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <MLBadge variant="default">Badge</MLBadge>
      <MLBadge variant="secondary">Secondary</MLBadge>
      <MLBadge variant="destructive">Destructive</MLBadge>
      <MLBadge variant="outline">Outline</MLBadge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <MLBadge variant="outline" icon={<Check className="size-3" />}>
        Badge
      </MLBadge>
      <MLBadge variant="destructive" icon={<CircleAlert className="size-3" />}>
        Alert
      </MLBadge>
    </div>
  ),
};

export const WithTrailingIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <MLBadge variant="default" trailingIcon={<ArrowRight className="size-3" />}>
        Link
      </MLBadge>
      <MLBadge variant="secondary" trailingIcon={<ArrowRight className="size-3" />}>
        Link
      </MLBadge>
      <MLBadge variant="destructive" trailingIcon={<ArrowRight className="size-3" />}>
        Link
      </MLBadge>
      <MLBadge variant="outline" trailingIcon={<ArrowRight className="size-3" />}>
        Link
      </MLBadge>
    </div>
  ),
};

export const BadgeNumbers: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <BadgeNumber count={8} />
      <BadgeNumber count={99} variant="destructive" />
      <BadgeNumber count={20} variant="outline" />
    </div>
  ),
};

export const BadgeNumberWithMax: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <BadgeNumber count={5} />
      <BadgeNumber count={99} />
      <BadgeNumber count={150} max={99} />
      <BadgeNumber count="20+" variant="outline" />
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <MLBadge asChild variant="default">
      <a href="#" className="cursor-pointer hover:opacity-80">
        Link <ArrowRight className="size-3" />
      </a>
    </MLBadge>
  ),
};
