'use client';

import * as React from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import type { GroupProps, PanelProps, SeparatorProps } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';

import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface ResizablePanelGroupProps extends GroupProps {}

export interface ResizablePanelProps extends PanelProps {}

export interface ResizableHandleProps extends SeparatorProps {
  /**
   * Whether to show the handle grip icon
   */
  withHandle?: boolean;
}

// ============================================
// ResizablePanelGroup
// ============================================

function ResizablePanelGroup({
  className,
  orientation = 'horizontal',
  ...props
}: ResizablePanelGroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      orientation={orientation}
      className={cn(
        'flex h-full w-full rounded-lg border border-border bg-background',
        'data-[orientation=vertical]:flex-col',
        className
      )}
      {...props}
    />
  );
}
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// ============================================
// ResizablePanel
// ============================================

function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <Panel data-slot="resizable-panel" className={cn('overflow-hidden', className)} {...props} />
  );
}
ResizablePanel.displayName = 'ResizablePanel';

// ============================================
// ResizableHandle
// ============================================

function ResizableHandle({ withHandle = true, className, ...props }: ResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        // Base styles - horizontal (vertical divider line)
        'relative flex w-px items-center justify-center bg-border',
        // Expand hit area for easier grabbing
        'after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2',
        // Focus styles
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        // Vertical orientation (horizontal divider line)
        'data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full',
        'data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-3',
        'data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2',
        'data-[orientation=vertical]:after:translate-x-0',
        // Rotate handle icon for vertical orientation
        '[&[data-orientation=vertical]>div]:rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border border-border bg-border">
          <GripVertical className="size-2.5 text-base-foreground" />
        </div>
      )}
    </Separator>
  );
}
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
