import type { PipelineStage, ProjectCardData, StageHistoryEntry } from "./types";

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
