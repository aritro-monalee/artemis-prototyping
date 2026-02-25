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
  enteredAt: string; // ISO date string
  exitedAt: string | null; // null = currently in this stage
}


export interface PipelineStage {
  id: string;
  title: string;
  color: string;
}

export const presaleStages: PipelineStage[] = [
  { id: "proposal-created", title: "Proposal Created", color: "#3b82f6" },
  { id: "credit-submitted", title: "Credit Submitted", color: "#8b5cf6" },
  { id: "credit-approved", title: "Credit Approved", color: "#10b981" },
  { id: "contract-sent", title: "Contract Sent", color: "#f97316" },
  { id: "contract-signed", title: "Contract Signed", color: "#14b8a6" },
];

export const postSaleStages: PipelineStage[] = [
  { id: "site-survey-scheduled", title: "Site Survey Scheduled", color: "#ec4899" },
  { id: "final-design", title: "Final Design", color: "#6366f1" },
  { id: "permit", title: "Permit", color: "#f59e0b" },
  { id: "install", title: "Install", color: "#06b6d4" },
  { id: "inspection", title: "Inspection", color: "#f43f5e" },
  { id: "PTO", title: "PTO", color: "#059669" },
  { id: "project-complete", title: "Project Complete", color: "#84cc16" },
];

export const allStages: PipelineStage[] = [
  ...presaleStages,
  ...postSaleStages,
];

const stageOrderIds = [
  "proposal-created", "credit-submitted", "credit-approved", "contract-sent", "contract-signed",
  "site-survey-scheduled", "final-design", "permit", "install", "inspection", "PTO", "project-complete",
];

function buildHistory(
  createdOn: string,
  currentStageId: string,
  daysInCurrentStage: number,
  transitDays: number[] = [3, 2, 4, 3, 2, 5, 4, 3, 2, 3, 2]
): StageHistoryEntry[] {
  const currentIdx = stageOrderIds.indexOf(currentStageId);
  if (currentIdx < 0) return [];

  const now = new Date();
  const currentEnteredAt = new Date(now);
  currentEnteredAt.setDate(currentEnteredAt.getDate() - daysInCurrentStage);

  const entries: StageHistoryEntry[] = [];
  let cursor = new Date(currentEnteredAt);

  for (let i = currentIdx - 1; i >= 0; i--) {
    const days = transitDays[i % transitDays.length];
    const exitedAt = new Date(cursor);
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() - days);
    entries.unshift({
      stageId: stageOrderIds[i],
      enteredAt: cursor.toISOString(),
      exitedAt: exitedAt.toISOString(),
    });
  }

  entries.push({
    stageId: currentStageId,
    enteredAt: currentEnteredAt.toISOString(),
    exitedAt: null,
  });

  return entries;
}

export function generateInitialStageHistory(
  projects: ProjectCardData[]
): Record<string, StageHistoryEntry[]> {
  const varied = [
    [3, 2, 4, 3, 2, 5, 4, 3, 2, 3, 2],
    [2, 3, 3, 5, 2, 4, 3, 2, 4, 2, 3],
    [4, 1, 5, 2, 3, 3, 6, 2, 1, 4, 2],
    [1, 4, 2, 4, 3, 6, 2, 5, 3, 2, 1],
    [5, 2, 3, 3, 4, 2, 5, 4, 2, 3, 3],
    [2, 5, 1, 3, 5, 3, 3, 3, 4, 2, 4],
  ];
  const map: Record<string, StageHistoryEntry[]> = {};
  projects.forEach((p, i) => {
    map[p.id] = buildHistory(
      p.createdOn,
      p.stageId,
      p.daysInStage,
      varied[i % varied.length]
    );
  });
  return map;
}

