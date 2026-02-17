'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SingleValue } from 'react-select';
import { cn } from '../../utils/cn';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

import { MLSelectOption, MLSelectGroup, isSelectGroup } from './types';
import { MLTag } from '../MLTag';
import { MLText } from '../MLText';

export interface MLSelectProps<Value> {
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Select Options - can be flat options or grouped options.
   * 
   * @example
   * // Flat options
   * options={[
   *   { label: 'Option 1', value: '1' },
   *   { label: 'Option 2', value: '2' },
   * ]}
   * 
   * @example
   * // Grouped options
   * options={[
   *   {
   *     label: 'Fruits',
   *     options: [
   *       { label: 'Apple', value: 'apple' },
   *       { label: 'Banana', value: 'banana' },
   *     ]
   *   },
   *   {
   *     label: 'Vegetables',
   *     options: [
   *       { label: 'Carrot', value: 'carrot' },
   *       { label: 'Broccoli', value: 'broccoli' },
   *     ]
   *   },
   * ]}
   */
  options: (MLSelectOption<Value> | MLSelectGroup<Value>)[];
  /**
   * Label text for input
   */
  label?: string;
  /**
   * Prefix elements like icon, text, etc.
   */
  placeholder?: string;
  /**
   * Value for input field (controlled mode)
   */
  value?: SingleValue<MLSelectOption<Value>>;
  /**
   * Default value for input field (uncontrolled mode)
   */
  defaultValue?: SingleValue<MLSelectOption<Value>>;
  /**
   * Name attribute for hidden input element (for form submission).
   * When provided in uncontrolled mode (no `value` prop), renders a hidden input
   * with the selected option's value, enabling native form submission.
   *
   * @example
   * // Uncontrolled mode with form submission
   * <form onSubmit={handleSubmit}>
   *   <MLSelect
   *     name="country"
   *     label="Select Country"
   *     options={[
   *       { label: 'United States', value: 'us' },
   *       { label: 'Canada', value: 'ca' },
   *       { label: 'Mexico', value: 'mx' },
   *     ]}
   *     defaultValue={{ label: 'United States', value: 'us' }}
   *   />
   *   <button type="submit">Save</button>
   * </form>
   * // Submits: { country: "us" }
   */
  name?: string;
  /**
   * Disabled property for Input
   */
  disabled?: boolean;
  /**
   * Whether input is required or not
   */
  required?: boolean;
  /**
   * Whether full width or not
   */
  fullwidth?: boolean;
  /**
   * Prefix elements like icon, text, etc.
   */
  prefix?: React.ReactNode;
  /**
   *  CSS class names for prefix div container
   */
  prefixClassNames?: string;
  /**
  /**
   * Error message
   */
  error?: string;
  /**
   * Description text (appears after error)
   */
  description?: string;
  /**
   * Optional change handler
   */
  onChange?: (selected: SingleValue<MLSelectOption<Value>> | null) => void;
  /**
   * Optional blur handler
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /**
   * Input readonly: true, false
   */
  readonly?: boolean;
  /**
   *  CSS class names for select field
   */
  selectClassNames?: string;
  /**
   *  CSS class names for dropdown menu
   */
  menuClassNames?: string;
  /**
   * Color of the select
   */
  color?: 'default' | 'black';
  /**
   * Minimum height of the select.
   */
  minHeight?: string;
}

