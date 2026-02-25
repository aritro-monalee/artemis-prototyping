"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PanelRightClose,
  LayoutList,
  ChevronDown,
  ChevronRight,
  Plus,
  Sun,
  Search,
  ListFilter,
  Ellipsis,
  Reply,
  Check,
  ArrowUp,
  SquarePen,
  Trash2,
  SmartphoneCharging,
  Sunrise,
  Home,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProjectDetailData, PipelineStage } from "@/app/data/projects";
import { NOTE_SOURCE_META } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";

import { MLToolTip } from "@/app/lib/monalee-ui/components/MLToolTip";
import { Tag } from "./Tag";
import * as Popover from "@radix-ui/react-popover";

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
      className="w-[370px] shrink-0 border-l border-[#d7cfc5] flex flex-col h-full overflow-hidden"
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
        {/* Left: close button (ghost) */}
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-md shrink-0 hover:bg-[#f4f1ed] transition-colors"
        >
          <PanelRightClose className="w-4 h-4 text-[#554e46]" />
        </button>

        {/* Center: pill-style tabs */}
        <div className="flex-1 flex items-center bg-[#f4f1ed] rounded-lg h-9 p-[3px] min-w-0">
          {tabs.map((tab) => {
            const isActive = !showProjectChecklist && activeTab === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => {
                  onShowProjectChecklist(false);
                  onTabChange(tab.toLowerCase());
                }}
                className={`flex-1 flex items-center justify-center px-2 py-1 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-[#554e46] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.1)]"
                    : "text-[#554e46] hover:text-[#554e46]/80"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right: checklist toggle (LayoutList) */}
        <button
          onClick={() => onShowProjectChecklist(!showProjectChecklist)}
          className={`w-9 h-9 flex items-center justify-center rounded-md shrink-0 transition-colors ${
            showProjectChecklist
              ? "bg-[rgba(110,4,189,0.1)] border-[0.5px] border-[#6e04bd]"
              : "hover:bg-[#f4f1ed]"
          }`}
        >
          <LayoutList className="w-4 h-4 text-[#554e46]" />
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

          {/* ── Tab content (animated L→R) ── */}
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

/* ──────────────────────────────────────────────────────────────────────────────
   Project Overview Card — shared across all tabs
   ────────────────────────────────────────────────────────────────────────────── */

type TagType = "On Hold" | "Lost" | "Change Order";
type ProjectType = "Solar" | "Battery" | "Solar + Battery" | "Home Improvement";
const TAG_LAYOUT_TRANSITION = { layout: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const } };

const PROJECT_TYPE_STYLES: Record<ProjectType, { bg: string; border: string; text: string; icon: typeof Sun }> = {
  Solar:              { bg: "bg-yellow-100",    border: "border-yellow-600",  text: "text-yellow-800",  icon: Sun },
  Battery:            { bg: "bg-emerald-100",   border: "border-emerald-600", text: "text-emerald-800", icon: SmartphoneCharging },
  "Solar + Battery":  { bg: "bg-sky-100",       border: "border-sky-600",     text: "text-sky-800",     icon: Sunrise },
  "Home Improvement": { bg: "bg-[#f4f1ed]",     border: "border-[#ac9b85]",   text: "text-[#7b6f60]",  icon: Home },
};

function ProjectTypeTag({ type }: { type: ProjectType }) {
  const style = PROJECT_TYPE_STYLES[type];
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] overflow-clip border text-xs font-medium leading-none ${style.bg} ${style.border} ${style.text}`}>
      <Icon className="w-3 h-3 shrink-0" />
      <span>{type}</span>
    </span>
  );
}

function ComposeBar({ projectId, newComment, setNewComment }: { projectId: string; newComment: string; setNewComment: (v: string) => void }) {
  const { updateProjectNotes } = useProjectStore();
  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
    updateProjectNotes(projectId, (prev) => [
      ...prev,
      { id: Date.now(), name: "You", time, textParts: [{ text }], thread: [] },
    ]);
    setNewComment("");
  };
  return (
    <div className="shrink-0 px-3 pb-3 pt-9 relative" style={{ background: "linear-gradient(to bottom, rgba(254,251,247,0) 0%, #fefbf7 64%)" }}>
      <div className="bg-white border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-md p-2 min-h-[60px] flex items-end gap-2.5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.2),0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <textarea
          className="flex-1 text-xs text-[#554e46] leading-4 bg-transparent outline-none resize-none placeholder:text-[#7b6f60] min-h-[40px]"
          placeholder="Add a new comment"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitComment();
            }
          }}
        />
        <button
          onClick={submitComment}
          className="bg-[#6e04bd] border-[0.5px] border-[rgba(255,255,255,0.2)] rounded-full p-1 flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