export const initialProjects: ProjectCardData[] = [
  // ── Proposal Created ──
  {
    id: "p1",
    systemSize: "9.5 kW",
    panels: 24,
    batteries: 1,
    daysInStage: 0,
    address: "774 County Rd 13700, Paris, TX 75462",
    ownerName: "Nina Wong",
    assignee: "Hudolf E.",
    date: "25 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold" as const }],
    stageId: "proposal-created",
    fullName: "Nina Wong",
    email: "nina.wong@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Proposal Created",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 25, 2026",
  },
  {
    id: "p2",
    systemSize: "7.2 kW",
    panels: 18,
    batteries: 0,
    daysInStage: 3,
    address: "1420 Elm St, Dallas, TX 75201",
    ownerName: "Marcus Chen",
    assignee: "Hudolf E.",
    date: "22 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "Referral" }],
    stageId: "proposal-created",
    fullName: "Marcus Chen",
    email: "marcus.chen@outlook.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Proposal Created",
    utilityCompany: "Oncor",
    paymentOption: "Sunlight Financial",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 22, 2026",
  },
  {
    id: "p3",
    systemSize: "12.0 kW",
    panels: 30,
    batteries: 2,
    daysInStage: 1,
    address: "802 Magnolia Ave, Fort Worth, TX 76104",
    ownerName: "Sarah Patel",
    assignee: "Jenna M.",
    date: "24 Jan, 2026",
    department: "Sales",
    tags: [],
    stageId: "proposal-created",
    fullName: "Sarah Patel",
    email: "sarah.patel@yahoo.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Website",
    status: "Proposal Created",
    utilityCompany: "Oncor",
    paymentOption: "Mosaic",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 24, 2026",
  },
  {
    id: "p13",
    systemSize: "6.0 kW",
    panels: 15,
    batteries: 0,
    daysInStage: 0,
    address: "1250 Westheimer Rd, Houston, TX 77006",
    ownerName: "David Kim",
    assignee: "Jenna M.",
    date: "25 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Urgent" }],
    stageId: "proposal-created",
    fullName: "David Kim",
    email: "david.kim@outlook.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Proposal Created",
    utilityCompany: "CenterPoint",
    paymentOption: "Sunlight Financial",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 25, 2026",
  },

  // ── Credit Submitted ──
  {
    id: "p21",
    systemSize: "8.4 kW",
    panels: 21,
    batteries: 1,
    daysInStage: 5,
    address: "3301 Oak Lawn Ave, Dallas, TX 75219",
    ownerName: "James Lahey",
    assignee: "Hudolf E.",
    date: "20 Jan, 2026",
    department: "Sales",
    tags: [],
    stageId: "credit-submitted",
    fullName: "James Lahey",
    email: "james.lahey@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Credit Submitted",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 20, 2026",
  },
  {
    id: "p22",
    systemSize: "6.8 kW",
    panels: 17,
    batteries: 1,
    daysInStage: 2,
    address: "945 Pecan Creek Dr, Richardson, TX 75080",
    ownerName: "Charlie Kelly",
    assignee: "Jenna M.",
    date: "23 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Urgent" }],
    stageId: "credit-submitted",
    fullName: "Charlie Kelly",
    email: "charlie.kelly@hotmail.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Credit Submitted",
    utilityCompany: "Oncor",
    paymentOption: "Dividend Finance",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 23, 2026",
  },
  {
    id: "p23",
    systemSize: "10.2 kW",
    panels: 26,
    batteries: 1,
    daysInStage: 7,
    address: "2100 W Park Blvd, Plano, TX 75075",
    ownerName: "Priya Sharma",
    assignee: "Hudolf E.",
    date: "18 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "VIP" }],
    stageId: "credit-submitted",
    fullName: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "Credit Submitted",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 18, 2026",
  },

  // ── Credit Approved ──
  {
    id: "p24",
    systemSize: "8.0 kW",
    panels: 20,
    batteries: 1,
    daysInStage: 2,
    address: "3610 Stone Bridge Ln, Plano, TX 75074",
    ownerName: "Rachel Green",
    assignee: "Hudolf E.",
    date: "23 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "Referral" }],
    stageId: "credit-approved",
    fullName: "Rachel Green",
    email: "rachel.green@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Credit Approved",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 23, 2026",
  },
  {
    id: "p25",
    systemSize: "11.5 kW",
    panels: 29,
    batteries: 2,
    daysInStage: 9,
    address: "450 Main St, Frisco, TX 75034",
    ownerName: "Tommy Vercetti",
    assignee: "Jenna M.",
    date: "16 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "credit-approved",
    fullName: "Tommy Vercetti",
    email: "tommy.vercetti@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Website",
    status: "Credit Approved",
    utilityCompany: "Oncor",
    paymentOption: "Mosaic",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 16, 2026",
  },
  {
    id: "p26",
    systemSize: "6.5 kW",
    panels: 16,
    batteries: 1,
    daysInStage: 4,
    address: "8920 Garland Rd, Dallas, TX 75218",
    ownerName: "Lisa Nguyen",
    assignee: "Hudolf E.",
    date: "21 Jan, 2026",
    department: "Sales",
    tags: [{ type: "Lost" }],
    stageId: "credit-approved",
    fullName: "Lisa Nguyen",
    email: "lisa.nguyen@hotmail.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Credit Approved",
    utilityCompany: "Oncor",
    paymentOption: "Dividend Finance",
    applicationId: "No ID yet",
    signedAt: "No Applications signed",
    createdOn: "Jan 21, 2026",
  },

  // ── Contract Sent ──
  {
    id: "p7",
    systemSize: "11.0 kW",
    panels: 28,
    batteries: 2,
    daysInStage: 4,
    address: "508 Live Oak St, Austin, TX 78701",
    ownerName: "Dennis Reynolds",
    assignee: "Jenna M.",
    date: "21 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "contract-sent",
    fullName: "Dennis Reynolds",
    email: "dennis.reynolds@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Referral",
    status: "Contract Sent",
    utilityCompany: "Austin Energy",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0041",
    signedAt: "No Applications signed",
    createdOn: "Jan 21, 2026",
  },
  {
    id: "p8",
    systemSize: "5.6 kW",
    panels: 14,
    batteries: 0,
    daysInStage: 10,
    address: "7722 Greenville Ave, Dallas, TX 75231",
    ownerName: "Jessie Spano",
    assignee: "Hudolf E.",
    date: "15 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "Referral" }],
    stageId: "contract-sent",
    fullName: "Jessie Spano",
    email: "jessie.spano@outlook.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Contract Sent",
    utilityCompany: "Oncor",
    paymentOption: "Sunlight Financial",
    applicationId: "APP-2026-0038",
    signedAt: "No Applications signed",
    createdOn: "Jan 15, 2026",
  },
  {
    id: "p9",
    systemSize: "9.0 kW",
    panels: 22,
    batteries: 1,
    daysInStage: 6,
    address: "1833 McKinney Ave, Dallas, TX 75201",
    ownerName: "Matthew Mara",
    assignee: "Jenna M.",
    date: "19 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Panel upgrade" }],
    stageId: "contract-sent",
    fullName: "Matthew Mara",
    email: "matt.mara@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Website",
    status: "Contract Sent",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0039",
    signedAt: "No Applications signed",
    createdOn: "Jan 19, 2026",
  },
  {
    id: "p17",
    systemSize: "14.0 kW",
    panels: 35,
    batteries: 3,
    daysInStage: 3,
    address: "5500 Preston Rd, Dallas, TX 75205",
    ownerName: "Robert Torres",
    assignee: "Jenna M.",
    date: "22 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "VIP" }],
    stageId: "contract-sent",
    fullName: "Robert Torres",
    email: "robert.torres@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Referral",
    status: "Contract Sent",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0043",
    signedAt: "No Applications signed",
    createdOn: "Jan 22, 2026",
  },

  // ── Contract Signed ──
  {
    id: "p10",
    systemSize: "13.5 kW",
    panels: 34,
    batteries: 2,
    daysInStage: 12,
    address: "4400 N Lamar Blvd, Austin, TX 78756",
    ownerName: "Sonny Crockett",
    assignee: "Hudolf E.",
    date: "13 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "VIP" }],
    stageId: "contract-signed",
    fullName: "Sonny Crockett",
    email: "sonny.crockett@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Contract Signed",
    utilityCompany: "Austin Energy",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0032",
    signedAt: "Jan 13, 2026",
    createdOn: "Jan 5, 2026",
  },
  {
    id: "p11",
    systemSize: "7.8 kW",
    panels: 20,
    batteries: 1,
    daysInStage: 8,
    address: "610 Brazos St, Houston, TX 77002",
    ownerName: "Bill Ponderosa",
    assignee: "Jenna M.",
    date: "17 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "contract-signed",
    fullName: "Bill Ponderosa",
    email: "bill.ponderosa@yahoo.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Contract Signed",
    utilityCompany: "CenterPoint",
    paymentOption: "Dividend Finance",
    applicationId: "APP-2026-0035",
    signedAt: "Jan 17, 2026",
    createdOn: "Jan 8, 2026",
  },
  {
    id: "p12",
    systemSize: "10.8 kW",
    panels: 27,
    batteries: 1,
    daysInStage: 15,
    address: "2901 S Congress Ave, Austin, TX 78704",
    ownerName: "Angela Lopez",
    assignee: "Hudolf E.",
    date: "10 Jan, 2026",
    department: "Sales",
    tags: [{ type: "Change Order", reason: "Battery add" }],
    stageId: "contract-signed",
    fullName: "Angela Lopez",
    email: "angela.lopez@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "Contract Signed",
    utilityCompany: "Austin Energy",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0028",
    signedAt: "Jan 10, 2026",
    createdOn: "Dec 28, 2025",
  },

  // ── Site Survey Scheduled ──
  {
    id: "p27",
    systemSize: "9.2 kW",
    panels: 23,
    batteries: 1,
    daysInStage: 3,
    address: "1100 Congress Ave, Austin, TX 78701",
    ownerName: "Emily White",
    assignee: "Hudolf E.",
    date: "22 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "site-survey-scheduled",
    fullName: "Emily White",
    email: "emily.white@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "Site Survey Scheduled",
    utilityCompany: "Austin Energy",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0022",
    signedAt: "Jan 5, 2026",
    createdOn: "Dec 20, 2025",
  },
  {
    id: "p28",
    systemSize: "8.6 kW",
    panels: 22,
    batteries: 1,
    daysInStage: 5,
    address: "3200 Knox St, Dallas, TX 75205",
    ownerName: "Kevin Hart",
    assignee: "Jenna M.",
    date: "20 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "Scheduling" }],
    stageId: "site-survey-scheduled",
    fullName: "Kevin Hart",
    email: "kevin.hart@yahoo.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Site Survey Scheduled",
    utilityCompany: "Oncor",
    paymentOption: "Dividend Finance",
    applicationId: "APP-2026-0033",
    signedAt: "Jan 14, 2026",
    createdOn: "Jan 2, 2026",
  },
  {
    id: "p29",
    systemSize: "15.0 kW",
    panels: 38,
    batteries: 3,
    daysInStage: 1,
    address: "700 Lavaca St, Austin, TX 78701",
    ownerName: "Maria Santos",
    assignee: "Hudolf E.",
    date: "24 Jan, 2026",
    department: "Sales",
    tags: [{ type: "On Hold", reason: "VIP" }],
    stageId: "site-survey-scheduled",
    fullName: "Maria Santos",
    email: "maria.santos@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Site Survey Scheduled",
    utilityCompany: "Austin Energy",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0025",
    signedAt: "Jan 7, 2026",
    createdOn: "Dec 22, 2025",
  },

  // ── Final Design ──
  {
    id: "p30",
    systemSize: "11.2 kW",
    panels: 28,
    batteries: 2,
    daysInStage: 6,
    address: "4200 Montrose Blvd, Houston, TX 77006",
    ownerName: "Derek Hale",
    assignee: "Jenna M.",
    date: "19 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Roof change" }],
    stageId: "final-design",
    fullName: "Derek Hale",
    email: "derek.hale@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Website",
    status: "Final Design",
    utilityCompany: "CenterPoint",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0019",
    signedAt: "Jan 2, 2026",
    createdOn: "Dec 15, 2025",
  },
  {
    id: "p31",
    systemSize: "7.4 kW",
    panels: 19,
    batteries: 1,
    daysInStage: 10,
    address: "5601 Smu Blvd, Dallas, TX 75206",
    ownerName: "Carla Reyes",
    assignee: "Hudolf E.",
    date: "15 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "final-design",
    fullName: "Carla Reyes",
    email: "carla.reyes@outlook.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Final Design",
    utilityCompany: "Oncor",
    paymentOption: "Sunlight Financial",
    applicationId: "APP-2026-0015",
    signedAt: "Dec 28, 2025",
    createdOn: "Dec 10, 2025",
  },
  {
    id: "p32",
    systemSize: "13.0 kW",
    panels: 33,
    batteries: 2,
    daysInStage: 4,
    address: "901 W Riverside Dr, Austin, TX 78704",
    ownerName: "Frank Castle",
    assignee: "Jenna M.",
    date: "21 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "Engineering review" }],
    stageId: "final-design",
    fullName: "Frank Castle",
    email: "frank.castle@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Sales",
    status: "Final Design",
    utilityCompany: "Austin Energy",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0021",
    signedAt: "Jan 4, 2026",
    createdOn: "Dec 18, 2025",
  },

  // ── Permit ──
  {
    id: "p33",
    systemSize: "10.0 kW",
    panels: 25,
    batteries: 1,
    daysInStage: 14,
    address: "2200 Victory Ave, Dallas, TX 75219",
    ownerName: "Grace Hopper",
    assignee: "Hudolf E.",
    date: "11 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "City review" }],
    stageId: "permit",
    fullName: "Grace Hopper",
    email: "grace.hopper@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "Permit",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0010",
    signedAt: "Dec 20, 2025",
    createdOn: "Dec 1, 2025",
  },
  {
    id: "p34",
    systemSize: "8.8 kW",
    panels: 22,
    batteries: 1,
    daysInStage: 8,
    address: "1515 Hermann Dr, Houston, TX 77004",
    ownerName: "Oscar Diaz",
    assignee: "Jenna M.",
    date: "17 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "permit",
    fullName: "Oscar Diaz",
    email: "oscar.diaz@yahoo.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Permit",
    utilityCompany: "CenterPoint",
    paymentOption: "Dividend Finance",
    applicationId: "APP-2026-0013",
    signedAt: "Dec 26, 2025",
    createdOn: "Dec 8, 2025",
  },
  {
    id: "p35",
    systemSize: "16.0 kW",
    panels: 40,
    batteries: 3,
    daysInStage: 20,
    address: "3000 Turtle Creek Blvd, Dallas, TX 75219",
    ownerName: "Vanessa Cole",
    assignee: "Hudolf E.",
    date: "5 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Panel swap" }],
    stageId: "permit",
    fullName: "Vanessa Cole",
    email: "vanessa.cole@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Permit",
    utilityCompany: "Oncor",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0005",
    signedAt: "Dec 15, 2025",
    createdOn: "Nov 25, 2025",
  },

  // ── Install ──
  {
    id: "p36",
    systemSize: "9.8 kW",
    panels: 25,
    batteries: 1,
    daysInStage: 2,
    address: "6100 Berkshire Ln, Dallas, TX 75225",
    ownerName: "Tony Montana",
    assignee: "Jenna M.",
    date: "23 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "install",
    fullName: "Tony Montana",
    email: "tony.montana@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Sales",
    status: "Install",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0008",
    signedAt: "Dec 18, 2025",
    createdOn: "Nov 28, 2025",
  },
  {
    id: "p37",
    systemSize: "12.5 kW",
    panels: 31,
    batteries: 2,
    daysInStage: 1,
    address: "820 Studewood St, Houston, TX 77007",
    ownerName: "Mia Wallace",
    assignee: "Hudolf E.",
    date: "24 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "Weather delay" }],
    stageId: "install",
    fullName: "Mia Wallace",
    email: "mia.wallace@outlook.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "Install",
    utilityCompany: "CenterPoint",
    paymentOption: "Sunlight Financial",
    applicationId: "APP-2026-0009",
    signedAt: "Dec 19, 2025",
    createdOn: "Nov 30, 2025",
  },

  // ── Inspection ──
  {
    id: "p38",
    systemSize: "7.6 kW",
    panels: 19,
    batteries: 1,
    daysInStage: 4,
    address: "4100 Travis St, Houston, TX 77002",
    ownerName: "Jules Verne",
    assignee: "Jenna M.",
    date: "21 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Lost" }],
    stageId: "inspection",
    fullName: "Jules Verne",
    email: "jules.verne@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Referral",
    status: "Inspection",
    utilityCompany: "CenterPoint",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0006",
    signedAt: "Dec 16, 2025",
    createdOn: "Nov 20, 2025",
  },
  {
    id: "p39",
    systemSize: "10.4 kW",
    panels: 26,
    batteries: 1,
    daysInStage: 7,
    address: "2500 Cedar Springs Rd, Dallas, TX 75201",
    ownerName: "Sam Fisher",
    assignee: "Hudolf E.",
    date: "18 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "inspection",
    fullName: "Sam Fisher",
    email: "sam.fisher@yahoo.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Inspection",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0004",
    signedAt: "Dec 12, 2025",
    createdOn: "Nov 15, 2025",
  },
  {
    id: "p40",
    systemSize: "14.2 kW",
    panels: 36,
    batteries: 3,
    daysInStage: 3,
    address: "1700 Post Oak Blvd, Houston, TX 77056",
    ownerName: "Diana Prince",
    assignee: "Jenna M.",
    date: "22 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Inverter swap" }],
    stageId: "inspection",
    fullName: "Diana Prince",
    email: "diana.prince@gmail.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Inspection",
    utilityCompany: "CenterPoint",
    paymentOption: "Dividend Finance",
    applicationId: "APP-2026-0007",
    signedAt: "Dec 17, 2025",
    createdOn: "Nov 22, 2025",
  },

  // ── PTO ──
  {
    id: "p41",
    systemSize: "8.2 kW",
    panels: 21,
    batteries: 1,
    daysInStage: 12,
    address: "5200 Lemmon Ave, Dallas, TX 75209",
    ownerName: "Clark Kent",
    assignee: "Hudolf E.",
    date: "13 Jan, 2026",
    department: "Operations",
    tags: [{ type: "On Hold", reason: "Utility delay" }],
    stageId: "PTO",
    fullName: "Clark Kent",
    email: "clark.kent@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Website",
    status: "PTO",
    utilityCompany: "Oncor",
    paymentOption: "Goodleap",
    applicationId: "APP-2026-0002",
    signedAt: "Dec 5, 2025",
    createdOn: "Nov 5, 2025",
  },
  {
    id: "p42",
    systemSize: "11.8 kW",
    panels: 30,
    batteries: 2,
    daysInStage: 6,
    address: "3300 Kirby Dr, Houston, TX 77098",
    ownerName: "Bruce Wayne",
    assignee: "Jenna M.",
    date: "19 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "PTO",
    fullName: "Bruce Wayne",
    email: "bruce.wayne@outlook.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Jenna Martinez",
    leadSource: "Referral",
    status: "PTO",
    utilityCompany: "CenterPoint",
    paymentOption: "Mosaic",
    applicationId: "APP-2026-0003",
    signedAt: "Dec 10, 2025",
    createdOn: "Nov 10, 2025",
  },

  // ── Project Complete ──
  {
    id: "p43",
    systemSize: "9.6 kW",
    panels: 24,
    batteries: 1,
    daysInStage: 0,
    address: "1900 Allen Pkwy, Houston, TX 77019",
    ownerName: "Peter Parker",
    assignee: "Hudolf E.",
    date: "25 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "project-complete",
    fullName: "Peter Parker",
    email: "peter.parker@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Sales",
    status: "Project Complete",
    utilityCompany: "CenterPoint",
    paymentOption: "Goodleap",
    applicationId: "APP-2025-0098",
    signedAt: "Nov 15, 2025",
    createdOn: "Oct 1, 2025",
  },
  {
    id: "p44",
    systemSize: "13.8 kW",
    panels: 35,
    batteries: 2,
    daysInStage: 0,
    address: "4500 Swiss Ave, Dallas, TX 75204",
    ownerName: "Natasha Romanov",
    assignee: "Jenna M.",
    date: "20 Jan, 2026",
    department: "Operations",
    tags: [{ type: "Change Order", reason: "Final audit" }],
    stageId: "project-complete",
    fullName: "Natasha Romanov",
    email: "natasha.romanov@yahoo.com",
    installer: "SunPro Solar",
    team: "SunPro West",
    representative: "Jenna Martinez",
    leadSource: "Door-to-door",
    status: "Project Complete",
    utilityCompany: "Oncor",
    paymentOption: "Dividend Finance",
    applicationId: "APP-2025-0101",
    signedAt: "Nov 20, 2025",
    createdOn: "Oct 10, 2025",
  },
  {
    id: "p45",
    systemSize: "6.2 kW",
    panels: 16,
    batteries: 0,
    daysInStage: 0,
    address: "7800 Shoal Creek Blvd, Austin, TX 78757",
    ownerName: "Wade Wilson",
    assignee: "Hudolf E.",
    date: "18 Jan, 2026",
    department: "Operations",
    tags: [],
    stageId: "project-complete",
    fullName: "Wade Wilson",
    email: "wade.wilson@gmail.com",
    installer: "Monalee",
    team: "Monalee Direct",
    representative: "Aritro Paul",
    leadSource: "Referral",
    status: "Project Complete",
    utilityCompany: "Austin Energy",
    paymentOption: "Mosaic",
    applicationId: "APP-2025-0095",
    signedAt: "Nov 10, 2025",
    createdOn: "Sep 25, 2025",
  },
];

