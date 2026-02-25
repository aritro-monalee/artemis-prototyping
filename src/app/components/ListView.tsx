"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  Search,
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
  EyeOff,
  Tag as TagIcon,
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
import { StatusBadge, LeadSourceBadge } from "./StatusBadge";
import type { ProjectCardData, CustomField } from "@/app/data/projects";
import { getFieldTypeIcon } from "./EditListViewPanel";

/* ─── Column definition type ─── */

export interface ColumnDef {
  id: string;
  label: string;
  icon?: React.ReactNode;
  render: (project: ProjectCardData) => React.ReactNode;
}

/* ─── Cell helpers ─── */

export function CellText({
  children,
  truncate,
}: {
  children: React.ReactNode;
  truncate?: boolean;
}) {
  return (
    <span
      className={`font-medium text-[var(--color-text)] whitespace-nowrap ${
        truncate ? "overflow-hidden text-ellipsis" : ""
      }`}
      style={{ fontSize: "12px", lineHeight: "16px" }}
    >
      {children}
    </span>
  );
}

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
        className="font-medium text-[var(--color-text)] whitespace-nowrap cursor-text min-w-[40px] inline-block"
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
      className="bg-white border border-[#d5c8b8] rounded-md px-1.5 py-0.5 text-xs font-medium text-[var(--color-text)] outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]/20 w-[120px]"
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
          ? "sticky left-0 z-20 bg-[var(--color-surface)] shadow-[inset_-1px_0_0_#d5c8b8,inset_0_-1px_0_#d5c8b8] border-r-0"
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
          className="font-medium text-[var(--color-text)]"
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

/* ─── Built-in column definitions ─── */

export const listColumns: ColumnDef[] = [
  {
    id: "address",
    label: "Address",
    render: (p) => (
      <span
        className="font-medium text-[var(--color-text)] underline decoration-solid flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis"
        style={{ fontSize: "12px", lineHeight: "16px" }}
      >
        {p.address}
      </span>
    ),
  },
  {
    id: "tags",
    label: "Tags",
    icon: <TagIcon className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
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
    icon: <User className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.fullName}</CellText>,
  },
  {
    id: "email",
    label: "Email",
    icon: <AtSign className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText truncate>{p.email}</CellText>,
  },
  {
    id: "installer",
    label: "Installer",
    icon: <Hammer className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.installer}</CellText>,
  },
  {
    id: "team",
    label: "Team",
    icon: <Users className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.team}</CellText>,
  },
  {
    id: "representative",
    label: "Representative",
    icon: <BookUser className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText truncate>{p.representative}</CellText>,
  },
  {
    id: "leadSource",
    label: "Lead Source",
    icon: <Filter className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <LeadSourceBadge>{p.leadSource}</LeadSourceBadge>,
  },
  {
    id: "status",
    label: "Status",
    icon: (
      <DraftingCompass className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />
    ),
    render: (p) => <StatusBadge>{p.status}</StatusBadge>,
  },
  {
    id: "utilityCompany",
    label: "Utility Company",
    icon: <Zap className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.utilityCompany}</CellText>,
  },
  {
    id: "paymentOption",
    label: "Payment Option",
    icon: (
      <DollarSign className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />
    ),
    render: (p) => <CellText truncate>{p.paymentOption}</CellText>,
  },
  {
    id: "applicationId",
    label: "Application ID",
    icon: <FileType2 className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.applicationId}</CellText>,
  },
  {
    id: "signedAt",
    label: "Signed At",
    icon: <Feather className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.signedAt}</CellText>,
  },
  {
    id: "createdOn",
    label: "Created on",
    icon: <Calendar className="w-[14px] h-[14px] text-[var(--color-text)] shrink-0" />,
    render: (p) => <CellText>{p.createdOn}</CellText>,
  },
];

export const listColumnLabels: Record<string, string> = Object.fromEntries(
  listColumns.map((c) => [c.id, c.label])
);

/* ─── ListView component ─── */

export interface ListViewProps {
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
}

export function ListView({
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
}: ListViewProps) {
  const setSelectedRows = onSelectedRowsChange;
  const [allSelected, setAllSelected] = useState(false);
  const [fadingOut, setFadingOut] = useState<Set<string>>(new Set());
  const [fadingIn, setFadingIn] = useState<Set<string>>(new Set());
  const [activeDragColumnId, setActiveDragColumnId] = useState<string | null>(
    null
  );

  const hiddenSet = useMemo(() => new Set(hiddenColumns), [hiddenColumns]);

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

  const orderedVisibleColumns = useMemo(() => {
    const addressCol = allColumns.find((c) => c.id === "address")!;
    const rest = columnOrder
      .filter((id) => id !== "address" && !hiddenSet.has(id))
      .map((id) => allColumns.find((c) => c.id === id)!)
      .filter(Boolean);
    return [addressCol, ...rest];
  }, [columnOrder, hiddenSet, allColumns]);

  const sortableColumnIds = useMemo(
    () =>
      orderedVisibleColumns
        .filter((c) => c.id !== "address" && !fadingOut.has(c.id))
        .map((c) => c.id),
    [orderedVisibleColumns, fadingOut]
  );

  const activeDragColumn = useMemo(
    () =>
      activeDragColumnId
        ? allColumns.find((c) => c.id === activeDragColumnId) ?? null
        : null,
    [activeDragColumnId, allColumns]
  );

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
    <div className="flex-1 flex flex-col min-h-0 border-t border-[rgba(0,0,0,0.08)] overflow-auto bg-[var(--color-bg)] no-scrollbar">
      <DndContext
        sensors={listSensors}
        onDragStart={handleColumnDragStart}
        onDragOver={handleColumnDragOver}
        onDragEnd={handleColumnDragEnd}
        onDragCancel={handleColumnDragCancel}
      >
        <Table className="w-full table-auto">
          <TableHeader className="bg-[var(--color-surface)] sticky top-0 z-10 shadow-[inset_0_-1px_0_#d5c8b8]">
            <SortableContext
              items={sortableColumnIds}
              strategy={horizontalListSortingStrategy}
            >
              <TableRow className="hover:bg-[var(--color-surface)] border-none">
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
                      : "bg-[var(--color-bg)] hover:bg-[#faf8f5]"
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
                                  : "bg-[var(--color-bg)] group-hover/row:bg-[#faf8f5]"
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

        <DragOverlay dropAnimation={null}>
          {activeDragColumn ? (
            <div className="bg-[var(--color-surface)] border border-[#d5c8b8] rounded-lg px-3 py-3 shadow-lg flex items-center gap-[10px] whitespace-nowrap">
              {activeDragColumn.icon}
              <span
                className="font-medium text-[var(--color-text)]"
                style={{ fontSize: "12px", lineHeight: "16px" }}
              >
                {activeDragColumn.label}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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
            <p className="text-[var(--color-text-secondary)] mt-1" style={{ fontSize: "12px" }}>
              Try a different search term
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
