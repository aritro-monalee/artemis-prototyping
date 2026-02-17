import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/cn';

const buttonVariants = cva(
  [
    // Base layout and typography
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium leading-5',
    // Icon styling
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
    // Focus styling
    'outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    // Cursor
    'cursor-pointer',
    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',
    // GPU-accelerated transforms
    'relative isolate origin-center transform-gpu',
    // Smooth transition for press effect and colors
    'transition-[transform,background-color,box-shadow] duration-150 ease-out',
    // Press animation (scale down on active)
    'active:scale-[0.97]',
    // Motion reduce support
    'motion-reduce:transition-none motion-reduce:active:scale-100',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-artemis-600 text-white shadow-xs hover:bg-artemis-700 hover:shadow-[var(--shadow-primary-glow)] focus-visible:ring-artemis-500',
        secondary:
          'bg-base-secondary text-base-secondary-foreground hover:bg-base-secondary/80 focus-visible:ring-base-ring',
        destructive: 'bg-red-600 text-red-50 shadow-xs hover:bg-red-700 hover:shadow-[0_0_0_3px_rgba(220,38,38,0.15),0_4px_12px_0_rgba(220,38,38,0.2)] focus-visible:ring-red-500',
        success: 'bg-green-600 text-white shadow-xs hover:bg-green-700 hover:shadow-[0_0_0_3px_rgba(22,163,74,0.15),0_4px_12px_0_rgba(22,163,74,0.2)] focus-visible:ring-green-500',
        warning: 'bg-yellow-500 text-yellow-950 shadow-xs hover:bg-yellow-600 hover:shadow-[0_0_0_3px_rgba(234,179,8,0.15),0_4px_12px_0_rgba(234,179,8,0.2)] focus-visible:ring-yellow-500',
        outline:
          'border border-base-border bg-base-background text-base-foreground shadow-[var(--shadow-surface)] hover:bg-cream-100 hover:text-base-foreground focus-visible:ring-base-ring',
        ghost:
          'text-base-foreground hover:bg-cream-100 hover:text-base-foreground focus-visible:ring-base-ring',
        link: 'text-base-foreground underline-offset-4 hover:underline focus-visible:ring-base-ring active:scale-100',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 active:scale-[0.98]',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4 active:scale-[0.96]',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Disable all animations (press scale, transitions).
   * Useful for performance or when animations are distracting.
   */
  disableAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disableAnimation = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-disable-animation={disableAnimation || undefined}
        className={cn(
          buttonVariants({ variant, size, className }),
          disableAnimation && 'transition-none active:scale-100'
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
