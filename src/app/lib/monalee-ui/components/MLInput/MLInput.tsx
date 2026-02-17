import React, { forwardRef, Ref, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { cn } from '../../utils/cn';
import { MLToolTip } from '../MLToolTip/MLToolTip';

export interface MLInputProps extends Omit<React.ComponentProps<'input'>, 'size' | 'prefix'> {
  /**
   * Input size: sm, md(default), lg
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label text for input
   */
  label?: string;
  /**
   * Tooltip text for input
   */
  labelTooltip?: string;
  /**
   * Whether full width or not
   * @deprecated this is now always true. Please remove this prop.
   */
  fullwidth?: boolean;
  /**
   * Prefix elements like icon, text, etc.
   */
  prefix?: React.ReactNode;
  /**
   * Suffix elements like icon, text, etc.
   */
  suffix?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Description text (appears below input)
   */
  description?: string;
  /**
   * Whether input is required or not
   */
  required?: boolean;
  /**
   * Ref for input element
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   *  CSS class names for prefix div container
   */
  prefixClassNames?: string;
  /**
   *  CSS class names for suffix div container
   */
  suffixClassNames?: string;
  /**
   *  CSS class names for input field
   */
  inputClassNames?: string;
  /**
   * @deprecated Use `disabled` instead.
   * Optional change handler
   */
  readonly?: boolean;
  /**
   * Whether to use horizontal layout (label beside input)
   */
  horizontalLayout?: boolean;
  /**
   * Width of the label in horizontal layout
   */
  labelWidth?: string;
  /**
   * Show a clear button when the input has a value.
   * Clicking the button clears the input.
   */
  isClearable?: boolean;
  /**
   * Callback when the clear button is clicked.
   * If not provided and input is controlled, you should handle clearing via onChange.
   */
  onClear?: () => void;
}

export const MLInput = forwardRef<HTMLInputElement, MLInputProps>(
  (
    {
      className,
      prefixClassNames,
      suffixClassNames,
      inputClassNames,
      // temporary to avoid prop errors
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fullwidth,
      size = 'md',
      label,
      labelTooltip,
      prefix,
      suffix,
      error,
      description,
      required = false,
      onChange,
      inputRef,
      disabled: _disabled,
      readonly,
      value,
      defaultValue,
      horizontalLayout = false,
      labelWidth,
      isClearable = false,
      onClear,
      ...props
    },
    ref
  ) => {
    const disabled = _disabled || readonly;
    
    // Track internal value for uncontrolled inputs to show/hide clear button
    const [internalValue, setInternalValue] = useState<string>(
      (defaultValue as string) ?? ''
    );
    
    // Sync internal value with controlled value
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);
    
    const currentValue = value !== undefined ? value : internalValue;
    const showClearButton = isClearable && !disabled && currentValue && String(currentValue).length > 0;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };
    
    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (value === undefined) {
        // Uncontrolled: clear internal state
        setInternalValue('');
      }
      // For controlled inputs without onClear, caller should handle via onChange
    };
    
    const sizeClasses = {
      sm: 'h-8 text-base md:text-sm',
      md: 'h-9 text-base md:text-sm',
      lg: 'h-10 text-base',
    };

    // Adjust padding when clearable to account for clear button
    const hasSuffixOrClear = suffix || showClearButton;
    
    const paddingClasses = {
      sm: prefix && hasSuffixOrClear ? 'pl-8 pr-8' : prefix ? 'pl-8 pr-3' : hasSuffixOrClear ? 'pl-3 pr-8' : 'px-3',
      md: prefix && hasSuffixOrClear ? 'pl-9 pr-9' : prefix ? 'pl-9 pr-3' : hasSuffixOrClear ? 'pl-3 pr-9' : 'px-3',
      lg: prefix && hasSuffixOrClear ? 'pl-10 pr-10' : prefix ? 'pl-10 pr-4' : hasSuffixOrClear ? 'pl-4 pr-10' : 'px-4',
    };

    const prefixSizeClasses = {
      sm: 'left-2.5 w-5 h-5',
      md: 'left-3 w-5 h-5',
      lg: 'left-3.5 w-6 h-6',
    };

    const suffixSizeClasses = {
      sm: 'right-2.5 w-5 h-5',
      md: 'right-3 w-5 h-5',
      lg: 'right-3.5 w-6 h-6',
    };
    
    const clearButtonSizeClasses = {
      sm: 'right-2.5 size-4',
      md: 'right-3 size-4',
      lg: 'right-3.5 size-5',
    };

    const labelElement = label && (
      <Label
        className={cn(
          'text-sm font-medium leading-none text-base-foreground shrink-0',
          {
            "after:content-['*'] after:text-destructive after:ml-0.5": required,
          },
          horizontalLayout && 'text-right h-9 flex items-center'
        )}
        style={horizontalLayout && labelWidth ? { width: labelWidth } : undefined}
      >
        {label}
        {labelTooltip && <MLToolTip tooltipContent={labelTooltip} className="ml-0" />}
      </Label>
    );

    const clearButton = showClearButton && (
      <button
        type="button"
        onClick={handleClear}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 flex items-center justify-center',
          'text-muted-foreground hover:text-foreground',
          'transition-[color,transform,opacity] duration-150 ease-out',
          'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          'active:scale-95',
          'motion-reduce:transition-none',
          clearButtonSizeClasses[size],
          // Shift left if there's a suffix
          suffix && {
            sm: 'right-8',
            md: 'right-9',
            lg: 'right-10',
          }[size]
        )}
        aria-label="Clear input"
        tabIndex={-1}
      >
        <X className="size-3.5" />
      </button>
    );

    const inputElement = (
      <div className="flex flex-col gap-2 w-full">
        <div className="relative w-full">
          {prefix && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-start text-muted-foreground pointer-events-none',
                prefixSizeClasses[size],
                prefixClassNames
              )}
            >
              {prefix}
            </div>
          )}

          <Input
            ref={inputRef || ref}
            className={cn('w-full', sizeClasses[size], paddingClasses[size], inputClassNames)}
            aria-invalid={!!error}
            onChange={handleChange}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
          {clearButton}
          {suffix && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 flex items-center justify-end text-muted-foreground pointer-events-none',
                suffixSizeClasses[size],
                suffixClassNames
              )}
            >
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {description && <p className="text-sm text-muted-foreground leading-5">{description}</p>}
      </div>
    );

    if (horizontalLayout) {
      return (
        <div
          className={cn('flex items-start gap-4 text-base-foreground w-full', className)}
          data-slot="input-wrapper"
        >
          {labelElement}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="relative w-full">
              {prefix && (
                <div
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 flex items-center justify-start text-muted-foreground pointer-events-none',
                    prefixSizeClasses[size],
                    prefixClassNames
                  )}
                >
                  {prefix}
                </div>
              )}

              <Input
                ref={inputRef || ref}
                className={cn('w-full', sizeClasses[size], paddingClasses[size], inputClassNames)}
                aria-invalid={!!error}
                onChange={handleChange}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                {...props}
              />
              {clearButton}
              {suffix && (
                <div
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 flex items-center justify-end text-muted-foreground pointer-events-none',
                    suffixSizeClasses[size],
                    suffixClassNames
                  )}
                >
                  {suffix}
                </div>
              )}
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {description && (
              <p className="text-sm text-muted-foreground leading-5">{description}</p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn('flex flex-col gap-2 text-base-foreground w-full', className)}
        data-slot="input-wrapper"
      >
        {labelElement}
        {inputElement}
      </div>
    );
  }
);

MLInput.displayName = 'MLInput';
