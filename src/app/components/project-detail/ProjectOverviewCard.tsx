"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Check,
  ArrowUp,
  SquarePen,
  Trash2,
  Sun,
  SmartphoneCharging,
  Home,
  AppWindow,
  Snowflake,
  Droplets,
} from "lucide-react";
import { SolarBatteryIcon } from "../icons/SolarBatteryIcon";
import { RoofingIcon } from "../icons/RoofingIcon";
import type { ProjectDetailData } from "@/app/data/projects";
import type { HomeImprovementSubtype } from "@/app/data/types";
import { useProjectStore } from "@/app/store/ProjectStore";
import { Tag } from "../Tag";
import * as Popover from "@radix-ui/react-popover";
import { TAG_LAYOUT_TRANSITION } from "@/app/data/constants";
import { useTagFlow, type TagType } from "@/app/hooks/useTagFlow";
import { GanttChartContent } from "./GanttChartContent";
import { MLDialog } from "@/app/lib/monalee-ui/components/MLDialog/MLDialog";

type ProjectType = "Solar" | "Battery" | "Solar + Battery" | "Home Improvement" | "Roofing";

const PROJECT_TYPE_STYLES: Record<ProjectType, { bg: string; border: string; text: string; icon: typeof Sun | typeof SolarBatteryIcon | typeof RoofingIcon }> = {
  Solar:              { bg: "bg-yellow-100",    border: "border-yellow-600",  text: "text-yellow-800",  icon: Sun },
  Battery:            { bg: "bg-emerald-100",   border: "border-emerald-600", text: "text-emerald-800", icon: SmartphoneCharging },
  "Solar + Battery":  { bg: "bg-sky-100",       border: "border-sky-600",     text: "text-sky-800",     icon: SolarBatteryIcon },
  "Home Improvement": { bg: "bg-[var(--color-surface)]",     border: "border-[var(--color-text-secondary)]",   text: "text-[var(--color-text-muted)]",  icon: Home },
  Roofing:            { bg: "bg-orange-100",    border: "border-orange-600",  text: "text-orange-800",  icon: RoofingIcon },
};

const HI_SUBTYPES: { type: HomeImprovementSubtype; icon: typeof Home }[] = [
  { type: "Window", icon: AppWindow },
  { type: "HVAC", icon: Snowflake },
  { type: "Insulation", icon: Home },
  { type: "Water Heater", icon: Droplets },
];

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

const PROJECT_TYPES = ["Solar", "Battery", "Solar + Battery", "Home Improvement", "Roofing"] as const;

