import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLLoadingPlaceholder as LoadingPlaceholder,
  MLSkeleton as Skeleton,
  MLSkeletonElement as SkeletonElement,
} from './index';

const meta: Meta<typeof LoadingPlaceholder> = {
  title: 'Components/LoadingPlaceholder',
  component: LoadingPlaceholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'text', 'custom'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingPlaceholder>;

// ============================================
// Default Variant (Avatar + Text)
// ============================================

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

// ============================================
// Card Variant (Text + Square)
// ============================================

export const Card: Story = {
  args: {
    variant: 'card',
  },
  render: (args) => (
    <div className="w-[334px]">
      <LoadingPlaceholder {...args} />
    </div>
  ),
};

// ============================================
// Text Variant
// ============================================

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

// ============================================
// Custom Size
// ============================================

export const CustomSize: Story = {
  args: {
    variant: 'custom',
    width: 300,
    height: 150,
  },
};

// ============================================
// In Card Context (Figma Design)
// ============================================

export const InCardContext: Story = {
  render: () => (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6 w-[370px]">
      <LoadingPlaceholder variant="card" />
    </div>
  ),
};

// ============================================
// All Variants (Figma Design)
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-16 items-center p-8 bg-background rounded-2xl border border-border">
      {/* Default - Avatar with text */}
      <LoadingPlaceholder variant="default" />

      {/* Card variant in card container */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6 w-[370px]">
        <LoadingPlaceholder variant="card" />
      </div>

      {/* Text variant */}
      <LoadingPlaceholder variant="text" />
    </div>
  ),
};

// ============================================
// Composition Example
// ============================================

export const Composition: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="flex items-center gap-4">
        <SkeletonElement className="size-12 rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <SkeletonElement className="h-4 w-3/4" />
          <SkeletonElement className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonElement className="h-[200px] w-full rounded-lg" />
      <div className="flex gap-2">
        <SkeletonElement className="h-8 w-20 rounded-md" />
        <SkeletonElement className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
};

// ============================================
// Skeleton Alias (shadcn compatibility)
// ============================================

export const SkeletonAlias: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Using Skeleton alias:</p>
      <Skeleton variant="default" />
    </div>
  ),
};
