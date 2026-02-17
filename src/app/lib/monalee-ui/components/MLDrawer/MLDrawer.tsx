import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { cn } from '../../utils/cn';
import { MLText } from '../MLText';

function MLDrawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function MLDrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function MLDrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function MLDrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function MLDrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20',
        className
      )}
      {...props}
    />
  );
}

function MLDrawerContent({
  className,
  children,
  showClose = true,
  showHandle = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  showClose?: boolean;
  showHandle?: boolean;
}) {
  return (
    <MLDrawerPortal>
      <MLDrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content bg-background border-border fixed z-50 flex h-auto flex-col border',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-t-0',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-b-0',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-r-0 data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-l-0 data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className
        )}
        {...props}
      >
        {showHandle && (
          <div className="hidden pt-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:block group-data-[vaul-drawer-direction=top]/drawer-content:block">
            <div className="bg-muted mx-auto h-2 w-[120px] shrink-0 rounded-full" />
          </div>
        )}
        {children}
        {showClose && (
          <DrawerPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <FontAwesomeIcon icon={faClose} className="size-4" />
            <MLText as="span" className="sr-only">
              Close
            </MLText>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </MLDrawerPortal>
  );
}

function MLDrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'mx-auto flex w-full max-w-[384px] flex-col gap-1.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
        className
      )}
      {...props}
    />
  );
}

function MLDrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mx-auto mt-auto flex w-full max-w-[384px] flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function MLDrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-body"
      className={cn('mx-auto flex w-full max-w-[384px] flex-col gap-3 px-4 pt-4', className)}
      {...props}
    />
  );
}

function MLDrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
}

function MLDrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm leading-5', className)}
      {...props}
    />
  );
}

export type MLDrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;
export type MLDrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content> & {
  showClose?: boolean;
  showHandle?: boolean;
};

export {
  MLDrawer,
  MLDrawerPortal,
  MLDrawerOverlay,
  MLDrawerTrigger,
  MLDrawerClose,
  MLDrawerContent,
  MLDrawerHeader,
  MLDrawerBody,
  MLDrawerFooter,
  MLDrawerTitle,
  MLDrawerDescription,
};
