import * as React from 'react';
import { AspectRatio as AspectRatioPrimitive } from '../ui/aspect-ratio';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export type AspectRatioValue =
  | '1:1'
  | '4:3'
  | '3:4'
  | '5:4'
  | '4:5'
  | '3:2'
  | '2:3'
  | '16:10'
  | '10:16'
  | '16:9'
  | '9:16'
  | '2:1'
  | '1:2'
  | '1.618:1'
  | '1:1.618'
  | '21:9'
  | '9:21';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The aspect ratio to use (e.g., "16:9", "4:3", "1:1")
   * @default "1:1"
   */
  ratio?: AspectRatioValue | number;
}

// ============================================
// Utility
// ============================================

/**
 * Converts a ratio string (e.g., "16:9") to a number (e.g., 16/9)
 */
function parseRatio(ratio: AspectRatioValue | number): number {
  if (typeof ratio === 'number') {
    return ratio;
  }

  const ratioMap: Record<AspectRatioValue, number> = {
    '1:1': 1,
    '4:3': 4 / 3,
    '3:4': 3 / 4,
    '5:4': 5 / 4,
    '4:5': 4 / 5,
    '3:2': 3 / 2,
    '2:3': 2 / 3,
    '16:10': 16 / 10,
    '10:16': 10 / 16,
    '16:9': 16 / 9,
    '9:16': 9 / 16,
    '2:1': 2,
    '1:2': 1 / 2,
    '1.618:1': 1.618,
    '1:1.618': 1 / 1.618,
    '21:9': 21 / 9,
    '9:21': 9 / 21,
  };

  return ratioMap[ratio] ?? 1;
}

// ============================================
// Component
// ============================================

/**
 * AspectRatio - Displays content within a desired ratio.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="16:9" className="bg-muted">
 *   <img
 *     src="/image.jpg"
 *     alt="Photo"
 *     className="h-full w-full rounded-md object-cover"
 *   />
 * </AspectRatio>
 * ```
 */
const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = '1:1', className, children, ...props }, ref) => {
    const numericRatio = parseRatio(ratio);

    return (
      <AspectRatioPrimitive ratio={numericRatio} asChild>
        <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
          {children}
        </div>
      </AspectRatioPrimitive>
    );
  }
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
