import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../utils/cn';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return;

      const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement;
      if (!activeTab) return;

      const listRect = listRef.current.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - listRect.left,
        width: activeRect.width,
      });

      // Check if dark mode
      const isDarkMode =
        listRef.current.closest('.dark') !== null ||
        document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    updateIndicator();

    // Update indicator when tabs change
    const observer = new MutationObserver(updateIndicator);
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ['data-state'],
      });
    }

    // Update on resize
    window.addEventListener('resize', updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
      {...props}
    >
      {/* Animated indicator - Light: white bg, Dark: white/5 bg with white/15 border */}
      {indicatorStyle.width > 0 && (
        <div
          className={cn(
            'absolute h-[calc(100%-6px)] rounded-md z-0',
            // GPU acceleration for smooth animation
            'transform-gpu',
            // Smooth ease-out for indicator slide
            'transition-[left,width] duration-200 ease-out',
            // Motion reduce support
            'motion-reduce:transition-none'
          )}
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            top: '3px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : 'none',
            boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)',
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
