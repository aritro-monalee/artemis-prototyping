import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trash2 } from 'lucide-react';
import { MLDialog } from './index';
import { MLButton } from '../MLButton';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const meta: Meta<typeof MLDialog> = {
  title: 'Components/Dialog',
  component: MLDialog,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
    docs: {
      description: {
        component: 'A dialog/modal component with built-in header, footer, and action buttons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MLDialog>;

// ============================================
// Basic Dialog
// ============================================

const BasicExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton onClick={() => setOpen(true)}>Open Dialog</MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Dialog Title"
        description="This is a description of what this dialog does."
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
        onCancel={() => console.log('Cancelled')}
      >
        <div className="space-y-4">
          <p>This is the dialog content. You can put any React components here.</p>
          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-semibold">Example Content</h4>
            <p>
              This demonstrates how the dialog would actually appear when triggered by user
              interaction.
            </p>
          </div>
        </div>
      </MLDialog>
    </div>
  );
};

export const Default: Story = {
  render: () => <BasicExample />,
};

// ============================================
// Dialog with Form
// ============================================

const FormExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton onClick={() => setOpen(true)}>Edit Profile</MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        confirmText="Save changes"
        onConfirm={() => {
          console.log('Saved');
          setOpen(false);
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" defaultValue="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-username">Username</Label>
            <Input id="edit-username" defaultValue="@johndoe" />
          </div>
        </div>
      </MLDialog>
    </div>
  );
};

export const WithForm: Story = {
  render: () => <FormExample />,
};

// ============================================
// Different Sizes
// ============================================

const SizesExample = () => {
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  const [openXl, setOpenXl] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <MLButton variant="outline" onClick={() => setOpenSm(true)}>
        Small
      </MLButton>
      <MLDialog
        open={openSm}
        onOpenChange={setOpenSm}
        size="sm"
        title="Small Dialog"
        onConfirm={() => setOpenSm(false)}
      >
        <p>This is a small dialog (400px max width).</p>
      </MLDialog>

      <MLButton variant="outline" onClick={() => setOpenMd(true)}>
        Medium
      </MLButton>
      <MLDialog
        open={openMd}
        onOpenChange={setOpenMd}
        size="md"
        title="Medium Dialog"
        onConfirm={() => setOpenMd(false)}
      >
        <p>This is a medium dialog (500px max width).</p>
      </MLDialog>

      <MLButton variant="outline" onClick={() => setOpenLg(true)}>
        Large
      </MLButton>
      <MLDialog
        open={openLg}
        onOpenChange={setOpenLg}
        size="lg"
        title="Large Dialog"
        onConfirm={() => setOpenLg(false)}
      >
        <p>This is a large dialog (650px max width).</p>
      </MLDialog>

      <MLButton variant="outline" onClick={() => setOpenXl(true)}>
        XL
      </MLButton>
      <MLDialog
        open={openXl}
        onOpenChange={setOpenXl}
        size="xl"
        title="Extra Large Dialog"
        onConfirm={() => setOpenXl(false)}
      >
        <p>This is an extra large dialog (800px max width).</p>
      </MLDialog>
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />,
};

// ============================================
// Destructive Action
// ============================================

const DestructiveExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton variant="destructive" onClick={() => setOpen(true)}>
        <Trash2 className="size-4 mr-2" />
        Delete Item
      </MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          console.log('Deleted');
          setOpen(false);
        }}
      >
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-700 text-sm">
            This will permanently remove the item from your account.
          </p>
        </div>
      </MLDialog>
    </div>
  );
};

export const DestructiveAction: Story = {
  render: () => <DestructiveExample />,
};

// ============================================
// No Buttons (Info Only)
// ============================================

const NoButtonsExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton variant="outline" onClick={() => setOpen(true)}>
        Information
      </MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Information"
        showConfirm={false}
        showCancel={false}
      >
        <div className="space-y-4">
          <p>This dialog only has a close button.</p>
          <p>
            Perfect for displaying information or content that doesn&apos;t require user action.
          </p>
        </div>
      </MLDialog>
    </div>
  );
};

export const NoButtons: Story = {
  render: () => <NoButtonsExample />,
};

// ============================================
// Blur Backdrop
// ============================================

const BlurBackdropExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton onClick={() => setOpen(true)}>Open with Blur Backdrop</MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Blur Backdrop"
        description="This dialog has a blur backdrop effect."
        backdrop="blur"
        onConfirm={() => setOpen(false)}
      >
        <p>The backdrop behind this dialog has a blur effect applied.</p>
      </MLDialog>
    </div>
  );
};

export const BlurBackdrop: Story = {
  render: () => <BlurBackdropExample />,
};

// ============================================
// With Trigger (Uncontrolled)
// ============================================

export const WithTrigger: Story = {
  render: () => (
    <div className="p-4">
      <MLDialog
        title="Dialog with Trigger"
        description="This dialog uses the trigger prop for uncontrolled behavior."
        trigger={<MLButton>Open Dialog (Trigger)</MLButton>}
        onConfirm={() => console.log('Confirmed')}
      >
        <p>This dialog can be opened via the trigger button without managing state.</p>
      </MLDialog>
    </div>
  ),
};

// ============================================
// Long Content
// ============================================

const LongContentExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <MLButton variant="outline" onClick={() => setOpen(true)}>
        Terms of Service
      </MLButton>
      <MLDialog
        open={open}
        onOpenChange={setOpen}
        title="Terms of Service"
        description="Please read our terms of service carefully."
        showConfirm={false}
        cancelText="Close"
        size="lg"
      >
        <div className="flex flex-col gap-4 text-base-foreground">
          <h4 className="font-medium text-lg">Lorem ipsum</h4>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex
            vitae sodales. Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla
            laoreet vitae.
          </p>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex
            vitae sodales. Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla
            laoreet vitae.
          </p>
          <p className="text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex
            vitae sodales. Donec id leo ipsum. Phasellus volutpat aliquet mauris, et blandit nulla
            laoreet vitae.
          </p>
        </div>
      </MLDialog>
    </div>
  );
};

export const LongContent: Story = {
  render: () => <LongContentExample />,
};
