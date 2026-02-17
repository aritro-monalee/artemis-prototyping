import React, { useState, useEffect, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/pro-solid-svg-icons';
import { cn } from '../../utils/cn';

export interface MLCounterProps {
  /**
   * Min of the counter
   */
  min?: number;
  /**
   * Max of the counter
   */
  max?: number;
  /**
   * Value of the counter
   */
  value?: number;
  /**
   * Callback function for when the counter is changed
   */
  onChange?: (value: number) => void;
  /**
   * Allow the number to be directly edited as an input field
   */
  editableNumberInput?: boolean;
  /**
   * Callback function for when the input field loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Whether the counter is disabled
   */
  disabled?: boolean;

  className?: string;
  /**
   * Accessible label for the counter. This is important for screen readers.
   */
  'aria-label'?: string;
}

export const MLCounter = forwardRef<HTMLDivElement, MLCounterProps>(
  (
    {
      min = 1,
      max,
      value,
      onChange,
      editableNumberInput = false,
      onBlur,
      disabled = false,
      className,
      'aria-label': ariaLabel = 'Counter',
      ...rest
    },
    ref
  ) => {
    const [count, setCount] = useState(value !== undefined ? value : min);
    const [inputValue, setInputValue] = useState(count.toString());

    useEffect(() => {
      if (value !== undefined) {
        setCount(value);
        setInputValue(value.toString());
      }
    }, [value]);

    const updateCount = (newCount: number) => {
      setCount(newCount);
      setInputValue(newCount.toString());
      if (onChange) {
        onChange(newCount);
      }
    };

    const onMinusClick = () => {
      if (count > min) {
        const newCount = count - 1;
        updateCount(newCount);
      }
    };

    const onPlusClick = () => {
      if (!max || (max && count < max)) {
        const newCount = count + 1;
        updateCount(newCount);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = event.target.value;
      setInputValue(inputVal);

      // Allow empty input for intermediate typing
      if (inputVal === '') {
        return;
      }

      const parsedValue = parseInt(inputVal, 10);
      if (!isNaN(parsedValue)) {
        // Apply min/max constraints
        const constrainedValue = Math.max(min, max ? Math.min(max, parsedValue) : parsedValue);
        if (constrainedValue !== parsedValue) {
          setInputValue(constrainedValue.toString());
        }
        setCount(constrainedValue);
        if (onChange) {
          onChange(constrainedValue);
        }
      }
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      // Ensure we have a valid number on blur
      if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
        setInputValue(count.toString());
      }

      if (onBlur) {
        onBlur(event);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (editableNumberInput || disabled) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (!max || count < max) {
            updateCount(count + 1);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (count > min) {
            updateCount(count - 1);
          }
          break;
        case 'Home':
          event.preventDefault();
          updateCount(min);
          break;
        case 'End':
          event.preventDefault();
          if (max) {
            updateCount(max);
          }
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex justify-between items-center border border-base-border shadow-xs rounded-lg bg-base-input-background text-base-foreground h-[36px] px-1 gap-1 [&>*]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
          { 'opacity-50 cursor-not-allowed': disabled },
          className
        )}
        aria-disabled={disabled}
        {...(!editableNumberInput && {
          role: 'spinbutton',
          'aria-valuenow': count,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-label': ariaLabel,
          tabIndex: disabled ? -1 : 0,
          onKeyDown: handleKeyDown,
        })}
        {...rest}
      >
        <button
          type="button"
          className={cn(
            'border-none size-6 inline-flex items-center justify-center hover:bg-base-accent hover:rounded',
            'disabled:hover:bg-transparent disabled:opacity-20 disabled:cursor-not-allowed',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none focus-visible:rounded',
            // Smooth transition
            'transition-colors duration-150 ease-out',
            'motion-reduce:transition-none'
          )}
          disabled={disabled || min === count}
          onClick={onMinusClick}
          aria-label="Decrease value"
        >
          <FontAwesomeIcon icon={faMinus} className="size-3 text-base-foreground" />
        </button>

        {/* Left border separator */}
        <div
          className={cn('w-[1px] h-4', min === count ? 'bg-base-border/20' : 'bg-base-border')}
        />

        {editableNumberInput ? (
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={max}
            disabled={disabled}
            className="text-base-foreground min-w-6 max-w-12 w-auto text-center bg-transparent border-none outline-none focus:ring-0 p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex-shrink-0 disabled:cursor-not-allowed"
            style={{ width: `${Math.max(1, inputValue.length)}ch` }}
            aria-label={ariaLabel}
          />
        ) : (
          <div className="text-base-foreground min-w-6 text-center">{count}</div>
        )}

        {/* Right border separator */}
        <div
          className={cn(
            'w-[1px] h-4',
            max && max === count ? 'bg-base-border/20' : 'bg-base-border'
          )}
        />

        <button
          type="button"
          className={cn(
            'border-none size-6 inline-flex items-center justify-center hover:bg-base-accent hover:rounded',
            'disabled:hover:bg-transparent disabled:opacity-20 disabled:cursor-not-allowed',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none focus-visible:rounded',
            // Smooth transition
            'transition-colors duration-150 ease-out',
            'motion-reduce:transition-none'
          )}
          disabled={disabled || !!(max && max === count)}
          onClick={onPlusClick}
          aria-label="Increase value"
        >
          <FontAwesomeIcon icon={faPlus} className="size-3 text-base-foreground" />
        </button>
      </div>
    );
  }
);

MLCounter.displayName = 'MLCounter';
