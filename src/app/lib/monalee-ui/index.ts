// ============================================
// @monalee-engineering/monalee-ui
// Component Library - Alphabetically ordered
// All components use ML prefix for consistency
// ============================================

// Accordion
export {
  MLAccordion,
  MLAccordionItem,
  MLAccordionTrigger,
  MLAccordionContent,
  type MLAccordionProps,
  type MLAccordionItemProps,
  type MLAccordionTriggerProps,
  type MLAccordionContentProps,
  type AccordionType,
} from './components/MLAccordion';

// Alert
export {
  MLAlert,
  MLAlertTitle,
  MLAlertDescription,
  MLAlertIcon,
  MLAlertAction,
  type MLAlertProps,
  type MLAlertTitleProps,
  type MLAlertDescriptionProps,
  type MLAlertIconProps,
  type MLAlertActionProps,
} from './components/MLAlert';

// AlertDialog
export {
  MLAlertDialog,
  MLAlertDialogPortal,
  MLAlertDialogOverlay,
  MLAlertDialogTrigger,
  MLAlertDialogContent,
  MLAlertDialogHeader,
  MLAlertDialogFooter,
  MLAlertDialogTitle,
  MLAlertDialogDescription,
  MLAlertDialogAction,
  MLAlertDialogCancel,
  type MLAlertDialogProps,
  type MLAlertDialogTriggerProps,
  type MLAlertDialogContentProps,
  type MLAlertDialogHeaderProps,
  type MLAlertDialogFooterProps,
  type MLAlertDialogTitleProps,
  type MLAlertDialogDescriptionProps,
  type MLAlertDialogActionProps,
  type MLAlertDialogCancelProps,
} from './components/MLAlertDialog';

// AspectRatio
export {
  MLAspectRatio,
  type MLAspectRatioProps,
  type MLAspectRatioValue,
} from './components/MLAspectRatio';

// Avatar
export {
  MLAvatar,
  MLAvatarGroup,
  MLAvatarImage,
  MLAvatarFallback,
  mlAvatarVariants,
  type MLAvatarProps,
  type MLAvatarGroupProps,
} from './components/MLAvatar';

// Badge
export {
  MLBadge,
  BadgeNumber,
  badgeVariants,
  badgeNumberVariants,
  type MLBadgeProps,
  type BadgeNumberProps,
} from './components/MLBadge';

// Breadcrumb
export {
  MLBreadcrumb,
  MLBreadcrumbList,
  MLBreadcrumbItem,
  MLBreadcrumbLink,
  MLBreadcrumbPage,
  MLBreadcrumbSeparator,
  MLBreadcrumbSlash,
  MLBreadcrumbEllipsis,
  type MLBreadcrumbProps,
  type MLBreadcrumbListProps,
  type MLBreadcrumbItemProps,
  type MLBreadcrumbLinkProps,
  type MLBreadcrumbPageProps,
  type MLBreadcrumbSeparatorProps,
  type MLBreadcrumbEllipsisProps,
} from './components/MLBreadcrumb';

// Button
export { MLButton, buttonVariants, type MLButtonProps } from './components/MLButton';

// Calendar
export { MLCalendar, MLCalendarDayButton, type MLCalendarProps } from './components/MLCalendar';

// Card
export {
  MLCard,
  MLCardHeader,
  MLCardTitle,
  MLCardDescription,
  MLCardAction,
  MLCardContent,
  MLCardFooter,
  type MLCardProps,
  type MLCardHeaderProps,
  type MLCardTitleProps,
  type MLCardDescriptionProps,
  type MLCardActionProps,
  type MLCardContentProps,
  type MLCardFooterProps,
} from './components/MLCard';

// Checkbox
export { MLCheckBox, type MLCheckBoxProps } from './components/MLCheckBox';

// Chip
export { MLChip, type MLChipProps } from './components/MLChip';

// ChipGroup
export { MLChipGroup, type MLChipGroupProps, type MLChipItem } from './components/MLChipGroup';

// ColorPicker
export {
  MLColorPicker,
  type MLColorPickerProps,
  type MLColorFormat,
} from './components/MLColorPicker';

// Combobox
export { MLCombobox, type MLComboboxProps, type MLComboboxOption } from './components/MLCombobox';

// Command
export {
  MLCommand,
  MLCommandDialog,
  MLCommandInput,
  MLCommandList,
  MLCommandEmpty,
  MLCommandGroup,
  MLCommandItem,
  MLCommandShortcut,
  MLCommandSeparator,
  type MLCommandProps,
  type MLCommandDialogProps,
  type MLCommandInputProps,
  type MLCommandListProps,
  type MLCommandEmptyProps,
  type MLCommandGroupProps,
  type MLCommandItemProps,
  type MLCommandShortcutProps,
  type MLCommandSeparatorProps,
} from './components/MLCommand';

// ContextMenu
export * from './components/MLContextMenu';

// Counter
export { MLCounter, type MLCounterProps } from './components/MLCounter';

// DatePicker
export {
  DatePicker,
  DatePickerWithPresets,
  DateRangePicker,
  MLDatePicker,
  type DatePickerProps,
  type DatePickerWithPresetsProps,
  type DateRangePickerProps,
  type DatePickerPreset,
  type MLDatePickerProps,
} from './components/MLDatePicker';

// Dialog
export {
  MLDialog,
  MLDialogClose,
  MLDialogContent,
  MLDialogDescription,
  MLDialogFooter,
  MLDialogHeader,
  MLDialogOverlay,
  MLDialogPortal,
  MLDialogTitle,
  MLDialogTrigger,
  type MLDialogProps,
  type MLDialogTriggerProps,
  type MLDialogPortalProps,
  type MLDialogCloseProps,
  type MLDialogOverlayProps,
  type MLDialogContentProps,
  type MLDialogHeaderProps,
  type MLDialogFooterProps,
  type MLDialogTitleProps,
  type MLDialogDescriptionProps,
} from './components/MLDialog';

