import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui';

export interface MLPaginationProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'onChange'
  > {
  /**
   * The current page number.
   */
  current?: number;
  /**
   * The number of items per page.
   */
  pageSize?: number;
  /**
   * The total number of pages.
   */
  total?: number;
  /**
   * The callback called when the user clicks on a page.
   */
  onChange?: (page: number) => void;
}

export const MLPagination: React.FC<MLPaginationProps> = ({
  current = 1,
  pageSize = 10,
  total = 0,
  onChange,
  ...rest
}) => {
  const [_current, setCurrent] = useState(current);
  const [pageCount, setPageCount] = useState(Math.ceil(total / pageSize));

  useEffect(() => {
    setPageCount(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  useEffect(() => {
    setCurrent(current);
  }, [current]);

  const handlePageClick = (page: number) => {
    setCurrent(page);
    if (onChange) {
      onChange(page);
    }
  };

  const handleNext = () => {
    if (_current < pageCount) {
      handlePageClick(_current + 1);
    }
  };

  const handlePrev = () => {
    if (_current > 1) {
      handlePageClick(_current - 1);
    }
  };

  const renderPageNumbers = () => {
    const items = [];

    if (pageCount <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= pageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={_current === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Complex pagination logic for many pages
      if (_current >= pageCount / 2) {
        // Show first page
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              isActive={_current === 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        // Show ellipsis
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show middle pages (3 pages around current)
      for (let i = 0; i < 3; i++) {
        let pageNum;
        if (_current === 1) {
          pageNum = _current + i;
        } else if (_current === pageCount) {
          pageNum = _current - 2 + i;
        } else {
          pageNum = _current - 1 + i;
        }

        if (pageNum >= 1 && pageNum <= pageCount) {
          items.push(
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={_current === pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (_current < pageCount / 2) {
        // Show ellipsis
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );

        // Show last page
        items.push(
          <PaginationItem key={pageCount}>
            <PaginationLink
              href="#"
              isActive={_current === pageCount}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageCount);
              }}
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex justify-between items-center" {...rest}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
              className={cn({
                'pointer-events-none opacity-50': _current === 1,
              })}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={cn({
                'pointer-events-none opacity-50': _current === pageCount,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
