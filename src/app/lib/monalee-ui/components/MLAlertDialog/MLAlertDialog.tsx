import * as React from 'react';
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';

// ============================================
// Types
// ============================================

export type AlertDialogProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive>;

export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<typeof AlertDialogTrigger>;

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogContent>;

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof AlertDialogTitle>;

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogDescription
>;

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof AlertDialogAction>;

export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof AlertDialogCancel>;

// ============================================
// Components
// ============================================

/**
 * AlertDialog - A modal dialog that interrupts the user with important content
 * and expects a response.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="outline">Delete Account</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
const AlertDialog = AlertDialogPrimitive;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
