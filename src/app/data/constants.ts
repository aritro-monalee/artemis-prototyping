import type { CRMProvider } from "./crm-integrations";

/** Framer Motion layout transition for tag layout animations */
export const TAG_LAYOUT_TRANSITION = {
  layout: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
};

/** ProjectsSettingsForm uses a slightly longer duration for tag grid layout */
export const TAG_LAYOUT_TRANSITION_SETTINGS = {
  layout: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
};

/** CRM provider logo URLs (local assets — immune to CDN token expiry) */
export const PROVIDER_LOGOS: Record<CRMProvider, string> = {
  salesforce: "/icons/crm/salesforce.svg",
  pipedrive: "/icons/crm/pipedrive.png",
};

/** Step animation variants for multi-step modals */
export const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/** Webhook event type options for multi-select dropdowns */
export const EVENT_TYPE_OPTIONS = [
  { label: "Project Created", value: "project-created" },
  { label: "Project Updated", value: "project-updated" },
  { label: "Contract Signed", value: "contract-signed" },
  { label: "Contract Change Order Sent", value: "contract-change-order-sent" },
  { label: "Credit Application Submitted", value: "credit-application-submitted" },
  { label: "Pre Sale Status Updated", value: "pre-sale-status-updated" },
  { label: "Application Decision", value: "application-decision" },
  { label: "Post Sale Status Updated", value: "post-sale-status-updated" },
  { label: "User Created", value: "user-created" },
  { label: "User Updated", value: "user-updated" },
  { label: "User Deleted", value: "user-deleted" },
  { label: "Energy Audit Updated", value: "energy-audit-updated" },
];
