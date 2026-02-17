'use client';

import React, { DetailedHTMLProps, TableHTMLAttributes, useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { MLColumnProps, MLDataSourceProps, SortDescriptor, SortDirection } from './types';
import { MLPagination, type MLPaginationProps } from '../MLPagination';
import { cn } from '../../utils/cn';
import { isEmpty } from 'lodash';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface MLTableProps
  extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  /**
   * The size of the table.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The columns of the table.
   */
  columns: MLColumnProps[];
  /**
   * The data source of the table.
   */
  dataSource: MLDataSourceProps[];
  /**
   * Whether to show the arrow on the right of the table.
   */
  showArrow?: boolean;
  pagination?: MLPaginationProps;
  /**
   * The callback called when the user clicks on a row.
   */
  onRowClick?: (record: MLDataSourceProps, index: number) => void;
  /**
   * Whether to make the header sticky.
   */
  stickyHeader?: boolean;
  headerClassName?: string;
  bodyClassName?: string;
  /**
   * Whether the table rows are draggable.
   */
  draggable?: boolean;
  /**
   * Callback called when rows are reordered.
   */
  onReorder?: (newData: MLDataSourceProps[]) => void;
  /**
   * Custom drag handle component. If provided, only the handle is draggable.
   * If not provided, the entire row is draggable.
   */
  dragHandle?: React.ReactNode;
  /**
   * Current sort state (controlled mode).
   * When provided, sorting is controlled externally.
   */
  sortDescriptor?: SortDescriptor;
  /**
   * Callback when sort changes.
   * Receives the new sort descriptor when a sortable column header is clicked.
   */
  onSortChange?: (descriptor: SortDescriptor) => void;
  /**
   * Default sort state (uncontrolled mode).
   */
  defaultSortDescriptor?: SortDescriptor;
}

