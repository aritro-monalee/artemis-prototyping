import React, { forwardRef } from 'react';
import { RadioGroup } from '../ui/radio-group';
import { cn } from '../../utils/cn';

export interface MLRadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  /**
   * Color of the radio group
   */
  color?: 'default' | 'black';
  /**
   * CSS class name
   */
  className?: string;
}

export const MLRadioGroup = forwardRef<React.ElementRef<typeof RadioGroup>, MLRadioGroupProps>(
  ({ className, color = 'default', ...props }, ref) => {
    const colorClasses = {
      default:
        '*:data-[state=checked]:border-base-primary *:data-[state=checked]:text-base-primary',
      black: '*:data-[state=checked]:border-black *:data-[state=checked]:text-black',
    };

    return <RadioGroup ref={ref} className={cn(colorClasses[color], className)} {...props} />;
  }
);

MLRadioGroup.displayName = 'MLRadioGroup';
