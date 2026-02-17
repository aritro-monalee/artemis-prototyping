import React from 'react';
import {
  MLDropdownMenu,
  MLDropdownMenuCheckboxItem,
  MLDropdownMenuContent,
  MLDropdownMenuItem,
  MLDropdownMenuLabel,
  MLDropdownMenuPortal,
  MLDropdownMenuRadioGroup,
  MLDropdownMenuRadioItem,
  MLDropdownMenuSeparator,
  MLDropdownMenuShortcut,
  MLDropdownMenuSub,
  MLDropdownMenuSubContent,
  MLDropdownMenuSubTrigger,
  MLDropdownMenuTrigger,
} from './index';
import { MLButton } from '../MLButton';
import {
  MLAvatar as Avatar,
  MLAvatarFallback as AvatarFallback,
  MLAvatarImage as AvatarImage,
} from '../MLAvatar';
import {
  MoreVertical,
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Plus,
  Bell,
  LogOut,
  Sparkles,
  CircleCheck,
  ChevronsUpDown,
} from 'lucide-react';

export default {
  title: 'Components/DropdownMenu',
  component: MLDropdownMenu,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
};

// Basic dropdown with shortcuts (matching Figma "My Account" example)
export const Default = () => (
  <MLDropdownMenu>
    <MLDropdownMenuTrigger asChild>
      <MLButton variant="outline">Open</MLButton>
    </MLDropdownMenuTrigger>
    <MLDropdownMenuContent className="w-56">
      <MLDropdownMenuLabel>My Account</MLDropdownMenuLabel>
      <MLDropdownMenuItem>
        Profile
        <MLDropdownMenuShortcut>⇧⌘P</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        Billing
        <MLDropdownMenuShortcut>⌘B</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        Settings
        <MLDropdownMenuShortcut>⌘S</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        Keyboard shortcuts
        <MLDropdownMenuShortcut>⌘K</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>Team</MLDropdownMenuItem>
      <MLDropdownMenuSub>
        <MLDropdownMenuSubTrigger>Invite users</MLDropdownMenuSubTrigger>
        <MLDropdownMenuPortal>
          <MLDropdownMenuSubContent>
            <MLDropdownMenuItem>Email</MLDropdownMenuItem>
            <MLDropdownMenuItem>Message</MLDropdownMenuItem>
            <MLDropdownMenuSeparator />
            <MLDropdownMenuItem>More...</MLDropdownMenuItem>
          </MLDropdownMenuSubContent>
        </MLDropdownMenuPortal>
      </MLDropdownMenuSub>
      <MLDropdownMenuItem>
        New Team
        <MLDropdownMenuShortcut>⌘+T</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>GitHub</MLDropdownMenuItem>
      <MLDropdownMenuItem>Support</MLDropdownMenuItem>
      <MLDropdownMenuItem disabled>API</MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        Log out
        <MLDropdownMenuShortcut>⇧⌘Q</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
    </MLDropdownMenuContent>
  </MLDropdownMenu>
);

// Dropdown with icons
export const WithIcons = () => (
  <MLDropdownMenu>
    <MLDropdownMenuTrigger asChild>
      <MLButton variant="outline">Options</MLButton>
    </MLDropdownMenuTrigger>
    <MLDropdownMenuContent className="w-56">
      <MLDropdownMenuItem>
        <User className="size-4" />
        Profile
        <MLDropdownMenuShortcut>⇧⌘P</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <CreditCard className="size-4" />
        Billing
        <MLDropdownMenuShortcut>⌘B</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <Settings className="size-4" />
        Settings
        <MLDropdownMenuShortcut>⌘S</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <Keyboard className="size-4" />
        Keyboard shortcuts
        <MLDropdownMenuShortcut>⌘K</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <Users className="size-4" />
        Team
      </MLDropdownMenuItem>
      <MLDropdownMenuSub>
        <MLDropdownMenuSubTrigger>
          <UserPlus className="size-4" />
          Invite users
        </MLDropdownMenuSubTrigger>
        <MLDropdownMenuPortal>
          <MLDropdownMenuSubContent>
            <MLDropdownMenuItem>Email</MLDropdownMenuItem>
            <MLDropdownMenuItem>Message</MLDropdownMenuItem>
            <MLDropdownMenuSeparator />
            <MLDropdownMenuItem>More...</MLDropdownMenuItem>
          </MLDropdownMenuSubContent>
        </MLDropdownMenuPortal>
      </MLDropdownMenuSub>
      <MLDropdownMenuItem>
        <Plus className="size-4" />
        New Team
        <MLDropdownMenuShortcut>⌘+T</MLDropdownMenuShortcut>
      </MLDropdownMenuItem>
    </MLDropdownMenuContent>
  </MLDropdownMenu>
);