export function getListProjects(): ProjectCardData[] {
  return initialProjects;
}

/* ─── Filter types and logic ─── */

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

export const defaultFilters: ProjectFilters = {
  statusFilter: "all",
  projectStatus: "",
  projectType: "all",
  leadSource: "all",
  installer: "",
  team: "",
  representative: "",
  paymentType: "all",
  state: "",
  city: "",
  utilityCompany: "",
  startDate: "",
  endDate: "",
  minDaysInStage: "",
  maxDaysInStage: "",
};

export function getStageAtDate(
  history: StageHistoryEntry[],
  date: Date
): string | null {
  for (const entry of history) {
    const entered = new Date(entry.enteredAt);
    const exited = entry.exitedAt ? new Date(entry.exitedAt) : null;
    if (entered <= date && (exited === null || exited > date)) {
      return entry.stageId;
    }
  }
  return null;
}

export function filterProjects(
  projects: ProjectCardData[],
  filters: ProjectFilters,
  stageHistoryMap?: Record<string, StageHistoryEntry[]>
): ProjectCardData[] {
  return projects.filter((p) => {
    // Status (based on tags) — "all" shows everything
    if (filters.statusFilter !== "all") {
      if (
        filters.statusFilter === "onhold" &&
        !p.tags.some((t) => t.type === "On Hold")
      )
        return false;
      if (
        filters.statusFilter === "cancelled" &&
        !p.tags.some((t) => t.type === "Lost")
      )
        return false;
      if (
        filters.statusFilter === "active" &&
        p.tags.some((t) => t.type === "On Hold" || t.type === "Lost")
      )
        return false;
    }

    // Project type
    if (filters.projectType === "solar" && p.batteries > 0) return false;
    if (filters.projectType === "battery" && p.batteries === 0) return false;
    if (
      filters.projectType === "both" &&
      (p.batteries === 0 || p.panels === 0)
    )
      return false;

    // Lead source
    if (
      filters.leadSource !== "all" &&
      p.leadSource.toLowerCase() !== filters.leadSource.toLowerCase()
    )
      return false;

    // Org fields
    if (filters.installer && p.installer !== filters.installer) return false;
    if (filters.team && p.team !== filters.team) return false;
    if (filters.representative && p.representative !== filters.representative)
      return false;

    // Project status
    if (filters.projectStatus && p.status !== filters.projectStatus)
      return false;

    // Location — extract state and city from address "Street, City, ST ZIP"
    if (filters.state || filters.city) {
      const parts = p.address.split(",").map((s) => s.trim());
      if (parts.length >= 2) {
        const cityPart = parts[parts.length - 2];
        const stateZip = parts[parts.length - 1];
        const stateMatch = stateZip.match(/^([A-Z]{2})\s/);
        const extractedState = stateMatch ? stateMatch[1] : "";
        if (filters.state && extractedState !== filters.state) return false;
        if (
          filters.city &&
          !cityPart.toLowerCase().includes(filters.city.toLowerCase())
        )
          return false;
      }
    }

    // Utility company
    if (filters.utilityCompany && p.utilityCompany !== filters.utilityCompany)
      return false;

    // Payment type
    if (
      filters.paymentType === "cash" &&
      !p.paymentOption.toLowerCase().includes("cash")
    )
      return false;
    if (
      filters.paymentType === "finance" &&
      p.paymentOption.toLowerCase().includes("cash")
    )
      return false;

    // Date filters: each date acts as a snapshot — project must have existed at that point
    if (stageHistoryMap && (filters.startDate || filters.endDate)) {
      const history = stageHistoryMap[p.id];
      if (!history || history.length === 0) return false;

      if (filters.startDate) {
        if (!getStageAtDate(history, new Date(filters.startDate))) return false;
      }
      if (filters.endDate) {
        if (!getStageAtDate(history, new Date(filters.endDate))) return false;
      }
    }

    // Days-in-stage filters — based on current stage
    if (stageHistoryMap && (filters.minDaysInStage || filters.maxDaysInStage)) {
      const history = stageHistoryMap[p.id];
      const current = history?.find((h) => h.exitedAt === null);
      if (!current) return false;

      const enteredDate = new Date(current.enteredAt);
      const daysInStage = Math.floor(
        (Date.now() - enteredDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (filters.minDaysInStage) {
        if (daysInStage < Number(filters.minDaysInStage)) return false;
      }
      if (filters.maxDaysInStage) {
        if (daysInStage > Number(filters.maxDaysInStage)) return false;
      }
    }

    return true;
  });
}

// Extract city and state from address "Street, City, ST ZIP"
function parseAddress(address: string) {
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 2) {
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1];
    const stateMatch = stateZip.match(/^([A-Z]{2})\s/);
    return { city, state: stateMatch ? stateMatch[1] : "" };
  }
  return { city: "", state: "" };
}

