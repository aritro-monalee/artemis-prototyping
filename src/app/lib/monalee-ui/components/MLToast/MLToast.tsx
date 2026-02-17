'use client';

import { Toaster as SonnerToaster, toast } from 'sonner';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export interface ToastProps {
  /**
   * The Title to display in the toast
   */
  title: string;
  /**
   * The message/description to display in the toast
   */
  message?: string;
  /**
   * The type of the toast
   */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
  /**
   * Action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Duration in milliseconds
   */
  duration?: number;
}

/**
 * Toaster component - Place this in your app's root layout
 *
 * An opinionated toast component for React using Sonner.
 *
 * @example
 * // In your layout
 * import { Toaster } from '@monalee/ui';
 * <Toaster />
 *
 * // To show toasts
 * import { toast } from '@monalee/ui';
 *
 * // Simple toast
 * toast('Event has been created');
 *
 * // With description
 * toast('Event has been created', {
 *   description: 'Monday, January 3rd at 6:00pm',
 * });
 *
 * // With action
 * toast('Event has been created', {
 *   action: {
 *     label: 'Undo',
 *     onClick: () => console.log('Undo'),
 *   },
 * });
 *
 * // Toast types
 * toast.success('Success!');
 * toast.error('Error!');
 * toast.warning('Warning!');
 * toast.info('Info');
 * toast.loading('Loading...');
 */
function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn('toaster group', className)}
      toastOptions={{
        classNames: {
          toast:
            // Figma (Sonner): shadow 0px 4px 12px -1px rgba(0,0,0,0.1) was reading too heavy in our UI.
            // Use a subtler token-consistent shadow for the library.
            'group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xs group-[.toaster]:rounded-md group-[.toaster]:p-4 group-[.toaster]:gap-2',
          title:
            'group-[.toast]:text-popover-foreground group-[.toast]:font-medium group-[.toast]:text-sm group-[.toast]:leading-5',
          description:
            'group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:leading-5',
          actionButton:
            '!bg-primary !text-white !rounded-[4px] !text-xs !font-medium !px-2 !h-6 !shadow-xs !border-0 !ml-auto',
          cancelButton:
            '!bg-secondary !text-secondary-foreground !rounded-[4px] !text-xs !font-medium !px-2 !h-6 !border-0 !shadow-xs',
          closeButton:
            'group-[.toast]:bg-popover group-[.toast]:text-muted-foreground group-[.toast]:border-border group-[.toast]:hover:bg-muted',
        },
      }}
      icons={{
        success: <CheckCircle2 className="size-5 text-green-600" />,
        error: <AlertCircle className="size-5 text-red-600" />,
        warning: <AlertTriangle className="size-5 text-amber-600" />,
        info: <Info className="size-5 text-blue-600" />,
        loading: <Loader2 className="size-5 animate-spin text-muted-foreground" />,
      }}
      {...props}
    />
  );
}

/**
 * Legacy MLToast component for backward compatibility
 * @deprecated Use `toast()` function instead
 */
export const MLToast = () => null;

export { Toaster, toast };
