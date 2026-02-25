"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Plus, Check, ArrowUp, SquarePen, Trash2 } from "lucide-react";
import type { ProjectCardData, ProjectDetailData } from "@/app/data/projects";
import { getProjectDetail } from "@/app/data/projects";
import { useSortable } from "@dnd-kit/sortable";
import { Tag } from "./Tag";
import { ProjectOverviewCard, DetailsContent } from "./ProjectDetailSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStore } from "@/app/store/ProjectStore";
import { TAG_LAYOUT_TRANSITION } from "@/app/data/constants";
import { useTagFlow, type TagType } from "@/app/hooks/useTagFlow";

interface ProjectCardProps {
  project: ProjectCardData;
  onOpen: (id: string) => void;
  onAddTag?: (
    projectId: string,
    tag: { type: TagType; reason?: string }
  ) => void;
  onEditTag?: (
    projectId: string,
    tagIndex: number,
    tag: { type: TagType; reason?: string }
  ) => void;
  onDeleteTag?: (projectId: string, tagIndex: number) => void;
  isDragOverlay?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  currentStageName?: string;
  currentStageColor?: string;
  disableDrag?: boolean;
  sidebarOpen?: boolean;
  sidebarTab?: string;
  onSidebarTabChange?: (tab: string) => void;
  sidebarChecklist?: boolean;
  onSidebarChecklistChange?: (show: boolean) => void;
  onCloseSidebar?: () => void;
}

export function ProjectCard({
  project,
  onOpen,
  onAddTag,
  onEditTag,
  onDeleteTag,
  isDragOverlay,
  selected,
  onToggleSelect,
  currentStageName,
  currentStageColor,
  disableDrag,
  sidebarOpen,
  sidebarTab,
  onSidebarTabChange,
  sidebarChecklist,
  onSidebarChecklistChange,
  onCloseSidebar,
}: ProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: project.id,
    data: { type: "card", stageId: project.stageId },
    disabled: disableDrag,
  });

  if (isDragOverlay) {
    return (
      <CardContent
        project={project}
        onOpen={onOpen}
        onAddTag={onAddTag}
        onEditTag={onEditTag}
        onDeleteTag={onDeleteTag}
        isDragOverlay
        selected={selected}
        onToggleSelect={onToggleSelect}
        currentStageName={currentStageName}
        currentStageColor={currentStageColor}
        disableDrag={disableDrag}
      />
    );
  }

  const sidebarDetail = sidebarOpen ? getProjectDetail(project.id) : null;
  const cardRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);

  const updatePopoverPos = useCallback(() => {
    if (!cardRef.current || !sidebarOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPopoverPos({ top: rect.top, left: rect.right + 8 });
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) { setPopoverPos(null); return; }
    updatePopoverPos();
    window.addEventListener("scroll", updatePopoverPos, true);
    window.addEventListener("resize", updatePopoverPos);
    return () => {
      window.removeEventListener("scroll", updatePopoverPos, true);
      window.removeEventListener("resize", updatePopoverPos);
    };
  }, [sidebarOpen, updatePopoverPos]);

  return (
    <motion.div
      ref={(node) => {
        setNodeRef(node);
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      initial={false}
      animate={{
        x: transform?.x ?? 0,
        y: transform?.y ?? 0,
        opacity: isDragging ? 0.4 : 1,
      }}
      transition={
        isDragging
          ? { duration: 0 }
          : { type: "spring", stiffness: 350, damping: 25 }
      }
      {...attributes}
      {...listeners}
    >
        <CardContent
          project={project}
          onOpen={onOpen}
          onAddTag={onAddTag}
          onEditTag={onEditTag}
          onDeleteTag={onDeleteTag}
          selected={selected}
          onToggleSelect={onToggleSelect}
          currentStageName={currentStageName}
          currentStageColor={currentStageColor}
          disableDrag={disableDrag}
        />
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {sidebarOpen && sidebarDetail && popoverPos && (
                <SidebarPopoverContent
                  key={project.id}
                  project={sidebarDetail}
                  popoverPos={popoverPos}
                />
              )}
            </AnimatePresence>,
            document.body
          )}
    </motion.div>
  );
}

