import * as React from 'react';

import { cn } from '../../utils/cn';

function _Input(
  { className, type, ...props }: React.ComponentProps<'input'>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'bg-base-input-background border-border-subtle flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-[var(--shadow-field)] outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 md:text-sm',
        // Smooth transition for focus ring and border
        'transition-[color,box-shadow,border-color] duration-150 ease-out',
        // Focus ring with animation - softer ring without offset
        'focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        // Motion reduce support
        'motion-reduce:transition-none',
        className
      )}
      {...props}
    />
  );
}

const Input = React.forwardRef(_Input);

export { Input };
