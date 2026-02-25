"use client";

import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelRightClose,
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Type,
  Hash,
  CalendarDays,
  CheckSquare,
  Pencil,
  Bookmark,
  Check,
} from "lucide-react";
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
import { MLTab } from "@/app/lib/monalee-ui/components/MLTab";
import { MLSwitch } from "@/app/lib/monalee-ui/components/MLSwitch";
import { MLInput } from "@/app/lib/monalee-ui/components/MLInput";
import { MLButton } from "@/app/lib/monalee-ui/components/MLButton";
import { listColumns } from "./ProjectsView";
import type { CustomField } from "@/app/data/projects";

const fieldTypeOptions: { id: CustomField["type"]; label: string; icon: React.ReactNode }[] = [
  { id: "text", label: "Text", icon: <Type className="w-3.5 h-3.5" /> },
  { id: "number", label: "Number", icon: <Hash className="w-3.5 h-3.5" /> },
  { id: "date", label: "Date", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "checkbox", label: "Checkbox", icon: <CheckSquare className="w-3.5 h-3.5" /> },
];

export function getFieldTypeIcon(type: CustomField["type"]) {
  switch (type) {
    case "text":
      return <Type className="w-[14px] h-[14px] text-[#554e46] shrink-0" />;
    case "number":
      return <Hash className="w-[14px] h-[14px] text-[#554e46] shrink-0" />;
    case "date":
      return <CalendarDays className="w-[14px] h-[14px] text-[#554e46] shrink-0" />;
    case "checkbox":
      return <CheckSquare className="w-[14px] h-[14px] text-[#554e46] shrink-0" />;
  }
}

interface EditListViewPanelProps {
  columnOrder: string[];
  hiddenColumns: string[];
  columnLabels: Record<string, string>;
  onReorder: (newOrder: string[]) => void;
  onToggleColumn: (columnId: string) => void;
  onRenameColumn: (columnId: string, newLabel: string) => void;
  density: "compact" | "default" | "comfortable";
  onDensityChange: (density: "compact" | "default" | "comfortable") => void;
  showRowNumbers: boolean;
  onShowRowNumbersChange: (show: boolean) => void;
  customFields: CustomField[];
  onAddCustomField: (field: CustomField) => void;
  onRemoveCustomField: (fieldId: string) => void;
  onSaveAsView?: (name: string) => void;
  onClose: () => void;
}