function SidebarPopoverContent({
  project,
  popoverPos,
}: {
  project: ProjectDetailData;
  popoverPos: { top: number; left: number };
}) {
  const [systemOpen, setSystemOpen] = useState(true);
  const [financingOpen, setFinancingOpen] = useState(true);
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-50 w-[370px] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[12px] overflow-hidden flex flex-col"
      style={{
        top: popoverPos.top,
        left: popoverPos.left,
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
        maxHeight: "calc(100vh - 100px)",
        backgroundImage: "linear-gradient(180deg, #fefbf7 7%, rgba(254,251,247,0) 14%), linear-gradient(90deg, #f4f1ed 0%, #f4f1ed 100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3">
          <ProjectOverviewCard project={project} />
        </div>
        <div className="px-4 pb-4">
          <DetailsContent
            project={project}
            systemOpen={systemOpen}
            setSystemOpen={setSystemOpen}
            financingOpen={financingOpen}
            setFinancingOpen={setFinancingOpen}
            pricingOpen={pricingOpen}
            setPricingOpen={setPricingOpen}
          />
        </div>
      </div>
    </motion.div>
  );
}

function CardContent({
  project,
  onOpen,
  onAddTag,
  onEditTag,
  onDeleteTag,
  isDragOverlay,
  selected: externalSelected,
  onToggleSelect,
  currentStageName,
  currentStageColor,
  disableDrag,
}: {
  project: ProjectCardData;
  onOpen: (id: string) => void;
  onAddTag?: (
    projectId: string,
    tag: { type: TagType; reason?: string }
  ) => void;
  onEditTag?: (
    projectId: string,
    tagIndex: number,
    tag: { type: TagType; reason?: string }
  ) => void;
  onDeleteTag?: (projectId: string, tagIndex: number) => void;
  isDragOverlay?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  currentStageName?: string;
  currentStageColor?: string;
  disableDrag?: boolean;
}) {
  const [localSelected, setLocalSelected] = useState(false);
  const selected = externalSelected ?? localSelected;

  const tagFlow = useTagFlow({
    projectId: project.id,
    tags: project.tags,
    onAddTag,
    onEditTag,
    onDeleteTag,
  });

  const {
    tagStep,
    pendingTagType,
    tagReason,
    setTagReason,
    tagMenuIndex,
    setTagMenuIndex,
    reasonInputRef,
    tagPopoverOpen: popoverOpen,
    dismissTagFlow: dismissAll,
    handlePickTag,
    handleSubmitTag,
    handleEditTag,
    handleDeleteTag,
    resetTagFlow,
    openTagPicker,
  } = tagFlow;

  const tagMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
      <div
        className={`relative h-[168px] flex flex-col bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] group/card ${disableDrag ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
        style={{
          boxShadow: selected
            ? "0 0 0 1px white, 0 0 0 2px #6e04bd, 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)"
            : "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)",
        }}
      >
        {popoverOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              dismissAll();
            }}
          />
        )}

        {/* Header */}
        <div
          className={`shrink-0 flex items-center gap-[5px] px-[12px] py-[8px] bg-[rgba(0,0,0,0.01)] border-b-[0.5px] border-[rgba(0,0,0,0.08)] overflow-clip ${disableDrag ? "" : "cursor-pointer"}`}
          onClick={(e) => {
            if (disableDrag) return;
            e.stopPropagation();
            if (onToggleSelect) {
              onToggleSelect(project.id);
            } else {
              setLocalSelected((v) => !v);
            }
          }}
        >
          {!disableDrag && (
            <div className="shrink-0">
              {selected ? (
                <div className="w-[16px] h-[16px] rounded-[4px] bg-[var(--color-brand)] border-[0.5px] border-[var(--color-brand)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-clip">
                  <Check
                    className="w-[14px] h-[14px] text-white"
                    strokeWidth={3}
                  />
                </div>
              ) : (
                <div className="w-[16px] h-[16px] rounded-[4px] bg-[rgba(110,4,189,0.02)] border-[0.5px] border-[rgba(0,0,0,0.2)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              )}
            </div>
          )}
          <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="flex items-center gap-[4px] leading-none text-sm min-w-0">
              <span className="font-medium text-[var(--color-text)] shrink-0">
                {project.systemSize}
              </span>
              <span className="inline-flex overflow-hidden max-w-0 opacity-0 group-hover/card:max-w-[200px] group-hover/card:opacity-100 transition-[max-width,opacity] duration-200 ease-out font-normal text-[#998d7d] whitespace-nowrap">
                {project.panels} Panels, {project.batteries} Battery
              </span>
            </div>
            <div className="bg-[rgba(0,0,0,0.04)] border-[0.5px] border-[rgba(0,0,0,0.04)] p-[4px] rounded-[6px] shrink-0 flex items-center justify-center overflow-clip">
              <span className="font-normal text-[var(--color-text)] text-xs leading-none">
                {project.daysInStage} Days
              </span>
            </div>
          </div>
        </div>

        {/* Main — flex-1 fills remaining space, justify-between spreads text vertically */}
        <div
          className={`flex-1 flex items-start gap-[10px] p-[12px] min-h-0 ${
            popoverOpen
              ? "cursor-default"
              : "cursor-pointer hover:bg-black/[0.02]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!popoverOpen) onOpen(project.id);
          }}
        >
          <div className="relative w-[36px] h-[36px] shrink-0">
            <div className="w-full h-full rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.04)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-[#d4c9b8] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#c5b89a] to-[#8a7d6b]" />
            </div>
            <div className="absolute -bottom-[2px] -right-[2px] w-[10px] h-[10px] rounded-full bg-[var(--color-brand)] border-[1.5px] border-[var(--color-bg)]" />
          </div>
          <div className="flex-1 flex flex-col justify-between self-stretch min-w-0 leading-none">
            <div className="flex flex-col gap-[6px]">
              <p className="font-normal text-[var(--color-text)] text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {project.address}
              </p>
              <p className="font-normal text-[var(--color-text-muted)] text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {project.ownerName}
              </p>
            </div>
            <div className="flex items-center gap-[12px] text-xs text-[rgba(85,78,70,0.7)] group-hover/card:text-[rgba(85,78,70,0.4)] transition-colors duration-200">
              <span className="shrink-0">{project.assignee}</span>
              <span className="shrink-0">{project.date.replace(`, ${new Date().getFullYear()}`, "")}</span>
              <span className="shrink-0 truncate">{project.department}</span>
            </div>
          </div>
        </div>

        {/* Time-travel: current stage indicator */}
        {currentStageName && (
          <div className="shrink-0 flex items-center gap-[6px] px-[12px] py-[5px] bg-[rgba(240,232,220,0.4)] border-t-[0.5px] border-[rgba(0,0,0,0.08)]">
            <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: currentStageColor ?? "var(--color-text-secondary)" }} />
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              Now in <span className="font-medium text-[var(--color-text)]">{currentStageName}</span>
            </span>
          </div>
        )}

        {/* Footer — CSS grid for smooth height animation */}
        <div className={`relative grid transition-[grid-template-rows] duration-200 ease-out ${
          project.tags.length > 0 || popoverOpen
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr] group-hover/card:grid-rows-[1fr]"
        }`}>
          <div className="overflow-hidden min-h-0">
            <div className="border-t-[0.5px] border-[rgba(0,0,0,0.08)] bg-[rgba(0,0,0,0.02)]">
              <div
                className={`${
                  tagStep
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-[5px] px-[12px] py-[6px] flex-wrap min-h-[36px]">
                  {project.tags.map((tag, index) => (
                    <div key={project.id + tag.type + index} className="relative">
                      {tagMenuIndex !== index ? (
                        <motion.div
                          layoutId={isDragOverlay ? undefined : `${project.id}-tag-${index}`}
                          transition={TAG_LAYOUT_TRANSITION}
                        >
                          <button
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTagMenuIndex(
                                tagMenuIndex === index ? null : index
                              );
                            }}
                          >
                            <Tag type={tag.type} reason={tag.reason} />
                          </button>
                        </motion.div>
                      ) : (
                        <div style={{ visibility: "hidden" }}>
                          <Tag type={tag.type} reason={tag.reason} />
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
                    {project.tags.length === 0 && (
                      <span className="font-medium text-xs leading-none">Add a tag</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tag menu — outside overflow-hidden, renders upward */}
          <AnimatePresence>
            {tagMenuIndex !== null && project.tags[tagMenuIndex] && (
              <motion.div
                ref={tagMenuRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="absolute left-[12px] right-[12px] -top-[8px] z-30 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] whitespace-nowrap origin-bottom-left"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full px-[12px] py-[6px] border-b-[0.5px] border-[#d5c8b8] cursor-pointer flex items-start"
                  onClick={() => setTagMenuIndex(null)}
                >
                  <motion.div
                    layoutId={isDragOverlay ? undefined : `${project.id}-tag-${tagMenuIndex}`}
                    transition={TAG_LAYOUT_TRANSITION}
                  >
                    <Tag type={project.tags[tagMenuIndex].type} reason={project.tags[tagMenuIndex].reason} />
                  </motion.div>
                </button>
                <button
                  className="flex items-center gap-[10px] px-[8px] py-[6px] w-full cursor-pointer hover:bg-black/[0.03] transition-colors border-b-[0.5px] border-[#d5c8b8]"
                  onClick={() => handleEditTag(tagMenuIndex)}
                >
                  <SquarePen className="w-[14px] h-[14px] text-[var(--color-text-muted)] shrink-0" />
                  <span
                    className="font-normal text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ fontSize: "12px", lineHeight: "16px" }}
                  >
                    Edit Tag
                  </span>
                </button>
                <button
                  className="flex items-center gap-[10px] px-[8px] py-[6px] w-full cursor-pointer hover:bg-black/[0.03] transition-colors"
                  onClick={() => handleDeleteTag(tagMenuIndex)}
                >
                  <Trash2 className="w-[14px] h-[14px] text-[var(--color-text-muted)] shrink-0" />
                  <span
                    className="font-normal text-[var(--color-text-muted)] overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ fontSize: "12px", lineHeight: "16px" }}
                  >
                    Delete Tag
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tag picker — outside overflow-hidden, renders upward */}
          <AnimatePresence>
            {tagStep && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute -top-[8px] left-[12px] right-[12px] z-20 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
                style={{
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
                }}
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
                      {(["On Hold", "Lost", "Change Order"] as const).map(
                        (type, i, arr) => (
                          <button
                            key={type}
                            className={`flex items-center gap-[10px] p-[8px] w-full overflow-clip cursor-pointer hover:bg-black/[0.03] transition-colors ${
                              i < arr.length - 1
                                ? "border-b-[0.5px] border-[#d5c8b8]"
                                : ""
                            }`}
                            onClick={() => handlePickTag(type)}
                          >
                            <motion.div
                              layoutId={isDragOverlay ? undefined : `${project.id}-picker-${type}`}
                              transition={TAG_LAYOUT_TRANSITION}
                            >
                              <Tag type={type} />
                            </motion.div>
                          </button>
                        )
                      )}
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
                        layoutId={isDragOverlay ? undefined : `${project.id}-picker-${pendingTagType}`}
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
                          className="shrink-0 bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-[82.5px] flex items-center justify-center cursor-pointer hover:bg-[var(--color-brand-hover)] transition-colors"
                          style={{
                            padding: "3.333px",
                            boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
                          }}
                          onClick={handleSubmitTag}
                        >
                          <ArrowUp
                            className="text-white"
                            style={{ width: "13.333px", height: "13.333px" }}
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
}
