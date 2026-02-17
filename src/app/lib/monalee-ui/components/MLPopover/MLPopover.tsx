'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  Popover as PopoverBase,
  PopoverTrigger as PopoverTriggerBase,
  PopoverContent as PopoverContentBase,
  PopoverAnchor as PopoverAnchorBase,
} from '../ui/popover';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverBase> {}

export interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTriggerBase> {}

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContentBase> {}

export interface PopoverAnchorProps
  extends React.ComponentPropsWithoutRef<typeof PopoverAnchorBase> {}

export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the popover
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
}

export interface PopoverCloseProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> {}

// ============================================
// Components
// ============================================

/**
 * Popover - Displays rich content in a portal, triggered by a button.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader
 *       title="Dimensions"
 *       description="Set the dimensions for the layer."
 *     />
 *     <div>Your content here</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({ ...props }: PopoverProps) {
  return <PopoverBase {...props} />;
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTriggerBase>,
  PopoverTriggerProps
>(({ className, ...props }, ref) => (
  <PopoverTriggerBase ref={ref} className={className} {...props} />
));
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverContentBase>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <PopoverContentBase
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
PopoverContent.displayName = 'PopoverContent';

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverAnchorBase>,
  PopoverAnchorProps
>(({ ...props }, ref) => <PopoverAnchorBase ref={ref} {...props} />);
PopoverAnchor.displayName = 'PopoverAnchor';

// PopoverClose uses Radix directly as it's not exported from ui/popover
const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  PopoverCloseProps
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Close ref={ref} data-slot="popover-close" className={className} {...props} />
));
PopoverClose.displayName = 'PopoverClose';

/**
 * PopoverHeader - A header section for popovers with title and optional description.
 */
const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
      {title && (
        <h4 className="text-base font-medium leading-none text-popover-foreground">{title}</h4>
      )}
      {description && <p className="text-sm text-muted-foreground leading-5">{description}</p>}
      {children}
    </div>
  )
);
PopoverHeader.displayName = 'PopoverHeader';

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose, PopoverHeader };
