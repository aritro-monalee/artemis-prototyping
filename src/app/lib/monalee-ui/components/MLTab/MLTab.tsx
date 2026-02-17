import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../utils/cn';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { MLText } from '../MLText';

export interface Tab {
  id: string;
  label: React.ReactNode;
  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;
  /**
   * Optional badge to display after the label (e.g., notification count)
   */
  badge?: React.ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface MLTabProps
  extends Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    'value' | 'onValueChange' | 'defaultValue' | 'onChange'
  > {
  /**
   * List of tabs to show
   */
  tabs: Tab[];
  /**
   * The currently active tab
   */
  activeTab: string;
  /**
   * Callback function for when the tab is changed
   */
  onChange: (id: string) => void;
  /**
   * The size of the tab.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional class name for the tabs list
   */
  listClassName?: string;
  /**
   * Children to render (typically TabsContent components)
   */
  children?: React.ReactNode;
}

/**
 * Badge component for tab notifications
 */
const TabBadge = ({ children }: { children: React.ReactNode }) => (
  <MLText
    as="span"
    className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground"
  >
    {children}
  </MLText>
);

/**
 * Tab - A tabbed navigation component.
 *
 * @example
 * ```tsx
 * <Tab
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1' },
 *     { id: 'tab2', label: 'Tab 2' },
 *   ]}
 *   activeTab="tab1"
 *   onChange={(id) => setActiveTab(id)}
 * />
 * ```
 */
export const MLTab = forwardRef<HTMLDivElement, MLTabProps>(
  ({ tabs, activeTab, onChange, className, listClassName, children, ...props }, ref) => {
    return (
      <Tabs
        ref={ref}
        value={activeTab}
        onValueChange={onChange}
        className={cn('w-fit', className)}
        {...props}
      >
        <TabsList className={listClassName}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} disabled={tab.disabled}>
              {tab.icon && (
                <MLText as="span" className="shrink-0">
                  {tab.icon}
                </MLText>
              )}
              {tab.label}
              {tab.badge !== undefined && <TabBadge>{tab.badge}</TabBadge>}
            </TabsTrigger>
          ))}
        </TabsList>

        {children}
      </Tabs>
    );
  }
);

MLTab.displayName = 'MLTab';

export { TabBadge };
