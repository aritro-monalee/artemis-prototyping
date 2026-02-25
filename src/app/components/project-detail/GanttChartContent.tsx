"use client";

import { motion } from "framer-motion";
import type { PipelineStage } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";
import { MLToolTip } from "@/app/lib/monalee-ui/components/MLToolTip";

const LABEL_COL = 110;
const TIMELINE_PAD = 12;
const LINE_LEFT = LABEL_COL + TIMELINE_PAD + 6;

function formatShortDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function GanttChartContent({
  projectId,
  isPresale,
  phaseStages,
  currentStageId,
}: {
  projectId: string;
  isPresale: boolean;
  phaseStages: PipelineStage[];
  currentStageId: string;
}) {
  const { getStageHistory } = useProjectStore();
  const history = getStageHistory(projectId);

  const phaseStageIds = new Set(phaseStages.map((s) => s.id));
  const historyMap = new Map(
    history.filter((h) => phaseStageIds.has(h.stageId)).map((h) => [h.stageId, h])
  );

  const now = new Date();

  const rows = phaseStages.map((stage) => {
    const entry = historyMap.get(stage.id);
    if (!entry) return { stage, startMs: 0, endMs: 0, hasHistory: false, isCurrent: false };
    const entered = new Date(entry.enteredAt);
    const exited = entry.exitedAt ? new Date(entry.exitedAt) : now;
    return {
      stage,
      startMs: entered.getTime(),
      endMs: exited.getTime(),
      hasHistory: true,
      isCurrent: entry.exitedAt === null,
    };
  });

  const withHistory = rows.filter((r) => r.hasHistory);
  const timelineStart = withHistory.length > 0 ? Math.min(...withHistory.map((r) => r.startMs)) : 0;
  const timelineEnd = withHistory.length > 0 ? Math.max(...withHistory.map((r) => r.endMs)) : 1;
  const totalSpan = timelineEnd - timelineStart || 1;

  return (
    <div className="w-[480px] relative">
      <div
        className="absolute top-0 bottom-0 w-0 border-l border-dashed border-[rgba(0,0,0,0.10)] z-10 pointer-events-none"
        style={{ left: LINE_LEFT }}
      />
      <div className="flex flex-col py-3">
        {rows.map(({ stage, startMs, endMs, hasHistory, isCurrent }, idx) => {
          const leftPct = hasHistory ? ((startMs - timelineStart) / totalSpan) * 100 : 0;
          const widthPct = hasHistory ? Math.max(((endMs - startMs) / totalSpan) * 100, 4) : 0;

          return (
            <div
              key={stage.id}
              className={`flex items-center px-3 py-2 ${
                idx % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-white"
              }`}
            >
              <span className="text-xs font-medium text-[var(--color-text)] w-[110px] shrink-0 leading-4 whitespace-nowrap truncate">
                {stage.title}
              </span>
              <div className="flex-1 relative h-[8px]">
                {hasHistory && (
                  <MLToolTip
                    side="top"
                    tooltipContent={`${formatShortDate(startMs)} — ${isCurrent ? "Present" : formatShortDate(endMs)}`}
                  >
                    <motion.div
                      className="absolute h-full rounded-full border-[0.5px] border-[rgba(0,0,0,0.24)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-default"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${widthPct}%`, opacity: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{
                        left: `${leftPct}%`,
                        minWidth: 20,
                        backgroundColor: stage.color,
                      }}
                    />
                  </MLToolTip>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
