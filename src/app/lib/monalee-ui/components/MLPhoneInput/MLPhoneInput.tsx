'use client';

import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { getCountries } from 'react-phone-number-input';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui';
import { Check as CheckIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MLToolTip } from '../MLToolTip/MLToolTip';
import { MLText } from '../MLText';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref' | 'size'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange' | 'defaultCountry'> & {
    onChange?: (value: string) => void;
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
     * Error message
     */
    error?: string;
    /**
     * Description text (appears after error)
     */
    description?: string;
    /**
     * Whether input is required or not
     */
    required?: boolean;
    /**
     * List of enabled countries. If provided, only these countries will be shown in the selector.
     * @example ['US', 'CL', 'GB']
     */
    enabledCountries?: string[];
    /**
     * Default selected country
     * @example 'US'
     */
    defaultCountry?: string;
    /**
     * Whether to show the country selector. Defaults to true.
     */
    showCountrySelector?: boolean;
    /**
     * Placeholder text for the country search input.
     * @default 'Search country...'
     */
    searchPlaceholder?: string;
    /**
     * Text to display when no countries match the search.
     * @default 'No country found.'
     */
    emptyMessage?: string;
    /**
     * HTML autocomplete attribute for the input
     * @example 'tel', 'off'
     */
    autoComplete?: string;
  };

const NullComponent = () => null;

/**
 * Sanitizes the list of enabled countries by filtering out invalid ones
 * and logging warnings for invalid country codes
 */
const sanitizeCountries = (
  enabledCountries: string[] | undefined,
  componentName = 'MLPhoneInput'
): RPNInput.Country[] | undefined => {
  if (!enabledCountries || enabledCountries.length === 0) {
    return undefined;
  }
  const validCountries = getCountries();
  const validSet = new Set(validCountries);

  const sanitized: RPNInput.Country[] = [];
  const invalid: string[] = [];

  enabledCountries.forEach((country) => {
    if (validSet.has(country as RPNInput.Country)) {
      sanitized.push(country as RPNInput.Country);
    } else {
      invalid.push(country);
    }
  });

  if (invalid.length > 0) {
    console.warn(
      `[${componentName}] Invalid country codes will be ignored:`,
      invalid.join(', '),
      '\nValid country codes are ISO 3166-1 alpha-2 codes (e.g., US, GB, FR, DE, CL).'
    );
  }

  return sanitized.length > 0 ? sanitized : undefined;
};

const MLPhoneInput = ({
  defaultCountry,
  className,
  onChange,
  value,
  size = 'md',
  label,
  labelTooltip,
  error,
  description,
  required = false,
  enabledCountries,
  showCountrySelector = true,
  searchPlaceholder = 'Search country...',
  emptyMessage = 'No country found.',
  autoComplete,
  ref,
  // Remove vars from props that are passed to input component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  ...props
}: PhoneInputProps & { ref?: React.Ref<React.ComponentRef<typeof RPNInput.default>> }) => {
  // Sanitize enabled countries and warn about invalid ones
  const sanitizedCountries = React.useMemo(
    () => sanitizeCountries(enabledCountries),
    [enabledCountries]
  );

  return (
    <div className={cn('flex flex-col gap-2 text-base-foreground w-full', className)}>
      {label && (
        <Label
          className={cn({
            "after:content-['*'] after:text-destructive": required,
          })}
        >
          {label}
          {labelTooltip && <MLToolTip tooltipContent={labelTooltip} className="ml-0" />}
        </Label>
      )}
      <RPNInput.default
        ref={ref}
        className="flex"
        flagComponent={FlagComponent}
        countries={sanitizedCountries}
        countrySelectComponent={showCountrySelector ? SizedCountrySelect : NullComponent}
        inputComponent={
          showCountrySelector ? SizedInputComponent : SizedInputComponentWithoutSelector
        }
        smartCaret={false}
        value={value || undefined}
        defaultCountry={defaultCountry as RPNInput.Country | undefined}
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange={(value) => onChange?.(value || '')}
        size={size}
        error={error}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        autoComplete={autoComplete}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {description && <p className="text-sm text-muted-foreground leading-5">{description}</p>}
    </div>
  );
};
MLPhoneInput.displayName = 'MLPhoneInput';

interface InputComponentProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

const InputComponent = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 text-base md:text-sm',
      md: 'h-9 text-base md:text-sm',
      lg: 'h-10 text-base',
    };

    return (
      <Input
        className={cn(
          'rounded-e-md rounded-s-none',
          sizeClasses[size],
          {
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20':
              props['aria-invalid'] === true || props['aria-invalid'] === 'true',
          },
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
InputComponent.displayName = 'InputComponent';

const InputComponentWithoutSelector = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 text-base md:text-sm',
      md: 'h-9 text-base md:text-sm',
      lg: 'h-10 text-base',
    };

    return (
      <Input
        className={cn(
          'rounded-md',
          sizeClasses[size],
          {
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20':
              props['aria-invalid'] === true || props['aria-invalid'] === 'true',
          },
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
InputComponentWithoutSelector.displayName = 'InputComponentWithoutSelector';

// Wrapper components that extract custom props and pass standard props to the underlying components
interface SizedInputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const SizedInputComponent = ({
  size,
  error,
  // Remove vars from props that are passed to input component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchPlaceholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emptyMessage,
  ref,
  ...props
}: SizedInputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  return <InputComponent {...props} size={size} aria-invalid={!!error} ref={ref} />;
};
SizedInputComponent.displayName = 'SizedInputComponent';

const SizedInputComponentWithoutSelector = ({
  size,
  error,
  // Remove vars from props that are passed to input component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchPlaceholder,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emptyMessage,
  ref,
  ...props
}: SizedInputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  return <InputComponentWithoutSelector {...props} size={size} aria-invalid={!!error} ref={ref} />;
};
SizedInputComponentWithoutSelector.displayName = 'SizedInputComponentWithoutSelector';

interface CountryEntry {
  label: string;
  value: RPNInput.Country | undefined;
}

interface CountrySelectProps {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface SizedCountrySelectProps extends CountrySelectProps {
  searchPlaceholder?: string;
  emptyMessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SizedCountrySelect = ({
  searchPlaceholder,
  emptyMessage,
  size,
  ...props
}: SizedCountrySelectProps) => {
  return (
    <CountrySelect
      {...props}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
      size={size}
    />
  );
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options,
  onChange,
  searchPlaceholder = 'Search country...',
  emptyMessage = 'No country found.',
  size = 'md',
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const buttonSizeClasses = {
    sm: 'h-8',
    md: 'h-9',
    lg: 'h-10',
  };

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue('');
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'flex gap-1 rounded-e-none rounded-s-md border-r-0 px-3 focus:z-10 border-input',
            buttonSizeClasses[size]
          )}
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronDownIcon
            className={cn('-mr-2 size-4 opacity-50 transition-transform', {
              'rotate-180': isOpen,
              hidden: !!disabled,
              'opacity-100': !disabled,
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-5000">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]'
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder={searchPlaceholder}
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="max-h-72">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <MLText as="span" className="flex-1 text-sm">
        {countryName}
      </MLText>
      <MLText
        as="span"
        className="text-sm text-foreground/50"
      >{`+${RPNInput.getCountryCallingCode(country)}`}</MLText>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <MLText
      as="span"
      className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full"
    >
      {Flag && <Flag title={countryName} />}
    </MLText>
  );
};

export { MLPhoneInput };
export type { PhoneInputProps as MLPhoneInputProps };
