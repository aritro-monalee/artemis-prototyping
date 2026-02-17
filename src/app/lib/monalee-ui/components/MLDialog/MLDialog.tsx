'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import {
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
} from '../ui/dialog';
import { MLButton } from '../MLButton';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

// ============================================
// Primitive Component Types (for compositional API)
// ============================================

export type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogTrigger>;
export type DialogPortalProps = React.ComponentPropsWithoutRef<typeof DialogPortal>;
export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogClose>;
export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogOverlay>;
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogContent>;
export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogTitle>;
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogDescription>;

// ============================================
// Size and backdrop classes
// ============================================

const sizeClasses = {
  sm: 'max-w-[400px]',
  md: 'max-w-[500px]',
  lg: 'max-w-[650px]',
  xl: 'max-w-[800px]',
  fullscreen: 'max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)] w-full h-full',
};

const backdropClasses = {
  transparent: 'bg-transparent',
  opaque: 'bg-black/80',
  dark: 'bg-black/50',
  light: 'bg-white/50',
  blur: 'bg-black/30 backdrop-blur-sm',
};

// ============================================
// Types
// ============================================

export interface MLDialogProps {
  /**
   * Title of the dialog
   */
  title?: string | React.ReactNode;
  /**
   * Description text shown below the title
   */
  description?: string | React.ReactNode;
  /**
   * Boolean indicating whether to show dialog (controlled mode)
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Dialog size preset
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  /**
   * Optional text for the confirm button
   */
  confirmText?: string;
  /**
   * Optional text for the cancel button
   */
  cancelText?: string;
  /**
   * The content to be displayed within the dialog
   */
  children: React.ReactNode;
  /**
   * Optional boolean indicating whether a confirm button should be displayed
   */
  showConfirm?: boolean;
  /**
   * Optional boolean indicating whether the confirm button should be disabled
   */
  confirmDisabled?: boolean;
  /**
   * Optional boolean indicating whether a cancel button should be displayed
   */
  showCancel?: boolean;
  /**
   * Optional boolean indicating whether a close button should be displayed
   */
  showClose?: boolean;
  /**
   * Optional function that will be executed when the confirm button is clicked
   */
  onConfirm?: () => void;
  /**
   * Optional function that will be executed when the cancel button is clicked
   */
  onCancel?: () => void;
  /**
   * Optional custom class name for the dialog content
   */
  className?: string;
  /**
   * Variant for the confirm button
   */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * The backdrop style of the dialog.
   * - `transparent`: No backdrop (fully transparent)
   * - `opaque`: Dark opaque backdrop (80% black)
   * - `dark`: Semi-transparent dark backdrop (50% black) - default
   * - `light`: Semi-transparent light backdrop (50% white)
   * - `blur`: Blur effect with subtle dark overlay
   */
  backdrop?: 'transparent' | 'opaque' | 'dark' | 'light' | 'blur';
  /**
   * Optional trigger element - if not provided, dialog must be controlled via open/onOpenChange
   */
  trigger?: React.ReactNode;
}

// ============================================
// MLDialog - High-level dialog/modal component
// ============================================

const MLDialog = React.forwardRef<HTMLDivElement, MLDialogProps>(
  (
    {
      title,
      description,
      open,
      onOpenChange,
      size = 'md',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      children,
      showConfirm = true,
      confirmDisabled = false,
      showCancel = true,
      showClose = true,
      onConfirm,
      onCancel,
      className,
      confirmVariant = 'default',
      backdrop = 'dark',
      trigger,
    },
    ref
  ) => {
    const handleCancel = React.useCallback(() => {
      onCancel?.();
      onOpenChange?.(false);
    }, [onCancel, onOpenChange]);

    const handleConfirm = React.useCallback(() => {
      onConfirm?.();
    }, [onConfirm]);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogPortal>
          <DialogOverlay className={cn(backdropClasses[backdrop])} />
          <DialogContent
            ref={ref}
            showCloseButton={false}
            className={cn(
              // Visual styles
              'bg-base-background border border-base-border rounded-lg shadow-modal',
              // Layout
              'flex flex-col gap-6 p-6',
              // Size
              sizeClasses[size],
              className
            )}
          >
            {/* Header with title and close button */}
            {(title || showClose) && (
              <DialogHeader className="flex flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-1.5">
                  {title && <DialogTitle>{title}</DialogTitle>}
                  {description && <DialogDescription>{description}</DialogDescription>}
                </div>
                {showClose && (
                  <DialogClose
                    className={cn(
                      'rounded-xs opacity-70 transition-opacity duration-150',
                      'hover:opacity-100',
                      'focus:outline-none focus:ring-2 focus:ring-base-ring focus:ring-offset-2 ring-offset-base-background',
                      'disabled:pointer-events-none',
                      'text-base-foreground'
                    )}
                    onClick={handleCancel}
                  >
                    <X className="size-4" />
                    <MLText as="span" className="sr-only">
                      Close
                    </MLText>
                  </DialogClose>
                )}
              </DialogHeader>
            )}

            {/* Content */}
            <div className="flex-1">{children}</div>

            {/* Footer with buttons */}
            {(showCancel || showConfirm) && (
              <DialogFooter>
                {showCancel && (
                  <DialogClose asChild>
                    <MLButton variant="outline" onClick={handleCancel}>
                      {cancelText}
                    </MLButton>
                  </DialogClose>
                )}
                {showConfirm && (
                  <MLButton
                    variant={confirmVariant}
                    onClick={handleConfirm}
                    disabled={confirmDisabled}
                  >
                    {confirmText}
                  </MLButton>
                )}
              </DialogFooter>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
);
MLDialog.displayName = 'MLDialog';

// ============================================
// Exports
// ============================================

// High-level composed component
export { MLDialog };

// Primitive components for compositional API
export {
  Dialog as DialogPrimitive,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