export function ProjectOverviewCard({ project }: { project: ProjectDetailData }) {
  const { updateProject, getProjectType, setProjectType: storeSetProjectType, presaleStages, postSaleStages, getStageHistory, moveProjectToStage } = useProjectStore();

  const presaleIds = presaleStages.map((s) => s.id);
  const isPresale = presaleIds.includes(project.stageId);
  const phaseStages = isPresale ? presaleStages : postSaleStages;
  const currentIdx = phaseStages.findIndex((s) => s.id === project.stageId);

  const tags = project.tags;
  const setTags = (updater: React.SetStateAction<typeof tags>) => {
    const next = typeof updater === "function" ? updater(tags) : updater;
    updateProject(project.id, { tags: next });
  };
  const projectType = getProjectType(project.id) as ProjectType;
  const setProjectType = (type: ProjectType) => storeSetProjectType(project.id, type);
  const [projectTypePicker, setProjectTypePicker] = useState(false);
  const salesRep = project.assignee;
  const setSalesRep = (name: string) => { updateProject(project.id, { assignee: name }); };
  const [salesRepPicker, setSalesRepPicker] = useState(false);
  const [ganttOpen, setGanttOpen] = useState(false);
  const [tagStep, setTagStep] = useState<null | "picking" | "reasoning">(null);
  const [pendingTagType, setPendingTagType] = useState<TagType | null>(null);
  const [tagReason, setTagReason] = useState("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [tagMenuIndex, setTagMenuIndex] = useState<number | null>(null);
  const reasonInputRef = useRef<HTMLInputElement>(null);
  const pillsInnerRef = useRef<HTMLDivElement>(null);
  const [pillsShift, setPillsShift] = useState(0);

  const popoverOpen = tagStep !== null || tagMenuIndex !== null || projectTypePicker || salesRepPicker || ganttOpen;

  useEffect(() => {
    if (tagStep === "reasoning" && reasonInputRef.current) {
      reasonInputRef.current.focus();
    }
  }, [tagStep]);

  useEffect(() => {
    const el = pillsInnerRef.current;
    if (!el) return;
    const currentPill = el.querySelector("[data-current='true']") as HTMLElement;
    if (currentPill) {
      setPillsShift(currentPill.offsetLeft === 0 ? 12 : -(currentPill.offsetLeft - 24));
    }
  }, [project.stageId]);

  const dismissAll = () => {
    setTagStep(null);
    setPendingTagType(null);
    setTagReason("");
    setEditingTagIndex(null);
    setTagMenuIndex(null);
    setProjectTypePicker(false);
    setSalesRepPicker(false);
    setGanttOpen(false);
  };

  const handlePickTag = (type: TagType) => {
    setPendingTagType(type);
    setTagStep("reasoning");
    if (editingTagIndex === null) setTagReason("");
  };

  const handleSubmitTag = () => {
    if (!pendingTagType) return;
    const tagData = { type: pendingTagType, reason: tagReason.trim() || undefined };
    if (editingTagIndex !== null) {
      setTags((prev) => prev.map((t, i) => (i === editingTagIndex ? tagData : t)));
    } else {
      setTags((prev) => [...prev, tagData]);
    }
    dismissAll();
  };

  const handleEditTag = (index: number) => {
    const tag = tags[index];
    setTagMenuIndex(null);
    setEditingTagIndex(index);
    setPendingTagType(tag.type as TagType);
    setTagReason(tag.reason || "");
    setTagStep("picking");
  };

  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
    setTagMenuIndex(null);
  };

  const resetTagFlow = () => {
    setTagStep(null);
    setPendingTagType(null);
    setTagReason("");
    setEditingTagIndex(null);
  };

  return (
    <div className="relative bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col items-start w-full">
      {popoverOpen && (
        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); dismissAll(); }} />
      )}

      {/* Stage pills + Project type badge */}
      <div className="relative w-full">
        <div className="flex items-center justify-between w-full px-3 pt-3 pb-1.5" style={{ boxShadow: "0px 1px 0px 0px rgba(0,0,0,0.05)" }}>
          <div className="min-w-0 flex-1 overflow-hidden -ml-3">
            <motion.div
              ref={pillsInnerRef}
              className="flex items-center gap-1 w-max"
              animate={{ x: pillsShift }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {phaseStages.map((stage, idx) => {
                const isCurrent = stage.id === project.stageId;
                const dist = Math.abs(idx - currentIdx);
                const visible = dist <= 1;
                return (
                  <motion.button
                    key={stage.id}
                    data-current={isCurrent}
                    animate={{
                      backgroundColor: isCurrent ? "#998d7d" : "rgba(153,141,125,0.2)",
                      borderColor: isCurrent ? "rgba(0,0,0,0.16)" : "rgba(0,0,0,0.04)",
                      opacity: visible ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="shrink-0 flex items-center justify-center p-1 rounded-[4px] cursor-pointer hover:opacity-80 outline-none"
                    style={{
                      borderWidth: "0.6px",
                      borderStyle: "solid",
                      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
                      pointerEvents: visible ? "auto" : "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCurrent) {
                        moveProjectToStage(project.id, stage.id, stage.title);
                      }
                    }}
                  >
                    <motion.span
                      className="font-medium whitespace-nowrap"
                      animate={{ color: isCurrent ? "#ffffff" : "rgba(0,0,0,0.2)" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ fontSize: "10px", lineHeight: "normal" }}
                    >
                      {stage.title}
                    </motion.span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
          <Popover.Root open={ganttOpen} onOpenChange={setGanttOpen}>
            <Popover.Trigger asChild>
              <button className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)] p-1 rounded-[4px] shrink-0 flex items-center justify-center overflow-clip ml-2 cursor-pointer hover:bg-[rgba(0,0,0,0.08)] transition-colors">
                <span className="text-xs text-[#554e46] leading-none">{project.daysInStage} {project.daysInStage === 1 ? "day" : "days"}</span>
              </button>
            </Popover.Trigger>
            <AnimatePresence>
              {ganttOpen && (
                <Popover.Portal forceMount>
                  <Popover.Content
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    collisionPadding={16}
                    asChild
                    onPointerDownOutside={() => setGanttOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                      className="z-50 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] origin-top-right"
                    >
                      <GanttChartContent
                        projectId={project.id}
                        isPresale={isPresale}
                        phaseStages={phaseStages}
                        currentStageId={project.stageId}
                      />
                    </motion.div>
                  </Popover.Content>
                </Popover.Portal>
              )}
            </AnimatePresence>
          </Popover.Root>
        </div>

      </div>

      {/* Address + Owner */}
      <div className="flex items-start w-full pt-3 pb-1.5 px-3">
        <div className="flex-1 flex flex-col h-9 justify-between min-w-0">
          <p className="text-sm font-medium text-[#554e46] truncate w-full">
            {project.address}
          </p>
          <p className="text-sm text-[#7b6f60] truncate w-full">
            {project.ownerName}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="relative w-full">
        <div className={`transition-opacity duration-150 ${tagStep ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="flex items-center justify-between px-3 py-1.5">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              {tags.map((tag, index) => (
                <div key={`${tag.type}-${index}`} className="relative">
                  {tagMenuIndex !== index ? (
                    <motion.div layoutId={`sidebar-tag-${index}`} transition={TAG_LAYOUT_TRANSITION}>
                      <button
                        className="cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setTagMenuIndex(tagMenuIndex === index ? null : index); }}
                      >
                        <Tag type={tag.type as TagType} reason={tag.reason} />
                      </button>
                    </motion.div>
                  ) : (
                    <div style={{ visibility: "hidden" }}>
                      <Tag type={tag.type as TagType} reason={tag.reason} />
                    </div>
                  )}

                  <AnimatePresence>
                    {tagMenuIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="absolute left-0 top-0 z-30 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg whitespace-nowrap"
                        style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="w-full p-2 border-b-[0.5px] border-[#d5c8b8] cursor-pointer flex items-start"
                          onClick={() => setTagMenuIndex(null)}
                        >
                          <motion.div layoutId={`sidebar-tag-${index}`} transition={TAG_LAYOUT_TRANSITION}>
                            <Tag type={tag.type as TagType} reason={tag.reason} />
                          </motion.div>
                        </button>
                        <button
                          className="flex items-center gap-[10px] px-2 py-1.5 w-full cursor-pointer hover:bg-black/[0.03] transition-colors border-b-[0.5px] border-[#d5c8b8]"
                          onClick={() => handleEditTag(index)}
                        >
                          <SquarePen className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
                          <span className="text-xs text-[#7b6f60]">Edit Tag</span>
                        </button>
                        <button
                          className="flex items-center gap-[10px] px-2 py-1.5 w-full cursor-pointer hover:bg-black/[0.03] transition-colors"
                          onClick={() => handleDeleteTag(index)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
                          <span className="text-xs text-[#7b6f60]">Delete Tag</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <button
                className="flex items-center gap-1 text-[#ac9b85] hover:text-[#7b6f60] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setTagMenuIndex(null);
                  setEditingTagIndex(null);
                  setTagStep("picking");
                }}
              >
                <Plus className="w-4 h-4" />
                {tags.length === 0 && <span className="text-xs font-medium leading-none">Add a tag</span>}
              </button>
            </div>
            <div className="shrink-0 ml-2">
              {!projectTypePicker ? (
                <motion.div layoutId="sidebar-project-type" transition={TAG_LAYOUT_TRANSITION}>
                  <button className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setProjectTypePicker(true); }}>
                    <ProjectTypeTag type={projectType} />
                  </button>
                </motion.div>
              ) : (
                <div style={{ visibility: "hidden" }}>
                  <ProjectTypeTag type={projectType} />
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {tagStep && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-0 left-3 right-3 z-20 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
              style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {tagStep === "picking" ? (
                  <motion.div
                    key="picking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {(["On Hold", "Lost", "Change Order"] as const).map((type, i, arr) => (
                      <button
                        key={type}
                        className={`flex items-center gap-[10px] p-2 w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
                          i < arr.length - 1 ? "border-b-[0.5px] border-[#d5c8b8]" : ""
                        }`}
                        onClick={() => handlePickTag(type)}
                      >
                        <motion.div layoutId={`sidebar-picker-${type}`} transition={TAG_LAYOUT_TRANSITION}>
                          <Tag type={type} />
                        </motion.div>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="reasoning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="flex items-center gap-[10px] p-2"
                  >
                    <motion.div
                      className="shrink-0"
                      layoutId={`sidebar-picker-${pendingTagType}`}
                      transition={TAG_LAYOUT_TRANSITION}
                    >
                      <Tag type={pendingTagType!} />
                    </motion.div>
                    <div className="flex-1 flex items-center gap-1 min-w-0 overflow-clip">
                      <input
                        ref={reasonInputRef}
                        className="flex-1 min-w-0 bg-transparent outline-none text-xs text-[#7b6f60] placeholder:text-[#7b6f60] overflow-hidden text-ellipsis whitespace-nowrap"
                        placeholder="Add a reason (optional)"
                        value={tagReason}
                        onChange={(e) => setTagReason(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSubmitTag();
                          if (e.key === "Escape") resetTagFlow();
                        }}
                      />
                      <button
                        className="shrink-0 bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#5c03a0] transition-colors p-[3.333px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                        onClick={handleSubmitTag}
                      >
                        <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {projectTypePicker && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-0 left-3 right-3 z-20 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
              style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pr-2 pt-0.5 text-right">
                <span className="text-[10px] font-medium text-[#998d7d] uppercase" style={{ letterSpacing: "0.1em" }}>Project Type</span>
              </div>
              {(["Solar", "Battery", "Solar + Battery", "Home Improvement"] as const).map((type, i, arr) => (
                <button
                  key={type}
                  className={`flex items-center justify-end gap-[10px] p-2 w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
                    i < arr.length - 1 ? "border-b-[0.5px] border-[#d5c8b8]" : ""
                  }`}
                  onClick={() => {
                    setProjectType(type);
                    setProjectTypePicker(false);
                  }}
                >
                  {type === projectType ? (
                    <motion.div layoutId="sidebar-project-type" transition={TAG_LAYOUT_TRANSITION}>
                      <ProjectTypeTag type={type} />
                    </motion.div>
                  ) : (
                    <ProjectTypeTag type={type} />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer: assignee (picker) + date */}
      <div className="flex items-center gap-[5px] overflow-clip w-full px-3 py-2 bg-[rgba(0,0,0,0.04)] border-t-[0.5px] border-[rgba(0,0,0,0.08)] rounded-b-lg">
        {!salesRepPicker ? (
          <button
            className="cursor-pointer bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] flex items-center justify-center overflow-clip p-1 rounded-[4px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] outline-none"
            onClick={(e) => { e.stopPropagation(); setSalesRepPicker(true); }}
          >
            <span className="text-xs font-medium text-[#554e46] leading-none">{salesRep}</span>
          </button>
        ) : (
          <div className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] flex items-center justify-center overflow-clip p-1 rounded-[4px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] invisible">
            <span className="text-xs font-medium text-[#554e46] leading-none">{salesRep}</span>
          </div>
        )}
        <div className="flex-1 flex items-center justify-end">
          <div className="p-1 rounded-[4px] flex items-center justify-center overflow-clip">
            <span className="text-xs text-[#7b6f60] leading-none">{project.date}</span>
          </div>
        </div>
      </div>

      {/* Sales rep popover — positioned relative to card root */}
      <AnimatePresence>
        {salesRepPicker && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-3 right-3 bottom-3 z-20 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
            style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pl-2 pt-0.5">
              <span className="text-[10px] font-medium text-[#998d7d] uppercase" style={{ letterSpacing: "0.1em" }}>Sales Rep</span>
            </div>
            {["Aritro Paul", "Hudolf E.", "Nina Wong", "Marcus Chen"].map((name, i, arr) => (
              <button
                key={name}
                className={`flex items-center gap-[10px] p-2 w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
                  i < arr.length - 1 ? "border-b-[0.5px] border-[#d5c8b8]" : ""
                }`}
                onClick={() => { setSalesRep(name); setSalesRepPicker(false); }}
              >
                <span className={`text-xs leading-4 ${name === salesRep ? "font-medium text-[#554e46]" : "text-[#7b6f60]"}`}>{name}</span>
                {name === salesRep && <Check className="w-3 h-3 text-[#6e04bd] ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden p-1 rounded shrink-0">
      <span className="text-xs text-[#554e46] leading-none">{children}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Gantt Chart Popover Content
   ────────────────────────────────────────────────────────────────────────────── */

const LABEL_COL = 110;
const TIMELINE_PAD = 12;
const LINE_LEFT = LABEL_COL + TIMELINE_PAD + 6;

function formatShortDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function GanttChartContent({
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
                idx % 2 === 0 ? "bg-[#f4f1ed]" : "bg-white"
              }`}
            >
              <span className="text-xs font-medium text-[#554e46] w-[110px] shrink-0 leading-4 whitespace-nowrap truncate">
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

/* ──────────────────────────────────────────────────────────────────────────────
   Details Tab
   ────────────────────────────────────────────────────────────────────────────── */

export function DetailsContent({
  project,
  systemOpen,
  setSystemOpen,
  financingOpen,
  setFinancingOpen,
  pricingOpen,
  setPricingOpen,
}: {
  project: ProjectDetailData;
  systemOpen: boolean;
  setSystemOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  financingOpen: boolean;
  setFinancingOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  pricingOpen: boolean;
  setPricingOpen: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  const { customFields, customFieldValues } = useProjectStore();
  const [customDataOpen, setCustomDataOpen] = useState(false);

  const projectCustomValues = customFieldValues[project.id] ?? {};
  const hasCustomFields = customFields.length > 0;

  return (
    <div className="flex flex-col">
      <Accordion title="System" open={systemOpen} onToggle={() => setSystemOpen((v) => !v)}>
        <Row label="Panels" value={`${project.panelModel} x ${project.panelCount}`} />
        <Row label="Inverters" value={`${project.inverterModel} x ${project.inverterCount}`} />
        <Row label="Batteries" value={`${project.batteryModel} x ${project.batteryCount}`} />
        <Row label="Adders & Discounts" value={`${project.addersTotal} Total`} />
      </Accordion>

      <Accordion
        title="Financing"
        badge={`$${project.financingTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        open={financingOpen}
        onToggle={() => setFinancingOpen((v) => !v)}
      >
        <Row label="Total Loan" value={`$${project.totalLoan.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} />
        <Row label="Term" value={project.term} />
        <Row label="Lender" value="{{lender.name}}" />
        <Row label="Net Price per Square" value={`$${project.netPricePerSquare.toFixed(2)}`} />
      </Accordion>

      <Accordion
        title="Pricing"
        badge={`$${project.pricePerSquare.toFixed(2)} per Square`}
        open={pricingOpen}
        onToggle={() => setPricingOpen((v) => !v)}
      />

      {hasCustomFields && (() => {
        const populated = customFields.filter((f) => {
          const raw = projectCustomValues[f.id];
          return raw !== undefined && raw !== "";
        });
        if (populated.length === 0) return null;
        return (
          <Accordion
            title="Custom Data"
            open={customDataOpen}
            onToggle={() => setCustomDataOpen((v) => !v)}
          >
            {populated.map((field) => {
              const raw = projectCustomValues[field.id] ?? "";
              const display = field.type === "checkbox"
                ? (raw === "true" ? "Yes" : "No")
                : raw;
              return <Row key={field.id} label={field.label} value={display} />;
            })}
          </Accordion>
        );
      })()}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Notes Tab
   ────────────────────────────────────────────────────────────────────────────── */

function NotesContent({ projectId }: { projectId: string }) {
  const { getProjectNotes, updateProjectNotes } = useProjectStore();
  const notes = getProjectNotes(projectId);
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const toggleExpand = (id: number) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReplySubmit = (noteId: number) => {
    const text = replyTexts[noteId]?.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
    updateProjectNotes(projectId, (prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, thread: [...n.thread, { name: "You", time, text }] }
          : n
      )
    );
    setReplyTexts((prev) => ({ ...prev, [noteId]: "" }));
    if (!expandedNotes.has(noteId)) {
      setExpandedNotes((prev) => new Set(prev).add(noteId));
    }
  };

  return (
    <div className="flex flex-col">
      {/* Search + filter */}
      <div className="flex items-center gap-1.5 pb-2">
        <div className="flex-1 flex items-center gap-1.5 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
          <Search className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]" placeholder="Search comments" />
        </div>
        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-[4px] shrink-0 hover:bg-[#f4f1ed] transition-colors">
          <ListFilter className="w-4 h-4 text-[#554e46]" />
        </button>
      </div>

      {/* Notes feed */}
      {notes.map((note) => {
        const hasReplies = note.thread.length > 0;
        const isExpanded = expandedNotes.has(note.id);

        return (
          <div key={note.id} className="relative flex flex-col items-start border-b-[0.5px] border-[#d7cfc5] pb-4 pt-2">
            {/* Header: avatar, name, body */}
            <div className="flex flex-col gap-2 items-start pb-3 pt-2 w-full">
              <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />
              <div className="flex items-center w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[#554e46] leading-none">{note.name}</span>
                  {note.external && (() => {
                    const meta = NOTE_SOURCE_META[note.external.source];
                    return (
                      <span
                        className={`inline-flex items-center rounded-[4px] border px-1 py-0.5 text-[10px] font-medium leading-none shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ${meta.bg} ${meta.border} ${meta.text}`}
                      >
                        {note.external.source}
                      </span>
                    );
                  })()}
                </div>
              </div>
              <p className="text-[14px] leading-[20px] text-[#554e46] w-full whitespace-pre-wrap">
                {note.textParts.map((part, i) =>
                  part.mention ? (
                    <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </p>
              {/* Time + menu — absolute top-right */}
              <div className="absolute right-[16px] top-[10px] flex items-center gap-2">
                <span className="text-[10px] text-[#ac9b85] leading-none">{note.time}</span>
                <button className="block cursor-pointer w-[13px] h-[13px]">
                  <Ellipsis className="w-[13px] h-[13px] text-[#ac9b85]" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center gap-2 py-1 w-full overflow-hidden"
                >
                  {hasReplies ? (
                    <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => toggleExpand(note.id)}>
                      <Reply className="w-4 h-4 text-[#6e04bd]" />
                      <span className="text-xs text-[#6e04bd] leading-4">
                        {note.thread.length} {note.thread.length === 1 ? "reply" : "replies"}
                      </span>
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => setReplyingTo(replyingTo === note.id ? null : note.id)}>
                      <Reply className="w-4 h-4 text-[#6e04bd]" />
                      <span className="text-xs text-[#6e04bd] leading-4">Reply</span>
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col w-full overflow-hidden"
                >
                  {/* Thread replies */}
                  {hasReplies && (
                    <div className="flex items-start gap-2 pl-2 w-full">
                      <div className="w-0 self-stretch border-l border-[#d7cfc5] shrink-0" />
                      <div className="flex-1 flex flex-col gap-2 py-2 min-w-0">
                        {note.thread.map((reply, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            className="flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between leading-none w-full">
                              <span className="text-xs font-medium text-[#554e46]">{reply.name}</span>
                              <span className="text-[10px] text-[#ac9b85]">{reply.time}</span>
                            </div>
                            <p className="text-xs text-[#554e46] leading-4 w-full whitespace-pre-wrap">{reply.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply input */}
                  <div className="w-full">
                    <div className="flex items-center gap-1 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
                      <input
                        type="text"
                        className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]"
                        placeholder={`Reply to ${note.name.split(" ")[0]}`}
                        value={replyTexts[note.id] || ""}
                        onChange={(e) => setReplyTexts((prev) => ({ ...prev, [note.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") handleReplySubmit(note.id); }}
                      />
                      <button
                        onClick={() => handleReplySubmit(note.id)}
                        className="bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
                      >
                        <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Hide Replies */}
                  {hasReplies && (
                    <div className="flex items-center justify-end pl-2 py-1 w-full">
                      <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => toggleExpand(note.id)}>
                        <ChevronUp className="w-4 h-4 text-[#7b6f60]" />
                        <span className="text-xs text-[#7b6f60] leading-4">Hide Replies</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reply input — only visible after clicking Reply on notes without threads */}
            <AnimatePresence>
              {!hasReplies && !isExpanded && replyingTo === note.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex items-center gap-1 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <input
                      type="text"
                      className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]"
                      placeholder={`Reply to ${note.name.split(" ")[0]}`}
                      value={replyTexts[note.id] || ""}
                      onChange={(e) => setReplyTexts((prev) => ({ ...prev, [note.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") handleReplySubmit(note.id); }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleReplySubmit(note.id)}
                      className="bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
                    >
                      <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Activity Tab
   ────────────────────────────────────────────────────────────────────────────── */

function ActivityContent({ projectId }: { projectId: string }) {
  const { getActivities } = useProjectStore();
  const activities = getActivities(projectId);
  return (
    <div className="flex flex-col gap-0 h-full items-start w-full">
      {/* Search + filter */}
      <div className="flex gap-1 items-start pb-4 w-full">
        <div className="flex-1 flex items-center gap-1.5 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
          <Search className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]" placeholder="Search activity" />
        </div>
        <button className="w-[30px] h-[30px] flex items-center justify-center rounded-[4px] p-1 shrink-0 hover:bg-[#f4f1ed] transition-colors">
          <ListFilter className="w-4 h-4 text-[#554e46]" />
        </button>
      </div>

      {/* Activity feed */}
      <div className="flex flex-col w-full">
        {activities.map((a) => (
          <div key={a.id} className="flex gap-3 items-start border-b-[0.5px] border-[#d5c8b8] py-3 overflow-hidden w-full">
            {/* Avatar */}
            <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {/* Name + time + menu */}
              <div className="flex gap-1 items-center w-full">
                <div className="flex-1 flex items-center min-w-0">
                  <span className="text-xs font-medium text-[#554e46] leading-none">{a.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#ac9b85] leading-none">{a.time}</span>
                  <button className="block cursor-pointer overflow-hidden w-[13.333px] h-[13.333px]">
                    <Ellipsis className="w-[13.333px] h-[13.333px] text-[#ac9b85]" />
                  </button>
                </div>
              </div>

              {/* Activity lines */}
              {a.lines.map((line, i) => (
                <div key={i} className="flex gap-1 items-center w-full">
                  <span className="text-sm leading-5 text-[#7b6f60]">{line.text}</span>
                  {line.ids && (
                    <div className="flex gap-1 items-center">
                      {line.ids.map((id, j) => (
                        <span key={j} className="text-xs text-[#ac9b85] leading-4 underline decoration-dotted decoration-[#554e46]">{id}</span>
                      ))}
                    </div>
                  )}
                  {line.extra && (
                    <span className="text-sm leading-5 text-[#7b6f60]">{line.extra}</span>
                  )}
                </div>
              ))}

              {/* Comment quote block */}
              {a.quote && (
                <div className="bg-[rgba(0,0,0,0.02)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
                  <p className="text-xs text-[#554e46] leading-4 whitespace-pre-wrap">
                    <span>{a.quote.text}</span>
                    {a.quote.mention && (
                      <span className="text-[#6e04bd]">{a.quote.mention.text}</span>
                    )}
                    <span className="text-[#7b6f60]"> ?</span>
                  </p>
                </div>
              )}

              {/* Autosave label */}
              {a.autosave && (
                <span className="text-xs text-[#ac9b85] leading-none">Autosave</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Checklist Tab
   ────────────────────────────────────────────────────────────────────────────── */

function ChecklistContent({ projectId, currentStageId }: { projectId: string; currentStageId: string }) {
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
      <p className="text-sm font-medium leading-5 text-[#554e46] pt-5 pb-2">Project Checklist</p>
      <p className="text-[10px] font-medium text-[#7b6f60] uppercase tracking-wider pt-2 pb-1">{phaseLabel}</p>

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
                  <p className="text-xs font-medium text-[#7b6f60] leading-4">{section.title}</p>
                  {isCurrent && (
                    <span className="text-[10px] font-medium text-[#6e04bd] bg-[#6e04bd]/10 px-1.5 py-0.5 rounded-full leading-none">
                      Current
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-[#7b6f60]" />
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
                                  ? "bg-[#6e04bd] border border-[#6e04bd]"
                                  : "bg-white border border-[#e3e0dd]"
                              } shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]`}
                            >
                              <AnimatePresence>
                                {item.done && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  >
                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                            <div className="flex flex-col gap-1 items-start">
                              <span className={`text-sm font-medium leading-none text-left ${item.done ? "text-[#7b6f60] line-through" : "text-[#554e46]"}`}>
                                {item.label}
                              </span>
                              {isNext && !item.done && item.statusText && (
                                <span className="text-xs font-normal text-[#998d7d] leading-4 text-left">
                                  {item.statusText}
                                </span>
                              )}
                              {item.optional && (
                                <span className="text-xs font-normal text-[#7b6f60] leading-4">Optional</span>
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
                                    className="px-2.5 py-1.5 text-xs font-medium text-white bg-[#6e04bd] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#5c03a0] transition-colors cursor-pointer"
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

      {/* View toggle */}
      <button
        onClick={handleViewToggle}
        className="flex items-center justify-between py-2 w-full cursor-pointer bg-[#f4f1ed] -mx-6 px-6"
        style={{ width: "calc(100% + 48px)" }}
      >
        <p className="text-xs font-medium text-[#7b6f60] leading-4">
          {expandedAll ? "View only current stage" : `View all ${phaseLabel.toLowerCase()} (${allPhaseItemCount})`}
        </p>
        <motion.div
          animate={{ rotate: expandedAll ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-[#7b6f60]" />
        </motion.div>
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   Shared: Accordion + Row
   ────────────────────────────────────────────────────────────────────────────── */

function Accordion({
  title,
  badge,
  open,
  onToggle,
  children,
}: {
  title: string;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#d7cfc5]">
      <button onClick={onToggle} className="w-full flex items-center gap-1 py-4 cursor-pointer">
        <span className="text-sm font-medium text-[#554e46]">{title}</span>
        {badge && (
          <div className="flex-1 flex items-start">
            <span className="inline-flex items-center justify-center px-2 py-[2px] rounded-md border border-[#d7cfc5] bg-[#fefbf7] text-xs font-semibold text-[#554e46] leading-4">
              {badge}
            </span>
          </div>
        )}
        {!badge && <div className="flex-1" />}
        <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4 text-[#998d7d]" />
        </div>
      </button>
      {open && children && (
        <div className="flex flex-col gap-2 pb-4">{children}</div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-xs font-medium text-[#7b6f60] leading-none">{label}</span>
      <span className="text-sm font-semibold text-[#554e46] leading-5">{value}</span>
    </div>
  );
}
