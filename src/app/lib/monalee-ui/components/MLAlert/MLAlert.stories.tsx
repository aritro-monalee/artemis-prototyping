import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLAlert,
  MLAlertTitle,
  MLAlertDescription,
  MLAlertIcon,
  MLAlertAction,
  type MLAlertProps,
} from './MLAlert';
import { MLButton } from '../MLButton';
import {
  CircleCheck,
  CircleAlert,
  BookmarkCheck,
  Gift,
  ShieldAlert,
  Info,
  AlertTriangle,
} from 'lucide-react';

const meta: Meta<typeof MLAlert> = {
  title: 'Components/Alert',
  component: MLAlert,
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
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<MLAlertProps>;

export const Default: Story = {
  render: () => (
    <div className="w-[634px] space-y-4">
      <MLAlert
        icon={CircleCheck}
        title="Success! Your changes have been saved."
        description="This is an alert with icon, title and description."
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const WithIconAndDescription: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert
        icon={BookmarkCheck}
        description="This one has an icon and a description only. No title."
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert description="This one has a description only. No title. No icon." />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const IconAndTitle: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert icon={Gift} title="Let's try one with icon and title." />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const LongDescription: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert
        icon={ShieldAlert}
        description="This is a very long alert description that demonstrates how the component handles extended text content and potentially wraps across multiple lines"
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const LongTitleAndDescription: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert
        icon={CircleAlert}
        title="This is an extremely long alert title that spans multiple lines to demonstrate how..."
        description="This is an equally long description that contains detailed information about the alert. It shows how the component can accommodate extensive content while preserving proper spacing, alignment, and readability across different screen sizes and viewport widths. This helps ensure the user experience remains consistent regardless of the content length."
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const Destructive: Story = {
  render: () => (
    <div className="w-[634px] space-y-4">
      <MLAlert
        variant="destructive"
        icon={CircleAlert}
        title="Something went wrong!"
        description="Your session has expired. Please log in again."
      />
    </div>
  ),
  args: {
    variant: 'destructive',
  },
};

export const DestructiveWithList: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert
        variant="destructive"
        icon={CircleAlert}
        title="Unable to process your payment."
        description={
          <div>
            <p className="mb-2">Please verify your billing information and try again.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </div>
        }
      />
    </div>
  ),
  args: {
    variant: 'destructive',
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert
        icon={CircleCheck}
        title="The selected emails have been marked as spam."
        action={
          <MLButton variant="outline" size="sm">
            Undo
          </MLButton>
        }
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[634px] space-y-4">
      <MLAlert
        variant="default"
        icon={Info}
        title="Default Alert"
        description="This is a default alert for general information."
      />
      <MLAlert
        variant="success"
        icon={CircleCheck}
        title="Success Alert"
        description="Your action was completed successfully."
      />
      <MLAlert
        variant="warning"
        icon={AlertTriangle}
        title="Warning Alert"
        description="Please be careful with this action."
      />
      <MLAlert
        variant="destructive"
        icon={CircleAlert}
        title="Destructive Alert"
        description="Something went wrong. Please try again."
      />
      <MLAlert
        variant="info"
        icon={Info}
        title="Info Alert"
        description="Here's some helpful information for you."
      />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

export const CompoundPattern: Story = {
  render: () => (
    <div className="w-[634px]">
      <MLAlert>
        <MLAlertIcon icon={CircleCheck} />
        <div className="flex flex-col flex-1 gap-1">
          <MLAlertTitle>Using compound pattern</MLAlertTitle>
          <MLAlertDescription>
            You can also use the compound pattern for more control over the layout.
          </MLAlertDescription>
        </div>
        <MLAlertAction>
          <MLButton variant="outline" size="sm">
            Action
          </MLButton>
        </MLAlertAction>
      </MLAlert>
    </div>
  ),
  args: {
    variant: 'default',
  },
};
