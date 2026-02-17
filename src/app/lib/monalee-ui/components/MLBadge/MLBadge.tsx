import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ============================================
// Badge Variants
// ============================================

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 rounded-md border text-xs font-semibold leading-4 whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none overflow-hidden',
    // Entry animation
    'animate-[fade-in_150ms_ease-out]',
    // Transition for color changes
    'transition-colors duration-150 ease-out',
    // Motion reduce support
    'motion-reduce:animate-none motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-transparent bg-base-accent text-base-accent-foreground shadow-sm',
        secondary: 'border-transparent bg-base-secondary text-base-secondary-foreground',
        destructive: 'border-transparent bg-red-600 text-red-100 shadow-sm',
        success: 'border-transparent bg-green-600 text-white shadow-sm',
        warning: 'border-transparent bg-yellow-500 text-yellow-950 shadow-sm',
        outline: 'border-base-border bg-base-background text-base-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Badge Number Variants (circular pill)
// ============================================

const badgeNumberVariants = cva(
  [
  'inline-flex items-center justify-center rounded-full border text-xs font-semibold leading-4 whitespace-nowrap shrink-0 min-w-5 h-5 px-1 overflow-hidden',
    // Subtle pop animation for count changes
    'animate-[number-pop_200ms_ease-out]',
    // Motion reduce support
    'motion-reduce:animate-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-transparent bg-artemis-600 text-white shadow-sm',
        destructive: 'border-transparent bg-red-600 text-red-100 shadow-sm',
        success: 'border-transparent bg-green-600 text-white shadow-sm',
        warning: 'border-transparent bg-yellow-500 text-yellow-950 shadow-sm',
        outline: 'border-base-border bg-base-background text-base-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Types
// ============================================

export interface MLBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Render as a different element using Radix Slot
   */
  asChild?: boolean;
  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Optional trailing icon (e.g., arrow for links)
   */
  trailingIcon?: React.ReactNode;
  /**
   * Disable entry animations
   */
  disableAnimation?: boolean;
}

export interface BadgeNumberProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeNumberVariants> {
  /**
   * The count/number to display
   */
  count: number | string;
  /**
   * Maximum count to display before showing "+"
   */
  max?: number;
}

// ============================================
// Components
// ============================================

/**
 * MLBadge - Displays a badge or a component that looks like a badge.
 *
 * @example
 * ```tsx
 * <Badge variant="default">Badge</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Destructive</Badge>
 * <Badge variant="outline">Outline</Badge>
 *
 * // With icon
 * <Badge variant="outline" icon={<Check className="size-3" />}>
 *   Verified
 * </Badge>
 *
 * // As link
 * <Badge asChild variant="default" trailingIcon={<ArrowRight className="size-3" />}>
 *   <a href="/docs">Link</a>
 * </Badge>
 * ```
 */
const MLBadge = React.forwardRef<HTMLSpanElement, MLBadgeProps>(
  ({ className, variant, asChild = false, icon, trailingIcon, disableAnimation = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    const animationClasses = disableAnimation ? 'animate-none transition-none' : '';

    // When using asChild, we need to wrap content differently
    // Slot expects a single child element
    if (asChild) {
      return (
        <Comp
          ref={ref}
          data-slot="badge"
          data-disable-animation={disableAnimation || undefined}
          className={cn(badgeVariants({ variant }), 'px-2 py-0.5', animationClasses, className)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        data-disable-animation={disableAnimation || undefined}
        className={cn(badgeVariants({ variant }), 'px-2 py-0.5', animationClasses, className)}
        {...props}
      >
        {icon}
        {children}
        {trailingIcon}
      </Comp>
    );
  }
);
MLBadge.displayName = 'Badge';

/**
 * BadgeNumber - A circular badge for displaying notification counts.
 *
 * @example
 * ```tsx
 * <BadgeNumber count={8} />
 * <BadgeNumber count={99} variant="destructive" />
 * <BadgeNumber count={150} max={99} /> // Displays "99+"
 * <BadgeNumber count={20} variant="outline" />
 * ```
 */
const BadgeNumber = React.forwardRef<HTMLSpanElement, BadgeNumberProps>(
  ({ className, variant, count, max, ...props }, ref) => {
    const displayCount = max && typeof count === 'number' && count > max ? `${max}+` : count;

    return (
      <span
        ref={ref}
        data-slot="badge-number"
        className={cn(badgeNumberVariants({ variant }), className)}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);
BadgeNumber.displayName = 'BadgeNumber';

export { MLBadge, BadgeNumber, badgeVariants, badgeNumberVariants };