export const MLSelect = <Value,>({
  options,
  label,
  placeholder = 'Select...',
  value,
  defaultValue,
  name,
  disabled = false,
  fullwidth = false,
  required = false,
  error,
  description,
  prefix,
  prefixClassNames,
  selectClassNames,
  menuClassNames,
  className,
  onChange,
  onBlur,
  readonly = false,
  minHeight,
  color = 'default',
}: MLSelectProps<Value>) => {
  const [selectedValue, setSelectedValue] = useState<
    SingleValue<MLSelectOption<Value>> | undefined
  >(value ?? defaultValue);

  // Sync selectedValue with value prop changes for controlled components
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const getSelectValue = (optionValue: Value): string => {
    const stringValue = String(optionValue);
    return stringValue === '' ? 'no-option-selected' : stringValue;
  };

  // Flatten all options for lookup (including grouped)
  const flatOptions = useMemo(() => {
    const result: MLSelectOption<Value>[] = [];
    for (const item of options) {
      if (isSelectGroup(item)) {
        result.push(...item.options);
      } else {
        result.push(item);
      }
    }
    return result;
  }, [options]);

  const handleChange = (selectedValue: string) => {
    const selected =
      flatOptions.find((option) => getSelectValue(option.value) === selectedValue) || null;
    setSelectedValue(selected);
    if (onChange) onChange(selected);
  };

  const currentValue = value ?? selectedValue;
  const currentStringValue = currentValue ? getSelectValue(currentValue.value) : undefined;

  // Render a single option item
  const renderOption = (option: MLSelectOption<Value>, index: number) => {
    const selectValue = getSelectValue(option.value);

    return (
      <SelectItem key={`${selectValue}-${index}`} value={selectValue} disabled={option.disabled}>
        {option.render ? (
          option.render(option)
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <MLText as="span" className="font-medium text-sm">
                {option.label}
              </MLText>
              {option.desc && (
                <MLText as="span" className="text-xs text-muted-foreground">
                  {option.desc}
                </MLText>
              )}
            </div>
            {option.recommended && (
              <MLTag
                text="Recommended"
                color={color === 'default' ? 'purple' : 'lightgray'}
              />
            )}
          </div>
        )}
      </SelectItem>
    );
  };

  // Render options (flat or grouped)
  const renderOptions = () => {
    return options.map((item, groupIndex) => {
      if (isSelectGroup(item)) {
        return (
          <SelectGroup key={`group-${groupIndex}`}>
            <SelectLabel>{item.label}</SelectLabel>
            {item.options.map((option, optIndex) => renderOption(option, optIndex))}
          </SelectGroup>
        );
      }
      return renderOption(item, groupIndex);
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-2 text-base-foreground w-fit',
        { 'w-full': fullwidth },
        className
      )}
    >
      {/* Hidden input for form submission in uncontrolled mode (Radix Select has no native form support) */}
      {name && value === undefined && currentValue && !disabled && (
        <input type="hidden" name={name} value={String(currentValue.value)} />
      )}
      {label && (
        <Label
          className={cn({
            "after:content-['*'] after:text-destructive": required,
          })}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        {prefix && (
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none left-3 w-5 h-5 z-10',
              prefixClassNames
            )}
          >
            {prefix}
          </div>
        )}

        <Select
          value={currentStringValue}
          onValueChange={handleChange}
          disabled={disabled || readonly}
        >
          <SelectTrigger
            className={cn(
              'w-full',
              {
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20': !!error,
                'pl-9': !!prefix,
              },
              selectClassNames
            )}
            style={{ minHeight }}
            aria-invalid={!!error}
            onBlur={onBlur}
            disabled={disabled || readonly || currentValue?.disabled}
          >
            <SelectValue placeholder={placeholder}>
              {currentValue ? (
                currentValue.render ? (
                  currentValue.render(currentValue)
                ) : (
                  <div className="flex items-center w-full justify-between pr-2">
                    <div className="flex items-baseline grow min-w-0">
                      <MLText as="span" className="font-medium text-sm truncate ellipsis-text">
                        {currentValue.label}
                      </MLText>
                      {currentValue.desc && (
                        <MLText
                          as="span"
                          className="text-xs text-muted-foreground truncate ml-2 min-w-0"
                        >
                          {currentValue.desc}
                        </MLText>
                      )}
                    </div>
                    {currentValue.recommended && (
                      <MLTag
                        text="Recommended"
                        color={color === 'default' ? 'purple' : 'lightgray'}
                        className="ml-2 shrink-0"
                      />
                    )}
                  </div>
                )
              ) : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className={cn(
              'max-h-60 min-w-[var(--radix-select-trigger-width)] max-w-sm z-2100',
              menuClassNames
            )}
          >
            {renderOptions()}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {description && <p className="text-sm text-muted-foreground leading-5">{description}</p>}
    </div>
  );
};
