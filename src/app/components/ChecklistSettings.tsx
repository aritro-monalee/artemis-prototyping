"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, ChevronRight, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useProjectStore } from "@/app/store/ProjectStore";
import type { ChecklistItemDef } from "@/app/data/projects";

function ChecklistItemRow({
  item,
  stageId,
  index,
  isExpanded,
  onToggleExpand,
  onUpdateItem,
  onRemoveItem,
  onToggleItemOptional,
}: {
  item: ChecklistItemDef;
  stageId: string;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdateItem: (stageId: string, idx: number, patch: Partial<ChecklistItemDef>) => void;
  onRemoveItem: (stageId: string, idx: number) => void;
  onToggleItemOptional: (stageId: string, idx: number) => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [statusText, setStatusText] = useState(item.statusText || "");
  const [ctaLabel, setCtaLabel] = useState(item.ctaLabel || "");

  useEffect(() => {
    setLabel(item.label);
    setStatusText(item.statusText || "");
    setCtaLabel(item.ctaLabel || "");
  }, [item.label, item.statusText, item.ctaLabel]);

  const commitChanges = () => {
    const patch: Partial<ChecklistItemDef> = {};
    const trimLabel = label.trim();
    if (trimLabel && trimLabel !== item.label) patch.label = trimLabel;
    const trimStatus = statusText.trim();
    if (trimStatus !== (item.statusText || "")) patch.statusText = trimStatus || undefined;
    const trimCta = ctaLabel.trim();
    if (trimCta !== (item.ctaLabel || "")) patch.ctaLabel = trimCta || undefined;
    if (Object.keys(patch).length > 0) onUpdateItem(stageId, index, patch);
  };

  return (
    <div className="border-b border-[#e8e2da] last:border-b-0">
      <div
        className={`flex items-center gap-3 px-4 py-2.5 group/item transition-colors cursor-pointer ${
          isExpanded ? "bg-cream-50" : "hover:bg-cream-50"
        }`}
        onClick={onToggleExpand}
      >
        <GripVertical className="w-3.5 h-3.5 text-cream-400 shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-[var(--color-text)] text-left truncate font-medium">
              {item.label}
            </span>
            {!isExpanded && (item.statusText || item.ctaLabel) && (
              <span className="text-xs text-[#998d7d] truncate">
                {item.statusText || item.ctaLabel}
              </span>
            )}
          </div>
        </div>
        {item.optional && !isExpanded && (
          <span className="h-5 px-1.5 flex items-center justify-center rounded text-[10px] font-medium leading-none bg-amber-100 text-amber-700 border border-amber-300 shrink-0">
            Optional
          </span>
        )}
        <ChevronRight
          className={`w-3.5 h-3.5 text-cream-400 shrink-0 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 flex flex-col gap-3 bg-cream-50">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--color-text-muted)]">Title</label>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[var(--color-text)] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[var(--color-brand)] transition-colors"
                  placeholder="Checklist item title"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--color-text-muted)]">Subtext</label>
                <input
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[var(--color-text)] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[var(--color-brand)] transition-colors"
                  placeholder="Description shown below the title"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--color-text-muted)]">CTA Label</label>
                <input
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[var(--color-text)] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[var(--color-brand)] transition-colors"
                  placeholder="Button label for the action"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItemOptional(stageId, index);
                  }}
                  className={`h-6 px-2 flex items-center justify-center rounded text-xs font-medium leading-none transition-colors cursor-pointer ${
                    item.optional
                      ? "bg-amber-100 text-amber-700 border border-amber-300"
                      : "bg-cream-200/60 text-[var(--color-text-muted)] hover:bg-cream-200 border border-transparent"
                  }`}
                >
                  {item.optional ? "Optional" : "Mark optional"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(stageId, index);
                  }}
                  className="h-6 px-2 flex items-center gap-1 rounded text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortableChecklistGroup({
  stage,
  items,
  isOpen,
  isDragging,
  expandedItemKey,
  addingItemToGroup,
  newItemLabel,
  onToggle,
  onSetExpandedItemKey,
  onUpdateItem,
  onRemoveItem,
  onToggleItemOptional,
  onSetAddingItemToGroup,
  onSetNewItemLabel,
  onAddItemToGroup,
}: {
  stage: { id: string; title: string; color: string };
  items: ChecklistItemDef[];
  isOpen: boolean;
  isDragging: boolean;
  expandedItemKey: string | null;
  addingItemToGroup: string | null;
  newItemLabel: string;
  onToggle: () => void;
  onSetExpandedItemKey: (key: string | null) => void;
  onUpdateItem: (stageId: string, idx: number, patch: Partial<ChecklistItemDef>) => void;
  onRemoveItem: (stageId: string, idx: number) => void;
  onToggleItemOptional: (stageId: string, idx: number) => void;
  onSetAddingItemToGroup: (id: string | null) => void;
  onSetNewItemLabel: (v: string) => void;
  onAddItemToGroup: (stageId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: stage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border overflow-hidden ${
        isDragging
          ? "border-[var(--color-brand)] opacity-40"
          : "border-[#e8e2da]"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#f0ebe4]">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing shrink-0 touch-none"
        >
          <GripVertical className="w-3.5 h-3.5 text-cream-400 hover:text-cream-700 transition-colors" />
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
        >
          <ChevronRight
            className={`w-3.5 h-3.5 text-cream-800 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: stage.color }}
          />
          <span className="text-sm font-medium text-[var(--color-text)] truncate">
            {stage.title}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] shrink-0">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#e8e2da]">
          {items.map((item, iIdx) => {
            const itemKey = `${stage.id}-${iIdx}`;
            return (
              <ChecklistItemRow
                key={iIdx}
                item={item}
                stageId={stage.id}
                index={iIdx}
                isExpanded={expandedItemKey === itemKey}
                onToggleExpand={() =>
                  onSetExpandedItemKey(expandedItemKey === itemKey ? null : itemKey)
                }
                onUpdateItem={onUpdateItem}
                onRemoveItem={onRemoveItem}
                onToggleItemOptional={onToggleItemOptional}
              />
            );
          })}

          {addingItemToGroup === stage.id ? (
            <div className="flex items-center gap-3 px-4 py-2.5">
              <div className="w-3.5 shrink-0" />
              <input
                autoFocus
                value={newItemLabel}
                onChange={(e) => onSetNewItemLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddItemToGroup(stage.id);
                  if (e.key === "Escape") {
                    onSetAddingItemToGroup(null);
                    onSetNewItemLabel("");
                  }
                }}
                placeholder="Item name..."
                className="flex-1 text-sm text-[var(--color-text)] bg-transparent outline-none border-b border-[var(--color-brand)] pb-0.5 placeholder:text-cream-400"
              />
              <button
                onClick={() => onAddItemToGroup(stage.id)}
                className="text-xs font-medium text-[var(--color-brand)] cursor-pointer hover:underline shrink-0"
              >
                Add
              </button>
              <button
                onClick={() => {
                  onSetAddingItemToGroup(null);
                  onSetNewItemLabel("");
                }}
                className="text-xs font-medium text-[var(--color-text-muted)] cursor-pointer hover:underline shrink-0"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onSetAddingItemToGroup(stage.id);
                onSetNewItemLabel("");
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-cream-50 transition-colors w-full cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function ChecklistSettings() {
  const {
    presaleStages,
    postSaleStages,
    allStages,
    checklistTemplate,
    setChecklistTemplate,
    checklistPresaleOrder,
    setChecklistPresaleOrder,
    checklistPostsaleOrder,
    setChecklistPostsaleOrder,
  } = useProjectStore();

  const stageIds = allStages.map((s) => s.id);
  const presaleIds = presaleStages.map((s) => s.id);
  const postsaleIds = postSaleStages.map((s) => s.id);

  useEffect(() => {
    setChecklistTemplate((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const id of stageIds) {
        if (!(id in next)) {
          next[id] = [];
          changed = true;
        }
      }
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIds.join(",")]);

  useEffect(() => {
    setChecklistPresaleOrder((prev) => {
      const existing = new Set(prev);
      const toAdd = presaleIds.filter((id) => !existing.has(id));
      if (toAdd.length === 0) return prev;
      return [...prev, ...toAdd];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presaleIds.join(",")]);

  useEffect(() => {
    setChecklistPostsaleOrder((prev) => {
      const existing = new Set(prev);
      const toAdd = postsaleIds.filter((id) => !existing.has(id));
      if (toAdd.length === 0) return prev;
      return [...prev, ...toAdd];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsaleIds.join(",")]);

  const stageMap = new Map(allStages.map((s) => [s.id, s]));
  const orderedPresale = checklistPresaleOrder
    .map((id) => stageMap.get(id))
    .filter(Boolean) as typeof allStages;
  const orderedPostsale = checklistPostsaleOrder
    .map((id) => stageMap.get(id))
    .filter(Boolean) as typeof allStages;

  const dndSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setDragActiveId(e.active.id as string);
  }, []);

  const makeHandleDragEnd = useCallback(
    (setOrder: React.Dispatch<React.SetStateAction<string[]>>) =>
      (e: DragEndEvent) => {
        setDragActiveId(null);
        const { active, over } = e;
        if (!over || active.id === over.id) return;
        setOrder((prev) => {
          const oldIndex = prev.indexOf(active.id as string);
          const newIndex = prev.indexOf(over.id as string);
          if (oldIndex === -1 || newIndex === -1) return prev;
          return arrayMove(prev, oldIndex, newIndex);
        });
      },
    []
  );

  const handlePresaleDragEnd = useCallback(
    (e: DragEndEvent) => makeHandleDragEnd(setChecklistPresaleOrder)(e),
    [makeHandleDragEnd, setChecklistPresaleOrder]
  );
  const handlePostsaleDragEnd = useCallback(
    (e: DragEndEvent) => makeHandleDragEnd(setChecklistPostsaleOrder)(e),
    [makeHandleDragEnd, setChecklistPostsaleOrder]
  );

  const dragActiveStage = dragActiveId ? stageMap.get(dragActiveId) : null;

  const [openGroupIds, setOpenGroupIds] = useState<Set<string>>(
    () => new Set(allStages.map((s) => s.id))
  );
  const [expandedItemKey, setExpandedItemKey] = useState<string | null>(null);
  const [addingItemToGroup, setAddingItemToGroup] = useState<string | null>(
    null
  );
  const [newItemLabel, setNewItemLabel] = useState("");

  const toggleGroup = (id: string) => {
    setOpenGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addItemToGroup = (stageId: string) => {
    const trimmed = newItemLabel.trim();
    if (!trimmed) return;
    setChecklistTemplate((prev) => ({
      ...prev,
      [stageId]: [...(prev[stageId] || []), { label: trimmed }],
    }));
    setNewItemLabel("");
    setAddingItemToGroup(null);
  };

  const removeItem = (stageId: string, itemIdx: number) => {
    setChecklistTemplate((prev) => ({
      ...prev,
      [stageId]: (prev[stageId] || []).filter((_, i) => i !== itemIdx),
    }));
    setExpandedItemKey(null);
  };

  const updateItem = (
    stageId: string,
    itemIdx: number,
    patch: Partial<ChecklistItemDef>
  ) => {
    setChecklistTemplate((prev) => ({
      ...prev,
      [stageId]: (prev[stageId] || []).map((item, i) =>
        i === itemIdx ? { ...item, ...patch } : item
      ),
    }));
  };

  const toggleItemOptional = (stageId: string, itemIdx: number) => {
    setChecklistTemplate((prev) => ({
      ...prev,
      [stageId]: (prev[stageId] || []).map((item, i) =>
        i === itemIdx ? { ...item, optional: !item.optional } : item
      ),
    }));
  };

  const renderDragOverlay = () => (
    <DragOverlay dropAnimation={null}>
      {dragActiveStage ? (
        <div className="rounded-lg border border-[var(--color-brand)] bg-[var(--color-bg)] shadow-lg px-4 py-3 flex items-center gap-2 opacity-95">
          <GripVertical className="w-3.5 h-3.5 text-cream-600 shrink-0" />
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: dragActiveStage.color }}
          />
          <span className="text-sm font-medium text-[var(--color-text)]">
            {dragActiveStage.title}
          </span>
        </div>
      ) : null}
    </DragOverlay>
  );

  const renderStageList = (
    stages: typeof allStages,
    onDragEnd: (e: DragEndEvent) => void
  ) => (
    <DndContext
      sensors={dndSensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={stages.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {stages.map((stage) => {
            const isOpen = openGroupIds.has(stage.id);
            const items = checklistTemplate[stage.id] || [];
            return (
              <SortableChecklistGroup
                key={stage.id}
                stage={stage}
                items={items}
                isOpen={isOpen}
                isDragging={dragActiveId === stage.id}
                expandedItemKey={expandedItemKey}
                addingItemToGroup={addingItemToGroup}
                newItemLabel={newItemLabel}
                onToggle={() => toggleGroup(stage.id)}
                onSetExpandedItemKey={setExpandedItemKey}
                onUpdateItem={updateItem}
                onRemoveItem={removeItem}
                onToggleItemOptional={toggleItemOptional}
                onSetAddingItemToGroup={setAddingItemToGroup}
                onSetNewItemLabel={setNewItemLabel}
                onAddItemToGroup={addItemToGroup}
              />
            );
          })}
        </div>
      </SortableContext>
      {renderDragOverlay()}
    </DndContext>
  );

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          Project Checklist
        </h2>
        <p className="text-sm text-muted-foreground leading-5">
          Checklist items grouped by pipeline stage. Drag to reorder
          sections. Add a new stage in the Pipeline tab and it will appear
          here automatically.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          Pre Sale
        </h3>
        {renderStageList(orderedPresale, handlePresaleDragEnd)}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          Post Sale
        </h3>
        {renderStageList(orderedPostsale, handlePostsaleDragEnd)}
      </div>
    </section>
  );
}
