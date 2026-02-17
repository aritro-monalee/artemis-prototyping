'use client';

import * as React from 'react';
import {
  Card as CardPrimitive,
  CardHeader as CardHeaderPrimitive,
  CardTitle as CardTitlePrimitive,
  CardDescription as CardDescriptionPrimitive,
  CardAction as CardActionPrimitive,
  CardContent as CardContentPrimitive,
  CardFooter as CardFooterPrimitive,
  type CardProps as CardPrimitiveProps,
} from '../ui/card';
import { cn } from '../../utils/cn';

// ============================================
// Types
// ============================================

export type CardProps = CardPrimitiveProps;
export type CardHeaderProps = React.ComponentPropsWithoutRef<typeof CardHeaderPrimitive>;
export type CardTitleProps = React.ComponentPropsWithoutRef<typeof CardTitlePrimitive>;
export type CardDescriptionProps = React.ComponentPropsWithoutRef<typeof CardDescriptionPrimitive>;
export type CardActionProps = React.ComponentPropsWithoutRef<typeof CardActionPrimitive>;
export type CardContentProps = React.ComponentPropsWithoutRef<typeof CardContentPrimitive>;
export type CardFooterProps = React.ComponentPropsWithoutRef<typeof CardFooterPrimitive>;

// ============================================
// Components
// ============================================

/**
 * Card - A container for grouping related content and actions.
 *
 * Cards are surfaces that display content and actions on a single topic.
 * They should be easy to scan for relevant and actionable information.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here.</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <CardPrimitive ref={ref} className={cn(className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <CardHeaderPrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <CardTitlePrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <CardDescriptionPrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, ...props }, ref) => (
    <CardActionPrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardAction.displayName = 'CardAction';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <CardContentPrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <CardFooterPrimitive ref={ref} className={cn(className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