export function EditListViewPanel({
  columnOrder,
  hiddenColumns,
  columnLabels,
  onReorder,
  onToggleColumn,
  onRenameColumn,
  density,
  onDensityChange,
  showRowNumbers,
  onShowRowNumbersChange,
  customFields,
  onAddCustomField,
  onRemoveCustomField,
  onSaveAsView,
  onClose,
}: EditListViewPanelProps) {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [addingField, setAddingField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<CustomField["type"]>("text");
  const [savingView, setSavingView] = useState(false);
  const [viewName, setViewName] = useState("");
  const [savedToast, setSavedToast] = useState(false);
  const viewNameInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const customFieldIds = new Set(customFields.map((f) => f.id));

  const allColumnMetas = useMemo(() => {
    const builtIn = listColumns.map((c) => ({
      id: c.id,
      label: columnLabels[c.id] || c.label,
      icon: c.icon,
      isCustom: false,
    }));
    const custom = customFields.map((f) => ({
      id: f.id,
      label: columnLabels[f.id] || f.label,
      icon: getFieldTypeIcon(f.type),
      isCustom: true,
    }));
    return [...builtIn, ...custom];
  }, [customFields, columnLabels]);

  const draggableIds = columnOrder.filter((id) => id !== "address");

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveDragId(null);
      if (!over || active.id === over.id) return;

      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(arrayMove(columnOrder, oldIndex, newIndex));
      }
    },
    [columnOrder, onReorder]
  );

  const activeDragColumn = activeDragId
    ? allColumnMetas.find((c) => c.id === activeDragId) ?? null
    : null;

  const hiddenSet = new Set(hiddenColumns);

  const handleAddField = () => {
    const name = newFieldName.trim();
    if (!name) return;
    const id = `custom-${Date.now()}`;
    onAddCustomField({ id, label: name, type: newFieldType });
    setNewFieldName("");
    setNewFieldType("text");
    setAddingField(false);
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 352, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-[#fefbf7] border-l border-[#d5c8b8] flex flex-col h-full shrink-0 overflow-hidden"
    >
      <div className="w-[352px] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center h-16 min-h-[64px] px-4 border-b border-[#d7cfc5] shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              <PanelRightClose className="w-4 h-4 text-[#554e46]" />
            </button>
            <div className="w-2 flex items-center justify-center">
              <div className="h-[15px] w-px bg-[#d7cfc5]" />
            </div>
            <span className="text-sm font-medium text-[#554e46]">
              Editing List View
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-3 py-6">
          {/* Density */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[#554e46]">
              Row Density
            </span>
            <MLTab
              tabs={[
                { id: "compact", label: "Compact" },
                { id: "default", label: "Default" },
                { id: "comfortable", label: "Comfortable" },
              ]}
              activeTab={density}
              onChange={(v) =>
                onDensityChange(v as "compact" | "default" | "comfortable")
              }
              className="w-full"
              listClassName="w-full"
            />
          </div>

          {/* Show row numbers */}
          <MLSwitch
            label="Show Row Numbers"
            description="Display row numbers in the first column"
            checked={showRowNumbers}
            onChange={(e) => onShowRowNumbersChange(e.target.checked)}
            align="left"
          />

          {/* Columns header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[#554e46]">
                Columns
              </span>
              <p className="text-xs text-[#998d7d]">
                Drag to reorder. Toggle visibility with the eye icon.
              </p>
            </div>
          </div>

          {/* Fixed address column */}
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-black/[0.02] border-[0.5px] border-[rgba(0,0,0,0.08)]">
            <GripVertical className="w-4 h-4 text-[#d5c8b8] shrink-0" />
            <span className="flex-1 text-xs font-medium text-[#998d7d]">
              Address (fixed)
            </span>
            <Eye className="w-4 h-4 text-[#d5c8b8] shrink-0" />
          </div>

          {/* Draggable columns */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={draggableIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-1">
                {draggableIds.map((colId) => {
                  const col = allColumnMetas.find((c) => c.id === colId);
                  if (!col) return null;
                  const isHidden = hiddenSet.has(colId);
                  return (
                    <SortableColumnItem
                      key={colId}
                      column={col}
                      isHidden={isHidden}
                      onToggle={() => onToggleColumn(colId)}
                      isDragging={colId === activeDragId}
                      isCustom={customFieldIds.has(colId)}
                      onRemove={
                        customFieldIds.has(colId)
                          ? () => onRemoveCustomField(colId)
                          : undefined
                      }
                      onRename={(newLabel) => onRenameColumn(colId, newLabel)}
                    />
                  );
                })}
              </div>
            </SortableContext>
            <DragOverlay dropAnimation={null}>
              {activeDragColumn ? (
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-[#f4f1ed] border border-[#d5c8b8] shadow-lg">
                  <GripVertical className="w-4 h-4 text-[#998d7d] shrink-0" />
                  {activeDragColumn.icon}
                  <span className="flex-1 text-xs font-medium text-[#554e46]">
                    {activeDragColumn.label}
                  </span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Add custom field */}
          <AnimatePresence>
            {addingField && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2.5 p-3 rounded-lg border-[0.5px] border-[rgba(0,0,0,0.16)] bg-black/[0.02]">
                  <MLInput
                    placeholder="Field name"
                    size="sm"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddField();
                    }}
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-[#998d7d]">
                      Type
                    </span>
                    <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
                      {fieldTypeOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setNewFieldType(opt.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-[0.5px] text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                            newFieldType === opt.id
                              ? "bg-[#554e46] text-white border-[#554e46]"
                              : "bg-white border-[rgba(0,0,0,0.16)] text-[#554e46] hover:bg-[#f4f1ed]"
                          }`}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <MLButton
                      variant="default"
                      size="sm"
                      onClick={handleAddField}
                      disabled={!newFieldName.trim()}
                    >
                      Add Field
                    </MLButton>
                    <MLButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAddingField(false);
                        setNewFieldName("");
                        setNewFieldType("text");
                      }}
                    >
                      Cancel
                    </MLButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!addingField && (
            <button
              onClick={() => setAddingField(true)}
              className="flex items-center gap-2 px-2 py-2 rounded-lg border-[0.5px] border-dashed border-[rgba(0,0,0,0.16)] text-xs font-medium text-[#998d7d] hover:text-[#554e46] hover:border-[rgba(0,0,0,0.3)] hover:bg-black/[0.02] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Custom Field
            </button>
          )}
        </div>

        {/* Save as View */}
        {onSaveAsView && (
          <div className="shrink-0 border-t border-[#d7cfc5] px-3 py-3">
            <AnimatePresence mode="wait">
              {savedToast ? (
                <motion.div
                  key="toast"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-600"
                >
                  <Check className="w-3.5 h-3.5" />
                  View saved
                </motion.div>
              ) : savingView ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-2"
                >
                  <input
                    ref={viewNameInputRef}
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && viewName.trim()) {
                        onSaveAsView(viewName.trim());
                        setViewName("");
                        setSavingView(false);
                        setSavedToast(true);
                        setTimeout(() => setSavedToast(false), 2000);
                      }
                      if (e.key === "Escape") {
                        setSavingView(false);
                        setViewName("");
                      }
                    }}
                    placeholder="View name"
                    className="w-full text-xs font-medium text-[#554e46] bg-white border border-[#d5c8b8] rounded-lg px-2.5 py-2 outline-none focus:border-[#554e46] focus:ring-1 focus:ring-[#554e46]/20"
                    autoFocus
                  />
                  <div className="flex items-center gap-1">
                    <MLButton
                      variant="default"
                      size="sm"
                      disabled={!viewName.trim()}
                      onClick={() => {
                        onSaveAsView(viewName.trim());
                        setViewName("");
                        setSavingView(false);
                        setSavedToast(true);
                        setTimeout(() => setSavedToast(false), 2000);
                      }}
                    >
                      Save View
                    </MLButton>
                    <MLButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSavingView(false);
                        setViewName("");
                      }}
                    >
                      Cancel
                    </MLButton>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSavingView(true)}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg border-[0.5px] border-[rgba(0,0,0,0.16)] bg-white text-xs font-medium text-[#554e46] hover:bg-[#f4f1ed] transition-colors cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save as View
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Sortable column item ─── */

function SortableColumnItem({
  column,
  isHidden,
  onToggle,
  isDragging,
  isCustom,
  onRemove,
  onRename,
}: {
  column: { id: string; label: string; icon?: React.ReactNode };
  isHidden: boolean;
  onToggle: () => void;
  isDragging: boolean;
  isCustom?: boolean;
  onRemove?: () => void;
  onRename?: (newLabel: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
    });

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(column.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commitRename = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== column.label) {
      onRename?.(trimmed);
    }
    setEditing(false);
  };

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-2 py-2 rounded-lg border-[0.5px] transition-colors group/col ${
        isHidden
          ? "bg-black/[0.01] border-[rgba(0,0,0,0.04)] opacity-50"
          : "bg-black/[0.02] border-[rgba(0,0,0,0.08)]"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-[#998d7d] shrink-0" />
      </div>
      {column.icon && (
        <span className={isHidden ? "opacity-60" : ""}>{column.icon}</span>
      )}
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") {
              setEditValue(column.label);
              setEditing(false);
            }
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="flex-1 min-w-0 text-xs font-medium text-[#554e46] bg-white border border-[#d5c8b8] rounded px-1.5 py-0.5 outline-none focus:border-[#554e46] focus:ring-1 focus:ring-[#554e46]/20"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setEditValue(column.label);
            setEditing(true);
          }}
          className={`flex-1 text-xs font-medium select-none ${
            isHidden ? "text-[#998d7d]" : "text-[#554e46]"
          }`}
        >
          {column.label}
          {isCustom && (
            <span className="ml-1 text-[10px] text-[#ac9b85] font-normal">
              custom
            </span>
          )}
        </span>
      )}
      {!editing && (
        <button
          onClick={() => {
            setEditValue(column.label);
            setEditing(true);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1 rounded hover:bg-black/5 transition-colors cursor-pointer opacity-0 group-hover/col:opacity-100"
        >
          <Pencil className="w-3 h-3 text-[#998d7d]" />
        </button>
      )}
      {isCustom && onRemove && !editing && (
        <button
          onClick={onRemove}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1 rounded hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover/col:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
        </button>
      )}
      <button
        onClick={onToggle}
        onPointerDown={(e) => e.stopPropagation()}
        className="p-1 rounded hover:bg-black/5 transition-colors cursor-pointer"
      >
        {isHidden ? (
          <EyeOff className="w-4 h-4 text-[#998d7d]" />
        ) : (
          <Eye className="w-4 h-4 text-[#554e46]" />
        )}
      </button>
    </div>
  );
}
