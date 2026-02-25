"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PanelRightClose, LayoutList } from "lucide-react";
import type { ProjectDetailData } from "@/app/data/projects";

import { ProjectOverviewCard } from "./project-detail/ProjectOverviewCard";
import { DetailsContent } from "./project-detail/DetailsContent";
import { NotesContent, ComposeBar } from "./project-detail/NotesContent";
import { ActivityContent } from "./project-detail/ActivityContent";
import { ChecklistContent } from "./project-detail/ChecklistContent";

export { ProjectOverviewCard } from "./project-detail/ProjectOverviewCard";
export { DetailsContent } from "./project-detail/DetailsContent";

const CONTENT_ORDER = ["details", "notes", "activity", "checklist"] as const;

interface ProjectDetailSidebarProps {
  project: ProjectDetailData;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showProjectChecklist: boolean;
  onShowProjectChecklist: (show: boolean) => void;
  onClose: () => void;
}

export function ProjectDetailSidebar({
  project,
  activeTab,
  onTabChange,
  showProjectChecklist,
  onShowProjectChecklist,
  onClose,
}: ProjectDetailSidebarProps) {
  const [systemOpen, setSystemOpen] = useState(true);
  const [financingOpen, setFinancingOpen] = useState(true);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const tabs = ["Details", "Notes", "Activity"] as const;
  const activeView = showProjectChecklist ? "checklist" : activeTab;
  const contentIndex = CONTENT_ORDER.indexOf(activeView as (typeof CONTENT_ORDER)[number]);
  const prevIndexRef = useRef(contentIndex);
  useEffect(() => {
    prevIndexRef.current = contentIndex;
  }, [contentIndex]);
  const slideFromRight = contentIndex > prevIndexRef.current;

  return (
    <aside
      className="w-[370px] shrink-0 border-l border-[var(--color-border)] flex flex-col h-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #fefbf7 7%, rgba(254,251,247,0) 14%), linear-gradient(90deg, #f4f1ed 0%, #f4f1ed 100%)",
      }}
    >
      {/* ── Header bar ── */}
      <div
        className="flex items-center gap-4 h-16 px-4 shrink-0 border-b border-[#d5c8b8] sticky top-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #fefbf7 0%, #fefbf7 100%), linear-gradient(180deg, #fefbf7 75%, rgba(254,251,247,0) 100%)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="w-9 h-9 flex items-center justify-center rounded-md shrink-0 hover:bg-[var(--color-surface)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
        >
          <PanelRightClose className="w-4 h-4 text-[var(--color-text)]" />
        </button>

        <div className="flex-1 flex items-center bg-[var(--color-surface)] rounded-lg h-9 p-[3px] min-w-0">
          {tabs.map((tab) => {
            const isActive = !showProjectChecklist && activeTab === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => {
                  onShowProjectChecklist(false);
                  onTabChange(tab.toLowerCase());
                }}
                className={`flex-1 flex items-center justify-center px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-[var(--color-text)] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.1)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-text)]/80"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onShowProjectChecklist(!showProjectChecklist)}
          aria-label={showProjectChecklist ? "Show tabs" : "Show checklist"}
          className={`w-9 h-9 flex items-center justify-center rounded-md shrink-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30 ${
            showProjectChecklist
              ? "bg-[rgba(110,4,189,0.1)] border-[0.5px] border-[var(--color-brand)]"
              : "hover:bg-[var(--color-surface)]"
          }`}
        >
          <LayoutList className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="py-4">
          <AnimatePresence initial={false}>
            {(activeView === "details" || activeView === "checklist") && (
              <motion.div
                key="overview-card"
                initial={{ opacity: 0, x: slideFromRight ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideFromRight ? -20 : 20 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="px-6"
              >
                <ProjectOverviewCard project={project} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: slideFromRight ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideFromRight ? -20 : 20 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {activeView === "details" && (
                  <DetailsContent
                    project={project}
                    systemOpen={systemOpen}
                    setSystemOpen={setSystemOpen}
                    financingOpen={financingOpen}
                    setFinancingOpen={setFinancingOpen}
                    pricingOpen={pricingOpen}
                    setPricingOpen={setPricingOpen}
                  />
                )}
                {activeView === "notes" && <NotesContent projectId={project.id} />}
                {activeView === "activity" && <ActivityContent projectId={project.id} />}
                {activeView === "checklist" && <ChecklistContent projectId={project.id} currentStageId={project.stageId} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Fixed compose area (notes only) ── */}
      {activeView === "notes" && (
        <ComposeBar projectId={project.id} newComment={newComment} setNewComment={setNewComment} />
      )}
    </aside>
  );
}
