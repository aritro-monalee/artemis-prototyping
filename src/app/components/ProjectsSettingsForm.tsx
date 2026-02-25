"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

/* ── Tag color helpers ── */

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getTagStyles(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return {
    bg: `rgba(${r}, ${g}, ${b}, 0.12)`,
    border: hex,
    text: `rgb(${Math.round(r * 0.55)}, ${Math.round(g * 0.55)}, ${Math.round(b * 0.55)})`,
  };
}

/* ── Tag data ── */

interface TagDef {
  id: string;
  name: string;
  color: string;
}

const predefinedTags: TagDef[] = [
  { id: "on-hold", name: "On Hold", color: "#ea580c" },
  { id: "lost", name: "Lost", color: "#c43750" },
  { id: "change-order", name: "Change Order", color: "#059669" },
];

const TAG_COLORS_ROW1 = [
  "#000000",
  "#525252",
  "#eb4260",
  "#ea580c",
  "#059669",
  "#d97706",
];
const TAG_COLORS_ROW2 = [
  "#5bb59f",
  "#499fcf",
  "#8b5cf6",
  "#c026d3",
  "#ffffff",
];
const ALL_TAG_COLORS = [...TAG_COLORS_ROW1, ...TAG_COLORS_ROW2];

const RAINBOW_GRADIENT =
  "conic-gradient(#ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)";

const TAG_LAYOUT_TRANSITION = {
  layout: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
};

const TAG_COLS = 4;

function TagPill({ name, color }: { name: string; color: string }) {
  const s = getTagStyles(color);
  return (
    <div
      className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      style={{ backgroundColor: s.bg, borderColor: s.border }}
    >
      <span
        className="text-xs font-medium leading-none whitespace-nowrap select-none"
        style={{ color: s.text }}
      >
        {name}
      </span>
    </div>
  );
}

