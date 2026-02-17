import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLPopover as Popover,
  MLPopoverTrigger as PopoverTrigger,
  MLPopoverContent as PopoverContent,
  MLPopoverHeader as PopoverHeader,
  MLPopoverClose as PopoverClose,
} from './index';
import { MLButton as Button } from '../MLButton';
import { MLInput as Input } from '../MLInput';
import { X, Settings } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
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
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
        <div className="flex flex-col gap-2 mt-4">
          <Input label="Width" placeholder="100%" horizontalLayout labelWidth="96px" />
          <Input label="Max. width" placeholder="300px" horizontalLayout labelWidth="96px" />
          <Input label="Height" placeholder="auto" horizontalLayout labelWidth="96px" />
          <Input label="Max. height" placeholder="none" horizontalLayout labelWidth="96px" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Simple: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Click me</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm">This is a simple popover with some text content.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Settings</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader title="Display Settings" description="Configure how content is displayed." />
        <div className="mt-4 space-y-2">
          <p className="text-sm">Settings content goes here...</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// ============================================
// Alignment Stories
// ============================================

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader title="Aligned to Start" />
        <p className="text-sm text-muted-foreground mt-2">
          This popover is aligned to the start of the trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Center</Button>
      </PopoverTrigger>
      <PopoverContent align="center">
        <PopoverHeader title="Aligned to Center" />
        <p className="text-sm text-muted-foreground mt-2">
          This popover is aligned to the center of the trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader title="Aligned to End" />
        <p className="text-sm text-muted-foreground mt-2">
          This popover is aligned to the end of the trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

// ============================================
// With Close Button
// ============================================

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="relative">
        <PopoverClose className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </PopoverClose>
        <PopoverHeader title="Notifications" description="Manage your notification preferences." />
        <div className="mt-4">
          <p className="text-sm">Notification settings here...</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// ============================================
// Icon Trigger
// ============================================

export const IconTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader title="Settings" description="Adjust your preferences." />
        <div className="mt-4 space-y-2">
          <Input label="Name" placeholder="Enter name" />
          <Input label="Email" placeholder="Enter email" type="email" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// ============================================
// Controlled Example
// ============================================

export const Controlled = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">{open ? 'Close' : 'Open'} Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            title="Controlled Popover"
            description="This popover's state is controlled externally."
          />
          <div className="mt-4">
            <Button size="sm" onClick={() => setOpen(false)}>
              Close from inside
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">
        Popover is: <span className="font-medium">{open ? 'Open' : 'Closed'}</span>
      </p>
    </div>
  );
};

// ============================================
// Form Example (Figma Design)
// ============================================

export const DimensionsForm: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
        <div className="grid gap-2 mt-4">
          <div className="grid grid-cols-[96px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-right">Width</label>
            <input
              type="text"
              placeholder="Placeholder"
              className="h-8 px-3 rounded-md border border-base-border bg-base-input-background text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-[96px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-right">Max. width</label>
            <input
              type="text"
              placeholder="Placeholder"
              className="h-8 px-3 rounded-md border border-base-border bg-base-input-background text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-[96px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-right">Height</label>
            <input
              type="text"
              placeholder="Placeholder"
              className="h-8 px-3 rounded-md border border-base-border bg-base-input-background text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-[96px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-right">Max. height</label>
            <input
              type="text"
              placeholder="Placeholder"
              className="h-8 px-3 rounded-md border border-base-border bg-base-input-background text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// ============================================
// Multiple Popovers
// ============================================

export const MultiplePopovers: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">First</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader title="First Popover" />
          <p className="text-sm text-muted-foreground mt-2">Content for the first popover.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Second</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader title="Second Popover" />
          <p className="text-sm text-muted-foreground mt-2">Content for the second popover.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Third</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader title="Third Popover" />
          <p className="text-sm text-muted-foreground mt-2">Content for the third popover.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
