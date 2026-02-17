'use client';

import * as React from 'react';
import {
  InputOTP as InputOTPBase,
  InputOTPGroup as InputOTPGroupBase,
  InputOTPSlot as InputOTPSlotBase,
  InputOTPSeparator as InputOTPSeparatorBase,
} from '../ui/input-otp';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface InputOTPProps {
  /**
   * Maximum number of characters
   */
  maxLength: number;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Label text for the OTP input
   */
  label?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Additional class name for the input
   */
  className?: string;
  /**
   * Additional class name for the container
   */
  containerClassName?: string;
  /**
   * Children (InputOTPGroup, InputOTPSlot, etc.)
   */
  children?: React.ReactNode;
  /**
   * Pattern for validation (regex string)
   */
  pattern?: string;
  /**
   * Input mode for mobile keyboards
   */
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email' | 'url';
  /**
   * Callback when all slots are filled
   */
  onComplete?: (value: string) => void;
}

export interface InputOTPGroupProps extends React.ComponentProps<'div'> {}

export interface InputOTPSlotProps extends React.ComponentProps<'div'> {
  index: number;
}

export interface InputOTPSeparatorProps extends React.ComponentProps<'div'> {}

// ============================================
// Components
// ============================================

/**
 * InputOTP - Accessible one-time password component with copy paste functionality.
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      className,
      containerClassName,
      label,
      children,
      maxLength,
      value,
      onChange,
      disabled,
      pattern,
      inputMode,
      onComplete,
    },
    ref
  ) => (
    <div className="flex flex-col gap-2 items-start justify-center">
      {label && (
        <label className="text-sm font-medium leading-none text-base-foreground text-center w-full">
          {label}
        </label>
      )}
      <InputOTPBase
        ref={ref}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={disabled}
        pattern={pattern}
        inputMode={inputMode}
        onComplete={onComplete}
        containerClassName={cn(containerClassName)}
        className={cn(className)}
      >
        {children}
      </InputOTPBase>
    </div>
  )
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <InputOTPGroupBase ref={ref} className={cn('shadow-xs', className)} {...props} />
  )
);
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ className, ...props }, ref) => (
    <InputOTPSlotBase ref={ref} className={cn('bg-base-input-background', className)} {...props} />
  )
);
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>((props, ref) => (
  <InputOTPSeparatorBase ref={ref} {...props} />
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

// ============================================
// Variant Components for convenience
// ============================================

interface InputOTPVariantProps extends Omit<InputOTPProps, 'maxLength' | 'children'> {}

/**
 * Simple variant: 3 + 3 slots with separator
 */
const InputOTPSimple = React.forwardRef<HTMLInputElement, InputOTPVariantProps>(
  ({ label = 'Label', ...props }, ref) => (
    <InputOTP ref={ref} maxLength={6} label={label} {...props}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
);
InputOTPSimple.displayName = 'InputOTPSimple';

/**
 * Digits Only variant: 6 connected slots
 */
const InputOTPDigitsOnly = React.forwardRef<HTMLInputElement, InputOTPVariantProps>(
  ({ label = 'Label', ...props }, ref) => (
    <InputOTP ref={ref} maxLength={6} label={label} {...props}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
);
InputOTPDigitsOnly.displayName = 'InputOTPDigitsOnly';

/**
 * With Separator variant: 2 + 2 + 2 slots with separators
 */
const InputOTPWithSeparator = React.forwardRef<HTMLInputElement, InputOTPVariantProps>(
  ({ label = 'Label', ...props }, ref) => (
    <InputOTP ref={ref} maxLength={6} label={label} {...props}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
);
InputOTPWithSeparator.displayName = 'InputOTPWithSeparator';

/**
 * With Spacing variant: 4 separate slots with gaps
 */
const InputOTPWithSpacing = React.forwardRef<HTMLInputElement, InputOTPVariantProps>(
  ({ label = 'Label', ...props }, ref) => (
    <InputOTP ref={ref} maxLength={4} label={label} {...props}>
      <InputOTPGroup className="gap-2 shadow-none">
        <InputOTPSlot index={0} className="rounded-md border shadow-xs" />
        <InputOTPSlot index={1} className="rounded-md border shadow-xs" />
        <InputOTPSlot index={2} className="rounded-md border shadow-xs" />
        <InputOTPSlot index={3} className="rounded-md border shadow-xs" />
      </InputOTPGroup>
    </InputOTP>
  )
);
InputOTPWithSpacing.displayName = 'InputOTPWithSpacing';

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  InputOTPSimple,
  InputOTPDigitsOnly,
  InputOTPWithSeparator,
  InputOTPWithSpacing,
};
