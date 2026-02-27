"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ListFilter, MoreHorizontal } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { PipelineStage, ProjectCardData } from "@/app/data/projects";

interface PipelineColumnProps {
  stage: PipelineStage;
  projects: ProjectCardData[];
  onOpenProject: (id: string) => void;
  onAddTag?: (projectId: string, tag: { type: string; reason?: string }) => void;
  onEditTag?: (projectId: string, tagIndex: number, tag: { type: string; reason?: string }) => void;
  onDeleteTag?: (projectId: string, tagIndex: number) => void;
  onEditStage?: (stageId: string) => void;
  selectedCards?: Set<string>;
  onToggleCardSelect?: (id: string) => void;
  currentStageLabels?: Record<string, { name: string; color: string }>;
  disableDrag?: boolean;
  sidebarProjectId?: string | null;
  sidebarTab?: string;
  onSidebarTabChange?: (tab: string) => void;
  sidebarChecklist?: boolean;
  onSidebarChecklistChange?: (show: boolean) => void;
  onCloseSidebar?: () => void;
}

export function PipelineColumn({ stage, projects, onOpenProject, onAddTag, onEditTag, onDeleteTag, onEditStage, selectedCards, onToggleCardSelect, currentStageLabels, disableDrag, sidebarProjectId, sidebarTab, onSidebarTabChange, sidebarChecklist, onSidebarChecklistChange, onCloseSidebar }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: { type: "column" },
  });

  const projectIds = projects.map((p) => p.id);

  return (
    <div
      ref={setNodeRef}
      className={`shrink-0 w-[360px] flex flex-col bg-[var(--color-surface)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg p-4 transition-colors ${
        isOver ? "bg-[#efe9e1]" : ""
      }`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-[6px] h-[6px] rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          <span className="text-xs font-medium text-[var(--color-text)]">
            {stage.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Filter" className="text-[#998d7d] hover:text-[var(--color-text)] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
            <ListFilter className="w-4 h-4" />
          </button>
          <button
            aria-label="More options"
            className="text-[#998d7d] hover:text-[var(--color-text)] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
            onClick={() => onEditStage?.(stage.id)}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards area - scrollable */}
      <SortableContext items={projectIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 overflow-y-auto flex flex-col gap-[8px] min-h-[60px] p-[4px] -m-[4px] [scrollbar-width:none]">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
              onAddTag={onAddTag}
              onEditTag={onEditTag}
              onDeleteTag={onDeleteTag}
              selected={selectedCards?.has(project.id)}
              onToggleSelect={onToggleCardSelect}
              currentStageName={currentStageLabels?.[project.id]?.name}
              currentStageColor={currentStageLabels?.[project.id]?.color}
              disableDrag={disableDrag}
              sidebarOpen={sidebarProjectId === project.id}
              sidebarTab={sidebarTab}
              onSidebarTabChange={onSidebarTabChange}
              sidebarChecklist={sidebarChecklist}
              onSidebarChecklistChange={onSidebarChecklistChange}
              onCloseSidebar={onCloseSidebar}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
