import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, ChevronDown, MoreHorizontal, Slash } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * The separator element between breadcrumb items
   * @default <ChevronRight />
   */
  separator?: 'chevron' | 'slash' | React.ReactNode;
}

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<'ol'> {}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {}

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * Render as a different element using Radix Slot
   */
  asChild?: boolean;
  /**
   * Show dropdown indicator
   */
  hasDropdown?: boolean;
}

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {}

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'li'> {}

export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<'span'> {}

// ============================================
// Components
// ============================================

/**
 * Breadcrumb - Displays the path to the current resource using a hierarchy of links.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props} />
  )
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-2.5 break-words text-sm text-base-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props} />
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, hasDropdown, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 transition-colors hover:text-base-foreground',
          className
        )}
        {...props}
      >
        {children}
        {hasDropdown && <ChevronDown className="size-4" />}
      </Comp>
    );
  }
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, color: _color, ...props }, ref) => (
    <MLText
      as="span"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-base-foreground', className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ children, className, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-4 text-base-muted-foreground', className)}
      {...props}
    >
      {children ?? <ChevronRight className="size-4" />}
    </li>
  )
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Slash separator variant
 */
const BreadcrumbSlash = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-4 text-base-muted-foreground', className)}
      {...props}
    >
      <Slash className="size-4" />
    </li>
  )
);
BreadcrumbSlash.displayName = 'BreadcrumbSlash';

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  ({ className, color: _color, ...props }, ref) => (
    <MLText
      as="span"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      role="presentation"
      aria-hidden="true"
      className={cn(
        'flex h-9 w-9 items-center justify-center text-base-muted-foreground',
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <MLText as="span" className="sr-only">
        More
      </MLText>
    </MLText>
  )
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbSlash,
  BreadcrumbEllipsis,
};
