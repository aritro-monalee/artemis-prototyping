"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MLSidebarProvider } from "@/app/lib/monalee-ui/components/MLSidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AppHeader } from "./components/AppHeader";
import { ProjectsView } from "./components/ProjectsView";
import { FiltersPanel } from "./components/FiltersPanel";
import { EditStagePanel } from "./components/EditStagePanel";
import { EditListViewPanel } from "./components/EditListViewPanel";
import type { ProjectFilters, CustomField } from "@/app/data/projects";
import { useProjectStore, type SavedView } from "@/app/store/ProjectStore";

export default function Home() {
  const store = useProjectStore();
  const {
    allStages,
    hiddenColumnIds, setHiddenColumnIds,
    columnOrder, setColumnOrder,
    columnLabels, setColumnLabels,
    listDensity, setListDensity,
    showRowNumbers, setShowRowNumbers,
    customFields, setCustomFields,
    customFieldValues, setCustomFieldValues,
    filters, setFilters,
    savedViews, activeViewId,
    saveCurrentView, applyView, deleteView, applyViewConfig, resetToDefaultView,
  } = store;

  const [currentPage, setCurrentPage] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [editingListView, setEditingListView] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [forceListView, setForceListView] = useState(false);
  const [sharedViewConfig, setSharedViewConfig] = useState<{
    name: string;
    hiddenColumnIds: string[];
    columnOrder: string[];
    columnLabels: Record<string, string>;
    listDensity: "compact" | "default" | "comfortable";
    showRowNumbers: boolean;
  } | null>(null);
  const [sharedViewActive, setSharedViewActive] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    if (!viewParam) return;
    try {
      const decoded = JSON.parse(atob(viewParam));
      if (decoded && typeof decoded === "object" && Array.isArray(decoded.hiddenColumnIds)) {
        applyViewConfig(decoded);
        setForceListView(true);
        setIsListView(true);
        setSharedViewConfig({
          name: decoded.name || "Shared View",
          hiddenColumnIds: decoded.hiddenColumnIds,
          columnOrder: decoded.columnOrder,
          columnLabels: decoded.columnLabels,
          listDensity: decoded.listDensity,
          showRowNumbers: decoded.showRowNumbers,
        });
        setSharedViewActive(true);
      }
    } catch {
      // invalid param — ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetToDefault = useCallback(() => {
    resetToDefaultView();
    setSharedViewActive(false);
  }, [resetToDefaultView]);

  const handleReapplySharedView = useCallback(() => {
    if (!sharedViewConfig) return;
    applyViewConfig(sharedViewConfig);
    setSharedViewActive(true);
  }, [sharedViewConfig, applyViewConfig]);

  const handleShareView = useCallback((view: SavedView) => {
    const config = {
      name: view.name,
      hiddenColumnIds: view.hiddenColumnIds,
      columnOrder: view.columnOrder,
      columnLabels: view.columnLabels,
      listDensity: view.listDensity,
      showRowNumbers: view.showRowNumbers,
    };
    const encoded = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?view=${encoded}`;
    navigator.clipboard.writeText(url);
  }, []);

  const hideColumn = useCallback(
    (id: string) => setHiddenColumnIds((prev) => [...prev, id]),
    [setHiddenColumnIds]
  );
  const showColumn = useCallback(
    (id: string) => setHiddenColumnIds((prev) => prev.filter((x) => x !== id)),
    [setHiddenColumnIds]
  );
  const toggleColumn = useCallback(
    (id: string) =>
      setHiddenColumnIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    [setHiddenColumnIds]
  );
  const renameColumn = useCallback(
    (columnId: string, newLabel: string) => {
      setColumnLabels((prev) => ({ ...prev, [columnId]: newLabel }));
    },
    [setColumnLabels]
  );

  const addCustomField = useCallback((field: CustomField) => {
    setCustomFields((prev) => [...prev, field]);
    setColumnOrder((prev) => [...prev, field.id]);
  }, [setCustomFields, setColumnOrder]);

  const removeCustomField = useCallback((fieldId: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== fieldId));
    setColumnOrder((prev) => prev.filter((id) => id !== fieldId));
    setHiddenColumnIds((prev) => prev.filter((id) => id !== fieldId));
    setCustomFieldValues((prev) => {
      const next = { ...prev };
      for (const projectId of Object.keys(next)) {
        const { [fieldId]: _, ...rest } = next[projectId];
        next[projectId] = rest;
      }
      return next;
    });
  }, [setCustomFields, setColumnOrder, setHiddenColumnIds, setCustomFieldValues]);

  const updateCustomFieldValue = useCallback(
    (projectId: string, fieldId: string, value: string) => {
      setCustomFieldValues((prev) => ({
        ...prev,
        [projectId]: { ...prev[projectId], [fieldId]: value },
      }));
    },
    [setCustomFieldValues]
  );

  const updateFilter = useCallback(
    (key: keyof ProjectFilters, value: string) =>
      setFilters((prev) => ({ ...prev, [key]: value })),
    [setFilters]
  );

  return (
    <MLSidebarProvider>
      <div className="fixed inset-0 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden transition-[width] duration-200 ease-linear ${
            sidebarOpen ? "w-64" : "w-[55px]"
          }`}
        >
          <AppSidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            collapsed={!sidebarOpen}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <AppHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
          <ProjectsView
            onToggleFilters={() => setFiltersOpen((v) => !v)}
            hiddenColumns={hiddenColumnIds}
            onHideColumn={hideColumn}
            filters={filters}
            onClearDateFilters={() => setFilters((prev) => ({ ...prev, startDate: "", endDate: "" }))}
            onViewTabChange={(tab) => setIsListView(tab === "list")}
            onEditStage={(stageId) => {
              setFiltersOpen(false);
              setEditingListView(false);
              setEditingStageId(stageId);
            }}
            onEditListView={() => {
              setFiltersOpen(false);
              setEditingStageId(null);
              setEditingListView((v) => !v);
            }}
            columnOrder={columnOrder}
            onColumnOrderChange={setColumnOrder}
            columnLabels={columnLabels}
            listDensity={listDensity}
            showRowNumbers={showRowNumbers}
            customFields={customFields}
            customFieldValues={customFieldValues}
            onUpdateCustomFieldValue={updateCustomFieldValue}
            savedViews={savedViews}
            activeViewId={activeViewId}
            onApplyView={(viewId) => { applyView(viewId); setSharedViewActive(false); }}
            onDeleteView={deleteView}
            onResetToDefault={handleResetToDefault}
            onShareView={handleShareView}
            initialTab={forceListView ? "list" : undefined}
            sharedViewLabel={sharedViewActive ? sharedViewConfig?.name ?? "Shared View" : null}
            sharedViewName={sharedViewConfig?.name ?? null}
            onReapplySharedView={sharedViewConfig ? handleReapplySharedView : undefined}
          />
        </main>

        {/* Filters panel */}
        <AnimatePresence>
          {filtersOpen && (
            <FiltersPanel
              onClose={() => setFiltersOpen(false)}
              isListView={isListView}
              hiddenColumns={hiddenColumnIds}
              onShowColumn={showColumn}
              filters={filters}
              onFilterChange={updateFilter}
            />
          )}
        </AnimatePresence>

        {/* Edit stage panel */}
        <AnimatePresence>
          {editingStageId && (() => {
            const stage = allStages.find((s) => s.id === editingStageId);
            if (!stage) return null;
            return (
              <EditStagePanel
                key={editingStageId}
                stage={stage}
                allStages={allStages}
                onClose={() => setEditingStageId(null)}
                onSave={(stageId, updates) => {
                  setEditingStageId(null);
                }}
                onDelete={(stageId) => {
                  setEditingStageId(null);
                }}
              />
            );
          })()}
        </AnimatePresence>

        {/* Edit list view panel */}
        <AnimatePresence>
          {editingListView && (
            <EditListViewPanel
              columnOrder={columnOrder}
              hiddenColumns={hiddenColumnIds}
              columnLabels={columnLabels}
              onReorder={setColumnOrder}
              onToggleColumn={toggleColumn}
              onRenameColumn={renameColumn}
              density={listDensity}
              onDensityChange={setListDensity}
              showRowNumbers={showRowNumbers}
              onShowRowNumbersChange={setShowRowNumbers}
              customFields={customFields}
              onAddCustomField={addCustomField}
              onRemoveCustomField={removeCustomField}
              onSaveAsView={(name) => saveCurrentView(name)}
              onClose={() => setEditingListView(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </MLSidebarProvider>
  );
}
