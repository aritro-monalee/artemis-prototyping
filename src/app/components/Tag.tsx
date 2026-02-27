"use client";

import { cn } from "../lib/ui";
import { useProjectStore } from "@/app/store/ProjectStore";

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

interface TagProps {
  type: string;
  reason?: string;
}

export function Tag({ type, reason }: TagProps) {
  const { tagDefs } = useProjectStore();

  const def = tagDefs.find((t) => t.name === type);
  const color = def?.color ?? "#525252";
  const styles = getTagStyles(color);

  return (
    <div
      className={cn(
        "px-2 py-[3px] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-1 overflow-hidden border",
      )}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
      }}
    >
      <div
        className="justify-start text-xs font-medium leading-none font-['Inter']"
        style={{ color: styles.text }}
      >
        {type}
      </div>
      {reason && (
        <div
          className="justify-start text-xs font-medium leading-none font-['Inter'] opacity-60"
          style={{ color: styles.text }}
        >
          {reason}
        </div>
      )}
    </div>
  );
}
