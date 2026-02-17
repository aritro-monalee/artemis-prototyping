import React, { forwardRef } from 'react';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { cn } from '../../utils/cn';
import { MLToolTip } from '../MLToolTip/MLToolTip';

export interface MLTextAreaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  /**
   * Size of the textarea, defaults to md
   */
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  label?: string;
  labelTooltip?: string;
  /**
   * Description text shown below the textarea
   */
  description?: string;
  error?: string;
  /**
   * Whether textarea can be resized, defaults to vertical
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /**
   *  CSS class names for the textarea input
   */
  textareaClassName?: string;
}

const MLTextArea = forwardRef<HTMLTextAreaElement, MLTextAreaProps>(
  (
    {
      className,
      textareaClassName,
      size = 'md',
      label,
      labelTooltip,
      description,
      disabled = false,
      readonly = false,
      required = false,
      rows = 3,
      resize = 'vertical',
      error,

      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm min-h-[60px]',
      md: 'px-3 py-2 text-sm min-h-[76px]',
      lg: 'px-3 py-2 text-sm min-h-[100px]',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className={cn('flex flex-col gap-2 text-foreground w-full', className)}>
        {label && (
          <Label
            className={cn('text-sm font-medium leading-none', {
              "after:content-['*'] after:text-destructive after:ml-0.5": required,
            })}
          >
            {label}
            {labelTooltip && <MLToolTip tooltipContent={labelTooltip} />}
          </Label>
        )}

        <Textarea
          ref={ref}
          className={cn(
            sizeClasses[size],
            resizeClasses[resize],
            'border border-input shadow-xs',
            {
              'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20':
                !!error,
              'border-b border-gray-200 rounded-none px-0': readonly,
              'text-gray-500': readonly,
            },
            textareaClassName
          )}
          rows={rows}
          disabled={disabled}
          readOnly={readonly}
          aria-invalid={!!error}
          {...props}
        />

        {description && !error && (
          <p className="text-sm text-muted-foreground leading-5">{description}</p>
        )}

        {error && <p className="text-sm text-destructive leading-5">{error}</p>}
      </div>
    );
  }
);

MLTextArea.displayName = 'MLTextArea';

export { MLTextArea };
