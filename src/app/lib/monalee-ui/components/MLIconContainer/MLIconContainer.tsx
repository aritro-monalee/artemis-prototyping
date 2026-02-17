import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ============================================
// IconContainer Variants
// ============================================

const iconContainerVariants = cva(
  'inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full',
  {
    variants: {
      size: {
        xs: 'size-3 [&>svg]:stroke-[1.5px]', // 12x12, stroke 1.5px
        sm: 'size-3.5 [&>svg]:stroke-[1.75px]', // 14x14, stroke 1.75px
        base: 'size-4 [&>svg]:stroke-[2px]', // 16x16, stroke 2px
        lg: 'size-5 [&>svg]:stroke-[2.25px]', // 20x20, stroke 2.25px
        xl: 'size-6 [&>svg]:stroke-[2.5px]', // 24x24, stroke 2.5px
        '2xl': 'size-8 [&>svg]:stroke-[3px]', // 32x32, stroke 3px
      },
    },
    defaultVariants: {
      size: 'base',
    },
  }
);

// ============================================
// Stroke width mapping for programmatic access
// ============================================

export const iconStrokeWidths = {
  xs: 1.5,
  sm: 1.75,
  base: 2,
  lg: 2.25,
  xl: 2.5,
  '2xl': 3,
} as const;

// ============================================
// Types
// ============================================

export type MLIconContainerSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export interface MLIconContainerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconContainerVariants> {
  /**
   * The icon to display. Supports:
   * - Lucide icons: `<Star />`
   * - FontAwesome icons: `<FontAwesomeIcon icon={faStar} />`
   * - Custom SVG components: `<MyCustomIcon />`
   */
  icon: React.ReactNode;
  /**
   * Size of the icon container
   * - xs: 12x12, stroke 1.5px
   * - sm: 14x14, stroke 1.75px
   * - base: 16x16, stroke 2px (default)
   * - lg: 20x20, stroke 2.25px
   * - xl: 24x24, stroke 2.5px
   * - 2xl: 32x32, stroke 3px
   */
  size?: MLIconContainerSize;
}

// ============================================
// Component
// ============================================

/**
 * MLIconContainer - A container for icons with consistent sizing and stroke width.
 *
 * Supports Lucide icons, FontAwesome icons, or any custom React component
 * that renders an SVG. Container is unstyled by default - add your own
 * background, padding, and border-radius via className.
 *
 * Stroke width scales with size:
 * - xs: 1.5px, sm: 1.75px, base: 2px, lg: 2.25px, xl: 2.5px, 2xl: 3px
 *
 * @example
 * ```tsx
 * // Basic usage with Lucide icon
 * <MLIconContainer icon={<Star />} size="base" />
 *
 * // With custom styling
 * <MLIconContainer
 *   icon={<Bell />}
 *   size="lg"
 *   className="p-2 text-purple-500 bg-purple-100 rounded-full"
 * />
 *
 * // With FontAwesome
 * <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xl" />
 *
 * // With custom SVG component
 * <MLIconContainer icon={<MyCustomSvgIcon />} size="2xl" />
 * ```
 */
const MLIconContainer = React.forwardRef<HTMLSpanElement, MLIconContainerProps>(
  ({ className, icon, size = 'base', ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="icon-container"
        className={cn(iconContainerVariants({ size }), className)}
        {...props}
      >
        {icon}
      </span>
    );
  }
);
MLIconContainer.displayName = 'MLIconContainer';

export { MLIconContainer, iconContainerVariants };
