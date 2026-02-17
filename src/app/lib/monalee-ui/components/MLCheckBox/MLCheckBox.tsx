'use client';

import * as React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export interface MLCheckBoxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, 'onChange' | 'checked'> {
  /**
   * Label for the checkbox
   */
  label?: React.ReactNode;
  /**
   * Description text shown below the label
   */
  description?: React.ReactNode;
  /**
   * The checked state of the checkbox. Can be true, false, or 'indeterminate'.
   * Use 'indeterminate' for partial selections (e.g., when some but not all child items are selected).
   */
  checked?: boolean | 'indeterminate';
  /**
   * Callback function for when the checkbox is changed.
   * Returns boolean | 'indeterminate' based on the new state.
   */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  /**
   * Color variant of the checkbox
   */
  color?: 'default' | 'black';
  /**
   * Whether the checkbox is full width
   */
  fullWidth?: boolean;
  /**
   * Whether the label and description should be rendered as markdown
   */
  markdown?: boolean;
  /**
   * Strike through the label when checked (useful for todo-style lists)
   */
  lineThrough?: boolean;
}

// ============================================
// Utilities
// ============================================

const markdownToHtml = (text: string): string => {
  if (typeof text !== 'string') return String(text);

  const html = marked.parse(text, {
    breaks: true,
    async: false,
  });

  return DOMPurify.sanitize(html);
};

const markdownToPlainText = (text: string): string => {
  if (typeof text !== 'string') return String(text);

  const html = marked.parse(text, {
    breaks: true,
    async: false,
  });

  const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (tempDiv) {
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || text;
  }

  // Fallback: basic markdown stripping if document is not available (SSR)
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
    .replace(/\*(.+?)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/`(.+?)`/g, '$1') // Code
    .replace(/#+\s+/g, '') // Headers
    .trim();
};

// ============================================
// Component
// ============================================

/**
 * Checkbox - A control that allows the user to toggle between checked and not checked.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" description="I agree to the terms and conditions" />
 * <Checkbox checked onCheckedChange={(checked) => console.log(checked)} />
 * ```
 */
const MLCheckBox = React.forwardRef<React.ElementRef<typeof Checkbox>, MLCheckBoxProps>(
  (
    {
      label,
      description,
      checked,
      onCheckedChange,
      color = 'default',
      fullWidth = false,
      className,
      disabled,
      markdown = false,
      lineThrough = false,
      id,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const checkboxId = id || reactId;

    const isChecked = checked === true;

    const colorClasses = {
      default: {
        checkbox: '',
        label: '',
      },
      black: {
        checkbox: cn(
          'border-gray-900',
          'data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 data-[state=checked]:text-white',
          'data-[state=indeterminate]:bg-gray-900 data-[state=indeterminate]:border-gray-900 data-[state=indeterminate]:text-white',
          'focus-visible:ring-gray-900'
        ),
        label: '',
      },
    };

    const labelClassName = cn(
      'text-sm font-medium leading-none cursor-pointer select-none',
      'text-base-foreground',
      'transition-all duration-150 ease-out',
      disabled && 'cursor-not-allowed text-base-muted-foreground',
      lineThrough && isChecked && 'line-through text-base-muted-foreground',
      colorClasses[color].label
    );

    return (
      <div className={cn('flex items-start gap-2', { 'w-full': fullWidth }, className)}>
        <Checkbox
          ref={ref}
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={color === 'black' ? colorClasses.black.checkbox : undefined}
          {...props}
        />

        {(label || description) && (
          <div className={cn('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
            {label &&
              (markdown ? (
                <label
                  htmlFor={checkboxId}
                  className={labelClassName}
                  aria-label={markdownToPlainText(String(label))}
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(String(label)),
                  }}
                />
              ) : (
                <label htmlFor={checkboxId} className={labelClassName}>
                  {label}
                </label>
              ))}
            {description &&
              (markdown ? (
                <p
                  className={cn(
                    'text-sm leading-5 text-base-muted-foreground select-none',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  )}
                  aria-label={markdownToPlainText(String(description))}
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(String(description)),
                  }}
                />
              ) : (
                <p
                  className={cn(
                    'text-sm leading-5 text-base-muted-foreground select-none',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  )}
                >
                  {description}
                </p>
              ))}
          </div>
        )}
      </div>
    );
  }
);

MLCheckBox.displayName = 'Checkbox';

export { MLCheckBox };
