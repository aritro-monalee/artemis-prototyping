import type {
  ProjectCardData,
  ProjectDetailData,
  NoteSource,
  Note,
  DesignComment,
  ChecklistItemDef,
  ActivityItem,
} from "../types";
import { initialProjects } from "./projects";

export const NOTE_SOURCE_META: Record<NoteSource, { bg: string; border: string; text: string }> = {
  Salesforce:        { bg: "bg-blue-50",    border: "border-blue-300",    text: "text-blue-700" },
  HubSpot:           { bg: "bg-orange-50",  border: "border-orange-300",  text: "text-orange-700" },
  Slack:             { bg: "bg-purple-50",  border: "border-purple-300",  text: "text-purple-700" },
  Zendesk:           { bg: "bg-teal-50",    border: "border-teal-300",    text: "text-teal-700" },
  Intercom:          { bg: "bg-indigo-50",  border: "border-indigo-300",  text: "text-indigo-700" },
  "Google Calendar": { bg: "bg-sky-50",     border: "border-sky-300",     text: "text-sky-700" },
  Jira:              { bg: "bg-blue-50",    border: "border-blue-300",    text: "text-blue-700" },
};

export const initialNotes: Note[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    time: "11:20AM",
    textParts: [
      { text: "Customer requested a site visit before signing. Can you do it " },
      { text: "Mike Chen", mention: true },
      { text: " ?" },
    ],
    thread: [
      { name: "Mike Chen", time: "11:25AM", text: "Yeah I will take care of this" },
      { name: "Sarah Johnson", time: "11:35AM", text: "Thank you" },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    time: "10:45AM",
    textParts: [
      { text: "Moved proposal to sent. Homeowner wants to review financing options before committing — " },
      { text: "Mike Chen", mention: true },
      { text: " can you send over the loan comparison sheet?" },
    ],
    thread: [
      { name: "Mike Chen", time: "10:50AM", text: "Sent it over just now, should be in their inbox" },
    ],
    external: { source: "Salesforce" },
  },
  {
    id: 3,
    name: "Mike Chen",
    time: "11:30AM",
    textParts: [
      { text: "I checked the roof and it looks good. We can proceed with installation next week." },
    ],
    thread: [],
  },
  {
    id: 4,
    name: "Lisa Tran",
    time: "9:15AM",
    textParts: [
      { text: "Homeowner called in about panel placement — they want to avoid shading from the oak tree on the south side. Updating the design notes." },
    ],
    thread: [],
    external: { source: "HubSpot" },
  },
  {
    id: 5,
    name: "Sarah Johnson",
    time: "11:45AM",
    textParts: [
      { text: "Great news! The customer approved the final design. " },
      { text: "Mike Chen", mention: true },
      { text: " can you schedule the install?" },
    ],
    thread: [
      { name: "Mike Chen", time: "12:00PM", text: "On it, scheduling for next Thursday" },
    ],
  },
  {
    id: 6,
    name: "Mike Chen",
    time: "2:30PM",
    textParts: [
      { text: "Permit approved by city planning — inspection window opens March 1. I'll coordinate with the crew for install the following week." },
    ],
    thread: [],
    external: { source: "Slack" },
  },
];

