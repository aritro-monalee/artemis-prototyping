"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/app/store/ProjectStore";
import { UploadPhotosModal } from "./UploadPhotosModal";

export function ChecklistContent({ projectId, currentStageId }: { projectId: string; currentStageId: string }) {
  const { getChecklist, toggleChecklistItem, presaleStages, postSaleStages, addUploadedDocuments } = useProjectStore();
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

  const [uploadModal, setUploadModal] = useState<{ title: string; stageId: string; itemIdx: number; kind: "document" | "photo" } | null>(null);

  const isUploadItem = (item: { ctaLabel?: string; label: string }) => {
    const text = (item.ctaLabel || item.label).toLowerCase();
    return text.includes("upload") || text.includes("photo");
  };

  const getUploadKind = (item: { ctaLabel?: string; label: string }): "document" | "photo" => {
    const text = (item.label + " " + (item.ctaLabel || "")).toLowerCase();
    if (text.includes("site photo") || text.includes("survey photo")) return "photo";
    return "document";
  };

  const handleCta = (item: { ctaRoute?: string; ctaLabel?: string; label: string }, stageId: string, itemIdx: number) => {
    if (item.ctaRoute) {
      router.push(item.ctaRoute);
    } else if (isUploadItem(item)) {
      setUploadModal({ title: item.ctaLabel || item.label, stageId, itemIdx, kind: getUploadKind(item) });
    } else {
      toggleChecklistItem(projectId, stageId, itemIdx);
    }
  };

  const handleUploadConfirm = useCallback((fileNames: string[]) => {
    if (uploadModal) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
      const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
      const docs = fileNames.map((name) => ({
        fileName: name,
        uploadedBy: "Alex Patin",
        uploadedAt: `${dateStr} at ${timeStr}`,
        kind: uploadModal.kind,
      }));
      addUploadedDocuments(projectId, docs);
      toggleChecklistItem(projectId, uploadModal.stageId, uploadModal.itemIdx);
      setUploadModal(null);
    }
  }, [uploadModal, projectId, toggleChecklistItem, addUploadedDocuments]);

  return (
    <div className="flex flex-col w-full">
      <p className="text-sm font-medium leading-5 text-[var(--color-text)] pt-5 pb-2">Project Checklist</p>
      <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider pt-2 pb-1">{phaseLabel}</p>

      <div className="flex flex-col gap-1">
        {displaySections.map((section, sIdx) => {
          const isOpen = openSections.has(section.stageId);
          const isCurrent = section.stageId === currentStageId;
          const doneCount = section.items.filter((i) => i.done).length;
          const totalCount = section.items.length;
          const allDone = totalCount > 0 && doneCount === totalCount;
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
                  className="flex items-center justify-between pt-3 pb-1.5 w-full cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-semibold leading-4 ${allDone ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]"}`}>{section.title}</p>
                    {isCurrent && (
                      <span className="text-[10px] font-medium text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-1.5 py-0.5 rounded-full leading-none">
                        Current
                      </span>
                    )}
                                    <span className={`text-[10px] tabular-nums leading-none text-[var(--color-text-muted)]`}>
                      {doneCount}/{totalCount}
                    </span>
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
                      <div className="flex flex-col gap-0.5 pb-2">
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
                              className={`flex flex-col w-full rounded-lg transition-colors ${
                                isNext && !item.done
                                  ? "py-3 px-3 pl-4 bg-[rgba(110,4,189,0.04)] border border-[rgba(0,0,0,0.08)]"
                                  : item.done
                                    ? "py-2 px-1 opacity-50"
                                    : "py-2 px-1"
                              }`}
                            >
                              <button
                                className="flex gap-2.5 items-start w-full cursor-pointer"
                                onClick={() => toggleChecklistItem(projectId, section.stageId, iIdx)}
                              >
                                <motion.div
                                  whileTap={{ scale: 0.85 }}
                                  className={`w-4 h-4 rounded-[4px] shrink-0 flex items-center justify-center mt-px ${
                                    item.done
                                      ? "bg-[var(--color-brand)] border border-[var(--color-brand)]"
                                      : "bg-white border border-[var(--color-border-alt)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
                                  }`}
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
                                <div className="flex flex-col gap-0.5 items-start">
                                  <span className={`text-[13px] leading-4 text-left ${
                                    item.done
                                      ? "text-[var(--color-text-muted)]/50 line-through decoration-[var(--color-text-muted)]/30"
                                      : "text-[var(--color-text)] font-medium"
                                  }`}>
                                    {item.label}
                                  </span>
                                  {isNext && !item.done && item.statusText && (
                                    <span className="text-xs font-normal text-[#998d7d] leading-4 text-left">
                                      {item.statusText}
                                    </span>
                                  )}
                                  {item.optional && !item.done && (
                                    <span className="text-[10px] font-medium text-amber-600/70 leading-3">Optional</span>
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
                                    <div className="mt-2 ml-[26px]">
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {sIdx < displaySections.length - 1 && (
                  <div className="h-px bg-[var(--color-border-alt)]/40 mx-1" />
                )}
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>

      <button
        onClick={handleViewToggle}
        className="flex items-center justify-between py-2.5 mt-2 w-full cursor-pointer bg-[var(--color-surface)] -mx-6 px-6"
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

      <AnimatePresence>
        {uploadModal && (
          <UploadPhotosModal
            title={uploadModal.title}
            onClose={() => setUploadModal(null)}
            onConfirm={handleUploadConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
