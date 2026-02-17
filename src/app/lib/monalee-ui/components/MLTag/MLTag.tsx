import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface MLTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Tag text
   */
  text: string;
  /**
   * Tag color
   */
  color?: 'default' | 'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'lightgray';
  /**
   * Tag Size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Tag full width
   */
  fullwidth?: boolean;
}

const colorClasses = {
  default: 'bg-accent text-accent-foreground',
  green: 'bg-green-500 text-white',
  purple: 'bg-artemis-50 text-artemis-600',
  blue: 'bg-blue-500 text-white',
  yellow: 'bg-yellow-500 text-white',
  red: 'bg-red-500 text-white',
  lightgray: 'bg-gray-500 text-white',
};

const sizeClasses = {
  xs: 'px-[5px] py-[3px] text-xs/[0.8rem]',
  sm: 'px-[7px] py-[5px] text-sm/[1rem]',
  md: 'px-[10px] py-[5px] text-md/[1.3rem]',
  lg: 'px-[12px] py-[7px] text-lg/[1.5rem]',
};

/**
 * Tag - A small visual label for categorization or status.
 *
 * @example
 * ```tsx
 * <Tag text="New" color="green" />
 * <Tag text="Warning" color="yellow" size="lg" />
 * ```
 */
export const MLTag = forwardRef<HTMLSpanElement, MLTagProps>(
  ({ text, color = 'blue', fullwidth, size = 'sm', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex justify-center items-center rounded-lg gap-2.5 font-medium',
          colorClasses[color],
          sizeClasses[size],
          fullwidth && 'w-full',
          className
        )}
        {...props}
      >
        {text}
      </span>
    );
  }
);

MLTag.displayName = 'MLTag';
