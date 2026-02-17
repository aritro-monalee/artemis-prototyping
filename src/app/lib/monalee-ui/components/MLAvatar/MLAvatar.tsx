import * as React from 'react';
import { Avatar as AvatarPrimitive, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================
// Types
// ============================================

const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    size: {
      xs: 'size-5',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12',
      '2xl': 'size-16',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'lg',
    shape: 'circle',
  },
});

const avatarFallbackTextVariants = cva('', {
  variants: {
    size: {
      xs: 'text-[8px]',
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-sm',
      '2xl': 'text-base',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive>,
    VariantProps<typeof avatarVariants> {
  /**
   * The image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text to display when image fails to load (usually initials)
   */
  fallback?: string;
  /**
   * Delay in ms before showing fallback
   */
  delayMs?: number;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to show before displaying +N
   */
  max?: number;
  /**
   * Size of avatars in the group
   */
  size?: VariantProps<typeof avatarVariants>['size'];
}

// ============================================
// Components
// ============================================

/**
 * Avatar - An image element with a fallback for representing the user.
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="/profile.jpg"
 *   alt="John Doe"
 *   fallback="JD"
 *   size="lg"
 * />
 * ```
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, size, shape, delayMs, children, ...props }, ref) => {
    return (
      <AvatarPrimitive
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        {src && <AvatarImage src={src} alt={alt} />}
        {fallback && (
          <AvatarFallback delayMs={delayMs} className={cn(avatarFallbackTextVariants({ size }))}>
            {fallback}
          </AvatarFallback>
        )}
        {children}
      </AvatarPrimitive>
    );
  }
);
Avatar.displayName = 'Avatar';

/**
 * AvatarGroup - Display multiple avatars stacked together.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="/user1.jpg" alt="User 1" fallback="U1" />
 *   <Avatar src="/user2.jpg" alt="User 2" fallback="U2" />
 *   <Avatar src="/user3.jpg" alt="User 3" fallback="U3" />
 *   <Avatar src="/user4.jpg" alt="User 4" fallback="U4" />
 * </AvatarGroup>
 * ```
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, size = 'lg', ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const displayChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max ? childArray.length - max : 0;

    const sizeClasses: Record<string, string> = {
      xs: 'size-5',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12',
      '2xl': 'size-16',
    };

    return (
      <div ref={ref} className={cn('flex items-center -space-x-2', className)} {...props}>
        {displayChildren.map((child, index) => {
          if (React.isValidElement<AvatarProps>(child)) {
            return React.cloneElement(child, {
              key: index,
              size: child.props.size ?? size,
              className: cn('border-2 border-base-background ring-0', child.props.className),
            });
          }
          return child;
        })}
        {remaining > 0 && (
          <div
            className={cn(
              'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-base-muted border-2 border-base-background text-base-foreground',
              sizeClasses[size ?? 'lg'],
              avatarFallbackTextVariants({ size })
            )}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

// Re-export primitives for advanced usage
export { AvatarImage, AvatarFallback };

export { Avatar, AvatarGroup, avatarVariants };
