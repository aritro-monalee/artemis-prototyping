"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { MLButton } from "@/app/lib/monalee-ui/components/MLButton";
import { MLInput } from "@/app/lib/monalee-ui/components/MLInput";
import { MLTab } from "@/app/lib/monalee-ui/components/MLTab";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  Clock,
  X,
  Link2,
  Check,
  Plus,
} from "lucide-react";
import { PipelineColumn } from "./PipelineColumn";
import { ProjectCard } from "./ProjectCard";
import { ListView } from "./ListView";
import { filterProjects, getStageAtDate } from "@/app/data/projects";
import type { ProjectCardData, ProjectFilters, CustomField } from "@/app/data/projects";
import { useProjectStore, type SavedView } from "@/app/store/ProjectStore";
import { MLDialog } from "@/app/lib/monalee-ui/components/MLDialog/MLDialog";

export { listColumns, listColumnLabels } from "./ListView";
export type { ColumnDef } from "./ListView";

interface ProjectsViewProps {
  onToggleFilters: () => void;
  hiddenColumns: string[];
  onHideColumn: (id: string) => void;
  filters: ProjectFilters;
  onClearDateFilters?: () => void;
  onViewTabChange?: (tab: string) => void;
  onEditStage?: (stageId: string) => void;
  onEditListView?: () => void;
  columnOrder: string[];
  onColumnOrderChange: (order: string[]) => void;
  columnLabels: Record<string, string>;
  listDensity: "compact" | "default" | "comfortable";
  showRowNumbers: boolean;
  customFields: CustomField[];
  customFieldValues: Record<string, Record<string, string>>;
  onUpdateCustomFieldValue: (projectId: string, fieldId: string, value: string) => void;
  savedViews?: SavedView[];
  activeViewId?: string | null;
  onApplyView?: (viewId: string) => void;
  onDeleteView?: (viewId: string) => void;
  onResetToDefault?: () => void;
  onShareView?: (view: SavedView) => void;
  initialTab?: "list" | "pipeline";
  sharedViewLabel?: string | null;
  sharedViewName?: string | null;
  onReapplySharedView?: () => void;
}

