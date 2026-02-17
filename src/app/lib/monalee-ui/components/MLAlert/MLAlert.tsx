'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import { MLIconContainer } from '../MLIconContainer';

/* ============================================
 * MLAlert Variants
 * ============================================ */
const alertVariants = cva(
  [
  'relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start',
    // Entry animation (fade in)
    'animate-[fade-in_150ms_ease-out]',
    // Motion reduce support
    'motion-reduce:animate-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-background text-base-foreground border-base-border',
        destructive: 'bg-red-50 text-destructive border-destructive',
        success: 'bg-green-50 text-green-700 border-green-300',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-300',
        info: 'bg-blue-50 text-blue-700 border-blue-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* ============================================
 * MLAlert - Main Alert Container
 * ============================================ */
export interface MLAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Lucide icon to display */
  icon?: LucideIcon;
  /** Alert title */
  title?: string;
  /** Alert description/content */
  description?: React.ReactNode;
  /** Action element (button, link, etc.) */
  action?: React.ReactNode;
  /** Disable entry animation */
  disableAnimation?: boolean;
}

export const MLAlert = React.forwardRef<HTMLDivElement, MLAlertProps>(
  ({ className, variant, icon: Icon, title, description, action, disableAnimation = false, children, ...props }, ref) => {
    const animationClasses = disableAnimation ? 'animate-none' : '';

    // If children are provided, use them directly (compound pattern)
    if (children) {
      return (
        <div
          ref={ref}
          role="alert"
          data-disable-animation={disableAnimation || undefined}
          className={cn(alertVariants({ variant }), animationClasses, className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Otherwise use the simple props-based API
    return (
      <div 
        ref={ref} 
        role="alert" 
        data-disable-animation={disableAnimation || undefined}
        className={cn(alertVariants({ variant }), animationClasses, className)} 
        {...props}
      >
        <div className="flex flex-1 gap-3 items-start">
          {Icon && (
            <div className="flex items-start pt-0.5 shrink-0">
              <MLIconContainer icon={<Icon />} size="base" />
            </div>
          )}
          <div className="flex flex-col flex-1 gap-1">
            {title && <p className="font-medium leading-5 truncate">{title}</p>}
            {description && (
              <div
                className={cn(
                  'text-sm leading-5',
                  variant === 'default' ? 'text-muted-foreground' : ''
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);
MLAlert.displayName = 'MLAlert';

/* ============================================
 * MLAlertTitle - Alert Title
 * ============================================ */
export interface MLAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const MLAlertTitle = React.forwardRef<HTMLParagraphElement, MLAlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('font-medium leading-5 tracking-tight', className)} {...props} />
  )
);
MLAlertTitle.displayName = 'MLAlertTitle';

/* ============================================
 * MLAlertDescription - Alert Description/Content
 * ============================================ */
export interface MLAlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const MLAlertDescription = React.forwardRef<HTMLParagraphElement, MLAlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm text-muted-foreground [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);
MLAlertDescription.displayName = 'MLAlertDescription';

/* ============================================
 * MLAlertIcon - Icon wrapper for compound pattern
 * ============================================ */
export interface MLAlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
}

export const MLAlertIcon = React.forwardRef<HTMLDivElement, MLAlertIconProps>(
  ({ className, icon: Icon, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-start pt-0.5 shrink-0', className)} {...props}>
      <MLIconContainer icon={<Icon />} size="base" />
    </div>
  )
);
MLAlertIcon.displayName = 'MLAlertIcon';

/* ============================================
 * MLAlertAction - Action wrapper
 * ============================================ */
export interface MLAlertActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MLAlertAction = React.forwardRef<HTMLDivElement, MLAlertActionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('shrink-0 ml-auto', className)} {...props} />
  )
);
MLAlertAction.displayName = 'MLAlertAction';

export { alertVariants };
