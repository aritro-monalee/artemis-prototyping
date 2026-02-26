"use client";

import { motion } from "framer-motion";
import type { PipelineStage } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";
import { MLToolTip } from "@/app/lib/monalee-ui/components/MLToolTip";

const CONTAINER_W = 480;
const PAD = 12;
const LABEL_W = 110;
const NOW_SPACE = 30;
const BAR_AREA = CONTAINER_W - PAD * 2 - LABEL_W;
const LINE_LEFT = LABEL_W + PAD + 6;
const MIN_BAR = 20;

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

  const visibleRows = rows.filter((r) => r.hasHistory);
  const hasCurrent = visibleRows.some((r) => r.isCurrent);
  const timelineStart = visibleRows.length > 0 ? Math.min(...visibleRows.map((r) => r.startMs)) : 0;
  const timelineEnd = visibleRows.length > 0 ? Math.max(...visibleRows.map((r) => r.endMs)) : 1;
  const totalSpan = timelineEnd - timelineStart || 1;
  const usableBar = hasCurrent ? BAR_AREA - NOW_SPACE : BAR_AREA;

  return (
    <div style={{ width: CONTAINER_W }} className="relative">
      <div
        className="absolute top-0 bottom-0 w-0 border-l border-dashed border-[rgba(0,0,0,0.10)] z-10 pointer-events-none"
        style={{ left: LINE_LEFT }}
      />
      <div className="flex flex-col py-3">
        {visibleRows.map(({ stage, startMs, endMs, isCurrent }, idx) => {
          let leftPx = ((startMs - timelineStart) / totalSpan) * usableBar;
          let widthPx = Math.max(((endMs - startMs) / totalSpan) * usableBar, MIN_BAR);
          if (leftPx + widthPx > usableBar) {
            leftPx = usableBar - widthPx;
          }

          return (
            <div
              key={stage.id}
              className={`flex items-center py-2 ${
                idx % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-white"
              }`}
              style={{ paddingLeft: PAD, paddingRight: PAD }}
            >
              <span
                className="text-xs font-medium text-[var(--color-text)] shrink-0 leading-4 whitespace-nowrap truncate"
                style={{ width: LABEL_W }}
              >
                {stage.title}
              </span>
              <div className="relative h-[8px]" style={{ width: BAR_AREA }}>
                <MLToolTip
                  side="top"
                  tooltipContent={`${formatShortDate(startMs)} — ${isCurrent ? "Present" : formatShortDate(endMs)}`}
                >
                  <motion.div
                    className="absolute h-full rounded-full border-[0.5px] border-[rgba(0,0,0,0.24)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-default"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: widthPx, opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      left: leftPx,
                      backgroundColor: stage.color,
                    }}
                  />
                </MLToolTip>
                {isCurrent && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase leading-none tracking-wide whitespace-nowrap"
                    style={{ left: leftPx + widthPx + 6, color: stage.color }}
                  >
                    NOW
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
