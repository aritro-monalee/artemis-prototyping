import React, { forwardRef, ReactNode } from 'react';
import { X } from 'lucide-react';

import { cn } from '../../utils/cn';
import { MLText } from '../MLText';
import { MLIconContainer } from '../MLIconContainer';

export interface MLChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onRemove'> {
  /**
   * Label of the chip
   */
  label: ReactNode;
  /**
   * Value of the chip
   */
  value?: number | string;
  /**
   * Size of the chip
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the chip is closeable
   */
  closable?: boolean;
  /**
   * Callback function for when the chip is closed
   */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Color of the chip
   */
  color?: 'default' | 'black' | 'success' | 'gray';
}

const sizeClasses = {
  sm: 'px-[2px] py-[3px] gap-x-[2px] [&>.label]:text-[12px] [&>.value]:text-[8px]',
  md: 'px-[2px] py-[2px] gap-x-[2px] [&>.label]:text-[14px] [&>.value]:text-[10px]',
  lg: 'px-[4px] py-[4px] gap-x-[2px] [&>.label]:text-[14px] [&>.value]:text-[10px]',
};

const outerColorClasses = {
  default: 'bg-artemis-50',
  black: 'border border-black bg-white',
  success: 'bg-green-50',
  gray: 'bg-base-muted',
};

const textColorClasses = {
  default: 'text-artemis-700',
  black: 'text-black',
  success: 'text-green-700',
  gray: 'text-base-muted-foreground',
};

const bgColorClasses = {
  default: 'bg-artemis-600 text-white',
  black: 'bg-black text-white',
  success: 'bg-green-600 text-white',
  gray: 'bg-base-muted-foreground text-base-muted-foreground',
};

const closeIconColor = {
  default: 'text-artemis-700 hover:text-artemis-900',
  black: 'text-black hover:text-gray-700',
  success: 'text-green-700 hover:text-green-900',
  gray: 'text-base-muted-foreground hover:text-base-foreground',
};

/**
 * Chip - A compact element for displaying a label with optional value and close button.
 *
 * @example
 * ```tsx
 * <Chip label="Tag" />
 * <Chip label="With Value" value={5} />
 * <Chip label="Closable" closable onRemove={() => {}} />
 * ```
 */
export const MLChip = forwardRef<HTMLDivElement, MLChipProps>(
  (
    { label, value, size = 'lg', closable, onRemove, color = 'default', className, ...props },
    ref
  ) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md',
          outerColorClasses[color],
          sizeClasses[size],
          // Entry animation when dynamically added
          'animate-[scale-in_150ms_ease-out]',
          'motion-reduce:animate-none',
          className
        )}
        {...props}
      >
        <MLText as="span" className={cn('label font-medium px-1', textColorClasses[color])}>
          {label}
        </MLText>
        {value !== undefined && value !== null && (
          <MLText
            as="span"
            className={cn(
              'value flex justify-center items-center p-[5px] w-fit h-[20px] rounded text-[10px]',
              bgColorClasses[color]
            )}
          >
            {value}
          </MLText>
        )}
        {closable && (
          <button
            type="button"
            className={cn(
              'close-btn cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
              closeIconColor[color],
              // Smooth transition for color
              'transition-colors duration-150 ease-out',
              'motion-reduce:transition-none'
            )}
            onClick={handleRemove}
            aria-label="Remove"
          >
            <MLIconContainer icon={<X />} size={size === 'sm' ? 'sm' : 'lg'} />
          </button>
        )}
      </div>
    );
  }
);

MLChip.displayName = 'MLChip';