export const filterOptions = {
  installers: [...new Set(initialProjects.map((p) => p.installer))].sort(),
  teams: [...new Set(initialProjects.map((p) => p.team))].sort(),
  representatives: [
    ...new Set(initialProjects.map((p) => p.representative)),
  ].sort(),
  statuses: [...new Set(initialProjects.map((p) => p.status))].sort(),
  states: [
    ...new Set(initialProjects.map((p) => parseAddress(p.address).state).filter(Boolean)),
  ].sort(),
  cities: [
    ...new Set(initialProjects.map((p) => parseAddress(p.address).city).filter(Boolean)),
  ].sort(),
  utilityCompanies: [
    ...new Set(initialProjects.map((p) => p.utilityCompany)),
  ].sort(),
};

export const recentProjects = initialProjects.slice(0, 3).map((project) => ({
  id: project.id,
  name: `${project.ownerName}, ${project.address}`,
}));

/* ─── Project detail data ─── */

export interface ProjectDetailData extends ProjectCardData {
  financePayment: string;
  systemSizeKw: string;
  estOffset: string;
  projectType: "Solar" | "Battery" | "Solar + Battery";
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

const projectDetailExtras: Record<string, Partial<ProjectDetailData>> = {
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

const defaultDetailExtras: Omit<ProjectDetailData, keyof ProjectCardData> = {
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

export const settingsItems = [
  { id: "general", label: "General", href: "/settings/general" },
  { id: "installers", label: "Installers", href: "/settings/installers" },
  { id: "pricing", label: "Pricing", href: "/settings/pricing" },
  { id: "teams", label: "Teams", href: "/settings/teams" },
  { id: "users", label: "Users", href: "/settings/users" },
  { id: "roles", label: "Roles", href: "/settings/roles" },
];

/* ─── Notes / Comments types & seed data ─── */

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

/* ─── Design comments (positioned on canvas) ─── */

export interface DesignComment {
  id: number;
  top: string;
  left: string;
  name: string;
  time: string;
  textParts: NoteTextPart[];
  thread: ThreadReply[];
}

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

/* ─── Checklist ─── */

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

export const initialChecklist: ChecklistSection[] = [
  {
    stageId: "proposal-created",
    title: "Proposal Created",
    items: [
      { label: "Utility bill collected", done: true },
      { label: "Photo ID collected", done: true },
      { label: "Site photos uploaded", done: true },
      { label: "Shade analysis complete", done: true },
    ],
  },
  {
    stageId: "credit-submitted",
    title: "Credit Submitted",
    items: [
      { label: "Credit application submitted", done: false },
      { label: "Credit decision received", done: false },
    ],
  },
  {
    stageId: "contract-sent",
    title: "Contract Sent",
    items: [
      { label: "Contract sent via Docusign", done: false },
      { label: "HOA application submitted", done: false, optional: true },
    ],
  },
  {
    stageId: "contract-signed",
    title: "Contract Signed",
    items: [
      { label: "Contract signed by customer", done: false },
      { label: "Permit application submitted", done: false },
      { label: "Handoff to operations complete", done: false },
    ],
  },
];

/* ─── Design labels ─── */

export interface LabelDef {
  id: string;
  name: string;
  color: string;
}

export interface PlacedLabel {
  labelId: string;
  top: number;
  left: number;
}

export const predefinedLabels: LabelDef[] = [
  { id: "plants", name: "Plants", color: "#059669" },
  { id: "vent", name: "Vent", color: "#525252" },
  { id: "panel-drop-off", name: "Panel drop off", color: "#8b5cf6" },
  { id: "dont-use-plane", name: "Don't use plane", color: "#eb4260" },
  { id: "no-walk-zone", name: "No walk zone", color: "#ea580c" },
  { id: "main-panel", name: "Main Panel", color: "#d97706" },
  { id: "conduit-run", name: "Conduit run", color: "#499fcf" },
  { id: "verify-on-site", name: "Verify on site", color: "#57534e" },
  { id: "steep-roof", name: "Steep roof", color: "#c026d3" },
];

/* ─── Activity feed ─── */

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
