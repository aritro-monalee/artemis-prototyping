import React from 'react';
import { cn } from '../../utils/cn';
import { isNullOrUndefined } from '../../utils/is-null-or-undefined';
import { isNumber } from '../../utils/is-type';

export interface LoadingPlaceholderProps {
  /** Width of the placeholder */
  width?: string | number;
  /** Height of the placeholder */
  height?: string | number;
  /** Visual variant of the skeleton */
  variant?: 'default' | 'card' | 'text' | 'custom';
  /** Additional class names */
  className?: string;
}

/**
 * Base skeleton element with animation
 */
const SkeletonElement = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('animate-pulse rounded-md bg-cream-200', className)} {...props} />;
};

/**
 * Default variant - Avatar with two text lines
 */
const SkeletonDefault = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <SkeletonElement className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <SkeletonElement className="h-4 w-[150px]" />
        <SkeletonElement className="h-4 w-[100px]" />
      </div>
    </div>
  );
};

/**
 * Card variant - Two text lines with a large square
 */
const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-2 w-full">
        <SkeletonElement className="h-4 w-full" />
        <SkeletonElement className="h-4 w-full" />
      </div>
      <SkeletonElement className="aspect-square w-full rounded-md" />
    </div>
  );
};

/**
 * Text variant - Just two text lines
 */
const SkeletonText = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <SkeletonElement className="h-4 w-[222px]" />
      <SkeletonElement className="h-4 w-[167px]" />
    </div>
  );
};

/**
 * LoadingPlaceholder / Skeleton component
 *
 * Use to show a placeholder while content is loading.
 *
 * @example
 * // Custom size
 * <LoadingPlaceholder width={200} height={100} />
 *
 * // Default variant (avatar + text)
 * <LoadingPlaceholder variant="default" />
 *
 * // Card variant (text + large square)
 * <LoadingPlaceholder variant="card" />
 *
 * // Text variant (just text lines)
 * <LoadingPlaceholder variant="text" />
 */
export const LoadingPlaceholder = ({
  width,
  height,
  variant = 'custom',
  className,
}: LoadingPlaceholderProps) => {
  // If variant is specified (not custom), use the predefined variants
  if (variant === 'default') {
    return <SkeletonDefault className={className} />;
  }

  if (variant === 'card') {
    return <SkeletonCard className={className} />;
  }

  if (variant === 'text') {
    return <SkeletonText className={className} />;
  }

  // Custom variant - original behavior with width/height props
  return (
    <SkeletonElement
      className={className}
      style={{
        width: isNullOrUndefined(width) ? '100%' : isNumber(width) ? `${width}px` : width,
        height: isNullOrUndefined(height) ? '100%' : isNumber(height) ? `${height}px` : height,
      }}
    />
  );
};

// Also export as Skeleton alias for shadcn compatibility
export const Skeleton = LoadingPlaceholder;

// Export the base element for composition
export { SkeletonElement };
