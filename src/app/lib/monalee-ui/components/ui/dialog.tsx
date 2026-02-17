'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';
import { MLText } from '../MLText';
import { MLIconContainer } from '../MLIconContainer';

// ============================================
// Dialog Root
// ============================================

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

// ============================================
// Dialog Trigger
// ============================================

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />
));
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

// ============================================
// Dialog Portal
// ============================================

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

// ============================================
// Dialog Close
// ============================================

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ ...props }, ref) => <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />);
DialogClose.displayName = DialogPrimitive.Close.displayName;

// ============================================
// Dialog Overlay
// ============================================

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-black/50',
      // Backdrop blur animation
      'backdrop-blur-sm',
      // Entry/exit animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      // Duration with smooth easing
      'duration-200',
      // Motion reduce support
      'motion-reduce:animate-none',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ============================================
// Dialog Content
// ============================================

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        // Base styles
        'fixed top-1/2 left-1/2 z-50 w-full max-w-[425px]',
        'translate-x-[-50%] translate-y-[-50%]',
        // Visual styles - rounded-3xl and overlay shadow like HeroUI
        'bg-base-background border border-base-border-subtle rounded-3xl shadow-[var(--shadow-overlay)]',
        // Layout
        'flex flex-col gap-4 p-6',
        // Overflow
        'overflow-y-auto max-h-[calc(100vh-4rem)]',
        // Animations with smooth easing
        'duration-250',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        // Scale from 95% entering, 98% exiting for natural feel
        'data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.95]',
        // Slight slide up on entry
        'data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]',
        // Motion reduce support
        'motion-reduce:animate-none motion-reduce:zoom-in-100 motion-reduce:zoom-out-100',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={cn(
            'absolute top-4 right-4',
            'rounded-xs opacity-70 transition-opacity duration-150',
            'hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-base-ring focus:ring-offset-2 ring-offset-base-background',
            'disabled:pointer-events-none',
            'text-base-foreground'
          )}
        >
          <MLIconContainer icon={<X />} size="base" />
          <MLText as="span" className="sr-only">
            Close
          </MLText>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// ============================================
// Dialog Header
// ============================================

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-1.5 text-left', className)}
      {...props}
    />
  );
}

// ============================================
// Dialog Footer
// ============================================

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-footer" className={cn('flex gap-2 justify-end', className)} {...props} />
  );
}

// ============================================
// Dialog Title
// ============================================

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn('text-lg font-semibold leading-none text-base-foreground', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// ============================================
// Dialog Description
// ============================================

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn('text-sm text-base-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
