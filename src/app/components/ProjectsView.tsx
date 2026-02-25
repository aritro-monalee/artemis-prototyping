"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { MLButton } from "@/app/lib/monalee-ui/components/MLButton";
import { MLInput } from "@/app/lib/monalee-ui/components/MLInput";
import { MLTab } from "@/app/lib/monalee-ui/components/MLTab";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  SlidersHorizontal,
  User,
  AtSign,
  Hammer,
  Users,
  BookUser,
  Filter,
  DraftingCompass,
  Zap,
  DollarSign,
  FileType2,
  Feather,
  Calendar,
  Clock,
  EyeOff,
  Tag as TagIcon,
  X,
  Link2,
  Check,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/app/lib/monalee-ui/components/ui/table";
import { Checkbox } from "@/app/lib/monalee-ui/components/ui/checkbox";
import { Tag } from "./Tag";
import { PipelineColumn } from "./PipelineColumn";
import { ProjectCard } from "./ProjectCard";
import { filterProjects, getStageAtDate, getProjectDetail } from "@/app/data/projects";
import type { ProjectCardData, ProjectFilters, CustomField } from "@/app/data/projects";
import { useProjectStore, type SavedView } from "@/app/store/ProjectStore";
import { getFieldTypeIcon } from "./EditListViewPanel";

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
  const { projects, setProjects, presaleStages, postSaleStages, allStages, moveProjectToStage, stageHistoryMap } = useProjectStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const listProjects = projects;
  const [activeStageTab, setActiveStageTab] = useState("presale");
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const isTimeTravel = !!(filters.startDate || filters.endDate);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: isTimeTravel ? Infinity : 5 } })
  );

  const toggleCardSelect = useCallback((id: string) => {
    setSelectedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSidebarProjectId((cur) => (cur === id ? null : cur));
      } else {
        next.add(id);
        setSidebarProjectId(id);
        setSidebarTab("details");
      }
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
    for (const id of selectedIds) {
      const p = projects.find((pr) => pr.id === id);
      if (!p) continue;
      const idx = stageOrder.indexOf(p.stageId);
      if (idx < stageOrder.length - 1) {
        const newStageId = stageOrder[idx + 1];
        const stage = allStages.find((s) => s.id === newStageId);
        moveProjectToStage(id, newStageId, stage?.title ?? p.status);
      }
    }
  }, [selectedIds, canMoveForward, stageOrder, allStages, projects, moveProjectToStage]);

  const handleMoveBack = useCallback(() => {
    if (!canMoveBack) return;
    for (const id of selectedIds) {
      const p = projects.find((pr) => pr.id === id);
      if (!p) continue;
      const idx = stageOrder.indexOf(p.stageId);
      if (idx > 0) {
        const newStageId = stageOrder[idx - 1];
        const stage = allStages.find((s) => s.id === newStageId);
        moveProjectToStage(id, newStageId, stage?.title ?? p.status);
      }
    }
  }, [selectedIds, canMoveBack, stageOrder, allStages, projects, moveProjectToStage]);

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

  // Apply global filters
  const globallyFiltered = useMemo(
    () => filterProjects(projects, filters, stageHistoryMap),
    [projects, filters, stageHistoryMap]
  );

  // Time-travel: End Date determines the snapshot; Start Date is fallback
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
        labels[p.id] = { name: info?.title ?? p.stageId, color: info?.color ?? "#ac9b85" };
      }
    }
    return Object.keys(labels).length > 0 ? labels : undefined;
  }, [stageOverrideMap, globallyFiltered, allStages]);

  // Also filter list projects (global filters + stage tab)
  const filteredListProjects = useMemo(() => {
    const globally = filterProjects(listProjects, filters, stageHistoryMap);
    if (activeStageTab === "all") return globally;
    if (activeStageTab === "presale")
      return globally.filter((p) => presaleStages.some((s) => s.id === effectiveStageId(p)));
    if (activeStageTab === "post-sale")
      return globally.filter((p) => postSaleStages.some((s) => s.id === effectiveStageId(p)));
    return globally;
  }, [listProjects, filters, activeStageTab, stageHistoryMap, effectiveStageId]);

  // Filtered projects for stage tab
  const filteredProjects = useMemo(() => {
    if (activeStageTab === "all") return globallyFiltered;
    if (activeStageTab === "presale") return globallyFiltered.filter((p) => presaleStages.some((s) => s.id === effectiveStageId(p)));
    if (activeStageTab === "post-sale") return globallyFiltered.filter((p) => postSaleStages.some((s) => s.id === effectiveStageId(p)));
    return [];
  }, [activeStageTab, globallyFiltered, effectiveStageId]);
  

  // Group projects by stage (uses override when time-traveling)
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
  

  // Filtered projects for search
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
    setActiveId(event.active.id as string);
  }, []);

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

      if (!over) return;

      const activeProjectId = active.id as string;
      const overId = over.id as string;

      if (activeProjectId === overId) return;

      const activeStageId = findStageForProject(activeProjectId);
      if (!activeStageId) return;

      // If dropping on another card in the same stage, reorder
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
    [findStageForProject, projectsByStage]
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
      if (e.key === "Escape") {
        setSelectedCards((prev) => {
          const next = new Set(prev);
          next.delete(sidebarProjectId);
          return next;
        });
        setSidebarProjectId(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarProjectId]);

  const handleOpenProject = (id: string) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Page header */}
      <div className="px-6 pt-6 flex-shrink-0">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#554e46] leading-7">
                Projects
              </h1>
              {activeTab === "list" && activeViewName && (
                <>
                  <span className="text-xl text-[#d5c8b8] font-light leading-7">/</span>
                  <span className="text-xl font-bold text-[#554e46] leading-7">
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
            className="flex items-center gap-2 bg-[#6e04bd] hover:bg-[#5c03a0] border-[0.5px] border-[rgba(0,0,0,0.16)] text-white text-xs font-medium h-8 pl-2 pr-1.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
            onClick={() => {}}
          >
            <span className="leading-4">Create Project</span>
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
              prefix={<Search className="w-4 h-4 text-[#ac9b85]" />}
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
              className={`flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                !activeViewId && !sharedViewLabel
                  ? "bg-[#554e46] text-white shadow-sm"
                  : "text-[#7b6f60] hover:bg-black/[0.04]"
              }`}
            >
              All Projects
            </button>
            {savedViews.map((view) => (
              <div key={view.id} className="flex items-center shrink-0 group/vtab relative">
                <button
                  onClick={() => onApplyView?.(view.id)}
                  className={`flex items-center gap-1.5 h-7 pl-2.5 pr-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeViewId === view.id
                      ? "bg-[#554e46] text-white shadow-sm"
                      : "text-[#7b6f60] hover:bg-black/[0.04]"
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
                        : "opacity-0 group-hover/vtab:opacity-100 hover:bg-black/10 text-[#998d7d] hover:text-[#554e46]"
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
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                  sharedViewLabel && !activeViewId
                    ? "bg-[#554e46] text-white shadow-sm"
                    : "text-[#7b6f60] hover:bg-black/[0.04]"
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
              <Clock className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
              <span className="flex-1 text-xs font-medium text-[#7b6f60]">
                {filters.startDate && filters.endDate
                  ? `Pipeline between ${new Date(filters.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} & ${new Date(filters.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                  : `Pipeline as of ${new Date(snapshotDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
              </span>
              <button
                className="shrink-0 text-[#ac9b85] hover:text-[#554e46] transition-colors cursor-pointer"
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
                    onCloseSidebar={() => {
                      if (sidebarProjectId) {
                        setSelectedCards((prev) => {
                          const next = new Set(prev);
                          next.delete(sidebarProjectId);
                          return next;
                        });
                      }
                      setSidebarProjectId(null);
                    }}
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
            <div className="flex items-center justify-center gap-2 px-4 py-2 h-9 bg-[#fefbf7] border-[0.5px] border-[#d7cfc5] rounded-l-[12px] shrink-0"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
            >
              <span className="text-sm font-medium text-[#7b6f60] whitespace-nowrap">
                {selectedCount} project{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
            {/* Move forward */}
            <button
              className={`flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[#d7cfc5] shrink-0 transition-colors ${
                canMoveForward ? "cursor-pointer hover:bg-[#faf8f5]" : "opacity-40 cursor-not-allowed"
              }`}
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleMoveForward}
              disabled={!canMoveForward}
            >
              <span className="text-sm font-medium text-[#554e46] whitespace-nowrap">Move forward</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[#7b6f60] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >F</kbd>
            </button>
            {/* Move back */}
            <button
              className={`flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[#d7cfc5] shrink-0 transition-colors ${
                canMoveBack ? "cursor-pointer hover:bg-[#faf8f5]" : "opacity-40 cursor-not-allowed"
              }`}
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleMoveBack}
              disabled={!canMoveBack}
            >
              <span className="text-sm font-medium text-[#554e46] whitespace-nowrap">Move back</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[#7b6f60] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >B</kbd>
            </button>
            {/* Review */}
            <button
              className="flex items-center justify-center gap-2 px-2 py-2 h-9 bg-white border-[0.5px] border-[#d7cfc5] rounded-r-[12px] shrink-0 cursor-pointer hover:bg-[#faf8f5] transition-colors"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              onClick={handleReview}
            >
              <span className="text-sm font-medium text-[#554e46] whitespace-nowrap">Review</span>
              <kbd className="flex items-center justify-center px-1.5 py-1 rounded-[6px] text-xs font-medium text-[#7b6f60] leading-none shrink-0"
                style={{ backgroundColor: "rgba(214,192,163,0.2)", borderWidth: "0.5px", borderColor: "rgba(172,155,133,0.3)", boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)" }}
              >R</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ─── Column definitions for list view ─── */

interface ColumnDef {
  id: string;
  label: string;
  icon?: React.ReactNode;
  render: (project: ProjectCardData) => React.ReactNode;
}

export const listColumns: ColumnDef[] = [
  {
    id: "address",
    label: "Address",
    render: (p) => (
      <span
        className="font-medium text-[#554e46] underline decoration-solid flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis"
        style={{ fontSize: "12px", lineHeight: "16px" }}
      >
        {p.address}
      </span>
    ),
  },
  {
    id: "tags",
    label: "Tags",
    icon: <TagIcon className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) =>
      p.tags.length > 0 ? (
        <div className="flex items-center gap-1">
          {p.tags.map((tag, i) => (
            <Tag key={i} type={tag.type} reason={tag.reason} />
          ))}
        </div>
      ) : (
        <CellText>—</CellText>
      ),
  },
  {
    id: "fullName",
    label: "Full Name",
    icon: <User className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.fullName}</CellText>,
  },
  {
    id: "email",
    label: "Email",
    icon: <AtSign className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText truncate>{p.email}</CellText>,
  },
  {
    id: "installer",
    label: "Installer",
    icon: <Hammer className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.installer}</CellText>,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.team}</CellText>,
  },
  {
    id: "representative",
    label: "Representative",
    icon: <BookUser className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText truncate>{p.representative}</CellText>,
  },
  {
    id: "leadSource",
    label: "Lead Source",
    icon: <Filter className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <LeadSourceBadge>{p.leadSource}</LeadSourceBadge>,
  },
  {
    id: "status",
    label: "Status",
    icon: (
      <DraftingCompass className="w-[14px] h-[14px] text-[#554e46] shrink-0" />
    ),
    render: (p) => <StatusBadge>{p.status}</StatusBadge>,
  },
  {
    id: "utilityCompany",
    label: "Utility Company",
    icon: <Zap className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.utilityCompany}</CellText>,
  },
  {
    id: "paymentOption",
    label: "Payment Option",
    icon: (
      <DollarSign className="w-[14px] h-[14px] text-[#554e46] shrink-0" />
    ),
    render: (p) => <CellText truncate>{p.paymentOption}</CellText>,
  },
  {
    id: "applicationId",
    label: "Application ID",
    icon: <FileType2 className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.applicationId}</CellText>,
  },
  {
    id: "signedAt",
    label: "Signed At",
    icon: <Feather className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.signedAt}</CellText>,
  },
  {
    id: "createdOn",
    label: "Created on",
    icon: <Calendar className="w-[14px] h-[14px] text-[#554e46] shrink-0" />,
    render: (p) => <CellText>{p.createdOn}</CellText>,
  },
];

export const listColumnLabels: Record<string, string> = Object.fromEntries(
  listColumns.map((c) => [c.id, c.label])
);

/* ─── Shared sub-components ─── */

function CellText({
  children,
  truncate,
}: {
  children: React.ReactNode;
  truncate?: boolean;
}) {
  return (
    <span
      className={`font-medium text-[#554e46] whitespace-nowrap ${
        truncate ? "overflow-hidden text-ellipsis" : ""
      }`}
      style={{ fontSize: "12px", lineHeight: "16px" }}
    >
      {children}
    </span>
  );
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  "Proposal Created":        { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  "Credit Submitted":        { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6" },
  "Credit Approved":         { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
  "Contract Sent":           { bg: "#ffedd5", border: "#f97316", text: "#9a3412" },
  "Contract Signed":         { bg: "#ccfbf1", border: "#14b8a6", text: "#115e59" },
  "Site Survey Scheduled":   { bg: "#fce7f3", border: "#ec4899", text: "#9d174d" },
  "Final Design":            { bg: "#e0e7ff", border: "#6366f1", text: "#3730a3" },
  "Permit":                  { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
  "Install":                 { bg: "#cffafe", border: "#06b6d4", text: "#155e75" },
  "Inspection":              { bg: "#ffe4e6", border: "#f43f5e", text: "#9f1239" },
  "PTO":                     { bg: "#d1fae5", border: "#059669", text: "#064e3b" },
  "Project Complete":        { bg: "#ecfccb", border: "#84cc16", text: "#3f6212" },
};

const leadSourceColors: Record<string, { bg: string; border: string; text: string }> = {
  "Sales":         { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  "Referral":      { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
  "Website":       { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6" },
  "Door-to-door":  { bg: "#ffedd5", border: "#f97316", text: "#9a3412" },
};

const defaultBadgeColor = { bg: "#f5f5f4", border: "#a8a29e", text: "#57534e" };

function StatusBadge({ children }: { children: React.ReactNode }) {
  const colors = statusColors[String(children)] ?? defaultBadgeColor;
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[8px] px-[8px] py-[4px] font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip"
      style={{ fontSize: "12px", lineHeight: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, color: colors.text }}
    >
      {children}
    </span>
  );
}

function LeadSourceBadge({ children }: { children: React.ReactNode }) {
  const colors = leadSourceColors[String(children)] ?? defaultBadgeColor;
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[8px] px-[8px] py-[4px] font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip"
      style={{ fontSize: "12px", lineHeight: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, color: colors.text }}
    >
      {children}
    </span>
  );
}

/* ─── Editable cell for custom fields ─── */

function EditableCell({
  value,
  type,
  onChange,
}: {
  value: string;
  type: "text" | "number" | "date" | "checkbox";
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (type === "checkbox") {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={value === "true"}
          onCheckedChange={(checked) => onChange(String(checked))}
        />
      </div>
    );
  }

  if (!editing) {
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
          setDraft(value);
          setEditing(true);
        }}
        className="font-medium text-[#554e46] whitespace-nowrap cursor-text min-w-[40px] inline-block"
        style={{ fontSize: "12px", lineHeight: "16px" }}
      >
        {value || (
          <span className="text-[#c4b8a8] italic font-normal">Empty</span>
        )}
      </span>
    );
  }

  return (
    <input
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        onChange(draft);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onChange(draft);
          setEditing(false);
        }
        if (e.key === "Escape") {
          setEditing(false);
        }
      }}
      onClick={(e) => e.stopPropagation()}
      type={type === "number" ? "number" : type === "date" ? "date" : "text"}
      className="bg-white border border-[#d5c8b8] rounded-md px-1.5 py-0.5 text-xs font-medium text-[#554e46] outline-none focus:border-[#6e04bd] focus:ring-1 focus:ring-[#6e04bd]/20 w-[120px]"
    />
  );
}

/* ─── Sortable header cell for column drag-and-drop ─── */

function SortableHeaderCell({
  col,
  allSelected,
  toggleAll,
  onHide,
  isAddress,
  isBeingDragged,
  columnOpacity,
  showRowNumbers,
}: {
  col: ColumnDef;
  allSelected: boolean;
  toggleAll: () => void;
  onHide: (id: string) => void;
  isAddress: boolean;
  isBeingDragged: boolean;
  columnOpacity: number;
  showRowNumbers?: boolean;
}) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: col.id,
    disabled: isAddress,
  });

  return (
    <TableHead
      ref={setNodeRef}
      style={{ opacity: columnOpacity }}
      className={`px-3 py-3 border-r border-[#d5c8b8] whitespace-nowrap group/header transition-[opacity,background-color] duration-200 ${
        isAddress
          ? "sticky left-0 z-20 bg-[#f4f1ed] shadow-[inset_-1px_0_0_#d5c8b8,inset_0_-1px_0_#d5c8b8] border-r-0"
          : "cursor-grab active:cursor-grabbing"
      } ${isBeingDragged ? "!bg-[#ebe5dd]" : ""}`}
      {...(isAddress ? {} : { ...attributes, ...listeners })}
    >
      <div className="flex items-center gap-[10px]">
        {isAddress && showRowNumbers && (
          <span className="font-medium text-[#998d7d] w-[18px] text-right shrink-0" style={{ fontSize: "12px", lineHeight: "16px" }}>#</span>
        )}
        {isAddress && (
          <Checkbox
            checked={allSelected}
            onCheckedChange={() => toggleAll()}
          />
        )}
        {col.icon}
        <span
          className="font-medium text-[#554e46]"
          style={{ fontSize: "12px", lineHeight: "16px" }}
        >
          {col.label}
        </span>
        {!isAddress && (
          <button
            className="opacity-0 group-hover/header:opacity-100 transition-opacity ml-auto p-0.5 rounded hover:bg-[#e8e2da]"
            onClick={(e) => {
              e.stopPropagation();
              onHide(col.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <EyeOff className="w-3.5 h-3.5 text-[#998d7d]" />
          </button>
        )}
      </div>
    </TableHead>
  );
}

/* ─── ListView component ─── */

function ListView({
  projects,
  searchValue,
  onOpenProject,
  hiddenColumns,
  onHideColumn,
  columnOrder,
  onColumnOrderChange,
  columnLabels,
  density,
  showRowNumbers,
  customFields,
  customFieldValues,
  onUpdateCustomFieldValue,
  selectedRows,
  onSelectedRowsChange,
}: {
  projects: ProjectCardData[];
  searchValue: string;
  onOpenProject: (id: string) => void;
  hiddenColumns: string[];
  onHideColumn: (id: string) => void;
  columnOrder: string[];
  onColumnOrderChange: (order: string[]) => void;
  columnLabels: Record<string, string>;
  density: "compact" | "default" | "comfortable";
  showRowNumbers: boolean;
  customFields: CustomField[];
  customFieldValues: Record<string, Record<string, string>>;
  onUpdateCustomFieldValue: (projectId: string, fieldId: string, value: string) => void;
  selectedRows: Set<string>;
  onSelectedRowsChange: (rows: Set<string>) => void;
}) {
  const setSelectedRows = onSelectedRowsChange;
  const [allSelected, setAllSelected] = useState(false);
  const [fadingOut, setFadingOut] = useState<Set<string>>(new Set());
  const [fadingIn, setFadingIn] = useState<Set<string>>(new Set());
  const [activeDragColumnId, setActiveDragColumnId] = useState<string | null>(
    null
  );

  const hiddenSet = useMemo(() => new Set(hiddenColumns), [hiddenColumns]);

  // Detect columns being shown (removed from hiddenColumns) and fade them in
  const prevHiddenRef = useRef<string[]>(hiddenColumns);
  useEffect(() => {
    const prev = new Set(prevHiddenRef.current);
    const curr = new Set(hiddenColumns);
    const shown = [...prev].filter((id) => !curr.has(id));
    if (shown.length > 0) {
      setFadingIn(new Set(shown));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadingIn(new Set());
        });
      });
    }
    prevHiddenRef.current = hiddenColumns;
  }, [hiddenColumns]);

  const listSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  // Build column defs with label overrides from columnLabels
  const allColumns: ColumnDef[] = useMemo(() => {
    const builtIn = listColumns.map((c) => ({
      ...c,
      label: columnLabels[c.id] || c.label,
    }));
    const customDefs: ColumnDef[] = customFields.map((field) => ({
      id: field.id,
      label: columnLabels[field.id] || field.label,
      icon: getFieldTypeIcon(field.type),
      render: (p: ProjectCardData) => (
        <EditableCell
          value={customFieldValues[p.id]?.[field.id] ?? ""}
          type={field.type}
          onChange={(v) => onUpdateCustomFieldValue(p.id, field.id, v)}
        />
      ),
    }));
    return [...builtIn, ...customDefs];
  }, [customFields, customFieldValues, onUpdateCustomFieldValue, columnLabels]);

  // Derive ordered + visible columns: address always first, then ordered non-hidden
  const orderedVisibleColumns = useMemo(() => {
    const addressCol = allColumns.find((c) => c.id === "address")!;
    const rest = columnOrder
      .filter((id) => id !== "address" && !hiddenSet.has(id))
      .map((id) => allColumns.find((c) => c.id === id)!)
      .filter(Boolean);
    return [addressCol, ...rest];
  }, [columnOrder, hiddenSet, allColumns]);

  // IDs for the sortable context (excludes address and fading)
  const sortableColumnIds = useMemo(
    () =>
      orderedVisibleColumns
        .filter((c) => c.id !== "address" && !fadingOut.has(c.id))
        .map((c) => c.id),
    [orderedVisibleColumns, fadingOut]
  );

  // The column def being dragged (for DragOverlay)
  const activeDragColumn = useMemo(
    () =>
      activeDragColumnId
        ? allColumns.find((c) => c.id === activeDragColumnId) ?? null
        : null,
    [activeDragColumnId, allColumns]
  );

  // Compute per-column opacity
  const getColumnOpacity = useCallback(
    (colId: string) => {
      if (fadingOut.has(colId)) return 0;
      if (fadingIn.has(colId)) return 0;
      if (colId === activeDragColumnId) return 0.35;
      return 1;
    },
    [fadingOut, fadingIn, activeDragColumnId]
  );

  const filtered = useMemo(() => {
    if (!searchValue.trim()) return projects;
    const q = searchValue.toLowerCase();
    return projects.filter(
      (p) =>
        p.address.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.installer.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        p.representative.toLowerCase().includes(q)
    );
  }, [projects, searchValue]);

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
      setAllSelected(false);
    } else {
      setSelectedRows(new Set(filtered.map((p) => p.id)));
      setAllSelected(true);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedRows(next);
  };

  // Hide with fade-out animation, then notify parent
  const hideColumn = useCallback(
    (id: string) => {
      setFadingOut((prev) => new Set([...prev, id]));
      setTimeout(() => {
        onHideColumn(id);
        setFadingOut((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 200);
    },
    [onHideColumn]
  );

  // Column drag handlers
  const handleColumnDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragColumnId(event.active.id as string);
  }, []);

  const handleColumnDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = columnOrder.indexOf(active.id as string);
    const newIndex = columnOrder.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    onColumnOrderChange(arrayMove(columnOrder, oldIndex, newIndex));
  }, [columnOrder, onColumnOrderChange]);

  const handleColumnDragEnd = useCallback(() => {
    setActiveDragColumnId(null);
  }, []);

  const handleColumnDragCancel = useCallback(() => {
    setActiveDragColumnId(null);
  }, []);

  const densityPy = density === "compact" ? "py-1.5" : density === "comfortable" ? "py-4" : "py-3";
  const densityPx = density === "compact" ? "px-2" : density === "comfortable" ? "px-4" : "px-3";

  return (
    <div className="flex-1 flex flex-col min-h-0 border-t border-[rgba(0,0,0,0.08)] overflow-auto bg-[#fefbf7] no-scrollbar">
      <DndContext
        sensors={listSensors}
        onDragStart={handleColumnDragStart}
        onDragOver={handleColumnDragOver}
        onDragEnd={handleColumnDragEnd}
        onDragCancel={handleColumnDragCancel}
      >
        <Table className="w-full table-auto">
          <TableHeader className="bg-[#f4f1ed] sticky top-0 z-10 shadow-[inset_0_-1px_0_#d5c8b8]">
            <SortableContext
              items={sortableColumnIds}
              strategy={horizontalListSortingStrategy}
            >
              <TableRow className="hover:bg-[#f4f1ed] border-none">
                {orderedVisibleColumns.map((col) => (
                  <SortableHeaderCell
                    key={col.id}
                    col={col}
                    allSelected={allSelected}
                    toggleAll={toggleAll}
                    onHide={hideColumn}
                    isAddress={col.id === "address"}
                    isBeingDragged={col.id === activeDragColumnId}
                    columnOpacity={getColumnOpacity(col.id)}
                    showRowNumbers={showRowNumbers && col.id === "address"}
                  />
                ))}
              </TableRow>
            </SortableContext>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-b">
            {filtered.map((project, rowIndex) => {
              const isSelected = selectedRows.has(project.id);
              return (
                <TableRow
                  key={project.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={`cursor-pointer transition-colors group/row ${
                    isSelected
                      ? "bg-[#f5f0fa] hover:bg-[#efe8f6]"
                      : "bg-[#fefbf7] hover:bg-[#faf8f5]"
                  } border-b border-[#d5c8b8]`}
                  onClick={() => onOpenProject(project.id)}
                >
                  {orderedVisibleColumns.map((col) => {
                    const isDragCol = col.id === activeDragColumnId;
                    const cellOpacity = getColumnOpacity(col.id);
                    return (
                      <TableCell
                        key={col.id}
                        style={{ opacity: cellOpacity }}
                        className={`${densityPx} ${densityPy} border-r border-[#d5c8b8] whitespace-nowrap transition-[opacity,background-color] duration-200 ${
                          col.id === "address"
                            ? `sticky left-0 z-[1] shadow-[inset_-1px_0_0_#d5c8b8] border-r-0 ${
                                isSelected
                                  ? "bg-[#f5f0fa] group-hover/row:bg-[#efe8f6]"
                                  : "bg-[#fefbf7] group-hover/row:bg-[#faf8f5]"
                              }`
                            : ""
                        } ${isDragCol ? "!bg-[#f0ebe4]" : ""}`}
                      >
                        {col.id === "address" ? (
                          <div className="flex items-center gap-[10px]">
                            {showRowNumbers && (
                              <span className="font-medium text-[#998d7d] w-[18px] text-right shrink-0" style={{ fontSize: "11px", lineHeight: "16px" }}>
                                {rowIndex + 1}
                              </span>
                            )}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleRow(project.id)}
                              />
                            </div>
                            {col.render(project)}
                          </div>
                        ) : (
                          col.render(project)
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Drag overlay — floating column header */}
        <DragOverlay dropAnimation={null}>
          {activeDragColumn ? (
            <div className="bg-[#f4f1ed] border border-[#d5c8b8] rounded-lg px-3 py-3 shadow-lg flex items-center gap-[10px] whitespace-nowrap">
              {activeDragColumn.icon}
              <span
                className="font-medium text-[#554e46]"
                style={{ fontSize: "12px", lineHeight: "16px" }}
              >
                {activeDragColumn.label}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Search className="w-10 h-10 text-[#d4c9b8] mx-auto mb-3" />
            <p
              className="font-medium text-[#998d7d]"
              style={{ fontSize: "14px" }}
            >
              No projects found
            </p>
            <p className="text-[#ac9b85] mt-1" style={{ fontSize: "12px" }}>
              Try a different search term
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
