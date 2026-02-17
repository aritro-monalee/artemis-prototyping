'use client';

import * as React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MLText } from '../MLText';

// ============================================
// Types
// ============================================

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ColorPickerProps {
  /**
   * The current color value (hex format)
   */
  value?: string;
  /**
   * Callback when color changes
   */
  onChange?: (color: string) => void;
  /**
   * Label for the color picker
   */
  label?: string;
  /**
   * Placeholder text when no color is selected
   */
  placeholder?: string;
  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Default color format to display
   */
  defaultFormat?: ColorFormat;
  /**
   * Show opacity slider
   */
  showOpacity?: boolean;
  /**
   * Default open state
   */
  defaultOpen?: boolean;
}

// ============================================
// Utility Functions
// ============================================

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function formatColor(hex: string, format: ColorFormat): string {
  if (format === 'hex') {
    return hex.toUpperCase();
  }

  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  if (format === 'rgb') {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  if (format === 'hsl') {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  return hex;
}

// ============================================
// Component
// ============================================

/**
 * ColorPicker - A color picker input component with popover.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   label="Select Color"
 *   value="#4F46E5"
 *   onChange={(color) => console.log(color)}
 * />
 * ```
 */
const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value = '#4F46E5',
      onChange,
      label,
      placeholder = 'Select a color',
      disabled = false,
      className,
      defaultFormat = 'hex',
      showOpacity = true,
      defaultOpen = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const [format, setFormat] = React.useState<ColorFormat>(defaultFormat);
    const [opacity, setOpacity] = React.useState(100);
    const [internalColor, setInternalColor] = React.useState(value);

    // Sync internal color with prop
    React.useEffect(() => {
      setInternalColor(value);
    }, [value]);

    const handleColorChange = (newColor: string) => {
      setInternalColor(newColor);
      onChange?.(newColor);
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOpacity = parseInt(e.target.value, 10);
      if (!isNaN(newOpacity) && newOpacity >= 0 && newOpacity <= 100) {
        setOpacity(newOpacity);
      }
    };

    const displayColor = internalColor || value;
    const formattedColor = formatColor(displayColor, 'hex');

    return (
      <div ref={ref} className={cn('flex flex-col gap-2 w-[260px]', className)}>
        {label && (
          <label className="text-sm font-medium leading-none text-base-foreground">{label}</label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <button
              type="button"
              className={cn(
                'flex items-center gap-1 h-9 w-full px-3 py-1 rounded-md border border-base-border bg-base-input-background shadow-xs',
                'text-sm text-muted-foreground overflow-hidden',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'transition-colors'
              )}
            >
              <div
                className="size-5 rounded-2xl shrink-0"
                style={{ backgroundColor: displayColor }}
              />
              <MLText
                as="span"
                className="flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {displayColor ? `# ${formattedColor.replace('#', '')}` : placeholder}
              </MLText>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-[260px] p-4" align="start" sideOffset={8}>
            <div className="flex flex-col gap-4">
              {/* Color Space */}
              <HexColorPicker
                color={internalColor}
                onChange={handleColorChange}
                style={{ width: '100%', height: '160px' }}
              />

              {/* Fields Row */}
              <div className="flex items-center gap-2">
                {/* Format Selector */}
                <div className="relative shrink-0">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as ColorFormat)}
                    className={cn(
                      'appearance-none h-9 px-3 pr-8 rounded-md border border-input bg-base-input-background shadow-xs',
                      'text-xs text-base-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring'
                    )}
                  >
                    <option value="hex">Hex</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Color Input */}
                <div className="shrink-0">
                  <HexColorInput
                    color={internalColor}
                    onChange={handleColorChange}
                    prefixed
                    className={cn(
                      'h-9 w-[85px] px-3 rounded-md border border-base-border bg-base-input-background shadow-xs',
                      'text-xs text-base-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring'
                    )}
                  />
                </div>

                {/* Opacity Input */}
                {showOpacity && (
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={`${opacity}%`}
                        onChange={(e) => {
                          const val = e.target.value.replace('%', '');
                          const num = parseInt(val, 10);
                          if (!isNaN(num) && num >= 0 && num <= 100) {
                            setOpacity(num);
                          }
                        }}
                        className={cn(
                          'h-9 w-full px-3 rounded-md border border-base-border bg-base-input-background shadow-xs',
                          'text-xs text-base-foreground',
                          'focus:outline-none focus:ring-2 focus:ring-ring'
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Color Preview */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MLText as="span">Preview:</MLText>
                <div
                  className="size-6 rounded border border-base-border"
                  style={{
                    backgroundColor: displayColor,
                    opacity: opacity / 100,
                  }}
                />
                <MLText as="span" className="font-mono">
                  {formatColor(displayColor, format)}
                </MLText>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
