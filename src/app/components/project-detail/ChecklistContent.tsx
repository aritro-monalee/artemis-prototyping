"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/app/store/ProjectStore";

export function ChecklistContent({ projectId, currentStageId }: { projectId: string; currentStageId: string }) {
  const { getChecklist, toggleChecklistItem, presaleStages, postSaleStages } = useProjectStore();
  const router = useRouter();
  const checklistSections = getChecklist(projectId);
  const [expandedAll, setExpandedAll] = useState(false);

  const presaleIds = presaleStages.map((s) => s.id);
  const postsaleIds = postSaleStages.map((s) => s.id);
  const isPresale = presaleIds.includes(currentStageId);

  const currentPhaseIds = isPresale ? presaleIds : postsaleIds;
  const currentPhaseIdx = currentPhaseIds.indexOf(currentStageId);
  const relevantStageIds = new Set(currentPhaseIds.slice(0, currentPhaseIdx + 1));

  const relevantSections = checklistSections.filter((s) => relevantStageIds.has(s.stageId));
  const allPhaseSections = checklistSections.filter((s) =>
    new Set(currentPhaseIds).has(s.stageId)
  );
  const phaseLabel = isPresale ? "Pre Sale" : "Post Sale";
  const allPhaseItemCount = allPhaseSections.reduce((sum, s) => sum + s.items.length, 0);

  const displaySections = expandedAll ? allPhaseSections : relevantSections;

  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set([currentStageId])
  );

  const nextIncomplete = useMemo(() => {
    for (const section of displaySections) {
      if (!openSections.has(section.stageId)) continue;
      for (let i = 0; i < section.items.length; i++) {
        if (!section.items[i].done) {
          return { stageId: section.stageId, itemIdx: i };
        }
      }
    }
    return null;
  }, [displaySections, openSections]);

  const toggleSection = (stageId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) next.delete(stageId);
      else next.add(stageId);
      return next;
    });
  };

  const handleViewToggle = () => {
    if (expandedAll) {
      setOpenSections(new Set([currentStageId]));
      setExpandedAll(false);
    } else {
      setOpenSections(new Set(allPhaseSections.map((s) => s.stageId)));
      setExpandedAll(true);
    }
  };

  const handleCta = (item: { ctaRoute?: string }, stageId: string, itemIdx: number) => {
    if (item.ctaRoute) {
      router.push(item.ctaRoute);
    } else {
      toggleChecklistItem(projectId, stageId, itemIdx);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-sm font-medium leading-5 text-[var(--color-text)] pt-5 pb-2">Project Checklist</p>
      <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider pt-2 pb-1">{phaseLabel}</p>

      {displaySections.map((section, sIdx) => {
        const isOpen = openSections.has(section.stageId);
        const isCurrent = section.stageId === currentStageId;
        return (
          <AnimatePresence key={section.stageId} initial={false}>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: sIdx > 0 ? sIdx * 0.05 : 0 }}
              className="w-full"
            >
              <button
                onClick={() => toggleSection(section.stageId)}
                className="flex items-center justify-between py-2 w-full cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium text-[var(--color-text-muted)] leading-4">{section.title}</p>
                  {isCurrent && (
                    <span className="text-[10px] font-medium text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-1.5 py-0.5 rounded-full leading-none">
                      Current
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full overflow-hidden"
                  >
                    {section.items.map((item, iIdx) => {
                      const isNext =
                        nextIncomplete?.stageId === section.stageId &&
                        nextIncomplete?.itemIdx === iIdx;

                      return (
                        <motion.div
                          key={iIdx}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15, delay: iIdx * 0.03 }}
                          className={`flex flex-col w-full ${isNext && !item.done ? "py-3 px-3 pl-4 rounded-lg bg-[rgba(110,4,189,0.04)] border border-[rgba(0,0,0,0.08)]" : "py-2"}`}
                        >
                          <button
                            className="flex gap-2 items-start w-full cursor-pointer"
                            onClick={() => toggleChecklistItem(projectId, section.stageId, iIdx)}
                          >
                            <motion.div
                              whileTap={{ scale: 0.85 }}
                              className={`w-4 h-4 rounded-[4px] shrink-0 flex items-center justify-center ${
                                item.done
                                  ? "bg-[var(--color-brand)] border border-[var(--color-brand)]"
                                  : "bg-white border border-[var(--color-border-alt)]"
                              } shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]`}
                            >
                              <AnimatePresence>
                                {item.done && (
                                  <motion.div
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  >
                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                            <div className="flex flex-col gap-1 items-start">
                              <span className={`text-sm font-medium leading-none text-left ${item.done ? "text-[var(--color-text-muted)] line-through" : "text-[var(--color-text)]"}`}>
                                {item.label}
                              </span>
                              {isNext && !item.done && item.statusText && (
                                <span className="text-xs font-normal text-[#998d7d] leading-4 text-left">
                                  {item.statusText}
                                </span>
                              )}
                              {item.optional && (
                                <span className="text-xs font-normal text-[var(--color-text-muted)] leading-4">Optional</span>
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isNext && !item.done && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 ml-6">
                                  <button
                                    className="px-2.5 py-1.5 text-xs font-medium text-white bg-[var(--color-brand)] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[var(--color-brand-hover)] transition-colors cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCta(item, section.stageId, iIdx);
                                    }}
                                  >
                                    {item.ctaLabel || item.label}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        );
      })}

      <button
        onClick={handleViewToggle}
        className="flex items-center justify-between py-2 w-full cursor-pointer bg-[var(--color-surface)] -mx-6 px-6"
        style={{ width: "calc(100% + 48px)" }}
      >
        <p className="text-xs font-medium text-[var(--color-text-muted)] leading-4">
          {expandedAll ? "View only current stage" : `View all ${phaseLabel.toLowerCase()} (${allPhaseItemCount})`}
        </p>
        <motion.div
          animate={{ rotate: expandedAll ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>
    </div>
  );
}
