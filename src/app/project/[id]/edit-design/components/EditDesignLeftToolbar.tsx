"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function EditDesignLeftToolbar({
  annotationSub,
  setAnnotationSub,
}: {
  annotationSub: "notes" | "label" | null;
  setAnnotationSub: (v: "notes" | "label" | null) => void;
}) {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const submenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const annotationBtnRef = useRef<HTMLButtonElement>(null);

  const toolGroups = [
    [
      { id: "roofplane", label: "Roof Plane", shortcut: "R", svg: "/icons/design-mode-icons.svg" },
      { id: "obstacle", label: "Obstacle", shortcut: "O", svg: "/icons/design-mode-icons-1.svg" },
      { id: "tree", label: "Tree", shortcut: "T", svg: "/icons/design-mode-icons-2.svg" },
    ],
    [
      { id: "panel", label: "Panel", shortcut: "P", svg: "/icons/design-mode-icons-3.svg?v=2" },
      { id: "groundmount", label: "Ground Mount", shortcut: "G", svg: "/icons/design-mode-icons-4.svg" },
      { id: "wiring", label: "Wiring", shortcut: "W", svg: "/icons/design-mode-icons-5.svg" },
      { id: "inverter", label: "Inverter", shortcut: "I", svg: "/icons/design-mode-icons-6.svg" },
      { id: "equipment", label: "Equipment", shortcut: "E", svg: "/icons/design-mode-icons-7.svg" },
    ],
    [
      { id: "ruler", label: "Ruler", shortcut: "R", svg: "/icons/design-mode-icons-8.svg" },
      { id: "annotation", label: "Annotations", shortcut: "A", svg: "/icons/design-mode-icons-9.svg" },
    ],
  ];

  function handleToolClick(toolId: string) {
    if (submenuTimerRef.current) clearTimeout(submenuTimerRef.current);
    if (activeTool === toolId) {
      setActiveTool(null);
      setExpanded(false);
      dismissSubmenu();
    } else {
      setActiveTool(toolId);
      setExpanded(true);
      if (toolId === "annotation") {
        setShowSubmenu(true);
      } else {
        setAnnotationSub(null);
        dismissSubmenu();
      }
    }
  }

  function dismissSubmenu() {
    setShowSubmenu(false);
    submenuTimerRef.current = setTimeout(() => {
      setShowSubmenu(false);
    }, 150);
  }

  return (
    <div className="absolute left-[13px] top-1/2 -translate-y-1/2 z-10 flex items-start gap-2">
      <div
        className="flex flex-col bg-[var(--color-bg)] rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-[width] duration-200"
        style={{ width: expanded ? 154 : 36 }}
      >
        <div className="flex flex-col gap-0 py-1 overflow-hidden w-full">
          {toolGroups.map((group, gi) => (
            <div key={gi} className="w-full">
              {gi > 0 && (
                <div className="py-1 w-full">
                  <div className="h-px w-full bg-[var(--color-border-alt)]" />
                </div>
              )}
              <div className="flex flex-col gap-1 px-1 w-full">
                {group.map((tool) => {
                  const isActive = activeTool === tool.id || (tool.id === "annotation" && annotationSub !== null);
                  return (
                    <button
                      key={tool.id}
                      ref={tool.id === "annotation" ? annotationBtnRef : undefined}
                      onClick={() => handleToolClick(tool.id)}
                    className={`relative flex items-center rounded-md h-7 transition-colors ${
                      expanded ? "w-full" : "w-7 justify-center"
                    } ${
                      isActive
                        ? expanded ? "bg-[#f2e2ff]" : "bg-[rgba(110,4,189,0.22)]"
                        : "hover:bg-[var(--color-surface)]"
                    }`}
                      title={expanded ? undefined : tool.label}
                    >
                      <span
                        className="w-7 h-7 shrink-0 inline-block"
                        style={{
                          backgroundColor: isActive ? "var(--color-brand)" : "var(--color-text)",
                          WebkitMaskImage: `url(${tool.svg})`,
                          maskImage: `url(${tool.svg})`,
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                          transition: "background-color 150ms",
                        }}
                      />
                      {expanded && (
                        <>
                          <span
                            className={`text-xs font-medium truncate text-left ${
                              isActive ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
                            }`}
                          >
                            {tool.label}
                          </span>
                          <span
                            className={`absolute right-2 opacity-40 inline-flex items-center justify-center w-3 h-3 rounded-[2px] border text-[8px] font-semibold leading-none ${
                              isActive
                                ? "border-[#2a226a] text-[#2a226a]"
                                : "border-[var(--color-text)] text-[var(--color-text)]"
                            }`}
                          >
                            {tool.shortcut}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[var(--color-bg)] flex items-center justify-center p-1 h-[38.5px]">
          <button
            onClick={() => { setExpanded(!expanded); if (expanded) { setActiveTool(null); setShowSubmenu(false); } }}
            className="bg-[#e2deff] flex-1 flex items-center justify-center rounded-md h-full"
          >
            {expanded ? (
              <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-text)]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text)]" />
            )}
          </button>
        </div>
      </div>

      {(activeTool === "annotation" || showSubmenu) && (
        <AnnotationSubmenu
          selected={annotationSub}
          visible={activeTool === "annotation" && showSubmenu}
          onSelect={(v) => {
            setAnnotationSub(v);
            setActiveTool(null);
            setExpanded(false);
            if (submenuTimerRef.current) clearTimeout(submenuTimerRef.current);
            submenuTimerRef.current = setTimeout(() => setShowSubmenu(false), 200);
          }}
          annotationBtnRef={annotationBtnRef}
        />
      )}
    </div>
  );
}

function AnnotationSubmenu({
  selected,
  onSelect,
  annotationBtnRef,
  visible,
}: {
  selected: "notes" | "label" | null;
  onSelect: (v: "notes" | "label") => void;
  annotationBtnRef: React.RefObject<HTMLButtonElement | null>;
  visible: boolean;
}) {
  const [topOffset, setTopOffset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (annotationBtnRef.current && containerRef.current) {
      const btnRect = annotationBtnRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setTopOffset(btnRect.top - containerRect.top - 4);
      }
    }
  }, [annotationBtnRef]);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    } else {
      setMounted(false);
    }
  }, [visible]);

  const items: { id: "notes" | "label"; label: string; icon: React.ReactNode }[] = [
    {
      id: "notes",
      label: "Notes",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "label",
      label: "Label",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path d="M2 3.5C2 2.67 2.67 2 3.5 2H7.17c.4 0 .78.16 1.06.44l3.33 3.33a1.5 1.5 0 010 2.12l-3.67 3.67a1.5 1.5 0 01-2.12 0L2.44 8.23A1.5 1.5 0 012 7.17V3.5z" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="5" cy="5" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute bg-[var(--color-bg)] border border-black/15 rounded-lg shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[112px] py-1 px-1 flex flex-col"
      style={{
        left: 162,
        top: topOffset,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0) scale(1)" : "translateX(-8px) scale(0.95)",
        transition: "opacity 180ms cubic-bezier(0.16,1,0.3,1), transform 180ms cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: mounted ? "auto" : "none",
      }}
    >
      {items.map((item) => {
        const isActive = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-0 h-7 rounded-md pr-2 transition-colors ${
              isActive ? "bg-[#f2e2ff]" : "hover:bg-[var(--color-surface)]"
            }`}
          >
            <span
              className={`w-7 h-7 shrink-0 flex items-center justify-center ${
                isActive ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-xs font-medium ${
                isActive ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
