import React, { useMemo, useState, useRef, useEffect, forwardRef } from 'react';
import { MLDropdownMenu, MLDropdownMenuContent, MLDropdownMenuTrigger } from '../MLDropdownMenu';
import { MLChip } from '../MLChip';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

export interface MLChipItem {
  id: string;
  label: string;
  value?: number | string;
  color?: 'default' | 'black' | 'success' | 'gray';
}

export interface MLChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of chip items to display
   */
  items: MLChipItem[];
  /**
   * Maximum number of chips to display before showing "+X more"
   */
  displayLimit?: number;
  /**
   * Size of the chips
   */
  chipSize?: 'sm' | 'md' | 'lg';
  /**
   * Text to show when there are no items
   */
  emptyText?: string;
  /**
   * Whether chips should be closable
   */
  closable?: boolean;
  /**
   * Callback for when a chip is removed
   */
  onChipRemove?: (id: string) => void;
}

/**
 * ChipGroup - Display a group of chips with overflow handling.
 *
 * @example
 * ```tsx
 * <ChipGroup
 *   items={[
 *     { id: '1', label: 'Tag 1' },
 *     { id: '2', label: 'Tag 2' },
 *   ]}
 *   displayLimit={2}
 * />
 * ```
 */
export const MLChipGroup = forwardRef<HTMLDivElement, MLChipGroupProps>(
  (
    {
      items = [],
      displayLimit = 2,
      chipSize = 'sm',
      emptyText = 'None',
      className,
      closable = false,
      onChipRemove,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const { displayedItems, hiddenItems, hiddenItemsCount } = useMemo(() => {
      if (!items || items.length === 0) {
        return { displayedItems: [], hiddenItems: [], hiddenItemsCount: 0 };
      }

      return {
        displayedItems: items.slice(0, displayLimit),
        hiddenItems: items.slice(displayLimit),
        hiddenItemsCount: Math.max(0, items.length - displayLimit),
      };
    }, [items, displayLimit]);

    const handleChipRemove = (id: string) => {
      if (onChipRemove) {
        onChipRemove(id);
      }
    };

    if (!items || items.length === 0) {
      return (
        <MLText as="span" className="text-gray-500 text-xs">
          {emptyText}
        </MLText>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-wrap items-center gap-1', className)} {...props}>
        {displayedItems.map((item) => (
          <MLChip
            key={item.id}
            size={chipSize}
            label={item.label}
            value={item.value}
            closable={closable}
            color={item.color}
            onRemove={closable ? () => handleChipRemove(item.id) : undefined}
          />
        ))}

        {hiddenItemsCount > 0 && (
          <MLDropdownMenu open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal={false}>
            <MLDropdownMenuTrigger asChild>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <MLChip
                  size={chipSize}
                  label={`+${hiddenItemsCount}`}
                  aria-label={`Show ${hiddenItemsCount} more items`}
                />
              </div>
            </MLDropdownMenuTrigger>
            <MLDropdownMenuContent
              className="w-48 p-2"
              align="end"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid gap-2">
                {hiddenItems.map((item) => (
                  <MLChip
                    key={item.id}
                    size={chipSize}
                    label={item.label}
                    value={item.value}
                    closable={closable}
                    color={item.color}
                    onRemove={closable ? () => handleChipRemove(item.id) : undefined}
                  />
                ))}
              </div>
            </MLDropdownMenuContent>
          </MLDropdownMenu>
        )}
      </div>
    );
  }
);

MLChipGroup.displayName = 'MLChipGroup';
