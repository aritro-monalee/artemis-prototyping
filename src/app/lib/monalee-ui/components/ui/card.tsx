import * as React from 'react';

import { cn } from '../../utils/cn';

// ============================================
// Card Root
// ============================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Enable hover lift effect with shadow and subtle translateY
   */
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      data-interactive={interactive || undefined}
      className={cn(
        'bg-base-card text-base-card-foreground flex flex-col gap-6 rounded-xl border border-base-border-subtle py-6 shadow-[var(--shadow-surface)]',
        // Interactive variant: hover lift effect
        interactive && [
          'transform-gpu will-change-transform',
          'transition-[transform,box-shadow] duration-200 ease-out',
          'hover:-translate-y-1 hover:shadow-lg',
          'active:translate-y-0 active:shadow-md',
          // Motion reduce support
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        ],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// ============================================
// Card Header
// ============================================

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        'flex flex-col gap-1.5 px-6',
        // When CardAction is inside, use grid layout
        'has-data-[slot=card-action]:flex-row has-data-[slot=card-action]:items-center has-data-[slot=card-action]:justify-between',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// ============================================
// Card Title
// ============================================

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn('text-base font-semibold leading-none text-base-card-foreground', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// ============================================
// Card Description
// ============================================

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn('text-sm text-base-muted-foreground leading-5', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// ============================================
// Card Action
// ============================================

const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
);
CardAction.displayName = 'CardAction';

// ============================================
// Card Content
// ============================================

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn('px-6', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// ============================================
// Card Footer
// ============================================

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center px-6', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
export type { CardProps };