export function ProjectsView({
  onToggleFilters,
  hiddenColumns,
  onHideColumn,
  filters,
  onClearDateFilters,
  onViewTabChange,
  onEditStage,
  onEditListView,
  columnOrder,
  onColumnOrderChange,
  columnLabels,
  listDensity,
  showRowNumbers,
  customFields,
  customFieldValues,
  onUpdateCustomFieldValue,
  savedViews = [],
  activeViewId = null,
  onApplyView,
  onDeleteView,
  onResetToDefault,
  onShareView,
  initialTab,
  sharedViewLabel = null,
  sharedViewName = null,
  onReapplySharedView,
}: ProjectsViewProps) {
  const [activeTab, setActiveTab] = useState<"list" | "pipeline">(initialTab ?? "pipeline");
  const [copiedViewId, setCopiedViewId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
      onViewTabChange?.(initialTab);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab]);

  const handleViewTabChange = (tab: string) => {
    setActiveTab(tab as "list" | "pipeline");
    onViewTabChange?.(tab);
  };

  const activeViewName = activeViewId
    ? savedViews.find((v) => v.id === activeViewId)?.name ?? null
    : sharedViewLabel;

  const showViewsBar = activeTab === "list" && (savedViews.length > 0 || !!onReapplySharedView);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { projects, setProjects, presaleStages, postSaleStages, allStages, moveProjectToStage, stageHistoryMap, getIncompleteChecklistItems } = useProjectStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeStageTab, setActiveStageTab] = useState("presale");
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const isTimeTravel = !!(filters.startDate || filters.endDate);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: isTimeTravel ? Infinity : 5 } })
  );

  const [pendingMove, setPendingMove] = useState<{
    moves: { projectId: string; fromStageId: string; fromStageName: string; toStageId: string; toStageName: string }[];
    incompleteItems: string[];
    fromStageName: string;
  } | null>(null);
  const dragOriginRef = useRef<{ projectId: string; stageId: string } | null>(null);

  const confirmPendingMove = useCallback(() => {
    if (!pendingMove) return;
    for (const m of pendingMove.moves) {
      moveProjectToStage(m.projectId, m.toStageId, m.toStageName);
    }
    setPendingMove(null);
  }, [pendingMove, moveProjectToStage]);

  const cancelPendingMove = useCallback(() => {
    setPendingMove(null);
  }, []);

  const toggleCardSelect = useCallback((id: string) => {
    setSelectedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectedIds = activeTab === "pipeline" ? selectedCards : selectedRows;
  const selectedCount = selectedIds.size;

  const stageOrder = useMemo(() => allStages.map((s) => s.id), [allStages]);

  const canMoveForward = useMemo(() => {
    if (selectedIds.size === 0) return false;
    return [...selectedIds].some((id) => {
      const p = projects.find((pr) => pr.id === id);
      if (!p) return false;
      return stageOrder.indexOf(p.stageId) < stageOrder.length - 1;
    });
  }, [selectedIds, projects, stageOrder]);

  const canMoveBack = useMemo(() => {
    if (selectedIds.size === 0) return false;
    return [...selectedIds].some((id) => {
      const p = projects.find((pr) => pr.id === id);
      if (!p) return false;
      return stageOrder.indexOf(p.stageId) > 0;
    });
  }, [selectedIds, projects, stageOrder]);

  const handleMoveForward = useCallback(() => {
    if (!canMoveForward) return;
    const movesToMake: { projectId: string; fromStageId: string; fromStageName: string; toStageId: string; toStageName: string }[] = [];
    const allIncomplete: string[] = [];
    let fromStageName = "";
    for (const id of selectedIds) {
      const p = projects.find((pr) => pr.id === id);
      if (!p) continue;
      const idx = stageOrder.indexOf(p.stageId);
      if (idx < stageOrder.length - 1) {
        const newStageId = stageOrder[idx + 1];
        const stage = allStages.find((s) => s.id === newStageId);
        const currentStage = allStages.find((s) => s.id === p.stageId);
        const incomplete = getIncompleteChecklistItems(id, p.stageId);
        if (incomplete.length > 0) {
          allIncomplete.push(...incomplete);
          fromStageName = currentStage?.title ?? p.status;
        }
        movesToMake.push({ projectId: id, fromStageId: p.stageId, fromStageName: currentStage?.title ?? p.status, toStageId: newStageId, toStageName: stage?.title ?? p.status });
      }
    }
    if (allIncomplete.length > 0) {
      setPendingMove({ moves: movesToMake, incompleteItems: [...new Set(allIncomplete)], fromStageName });
    } else {
      for (const m of movesToMake) moveProjectToStage(m.projectId, m.toStageId, m.toStageName);
    }
  }, [selectedIds, canMoveForward, stageOrder, allStages, projects, moveProjectToStage, getIncompleteChecklistItems]);

  const handleMoveBack = useCallback(() => {
    if (!canMoveBack) return;
    const movesToMake: { projectId: string; fromStageId: string; fromStageName: string; toStageId: string; toStageName: string }[] = [];
    const allIncomplete: string[] = [];
    let fromStageName = "";
    for (const id of selectedIds) {
      const p = projects.find((pr) => pr.id === id);
      if (!p) continue;
      const idx = stageOrder.indexOf(p.stageId);
      if (idx > 0) {
        const newStageId = stageOrder[idx - 1];
        const stage = allStages.find((s) => s.id === newStageId);
        const currentStage = allStages.find((s) => s.id === p.stageId);
        const incomplete = getIncompleteChecklistItems(id, p.stageId);
        if (incomplete.length > 0) {
          allIncomplete.push(...incomplete);
          fromStageName = currentStage?.title ?? p.status;
        }
        movesToMake.push({ projectId: id, fromStageId: p.stageId, fromStageName: currentStage?.title ?? p.status, toStageId: newStageId, toStageName: stage?.title ?? p.status });
      }
    }
    if (allIncomplete.length > 0) {
      setPendingMove({ moves: movesToMake, incompleteItems: [...new Set(allIncomplete)], fromStageName });
    } else {
      for (const m of movesToMake) moveProjectToStage(m.projectId, m.toStageId, m.toStageName);
    }
  }, [selectedIds, canMoveBack, stageOrder, allStages, projects, moveProjectToStage, getIncompleteChecklistItems]);

  const handleReview = useCallback(() => {
    const firstId = [...selectedIds][0];
    if (firstId) router.push(`/project/${firstId}`);
  }, [selectedIds, router]);

  useEffect(() => {
    if (selectedCount === 0) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "f" || e.key === "F") { handleMoveForward(); }
      if (e.key === "b" || e.key === "B") { handleMoveBack(); }
      if (e.key === "r" || e.key === "R") { handleReview(); }
      if (e.key === "Escape") { setSelectedCards(new Set()); setSelectedRows(new Set()); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedCount, handleMoveForward, handleMoveBack, handleReview]);

  const globallyFiltered = useMemo(
    () => filterProjects(projects, filters, stageHistoryMap),
    [projects, filters, stageHistoryMap]
  );

  const snapshotDate = filters.endDate || filters.startDate;
  const stageOverrideMap = useMemo(() => {
    if (!snapshotDate || !stageHistoryMap) return null;
    const map: Record<string, string> = {};
    for (const p of globallyFiltered) {
      const history = stageHistoryMap[p.id];
      if (history) {
        const stageAtDate = getStageAtDate(history, new Date(snapshotDate));
        if (stageAtDate) map[p.id] = stageAtDate;
      }
    }
    return map;
  }, [globallyFiltered, snapshotDate, stageHistoryMap]);

  const effectiveStageId = useCallback(
    (p: ProjectCardData) => stageOverrideMap?.[p.id] ?? p.stageId,
    [stageOverrideMap]
  );

  const currentStageLabels = useMemo(() => {
    if (!stageOverrideMap) return undefined;
    const stageInfo: Record<string, { title: string; color: string }> = {};
    for (const s of allStages) stageInfo[s.id] = { title: s.title, color: s.color };
    const labels: Record<string, { name: string; color: string }> = {};
    for (const p of globallyFiltered) {
      const historicalStageId = stageOverrideMap[p.id];
      if (historicalStageId && historicalStageId !== p.stageId) {
        const info = stageInfo[p.stageId];
        labels[p.id] = { name: info?.title ?? p.stageId, color: info?.color ?? "var(--color-text-secondary)" };
      }
    }
    return Object.keys(labels).length > 0 ? labels : undefined;
  }, [stageOverrideMap, globallyFiltered, allStages]);

  const filteredListProjects = useMemo(() => {
    const globally = filterProjects(projects, filters, stageHistoryMap);
    if (activeStageTab === "all") return globally;
    if (activeStageTab === "presale")
      return globally.filter((p) => presaleStages.some((s) => s.id === effectiveStageId(p)));
    if (activeStageTab === "post-sale")
      return globally.filter((p) => postSaleStages.some((s) => s.id === effectiveStageId(p)));
    return globally;
  }, [projects, filters, activeStageTab, stageHistoryMap, effectiveStageId]);

  const filteredProjects = useMemo(() => {
    if (activeStageTab === "all") return globallyFiltered;
    if (activeStageTab === "presale") return globallyFiltered.filter((p) => presaleStages.some((s) => s.id === effectiveStageId(p)));
    if (activeStageTab === "post-sale") return globallyFiltered.filter((p) => postSaleStages.some((s) => s.id === effectiveStageId(p)));
    return [];
  }, [activeStageTab, globallyFiltered, effectiveStageId]);

  const projectsByStage = useMemo(() => {
    const map: Record<string, ProjectCardData[]> = {};
    for (const stage of allStages) {
      map[stage.id] = [];
    }
    for (const p of projects) {
      const sid = effectiveStageId(p);
      if (map[sid]) {
        map[sid].push(p);
      }
    }
    return map;
  }, [projects, effectiveStageId]);

  const filteredProjectsByStage = useMemo(() => {
    if (!searchValue.trim()) return projectsByStage;
    const q = searchValue.toLowerCase();
    const filtered: Record<string, ProjectCardData[]> = {};
    for (const [stageId, stageProjects] of Object.entries(projectsByStage)) {
      filtered[stageId] = stageProjects.filter(
        (p) =>
          p.ownerName.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.systemSize.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [projectsByStage, searchValue]);

  const filteredStages = useMemo(() => {
    if (!searchValue.trim()) return allStages;
    return allStages.filter(
      (s) => filteredProjectsByStage[s.id]?.length > 0
    );
  }, [filteredProjectsByStage, searchValue]);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) || null,
    [projects, activeId]
  );

  const findStageForProject = useCallback(
    (projectId: string): string | undefined => {
      for (const [stageId, stageProjects] of Object.entries(projectsByStage)) {
        if (stageProjects.some((p) => p.id === projectId)) {
          return stageId;
        }
      }
      return undefined;
    },
    [projectsByStage]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const projectId = event.active.id as string;
    const stageId = findStageForProject(projectId);
    dragOriginRef.current = stageId ? { projectId, stageId } : null;
    setActiveId(projectId);
  }, [findStageForProject]);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeProjectId = active.id as string;
      const overId = over.id as string;

      const activeStageId = findStageForProject(activeProjectId);
      if (!activeStageId) return;

      let overStageId: string | undefined;
      if (allStages.some((s) => s.id === overId)) {
        overStageId = overId;
      } else {
        overStageId = findStageForProject(overId);
      }

      if (!overStageId || activeStageId === overStageId) return;

      const targetStage = allStages.find((s) => s.id === overStageId);
      moveProjectToStage(activeProjectId, overStageId, targetStage?.title ?? "");
    },
    [findStageForProject, allStages, moveProjectToStage]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      const origin = dragOriginRef.current;
      dragOriginRef.current = null;

      if (!over) {
        if (origin) {
          const originStage = allStages.find((s) => s.id === origin.stageId);
          moveProjectToStage(origin.projectId, origin.stageId, originStage?.title ?? "");
        }
        return;
      }

      const activeProjectId = active.id as string;
      const overId = over.id as string;

      if (activeProjectId === overId) return;

      const activeStageId = findStageForProject(activeProjectId);
      if (!activeStageId) return;

      if (origin && activeStageId !== origin.stageId) {
        const incomplete = getIncompleteChecklistItems(origin.projectId, origin.stageId);
        if (incomplete.length > 0) {
          const originStage = allStages.find((s) => s.id === origin.stageId);
          const targetStage = allStages.find((s) => s.id === activeStageId);
          moveProjectToStage(origin.projectId, origin.stageId, originStage?.title ?? "");
          setPendingMove({
            moves: [{ projectId: origin.projectId, fromStageId: origin.stageId, fromStageName: originStage?.title ?? "", toStageId: activeStageId, toStageName: targetStage?.title ?? "" }],
            incompleteItems: incomplete,
            fromStageName: originStage?.title ?? "",
          });
          return;
        }
      }

      const overStageId = findStageForProject(overId);
      if (overStageId && activeStageId === overStageId) {
        const stageProjects = projectsByStage[activeStageId];
        const oldIndex = stageProjects.findIndex(
          (p) => p.id === activeProjectId
        );
        const newIndex = stageProjects.findIndex((p) => p.id === overId);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reordered = arrayMove(stageProjects, oldIndex, newIndex);
          setProjects((prev) => {
            const others = prev.filter((p) => p.stageId !== activeStageId);
            return [...others, ...reordered];
          });
        }
      }
    },
    [findStageForProject, projectsByStage, allStages, moveProjectToStage, getIncompleteChecklistItems]
  );

  const handleAddTag = useCallback(
    (
      projectId: string,
      tag: { type: "On Hold" | "Lost" | "Change Order"; reason?: string }
    ) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tags: [...p.tags, tag] }
            : p
        )
      );
    },
    []
  );

  const handleEditTag = useCallback(
    (
      projectId: string,
      tagIndex: number,
      tag: { type: "On Hold" | "Lost" | "Change Order"; reason?: string }
    ) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tags: p.tags.map((t, i) => (i === tagIndex ? tag : t)) }
            : p
        )
      );
    },
    []
  );

  const handleDeleteTag = useCallback(
    (projectId: string, tagIndex: number) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, tags: p.tags.filter((_, i) => i !== tagIndex) }
            : p
        )
      );
    },
    []
  );

  const [sidebarProjectId, setSidebarProjectId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState("details");
  const [sidebarChecklist, setSidebarChecklist] = useState(false);

  useEffect(() => {
    if (!sidebarProjectId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarProjectId(null);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-sidebar-popover]") && !target.closest("[data-open-sidebar]")) {
        setSidebarProjectId(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarProjectId]);

  const handleOpenProject = (id: string) => {
    setSidebarProjectId((prev) => (prev === id ? null : id));
    setSidebarTab("details");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Page header */}
      <div className="px-6 pt-6 flex-shrink-0">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[var(--color-text)] leading-7 text-balance">
                Projects
              </h1>
              {activeTab === "list" && activeViewName && (
                <>
                  <span className="text-xl text-[#d5c8b8] font-light leading-7">/</span>
                  <span className="text-xl font-bold text-[var(--color-text)] leading-7">
                    {activeViewName}
                  </span>
                  {activeViewId && (
                    <button
                      onClick={() => {
                        const view = savedViews.find((v) => v.id === activeViewId);
                        if (view) {
                          onShareView?.(view);
                          setCopiedViewId(view.id);
                          setTimeout(() => setCopiedViewId(null), 2000);
                        }
                      }}
                      className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
                      title="Copy share link"
                    >
                      {copiedViewId === activeViewId ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Link2 className="w-4 h-4 text-[#998d7d]" />
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
            <p className="text-sm text-[#998d7d] mt-0.5">
              Track and manage your projects.
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] border-[0.5px] border-[rgba(0,0,0,0.16)] text-white text-xs font-medium h-8 pl-2 pr-1.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span className="leading-4">New Project</span>
            <div className="bg-[rgba(255,255,255,0.24)] border-[0.5px] border-[rgba(255,255,255,0.16)] rounded-[6px] px-1.5 py-1 shadow-sm flex items-center justify-center">
              <span className="text-xs font-semibold text-white leading-none">
                P
              </span>
            </div>
          </button>
        </div>

        {/* Search + tabs + filter row */}
        <div className="flex items-center gap-2 mt-5 pb-4">
          <div className="max-w-[486px] flex-1">
            <MLInput
              placeholder="Search for any project"
              prefix={<Search className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              size="sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              isClearable={!!searchValue}
              onClear={() => setSearchValue("")}
            />
          </div>
          <MLTab
            tabs={[
              { id: "list", label: "List" },
              { id: "pipeline", label: "Pipeline" },
            ]}
            activeTab={activeTab}
            onChange={handleViewTabChange}
            size="sm"
          />
          <MLTab
            tabs={[
              { id: "presale", label: "Presale" },
              { id: "post-sale", label: "Post Sale" },
              { id: "all", label: "All" },
            ]}
            activeTab={activeStageTab}
            onChange={setActiveStageTab}
            size="sm"
          />
          <MLButton
            variant="ghost"
            size="sm"
            prefix={<SlidersHorizontal className="w-4 h-4" />}
            onClick={onToggleFilters}
          >
            Filter
          </MLButton>
          <MLButton
            variant="ghost"
            size="sm"
            onClick={() => {
              if (activeTab === "list") {
                onEditListView?.();
              } else if (activeTab === "pipeline") {
                // pipeline-level menu — no-op for now
              }
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </MLButton>
        </div>

        {/* Views bar */}
        {showViewsBar && (
          <div className="flex items-center gap-1 pb-3 -mt-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onResetToDefault?.()}
              className={`flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                !activeViewId && !sharedViewLabel
                  ? "bg-[var(--color-text)] text-white shadow-sm"
                  : "text-[var(--color-text-muted)] hover:bg-black/[0.04]"
              }`}
            >
              All Projects
            </button>
            {savedViews.map((view) => (
              <div key={view.id} className="flex items-center shrink-0 group/vtab relative">
                <button
                  onClick={() => onApplyView?.(view.id)}
                  className={`flex items-center gap-1.5 h-7 pl-2.5 pr-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeViewId === view.id
                      ? "bg-[var(--color-text)] text-white shadow-sm"
                      : "text-[var(--color-text-muted)] hover:bg-black/[0.04]"
                  }`}
                >
                  <span className="max-w-[140px] truncate">{view.name}</span>
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteView?.(view.id);
                    }}
                    className={`flex items-center justify-center w-4 h-4 rounded transition-colors ${
                      activeViewId === view.id
                        ? "hover:bg-white/20 text-white/60 hover:text-white"
                        : "opacity-0 group-hover/vtab:opacity-100 hover:bg-black/10 text-[#998d7d] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </span>
                </button>
              </div>
            ))}
            {onReapplySharedView && (
              <button
                onClick={() => onReapplySharedView()}
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  sharedViewLabel && !activeViewId
                    ? "bg-[var(--color-text)] text-white shadow-sm"
                    : "text-[var(--color-text-muted)] hover:bg-black/[0.04]"
                }`}
              >
                <Link2 className="w-3 h-3" />
                {sharedViewName || "Shared View"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === "pipeline" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {snapshotDate && stageOverrideMap && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(240,232,220,0.4)] border-t border-b border-[rgba(0,0,0,0.08)]">
              <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
              <span className="flex-1 text-xs font-medium text-[var(--color-text-muted)]">
                {filters.startDate && filters.endDate
                  ? `Pipeline between ${new Date(filters.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} & ${new Date(filters.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                  : `Pipeline as of ${new Date(snapshotDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
              </span>
              <button
                className="shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                onClick={onClearDateFilters}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div className="flex-1 relative min-h-0 border-t border-[rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 overflow-x-auto overflow-y-hidden">
              <div className="flex h-full min-w-max gap-2 p-3">
                {allStages.map((stage) => (
                  activeStageTab === "all" || activeStageTab === stage.id || (activeStageTab === "presale" && presaleStages.some((s) => s.id === stage.id)) || (activeStageTab === "post-sale" && postSaleStages.some((s) => s.id === stage.id)) ? (
                    <PipelineColumn
                    key={stage.id}
                    stage={stage}
                    projects={filteredProjects.filter((p) => effectiveStageId(p) === stage.id)}
                    onOpenProject={handleOpenProject}
                    onAddTag={handleAddTag}
                    onEditTag={handleEditTag}
                    onDeleteTag={handleDeleteTag}
                    onEditStage={onEditStage}
                    selectedCards={selectedCards}
                    onToggleCardSelect={toggleCardSelect}
                    currentStageLabels={currentStageLabels}
                    disableDrag={isTimeTravel}
                    sidebarProjectId={sidebarProjectId}
                    sidebarTab={sidebarTab}
                    onSidebarTabChange={setSidebarTab}
                    sidebarChecklist={sidebarChecklist}
                    onSidebarChecklistChange={setSidebarChecklist}
                    onCloseSidebar={() => setSidebarProjectId(null)}
                  />
                  ) : null
                ))}
              </div>
            </div>
          </div>
          <DragOverlay>
            {activeProject ? (
              <div className="rotate-2 scale-105">
                <ProjectCard
                  project={activeProject}
                  onOpen={() => {}}
                  isDragOverlay
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <ListView
          projects={filteredListProjects}
          searchValue={searchValue}
          onOpenProject={handleOpenProject}
          hiddenColumns={hiddenColumns}
          onHideColumn={onHideColumn}
          columnOrder={columnOrder}
          onColumnOrderChange={onColumnOrderChange}
          columnLabels={columnLabels}
          density={listDensity}
          showRowNumbers={showRowNumbers}
          customFields={customFields}
          customFieldValues={customFieldValues}
          onUpdateCustomFieldValue={onUpdateCustomFieldValue}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
      )}

      {/* Action bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-stretch rounded-[12px] bg-white"
            style={{ boxShadow: "0 0 0 1px white, 0 0 0 2px #d6c0a3, 0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)" }}
          >
            {/* Selected count */}
            <div className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[var(--color-bg)] border-[0.5px] border-[var(--color-border)] rounded-l-[12px] shrink-0"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
            >
              <span className="text-sm font-medium text-[var(--color-text-muted)] whitespace-nowrap">
                {selectedCount} project{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
            {/* Move forward */}
            <button
              className={`flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[var(--color-border)] shrink-0 transition-colors ${
                canMoveForward ? "cursor-pointer hover:bg-[#faf8f5]" : "opacity-40 cursor-not-allowed"
              }`}
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleMoveForward}
              disabled={!canMoveForward}
            >
              <span className="text-sm font-medium text-[var(--color-text)] whitespace-nowrap">Move forward</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[var(--color-text-muted)] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >F</kbd>
            </button>
            {/* Move back */}
            <button
              className={`flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[var(--color-border)] shrink-0 transition-colors ${
                canMoveBack ? "cursor-pointer hover:bg-[#faf8f5]" : "opacity-40 cursor-not-allowed"
              }`}
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleMoveBack}
              disabled={!canMoveBack}
            >
              <span className="text-sm font-medium text-[var(--color-text)] whitespace-nowrap">Move back</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[var(--color-text-muted)] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >B</kbd>
            </button>
            {/* Review */}
            <button
              className="flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[var(--color-border)] rounded-r-[12px] shrink-0 cursor-pointer hover:bg-[#faf8f5] transition-colors"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleReview}
            >
              <span className="text-sm font-medium text-[var(--color-text)] whitespace-nowrap">Review</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[var(--color-text-muted)] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >R</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <MLDialog
        open={!!pendingMove}
        onOpenChange={(open) => { if (!open) cancelPendingMove(); }}
        title="Incomplete Checklist Items"
        description={pendingMove ? `There ${pendingMove.incompleteItems.length === 1 ? "is" : "are"} ${pendingMove.incompleteItems.length} item${pendingMove.incompleteItems.length === 1 ? "" : "s"} remaining in the "${pendingMove.fromStageName}" stage. Are you sure you want to move ${pendingMove.moves.length === 1 ? "this project" : "these projects"}?` : ""}
        confirmText="Move Anyway"
        cancelText="Cancel"
        onConfirm={confirmPendingMove}
        onCancel={cancelPendingMove}
        size="sm"
      >
        {pendingMove && (
          <ul className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
            {pendingMove.incompleteItems.map((label) => (
              <li key={label} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        )}
      </MLDialog>

    </div>
  );
}
