'use client';

import * as React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '../ui/context-menu';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface ContextMenuProps extends React.ComponentPropsWithoutRef<typeof ContextMenu> {}
export interface ContextMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuTrigger> {}
export interface ContextMenuGroupProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuGroup> {}
export interface ContextMenuPortalProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPortal> {}
export interface ContextMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuSub> {}
export interface ContextMenuRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuRadioGroup> {}
export interface ContextMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuSubTrigger> {}
export interface ContextMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuSubContent> {}
export interface ContextMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuContent> {}
export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuItem> {}
export interface ContextMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuCheckboxItem> {}
export interface ContextMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuRadioItem> {}
export interface ContextMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuLabel> {}
export interface ContextMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuSeparator> {}
export interface ContextMenuShortcutProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuShortcut> {}

// ============================================
// Components - Wrap shadcn primitives with ML prefix
// ============================================

function MLContextMenu({ ...props }: ContextMenuProps) {
  return <ContextMenu {...props} />;
}

const MLContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuTrigger>,
  ContextMenuTriggerProps
>(({ ...props }, ref) => {
  return <ContextMenuTrigger ref={ref} {...props} />;
});
MLContextMenuTrigger.displayName = 'MLContextMenuTrigger';

function MLContextMenuGroup({ ...props }: ContextMenuGroupProps) {
  return <ContextMenuGroup {...props} />;
}

function MLContextMenuPortal({ ...props }: ContextMenuPortalProps) {
  return <ContextMenuPortal {...props} />;
}

function MLContextMenuSub({ ...props }: ContextMenuSubProps) {
  return <ContextMenuSub {...props} />;
}

function MLContextMenuRadioGroup({ ...props }: ContextMenuRadioGroupProps) {
  return <ContextMenuRadioGroup {...props} />;
}

function MLContextMenuSubTrigger({ className, ...props }: ContextMenuSubTriggerProps) {
  return <ContextMenuSubTrigger className={className} {...props} />;
}

function MLContextMenuSubContent({ className, ...props }: ContextMenuSubContentProps) {
  return <ContextMenuSubContent className={cn('border-base-border', className)} {...props} />;
}

const MLContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuContent>,
  ContextMenuContentProps
>(({ className, ...props }, ref) => {
  return (
    <ContextMenuContent ref={ref} className={cn('border-base-border', className)} {...props} />
  );
});
MLContextMenuContent.displayName = 'MLContextMenuContent';

const MLContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuItem>,
  ContextMenuItemProps
>(({ className, ...props }, ref) => {
  return <ContextMenuItem ref={ref} className={className} {...props} />;
});
MLContextMenuItem.displayName = 'MLContextMenuItem';

function MLContextMenuCheckboxItem({ className, ...props }: ContextMenuCheckboxItemProps) {
  return <ContextMenuCheckboxItem className={className} {...props} />;
}

function MLContextMenuRadioItem({ className, ...props }: ContextMenuRadioItemProps) {
  return <ContextMenuRadioItem className={className} {...props} />;
}

function MLContextMenuLabel({ className, ...props }: ContextMenuLabelProps) {
  return <ContextMenuLabel className={cn('text-base-foreground', className)} {...props} />;
}

function MLContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return <ContextMenuSeparator className={cn('bg-base-border', className)} {...props} />;
}

function MLContextMenuShortcut({ className, ...props }: ContextMenuShortcutProps) {
  return <ContextMenuShortcut className={cn('text-base-muted-foreground', className)} {...props} />;
}

export {
  MLContextMenu,
  MLContextMenuTrigger,
  MLContextMenuContent,
  MLContextMenuItem,
  MLContextMenuCheckboxItem,
  MLContextMenuRadioItem,
  MLContextMenuLabel,
  MLContextMenuSeparator,
  MLContextMenuShortcut,
  MLContextMenuGroup,
  MLContextMenuPortal,
  MLContextMenuSub,
  MLContextMenuSubContent,
  MLContextMenuSubTrigger,
  MLContextMenuRadioGroup,
};