export const initialDesignComments: DesignComment[] = [
  {
    id: 1, top: "30%", left: "52%",
    name: "Sarah Johnson", time: "11:20AM",
    textParts: [{ text: "Can you check this panel placement? " }, { text: "Mike Chen", mention: true }],
    thread: [
      { name: "Mike Chen", time: "11:25AM", text: "Yeah I will take care of this" },
      { name: "Sarah Johnson", time: "11:35AM", text: "Thank you" },
    ],
  },
  {
    id: 2, top: "38%", left: "68%",
    name: "Mike Chen", time: "11:22AM",
    textParts: [{ text: "Shading issue on south side." }],
    thread: [],
  },
  {
    id: 3, top: "55%", left: "48%",
    name: "Ethan Hackett", time: "11:25AM",
    textParts: [{ text: "this looks good. " }, { text: "Brian", mention: true }],
    thread: [
      { name: "Brian", time: "11:30AM", text: "Thanks! Let me finalize the layout." },
      { name: "Ethan Hackett", time: "11:32AM", text: "Sounds good" },
      { name: "Brian", time: "11:40AM", text: "Done" },
    ],
  },
  {
    id: 4, top: "22%", left: "28%",
    name: "Sarah Johnson", time: "11:30AM",
    textParts: [{ text: "Tree removal needed here." }],
    thread: [{ name: "Mike Chen", time: "11:35AM", text: "I'll coordinate with the crew" }],
  },
  {
    id: 5, top: "65%", left: "55%",
    name: "Mike Chen", time: "11:35AM",
    textParts: [{ text: "Battery placement confirmed." }],
    thread: [],
  },
  {
    id: 6, top: "45%", left: "20%",
    name: "Ethan Hackett", time: "11:40AM",
    textParts: [{ text: "check this area for obstructions. " }, { text: "Sarah", mention: true }],
    thread: [
      { name: "Sarah Johnson", time: "11:42AM", text: "On it" },
      { name: "Sarah Johnson", time: "11:50AM", text: "All clear, no obstructions found" },
    ],
  },
  {
    id: 7, top: "75%", left: "18%",
    name: "Sarah Johnson", time: "11:50AM",
    textParts: [{ text: "Roof angle measurement complete." }],
    thread: [{ name: "Mike Chen", time: "12:00PM", text: "Great, updating the model" }],
  },
  {
    id: 8, top: "20%", left: "75%",
    name: "Mike Chen", time: "12:05PM",
    textParts: [{ text: "Vent pipe clearance OK." }],
    thread: [],
  },
];

export const defaultChecklistTemplate: Record<string, ChecklistItemDef[]> = {
  "proposal-created": [
    { label: "Utility bill collected", statusText: "Waiting on homeowner to upload utility bill", ctaLabel: "Upload utility bill" },
    { label: "Photo ID collected", statusText: "Waiting on homeowner to provide photo ID", ctaLabel: "Upload photo ID" },
    { label: "Site photos uploaded", statusText: "Waiting on partner to upload site photos", ctaLabel: "Upload site photos" },
    { label: "Shade analysis complete", statusText: "Waiting on partner to complete shade analysis", ctaLabel: "Run shade analysis" },
  ],
  "credit-submitted": [
    { label: "Credit application submitted", statusText: "Waiting on partner to submit credit application", ctaLabel: "Submit credit application" },
    { label: "Credit decision received", statusText: "Waiting on lender to return credit decision", ctaLabel: "Check credit status" },
  ],
  "credit-approved": [
    { label: "Credit approval confirmed", statusText: "Waiting on lender to confirm credit approval", ctaLabel: "Confirm approval" },
  ],
  "contract-sent": [
    { label: "Contract sent via Docusign", statusText: "Waiting on partner to send contract", ctaLabel: "Send contract" },
    { label: "HOA application submitted", optional: true, statusText: "Waiting on partner to submit HOA application", ctaLabel: "Submit HOA application" },
  ],
  "contract-signed": [
    { label: "Contract signed by customer", statusText: "Waiting on homeowner to sign contract", ctaLabel: "Send signing reminder" },
    { label: "Permit application submitted", statusText: "Waiting on partner to submit permit application", ctaLabel: "Submit permit application" },
    { label: "Handoff to operations complete", statusText: "Waiting on partner to complete handoff", ctaLabel: "Complete handoff" },
  ],
  "site-survey-scheduled": [
    { label: "Site survey scheduled with customer", statusText: "Waiting on partner to schedule site survey", ctaLabel: "Schedule site survey" },
    { label: "Site survey completed", statusText: "Waiting on surveyor to complete site survey", ctaLabel: "Mark survey complete" },
  ],
  "final-design": [
    { label: "Final design completed", statusText: "Waiting on designer to finalize design", ctaLabel: "Complete design" },
    { label: "Design approved by customer", statusText: "Waiting on homeowner to approve design", ctaLabel: "Request design approval" },
  ],
  "permit": [
    { label: "Permit application submitted", statusText: "Waiting on partner to submit permit", ctaLabel: "Submit permit" },
    { label: "Permit approved", statusText: "Waiting on municipality to approve permit", ctaLabel: "Check permit status" },
  ],
  "install": [
    { label: "Installation scheduled", statusText: "Waiting on partner to schedule installation", ctaLabel: "Schedule installation" },
    { label: "Installation completed", statusText: "Waiting on crew to complete installation", ctaLabel: "Mark installation complete" },
  ],
  "inspection": [
    { label: "Inspection scheduled", statusText: "Waiting on partner to schedule inspection", ctaLabel: "Schedule inspection" },
    { label: "Inspection passed", statusText: "Waiting on inspector to complete inspection", ctaLabel: "Check inspection status" },
  ],
  "PTO": [
    { label: "PTO application submitted", statusText: "Waiting on partner to submit PTO application", ctaLabel: "Submit PTO application" },
    { label: "PTO granted", statusText: "Waiting on utility to grant PTO", ctaLabel: "Check PTO status" },
  ],
  "project-complete": [
    { label: "Final walkthrough done", statusText: "Waiting on partner to complete final walkthrough", ctaLabel: "Schedule walkthrough" },
    { label: "Customer sign-off received", statusText: "Waiting on homeowner to sign off", ctaLabel: "Request sign-off" },
  ],
};

