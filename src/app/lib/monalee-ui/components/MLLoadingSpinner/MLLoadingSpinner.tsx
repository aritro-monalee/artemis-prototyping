import React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingSpinnerProps {
  /**
   * Class name
   */
  className?: string;
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color of the spinner
   */
  color?: 'white' | 'primary' | 'black';
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'size-5';
    case 'md':
      return 'size-6';
    case 'lg':
      return 'size-8';
    default:
      return 'size-4';
  }
};

/**
 * LoadingSpinner - An animated loading indicator.
 *
 * Note: Animation is applied to a wrapper div instead of the SVG element
 * directly for better GPU acceleration (per Vercel React best practices 6.1).
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="sm" color="primary" />
 * <LoadingSpinner size="md" color="white" />
 * ```
 */
export const LoadingSpinner = ({
  className,
  size = 'sm',
  color = 'white',
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'animate-spin inline-flex items-center justify-center',
        {
          'text-white': color === 'white',
          'text-artemis-600': color === 'primary',
          'text-black': color === 'black',
        },
        getSizeClasses(size),
        className
      )}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1078 8.01301C14.1078 11.4719 11.3038 14.2759 7.84492 14.2759C4.38602 14.2759 1.58203 11.4719 1.58203 8.01301C1.58203 4.55411 4.38602 1.75012 7.84492 1.75012"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
