export interface ProjectCardData {
  id: string;
  systemSize: string;
  panels: number;
  batteries: number;
  daysInStage: number;
  address: string;
  ownerName: string;
  assignee: string;
  date: string;
  department: string;
  tags: { type: "On Hold" | "Lost" | "Change Order"; reason?: string }[];
  stageId: string;
  fullName: string;
  email: string;
  installer: string;
  team: string;
  representative: string;
  leadSource: string;
  status: string;
  utilityCompany: string;
  paymentOption: string;
  applicationId: string;
  signedAt: string;
  createdOn: string;
}

export interface CustomField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "checkbox";
}

export interface StageHistoryEntry {
  stageId: string;
  enteredAt: string;
  exitedAt: string | null;
}

export interface PipelineStage {
  id: string;
  title: string;
  color: string;
}

export interface ProjectFilters {
  statusFilter: string;
  projectStatus: string;
  projectType: string;
  leadSource: string;
  installer: string;
  team: string;
  representative: string;
  paymentType: string;
  state: string;
  city: string;
  utilityCompany: string;
  startDate: string;
  endDate: string;
  minDaysInStage: string;
  maxDaysInStage: string;
}

export interface ProjectDetailData extends ProjectCardData {
  financePayment: string;
  systemSizeKw: string;
  estOffset: string;
  projectType: "Solar" | "Battery" | "Solar + Battery" | "Home Improvement";
  panelModel: string;
  panelCount: number;
  inverterModel: string;
  inverterCount: number;
  batteryModel: string;
  batteryCount: number;
  addersTotal: number;
  financingTotal: number;
  totalLoan: number;
  term: string;
  lender: string;
  netPricePerSquare: number;
  pricePerSquare: number;
  estimatedProduction: string;
}

export interface NoteTextPart {
  text: string;
  mention?: boolean;
}

export interface ThreadReply {
  name: string;
  time: string;
  text: string;
}

export type NoteSource =
  | "Salesforce"
  | "HubSpot"
  | "Slack"
  | "Zendesk"
  | "Intercom"
  | "Google Calendar"
  | "Jira";

export interface Note {
  id: number;
  name: string;
  time: string;
  textParts: NoteTextPart[];
  thread: ThreadReply[];
  external?: {
    source: NoteSource;
  };
}

export interface DesignComment {
  id: number;
  top: string;
  left: string;
  name: string;
  time: string;
  textParts: NoteTextPart[];
  thread: ThreadReply[];
}

export interface ChecklistItemDef {
  label: string;
  optional?: boolean;
  statusText?: string;
  ctaLabel?: string;
  ctaRoute?: string;
}

export interface ChecklistItem {
  label: string;
  done: boolean;
  optional?: boolean;
  statusText?: string;
  ctaLabel?: string;
  ctaRoute?: string;
}

export interface ChecklistSection {
  stageId: string;
  title: string;
  items: ChecklistItem[];
}

export interface ActivityLine {
  text: string;
  ids?: string[];
  extra?: string;
}

export interface ActivityItem {
  id: number;
  name: string;
  time: string;
  lines: ActivityLine[];
  autosave?: boolean;
  quote?: { text: string; mention?: { text: string } };
}

export interface PlacedLabel {
  labelId: string;
  top: number;
  left: number;
}
