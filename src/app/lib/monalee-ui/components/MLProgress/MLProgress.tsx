'use client';

import * as React from 'react';
import { Progress as ProgressBase } from '../ui/progress';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressBase> {
  /**
   * The progress value (0-100)
   */
  value?: number;
  /**
   * Show the progress percentage as text
   */
  showValue?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color variant
   */
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  /**
   * Show indeterminate loading animation (animated stripe moving left to right).
   * When true, the `value` prop is ignored.
   */
  isIndeterminate?: boolean;
  /**
   * Show striped pattern on the progress bar
   */
  isStriped?: boolean;
}

// ============================================
// Size and variant classes
// ============================================

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses = {
  default: '[&>[data-slot=progress-indicator]]:bg-primary',
  success: '[&>[data-slot=progress-indicator]]:bg-green-500',
  warning: '[&>[data-slot=progress-indicator]]:bg-yellow-500',
  destructive: '[&>[data-slot=progress-indicator]]:bg-destructive',
};

// Striped gradient backgrounds for each variant
const stripedClasses = {
  default:
    '[&>[data-slot=progress-indicator]]:bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [&>[data-slot=progress-indicator]]:bg-[length:1rem_1rem]',
  success:
    '[&>[data-slot=progress-indicator]]:bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [&>[data-slot=progress-indicator]]:bg-[length:1rem_1rem]',
  warning:
    '[&>[data-slot=progress-indicator]]:bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [&>[data-slot=progress-indicator]]:bg-[length:1rem_1rem]',
  destructive:
    '[&>[data-slot=progress-indicator]]:bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] [&>[data-slot=progress-indicator]]:bg-[length:1rem_1rem]',
};

// ============================================
// Component
// ============================================

/**
 * Progress - Displays an indicator showing the completion progress of a task.
 *
 * @example
 * ```tsx
 * // Determinate progress
 * <Progress value={75} />
 * 
 * // Indeterminate loading
 * <Progress isIndeterminate />
 * 
 * // Striped progress
 * <Progress value={50} isStriped />
 * ```
 */
const Progress = React.forwardRef<React.ElementRef<typeof ProgressBase>, ProgressProps>(
  (
    {
      className,
      value = 0,
      showValue = false,
      size = 'md',
      variant = 'default',
      isIndeterminate = false,
      isStriped = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex items-center gap-2', showValue && 'w-full')}>
        <ProgressBase
          ref={ref}
          value={isIndeterminate ? 100 : value}
          indeterminate={isIndeterminate}
          className={cn(
            sizeClasses[size],
            variantClasses[variant],
            isStriped && stripedClasses[variant],
            // Animate stripes when indeterminate or optionally for striped
            (isIndeterminate || isStriped) &&
              '[&>[data-slot=progress-indicator]]:animate-[stripe-move_1s_linear_infinite] motion-reduce:[&>[data-slot=progress-indicator]]:animate-none',
            className
          )}
          {...props}
        />
        {showValue && !isIndeterminate && (
          <MLText as="span" className="text-sm text-muted-foreground tabular-nums min-w-[3ch]">
            {Math.round(value || 0)}%
          </MLText>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
