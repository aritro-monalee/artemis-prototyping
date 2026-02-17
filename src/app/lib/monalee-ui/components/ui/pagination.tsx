import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '../../utils/cn';
import { Button, buttonVariants } from '../../components/ui/button';
import { MLText } from '../MLText';
import { MLIconContainer } from '../MLIconContainer';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        isActive && 'shadow-xs',
        // Ensure press animation works on anchor elements
        'cursor-pointer select-none',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5 pr-4', className)}
      {...props}
    >
      <MLIconContainer icon={<ChevronLeft />} size="base" />
      <MLText as="span">Previous</MLText>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 pl-4 pr-2.5', className)}
      {...props}
    >
      <MLText as="span">Next</MLText>
      <MLIconContainer icon={<ChevronRight />} size="base" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, color: _color, ...props }: React.ComponentProps<'span'>) {
  return (
    <MLText
      as="span"
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MLIconContainer icon={<MoreHorizontal />} size="base" />
      <MLText as="span" className="sr-only">
        More pages
      </MLText>
    </MLText>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
