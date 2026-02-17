import { ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortDescriptor {
  column: string;
  direction: SortDirection;
}

export interface MLColumnProps {
  title: ReactNode;
  dataIndex: string;
  key: string;
  className?: string;
  /**
   * Allow sorting on this column. When true, clicking the column header toggles sort direction.
   */
  allowsSorting?: boolean;
  /**
   * Custom sort function for this column. If not provided, default string/number comparison is used.
   * Return negative if a < b, positive if a > b, zero if equal.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortFn?: (a: any, b: any) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (text: any, record: any, rowIndex: number, columnIndex: number) => ReactNode;
}

// TODO: fix this type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MLDataSourceProps = Record<string, any>;
