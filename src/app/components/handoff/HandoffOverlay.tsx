"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useHandoff } from "./HandoffContext";
import { getReactFiber, getOwnerComponent } from "./fiberUtils";

interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function HandoffOverlay() {
  const { isHandoffMode, toggleHandoff, selectElement, componentInfo } =
    useHandoff();
  const hasSelection = !!componentInfo;
  const overlayRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<HighlightRect | null>(null);
  const [selectedRect, setSelectedRect] = useState<HighlightRect | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (componentInfo?.element) {
      const rect = componentInfo.element.getBoundingClientRect();
      setSelectedRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setSelectedRect(null);
    }
  }, [componentInfo]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {

      const overlay = overlayRef.current;
      if (!overlay) return;

      overlay.style.pointerEvents = "none";
      const el = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;
      overlay.style.pointerEvents = "auto";

      if (!el) {
        setHighlight(null);
        setTooltip(null);
        return;
      }

      const fiber = getReactFiber(el);
      const owner = fiber ? getOwnerComponent(fiber) : null;

      const rect = el.getBoundingClientRect();
      setHighlight({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      setTooltip({
        x: e.clientX,
        y: e.clientY,
        name: owner ? owner.name : el.tagName.toLowerCase(),
      });
    },
    [hasSelection]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const overlay = overlayRef.current;
      if (!overlay) return;

      overlay.style.pointerEvents = "none";
      const el = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;
      overlay.style.pointerEvents = "auto";

      if (el) {
        selectElement(el);
      }
    },
    [selectElement]
  );

  useEffect(() => {
    if (!isHandoffMode) {
      setHighlight(null);
      setTooltip(null);
      setSelectedRect(null);
    }
  }, [isHandoffMode]);

  useEffect(() => {
    if (!isHandoffMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleHandoff();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHandoffMode, toggleHandoff]);

  if (!isHandoffMode) return null;

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="fixed inset-0 z-[9999]"
      style={{
        cursor: "crosshair",
        right: hasSelection ? 420 : 0,
      }}
    >
      {/* Subtle outline on selected element only — no fill */}
      {selectedRect && (
        <div
          className="pointer-events-none absolute border border-dashed"
          style={{
            top: selectedRect.top,
            left: selectedRect.left,
            width: selectedRect.width,
            height: selectedRect.height,
            borderColor: "var(--color-brand)",
          }}
        />
      )}

      {highlight && (
        <div
          className="pointer-events-none absolute border-2 transition-all duration-75"
          style={{
            top: highlight.top,
            left: highlight.left,
            width: highlight.width,
            height: highlight.height,
            borderColor: "var(--color-brand)",
            backgroundColor: "rgba(110, 4, 189, 0.05)",
          }}
        />
      )}

      {tooltip && (
        <div
          className="pointer-events-none absolute z-[10000] rounded px-2 py-1 text-[11px] font-medium shadow-md"
          style={{
            top: tooltip.y + 16,
            left: tooltip.x + 12,
            background: "var(--color-brand)",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          &lt;{tooltip.name} /&gt;
        </div>
      )}
    </div>
  );
}
