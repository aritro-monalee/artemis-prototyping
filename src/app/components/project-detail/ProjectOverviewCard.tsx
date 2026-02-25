"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Check,
  ArrowUp,
  SquarePen,
  Trash2,
  Sun,
  SmartphoneCharging,
  Sunrise,
  Home,
} from "lucide-react";
import type { ProjectDetailData } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";
import { Tag } from "../Tag";
import * as Popover from "@radix-ui/react-popover";
import { TAG_LAYOUT_TRANSITION } from "@/app/data/constants";
import { useTagFlow, type TagType } from "@/app/hooks/useTagFlow";
import { GanttChartContent } from "./GanttChartContent";

type ProjectType = "Solar" | "Battery" | "Solar + Battery" | "Home Improvement";

const PROJECT_TYPE_STYLES: Record<ProjectType, { bg: string; border: string; text: string; icon: typeof Sun }> = {
  Solar:              { bg: "bg-yellow-100",    border: "border-yellow-600",  text: "text-yellow-800",  icon: Sun },
  Battery:            { bg: "bg-emerald-100",   border: "border-emerald-600", text: "text-emerald-800", icon: SmartphoneCharging },
  "Solar + Battery":  { bg: "bg-sky-100",       border: "border-sky-600",     text: "text-sky-800",     icon: Sunrise },
  "Home Improvement": { bg: "bg-[var(--color-surface)]",     border: "border-[var(--color-text-secondary)]",   text: "text-[var(--color-text-muted)]",  icon: Home },
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

export function ProjectOverviewCard({ project }: { project: ProjectDetailData }) {
  const { updateProject, getProjectType, setProjectType: storeSetProjectType, presaleStages, postSaleStages, getStageHistory, moveProjectToStage } = useProjectStore();

  const presaleIds = presaleStages.map((s) => s.id);
  const isPresale = presaleIds.includes(project.stageId);
  const phaseStages = isPresale ? presaleStages : postSaleStages;
  const currentIdx = phaseStages.findIndex((s) => s.id === project.stageId);

  const tags = project.tags;
  const setTags = (updater: (prev: typeof tags) => typeof tags) => {
    const next = updater(tags);
    updateProject(project.id, { tags: next });
  };
  const projectType = getProjectType(project.id) as ProjectType;
  const setProjectType = (type: ProjectType) => storeSetProjectType(project.id, type);
  const [projectTypePicker, setProjectTypePicker] = useState(false);
  const salesRep = project.assignee;
  const setSalesRep = (name: string) => { updateProject(project.id, { assignee: name }); };
  const [salesRepPicker, setSalesRepPicker] = useState(false);
  const [ganttOpen, setGanttOpen] = useState(false);
  const pillsInnerRef = useRef<HTMLDivElement>(null);
  const [pillsShift, setPillsShift] = useState(0);

  const tagFlow = useTagFlow({
    projectId: project.id,
    tags,
    setTags,
  });

  const {
    tagStep,
    pendingTagType,
    tagReason,
    setTagReason,
    tagMenuIndex,
    setTagMenuIndex,
    reasonInputRef,
    tagPopoverOpen,
    dismissTagFlow,
    handlePickTag,
    handleSubmitTag,
    handleEditTag,
    handleDeleteTag,
    resetTagFlow,
    openTagPicker,
  } = tagFlow;

  const popoverOpen = tagPopoverOpen || projectTypePicker || salesRepPicker || ganttOpen;

  const dismissAll = () => {
    dismissTagFlow();
    setProjectTypePicker(false);
    setSalesRepPicker(false);
    setGanttOpen(false);
  };

  useEffect(() => {
    const el = pillsInnerRef.current;
    if (!el) return;
    const currentPill = el.querySelector("[data-current='true']") as HTMLElement;
    if (currentPill) {
      setPillsShift(currentPill.offsetLeft === 0 ? 12 : -(currentPill.offsetLeft - 24));
    }
  }, [project.stageId]);

  return (
    <div className="relative bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col items-start w-full">
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
                    className="shrink-0 flex items-center justify-center p-1 rounded-[4px] cursor-pointer hover:opacity-80 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
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
                <span className="text-xs text-[var(--color-text)] leading-none">{project.daysInStage} {project.daysInStage === 1 ? "day" : "days"}</span>
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
                      className="z-50 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] origin-top-right"
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
          <p className="text-sm font-medium text-[var(--color-text)] truncate w-full">
            {project.address}
          </p>
          <p className="text-sm text-[var(--color-text-muted)] truncate w-full">
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
                        className="absolute left-0 top-0 z-30 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg whitespace-nowrap origin-top-left"
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
                          <SquarePen className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <span className="text-xs text-[var(--color-text-muted)]">Edit Tag</span>
                        </button>
                        <button
                          className="flex items-center gap-[10px] px-2 py-1.5 w-full cursor-pointer hover:bg-black/[0.03] transition-colors"
                          onClick={() => handleDeleteTag(index)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <span className="text-xs text-[var(--color-text-muted)]">Delete Tag</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <button
                className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-muted)] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  openTagPicker();
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
              className="absolute top-0 left-3 right-3 z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip origin-top-left"
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
                        className="flex-1 min-w-0 bg-transparent outline-none text-xs text-[var(--color-text-muted)] placeholder:text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap"
                        placeholder="Add a reason (optional)"
                        value={tagReason}
                        onChange={(e) => setTagReason(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSubmitTag();
                          if (e.key === "Escape") resetTagFlow();
                        }}
                      />
                      <button
                        aria-label="Submit tag"
                        className="shrink-0 bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--color-brand-hover)] transition-colors p-[3.333px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
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
              className="absolute top-0 left-3 right-3 z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip origin-top-left"
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
            className="cursor-pointer bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] flex items-center justify-center overflow-clip p-1 rounded-[4px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
            onClick={(e) => { e.stopPropagation(); setSalesRepPicker(true); }}
          >
            <span className="text-xs font-medium text-[var(--color-text)] leading-none">{salesRep}</span>
          </button>
        ) : (
          <div className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] flex items-center justify-center overflow-clip p-1 rounded-[4px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] invisible">
            <span className="text-xs font-medium text-[var(--color-text)] leading-none">{salesRep}</span>
          </div>
        )}
        <div className="flex-1 flex items-center justify-end">
          <div className="p-1 rounded-[4px] flex items-center justify-center overflow-clip">
            <span className="text-xs text-[var(--color-text-muted)] leading-none">{project.date}</span>
          </div>
        </div>
      </div>

      {/* Sales rep popover */}
      <AnimatePresence>
        {salesRepPicker && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-3 right-3 bottom-3 z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
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
                <span className={`text-xs leading-4 ${name === salesRep ? "font-medium text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>{name}</span>
                {name === salesRep && <Check className="w-3 h-3 text-[var(--color-brand)] ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
