'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MLIconContainer } from '../MLIconContainer';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

import { MLComboboxOption } from './types';
import { MLTag } from '../MLTag';
import { MLText } from '../MLText';

export interface MLComboboxProps<Value> {
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Combobox Options
   */
  options: MLComboboxOption<Value>[];
  /**
   * Label text for combobox
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Value for combobox field
   */
  value?: MLComboboxOption<Value> | null;
  /**
   * Default value for combobox field
   */
  defaultValue?: MLComboboxOption<Value> | null;
  /**
   * Disabled property for combobox
   */
  disabled?: boolean;
  /**
   * Whether combobox is required or not
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
   * CSS class names for prefix div container
   */
  prefixClassNames?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Optional change handler
   */
  onChange?: (selected: MLComboboxOption<Value> | null) => void;
  /**
   * Optional blur handler
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /**
   * Combobox readonly: true, false
   */
  readonly?: boolean;
  /**
   * CSS class names for trigger button
   */
  triggerClassNames?: string;
  /**
   * CSS class names for dropdown menu
   */
  menuClassNames?: string;
  /**
   * Color of the combobox
   */
  color?: 'default' | 'black';
  /**
   * Minimum height of the combobox.
   */
  minHeight?: string;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * No results found text
   */
  noResultsText?: string;
}

export const MLCombobox = <Value,>({
  options,
  label,
  placeholder = 'Select...',
  value,
  defaultValue,
  disabled = false,
  fullwidth = false,
  required = false,
  error,
  prefix,
  prefixClassNames,
  triggerClassNames,
  menuClassNames,
  className,
  onChange,
  onBlur,
  readonly = false,
  minHeight,
  color = 'default',
  searchPlaceholder = 'Search...',
  noResultsText = 'No results found.',
}: MLComboboxProps<Value>) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<MLComboboxOption<Value> | null | undefined>(
    value ?? defaultValue
  );
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const updateTriggerWidth = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    };

    updateTriggerWidth();

    // Update width when the popover opens (in case trigger size changed)
    if (open) {
      updateTriggerWidth();
    }

    // Also listen for resize events to update width if trigger changes size
    const resizeObserver = new ResizeObserver(() => {
      updateTriggerWidth();
    });

    if (triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [open]);

  const getComboboxValue = (optionValue: Value): string => {
    const stringValue = String(optionValue);
    return stringValue === '' ? 'no-option-selected' : stringValue;
  };

  const handleSelect = (clickedValue: string) => {
    const selected =
      options.find((option) => getComboboxValue(option.value) === clickedValue) || null;

    // Toggle selection - if same value is selected, deselect it
    const currentSelected = value ?? selectedValue;
    const newSelected =
      selected && currentSelected && getComboboxValue(currentSelected.value) === clickedValue
        ? null
        : selected;

    setSelectedValue(newSelected);
    setOpen(false);
    if (onChange) onChange(newSelected);
  };

  const currentValue = value ?? selectedValue;

  return (
    <div className={cn('flex flex-col gap-2 w-fit', { 'w-full': fullwidth }, className)}>
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
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-base-muted-foreground pointer-events-none left-3 w-5 h-5 z-10',
              prefixClassNames
            )}
          >
            {prefix}
          </div>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-full justify-between bg-base-input-background border-base-input shadow-xs',
                'transition-all duration-150 ease-in-out',
                'hover:bg-cream-50',
                {
                  'aria-invalid:border-destructive aria-invalid:ring-destructive/20': !!error,
                  'pl-9': !!prefix,
                  'text-base-muted-foreground': !currentValue,
                  'text-base-foreground': !!currentValue,
                },
                triggerClassNames
              )}
              style={{ minHeight }}
              aria-invalid={!!error}
              disabled={disabled || readonly}
              onBlur={onBlur}
            >
              {currentValue ? (
                <MLText as="span" className="truncate">
                  {currentValue.label}
                </MLText>
              ) : (
                placeholder
              )}
              <MLIconContainer icon={<ChevronsUpDown />} size="base" className="ml-2 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              'p-0 z-[2100] border-base-border shadow-md',
              'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              menuClassNames
            )}
            style={{
              minWidth: triggerWidth > 0 ? `${triggerWidth}px` : 'auto',
            }}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{noResultsText}</CommandEmpty>
                <CommandGroup>
                  {options.map((option, index) => {
                    const optionValue = getComboboxValue(option.value);
                    const isSelected =
                      currentValue && getComboboxValue(currentValue.value) === optionValue;

                    return (
                      <CommandItem
                        key={`${option.value}-${index}`}
                        value={option.label}
                        onSelect={() => handleSelect(optionValue)}
                        className={cn(isSelected && 'bg-cream-100')}
                      >
                        {option.render ? (
                          option.render(option)
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <MLText as="span" className="font-medium text-sm">
                                {option.label}
                              </MLText>
                              {option.desc && (
                                <MLText as="span" className="text-xs text-base-muted-foreground">
                                  {option.desc}
                                </MLText>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {option.recommended && (
                                <MLTag
                                  text="Recommended"
                                  color={color === 'default' ? 'purple' : 'lightgray'}
                                />
                              )}
                                              <MLIconContainer
                                                icon={<Check />}
                                                size="base"
                                                className={cn(
                                                  'transition-opacity duration-150',
                                                  isSelected ? 'opacity-100' : 'opacity-0'
                                                )}
                                              />
                            </div>
                          </div>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
