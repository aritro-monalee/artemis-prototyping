import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster, toast } from './index';
import { MLButton } from '../MLButton';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[400px] min-w-[500px] flex items-center justify-center">
        <Story />
        <Toaster position="bottom-right" />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// ============================================
// Simple Toast
// ============================================

export const Default: Story = {
  render: () => <MLButton onClick={() => toast('Event has been created')}>Show Toast</MLButton>,
};

// ============================================
// With Description
// ============================================

export const WithDescription: Story = {
  render: () => (
    <MLButton
      onClick={() =>
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        })
      }
    >
      Show Toast with Description
    </MLButton>
  ),
};

// ============================================
// With Action
// ============================================

export const WithAction: Story = {
  render: () => (
    <MLButton
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        })
      }
    >
      Show Toast with Action
    </MLButton>
  ),
};

// ============================================
// Success Toast
// ============================================

export const Success: Story = {
  render: () => (
    <MLButton onClick={() => toast.success('Event has been created')}>Show Success Toast</MLButton>
  ),
};

// ============================================
// Info Toast
// ============================================

export const Info: Story = {
  render: () => (
    <MLButton onClick={() => toast.info('Be at the area 10 minutes before the event time')}>
      Show Info Toast
    </MLButton>
  ),
};

// ============================================
// Warning Toast
// ============================================

export const Warning: Story = {
  render: () => (
    <MLButton onClick={() => toast.warning('Event start time cannot be earlier than 8am')}>
      Show Warning Toast
    </MLButton>
  ),
};

// ============================================
// Error Toast
// ============================================

export const Error: Story = {
  render: () => (
    <MLButton onClick={() => toast.error('Event has not been created')}>Show Error Toast</MLButton>
  ),
};

// ============================================
// Loading Toast
// ============================================

export const Loading: Story = {
  render: () => (
    <MLButton
      onClick={() => {
        const toastId = toast.loading('Loading...');
        setTimeout(() => {
          toast.success('Event has been created', { id: toastId });
        }, 2000);
      }}
    >
      Show Loading Toast
    </MLButton>
  ),
};

// ============================================
// Promise Toast
// ============================================

export const PromiseToast: Story = {
  render: () => (
    <MLButton
      onClick={() => {
        const promise = new Promise((resolve) => setTimeout(resolve, 2000));
        toast.promise(promise, {
          loading: 'Creating event...',
          success: 'Event has been created',
          error: 'Failed to create event',
        });
      }}
    >
      Show Promise Toast
    </MLButton>
  ),
};

// ============================================
// All Variants (Figma Design)
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MLButton variant="outline" onClick={() => toast('Event has been created')}>
        Simple Toast
      </MLButton>

      <MLButton
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
          })
        }
      >
        With Description
      </MLButton>

      <MLButton
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => {},
            },
          })
        }
      >
        With Action
      </MLButton>

      <MLButton variant="outline" onClick={() => toast.success('Event has been created')}>
        Success
      </MLButton>

      <MLButton
        variant="outline"
        onClick={() => toast.info('Be at the area 10 minutes before the event time')}
      >
        Info
      </MLButton>

      <MLButton
        variant="outline"
        onClick={() => toast.warning('Event start time cannot be earlier than 8am')}
      >
        Warning
      </MLButton>

      <MLButton variant="outline" onClick={() => toast.error('Event has not been created')}>
        Error
      </MLButton>

      <MLButton variant="outline" onClick={() => toast.loading('Loading...')}>
        Loading
      </MLButton>
    </div>
  ),
};
