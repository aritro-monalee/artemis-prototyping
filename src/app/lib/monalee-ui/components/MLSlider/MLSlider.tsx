'use client';

import * as React from 'react';
import { Slider as SliderBase } from '../ui/slider';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderBase> {
  /** Show labels for min/max values */
  showLabels?: boolean;
  /** Custom label formatter */
  formatLabel?: (value: number) => string;
}

/**
 * Slider component
 *
 * An input where the user selects a value from within a given range.
 *
 * @example
 * // Single value slider
 * <Slider defaultValue={[50]} max={100} />
 *
 * // Range slider
 * <Slider defaultValue={[25, 75]} max={100} />
 *
 * // Vertical slider
 * <Slider orientation="vertical" defaultValue={[50]} />
 */
const Slider = React.forwardRef<React.ComponentRef<typeof SliderBase>, SliderProps>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      showLabels = false,
      formatLabel = (v) => String(v),
      orientation,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative', orientation === 'vertical' ? 'h-full' : 'w-full')}>
        <SliderBase
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          orientation={orientation}
          className={className}
          {...props}
        />
        {showLabels && (
          <div
            className={cn(
              'flex justify-between text-xs text-muted-foreground',
              orientation === 'vertical' ? 'flex-col h-full absolute left-6 top-0' : 'mt-1'
            )}
          >
            <MLText as="span">{formatLabel(min)}</MLText>
            <MLText as="span">{formatLabel(max)}</MLText>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
