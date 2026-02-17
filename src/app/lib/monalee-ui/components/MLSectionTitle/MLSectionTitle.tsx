import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface MLSectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text to display
   */
  title: string;
}

/**
 * SectionTitle - A heading with a horizontal line divider.
 * Useful for separating form sections or content groups.
 *
 * @example
 * ```tsx
 * <SectionTitle title="Personal Information" />
 * <SectionTitle title="Settings" className="mb-4" />
 * ```
 */
export const MLSectionTitle = forwardRef<HTMLDivElement, MLSectionTitleProps>(
  ({ title, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex w-full items-center', className)} {...props}>
        <h2 className="text-sm font-semibold shrink-0">{title}</h2>
        <div className="border-t border-border ml-2 grow rounded-full" />
      </div>
    );
  }
);

MLSectionTitle.displayName = 'MLSectionTitle';
