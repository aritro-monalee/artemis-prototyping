import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MLIconContainer, iconStrokeWidths, type MLIconContainerProps } from './MLIconContainer';
import { Star, Bell, Heart, Settings, User, Check, Home, Search } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faHeart, faGear, faUser, faCheck } from '@fortawesome/pro-solid-svg-icons';
import {
  faStar as faStarLight,
  faBell as faBellLight,
  faHeart as faHeartLight,
} from '@fortawesome/pro-light-svg-icons';

const meta: Meta<MLIconContainerProps> = {
  title: 'Components/IconContainer',
  component: MLIconContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
      description: 'Size of the icon (affects both dimensions and stroke width)',
    },
  },
};

export default meta;
type Story = StoryObj<MLIconContainerProps>;

export const Default: Story = {
  args: {
    icon: <Star />,
    size: 'base',
  },
};

// ============================================
// Sizes - Lucide Icons
// ============================================

export const SizesLucide: Story = {
  name: 'Sizes - Lucide Icons',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="xs" className="text-gray-700" />
        <span className="text-xs text-gray-500">xs (12px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths.xs}px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="sm" className="text-gray-700" />
        <span className="text-xs text-gray-500">sm (14px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths.sm}px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="base" className="text-gray-700" />
        <span className="text-xs text-gray-500">base (16px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths.base}px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="lg" className="text-gray-700" />
        <span className="text-xs text-gray-500">lg (20px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths.lg}px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">xl (24px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths.xl}px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<Star />} size="2xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">2xl (32px)</span>
        <span className="text-[10px] text-gray-400">stroke: {iconStrokeWidths['2xl']}px</span>
      </div>
    </div>
  ),
};

// ============================================
// Sizes - FontAwesome Icons (Solid)
// ============================================

export const SizesFontAwesomeSolid: Story = {
  name: 'Sizes - FontAwesome Solid',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xs" className="text-gray-700" />
        <span className="text-xs text-gray-500">xs (12px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="sm" className="text-gray-700" />
        <span className="text-xs text-gray-500">sm (14px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="base" className="text-gray-700" />
        <span className="text-xs text-gray-500">base (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="lg" className="text-gray-700" />
        <span className="text-xs text-gray-500">lg (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">xl (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="2xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">2xl (32px)</span>
      </div>
    </div>
  ),
};

// ============================================
// Sizes - FontAwesome Icons (Light/Outline)
// ============================================

export const SizesFontAwesomeLight: Story = {
  name: 'Sizes - FontAwesome Light',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="xs" className="text-gray-700" />
        <span className="text-xs text-gray-500">xs (12px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="sm" className="text-gray-700" />
        <span className="text-xs text-gray-500">sm (14px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="base" className="text-gray-700" />
        <span className="text-xs text-gray-500">base (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="lg" className="text-gray-700" />
        <span className="text-xs text-gray-500">lg (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">xl (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="2xl" className="text-gray-700" />
        <span className="text-xs text-gray-500">2xl (32px)</span>
      </div>
    </div>
  ),
};

// ============================================
// Sizes - Custom SVG
// ============================================

export const SizesCustomSvg: Story = {
  name: 'Sizes - Custom SVG',
  render: () => {
    // Example custom SVG component (layers icon)
    const CustomLayersIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );

    return (
      <div className="flex items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="xs" className="text-gray-700" />
          <span className="text-xs text-gray-500">xs (12px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="sm" className="text-gray-700" />
          <span className="text-xs text-gray-500">sm (14px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="base" className="text-gray-700" />
          <span className="text-xs text-gray-500">base (16px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="lg" className="text-gray-700" />
          <span className="text-xs text-gray-500">lg (20px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="xl" className="text-gray-700" />
          <span className="text-xs text-gray-500">xl (24px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MLIconContainer icon={<CustomLayersIcon />} size="2xl" className="text-gray-700" />
          <span className="text-xs text-gray-500">2xl (32px)</span>
        </div>
      </div>
    );
  },
};

// ============================================
// Icon Library Comparison
// ============================================

export const IconLibraryComparison: Story = {
  name: 'Icon Library Comparison',
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Lucide (Stroke-based)</h3>
        <div className="flex items-center gap-4">
          <MLIconContainer icon={<Star />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<Bell />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<Heart />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<Settings />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<User />} size="xl" className="text-gray-700" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">FontAwesome Solid (Fill-based)</h3>
        <div className="flex items-center gap-4">
          <MLIconContainer icon={<FontAwesomeIcon icon={faStar} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faBell} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faHeart} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faGear} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faUser} />} size="xl" className="text-gray-700" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">FontAwesome Light (Stroke-based)</h3>
        <div className="flex items-center gap-4">
          <MLIconContainer icon={<FontAwesomeIcon icon={faStarLight} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faBellLight} />} size="xl" className="text-gray-700" />
          <MLIconContainer icon={<FontAwesomeIcon icon={faHeartLight} />} size="xl" className="text-gray-700" />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// With Custom Styling
// ============================================

export const WithCustomStyling: Story = {
  name: 'With Custom Styling',
  render: () => (
    <div className="flex items-center gap-4">
      {/* Styled with padding, background, and border-radius */}
      <MLIconContainer
        icon={<Settings />}
        size="lg"
        className="p-2 bg-gray-200 text-gray-700 rounded-md"
      />
      <MLIconContainer
        icon={<User />}
        size="lg"
        className="p-2 bg-purple-100 text-purple-600 rounded-full"
      />
      <MLIconContainer
        icon={<FontAwesomeIcon icon={faBell} />}
        size="lg"
        className="p-2 bg-blue-100 text-blue-600 rounded-lg"
      />
      <MLIconContainer
        icon={<Check />}
        size="lg"
        className="p-2 bg-green-100 text-green-600 rounded-full"
      />
      <MLIconContainer
        icon={<FontAwesomeIcon icon={faHeart} />}
        size="lg"
        className="p-2 bg-red-100 text-red-500 rounded-full"
      />
    </div>
  ),
};

// ============================================
// In Context
// ============================================

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Button-like usage */}
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
          <MLIconContainer icon={<FontAwesomeIcon icon={faCheck} />} size="base" />
          <span>Confirm</span>
        </button>
        <button className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          <MLIconContainer icon={<Settings />} size="lg" />
        </button>
        <button className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
          <MLIconContainer icon={<FontAwesomeIcon icon={faGear} />} size="lg" />
        </button>
      </div>

      {/* List item with avatar-style icon */}
      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg max-w-sm">
        <MLIconContainer
          icon={<User />}
          size="lg"
          className="p-2 bg-purple-100 text-purple-600 rounded-full"
        />
        <div>
          <div className="font-medium text-gray-900">John Doe</div>
          <div className="text-sm text-gray-500">john@example.com</div>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex flex-col gap-1 max-w-xs">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <MLIconContainer icon={<Home />} size="base" />
          <span className="text-sm">Home</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <MLIconContainer icon={<FontAwesomeIcon icon={faUser} />} size="base" />
          <span className="text-sm">Profile</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <MLIconContainer icon={<Search />} size="base" />
          <span className="text-sm">Search</span>
        </a>
      </div>
    </div>
  ),
};