// Drawer
export * from './components/MLDrawer';

// DropdownMenu
export * from './components/MLDropdownMenu';

// HoverCard
export {
  MLHoverCard,
  MLHoverCardTrigger,
  MLHoverCardContent,
  type MLHoverCardProps,
  type MLHoverCardTriggerProps,
  type MLHoverCardContentProps,
} from './components/MLHoverCard';

// IconContainer
export {
  MLIconContainer,
  iconContainerVariants,
  iconStrokeWidths,
  type MLIconContainerProps,
  type MLIconContainerSize,
} from './components/MLIconContainer';

// Input
export { MLInput, type MLInputProps } from './components/MLInput';

// InputOTP
export {
  MLInputOTP,
  MLInputOTPGroup,
  MLInputOTPSlot,
  MLInputOTPSeparator,
  MLInputOTPSimple,
  MLInputOTPDigitsOnly,
  MLInputOTPWithSeparator,
  MLInputOTPWithSpacing,
  type MLInputOTPProps,
  type MLInputOTPGroupProps,
  type MLInputOTPSlotProps,
  type MLInputOTPSeparatorProps,
} from './components/MLInputOTP';

// Label
export { MLLabel, type MLLabelProps } from './components/MLLabel';

// LoadingPlaceholder / Skeleton
export {
  MLLoadingPlaceholder,
  MLSkeleton,
  MLSkeletonElement,
  type MLLoadingPlaceholderProps,
} from './components/MLLoadingPlaceholder';

// LoadingSpinner
export { MLLoadingSpinner, type MLLoadingSpinnerProps } from './components/MLLoadingSpinner';

// MultiSelect
export { MLMultiSelect, type MLMultiSelectProps } from './components/MLMultiSelect';

// Pagination
export { MLPagination, type MLPaginationProps } from './components/MLPagination';

// Popover
export {
  MLPopover,
  MLPopoverTrigger,
  MLPopoverContent,
  MLPopoverAnchor,
  MLPopoverClose,
  MLPopoverHeader,
  type MLPopoverProps,
  type MLPopoverTriggerProps,
  type MLPopoverContentProps,
  type MLPopoverAnchorProps,
  type MLPopoverCloseProps,
  type MLPopoverHeaderProps,
} from './components/MLPopover';

// Progress
export { MLProgress, type MLProgressProps } from './components/MLProgress';

// PhoneInput
export { MLPhoneInput, type MLPhoneInputProps } from './components/MLPhoneInput';

// Radio
export { MLRadio, type MLRadioProps } from './components/MLRadio';

// RadioGroup
export { MLRadioGroup, type MLRadioGroupProps } from './components/MLRadioGroup';

// Resizable
export {
  MLResizablePanelGroup,
  MLResizablePanel,
  MLResizableHandle,
  type MLResizablePanelGroupProps,
  type MLResizablePanelProps,
  type MLResizableHandleProps,
} from './components/MLResizable';

// SectionTitle
export { MLSectionTitle, type MLSectionTitleProps } from './components/MLSectionTitle';

// Select
export { MLSelect, type MLSelectProps } from './components/MLSelect';

// Sidebar
export {
  MLSidebar,
  MLSidebarContent,
  MLSidebarFooter,
  MLSidebarGroup,
  MLSidebarGroupAction,
  MLSidebarGroupContent,
  MLSidebarGroupLabel,
  MLSidebarHeader,
  MLSidebarInput,
  MLSidebarInset,
  MLSidebarMenu,
  MLSidebarMenuAction,
  MLSidebarMenuBadge,
  MLSidebarMenuButton,
  MLSidebarMenuItem,
  MLSidebarMenuSkeleton,
  MLSidebarMenuSub,
  MLSidebarMenuSubButton,
  MLSidebarMenuSubItem,
  MLSidebarProvider,
  MLSidebarRail,
  MLSidebarSeparator,
  MLSidebarTrigger,
  useMLSidebar,
} from './components/MLSidebar';

// Slider
export { MLSlider, type MLSliderProps } from './components/MLSlider';

// Switch
export { MLSwitch, type MLSwitchProps } from './components/MLSwitch';

// Tab
export { MLTab, type MLTabProps, type Tab as MLTabItem } from './components/MLTab';

// Table
export { MLTable, type MLTableProps } from './components/MLTable';

// Tag
export { MLTag, type MLTagProps } from './components/MLTag';

// TextArea
export { MLTextArea, type MLTextAreaProps } from './components/MLTextArea';

// ToggleGroup
export {
  MLToggleGroup,
  type MLToggleGroupProps,
  type ToggleOption as MLToggleOption,
} from './components/MLToggleGroup';

// Toast
export {
  Toaster as MLToaster,
  toast as mlToast,
  type ToastProps as MLToastProps,
} from './components/MLToast';

// Text
export { MLText, textVariants, type MLTextProps } from './components/MLText';

// Tooltip
export { MLToolTip, type MLToolTipProps } from './components/MLToolTip';

// ============================================
// UTILITIES
// ============================================
export { cn } from './utils/cn';

// ============================================
// ICONS
// ============================================
export {
  Icon,
  icons,
  iconSizes,
  type IconName,
  type IconProps,
  type IconSize,
  type LucideIcon,
  type LucideProps,
} from './utils/icons';

// Global styles
import './global.css';
