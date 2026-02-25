"use client";

import { Search } from "lucide-react";
import { predefinedLabels } from "@/app/data/projects";

export function LabelContextBoxSearch() {
  return (
    <div className="flex items-center gap-1.5 bg-white border-[0.5px] border-[var(--color-border)] rounded-lg pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
      <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
      <input
        type="text"
        className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
        placeholder="Search Labels"
      />
    </div>
  );
}

export function LabelContextBoxChips() {
  const handleDragStart = (e: React.DragEvent, label: typeof predefinedLabels[0]) => {
    e.dataTransfer.setData("application/label-id", label.id);
    e.dataTransfer.effectAllowed = "copy";
    const ghost = document.createElement("div");
    ghost.textContent = label.name;
    Object.assign(ghost.style, {
      backgroundColor: label.color,
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1",
      padding: "4px",
      borderRadius: "6px",
      whiteSpace: "nowrap",
      position: "fixed",
      top: "-1000px",
      left: "-1000px",
    });
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);
    requestAnimationFrame(() => document.body.removeChild(ghost));
  };

  return (
    <div className="flex flex-wrap gap-1.5 w-full">
      {predefinedLabels.map((label) => (
        <div
          key={label.id}
          draggable
          onDragStart={(e) => handleDragStart(e, label)}
          className="flex items-center justify-center p-1 rounded-[6px] cursor-grab active:cursor-grabbing"
          style={{ backgroundColor: label.color }}
        >
          <span className="text-[11px] font-semibold text-white leading-none whitespace-nowrap">
            {label.name}
          </span>
        </div>
      ))}
    </div>
  );
}
