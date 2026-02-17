import React, { forwardRef, useEffect, useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { MLLabel } from '../MLLabel';
import { MLText } from '../MLText';

export interface MLSwitchProps
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange' | 'ref'
  > {
  /**
   * Label for the toggle
   */
  label?: string;
  /**
   * Optional description text shown under the label (Artemis spec).
   */
  description?: string;
  /**
   * Layout variant.
   * - `default`: inline switch + text
   * - `box`: switch + text inside a bordered card row
   */
  variant?: 'default' | 'box';
  /**
   * Where the switch sits relative to text.
   */
  align?: 'left' | 'right';
  /**
   * Whether the toggle is checked (controlled mode)
   */
  checked?: boolean;
  /**
   * Default checked state for uncontrolled mode
   */
  defaultChecked?: boolean;
  /**
   * Name attribute for hidden input element (for form submission).
   * When provided in uncontrolled mode (no `checked` prop), renders a hidden input
   * with value "on" when the switch is checked, enabling native form submission.
   *
   * @example
   * // Uncontrolled mode with form submission
   * <form onSubmit={handleSubmit}>
   *   <MLSwitch name="notifications" label="Enable notifications" />
   *   <button type="submit">Save</button>
   * </form>
   * // When checked, submits: { notifications: "on" }
   * // When unchecked, field is omitted from form data
   */
  name?: string;
  /**
   * Ref for the toggle
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Callback function for when the toggle is changed
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional custom color of the toggle
   */
  color?: 'default' | 'black';
  /**
   * Is disabled
   */
  disabled?: boolean;
}

export const MLSwitch = forwardRef<HTMLInputElement, MLSwitchProps>(
  (
    {
      label,
      description,
      checked,
      defaultChecked = false,
      name,
      inputRef,
      onChange,
      color = 'default',
      disabled = false,
      variant = 'default',
      align = 'left',
      id,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const switchId = id ?? reactId;
    const [internalChecked, setInternalChecked] = useState(checked ?? defaultChecked);

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      if (onChange) onChange(e);
    };

    // Artemis sizing (Figma): 36x20 with 2px inset padding and 16px thumb.
    // Thumb shadow (Figma): matches `--shadow-xl` token.
    // Figma tokens:
    // - ON:  bg #a855f7 (artemis-500)
    // - OFF: bg cream-300 (#d7cfc5)
    // - Border: rgba(0,0,0,0.16) @ 0.5px
    const checkedTrackClass =
      color === 'black' ? 'peer-checked:bg-neutral-950' : 'peer-checked:bg-artemis-500';
    const uncheckedTrackClass = color === 'black' ? 'bg-neutral-400/40' : 'bg-cream-300';

    return (
      <div className={cn('inline-flex', { 'w-full': variant === 'box' })}>
        {/* Hidden input for form submission (uncontrolled mode only, not when disabled) */}
        {name && checked === undefined && isChecked && !disabled && (
          <input type="hidden" name={name} value="on" />
        )}
        <div
          className={cn(
            'inline-flex items-start gap-2',
            {
              'w-full': variant === 'box' || align === 'right',
            },
            variant === 'box' && 'rounded-lg border border-border bg-base-card px-4 py-3'
          )}
        >
          <input
            id={switchId}
            type="checkbox"
            className="sr-only peer"
            {...rest}
            name={checked !== undefined ? name : undefined}
            checked={isChecked}
            ref={inputRef || ref}
            onChange={handleChange}
            disabled={disabled}
          />

          {/* Switch track must be a sibling of the peer input for peer-* to work */}
          <label
            htmlFor={switchId}
            className={cn(
              'relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-[0.5px] border-black/15 p-[2px] select-none',
              'border-black/15',
              uncheckedTrackClass,
              checkedTrackClass,
              // Track transition with smooth easing
              'transition-[background-color,border-color] duration-150 ease-out',
              !disabled &&
                'cursor-pointer hover:bg-base-muted hover:peer-checked:bg-base-primary/90',
              disabled && 'cursor-not-allowed',
              // Thumb with smooth slide animation
              "after:absolute after:left-[2px] after:top-1/2 after:size-4 after:-translate-y-1/2 after:rounded-full after:bg-base-background after:shadow-xl after:content-['']",
              'after:transform-gpu',
              'after:transition-transform after:duration-150 after:ease-out',
              // Subtle press effect on thumb
              'active:after:scale-[0.96]',
              'peer-checked:after:translate-x-4',
              // Focus
              'peer-focus-visible:ring-2 peer-focus-visible:ring-base-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-background',
              // Motion reduce support
              'motion-reduce:transition-none motion-reduce:after:transition-none'
            )}
            aria-hidden="true"
          />

          {(label || description) && (
            <label
              htmlFor={switchId}
              className={cn(
                'flex flex-col gap-1.5 select-none',
                'text-base-foreground',
                disabled ? 'cursor-not-allowed text-base-muted-foreground' : 'cursor-pointer',
                { 'flex-1': align === 'right' || variant === 'box' }
              )}
            >
              {label && (
                <MLText as="span" className="text-sm font-medium leading-none">
                  {label}
                </MLText>
              )}
              {description && (
                <MLText as="span" className="text-sm leading-5 text-muted-foreground">
                  {description}
                </MLText>
              )}
            </label>
          )}
        </div>
      </div>
    );
  }
);

MLSwitch.displayName = 'MLSwitch';
