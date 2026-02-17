import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLDrawer,
  MLDrawerTrigger,
  MLDrawerContent,
  MLDrawerHeader,
  MLDrawerBody,
  MLDrawerTitle,
  MLDrawerDescription,
  MLDrawerFooter,
  type MLDrawerProps,
} from './index';
import { Button } from '../ui/button';
import { MLButton } from '../MLButton';
import { MLInput } from '../MLInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta<typeof MLDrawer> = {
  title: 'Components/Drawer',
  component: MLDrawer,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export default meta;
type Story = StoryObj<MLDrawerProps>;

// Counter Button Component for Move Goal example
const CounterButton = ({
  icon,
  onClick,
}: {
  icon: typeof faMinus | typeof faPlus;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-white border border-input rounded-full p-2.5 size-8 flex items-center justify-center shadow-xs hover:bg-muted transition-colors"
  >
    <FontAwesomeIcon icon={icon} className="size-4 text-foreground" />
  </button>
);

// Bar Chart placeholder component
const BarChart = () => (
  <div className="flex items-end justify-between h-[110px] gap-1 px-2">
    {[110, 83, 55, 83, 55, 77, 52, 65, 83, 55, 52, 96].map((height, i) => (
      <div key={i} className="bg-foreground rounded-sm w-full" style={{ height: `${height}%` }} />
    ))}
  </div>
);

export const Default: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Bottom Drawer</Button>
        </MLDrawerTrigger>
        <MLDrawerContent>
          <MLDrawerHeader>
            <MLDrawerTitle>Drawer Title</MLDrawerTitle>
            <MLDrawerDescription>
              This is a drawer component that slides in from the bottom.
            </MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <p>This is the drawer content. You can put any React components here.</p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold">Example Content</h4>
              <p className="text-sm text-muted-foreground">
                This demonstrates how the drawer would actually appear when triggered by user
                interaction.
              </p>
            </div>
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Submit</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'bottom',
  },
};

// Move Goal Example - matching the Figma design
const MoveGoalDrawer = (args: MLDrawerProps) => {
  const [goal, setGoal] = useState(350);

  return (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Move Goal</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showClose={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>Move Goal</MLDrawerTitle>
            <MLDrawerDescription>Set your daily activity goal.</MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <div className="flex items-center gap-2">
              <CounterButton icon={faMinus} onClick={() => setGoal((g) => Math.max(0, g - 10))} />
              <div className="flex-1 text-center">
                <p className="text-7xl font-bold text-foreground tracking-tighter">{goal}</p>
                <p className="text-xs text-muted-foreground uppercase">Calories/day</p>
              </div>
              <CounterButton icon={faPlus} onClick={() => setGoal((g) => g + 10)} />
            </div>
            <BarChart />
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Submit</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  );
};

export const MoveGoal: Story = {
  render: MoveGoalDrawer,
  args: {
    direction: 'bottom',
  },
};

// Edit Profile Example - matching the Figma design
const EditProfileDrawer = (args: MLDrawerProps) => {
  return (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Edit Profile</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showClose={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>Edit profile</MLDrawerTitle>
            <MLDrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody className="gap-4">
            <MLInput label="Name" placeholder="Enter your name" />
            <MLInput label="Username" placeholder="@username" />
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Save changes</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  );
};

export const EditProfile: Story = {
  render: EditProfileDrawer,
  args: {
    direction: 'bottom',
  },
};

export const Top: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Top Drawer</Button>
        </MLDrawerTrigger>
        <MLDrawerContent>
          <MLDrawerHeader>
            <MLDrawerTitle>Top Drawer</MLDrawerTitle>
            <MLDrawerDescription>
              This drawer slides in from the top of the screen.
            </MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <p>Content for the top drawer.</p>
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Submit</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'top',
  },
};

export const Right: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Right Drawer</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showHandle={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>Right Drawer</MLDrawerTitle>
            <MLDrawerDescription>This drawer slides in from the right side.</MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody className="gap-4">
            <MLInput label="Name" placeholder="Enter name" />
            <MLInput label="Description" placeholder="Enter description" />
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Create Item</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'right',
  },
};

export const Left: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Left Drawer</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showHandle={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>Left Drawer</MLDrawerTitle>
            <MLDrawerDescription>This drawer slides in from the left side.</MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <p>Content for the left drawer.</p>
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Submit</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'left',
  },
};

export const NoCloseButton: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Drawer (No Close Button)</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showClose={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>No Close Button</MLDrawerTitle>
            <MLDrawerDescription>
              This drawer does not have a close button in the top-right corner.
            </MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <p>You can only close this drawer using the Cancel button or by clicking outside.</p>
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Confirm</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'bottom',
  },
};

export const NoHandle: Story = {
  render: (args: MLDrawerProps) => (
    <div className="p-4">
      <MLDrawer {...args}>
        <MLDrawerTrigger asChild>
          <Button>Open Drawer (No Handle)</Button>
        </MLDrawerTrigger>
        <MLDrawerContent showHandle={false}>
          <MLDrawerHeader>
            <MLDrawerTitle>No Handle</MLDrawerTitle>
            <MLDrawerDescription>
              This drawer does not have the drag handle at the top.
            </MLDrawerDescription>
          </MLDrawerHeader>
          <MLDrawerBody>
            <p>This is useful for side drawers or when you want a cleaner look.</p>
          </MLDrawerBody>
          <MLDrawerFooter>
            <MLButton>Confirm</MLButton>
            <MLButton variant="outline">Cancel</MLButton>
          </MLDrawerFooter>
        </MLDrawerContent>
      </MLDrawer>
    </div>
  ),
  args: {
    direction: 'bottom',
  },
};
