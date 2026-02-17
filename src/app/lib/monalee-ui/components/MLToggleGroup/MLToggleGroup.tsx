import React, { forwardRef } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { cn } from '../../utils/cn';

export interface ToggleOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface MLToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir'> {
  /**
   * Array of toggle options
   */
  options: ToggleOption[];
  /**
   * Current selected value(s)
   * For single mode: string | undefined
   * For multiple mode: string[]
   */
  value?: string | string[];
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | string[]) => void;
  /**
   * Type of selection: 'single' or 'multiple'
   */
  type?: 'single' | 'multiple';
  /**
   * Variant of the toggle group
   * - 'default': Icon/ghost style with gap between items
   * - 'outline': Connected with borders (for text buttons)
   * - 'ghost': Connected without borders
   */
  variant?: 'default' | 'outline' | 'ghost';
  /**
   * Size of the toggle buttons
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * Whether the toggle group is disabled
   */
  disabled?: boolean;
  /**
   * Reading direction
   */
  dir?: 'ltr' | 'rtl';
}

/**
 * ToggleGroup - A set of two-state buttons that can be toggled on or off.
 *
 * @example
 * ```tsx
 * <ToggleGroup
 *   type="single"
 *   options={[
 *     { value: 'left', label: 'Left' },
 *     { value: 'center', label: 'Center' },
 *     { value: 'right', label: 'Right' },
 *   ]}
 *   value={alignment}
 *   onChange={setAlignment}
 * />
 * ```
 */
export const MLToggleGroup = forwardRef<HTMLDivElement, MLToggleGroupProps>(
  (
    {
      options,
      value,
      onChange,
      type = 'single',
      variant = 'outline',
      size = 'default',
      disabled = false,
      className,
      dir,
    },
    ref
  ) => {
    const handleValueChange = (newValue: string | string[]) => {
      if (disabled) return;
      onChange?.(newValue);
    };

    // Render single or multiple type based on prop
    // Using conditional rendering to satisfy discriminated union types
    if (type === 'multiple') {
      return (
        <ToggleGroup
          ref={ref}
          type="multiple"
          value={value as string[]}
          onValueChange={handleValueChange}
          disabled={disabled}
          variant={variant}
          size={size}
          dir={dir}
          className={cn(className)}
        >
          {options.map((option, index) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              disabled={disabled || option.disabled}
              isFirst={index === 0}
              isLast={index === options.length - 1}
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      );
    }

    return (
      <ToggleGroup
        ref={ref}
        type="single"
        value={value as string}
        onValueChange={handleValueChange}
        disabled={disabled}
        variant={variant}
        size={size}
        dir={dir}
        className={cn(className)}
      >
        {options.map((option, index) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            disabled={disabled || option.disabled}
            isFirst={index === 0}
            isLast={index === options.length - 1}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }
);

MLToggleGroup.displayName = 'MLToggleGroup';
