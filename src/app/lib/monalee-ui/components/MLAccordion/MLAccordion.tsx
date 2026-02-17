'use client';

import * as React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { cn } from '../../utils/cn';

/* ============================================
 * MLAccordion - Root Component
 * Supports both "single" and "multiple" types via discriminated union
 * ============================================ */
interface AccordionSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type MLAccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
  orientation?: 'horizontal' | 'vertical';
};

export const MLAccordion = React.forwardRef<HTMLDivElement, MLAccordionProps>(
  ({ className, children, ...props }, ref) => (
    <Accordion ref={ref} className={cn('flex flex-col w-full', className)} {...props}>
      {children}
    </Accordion>
  )
);
MLAccordion.displayName = 'MLAccordion';

/* ============================================
 * MLAccordionItem - Individual Item
 * ============================================ */
export interface MLAccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionItem> {
  className?: string;
}

export const MLAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionItem>,
  MLAccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionItem ref={ref} className={cn('border-b border-base-border', className)} {...props} />
));
MLAccordionItem.displayName = 'MLAccordionItem';

/* ============================================
 * MLAccordionTrigger - Clickable Header
 * ============================================ */
export interface MLAccordionTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AccordionTrigger>, 'children'> {
  className?: string;
  /** Hide the chevron icon */
  hideChevron?: boolean;
  children?: React.ReactNode;
}

export const MLAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  MLAccordionTriggerProps
>(({ className, children, hideChevron = false, ...props }, ref) => (
  <AccordionTrigger
    ref={ref}
    className={cn(
      'cursor-pointer hover:no-underline',
      // Hide the chevron when hideChevron is true
      hideChevron && '[&>svg]:hidden',
      className
    )}
    {...props}
  >
    {children}
  </AccordionTrigger>
));
MLAccordionTrigger.displayName = 'MLAccordionTrigger';

/* ============================================
 * MLAccordionContent - Collapsible Content
 * ============================================ */
export interface MLAccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionContent> {
  className?: string;
}

export const MLAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionContent>,
  MLAccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionContent
    ref={ref}
    className="overflow-hidden text-sm text-base-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionContent>
));
MLAccordionContent.displayName = 'MLAccordionContent';

/* ============================================
 * Convenience Types
 * ============================================ */
export type AccordionType = 'single' | 'multiple';