function TagCell({
  tag,
  popoverOpen,
  onOpen,
  onDismiss,
  onUpdate,
  onRemove,
}: {
  tag: TagDef;
  popoverOpen: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onUpdate: (patch: Partial<TagDef>) => void;
  onRemove: () => void;
}) {
  const [editName, setEditName] = useState(tag.name);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);

  useEffect(() => {
    if (measureRef.current) setInputWidth(measureRef.current.offsetWidth);
  }, [editName, popoverOpen]);

  useEffect(() => {
    if (popoverOpen) {
      setEditName(tag.name);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 80);
    }
  }, [popoverOpen, tag.name]);

  const commitName = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== tag.name) onUpdate({ name: trimmed });
    else setEditName(tag.name);
  };

  const s = getTagStyles(tag.color);

  return (
    <div
      className="relative flex items-center justify-center py-[60px] px-[10px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && !popoverOpen && (
        <button
          className="absolute top-[4px] right-[4px] bg-cream-100 p-[4px] rounded-[6px] flex items-center cursor-pointer hover:bg-cream-200 transition-colors z-[5]"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 className="w-[16px] h-[16px] text-cream-800" />
        </button>
      )}

      {!popoverOpen ? (
        <motion.div
          layoutId={`tag-${tag.id}`}
          layout="position"
          transition={TAG_LAYOUT_TRANSITION}
        >
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <TagPill name={tag.name} color={tag.color} />
          </button>
        </motion.div>
      ) : (
        <div style={{ visibility: "hidden" }}>
          <TagPill name={tag.name} color={tag.color} />
        </div>
      )}

      <AnimatePresence>
        {popoverOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
            style={{
              boxShadow:
                "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center p-[8px] border-b-[0.5px] border-[#d5c8b8]">
              <motion.div
                layoutId={`tag-${tag.id}`}
                layout="position"
                transition={TAG_LAYOUT_TRANSITION}
              >
                <div
                  className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border overflow-clip shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                  style={{
                    backgroundColor: s.bg,
                    borderColor: s.border,
                  }}
                >
                  <span
                    ref={measureRef}
                    className="text-xs font-medium leading-none whitespace-nowrap select-none"
                    style={{
                      position: "absolute",
                      visibility: "hidden",
                      pointerEvents: "none",
                    }}
                    aria-hidden
                  >
                    {editName || "W"}
                  </span>
                  <input
                    ref={inputRef}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={commitName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        commitName();
                        onDismiss();
                      }
                      if (e.key === "Escape") {
                        setEditName(tag.name);
                        onDismiss();
                      }
                    }}
                    className="bg-transparent text-xs font-medium leading-none text-center outline-none caret-current"
                    style={{
                      color: s.text,
                      width: inputWidth ? `${inputWidth}px` : "auto",
                      padding: 0,
                      margin: 0,
                      height: "14px",
                      border: "none",
                      minWidth: 0,
                      maxWidth: "200px",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-[10.8px] p-[8px]">
              <div className="flex items-center gap-[8px]">
                {TAG_COLORS_ROW1.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdate({ color: c })}
                    className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      outline:
                        c === tag.color ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                      border:
                        c === "#ffffff"
                          ? "1px solid rgba(0,0,0,0.12)"
                          : "none",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-[8px]">
                {TAG_COLORS_ROW2.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdate({ color: c })}
                    className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      outline:
                        c === tag.color
                          ? `2px solid ${c === "#ffffff" ? "#999" : c}`
                          : "none",
                      outlineOffset: 2,
                      border:
                        c === "#ffffff"
                          ? "1px solid rgba(0,0,0,0.12)"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NewTagPopover({
  onSave,
  onCancel,
}: {
  onSave: (name: string, color: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(TAG_COLORS_ROW1[4]);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    if (measureRef.current) setInputWidth(measureRef.current.offsetWidth);
  }, [name]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed) onSave(trimmed, color);
  };

  const s = getTagStyles(color);

  return (
    <div className="relative flex items-center justify-center py-[60px] px-[10px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 8 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
        style={{
          boxShadow:
            "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center p-[8px] border-b-[0.5px] border-[#d5c8b8]">
          <div
            className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border overflow-clip shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            style={{
              backgroundColor: s.bg,
              borderColor: s.border,
            }}
          >
            <span
              ref={measureRef}
              className="text-xs font-medium leading-none whitespace-nowrap select-none"
              style={{
                position: "absolute",
                visibility: "hidden",
                pointerEvents: "none",
              }}
              aria-hidden
            >
              {name || "New Tag"}
            </span>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") onCancel();
              }}
              placeholder="New Tag"
              className="bg-transparent text-xs font-medium leading-none text-center outline-none caret-current placeholder:opacity-40"
              style={{
                color: s.text,
                width: inputWidth ? `${inputWidth}px` : "auto",
                padding: 0,
                margin: 0,
                height: "14px",
                border: "none",
                minWidth: 0,
                maxWidth: "200px",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-[10.8px] p-[8px] border-b-[0.5px] border-[#d5c8b8]">
          <div className="flex items-center gap-[8px]">
            {TAG_COLORS_ROW1.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: c,
                  outline: c === color ? `2px solid ${c}` : "none",
                  outlineOffset: 2,
                  border:
                    c === "#ffffff"
                      ? "1px solid rgba(0,0,0,0.12)"
                      : "none",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-[8px]">
            {TAG_COLORS_ROW2.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: c,
                  outline:
                    c === color
                      ? `2px solid ${c === "#ffffff" ? "#999" : c}`
                      : "none",
                  outlineOffset: 2,
                  border:
                    c === "#ffffff"
                      ? "1px solid rgba(0,0,0,0.12)"
                      : "none",
                }}
              />
            ))}
            <button
              className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer relative border-[1px] border-[rgba(0,0,0,0.08)]"
              style={{
                background: RAINBOW_GRADIENT,
                outline: !ALL_TAG_COLORS.includes(color)
                  ? `2px solid ${color}`
                  : "none",
                outlineOffset: 2,
              }}
              onClick={() => colorInputRef.current?.click()}
            >
              <input
                ref={colorInputRef}
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-[8px]">
          <button
            onClick={handleSave}
            className="text-[12px] font-medium leading-[16px] text-[#7b6f60] cursor-pointer hover:text-cream-900 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-[12px] font-medium leading-[16px] text-[rgba(123,111,96,0.4)] cursor-pointer hover:text-[#7b6f60] transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

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
            <span className="text-sm text-[#554e46] text-left truncate font-medium">
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
                <label className="text-xs font-medium text-[#7b6f60]">Title</label>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[#554e46] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[#6e04bd] transition-colors"
                  placeholder="Checklist item title"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#7b6f60]">Subtext</label>
                <input
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[#554e46] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[#6e04bd] transition-colors"
                  placeholder="Description shown below the title"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#7b6f60]">CTA Label</label>
                <input
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  onBlur={commitChanges}
                  onKeyDown={(e) => { if (e.key === "Enter") commitChanges(); }}
                  className="text-sm text-[#554e46] bg-white border border-[#e8e2da] rounded-md px-3 py-2 outline-none focus:border-[#6e04bd] transition-colors"
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
                      : "bg-cream-200/60 text-[#7b6f60] hover:bg-cream-200 border border-transparent"
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
          ? "border-[#6e04bd] opacity-40"
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
          <span className="text-sm font-medium text-[#554e46] truncate">
            {stage.title}
          </span>
          <span className="text-xs text-[#7b6f60] shrink-0">
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
                className="flex-1 text-sm text-[#554e46] bg-transparent outline-none border-b border-[#6e04bd] pb-0.5 placeholder:text-cream-400"
              />
              <button
                onClick={() => onAddItemToGroup(stage.id)}
                className="text-xs font-medium text-[#6e04bd] cursor-pointer hover:underline shrink-0"
              >
                Add
              </button>
              <button
                onClick={() => {
                  onSetAddingItemToGroup(null);
                  onSetNewItemLabel("");
                }}
                className="text-xs font-medium text-[#7b6f60] cursor-pointer hover:underline shrink-0"
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
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#7b6f60] hover:text-[#554e46] hover:bg-cream-50 transition-colors w-full cursor-pointer"
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

export function ProjectsSettingsForm() {
  const [tags, setTags] = useState<TagDef[]>([...predefinedTags]);
  const [openTagId, setOpenTagId] = useState<string | null>(null);
  const [addingTag, setAddingTag] = useState(false);
  const tagPopoverOpen = openTagId !== null || addingTag;

  const dismissAllTags = () => {
    setOpenTagId(null);
    setAddingTag(false);
  };

  const updateTag = (id: string, patch: Partial<TagDef>) => {
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const removeTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    setOpenTagId(null);
  };

  const handleNewTagSave = (name: string, color: string) => {
    if (!tags.some((t) => t.name === name)) {
      setTags((prev) => [
        ...prev,
        { id: name.toLowerCase().replace(/\s+/g, "-"), name, color },
      ]);
    }
    setAddingTag(false);
  };

  const tagTotalItems = tags.length + 1;
  const tagTotalRows = Math.ceil(tagTotalItems / TAG_COLS);

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

  return (
    <div className="flex flex-col gap-8 max-w-[1024px] pb-16">
      {/* ── Tags ── */}
      <section className="flex flex-col gap-5 relative">
        <h2 className="text-base font-semibold text-[#554e46]">Project Tags</h2>

        {tagPopoverOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              dismissAllTags();
            }}
          />
        )}

        <div className="rounded-xl bg-cream-100 relative">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${TAG_COLS}, 1fr)` }}
          >
            {tags.map((tag, i) => {
              const col = i % TAG_COLS;
              const row = Math.floor(i / TAG_COLS);
              return (
                <div
                  key={tag.id}
                  style={{
                    borderRightWidth: col < TAG_COLS - 1 ? 1 : 0,
                    borderBottomWidth: row < tagTotalRows - 1 ? 1 : 0,
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,0.06)",
                  }}
                >
                  <TagCell
                    tag={tag}
                    popoverOpen={openTagId === tag.id}
                    onOpen={() => {
                      setAddingTag(false);
                      setOpenTagId(tag.id);
                    }}
                    onDismiss={dismissAllTags}
                    onUpdate={(patch) => updateTag(tag.id, patch)}
                    onRemove={() => removeTag(tag.id)}
                  />
                </div>
              );
            })}

            <div
              style={{
                borderRightWidth:
                  tags.length % TAG_COLS < TAG_COLS - 1 ? 1 : 0,
                borderBottomWidth: 0,
                borderStyle: "solid",
                borderColor: "rgba(0,0,0,0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                {addingTag ? (
                  <NewTagPopover
                    key="new-tag-popover"
                    onSave={handleNewTagSave}
                    onCancel={() => setAddingTag(false)}
                  />
                ) : (
                  <motion.button
                    key="add-tag-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => {
                      dismissAllTags();
                      setAddingTag(true);
                    }}
                    className="w-full flex items-center justify-center py-[60px] px-[10px] hover:bg-cream-200/40 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cream-600" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-[#e8e2da]" />

      {/* ── Project Checklist ── */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-[#554e46]">
            Project Checklist
          </h2>
          <p className="text-sm text-muted-foreground leading-5">
            Checklist items grouped by pipeline stage. Drag to reorder
            sections. Add a new stage in the Pipeline tab and it will appear
            here automatically.
          </p>
        </div>

        {/* Pre Sale */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#7b6f60] uppercase tracking-wide">
            Pre Sale
          </h3>
          <DndContext
            sensors={dndSensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handlePresaleDragEnd}
          >
            <SortableContext
              items={orderedPresale.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {orderedPresale.map((stage) => {
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

            <DragOverlay dropAnimation={null}>
              {dragActiveStage ? (
                <div className="rounded-lg border border-[#6e04bd] bg-[#fefbf7] shadow-lg px-4 py-3 flex items-center gap-2 opacity-95">
                  <GripVertical className="w-3.5 h-3.5 text-cream-600 shrink-0" />
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dragActiveStage.color }}
                  />
                  <span className="text-sm font-medium text-[#554e46]">
                    {dragActiveStage.title}
                  </span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Post Sale */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#7b6f60] uppercase tracking-wide">
            Post Sale
          </h3>
          <DndContext
            sensors={dndSensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handlePostsaleDragEnd}
          >
            <SortableContext
              items={orderedPostsale.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {orderedPostsale.map((stage) => {
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

            <DragOverlay dropAnimation={null}>
              {dragActiveStage ? (
                <div className="rounded-lg border border-[#6e04bd] bg-[#fefbf7] shadow-lg px-4 py-3 flex items-center gap-2 opacity-95">
                  <GripVertical className="w-3.5 h-3.5 text-cream-600 shrink-0" />
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dragActiveStage.color }}
                  />
                  <span className="text-sm font-medium text-[#554e46]">
                    {dragActiveStage.title}
                  </span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </section>
    </div>
  );
}
