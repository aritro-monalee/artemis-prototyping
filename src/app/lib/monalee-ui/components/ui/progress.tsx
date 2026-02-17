'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../utils/cn';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  /**
   * Show shimmer effect for indeterminate state
   */
  indeterminate?: boolean;
}

function Progress({
  className,
  value,
  indeterminate = false,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 bg-primary',
          // Smooth transition for value changes
          'transition-transform duration-300 ease-out',
          // Motion reduce support
          'motion-reduce:transition-none',
          // Shimmer for indeterminate state
          indeterminate && [
            'animate-[shimmer_2s_linear_infinite]',
            'bg-gradient-to-r from-primary via-primary/60 to-primary',
            'bg-[length:200%_100%]',
            'motion-reduce:animate-none motion-reduce:bg-primary',
          ]
        )}
        style={{ 
          transform: indeterminate ? 'translateX(0)' : `translateX(-${100 - (value || 0)}%)` 
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
export type { ProgressProps };
