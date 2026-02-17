import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '../../utils/cn';
import { MLIconContainer } from '../MLIconContainer';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-border bg-base-input-background shadow-xs outline-none',
        // Border transition
        'transition-[border-color,box-shadow] duration-150 ease-out',
        'hover:border-primary/50',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'data-[state=checked]:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        // Motion reduce support
        'motion-reduce:transition-none',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(
          'flex items-center justify-center',
          // Scale-in animation for the dot
          'data-[state=checked]:animate-[scale-in_150ms_ease-out]',
          'motion-reduce:animate-none'
        )}
      >
        <MLIconContainer icon={<Circle className="fill-primary" />} size="xs" className="text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
