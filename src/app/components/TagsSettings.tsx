"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TAG_LAYOUT_TRANSITION_SETTINGS } from "@/app/data/constants";

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
          transition={TAG_LAYOUT_TRANSITION_SETTINGS}
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
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
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
                transition={TAG_LAYOUT_TRANSITION_SETTINGS}
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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
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
            className="text-[12px] font-medium leading-[16px] text-[var(--color-text-muted)] cursor-pointer hover:text-cream-900 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-[12px] font-medium leading-[16px] text-[rgba(123,111,96,0.4)] cursor-pointer hover:text-[var(--color-text-muted)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function TagsSettings() {
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

  return (
    <section className="flex flex-col gap-5 relative">
      <h2 className="text-base font-semibold text-[var(--color-text)]">Project Tags</h2>

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
  );
}
