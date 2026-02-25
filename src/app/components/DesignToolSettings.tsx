"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, Plus, Eye, EyeOff, Trash2 } from "lucide-react";
import { predefinedLabels, type LabelDef } from "@/app/data/projects";
import { motion, AnimatePresence } from "framer-motion";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors ${
        checked ? "bg-artemis-600" : "bg-cream-800"
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function AccordionItem({
  label,
  rightContent,
  children,
}: {
  label: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-cream-100 hover:bg-cream-200/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <ChevronRight
            className={`w-3.5 h-3.5 text-cream-800 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
          <span className="text-sm text-cream-900">{label}</span>
        </div>
        {rightContent && <div onClick={(e) => e.stopPropagation()}>{rightContent}</div>}
      </button>
      {open && children && <div className="px-4 pb-3 pt-2 ml-6">{children}</div>}
    </div>
  );
}

const LABEL_COLORS_ROW1 = ["#000000", "#525252", "#eb4260", "#ea580c", "#059669", "#d97706"];
const LABEL_COLORS_ROW2 = ["#5bb59f", "#499fcf", "#8b5cf6", "#c026d3", "#ffffff"];
const ALL_LABEL_COLORS = [...LABEL_COLORS_ROW1, ...LABEL_COLORS_ROW2];

const RAINBOW_GRADIENT = "conic-gradient(#ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #8800ff, #ff0000)";

const LAYOUT_TRANSITION = { layout: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const } };

interface LabelState extends LabelDef {
  visibility: "public" | "private";
}

/* ── Existing label cell (simple popover: badge + colors, immediate update) ── */

function LabelCell({
  label,
  popoverOpen,
  onOpen,
  onDismiss,
  onUpdate,
  onRemove,
  onToggleVisibility,
}: {
  label: LabelState;
  popoverOpen: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onUpdate: (patch: Partial<LabelState>) => void;
  onRemove: () => void;
  onToggleVisibility: () => void;
}) {
  const [editName, setEditName] = useState(label.name);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth);
    }
  }, [editName, popoverOpen]);

  useEffect(() => {
    if (popoverOpen) {
      setEditName(label.name);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 80);
    }
  }, [popoverOpen, label.name]);

  const commitName = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== label.name) onUpdate({ name: trimmed });
    else setEditName(label.name);
  };

  const isPrivate = label.visibility === "private";

  return (
    <div
      className="relative flex items-center justify-center py-[60px] px-[10px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Eye / EyeOff icon — top left */}
      {hovered && !popoverOpen && (
        <button
          className="absolute top-[4px] left-[4px] bg-cream-100 p-[4px] rounded-[6px] flex items-center cursor-pointer hover:bg-cream-200 transition-colors z-[5]"
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
        >
          {isPrivate ? (
            <EyeOff className="w-[16px] h-[16px] text-cream-800" />
          ) : (
            <Eye className="w-[16px] h-[16px] text-cream-800" />
          )}
        </button>
      )}

      {/* Trash icon — top right */}
      {hovered && !popoverOpen && (
        <button
          className="absolute top-[4px] right-[4px] bg-cream-100 p-[4px] rounded-[6px] flex items-center cursor-pointer hover:bg-cream-200 transition-colors z-[5]"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
        >
          <Trash2 className="w-[16px] h-[16px] text-cream-800" />
        </button>
      )}

      {/* Badge in grid */}
      {!popoverOpen ? (
        <motion.div layoutId={`label-${label.id}`} layout="position" transition={LAYOUT_TRANSITION}>
          <button className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
            <div
              className="inline-flex items-center justify-center gap-[2px] p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)]"
              style={{
                backgroundColor: label.color,
                boxShadow: isPrivate
                  ? "0px 1px 2px 0px rgba(0,0,0,0.05)"
                  : "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
              }}
            >
              <span className="text-[12px] font-semibold text-white leading-none whitespace-nowrap select-none">
                {label.name}
              </span>
              <AnimatePresence>
                {isPrivate && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 12, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="inline-flex items-center justify-center overflow-hidden shrink-0"
                  >
                    <EyeOff className="w-[12px] h-[12px] shrink-0 text-white opacity-40" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      ) : (
        <div style={{ visibility: "hidden" }}>
          <div className="inline-flex items-center justify-center gap-[2px] p-1 rounded-[4px]">
            <span className="text-[12px] font-semibold leading-none whitespace-nowrap">{label.name}</span>
            {isPrivate && <EyeOff className="w-[9px] h-[9px] shrink-0" />}
          </div>
        </div>
      )}

      {/* Popover — edit existing label: editable badge + color dots */}
      <AnimatePresence>
        {popoverOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
            style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editable badge */}
            <div className="flex items-center justify-center p-[8px] border-b-[0.5px] border-[#d5c8b8]">
              <motion.div layoutId={`label-${label.id}`} layout="position" transition={LAYOUT_TRANSITION}>
                <div
                  className="inline-flex items-center justify-center gap-1 p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] overflow-clip"
                  style={{
                    backgroundColor: label.color,
                    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    ref={measureRef}
                    className="text-[12px] font-semibold leading-none whitespace-nowrap select-none"
                    style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}
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
                      if (e.key === "Enter") { commitName(); onDismiss(); }
                      if (e.key === "Escape") { setEditName(label.name); onDismiss(); }
                    }}
                    className="bg-transparent text-[12px] font-semibold text-white leading-none text-center outline-none placeholder:text-white/40 caret-white"
                    style={{ width: inputWidth ? `${inputWidth}px` : "auto", padding: 0, margin: 0, height: "12px", border: "none", minWidth: 0, maxWidth: "200px" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Color dots — immediate update */}
            <div className="flex flex-col items-center gap-[10.8px] p-[8px]">
              <div className="flex items-center gap-[8px]">
                {LABEL_COLORS_ROW1.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdate({ color: c })}
                    className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      outline: c === label.color ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                      border: c === "#ffffff" ? "1px solid rgba(0,0,0,0.12)" : "none",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-[8px]">
                {LABEL_COLORS_ROW2.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdate({ color: c })}
                    className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: c,
                      outline: c === label.color ? `2px solid ${c === "#ffffff" ? "#999" : c}` : "none",
                      outlineOffset: 2,
                      border: c === "#ffffff" ? "1px solid rgba(0,0,0,0.12)" : "none",
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

/* ── New label popover (Figma design: badge + colors + rainbow + Save/Cancel) ── */

function NewLabelPopover({
  onSave,
  onCancel,
}: {
  onSave: (name: string, color: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(LABEL_COLORS_ROW1[4]);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth);
    }
  }, [name]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed) onSave(trimmed, color);
  };

  return (
    <div className="relative flex items-center justify-center py-[60px] px-[10px]">
      {/* Popover centered in cell */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] overflow-clip"
        style={{ boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editable badge */}
        <div className="flex items-center justify-center p-[8px] border-b-[0.5px] border-[#d5c8b8]">
          <div
            className="inline-flex items-center justify-center gap-1 p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] overflow-clip"
            style={{
              backgroundColor: color,
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
            }}
          >
            <span
              ref={measureRef}
              className="text-[12px] font-semibold leading-none whitespace-nowrap select-none"
              style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}
              aria-hidden
            >
              {name || "New Label"}
            </span>
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") onCancel();
              }}
              placeholder="New Label"
              className="bg-transparent text-[12px] font-semibold text-white leading-none text-center outline-none placeholder:text-white/40 caret-white"
              style={{ width: inputWidth ? `${inputWidth}px` : "auto", padding: 0, margin: 0, height: "12px", border: "none", minWidth: 0, maxWidth: "200px" }}
            />
          </div>
        </div>

        {/* Color dots */}
        <div className="flex flex-col items-center gap-[10.8px] p-[8px] border-b-[0.5px] border-[#d5c8b8]">
          <div className="flex items-center gap-[8px]">
            {LABEL_COLORS_ROW1.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: c,
                  outline: c === color ? `2px solid ${c}` : "none",
                  outlineOffset: 2,
                  border: c === "#ffffff" ? "1px solid rgba(0,0,0,0.12)" : "none",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-[8px]">
            {LABEL_COLORS_ROW2.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: c,
                  outline: c === color ? `2px solid ${c === "#ffffff" ? "#999" : c}` : "none",
                  outlineOffset: 2,
                  border: c === "#ffffff" ? "1px solid rgba(0,0,0,0.12)" : "none",
                }}
              />
            ))}
            {/* Rainbow color wheel — opens native picker */}
            <button
              className="w-[20px] h-[20px] rounded-full transition-transform hover:scale-110 cursor-pointer relative border-[1px] border-[rgba(0,0,0,0.08)]"
              style={{
                background: RAINBOW_GRADIENT,
                outline: !ALL_LABEL_COLORS.includes(color) ? `2px solid ${color}` : "none",
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

        {/* Save / Cancel */}
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

export function DesignToolSettings() {
  const [fireSetbacks, setFireSetbacks] = useState(false);
  const [labels, setLabels] = useState<LabelState[]>(
    predefinedLabels.map((l) => ({ ...l, visibility: "public" as const }))
  );
  const [openLabelId, setOpenLabelId] = useState<string | null>(null);
  const [addingLabel, setAddingLabel] = useState(false);

  const popoverOpen = openLabelId !== null || addingLabel;

  const dismissAll = () => {
    setOpenLabelId(null);
    setAddingLabel(false);
  };

  const updateLabel = (id: string, patch: Partial<LabelState>) => {
    setLabels((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const removeLabel = (id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
    setOpenLabelId(null);
  };

  const toggleVisibility = (id: string) => {
    setLabels((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, visibility: l.visibility === "public" ? "private" : "public" } : l
      )
    );
  };

  const handleNewLabelSave = (name: string, color: string) => {
    if (!labels.some((l) => l.name === name)) {
      setLabels((prev) => [
        ...prev,
        { id: name.toLowerCase().replace(/\s+/g, "-"), name, color, visibility: "public" },
      ]);
    }
    setAddingLabel(false);
  };

  const cols = 4;
  const totalItems = labels.length + 1;
  const totalRows = Math.ceil(totalItems / cols);

  return (
    <div className="flex flex-col gap-8 max-w-[960px]">
      {/* Click-away overlay */}
      {popoverOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={(e) => { e.stopPropagation(); dismissAll(); }}
        />
      )}

      {/* System Settings */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-cream-900">System Settings</h2>
        <div className="flex flex-col gap-1.5">
          <AccordionItem label="Solar Panels">
            <div className="text-sm text-cream-700">Configure solar panel models and specifications.</div>
          </AccordionItem>
          <AccordionItem
            label="Fire Setbacks"
            rightContent={<Toggle checked={fireSetbacks} onChange={setFireSetbacks} />}
          >
            <div className="text-sm text-cream-700">Enable or disable fire setback requirements for roof layouts.</div>
          </AccordionItem>
          <AccordionItem
            label="System Losses"
            rightContent={<span className="text-sm text-cream-800">11.4%</span>}
          >
            <div className="text-sm text-cream-700">Adjust default system loss percentage for energy production estimates.</div>
          </AccordionItem>
        </div>
      </div>

      {/* Preferences */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-cream-900">Preferences</h2>
        <div className="flex flex-col gap-1.5">
          <AccordionItem label="System Settings">
            <div className="text-sm text-cream-700">General system preferences and configuration.</div>
          </AccordionItem>
          <AccordionItem
            label="Target Production Offset"
            rightContent={<span className="text-sm text-cream-800">80%</span>}
          >
            <div className="text-sm text-cream-700">Set the target production offset for system sizing.</div>
          </AccordionItem>
          <AccordionItem label="Design Settings">
            <div className="text-sm text-cream-700">Configure default design tool behavior and preferences.</div>
          </AccordionItem>
        </div>
      </div>

      {/* Labels */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-cream-900">Labels</h2>

        <div className="rounded-xl bg-cream-100 relative">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {labels.map((label, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              return (
                <div
                  key={label.id}
                  style={{
                    borderRightWidth: col < cols - 1 ? 1 : 0,
                    borderBottomWidth: row < totalRows - 1 ? 1 : 0,
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,0.06)",
                  }}
                >
                  <LabelCell
                    label={label}
                    popoverOpen={openLabelId === label.id}
                    onOpen={() => { setAddingLabel(false); setOpenLabelId(label.id); }}
                    onDismiss={dismissAll}
                    onUpdate={(patch) => updateLabel(label.id, patch)}
                    onRemove={() => removeLabel(label.id)}
                    onToggleVisibility={() => toggleVisibility(label.id)}
                  />
                </div>
              );
            })}

            {/* Add cell */}
            <div
              style={{
                borderRightWidth: (labels.length) % cols < cols - 1 ? 1 : 0,
                borderBottomWidth: 0,
                borderStyle: "solid",
                borderColor: "rgba(0,0,0,0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                {addingLabel ? (
                  <NewLabelPopover
                    key="new-label-popover"
                    onSave={handleNewLabelSave}
                    onCancel={() => setAddingLabel(false)}
                  />
                ) : (
                  <motion.button
                    key="add-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => { dismissAll(); setAddingLabel(true); }}
                    className="w-full flex items-center justify-center py-[60px] px-[10px] hover:bg-cream-200/40 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cream-600" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
