/**
 * Artemis Design System - Icon Utilities
 *
 * This module provides a centralized way to manage icons across the design system.
 * It re-exports Lucide icons and provides utilities for creating custom icons.
 *
 * Usage:
 * ```tsx
 * import { Icon, icons } from '@monalee-engineering/monalee-ui';
 *
 * // Use a Lucide icon
 * <Icon name="check" className="size-4" />
 *
 * // Or import directly
 * import { Check, ChevronDown } from '@monalee-engineering/monalee-ui/icons';
 * ```
 */

// Re-export all Lucide icons for direct usage
export * from 'lucide-react';

// Re-export the LucideIcon type for typing custom icon components
export type { LucideIcon, LucideProps } from 'lucide-react';

import { type LucideIcon, type LucideProps } from 'lucide-react';
import {
  // Navigation & Actions
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Menu,
  MoreHorizontal,
  MoreVertical,
  X,
  Plus,
  Minus,
  Check,
  Search,
  Filter,
  SlidersHorizontal,
  Settings,
  ExternalLink,
  Link,
  Download,
  Upload,
  Share,
  Copy,
  Trash2,
  Edit,
  Pencil,
  // Status & Feedback
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  XCircle,
  Loader2,
  // User & Account
  User,
  Users,
  UserPlus,
  UserMinus,
  LogIn,
  LogOut,
  // Communication
  Mail,
  Phone,
  MessageSquare,
  Bell,
  BellOff,
  // Media & Files
  Image,
  File,
  FileText,
  Folder,
  FolderOpen,
  // Layout & View
  LayoutGrid,
  LayoutList,
  Columns,
  Rows,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  // Time & Calendar
  Calendar,
  Clock,
  // Commerce
  ShoppingCart,
  CreditCard,
  DollarSign,
  Percent,
  Tag,
  // Misc
  Home,
  Building,
  Sun,
  Moon,
  Star,
  Heart,
  Bookmark,
  Flag,
  Pin,
  Lock,
  Unlock,
  Key,
  Shield,
  Zap,
  Activity,
  BarChart,
  PieChart,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

/**
 * Commonly used icons in the design system, organized by category.
 * This provides a curated subset of Lucide icons for consistency.
 */
export const icons = {
  // Navigation & Actions
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronsUpDown: ChevronsUpDown,
  menu: Menu,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  close: X,
  plus: Plus,
  minus: Minus,
  check: Check,
  search: Search,
  filter: Filter,
  sliders: SlidersHorizontal,
  settings: Settings,
  externalLink: ExternalLink,
  link: Link,
  download: Download,
  upload: Upload,
  share: Share,
  copy: Copy,
  trash: Trash2,
  edit: Edit,
  pencil: Pencil,

  // Status & Feedback
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  info: Info,
  help: HelpCircle,
  error: XCircle,
  spinner: Loader2,

  // User & Account
  user: User,
  users: Users,
  userPlus: UserPlus,
  userMinus: UserMinus,
  login: LogIn,
  logout: LogOut,

  // Communication
  mail: Mail,
  phone: Phone,
  message: MessageSquare,
  bell: Bell,
  bellOff: BellOff,

  // Media & Files
  image: Image,
  file: File,
  fileText: FileText,
  folder: Folder,
  folderOpen: FolderOpen,

  // Layout & View
  grid: LayoutGrid,
  list: LayoutList,
  columns: Columns,
  rows: Rows,
  eye: Eye,
  eyeOff: EyeOff,
  maximize: Maximize,
  minimize: Minimize,

  // Time & Calendar
  calendar: Calendar,
  clock: Clock,

  // Commerce
  cart: ShoppingCart,
  creditCard: CreditCard,
  dollar: DollarSign,
  percent: Percent,
  tag: Tag,

  // Misc
  home: Home,
  building: Building,
  sun: Sun,
  moon: Moon,
  star: Star,
  heart: Heart,
  bookmark: Bookmark,
  flag: Flag,
  pin: Pin,
  lock: Lock,
  unlock: Unlock,
  key: Key,
  shield: Shield,
  zap: Zap,
  activity: Activity,
  barChart: BarChart,
  pieChart: PieChart,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
} as const;

export type IconName = keyof typeof icons;

/**
 * Props for the Icon component
 */
export interface IconProps extends Omit<LucideProps, 'ref'> {
  /** The name of the icon from the icons map */
  name: IconName;
}

/**
 * A wrapper component for rendering icons by name.
 * This provides a consistent API for using icons throughout the design system.
 *
 * @example
 * ```tsx
 * <Icon name="check" className="size-4 text-green-500" />
 * <Icon name="close" size={24} strokeWidth={2} />
 * ```
 */
export function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
}

/**
 * Utility type for creating custom icon components that match Lucide's API
 */
export type CustomIconComponent = LucideIcon;

/**
 * Default icon sizes used throughout the design system
 */
export const iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
} as const;

export type IconSize = keyof typeof iconSizes;
