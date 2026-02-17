'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface MLLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /**
   * Whether the associated field is required
   */
  required?: boolean;
}

// ============================================
// Component
// ============================================

/**
 * MLLabel - A label component for form fields.
 *
 * @example
 * ```tsx
 * <MLLabel htmlFor="email">Email address</MLLabel>
 * <MLLabel htmlFor="name" required>Full name</MLLabel>
 * ```
 */
const MLLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, MLLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        'flex items-center gap-0.5 text-sm leading-none font-medium select-none text-base-foreground',
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        required && "after:content-['*'] after:text-destructive after:ml-0.5",
        className
      )}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  )
);

MLLabel.displayName = 'MLLabel';

export { MLLabel };
