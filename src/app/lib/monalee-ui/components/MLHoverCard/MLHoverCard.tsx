'use client';

import * as React from 'react';
import {
  HoverCard as HoverCardBase,
  HoverCardTrigger as HoverCardTriggerBase,
  HoverCardContent as HoverCardContentBase,
} from '../ui/hover-card';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface HoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCardBase> {}

export interface HoverCardTriggerProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardTriggerBase> {}

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardContentBase> {}

// ============================================
// Components
// ============================================

/**
 * HoverCard - For sighted users to preview content available behind a link.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <a href="#" className="text-primary hover:underline">@nextjs</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="flex gap-4">
 *       <Avatar>...</Avatar>
 *       <div>
 *         <h4>@nextjs</h4>
 *         <p>The React Framework</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
function HoverCard({ ...props }: HoverCardProps) {
  return <HoverCardBase {...props} />;
}

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardTriggerBase>,
  HoverCardTriggerProps
>(({ className, ...props }, ref) => (
  <HoverCardTriggerBase
    ref={ref}
    className={cn(
      'text-primary font-medium text-sm cursor-pointer hover:underline transition-all',
      className
    )}
    {...props}
  />
));
HoverCardTrigger.displayName = 'HoverCardTrigger';

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardContentBase>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <HoverCardContentBase
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      // Override with ML styling
      'bg-popover text-popover-foreground z-50 w-80 rounded-md border border-base-border p-4 shadow-md outline-none',
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = 'HoverCardContent';

export { HoverCard, HoverCardTrigger, HoverCardContent };
