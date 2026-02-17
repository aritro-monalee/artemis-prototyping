'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';

import { cn } from '../../utils/cn';
import { MLIconContainer } from '../MLIconContainer';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    checked={checked}
    className={cn(
      'peer size-4 shrink-0 rounded-[4px] border border-base-input bg-base-input-background shadow-sm',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-ring focus-visible:ring-offset-2 focus-visible:ring-offset-base-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Checked state with smooth transition
      'data-[state=checked]:bg-base-primary data-[state=checked]:border-base-primary data-[state=checked]:text-base-primary-foreground',
      // Indeterminate state
      'data-[state=indeterminate]:bg-base-primary data-[state=indeterminate]:border-base-primary data-[state=indeterminate]:text-base-primary-foreground',
      // Transition for border and background color
      'transition-[border-color,background-color] duration-150 ease-out',
      // Motion reduce support
      'motion-reduce:transition-none',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator 
      className={cn(
        'flex items-center justify-center text-current',
        // Subtle pop animation for check mark
        'data-[state=checked]:animate-[check-pop_150ms_ease-out]',
        'data-[state=indeterminate]:animate-[check-pop_150ms_ease-out]',
        'motion-reduce:animate-none'
      )}
    >
      {checked === 'indeterminate' ? (
        <MLIconContainer icon={<Minus strokeWidth={3} />} size="sm" />
      ) : (
        <MLIconContainer icon={<Check strokeWidth={3} />} size="sm" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
