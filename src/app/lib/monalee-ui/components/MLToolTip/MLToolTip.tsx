import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { CircleAlert } from 'lucide-react';

import { cn } from '../../utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export interface MLToolTipProps {
  tooltipContent: string | React.ReactNode;
  side?: React.ComponentPropsWithoutRef<typeof TooltipContent>['side'];
  className?: string;
  tooltipClassName?: string;
  children?: React.ReactNode;
  /**
   * Control the tooltip open state (Radix Tooltip Root `open`).
   * Useful for showcasing the "interaction" (open) state without hovering.
   */
  open?: boolean;
  /**
   * Initial open state (Radix Tooltip Root `defaultOpen`).
   */
  defaultOpen?: boolean;
  /**
   * Open state change handler (Radix Tooltip Root `onOpenChange`).
   */
  onOpenChange?: (open: boolean) => void;
}

export const MLToolTip: React.FC<MLToolTipProps> = (props) => {
  const {
    children,
    side,
    tooltipContent,
    tooltipClassName,
    className,
    open,
    defaultOpen,
    onOpenChange,
  } = props;

  if (!tooltipContent) {
    return <>{children}</>;
  }
  return (
    <Tooltip open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>
        {children ?? (
          <button
            type="button"
            className={cn('w-[14px] h-[14px] relative z-50 ml-2 flex-none', className)}
          >
            <CircleAlert className="absolute inset-0 z-0 h-full w-full" />
          </button>
        )}
      </TooltipTrigger>
      <TooltipContent align="center" side={side} className={cn('z-2000', tooltipClassName)}>
        {typeof tooltipContent === 'string' ? (
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tooltipContent) }} />
        ) : (
          tooltipContent
        )}
      </TooltipContent>
    </Tooltip>
  );
};