export const MLTable: React.FC<MLTableProps> = ({
  size = 'md',
  columns,
  dataSource,
  showArrow,
  pagination = {},
  onRowClick,
  stickyHeader = false,
  headerClassName,
  bodyClassName,
  className,
  draggable = false,
  onReorder,
  dragHandle,
  sortDescriptor: controlledSortDescriptor,
  onSortChange,
  defaultSortDescriptor,
  ...rest
}) => {
  const [items, setItems] = useState(dataSource);
  const [internalSortDescriptor, setInternalSortDescriptor] = useState<SortDescriptor>(
    defaultSortDescriptor ?? { column: '', direction: null }
  );
  
  // Use controlled or internal sort descriptor
  const sortDescriptor = controlledSortDescriptor ?? internalSortDescriptor;
  const isControlled = controlledSortDescriptor !== undefined;

  useEffect(() => {
    setItems(dataSource);
  }, [dataSource]);
  
  // Handle sort column click
  const handleSortClick = useCallback((column: MLColumnProps) => {
    if (!column.allowsSorting) return;
    
    const currentDirection = sortDescriptor.column === column.dataIndex ? sortDescriptor.direction : null;
    let newDirection: SortDirection;
    
    // Cycle: null -> asc -> desc -> null
    if (currentDirection === null) {
      newDirection = 'asc';
    } else if (currentDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }
    
    const newDescriptor: SortDescriptor = {
      column: newDirection ? column.dataIndex : '',
      direction: newDirection,
    };
    
    if (isControlled) {
      onSortChange?.(newDescriptor);
    } else {
      setInternalSortDescriptor(newDescriptor);
      onSortChange?.(newDescriptor);
    }
  }, [sortDescriptor, isControlled, onSortChange]);
  
  // Sort items based on sort descriptor
  const sortedItems = useMemo(() => {
    if (!sortDescriptor.direction || !sortDescriptor.column) {
      return items;
    }
    
    const column = columns.find(c => c.dataIndex === sortDescriptor.column);
    if (!column) return items;
    
    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortDescriptor.column];
      const bValue = b[sortDescriptor.column];
      
      // Use custom sort function if provided
      if (column.sortFn) {
        return column.sortFn(aValue, bValue);
      }
      
      // Default comparison
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // Number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }
      
      // String comparison
      return String(aValue).localeCompare(String(bValue));
    });
    
    return sortDescriptor.direction === 'desc' ? sorted.reverse() : sorted;
  }, [items, sortDescriptor, columns]);
  
  // Render sort indicator
  const renderSortIndicator = (column: MLColumnProps) => {
    if (!column.allowsSorting) return null;
    
    const isActive = sortDescriptor.column === column.dataIndex && sortDescriptor.direction !== null;
    const direction = sortDescriptor.column === column.dataIndex ? sortDescriptor.direction : null;
    
    return (
      <span className={cn(
        'ml-1 inline-flex items-center transition-colors duration-150',
        isActive ? 'text-base-foreground' : 'text-base-muted-foreground/50'
      )}>
        {direction === 'asc' ? (
          <ChevronUp className="size-3.5" />
        ) : direction === 'desc' ? (
          <ChevronDown className="size-3.5" />
        ) : (
          <ChevronsUpDown className="size-3.5" />
        )}
      </span>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    record: MLDataSourceProps,
    index: number
  ) => {
    e.stopPropagation();
    if (onRowClick) {
      onRowClick(record, index);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.key === active.id);
        const newIndex = items.findIndex((item) => item.key === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        if (onReorder) {
          onReorder(newItems);
        }
        return newItems;
      });
    }
  };

  // Sortable Row Component
  const SortableRow: React.FC<{
    record: MLDataSourceProps;
    rowIndex: number;
    children: React.ReactNode;
  }> = ({ record, rowIndex, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: record.key ?? rowIndex,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr
        ref={setNodeRef}
        style={style}
        className={cn(
          'border-b border-base-border last:border-b-0',
          // Hover state - cream color with smooth transition
          'transition-colors duration-150 ease-in-out',
          'hover:bg-cream-100/50 data-[state=selected]:bg-cream-100',
          onRowClick && 'cursor-pointer',
          'group',
          isDragging && 'opacity-70 bg-cream-50'
        )}
        onClick={(e) => handleRowClick(e, record, rowIndex)}
        {...(dragHandle ? {} : { ...attributes, ...listeners })}
      >
        {children}
      </tr>
    );
  };

  // Drag Handle Component
  const DragHandle: React.FC<{ record: MLDataSourceProps; rowIndex: number }> = ({
    record,
    rowIndex,
  }) => {
    const { attributes, listeners } = useSortable({ id: record.key ?? rowIndex });

    return (
      <div
        className="w-4 h-4 flex items-center justify-center cursor-grab active:cursor-grabbing text-base-muted-foreground hover:text-base-foreground transition-colors"
        {...attributes}
        {...listeners}
      >
        {dragHandle}
      </div>
    );
  };

  const sizeConfig = {
    sm: {
      header: 'px-2 py-2 text-xs',
      cell: 'px-2 py-2 text-sm',
      table: 'text-sm',
    },
    md: {
      header: 'px-2 py-3 text-xs',
      cell: 'px-2 py-2 text-sm',
      table: 'text-sm',
    },
    lg: {
      header: 'px-4 py-4 text-sm',
      cell: 'px-4 py-3 text-base',
      table: 'text-base',
    },
  };

  const currentSize = sizeConfig[size];

  const renderTableBody = () => {
    if (sortedItems.length === 0) {
      const colSpan = columns.length + (draggable && dragHandle ? 1 : 0);
      return (
        <tr>
          <td
            colSpan={colSpan}
            className={cn('text-center text-base-muted-foreground py-6', currentSize.cell)}
          >
            No data available
          </td>
        </tr>
      );
    }

    if (draggable) {
      return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={sortedItems.map((item) => item.key ?? sortedItems.indexOf(item))}
            strategy={verticalListSortingStrategy}
          >
            {sortedItems.map((record, rowIndex) => (
              <SortableRow key={record.key ?? rowIndex} record={record} rowIndex={rowIndex}>
                {draggable && dragHandle && (
                  <td className={cn('align-middle text-base-foreground', currentSize.cell, 'w-8')}>
                    <DragHandle record={record} rowIndex={rowIndex} />
                  </td>
                )}
                {columns.map((column, columnIndex) => {
                  const isLastColumn = columnIndex === columns.length - 1;
                  const shouldShowArrow = showArrow && isLastColumn;

                  return (
                    <td
                      key={column.key}
                      className={cn(
                        'align-middle text-base-foreground',
                        currentSize.cell,
                        column.className,
                        shouldShowArrow && 'relative'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 truncate">
                          {column.render
                            ? column.render(record[column.dataIndex], record, rowIndex, columnIndex)
                            : record[column.dataIndex]}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </SortableRow>
            ))}
          </SortableContext>
        </DndContext>
      );
    }

    return sortedItems.map((record, rowIndex) => (
      <tr
        key={record.key ?? rowIndex}
        className={cn(
          'border-b border-base-border last:border-b-0',
          // Hover state - cream color with smooth transition
          'transition-colors duration-150 ease-in-out',
          'hover:bg-cream-100/50 data-[state=selected]:bg-cream-100',
          onRowClick && 'cursor-pointer',
          'group'
        )}
        onClick={(e) => handleRowClick(e, record, rowIndex)}
      >
        {draggable && dragHandle && (
          <td className={cn('align-middle text-base-foreground', currentSize.cell, 'w-8')}>
            <DragHandle record={record} rowIndex={rowIndex} />
          </td>
        )}
        {columns.map((column, columnIndex) => {
          const isLastColumn = columnIndex === columns.length - 1;
          const shouldShowArrow = showArrow && isLastColumn;

          return (
            <td
              key={column.key}
              className={cn(
                'align-middle text-base-foreground',
                currentSize.cell,
                column.className,
                shouldShowArrow && 'relative'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 truncate">
                  {column.render
                    ? column.render(record[column.dataIndex], record, rowIndex, columnIndex)
                    : record[column.dataIndex]}
                </div>
              </div>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full overflow-visible border border-base-border rounded-md shadow-xs">
        <table
          className={cn('w-full caption-bottom border-collapse', currentSize.table, className)}
          {...rest}
        >
          {/* Header */}
          <thead
            className={cn(
              stickyHeader && 'sticky top-0 z-10',
              'bg-base-background',
              headerClassName
            )}
          >
            <tr className="border-b border-base-border hover:bg-transparent">
              {draggable && dragHandle && (
                <th
                  className={cn(
                    'text-left align-middle text-base-muted-foreground font-medium uppercase',
                    'first:rounded-tl-md',
                    currentSize.header,
                    'w-8'
                  )}
                >
                  {/* Empty header for drag handle column */}
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left align-middle text-base-muted-foreground font-medium uppercase',
                    'first:rounded-tl-md last:rounded-tr-md',
                    currentSize.header,
                    column.className,
                    column.allowsSorting && 'cursor-pointer select-none hover:text-base-foreground transition-colors duration-150'
                  )}
                  onClick={() => handleSortClick(column)}
                  aria-sort={
                    sortDescriptor.column === column.dataIndex
                      ? sortDescriptor.direction === 'asc'
                        ? 'ascending'
                        : sortDescriptor.direction === 'desc'
                          ? 'descending'
                          : undefined
                      : undefined
                  }
                >
                  <div className="flex items-center">
                    {column.title}
                    {renderSortIndicator(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className={cn('divide-y divide-base-border', bodyClassName)}>
            {renderTableBody()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isEmpty(pagination) && sortedItems.length > 0 && (
        <MLPagination
          current={pagination?.current}
          total={pagination?.total}
          pageSize={pagination?.pageSize}
          onChange={pagination?.onChange}
        />
      )}
    </div>
  );
};
