'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ============================================
// Variants using class-variance-authority
// ============================================

const textVariants = cva('', {
  variants: {
    /**
     * Semantic variant that applies preset styling for common use cases
     */
    variant: {
      // Headings
      h1: 'text-4xl font-bold leading-tight tracking-tight',
      h2: 'text-3xl font-semibold leading-tight tracking-tight',
      h3: 'text-2xl font-semibold leading-snug',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-semibold leading-normal',
      h6: 'text-base font-semibold leading-normal',
      // Body text
      body: 'text-base leading-relaxed',
      'body-lg': 'text-lg leading-relaxed',
      'body-sm': 'text-sm leading-relaxed',
      // Supporting text
      caption: 'text-xs leading-normal',
      overline: 'text-xs font-semibold uppercase tracking-wider',
      label: 'text-sm font-medium leading-none',
      // Special
      lead: 'text-xl leading-relaxed text-base-muted-foreground',
      quote: 'text-lg italic border-l-4 border-base-border pl-4',
      code: 'font-mono text-sm bg-base-muted px-1.5 py-0.5 rounded-sm',
      kbd: 'font-mono text-xs bg-base-muted border border-base-border px-1.5 py-0.5 rounded-sm shadow-xs',
    },
    /**
     * Font size - maps to design tokens
     */
    size: {
      inherit: 'text-inherit',
      xxs: 'text-xxs',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    /**
     * Font weight
     */
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    /**
     * Text color - semantic colors from design system
     */
    color: {
      default: 'text-base-foreground',
      muted: 'text-base-muted-foreground',
      primary: 'text-base-primary',
      secondary: 'text-base-secondary-foreground',
      accent: 'text-base-accent-foreground',
      destructive: 'text-base-destructive',
      success: 'text-green-600',
      warning: 'text-amber-600',
      info: 'text-blue-600',
      inherit: 'text-inherit',
    },
    /**
     * Text alignment
     */
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    /**
     * Font family
     */
    family: {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    },
    /**
     * Line height
     */
    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    /**
     * Letter spacing
     */
    tracking: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
    /**
     * Text decoration
     */
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      'line-through': 'line-through',
    },
    /**
     * Text transform
     */
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    /**
     * White space handling
     */
    wrap: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      'pre-line': 'whitespace-pre-line',
      'pre-wrap': 'whitespace-pre-wrap',
      break: 'whitespace-break-spaces',
    },
    /**
     * Text overflow handling
     */
    truncate: {
      true: 'truncate',
      false: '',
    },
    /**
     * Line clamp for multi-line truncation
     */
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
      none: 'line-clamp-none',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// ============================================
// Types
// ============================================

/**
 * Allowed HTML elements for the Text component
 */
type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'small'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'code'
  | 'pre'
  | 'kbd'
  | 'samp'
  | 'var'
  | 'abbr'
  | 'cite'
  | 'q'
  | 'blockquote'
  | 'address'
  | 'time'
  | 'legend'
  | 'figcaption'
  | 'dt'
  | 'dd'
  | 'li';

export interface MLTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /**
   * The HTML element to render.
   * Use this for semantic HTML - headings should use h1-h6, paragraphs should use p, etc.
   * @default 'span'
   */
  as?: TextElement;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * Useful for wrapping Next.js Link or other components.
   */
  asChild?: boolean;
  /**
   * Content to render
   */
  children?: React.ReactNode;
}

// ============================================
// Default element mapping for variants
// ============================================

const variantElementMap: Partial<
  Record<NonNullable<VariantProps<typeof textVariants>['variant']>, TextElement>
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-lg': 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
  label: 'label',
  lead: 'p',
  quote: 'blockquote',
  code: 'code',
  kbd: 'kbd',
};

// ============================================
// Component
// ============================================

/**
 * MLText - A polymorphic text component for consistent typography.
 *
 * Use this component for all text elements instead of raw HTML tags (h1, p, span, etc.).
 * It provides consistent styling and supports all typographic variants from the design system.
 *
 * @example
 * ```tsx
 * // Using semantic variants (recommended for common use cases)
 * <MLText variant="h1">Page Title</MLText>
 * <MLText variant="body">Paragraph text...</MLText>
 * <MLText variant="caption" color="muted">Small caption text</MLText>
 *
 * // Using explicit HTML elements
 * <MLText as="h1" size="4xl" weight="bold">Custom Heading</MLText>
 * <MLText as="p" size="lg" leading="relaxed">Paragraph</MLText>
 *
 * // Combining with other props
 * <MLText
 *   variant="body"
 *   color="muted"
 *   align="center"
 *   truncate
 * >
 *   Centered, muted, truncated text
 * </MLText>
 *
 * // Using asChild for composition
 * <MLText variant="body" asChild>
 *   <Link href="/about">Learn more</Link>
 * </MLText>
 * ```
 */
const MLText = React.forwardRef<HTMLElement, MLTextProps>(
  (
    {
      as,
      asChild = false,
      children,
      className,
      variant,
      size,
      weight,
      color,
      align,
      family,
      leading,
      tracking,
      decoration,
      transform,
      wrap,
      truncate,
      clamp,
      ...props
    },
    ref
  ) => {
    // Determine the element to render
    // Priority: explicit 'as' prop > variant-based default > 'span'
    const defaultElement = variant ? variantElementMap[variant] : undefined;
    const Element = as || defaultElement || 'span';

    const Comp = asChild ? Slot : Element;

    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        data-slot="text"
        className={cn(
          textVariants({
            variant,
            size,
            weight,
            color,
            align,
            family,
            leading,
            tracking,
            decoration,
            transform,
            wrap,
            truncate,
            clamp,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

MLText.displayName = 'MLText';

export { MLText, textVariants };