export const initialChecklistDone: Record<string, boolean[]> = {
  "proposal-created": [true, true, true, true],
};

export const initialActivities: ActivityItem[] = [
  {
    id: 1, name: "Hudolf", time: "11:20AM", autosave: true,
    lines: [
      { text: "Tests updated" },
      { text: "Test Incentive(1x) added" },
    ],
  },
  {
    id: 2, name: "Sarah Johnson", time: "11:20AM",
    lines: [
      { text: "1 panel added", ids: ["#16"] },
      { text: "2 panels removed", ids: ["#11", "#12"] },
      { text: "5 panels edited", ids: ["#1", "#13"], extra: "+3" },
      { text: "10 panels overridden", ids: ["#1", "#13"], extra: "+8" },
    ],
  },
  {
    id: 3, name: "Sarah Johnson", time: "11:20AM", autosave: true,
    lines: [{ text: "1 comment added" }],
    quote: {
      text: "Customer requested a site visit before signing. Can you do it ",
      mention: { text: "Mike Chen" },
    },
  },
  {
    id: 4, name: "Sarah Johnson", time: "11:20AM", autosave: true,
    lines: [
      { text: "2 trees added", ids: ["#5", "#6"] },
      { text: "1 tree edited", ids: ["#5"] },
    ],
  },
  {
    id: 5, name: "Hudolf", time: "11:20AM", autosave: true,
    lines: [
      { text: "Battery added", ids: ["#1"] },
      { text: "Battery", ids: ["#1"], extra: "updated to Franklin apower 2" },
      { text: "New Battery Sub Panel Added" },
    ],
  },
  {
    id: 6, name: "Hudolf", time: "11:20AM", autosave: true,
    lines: [{ text: "Project type changed to Solar + Battery from Solar" }],
  },
  {
    id: 7, name: "Hudolf", time: "11:20AM",
    lines: [{ text: "First Name, Last Name, Phone Number," }],
  },
];

export const projectDetailExtras: Record<string, Partial<ProjectDetailData>> = {
  p1: {
    financePayment: "$0/Month",
    systemSizeKw: "0kW",
    estOffset: "0%",
    projectType: "Solar",
    panelModel: "Mission Solar 410w",
    panelCount: 15,
    inverterModel: "Tesla Solar Inverter",
    inverterCount: 1,
    batteryModel: "Franklin aPower 2",
    batteryCount: 2,
    addersTotal: 0,
    financingTotal: 22118.05,
    totalLoan: 20000.0,
    term: "Included",
    lender: "Goodleap",
    netPricePerSquare: 3.63,
    pricePerSquare: 6.05,
    estimatedProduction: "5,558kWh",
  },
};

export const defaultDetailExtras: Omit<ProjectDetailData, keyof ProjectCardData> = {
  financePayment: "$0/Month",
  systemSizeKw: "0kW",
  estOffset: "0%",
  projectType: "Solar",
  panelModel: "Mission Solar 410w",
  panelCount: 15,
  inverterModel: "Tesla Solar Inverter",
  inverterCount: 1,
  batteryModel: "Franklin aPower 2",
  batteryCount: 2,
  addersTotal: 0,
  financingTotal: 22118.05,
  totalLoan: 20000.0,
  term: "Included",
  lender: "Goodleap",
  netPricePerSquare: 3.63,
  pricePerSquare: 6.05,
  estimatedProduction: "5,558kWh",
};

export function getProjectDetail(id: string): ProjectDetailData | null {
  const base = initialProjects.find((p) => p.id === id);
  if (!base) return null;
  const extras = projectDetailExtras[id] ?? {};
  return { ...defaultDetailExtras, ...base, ...extras } as ProjectDetailData;
}
