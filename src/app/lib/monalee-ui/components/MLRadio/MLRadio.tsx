import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { RadioGroupItem, Label } from '../ui';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

export interface MLRadioProps extends ComponentPropsWithoutRef<typeof RadioGroupItem> {
  /**
   * Radio label text
   */
  label: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Visual variant of the radio
   */
  variant?: 'solid' | 'box';
  /**
   * Color of the radio
   */
  color?: 'default' | 'black';
  /**
   * CSS class name
   */
  className?: string;
  /**
   * HTML id attribute
   */
  id?: string;
}

export const MLRadio = forwardRef<React.ElementRef<typeof RadioGroupItem>, MLRadioProps>(
  (
    {
      label = 'Radio Button',
      description,
      variant = 'solid',
      color = 'default',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const colorClasses = {
      default: '',
      black:
        'border-black data-[state=checked]:border-black data-[state=checked]:text-black [&[data-state=checked]_svg]:text-black [&[data-state=checked]_svg]:fill-black',
    };

    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    if (variant === 'box') {
      // Box variant: card-style radio with border that changes on selection
      const boxContainerClasses = {
        default:
          'has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10 hover:bg-muted/50',
        black:
          'has-[[data-state=checked]]:border-black has-[[data-state=checked]]:bg-black/10 hover:bg-muted/50',
      };

      const boxRadioClasses = {
        default:
          'data-[state=checked]:bg-primary data-[state=checked]:border-primary [&[data-state=checked]_svg]:fill-white [&[data-state=checked]_svg]:text-white',
        black:
          'data-[state=checked]:bg-black data-[state=checked]:border-black [&[data-state=checked]_svg]:fill-white [&[data-state=checked]_svg]:text-white',
      };

      return (
        <Label
          htmlFor={radioId}
          className={cn(
            'group flex items-start gap-3 p-3 rounded-lg border border-border bg-background transition-all cursor-pointer',
            boxContainerClasses[color],
            className
          )}
        >
          <RadioGroupItem
            ref={ref}
            id={radioId}
            className={cn('mt-0.5 shrink-0', boxRadioClasses[color])}
            {...props}
          />
          <div className="flex-1 flex flex-col gap-1.5 pt-px">
            <MLText as="span" className="text-sm font-medium leading-none text-base-foreground">
              {label}
            </MLText>
            {description && (
              <MLText as="p" className="text-sm text-muted-foreground leading-5 font-normal">
                {description}
              </MLText>
            )}
          </div>
        </Label>
      );
    }

    // Default (solid) variant: simple radio with label
    return (
      <div className={cn('flex items-start gap-3', className)}>
        <RadioGroupItem
          ref={ref}
          id={radioId}
          className={cn('shrink-0', colorClasses[color])}
          {...props}
        />
        <div className="flex flex-col gap-1.5 pt-px">
          <Label
            htmlFor={radioId}
            className="text-sm font-medium leading-none text-base-foreground cursor-pointer"
          >
            {label}
          </Label>
          {description && (
            <MLText as="p" className="text-sm text-muted-foreground leading-5">
              {description}
            </MLText>
          )}
        </div>
      </div>
    );
  }
);

MLRadio.displayName = 'MLRadio';
