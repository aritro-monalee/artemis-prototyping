import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Menu } from '@headlessui/react';
import { cn } from '../../utils/cn';
import { useOnClickOutside } from 'usehooks-ts';
import { MLChip } from '../MLChip';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Label } from '../ui/label';
import { MLText } from '../MLText';
import { MLIconContainer } from '../MLIconContainer';

interface Option {
  label: string;
  value: string;
}

export interface MLMultiSelectProps {
  options: Option[];
  /**
   * Controlled value - when provided, component is controlled
   */
  value?: string[];
  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: string[];
  /**
   * Callback when selection changes (works for both controlled and uncontrolled)
   */
  onChange?: (value: string[]) => void;
  /**
   * Name attribute for hidden input elements (for form submission).
   * When provided in uncontrolled mode (no `value` prop), renders hidden inputs
   * for each selected value using array notation (name[0], name[1], etc.),
   * enabling native form submission with multiple values.
   *
   * @example
   * // Uncontrolled mode with form submission
   * <form onSubmit={handleSubmit}>
   *   <MLMultiSelect
   *     name="categories"
   *     options={[
   *       { label: 'Tech', value: 'tech' },
   *       { label: 'Science', value: 'science' },
   *       { label: 'Art', value: 'art' },
   *     ]}
   *     defaultValue={['tech', 'art']}
   *   />
   *   <button type="submit">Save</button>
   * </form>
   * // Submits: { "categories[0]": "tech", "categories[1]": "art" }
   */
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  isSearchable?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const MLMultiSelect: FunctionComponent<MLMultiSelectProps> = ({
  size = 'md',
  options,
  value,
  defaultValue = [],
  onChange,
  name,
  label,
  placeholder = 'Select options',
  required,
  error,
  className,
  isSearchable = false,
}: MLMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string[]>(value ?? defaultValue);

  // Sync internal state with controlled value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Derive current value: controlled (value) takes precedence over uncontrolled (internalValue)
  const currentValue = value ?? internalValue;

  const selectedOptions = currentValue
    .map((v) => options.find((option) => option?.value === v)!)
    .filter((option) => Boolean(option));

  const filteredOptions = isSearchable
    ? options.filter((option) => option?.label?.toLowerCase().includes(searchTerm?.toLowerCase()))
    : options;

  const handleToggleOption = (optionValue: string) => {
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter((v) => v !== optionValue)
      : [...currentValue, optionValue];

    // Update internal state only when uncontrolled
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // Always call onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleRemoveTag = (optionValue: string) => {
    const newValue = currentValue.filter((v) => v !== optionValue);

    // Update internal state only when uncontrolled
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // Always call onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenMenu = () => {
    setIsOpen(true);
    if (isSearchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
    setSearchTerm('');
  });

  const dropdownHeightClasses = {
    xs: 'max-h-60',
    sm: 'max-h-60',
    md: 'max-h-80',
    lg: 'max-h-96',
  };

  const chipSize = size === 'xs' || size === 'sm' ? 'sm' : 'md';

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {/* Hidden inputs for form submission in uncontrolled mode (HeadlessUI Menu has no native form support) */}
      {name &&
        value === undefined &&
        currentValue.map((val, index) => (
          <input key={val} type="hidden" name={`${name}[${index}]`} value={val} />
        ))}
      {label && (
        <Label className={cn(required && "after:content-['*'] after:text-destructive")}>
          {label}
        </Label>
      )}
      <Menu as="div" className="relative w-full" ref={menuRef}>
        <Menu.Button
          onClick={handleOpenMenu}
          className={cn(
            // Base styles - matches SelectTrigger from ui/select.tsx
            'border-input bg-base-input-background data-[placeholder]:text-muted-foreground',
            "[&_svg:not([class*='text-'])]:text-muted-foreground",
            'flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs',
            'transition-[color,box-shadow] outline-none',
            // Focus styles
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            // Hover
            'hover:bg-accent',
            // Disabled
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Height based on size
            size === 'xs' && 'min-h-8',
            size === 'sm' && 'min-h-9',
            size === 'md' && 'min-h-9',
            size === 'lg' && 'min-h-11',
            // Error state
            error &&
              'aria-invalid:ring-destructive/20 aria-invalid:border-destructive border-destructive',
            // Open state
            isOpen && 'border-ring ring-ring/50 ring-[3px]'
          )}
          aria-invalid={!!error}
        >
          <div className="flex-1 flex items-center overflow-hidden min-w-0">
            {selectedOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1 overflow-hidden max-w-full -my-0.5">
                {selectedOptions.map((option) => (
                  <div key={option.value} className="shrink-0">
                    <MLChip
                      size={chipSize}
                      label={option.label}
                      closable
                      onRemove={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(option.value);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <MLText as="span" className="text-muted-foreground truncate">
                {placeholder}
              </MLText>
            )}
          </div>
          <MLIconContainer icon={<ChevronDown />} size="base" className="shrink-0 opacity-50" />
        </Menu.Button>

        {isOpen && (
          <Menu.Items
            static
            className={cn(
              // Matches SelectContent from ui/select.tsx
              'bg-popover text-popover-foreground',
              'absolute z-50 w-full mt-1 origin-top overflow-hidden rounded-md border shadow-md',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'focus:outline-hidden'
            )}
          >
            {/* Search input - matches CommandInput from ui/command.tsx */}
            {isSearchable && (
              <div className="flex h-12 items-center gap-2 border-b border-base-border px-3">
                <MLIconContainer icon={<Search />} size="base" className="shrink-0 text-base-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="placeholder:text-base-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options list - matches CommandList/CommandItem from ui/command.tsx */}
            <div className={cn('overflow-y-auto p-1', dropdownHeightClasses[size] || 'max-h-60')}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = currentValue.includes(option.value);
                  return (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={cn(
                            // Matches CommandItem from ui/command.tsx
                            'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
                            'transition-colors duration-150 ease-in-out',
                            // Active/hover state
                            active && 'bg-cream-100 text-base-foreground',
                            // Selected state
                            isSelected && !active && 'bg-cream-50'
                          )}
                          onClick={() => handleToggleOption(option.value)}
                        >
                          {/* Checkbox - matches Checkbox from ui/checkbox.tsx */}
                          <MLText
                            as="span"
                            className={cn(
                              'peer size-4 shrink-0 rounded-[4px] border shadow-sm',
                              'flex items-center justify-center',
                              isSelected
                                ? 'bg-base-primary border-base-primary text-base-primary-foreground'
                                : 'border-base-input bg-base-input-background'
                            )}
                          >
                            {isSelected && <MLIconContainer icon={<Check strokeWidth={3} />} size="sm" />}
                          </MLText>
                          <MLText as="span" className="truncate text-base-foreground">
                            {option.label}
                          </MLText>
                        </button>
                      )}
                    </Menu.Item>
                  );
                })
              ) : (
                // Matches CommandEmpty from ui/command.tsx
                <div className="py-6 text-center text-sm text-base-muted-foreground">
                  No options found
                </div>
              )}
            </div>
          </Menu.Items>
        )}
      </Menu>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
