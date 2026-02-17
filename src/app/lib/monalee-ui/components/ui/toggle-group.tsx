'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '../../utils/cn';

interface ToggleGroupContextValue {
  variant: 'default' | 'outline' | 'ghost';
  size: 'default' | 'sm' | 'lg';
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'default',
});

interface ToggleGroupSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

interface ToggleGroupBaseProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  rovingFocus?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ToggleGroupProps = ToggleGroupBaseProps & (ToggleGroupSingleProps | ToggleGroupMultipleProps);

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const containerClasses = cn(
      'inline-flex items-center',
      // Default: gap between items, Outline/Ghost: no gap (items are connected)
      variant === 'default' ? 'gap-1' : 'gap-0',
      className
    );

    return (
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <ToggleGroupPrimitive.Root ref={ref} className={containerClasses} {...props} />
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  isFirst?: boolean;
  isLast?: boolean;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, isFirst, isLast, ...props }, ref) => {
  const { variant, size } = React.useContext(ToggleGroupContext);

  const sizeClasses = {
    default: 'h-9 px-2',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-10 px-4',
  };

  const itemClasses = cn(
    // Base styles
    'inline-flex items-center justify-center text-sm font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'text-foreground',
    // Smooth transition for colors
    'transition-[background-color,color] duration-150 ease-out',
    // Size
    sizeClasses[size],
    // Variant-specific styles
    {
      // Default variant: rounded, transparent, no border
      'bg-transparent rounded-md': variant === 'default',
      // Outline variant: EACH item has border and shadow
      'bg-background border border-input shadow-xs': variant === 'outline',
      // Ghost variant: transparent, no border
      'bg-transparent': variant === 'ghost',
    },
    // Position-based rounding for outline and ghost variants
    (variant === 'outline' || variant === 'ghost') &&
      isFirst &&
      !isLast &&
      'rounded-l-md rounded-r-none',
    (variant === 'outline' || variant === 'ghost') &&
      isLast &&
      !isFirst &&
      'rounded-r-md rounded-l-none',
    (variant === 'outline' || variant === 'ghost') && isFirst && isLast && 'rounded-md',
    (variant === 'outline' || variant === 'ghost') && !isFirst && !isLast && 'rounded-none',
    // Hover state
    'hover:bg-muted',
    // Selected state - accent background
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    // Motion reduce support
    'motion-reduce:transition-none',
    className
  );

  return <ToggleGroupPrimitive.Item ref={ref} className={itemClasses} {...props} />;
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