function ProjectTypePickerPopover({
  projectType,
  hiSubtype,
  triggerRect,
  onSelectType,
  onSelectSubtype,
}: {
  projectType: ProjectType;
  hiSubtype: HomeImprovementSubtype | undefined;
  triggerRect: DOMRect;
  onSelectType: (type: ProjectType) => void;
  onSelectSubtype: (sub: HomeImprovementSubtype) => void;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: triggerRect.left, top: triggerRect.top });

  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;
    const activeBtn = el.querySelector("[data-active='true']") as HTMLElement;
    if (activeBtn) {
      setPos({ left: triggerRect.left, top: triggerRect.top - activeBtn.offsetTop });
    }
  }, [triggerRect]);

  return createPortal(
    <motion.div
      ref={popoverRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed z-[9999] bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
      style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)", minWidth: "180px", left: pos.left, top: pos.top }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pl-2 pt-0.5">
        <span className="text-[10px] font-medium text-[#998d7d] uppercase" style={{ letterSpacing: "0.1em" }}>Project Type</span>
      </div>
      {PROJECT_TYPES.map((type, i, arr) => (
        <div key={type}>
          <button
            data-active={type === projectType}
            className={`flex items-center gap-[10px] p-2 w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
              i < arr.length - 1 && !(type === "Home Improvement" && projectType === "Home Improvement") ? "border-b-[0.5px] border-[#d5c8b8]" : ""
            }`}
            onClick={() => onSelectType(type)}
          >
            {type === projectType ? (
              <motion.div layoutId="sidebar-project-type" transition={TAG_LAYOUT_TRANSITION}>
                <ProjectTypeTag type={type} />
              </motion.div>
            ) : (
              <ProjectTypeTag type={type} />
            )}
          </button>
          {type === "Home Improvement" && projectType === "Home Improvement" && (
            <div className={`pl-4 pb-1 ${i < arr.length - 1 ? "border-b-[0.5px] border-[#d5c8b8]" : ""}`}>
              {HI_SUBTYPES.map((sub) => {
                const SubIcon = sub.icon;
                const isActive = hiSubtype === sub.type;
                return (
                  <button
                    key={sub.type}
                    className={`flex items-center gap-2 px-2 py-1.5 w-full rounded-md text-xs cursor-pointer transition-colors ${
                      isActive ? "bg-black/[0.05] font-semibold text-[var(--color-text)]" : "text-[#998d7d] hover:bg-black/[0.03]"
                    }`}
                    onClick={() => onSelectSubtype(sub.type)}
                  >
                    <SubIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span>{sub.type}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </motion.div>,
    document.body
  );
}

export function ProjectOverviewCard({ project, hideFooter }: { project: ProjectDetailData; hideFooter?: boolean }) {
  const { updateProject, getProjectType, setProjectType: storeSetProjectType, getHomeImprovementType, setHomeImprovementType, getHomeImprovementQty, getRoofingShingleType, getRoofingSquares, presaleStages, postSaleStages, moveProjectToStage, getIncompleteChecklistItems, allStages, tagDefs } = useProjectStore();

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
  const hiSubtype = getHomeImprovementType(project.id);
  const setProjectType = (type: ProjectType) => storeSetProjectType(project.id, type);
  const [projectTypePicker, setProjectTypePicker] = useState(false);
  const projectTypeTagRef = useRef<HTMLDivElement>(null);
  const salesRep = project.assignee;
  const setSalesRep = (name: string) => { updateProject(project.id, { assignee: name }); };
  const [salesRepPicker, setSalesRepPicker] = useState(false);
  const [ganttOpen, setGanttOpen] = useState(false);
  const pillsInnerRef = useRef<HTMLDivElement>(null);
  const [pillsShift, setPillsShift] = useState(0);
  const [pendingStageMove, setPendingStageMove] = useState<{ stageId: string; title: string } | null>(null);
  const [incompleteItems, setIncompleteItems] = useState<string[]>([]);

  const currentStageName = allStages.find((s) => s.id === project.stageId)?.title ?? project.status;

  const handleStageClick = useCallback(
    (stageId: string, stageTitle: string) => {
      const incomplete = getIncompleteChecklistItems(project.id, project.stageId);
      if (incomplete.length > 0) {
        setIncompleteItems(incomplete);
        setPendingStageMove({ stageId, title: stageTitle });
      } else {
        moveProjectToStage(project.id, stageId, stageTitle);
      }
    },
    [project.id, project.stageId, getIncompleteChecklistItems, moveProjectToStage]
  );

  const confirmStageMove = useCallback(() => {
    if (pendingStageMove) {
      moveProjectToStage(project.id, pendingStageMove.stageId, pendingStageMove.title);
      setPendingStageMove(null);
      setIncompleteItems([]);
    }
  }, [pendingStageMove, project.id, moveProjectToStage]);

  const cancelStageMove = useCallback(() => {
    setPendingStageMove(null);
    setIncompleteItems([]);
  }, []);

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
    <div className="relative bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] flex flex-col w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] group/card">
      {popoverOpen && (
        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); dismissAll(); }} />
      )}

      {/* Header — stage pills + days badge (mirrors ProjectCard header row) */}
      <div className="shrink-0 flex items-center gap-[5px] px-[12px] py-[8px] bg-[rgba(0,0,0,0.01)] border-b-[0.5px] border-[rgba(0,0,0,0.08)] overflow-clip">
        <div className="min-w-0 flex-1 overflow-hidden -ml-[12px]">
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
                      handleStageClick(stage.id, stage.title);
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
            <button className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)] p-[4px] rounded-[6px] shrink-0 flex items-center justify-center overflow-clip cursor-pointer hover:bg-[rgba(0,0,0,0.08)] transition-colors">
              <span className="font-normal text-[var(--color-text)] text-xs leading-none">{project.daysInStage} {project.daysInStage === 1 ? "Day" : "Days"}</span>
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

      {/* Body — address/owner + meta */}
      {!hideFooter && <div className="flex-1 flex items-start px-[12px] py-[6px] min-h-0">
        <div className="flex-1 flex flex-col justify-between self-stretch min-w-0 leading-none gap-[6px]">
          <div className="flex flex-col gap-[6px]">
            <p className="font-medium text-[var(--color-text)] text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {project.address}
            </p>
            <p className="font-normal text-[var(--color-text-muted)] text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {project.ownerName}
            </p>
          </div>
          <div className="flex items-center gap-[8px] mt-[6px]">
            <div className="relative shrink-0" ref={projectTypeTagRef}>
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
              <AnimatePresence>
                {projectTypePicker && projectTypeTagRef.current && (
                  <ProjectTypePickerPopover
                    projectType={projectType}
                    hiSubtype={hiSubtype}
                    triggerRect={projectTypeTagRef.current.getBoundingClientRect()}
                    onSelectType={(type) => {
                      setProjectType(type);
                      if (type !== "Home Improvement") {
                        setHomeImprovementType(project.id, undefined);
                        setProjectTypePicker(false);
                      }
                    }}
                    onSelectSubtype={(sub) => {
                      setHomeImprovementType(project.id, sub);
                      setProjectTypePicker(false);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-[4px] text-xs leading-none whitespace-nowrap overflow-hidden min-w-0">
              {projectType === "Home Improvement" ? (
                <>
                  <span className="font-medium text-[var(--color-text)] truncate">{hiSubtype ?? "Home Improvement"}</span>
                  {(() => { const hiQty = getHomeImprovementQty(project.id); return hiQty != null ? (
                    <span className="font-normal text-[#998d7d] shrink-0">{hiQty} {hiQty === 1 ? "Unit" : "Units"}</span>
                  ) : null; })()}
                </>
              ) : projectType === "Roofing" ? (
                <>
                  <span className="font-medium text-[var(--color-text)] truncate">{getRoofingShingleType(project.id) ?? "Roofing"}</span>
                  {(() => { const roofSq = getRoofingSquares(project.id); return roofSq != null ? (
                    <span className="font-normal text-[#998d7d] shrink-0">{roofSq} Sq</span>
                  ) : null; })()}
                </>
              ) : (
                <>
                  <span className="font-medium text-[var(--color-text)] shrink-0">{project.systemSize}</span>
                  <span className="font-normal text-[#998d7d] truncate">
                    {project.panels > 0 && `${project.panels} Panels`}
                    {project.panels > 0 && project.batteries > 0 && ", "}
                    {project.batteries > 0 && `${project.batteries} Battery`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[8px] mt-[6px]">
            <div className="relative shrink-0">
              {!salesRepPicker ? (
                <button
                  className="cursor-pointer bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-[4px] p-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-clip hover:bg-[rgba(0,0,0,0.06)] transition-colors"
                  onClick={(e) => { e.stopPropagation(); setSalesRepPicker(true); }}
                >
                  <span className="font-medium text-xs leading-none text-[var(--color-text)] whitespace-nowrap">{salesRep}</span>
                </button>
              ) : (
                <div className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-[4px] p-[4px] invisible">
                  <span className="font-medium text-xs leading-none whitespace-nowrap">{salesRep}</span>
                </div>
              )}
              <AnimatePresence>
                {salesRepPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-0 z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-lg overflow-clip"
                    style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)", minWidth: "160px" }}
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
            <div className="flex flex-1 items-center justify-end min-w-0">
              <div className="rounded-[4px] p-[4px] flex items-center justify-center overflow-clip">
                <span className="font-normal text-xs leading-none text-[var(--color-text-muted)] whitespace-nowrap">{project.date.replace(`, ${new Date().getFullYear()}`, "")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {/* Footer — tags (mirrors ProjectCard footer) */}
      {!hideFooter && <><div className="relative">
        <div className={`transition-opacity duration-150 ${tagStep ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="border-t-[0.5px] border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-[5px] px-[12px] py-[6px] flex-wrap min-h-[36px]">
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
                </div>
              ))}
              <button
                className="flex items-center gap-[2px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-muted)] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  openTagPicker();
                }}
              >
                <Plus className="w-[16px] h-[16px]" />
                {tags.length === 0 && <span className="font-medium text-xs leading-none">Add a tag</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Tag menu — renders upward */}
        <AnimatePresence>
          {tagMenuIndex !== null && tags[tagMenuIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute left-[12px] right-[12px] -top-[8px] z-30 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] whitespace-nowrap origin-bottom-left"
              style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-full px-[12px] py-[6px] border-b-[0.5px] border-[#d5c8b8] cursor-pointer flex items-start"
                onClick={() => setTagMenuIndex(null)}
              >
                <motion.div layoutId={`sidebar-tag-${tagMenuIndex}`} transition={TAG_LAYOUT_TRANSITION}>
                  <Tag type={tags[tagMenuIndex].type as TagType} reason={tags[tagMenuIndex].reason} />
                </motion.div>
              </button>
              <button
                className="flex items-center gap-[10px] px-[8px] py-[6px] w-full cursor-pointer hover:bg-black/[0.03] transition-colors border-b-[0.5px] border-[#d5c8b8]"
                onClick={() => handleEditTag(tagMenuIndex)}
              >
                <SquarePen className="w-[14px] h-[14px] text-[var(--color-text-muted)] shrink-0" />
                <span className="font-normal text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: "12px", lineHeight: "16px" }}>
                  Edit Tag
                </span>
              </button>
              <button
                className="flex items-center gap-[10px] px-[8px] py-[6px] w-full cursor-pointer hover:bg-black/[0.03] transition-colors"
                onClick={() => handleDeleteTag(tagMenuIndex)}
              >
                <Trash2 className="w-[14px] h-[14px] text-[var(--color-text-muted)] shrink-0" />
                <span className="font-normal text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: "12px", lineHeight: "16px" }}>
                  Delete Tag
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tag picker — renders upward */}
        <AnimatePresence>
          {tagStep && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute -top-[8px] left-[12px] right-[12px] z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
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
                    {tagDefs.map((def, i) => (
                      <button
                        key={def.id}
                        className={`flex items-center gap-[10px] p-[8px] w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
                          i < tagDefs.length - 1 ? "border-b-[0.5px] border-[#d5c8b8]" : ""
                        }`}
                        onClick={() => handlePickTag(def.name)}
                      >
                        <motion.div layoutId={`sidebar-picker-${def.name}`} transition={TAG_LAYOUT_TRANSITION}>
                          <Tag type={def.name} />
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
                    className="flex items-center gap-[10px] p-[8px]"
                  >
                    <motion.div
                      className="shrink-0"
                      layoutId={`sidebar-picker-${pendingTagType}`}
                      transition={TAG_LAYOUT_TRANSITION}
                    >
                      <Tag type={pendingTagType!} />
                    </motion.div>
                    <div className="flex-1 flex items-center gap-[4px] min-w-0 overflow-clip">
                      <input
                        ref={reasonInputRef}
                        className="flex-1 min-w-0 bg-transparent outline-none font-normal text-[var(--color-text-muted)] placeholder:text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ fontSize: "12px", lineHeight: 1 }}
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
                        className="shrink-0 bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-[82.5px] flex items-center justify-center cursor-pointer hover:bg-[var(--color-brand-hover)] transition-colors"
                        style={{ padding: "3.333px", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                        onClick={handleSubmitTag}
                      >
                        <ArrowUp className="text-white" style={{ width: "13.333px", height: "13.333px" }} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      </>}

      <MLDialog
        open={!!pendingStageMove}
        onOpenChange={(open) => { if (!open) cancelStageMove(); }}
        title="Incomplete Checklist Items"
        description={`There are ${incompleteItems.length} items remaining in the "${currentStageName}" stage. Are you sure you want to move this project?`}
        confirmText="Move Anyway"
        cancelText="Cancel"
        onConfirm={confirmStageMove}
        onCancel={cancelStageMove}
        size="sm"
      >
        <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
          {incompleteItems.map((label) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              {label}
            </li>
          ))}
        </ul>
      </MLDialog>

    </div>
  );
}
