import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Button, buttonVariants } from '../ui/button';
import { MLLoadingSpinner as LoadingSpinner } from '../MLLoadingSpinner';
import { cn } from '../../utils/cn';
import type { VariantProps } from 'class-variance-authority';
import { MLToolTip } from '../MLToolTip/MLToolTip';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export interface MLButtonProps
  extends Omit<
      React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
      'prefix'
    >,
    VariantProps<typeof buttonVariants> {
  /**
   * Prefix elements like icon, text, etc.
   */
  prefix?: React.ReactNode;
  /**
   * Suffix elements like icon, text, etc.
   */
  suffix?: React.ReactNode;
  /**
   * Whether full width or not
   */
  fullwidth?: boolean;
  /**
   * Whether button is loading or not
   */
  loading?: boolean;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  /**
   * Optional click handler
   */
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional tooltip to show on hover of the Button. Especially helpful when in ghost mode.
   */
  tooltipContent?: string | React.ReactNode;
}

// ============================================
// Component
// ============================================

/**
 * Button - Primary UI component for user interaction
 *
 * @example
 * ```tsx
 * <Button variant="default">Primary</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="destructive">Destructive</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="link">Link</Button>
 *
 * // Sizes
 * <Button size="sm">Small</Button>
 * <Button size="default">Default</Button>
 * <Button size="lg">Large</Button>
 * <Button size="icon"><Icon /></Button>
 *
 * // With icons
 * <Button prefix={<ChevronLeft />}>Back</Button>
 * <Button suffix={<ChevronRight />}>Next</Button>
 *
 * // Loading state
 * <Button loading>Saving...</Button>
 * ```
 */
export const MLButton = forwardRef<HTMLButtonElement, MLButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullwidth = false,
      onClick,
      prefix,
      size = 'default',
      suffix,
      type = 'button',
      variant = 'default',
      loading = false,
      asChild = false,
      tooltipContent,
      ...rest
    },
    ref
  ) => {
    const baseClassName = cn(
      buttonVariants({ variant, size }),
      {
        'w-full': fullwidth,
      },
      className
    );

    // Determine spinner color based on variant
    const spinnerColor = variant === 'default' || variant === 'destructive' ? 'white' : 'primary';

    const content = (
      <>
        {prefix && !loading && prefix}
        {loading && (
          <MLText as="span" className="max-h-full">
            <LoadingSpinner size={size === 'lg' ? 'md' : 'sm'} color={spinnerColor} />
          </MLText>
        )}
        {children}
        {suffix && !loading && suffix}
      </>
    );

    if (asChild) {
      return (
        <MLToolTip tooltipContent={tooltipContent}>
          <Slot ref={ref} className={baseClassName} {...rest}>
            {children}
          </Slot>
        </MLToolTip>
      );
    }

    return (
      <MLToolTip tooltipContent={tooltipContent}>
        <Button
          {...rest}
          ref={ref}
          type={type}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          className={baseClassName}
          onClick={onClick}
        >
          {content}
        </Button>
      </MLToolTip>
    );
  }
);

MLButton.displayName = 'Button';

export { buttonVariants };