// User profile trigger (matching Figma avatar trigger)
export const UserProfileTrigger = () => (
  <MLDropdownMenu>
    <MLDropdownMenuTrigger asChild>
      <button className="flex h-12 w-[200px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2 shadow-xs hover:bg-cream-100">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="text-sm font-medium">shadcn</span>
          <span className="text-xs text-muted-foreground">shadcn@example.com</span>
        </div>
        <ChevronsUpDown className="size-4 opacity-50" />
      </button>
    </MLDropdownMenuTrigger>
    <MLDropdownMenuContent className="w-56">
      <div className="flex items-center gap-2 px-1 py-1.5">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">shadcn</span>
          <span className="text-xs text-muted-foreground">shadcn@example.com</span>
        </div>
      </div>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <Sparkles className="size-4" />
        Upgrade to Pro
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <CircleCheck className="size-4" />
        Account
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <CreditCard className="size-4" />
        Billing
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <Bell className="size-4" />
        Notifications
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <LogOut className="size-4" />
        Sign Out
      </MLDropdownMenuItem>
    </MLDropdownMenuContent>
  </MLDropdownMenu>
);

// Avatar trigger without form fields
export const AvatarTrigger = () => (
  <MLDropdownMenu>
    <MLDropdownMenuTrigger asChild>
      <button className="rounded-full">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
    </MLDropdownMenuTrigger>
    <MLDropdownMenuContent className="w-56">
      <div className="flex items-center gap-2 px-1 py-1.5">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">shadcn</span>
          <span className="text-xs text-muted-foreground">shadcn@example.com</span>
        </div>
      </div>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <Sparkles className="size-4" />
        Upgrade to Pro
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <CircleCheck className="size-4" />
        Account
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <CreditCard className="size-4" />
        Billing
      </MLDropdownMenuItem>
      <MLDropdownMenuItem>
        <Bell className="size-4" />
        Notifications
      </MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>
        <LogOut className="size-4" />
        Sign Out
      </MLDropdownMenuItem>
    </MLDropdownMenuContent>
  </MLDropdownMenu>
);

// Icon button trigger
export const IconButtonTrigger = () => (
  <MLDropdownMenu>
    <MLDropdownMenuTrigger asChild>
      <MLButton variant="outline" size="icon">
        <MoreVertical className="size-4" />
      </MLButton>
    </MLDropdownMenuTrigger>
    <MLDropdownMenuContent>
      <MLDropdownMenuItem>Email</MLDropdownMenuItem>
      <MLDropdownMenuItem>Message</MLDropdownMenuItem>
      <MLDropdownMenuSeparator />
      <MLDropdownMenuItem>More...</MLDropdownMenuItem>
    </MLDropdownMenuContent>
  </MLDropdownMenu>
);

// With checkboxes
export const WithCheckboxes = () => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <MLDropdownMenu>
      <MLDropdownMenuTrigger asChild>
        <MLButton variant="outline">Appearance</MLButton>
      </MLDropdownMenuTrigger>
      <MLDropdownMenuContent className="w-56">
        <MLDropdownMenuLabel>Appearance</MLDropdownMenuLabel>
        <MLDropdownMenuSeparator />
        <MLDropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </MLDropdownMenuCheckboxItem>
        <MLDropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </MLDropdownMenuCheckboxItem>
        <MLDropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </MLDropdownMenuCheckboxItem>
      </MLDropdownMenuContent>
    </MLDropdownMenu>
  );
};

// With radio items
export const WithRadioItems = () => {
  const [position, setPosition] = React.useState('bottom');

  return (
    <MLDropdownMenu>
      <MLDropdownMenuTrigger asChild>
        <MLButton variant="outline">Panel Position</MLButton>
      </MLDropdownMenuTrigger>
      <MLDropdownMenuContent className="w-56">
        <MLDropdownMenuLabel>Panel Position</MLDropdownMenuLabel>
        <MLDropdownMenuSeparator />
        <MLDropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <MLDropdownMenuRadioItem value="top">Top</MLDropdownMenuRadioItem>
          <MLDropdownMenuRadioItem value="bottom">Bottom</MLDropdownMenuRadioItem>
          <MLDropdownMenuRadioItem value="right">Right</MLDropdownMenuRadioItem>
        </MLDropdownMenuRadioGroup>
      </MLDropdownMenuContent>
    </MLDropdownMenu>
  );
};
