import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import {
  MLCommand as Command,
  MLCommandDialog as CommandDialog,
  MLCommandInput as CommandInput,
  MLCommandList as CommandList,
  MLCommandEmpty as CommandEmpty,
  MLCommandGroup as CommandGroup,
  MLCommandItem as CommandItem,
  MLCommandSeparator as CommandSeparator,
} from './index';
import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  Mail,
  MessageSquare,
  PlusCircle,
  Github,
  Cloud,
  LifeBuoy,
  LogOut,
} from 'lucide-react';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem icon={Calendar} value="calendar">
            Calendar
          </CommandItem>
          <CommandItem icon={Smile} value="search-emoji">
            Search Emoji
          </CommandItem>
          <CommandItem icon={Calculator} value="calculator">
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem icon={User} shortcut="⌘P" value="profile">
            Profile
          </CommandItem>
          <CommandItem icon={CreditCard} shortcut="⌘B" value="billing">
            Billing
          </CommandItem>
          <CommandItem icon={Settings} shortcut="⌘S" value="settings">
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Empty: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[450px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};

export const WithManyGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Mail">
          <CommandItem icon={Mail} value="compose-email">
            Compose New Email
          </CommandItem>
          <CommandItem icon={MessageSquare} value="conversations">
            View Conversations
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Social">
          <CommandItem icon={Github} value="github">
            GitHub
          </CommandItem>
          <CommandItem icon={Cloud} value="cloud-storage">
            Cloud Storage
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem icon={User} shortcut="⌘P" value="profile">
            Profile
          </CommandItem>
          <CommandItem icon={CreditCard} shortcut="⌘B" value="billing">
            Billing
          </CommandItem>
          <CommandItem icon={Settings} shortcut="⌘S" value="settings">
            Settings
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem icon={LifeBuoy} value="support">
            Support
          </CommandItem>
          <CommandItem icon={LogOut} shortcut="⇧⌘Q" value="logout">
            Log out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[450px]">
      <CommandInput placeholder="What do you need?" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          <CommandItem icon={PlusCircle} value="create-project">
            Create New Project
          </CommandItem>
          <CommandItem icon={Mail} value="send-message">
            Send Message
          </CommandItem>
          <CommandItem icon={Calendar} value="schedule-meeting">
            Schedule Meeting
          </CommandItem>
          <CommandItem icon={User} value="add-team-member">
            Add Team Member
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <p className="text-sm text-base-muted-foreground">
          Press{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-base-muted px-1.5 font-mono text-[10px] font-medium text-base-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>{' '}
          or{' '}
          <button
            onClick={() => setOpen(true)}
            className="text-base-foreground underline underline-offset-4 hover:text-artemis-600"
          >
            click here
          </button>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem icon={Calendar} value="calendar">
                Calendar
              </CommandItem>
              <CommandItem icon={Smile} value="emoji">
                Search Emoji
              </CommandItem>
              <CommandItem icon={Calculator} value="calculator">
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem icon={User} shortcut="⌘P" value="profile">
                Profile
              </CommandItem>
              <CommandItem icon={CreditCard} shortcut="⌘B" value="billing">
                Billing
              </CommandItem>
              <CommandItem icon={Settings} shortcut="⌘S" value="settings">
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const NoIcons: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[450px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Fruits">
          <CommandItem value="apple">Apple</CommandItem>
          <CommandItem value="banana">Banana</CommandItem>
          <CommandItem value="orange">Orange</CommandItem>
          <CommandItem value="strawberry">Strawberry</CommandItem>
          <CommandItem value="mango">Mango</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Vegetables">
          <CommandItem value="carrot">Carrot</CommandItem>
          <CommandItem value="broccoli">Broccoli</CommandItem>
          <CommandItem value="spinach">Spinach</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Command className="rounded-lg border shadow-md w-[450px]">
          <CommandInput placeholder="Select an action..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem
                icon={Calendar}
                value="calendar"
                onSelect={() => setSelected('Calendar')}
              >
                Open Calendar
              </CommandItem>
              <CommandItem icon={Mail} value="mail" onSelect={() => setSelected('Mail')}>
                Compose Email
              </CommandItem>
              <CommandItem
                icon={Settings}
                value="settings"
                onSelect={() => setSelected('Settings')}
              >
                Open Settings
              </CommandItem>
              <CommandItem icon={User} value="profile" onSelect={() => setSelected('Profile')}>
                View Profile
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        {selected && (
          <div className="p-3 rounded-md bg-cream-100 text-base-foreground text-sm">
            Selected: <strong>{selected}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const FilteringDemo: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm text-base-muted-foreground mb-4">
        Try typing "cal" or "xyz" to see filtering and empty state in action
      </p>
      <Command className="rounded-lg border shadow-md w-[450px]">
        <CommandInput placeholder="Type to filter..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Apps">
            <CommandItem icon={Calendar} value="calendar">
              Calendar
            </CommandItem>
            <CommandItem icon={Calculator} value="calculator">
              Calculator
            </CommandItem>
            <CommandItem icon={Mail} value="mail">
              Mail
            </CommandItem>
            <CommandItem icon={Settings} value="settings">
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
