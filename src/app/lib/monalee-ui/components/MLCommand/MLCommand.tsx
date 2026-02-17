'use client';

import * as React from 'react';
import {
  Command as UICommand,
  CommandDialog as UICommandDialog,
  CommandInput as UICommandInput,
  CommandList as UICommandList,
  CommandEmpty as UICommandEmpty,
  CommandGroup as UICommandGroup,
  CommandItem as UICommandItem,
  CommandShortcut as UICommandShortcut,
  CommandSeparator as UICommandSeparator,
} from '../ui/command';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export interface CommandProps extends React.ComponentPropsWithoutRef<typeof UICommand> {}
export interface CommandDialogProps
  extends React.ComponentPropsWithoutRef<typeof UICommandDialog> {}
export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof UICommandInput> {}
export interface CommandListProps extends React.ComponentPropsWithoutRef<typeof UICommandList> {}
export interface CommandEmptyProps extends React.ComponentPropsWithoutRef<typeof UICommandEmpty> {}
export interface CommandGroupProps extends React.ComponentPropsWithoutRef<typeof UICommandGroup> {}
export interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof UICommandItem> {
  /**
   * Icon to display on the left side of the item
   */
  icon?: LucideIcon;
  /**
   * Keyboard shortcut to display on the right side
   */
  shortcut?: string;
}
export interface CommandShortcutProps
  extends React.ComponentPropsWithoutRef<typeof UICommandShortcut> {}
export interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof UICommandSeparator> {}

// ============================================
// Components
// ============================================

/**
 * Command - Fast, composable, command menu for React.
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem icon={Calendar} value="calendar">Calendar</CommandItem>
 *       <CommandItem icon={Smile} value="emoji">Search Emoji</CommandItem>
 *       <CommandItem icon={Calculator} value="calculator">Calculator</CommandItem>
 *     </CommandGroup>
 *     <CommandSeparator />
 *     <CommandGroup heading="Settings">
 *       <CommandItem icon={User} shortcut="⌘P" value="profile">Profile</CommandItem>
 *       <CommandItem icon={CreditCard} shortcut="⌘B" value="billing">Billing</CommandItem>
 *       <CommandItem icon={Settings} shortcut="⌘S" value="settings">Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command = React.forwardRef<React.ElementRef<typeof UICommand>, CommandProps>(
  ({ className, ...props }, ref) => (
    <UICommand
      ref={ref}
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  )
);
Command.displayName = 'Command';

const CommandDialog = UICommandDialog;

const CommandInput = React.forwardRef<React.ElementRef<typeof UICommandInput>, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <UICommandInput ref={ref} className={cn(className)} {...props} />
  )
);
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<React.ElementRef<typeof UICommandList>, CommandListProps>(
  ({ className, ...props }, ref) => <UICommandList ref={ref} className={cn(className)} {...props} />
);
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<React.ElementRef<typeof UICommandEmpty>, CommandEmptyProps>(
  ({ className, children = 'No results found.', ...props }, ref) => (
    <UICommandEmpty ref={ref} className={cn(className)} {...props}>
      {children}
    </UICommandEmpty>
  )
);
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<React.ElementRef<typeof UICommandGroup>, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <UICommandGroup ref={ref} className={cn(className)} {...props} />
  )
);
CommandGroup.displayName = 'CommandGroup';

const CommandItem = React.forwardRef<React.ElementRef<typeof UICommandItem>, CommandItemProps>(
  ({ className, icon: Icon, shortcut, children, ...props }, ref) => (
    <UICommandItem ref={ref} className={cn('py-3', className)} {...props}>
      {Icon && <Icon className="size-4 text-base-muted-foreground" />}
      <MLText as="span" className="flex-1">
        {children}
      </MLText>
      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
    </UICommandItem>
  )
);
CommandItem.displayName = 'CommandItem';

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, ...props }, ref) => (
    <UICommandShortcut
      ref={ref}
      className={cn('text-xs text-base-muted-foreground', className)}
      {...props}
    />
  )
);
CommandShortcut.displayName = 'CommandShortcut';

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof UICommandSeparator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <UICommandSeparator ref={ref} className={cn(className)} {...props} />
));
CommandSeparator.displayName = 'CommandSeparator';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
