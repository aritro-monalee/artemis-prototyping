"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Undo2,
  Redo2,
  FileDown,
  Hand,
  ZoomIn,
  ZoomOut,
  BadgeCheck,
  History,
  MoreVertical,
  Reply,
  Search,
  ListFilter,
  ArrowUp,
  Ellipsis,
  Tag,
  GripVertical,
  CircleCheck,
  Smile,
  AtSign,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { LogoMark } from "@/app/components/Logo";
import { useProjectStore } from "@/app/store/ProjectStore";
import { predefinedLabels, type DesignComment } from "@/app/data/projects";

export default function EditDesignPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const {
    getProjectDetail,
    getDesignComments, updateDesignComments,
    getPlacedLabels, updatePlacedLabels,
  } = useProjectStore();
  const project = getProjectDetail(projectId);
  const comments = getDesignComments(projectId);
  const placedLabels = getPlacedLabels(projectId);
  const [annotationSub, setAnnotationSub] = useState<"notes" | "label" | null>(null);
  const [selectedLabelIdx, setSelectedLabelIdx] = useState<number | null>(null);
  const [labelVisibility, setLabelVisibility] = useState<Record<number, boolean>>({});

  const setComments: React.Dispatch<React.SetStateAction<DesignComment[]>> = (action) => {
    if (typeof action === "function") {
      updateDesignComments(projectId, action);
    } else {
      updateDesignComments(projectId, () => action);
    }
  };
  const setPlacedLabels: React.Dispatch<React.SetStateAction<typeof placedLabels>> = (action) => {
    if (typeof action === "function") {
      updatePlacedLabels(projectId, action);
    } else {
      updatePlacedLabels(projectId, () => action);
    }
  };

  if (!project) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#fefbf7]">
        <div className="text-center">
          <p className="text-lg font-medium text-[#554e46]">
            Project not found
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-3 text-sm text-[#7267bf] hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleRootDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("application/placed-label-index")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleRootDrop = (e: React.DragEvent) => {
    const moveIndex = e.dataTransfer.getData("application/placed-label-index");
    if (moveIndex) {
      e.preventDefault();
      const idx = parseInt(moveIndex, 10);
      setPlacedLabels((prev) => prev.filter((_, i) => i !== idx));
      setSelectedLabelIdx(null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-[#fefbf7] overflow-hidden"
      onDragOver={handleRootDragOver}
      onDrop={handleRootDrop}
    >
      <EditDesignTopBar
        onClose={() => router.push(`/project/${projectId}`)}
      />
      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 relative overflow-hidden">
          <EditDesignCanvas
            annotationSub={annotationSub}
            comments={comments}
            setComments={setComments}
            placedLabels={placedLabels}
            setPlacedLabels={setPlacedLabels}
            selectedLabelIdx={selectedLabelIdx}
            setSelectedLabelIdx={setSelectedLabelIdx}
            labelVisibility={labelVisibility}
          />
          <EditDesignLeftToolbar annotationSub={annotationSub} setAnnotationSub={setAnnotationSub} />
        </div>
        <EditDesignRightSidebar annotationSub={annotationSub} comments={comments} setComments={setComments} placedLabels={placedLabels} setPlacedLabels={setPlacedLabels} selectedLabelIdx={selectedLabelIdx} setSelectedLabelIdx={setSelectedLabelIdx} labelVisibility={labelVisibility} setLabelVisibility={setLabelVisibility} />
      </div>
    </div>
  );
}

/* ─── Top Bar ─── */
function EditDesignTopBar({ onClose }: { onClose: () => void }) {
  return (
    <header className="h-14 shrink-0 bg-[#fefbf7] border-b border-l border-[#d7cfc5] flex items-center justify-between px-3 z-20">
      <div className="flex flex-1 items-center gap-4 py-2 rounded-lg">
        <LogoMark />
        <div className="flex items-center gap-4">
          <StatChip value="$317" suffix="/Month" label="Finance Payment" />
          <StatChip value="4.45" suffix="kW" label="System Size" />
          <StatChip value="6,730kWH" label="Est. Production" />
          <StatChip value="105%" label="Est. Offset" />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-md">
        <div className="flex items-center gap-1">
          <TopBarIconBtn>
            <BadgeCheck className="w-4 h-4" />
          </TopBarIconBtn>
          <TopBarIconBtn>
            <History className="w-4 h-4" />
          </TopBarIconBtn>
        </div>
        <div className="flex items-center gap-1 bg-[#f4f1ed] rounded-md">
          <div className="flex items-center gap-2 bg-white border border-[#e3e0dd] rounded-md h-9 px-3 shadow-xs cursor-pointer">
            <span className="text-sm text-[#554e46]">EN</span>
            <ChevronDown className="w-4 h-4 text-[#554e46]" />
          </div>
          <button className="bg-[#f4f1ed] flex items-center justify-center rounded-md w-8 h-9 hover:bg-[#e3e0dd] transition-colors">
            <FileDown className="w-4 h-4 text-[#554e46]" />
          </button>
          <button className="bg-[#f4f1ed] flex items-center justify-center rounded-md w-8 h-9 hover:bg-[#e3e0dd] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#554e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </button>
        </div>
        <button className="h-9 px-4 rounded-md bg-[#6e04bd] text-white text-sm font-medium shadow-xs hover:bg-[#5a039d] transition-colors">
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-[#f4f1ed] flex items-center justify-center rounded-md w-9 h-9 shadow-xs hover:bg-[#e3e0dd] transition-colors"
        >
          <X className="w-4 h-4 text-[#554e46]" />
        </button>
      </div>
    </header>
  );
}

function StatChip({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 items-start justify-center">
      <div className="flex items-end text-sm font-semibold text-[#554e46] leading-none">
        <span className="text-right">{value}</span>
        {suffix && <span className="text-center">{suffix}</span>}
      </div>
      <p className="text-[9px] font-medium text-[#7b6f60] leading-none">
        {label}
      </p>
    </div>
  );
}

function TopBarIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-transparent flex items-center justify-center w-8 h-9 rounded-md hover:bg-[#f4f1ed] transition-colors text-[#554e46]">
      {children}
    </button>
  );
}

/* ─── Left Toolbar (floating, collapsed / expanded) ─── */
function EditDesignLeftToolbar({
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
        className="flex flex-col bg-[#fefbf7] rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden transition-[width] duration-200"
        style={{ width: expanded ? 154 : 36 }}
      >
        <div className="flex flex-col gap-0 py-1 overflow-hidden w-full">
          {toolGroups.map((group, gi) => (
            <div key={gi} className="w-full">
              {gi > 0 && (
                <div className="py-1 w-full">
                  <div className="h-px w-full bg-[#e3e0dd]" />
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
                        : "hover:bg-[#f4f1ed]"
                    }`}
                      title={expanded ? undefined : tool.label}
                    >
                      <span
                        className="w-7 h-7 shrink-0 inline-block"
                        style={{
                          backgroundColor: isActive ? "#6e04bd" : "#554e46",
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
                              isActive ? "text-[#6e04bd]" : "text-[#554e46]"
                            }`}
                          >
                            {tool.label}
                          </span>
                          <span
                            className={`absolute right-2 opacity-40 inline-flex items-center justify-center w-3 h-3 rounded-[2px] border text-[8px] font-semibold leading-none ${
                              isActive
                                ? "border-[#2a226a] text-[#2a226a]"
                                : "border-[#554e46] text-[#554e46]"
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
        <div className="bg-[#fefbf7] flex items-center justify-center p-1 h-[38.5px]">
          <button
            onClick={() => { setExpanded(!expanded); if (expanded) { setActiveTool(null); setShowSubmenu(false); } }}
            className="bg-[#e2deff] flex-1 flex items-center justify-center rounded-md h-full"
          >
            {expanded ? (
              <ChevronLeft className="w-3.5 h-3.5 text-[#554e46]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[#554e46]" />
            )}
          </button>
        </div>
      </div>

      {/* Annotation submenu */}
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
      className="absolute bg-[#fefbf7] border border-black/15 rounded-lg shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[112px] py-1 px-1 flex flex-col"
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
              isActive ? "bg-[#f2e2ff]" : "hover:bg-[#f4f1ed]"
            }`}
          >
            <span
              className={`w-7 h-7 shrink-0 flex items-center justify-center ${
                isActive ? "text-[#6e04bd]" : "text-[#554e46]"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-xs font-medium ${
                isActive ? "text-[#6e04bd]" : "text-[#554e46]"
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

/* Comments and labels data now comes from the store */

/* ─── Team Members & Mention Helpers ─── */
const TEAM_MEMBERS = [
  "Mike Chen",
  "Mark Smith",
  "Michael Jones",
  "Maria Garcia",
  "Maya Patel",
  "Sarah Johnson",
  "Ethan Hackett",
  "Brian",
];

function parseTextParts(text: string): { text: string; mention?: boolean }[] {
  const parts: { text: string; mention?: boolean }[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    let earliestIdx = -1;
    let matchedName = "";
    for (const name of TEAM_MEMBERS) {
      const idx = remaining.indexOf(name);
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
        matchedName = name;
      }
    }
    if (earliestIdx === -1) {
      parts.push({ text: remaining });
      break;
    }
    if (earliestIdx > 0) {
      parts.push({ text: remaining.slice(0, earliestIdx) });
    }
    parts.push({ text: matchedName, mention: true });
    remaining = remaining.slice(earliestIdx + matchedName.length);
  }
  return parts;
}

function renderTextWithMentions(text: string) {
  const parts = parseTextParts(text);
  return parts.map((part, i) =>
    part.mention ? (
      <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

function MentionInput({
  value,
  onChange,
  onSubmit,
  onEscape,
  placeholder,
  className,
  multiline,
  rows,
  autoFocus,
  dropdownAbove = true,
}: {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  onEscape?: () => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
  autoFocus?: boolean;
  dropdownAbove?: boolean;
}) {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionStartIdx, setMentionStartIdx] = useState(0);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const parts = parseTextParts(value);
  const hasMentions = parts.some((p) => p.mention);

  const filtered = mentionQuery !== null
    ? TEAM_MEMBERS.filter((name) =>
        name.toLowerCase().startsWith(mentionQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const getMentionRanges = () => {
    const ranges: { start: number; end: number }[] = [];
    let offset = 0;
    for (const part of parts) {
      if (part.mention) ranges.push({ start: offset, end: offset + part.text.length });
      offset += part.text.length;
    }
    return ranges;
  };

  const detectMention = (val: string, cursor: number) => {
    const before = val.slice(0, cursor);
    const atIdx = before.lastIndexOf("@");
    if (atIdx !== -1) {
      const charBefore = atIdx > 0 ? before[atIdx - 1] : " ";
      if (charBefore === " " || charBefore === "\n" || atIdx === 0) {
        const query = before.slice(atIdx + 1);
        const matches = TEAM_MEMBERS.filter((n) =>
          n.toLowerCase().startsWith(query.toLowerCase())
        );
        if (matches.length > 0) {
          setMentionQuery(query);
          setMentionStartIdx(atIdx);
          setHighlightedIdx(0);
          return;
        }
      }
    }
    setMentionQuery(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    detectMention(newVal, e.target.selectionStart ?? newVal.length);
  };

  const selectMention = (name: string) => {
    const before = value.slice(0, mentionStartIdx);
    const after = value.slice(mentionStartIdx + 1 + (mentionQuery?.length ?? 0));
    const newVal = before + name + " " + after;
    onChange(newVal);
    setMentionQuery(null);
    setTimeout(() => {
      if (inputRef.current) {
        const pos = before.length + name.length + 1;
        inputRef.current.setSelectionRange(pos, pos);
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionQuery !== null && filtered.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.min(i + 1, filtered.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        selectMention(filtered[highlightedIdx]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }

    if (e.key === "Backspace" && inputRef.current) {
      const cursor = inputRef.current.selectionStart ?? 0;
      const selEnd = inputRef.current.selectionEnd ?? 0;
      if (cursor === selEnd) {
        const mention = getMentionRanges().find((r) => r.end === cursor);
        if (mention) {
          e.preventDefault();
          const newVal = value.slice(0, mention.start) + value.slice(mention.end);
          onChange(newVal);
          detectMention(newVal, mention.start);
          setTimeout(() => inputRef.current?.setSelectionRange(mention.start, mention.start), 0);
          return;
        }
      }
    }

    if (e.key === "Delete" && inputRef.current) {
      const cursor = inputRef.current.selectionStart ?? 0;
      const selEnd = inputRef.current.selectionEnd ?? 0;
      if (cursor === selEnd) {
        const mention = getMentionRanges().find((r) => r.start === cursor);
        if (mention) {
          e.preventDefault();
          const newVal = value.slice(0, mention.start) + value.slice(mention.end);
          onChange(newVal);
          detectMention(newVal, cursor);
          setTimeout(() => inputRef.current?.setSelectionRange(cursor, cursor), 0);
          return;
        }
      }
    }

    if (e.key === "Enter" && !e.shiftKey && mentionQuery === null) {
      e.preventDefault();
      onSubmit?.();
    }
    if (e.key === "Escape" && mentionQuery === null) {
      onEscape?.();
    }
  };

  const handleScroll = () => {
    if (overlayRef.current && inputRef.current) {
      overlayRef.current.scrollTop = inputRef.current.scrollTop;
      overlayRef.current.scrollLeft = inputRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const el = inputRef.current;
      requestAnimationFrame(() => {
        el.setSelectionRange(el.value.length, el.value.length);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative flex-1 min-w-0">
      {hasMentions && (
        <div
          ref={overlayRef}
          className={className}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: "none",
            overflow: "hidden",
            background: "none",
            borderColor: "transparent",
            outline: "none",
            boxShadow: "none",
            whiteSpace: multiline ? "pre-wrap" : "pre",
            overflowWrap: multiline ? "break-word" : undefined,
          }}
          aria-hidden="true"
        >
          {parts.map((part, i) =>
            part.mention ? (
              <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </div>
      )}
      <Tag
        ref={inputRef as any}
        type={multiline ? undefined : "text"}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={multiline ? handleScroll : undefined}
        rows={multiline ? rows : undefined}
        autoFocus={autoFocus}
        style={hasMentions ? {
          color: "transparent",
          caretColor: "#554e46",
          position: "relative",
          zIndex: 1,
        } : undefined}
      />
      {mentionQuery !== null && filtered.length > 0 && (
        <div
          className="absolute left-0 bg-white border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg p-1 flex flex-col gap-0.5 w-[190px] z-50"
          style={{
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
            ...(dropdownAbove
              ? { bottom: "100%", marginBottom: 4 }
              : { top: "100%", marginTop: 4 }),
          }}
        >
          {filtered.map((name, i) => (
            <button
              key={name}
              onMouseDown={(e) => {
                e.preventDefault();
                selectMention(name);
              }}
              className={`flex items-center gap-1.5 px-1 py-1.5 rounded text-left text-xs leading-none transition-colors ${
                i === highlightedIdx
                  ? "bg-[#f4f1ed] border-[0.5px] border-[#d5c8b8]"
                  : "border-[0.5px] border-transparent hover:bg-[#f4f1ed]"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#d4c9b8] shrink-0" />
              <span className="text-[#7b6f60]">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentBall({
  pin,
  isOpen,
  onOpen,
  onClose,
  onReply,
}: {
  pin: DesignComment;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReply: (commentId: number, text: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [windowVisible, setWindowVisible] = useState(false);
  const [windowMounted, setWindowMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWindowVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setWindowMounted(true)));
    } else {
      setWindowMounted(false);
      const t = setTimeout(() => setWindowVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <div
      className="absolute z-10 cursor-pointer"
      style={{ top: pin.top, left: pin.left }}
      onMouseEnter={() => { if (!isOpen) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (!isOpen) {
          setHovered(false);
          onOpen();
        }
      }}
    >
      <div className="relative" style={{ transform: "translateY(-100%)" }}>
        <div className="bg-white flex items-start overflow-hidden p-1 w-8 h-8 rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)]">
          <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
        </div>

        {/* Hover preview */}
        {!isOpen && (
          <div
            className="absolute bottom-0 left-0 bg-white flex gap-2.5 items-start overflow-hidden p-2 w-[220px] rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)] transition-all duration-150 ease-out"
            style={{
              transformOrigin: "bottom left",
              transform: hovered ? "scale(1)" : "scale(0)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
            <div className="flex-1 flex flex-col gap-1 items-start p-1 min-w-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xs font-medium text-[#554e46] whitespace-nowrap">{pin.name}</span>
                <span className="text-[10px] text-[#ac9b85] whitespace-nowrap">{pin.time}</span>
              </div>
              <p className="text-xs leading-4 w-full">
                {pin.textParts.map((part, i) =>
                  part.mention ? (
                    <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
                  ) : (
                    <span key={i} className="text-[#7b6f60]">{part.text}</span>
                  )
                )}
              </p>
              {pin.thread.length > 0 && (
                <div className="flex items-center gap-1 h-5 py-0.5">
                  <Reply className="w-4 h-4 text-[#6e04bd]" />
                  <span className="text-xs text-[#6e04bd] leading-4 whitespace-nowrap">{pin.thread.length} {pin.thread.length === 1 ? "reply" : "replies"}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Open: Comment Window */}
        {windowVisible && (
          <div className="absolute top-0 left-[40px]">
            <CommentWindow pin={pin} onClose={onClose} mounted={windowMounted} onReply={onReply} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Comment Window (popover when clicking a comment) ─── */
function CommentWindow({
  pin,
  onClose,
  mounted,
  onReply,
}: {
  pin: DesignComment;
  onClose: () => void;
  mounted: boolean;
  onReply: (commentId: number, text: string) => void;
}) {
  const [replyText, setReplyText] = useState("");

  return (
    <div
      className="bg-white border-[0.5px] border-[rgba(0,0,0,0.16)] flex flex-col overflow-hidden rounded-lg w-[248px]"
      style={{
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.95)",
        transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1)",
        transformOrigin: "top left",
        pointerEvents: mounted ? "auto" : "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-[rgba(0,0,0,0.04)] border-b-[0.5px] border-[#d5c8b8] px-3 py-3">
        <span className="text-xs text-[#554e46] leading-none">Comment</span>
        <div className="flex items-center gap-2">
          <CircleCheck className="w-3 h-3 text-[#7b6f60] cursor-pointer hover:text-[#554e46] transition-colors" />
          <Ellipsis className="w-3 h-3 text-[#7b6f60] cursor-pointer hover:text-[#554e46] transition-colors" />
          <button onClick={onClose} className="hover:text-[#554e46] transition-colors">
            <X className="w-3 h-3 text-[#7b6f60]" />
          </button>
        </div>
      </div>

      {/* Thread */}
      <div className="flex flex-col max-h-[300px] overflow-y-auto">
        {/* Main comment */}
        <div className="flex gap-2 items-start p-3">
          <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-xs font-medium text-[#554e46]">{pin.name}</span>
              <span className="text-[10px] text-[#ac9b85]">{pin.time}</span>
            </div>
            <p className="text-xs leading-4">
              {pin.textParts.map((part, i) =>
                part.mention ? (
                  <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
                ) : (
                  <span key={i} className="text-[#7b6f60]">{part.text}</span>
                )
              )}
            </p>
          </div>
          <Ellipsis className="w-[13px] h-[13px] text-[#ac9b85] shrink-0 cursor-pointer mt-0.5" />
        </div>

        {/* Thread replies */}
        {pin.thread.map((reply, i) => (
          <div key={i} className="flex gap-2 items-start p-3">
            <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xs font-medium text-[#554e46]">{reply.name}</span>
                <span className="text-[10px] text-[#ac9b85]">{reply.time}</span>
              </div>
              <p className="text-xs leading-4 text-[#7b6f60]">{renderTextWithMentions(reply.text)}</p>
            </div>
            <Ellipsis className="w-[13px] h-[13px] text-[#ac9b85] shrink-0 cursor-pointer mt-0.5" />
          </div>
        ))}
      </div>

      {/* Reply input */}
      <div className="flex items-center gap-2.5 px-3 py-2">
        <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
        <div className="flex-1 flex items-center gap-1 bg-[#f4f1ed] border-[0.5px] border-[#d5c8b8] rounded-lg pl-3 pr-1.5 py-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <MentionInput
            value={replyText}
            onChange={setReplyText}
            onSubmit={() => {
              if (replyText.trim()) {
                onReply(pin.id, replyText.trim());
                setReplyText("");
              }
            }}
            placeholder={`Reply to ${pin.name.split(" ")[0]}`}
            className="flex-1 text-xs text-[#554e46] bg-transparent outline-none placeholder:text-[#7b6f60] leading-none"
          />
          <button
            onClick={() => {
              if (replyText.trim()) {
                onReply(pin.id, replyText.trim());
                setReplyText("");
              }
            }}
            className="bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── New Comment Bubble (click on canvas to add) ─── */
function NewCommentBubble({
  top,
  left,
  closing,
  onClose,
  onSubmit,
}: {
  top: number;
  left: number;
  closing?: boolean;
  onClose: () => void;
  onSubmit: (textParts: { text: string; mention?: boolean }[]) => void;
}) {
  const [text, setText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
  }, []);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(parseTextParts(text.trim()));
    }
  };

  return (
    <div
      className="absolute z-20"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        opacity: mounted && !closing ? 1 : 0,
        transform: mounted && !closing ? "translateY(-100%) scale(1)" : "translateY(-100%) scale(0.9)",
        transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1)",
        transformOrigin: "bottom left",
        pointerEvents: closing ? "none" : "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        {/* Cream ball */}
        <div className="w-7 h-7 rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-[#d6c0a3] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-lg shrink-0" />

        {!isExpanded ? (
          <div className="flex items-center gap-1 bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg px-1.5 py-1 shadow-lg w-[190px]">
            <MentionInput
              value={text}
              onChange={(val) => {
                setText(val);
                if (val.length > 0) setIsExpanded(true);
              }}
              onEscape={onClose}
              placeholder="Add a comment"
              className="flex-1 text-xs text-[#554e46] leading-4 bg-transparent outline-none placeholder:text-[#d6c0a3] min-w-0"
              autoFocus
              dropdownAbove={false}
            />
            <div className="bg-[rgba(85,78,70,0.4)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-full p-[3.333px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
              <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-[#fefbf7] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg shadow-lg w-[190px] overflow-hidden">
            <div className="p-3">
              <MentionInput
                value={text}
                onChange={setText}
                onSubmit={handleSubmit}
                onEscape={onClose}
                placeholder="Add a comment"
                className="w-full text-xs text-[#554e46] leading-4 bg-transparent outline-none resize-none placeholder:text-[#d6c0a3]"
                multiline
                rows={2}
                autoFocus
                dropdownAbove={false}
              />
            </div>
            <div className="flex items-center justify-between bg-[rgba(0,0,0,0.04)] border-t-[0.5px] border-[#ac9b85] px-2 py-1">
              <div className="flex items-center gap-2">
                <Smile className="w-3 h-3 text-[#7b6f60] cursor-pointer hover:text-[#554e46] transition-colors" />
                <AtSign className="w-3 h-3 text-[#7b6f60] cursor-pointer hover:text-[#554e46] transition-colors" />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-[#6e04bd] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-full p-[3.333px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
              >
                <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Canvas ─── */
function EditDesignCanvas({
  annotationSub,
  comments,
  setComments,
  placedLabels,
  setPlacedLabels,
  selectedLabelIdx,
  setSelectedLabelIdx,
  labelVisibility,
}: {
  annotationSub: "notes" | "label" | null;
  comments: DesignComment[];
  setComments: React.Dispatch<React.SetStateAction<DesignComment[]>>;
  placedLabels: { labelId: string; top: number; left: number }[];
  setPlacedLabels: React.Dispatch<React.SetStateAction<{ labelId: string; top: number; left: number }[]>>;
  selectedLabelIdx: number | null;
  setSelectedLabelIdx: (v: number | null) => void;
  labelVisibility: Record<number, boolean>;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const [newCommentPos, setNewCommentPos] = useState<{ top: number; left: number } | null>(null);
  const [bubbleClosing, setBubbleClosing] = useState(false);
  const bubblePosRef = useRef<{ top: number; left: number } | null>(null);
  const [draggingLabelIdx, setDraggingLabelIdx] = useState<number | null>(null);

  if (newCommentPos) bubblePosRef.current = newCommentPos;

  const closeBubble = () => {
    if (newCommentPos || bubblePosRef.current) {
      setBubbleClosing(true);
      setTimeout(() => {
        setNewCommentPos(null);
        setBubbleClosing(false);
        bubblePosRef.current = null;
      }, 200);
    }
  };

  useEffect(() => {
    if (annotationSub !== "notes") {
      setOpenCommentId(null);
      setNewCommentPos(null);
      setBubbleClosing(false);
      bubblePosRef.current = null;
    }
  }, [annotationSub]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = e.dataTransfer.types.includes("application/placed-label-index") ? "move" : "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    const left = ((e.clientX - rect.left) / rect.width) * 100;

    const moveIndex = e.dataTransfer.getData("application/placed-label-index");
    if (moveIndex) {
      const idx = parseInt(moveIndex, 10);
      setPlacedLabels((prev) =>
        prev.map((pl, i) => (i === idx ? { ...pl, top, left } : pl))
      );
      return;
    }

    const labelId = e.dataTransfer.getData("application/label-id");
    if (labelId) {
      setPlacedLabels((prev) => [...prev, { labelId, top, left }]);
    }
  };

  const handleReply = (commentId: number, text: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, thread: [...c.thread, { name: "You", time, text }] }
          : c
      )
    );
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    setSelectedLabelIdx(null);
    if (openCommentId !== null) {
      setOpenCommentId(null);
      return;
    }
    if (annotationSub === "notes" && canvasRef.current) {
      if (newCommentPos || bubbleClosing) {
        closeBubble();
      } else {
        const rect = canvasRef.current.getBoundingClientRect();
        const top = ((e.clientY - rect.top) / rect.height) * 100;
        const left = ((e.clientX - rect.left) / rect.width) * 100;
        setNewCommentPos({ top, left });
      }
    } else {
      closeBubble();
    }
  };

  const commentCursor = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.94167 10.4213C5.055 10.9924 6.33572 11.1471 7.55302 10.8575C8.77032 10.5678 9.84416 9.85299 10.581 8.84169C11.3179 7.83039 11.6693 6.58916 11.572 5.34168C11.4747 4.09419 10.935 2.92248 10.0502 2.0377C9.16543 1.15291 7.99373 0.613231 6.74624 0.515911C5.49875 0.41859 4.25753 0.770028 3.24623 1.5069C2.23493 2.24376 1.52007 3.3176 1.23046 4.5349C0.940857 5.7522 1.09555 7.03291 1.66667 8.14625L0.5 11.5879L3.94167 10.4213Z' fill='white' stroke='%237B6F60' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 1 22, crosshair`;

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative bg-[#352e42] overflow-hidden"
      style={{ cursor: annotationSub === "notes" ? commentCursor : undefined }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
    >
      <img
        src="/home image.png"
        alt="Aerial view of solar installation"
        className="w-full h-full object-contain"
      />

      {/* Comment balls */}
      {comments.map((pin) => (
        <CommentBall
          key={pin.id}
          pin={pin}
          isOpen={openCommentId === pin.id}
          onOpen={() => { setOpenCommentId(pin.id); setNewCommentPos(null); }}
          onClose={() => setOpenCommentId(null)}
          onReply={handleReply}
        />
      ))}

      {/* New comment bubble */}
      {(newCommentPos || bubbleClosing) && annotationSub === "notes" && bubblePosRef.current && (
        <NewCommentBubble
          top={bubblePosRef.current.top}
          left={bubblePosRef.current.left}
          closing={bubbleClosing}
          onClose={closeBubble}
          onSubmit={(textParts) => {
            const pos = bubblePosRef.current;
            if (!pos) return;
            const now = new Date();
            const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
            setComments((prev) => [...prev, {
              id: Date.now(),
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              name: "You",
              time,
              textParts,
              thread: [],
            }]);
            setNewCommentPos(null);
            bubblePosRef.current = null;
            setBubbleClosing(false);
          }}
        />
      )}

      {/* Placed labels */}
      {placedLabels.map((pl, i) => {
        const label = PREDEFINED_LABELS.find((l) => l.id === pl.labelId);
        if (!label) return null;
        const isSelected = selectedLabelIdx === i;
        const isPrivate = labelVisibility[i] === false;
        return (
          <div
            key={i}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/placed-label-index", String(i));
              e.dataTransfer.effectAllowed = "move";
              requestAnimationFrame(() => setDraggingLabelIdx(i));
            }}
            onDragEnd={() => {
              setDraggingLabelIdx(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLabelIdx(isSelected ? null : i);
            }}
            className="absolute z-10 cursor-grab active:cursor-grabbing"
            style={{
              top: `${pl.top}%`,
              left: `${pl.left}%`,
              transform: "translate(-50%, -50%)",
              opacity: draggingLabelIdx === i ? 0 : 1,
            }}
          >
            <div
              className="p-[1.5px] rounded-[6px]"
              style={{
                border: isSelected ? `0.5px solid ${label.color}` : "0.5px solid transparent",
              }}
            >
              <div
                className="flex items-center p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: label.color }}
              >
                <span
                  className="text-[10px] font-semibold whitespace-nowrap leading-none transition-colors duration-200"
                  style={{ color: isPrivate ? "rgba(255,255,255,0.6)" : "white" }}
                >
                  {label.name}
                </span>
                <div
                  className="shrink-0 overflow-hidden transition-all duration-200"
                  style={{
                    width: isPrivate ? 13 : 0,
                    opacity: isPrivate ? 1 : 0,
                  }}
                >
                  <EyeOff className="w-[9px] h-[9px] text-white/60 ml-1" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Top toolbar (floating, spans full width between left toolbar and right sidebar) */}
      <div className="absolute top-3 left-[13px] right-[15px] z-10 flex items-center justify-between h-9 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" style={{ backgroundImage: "linear-gradient(90deg, #fefbf7, #fefbf7), linear-gradient(90deg, white, white)" }}>
        <div className="flex items-center gap-1 px-1">
          <CanvasToolBtn>
            <MoreVertical className="w-3.5 h-3.5" />
          </CanvasToolBtn>
          <CanvasToolBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </CanvasToolBtn>
        </div>
        <div className="flex items-center gap-1 px-1">
          <CanvasToolBtn>
            <Undo2 className="w-3.5 h-3.5" />
          </CanvasToolBtn>
          <CanvasToolBtn>
            <Redo2 className="w-3.5 h-3.5" />
          </CanvasToolBtn>
          <CanvasToolBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          </CanvasToolBtn>
        </div>
      </div>

      {/* Zoom controls (bottom right) */}
      <div className="absolute bottom-5 right-5 z-10">
        <div className="bg-[#fefbf7] flex items-center gap-1 px-1 py-1 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <CanvasToolBtn>
            <Hand className="w-3.5 h-3.5" />
          </CanvasToolBtn>
          <CanvasToolBtn>
            <ZoomIn className="w-3.5 h-3.5" />
          </CanvasToolBtn>
          <CanvasToolBtn>
            <ZoomOut className="w-3.5 h-3.5" />
          </CanvasToolBtn>
        </div>
      </div>
    </div>
  );
}

function CanvasToolBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-7 h-7 flex items-center justify-center rounded-md text-[#554e46] hover:bg-[rgba(0,0,0,0.05)] transition-colors">
      {children}
    </button>
  );
}

/* ─── Right Sidebar ─── */
function EditDesignRightSidebar({
  annotationSub,
  comments,
  setComments,
  placedLabels,
  setPlacedLabels,
  selectedLabelIdx,
  setSelectedLabelIdx,
  labelVisibility,
  setLabelVisibility,
}: {
  annotationSub: "notes" | "label" | null;
  comments: DesignComment[];
  setComments: React.Dispatch<React.SetStateAction<DesignComment[]>>;
  placedLabels: { labelId: string; top: number; left: number }[];
  setPlacedLabels: React.Dispatch<React.SetStateAction<{ labelId: string; top: number; left: number }[]>>;
  selectedLabelIdx: number | null;
  setSelectedLabelIdx: (v: number | null) => void;
  labelVisibility: Record<number, boolean>;
  setLabelVisibility: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const [roofPlaneCExpanded, setRoofPlaneCExpanded] = useState(true);
  const [inverter2Expanded, setInverter2Expanded] = useState(true);
  const [selectedArray, setSelectedArray] = useState<number>(4);
  const [labelChipsExpanded, setLabelChipsExpanded] = useState(true);
  const isLabelMode = annotationSub === "label";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastSelectedRef = useRef<{ i: number; label: typeof PREDEFINED_LABELS[0]; } | null>(null);

  const hasSelection = selectedLabelIdx !== null && placedLabels[selectedLabelIdx];
  if (hasSelection) {
    const lbl = PREDEFINED_LABELS.find((l) => l.id === placedLabels[selectedLabelIdx].labelId);
    if (lbl) lastSelectedRef.current = { i: selectedLabelIdx, label: lbl };
  }

  if (annotationSub === "notes") {
    return (
      <aside className="w-[310px] shrink-0 bg-[#fefbf7] flex flex-col overflow-hidden z-10">
        <NotesSidebar comments={comments} setComments={setComments} />
      </aside>
    );
  }

  return (
    <aside className="w-[310px] shrink-0 bg-[#fefbf7] flex flex-col overflow-hidden z-10">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {/* Context box (sticky) */}
        <div
          className="border-b border-[#d7cfc5] flex flex-col gap-3.5 items-center pb-2 pt-3.5 px-3.5 z-[2] sticky top-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #f4f1ed, #f4f1ed), linear-gradient(90deg, rgba(75,51,241,0.05), rgba(75,51,241,0.05)), linear-gradient(90deg, #fefbf7, #fefbf7)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full h-3.5">
            <div className="flex items-center gap-1">
              {isLabelMode ? (
                <>
                  <Tag className="w-3.5 h-3.5 text-[#7b6f60]" />
                  <span className="text-xs font-medium text-[#7b6f60]">Labels</span>
                </>
              ) : (
                <>
                  <PanelIcon />
                  <span className="text-xs font-medium text-[#7b6f60]">Panel</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {isLabelMode ? (
                <>
                  <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
                    <ListFilter className="w-3.5 h-3.5 text-[#7b6f60]" />
                  </button>
                  <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
                    <Ellipsis className="w-3.5 h-3.5 text-[#7b6f60]" />
                  </button>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6f60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6f60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </>
              )}
            </div>
          </div>

          {isLabelMode ? (
            <>
              <LabelContextBoxSearch />
              <LabelContextBoxChips />

              {(() => {
                const show = hasSelection && labelChipsExpanded;
                const data = hasSelection ? { i: selectedLabelIdx, label: PREDEFINED_LABELS.find((l) => l.id === placedLabels[selectedLabelIdx].labelId)! } : lastSelectedRef.current;
                const isPrivate = data ? labelVisibility[data.i] === false : false;
                return (
                  <div className="w-full flex flex-col gap-1.5">
                    <div
                      className="grid w-full transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{ gridTemplateRows: hasSelection ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden w-full">
                        <button
                          onClick={() => setLabelChipsExpanded((v) => !v)}
                          className="flex items-center gap-2.5 w-full rounded-md"
                        >
                          <div className="flex-1 h-px bg-[#d7cfc5]" />
                          {labelChipsExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#7b6f60]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#7b6f60]" />
                          )}
                          <div className="flex-1 h-px bg-[#d7cfc5]" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="grid w-full transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{ gridTemplateRows: show ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden w-full">
                        {data && data.label && (
                          <div
                            className="flex items-center justify-between px-1 py-1.5 rounded-[9px] w-full hover:bg-[rgba(0,0,0,0.02)] transition-colors group"
                          >
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
                              <div className="p-[1.5px] rounded-[5px]">
                                <div
                                  className="flex items-center justify-center p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                                  style={{ backgroundColor: data.label.color }}
                                >
                                  <span
                                    className="text-[12px] font-semibold leading-none whitespace-nowrap transition-colors duration-200"
                                    style={{ color: isPrivate ? "rgba(255,255,255,0.6)" : "white" }}
                                  >
                                    {data.label.name}
                                  </span>
                                  <div
                                    className="shrink-0 overflow-hidden transition-all duration-200"
                                    style={{ width: isPrivate ? 13 : 0, opacity: isPrivate ? 1 : 0 }}
                                  >
                                    <EyeOff className="w-[9px] h-[9px] text-white/60 ml-1" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div
                                onClick={() => setLabelVisibility((prev) => ({ ...prev, [data.i]: !isPrivate ? false : true }))}
                                className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                              >
                                {isPrivate ? (
                                  <Eye className="w-4 h-4 text-[#7b6f60]" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-[#7b6f60]" />
                                )}
                              </div>
                              <div
                                onClick={() => {
                                  setPlacedLabels((prev) => prev.filter((_, idx) => idx !== data.i));
                                  setSelectedLabelIdx(null);
                                  setLabelVisibility((prev) => {
                                    const next = { ...prev };
                                    delete next[data.i];
                                    return next;
                                  });
                                }}
                                className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-[#7b6f60]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3.5 items-start w-full">
                <div className="flex gap-2 items-start w-full">
                  <SidebarSelect label="Orientation" value="Landscape" hasIcon hasChevron flex1 />
                  <SidebarInput label="Pitch" value="162.74°" hasIcon width="w-[100px]" />
                </div>
                <div className="flex gap-2 items-start w-full">
                  <SidebarInput label="Azimuth" value="162.74°" hasIcon width="w-[100px]" />
                  <SidebarSelect label="Panel" value="Urecho 400" hasChevron flex1 />
                </div>
              </div>

              <button className="flex items-center gap-2.5 w-full rounded-md">
                <div className="flex-1 h-px bg-[#d7cfc5]" />
                <ChevronDown className="w-4 h-4 text-[#7b6f60]" />
                <div className="flex-1 h-px bg-[#d7cfc5]" />
              </button>

              <div className="flex gap-2 items-start w-full">
                <div className="flex-1 flex flex-col gap-2 h-[58px]">
                  <p className="text-sm font-medium text-[#554e46] leading-none">Production</p>
                  <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs">
                    <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#554e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <span className="flex-1 text-sm text-[#554e46]">427.82</span>
                    <span className="text-xs font-semibold text-[#2a226a] bg-[#e2deff] rounded-md px-2 py-0.5 shadow-sm">kWh</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 h-[58px] w-[99px]">
                  <p className="text-sm font-medium text-[#554e46] leading-none">Solar Access</p>
                  <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#554e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    <span className="flex-1 text-sm text-[#554e46]">95.68%</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Layers list */}
        <div className="flex flex-col gap-2 pr-2.5 py-1.5">
          {/* Roof Planes */}
          <div className="border-l-2 border-[#1eafff] pl-2.5">
            <SectionDivider label="Roof Planes" rightLabel="Production" />

            <div className="flex flex-col gap-0.5 mt-2">
              <PlaneRow
                label="Plane B"
                count="10x"
                production="123.82 kWh"
                expanded={false}
                onToggle={() => {}}
              />

              <div className="bg-[rgba(75,51,241,0.05)] rounded-xl flex flex-col">
                <PlaneRow
                  label="Plane C"
                  count="15x"
                  production="427.41 kWh"
                  expanded={roofPlaneCExpanded}
                  onToggle={() => setRoofPlaneCExpanded((v) => !v)}
                  containerClass="border-b border-[rgba(110,4,189,0.1)]"
                  height="h-[41px]"
                />
                {roofPlaneCExpanded && (
                  <div className="flex flex-col gap-px px-[5px] pb-[5px]">
                    {[
                      { num: 1, prod: "227.33 kWh", on: true },
                      { num: 2, prod: "111.22 kWh", on: false },
                      { num: 3, prod: "222.22 kWh", on: false },
                      { num: 4, prod: "123.54 kWh", on: true },
                    ].map((item) => (
                      <ArrayRow
                        key={item.num}
                        num={item.num}
                        production={item.prod}
                        switchOn={item.on}
                        selected={selectedArray === item.num}
                        dimmed={item.num !== 1 && item.num !== 4}
                        onSelect={() => setSelectedArray(item.num)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5" />
                  <RoofPlaneIcon />
                  <span className="text-xs font-medium text-[#554e46]">
                    Plane A
                  </span>
                </div>
                <span className="text-xs font-medium text-[#554e46] opacity-20 text-right w-[63px]">
                  0 kWh
                </span>
              </button>
            </div>

            <button className="flex items-center gap-1 pl-[9px] h-[38px] rounded-[9px] w-full mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6f60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span className="text-xs font-medium text-[#7b6f60]">
                Show Unused Roof Planes
              </span>
            </button>
          </div>

          {/* Ground Mounts */}
          <div className="border-l-2 border-[#63ffed] pl-2.5">
            <SectionDivider label="Ground Mounts" rightLabel="Production" />

            <div className="flex flex-col gap-0.5 mt-2">
              <PlaneRow
                label="Ground D"
                count="15x"
                production="411.31 kWh"
                expanded={false}
                onToggle={() => {}}
              />
            </div>

            <button className="flex items-center gap-1 pl-[9px] h-[38px] rounded-[9px] w-full mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6f60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span className="text-xs font-medium text-[#7b6f60]">
                Show Unused Ground Mounts
              </span>
            </button>
          </div>

          {/* Inverters */}
          <div className="border-l-2 border-[#ffc821] pl-2.5">
            <SectionDivider label="Inverters" rightLabel="Power" />

            <div className="flex flex-col gap-0.5 mt-2">
              <button className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5" />
                  <InverterIcon />
                  <span className="text-xs font-medium text-[#554e46]">
                    Inverter 1
                  </span>
                </div>
                <span className="text-xs font-medium text-[#554e46]">
                  6.22 kW
                </span>
              </button>

              <div>
                <button
                  onClick={() => setInverter2Expanded((v) => !v)}
                  className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px] hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {inverter2Expanded ? (
                      <ChevronDown className="w-1.5 h-1.5 text-[#7b6f60]" />
                    ) : (
                      <ChevronRight className="w-1.5 h-1.5 text-[#7b6f60]" />
                    )}
                    <InverterIcon />
                    <span className="text-xs font-medium text-[#554e46]">
                      Inverter 2
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#554e46]">
                    427.41 kWh
                  </span>
                </button>
                {inverter2Expanded && (
                  <div className="flex flex-col">
                    <InverterStringRow
                      color="#e85d75"
                      label="A"
                      panels="12 Panels"
                      watts="3,112 W"
                    />
                    <InverterStringRow
                      color="#5da5e8"
                      label="B"
                      panels="14 Panels"
                      watts="3,112 W"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Labels on canvas (visible in label mode) */}
          {isLabelMode && (
            <div className="border-l-2 border-[#56ff4b] pl-2.5">
              <SectionDivider label="Labels" rightLabel="Visibility" />
              {placedLabels.length > 0 ? (
                <div className="flex flex-col gap-0.5 mt-2">
                  {placedLabels.map((pl, i) => {
                    const label = PREDEFINED_LABELS.find((l) => l.id === pl.labelId);
                    if (!label) return null;
                    const isPrivate = labelVisibility[i] === false;
                    const isSelected = selectedLabelIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedLabelIdx(isSelected ? null : i)}
                        className={`flex items-center justify-between px-3 py-2 rounded-[9px] w-full h-[38px] transition-colors group ${isSelected ? "bg-[rgba(75,51,241,0.08)]" : "hover:bg-[rgba(0,0,0,0.02)]"}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
                          <div className="p-[1.5px] rounded-[5px]">
                            <div
                              className="flex items-center justify-center p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                              style={{ backgroundColor: label.color }}
                            >
                              <span
                                className="text-[12px] font-semibold leading-none whitespace-nowrap transition-colors duration-200"
                                style={{ color: isPrivate ? "rgba(255,255,255,0.6)" : "white" }}
                              >
                                {label.name}
                              </span>
                              <div
                                className="shrink-0 overflow-hidden transition-all duration-200"
                                style={{ width: isPrivate ? 13 : 0, opacity: isPrivate ? 1 : 0 }}
                              >
                                <EyeOff className="w-[9px] h-[9px] text-white/60 ml-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            onClick={(e) => { e.stopPropagation(); setLabelVisibility((prev) => ({ ...prev, [i]: !isPrivate ? false : true })); }}
                            className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                          >
                            {isPrivate ? (
                              <Eye className="w-4 h-4 text-[#7b6f60]" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-[#7b6f60]" />
                            )}
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlacedLabels((prev) => prev.filter((_, idx) => idx !== i));
                              if (selectedLabelIdx === i) setSelectedLabelIdx(null);
                              setLabelVisibility((prev) => {
                                const next = { ...prev };
                                delete next[i];
                                return next;
                              });
                            }}
                            className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-[#7b6f60]" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-3">
                  <p className="text-xs text-[#ac9b85]">Drag labels onto the canvas to place them</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Chat FAB */}
      <div className="absolute bottom-4 right-4 z-20">
        <button className="w-10 h-10 rounded-full bg-[#554e46] shadow-lg flex items-center justify-center hover:bg-[#3d3830] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </button>
      </div>
    </aside>
  );
}

/* ─── Sidebar shared components ─── */

function SidebarSelect({
  label,
  value,
  hasIcon,
  hasChevron,
  flex1,
}: {
  label: string;
  value: string;
  hasIcon?: boolean;
  hasChevron?: boolean;
  flex1?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 h-[58px] ${flex1 ? "flex-1" : ""}`}>
      <p className="text-sm font-medium text-[#554e46] leading-none">{label}</p>
      <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs cursor-pointer w-full">
        {hasIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#554e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        )}
        <span className="flex-1 text-sm text-[#554e46] overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
        </span>
        {hasChevron && (
          <ChevronDown className="w-4 h-4 text-[#554e46] shrink-0" />
        )}
      </div>
    </div>
  );
}

function SidebarInput({
  label,
  value,
  hasIcon,
  width,
}: {
  label: string;
  value: string;
  hasIcon?: boolean;
  width?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 h-[58px] ${width || ""}`}>
      <p className="text-sm font-medium text-[#554e46] leading-none">{label}</p>
      <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs w-full">
        {hasIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7b6f60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        )}
        <span className="flex-1 text-sm text-[#554e46]">{value}</span>
      </div>
    </div>
  );
}

function SectionDivider({
  label,
  rightLabel,
}: {
  label: string;
  rightLabel: string;
}) {
  return (
    <div className="flex items-center gap-2.5 opacity-50 pb-0.5 pt-3 px-2.5 w-full">
      <span className="text-xs font-medium text-[#7b6f60] leading-none shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#d7cfc5]" />
      <span className="text-[10px] font-medium text-[#7b6f60] leading-none shrink-0">
        {rightLabel}
      </span>
    </div>
  );
}

function PlaneRow({
  label,
  count,
  production,
  expanded,
  onToggle,
  containerClass,
  height = "h-[38px]",
}: {
  label: string;
  count: string;
  production: string;
  expanded: boolean;
  onToggle: () => void;
  containerClass?: string;
  height?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between pl-[9px] pr-[13px] py-1 rounded-[9px] w-full ${height} ${containerClass || ""}`}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 flex items-center justify-center">
          {expanded ? (
            <ChevronDown className="w-[6px] h-[3px] text-[#7b6f60]" />
          ) : (
            <ChevronRight className="w-[3px] h-[6px] text-[#7b6f60]" />
          )}
        </div>
        <RoofPlaneIcon />
        <span className="text-xs font-medium text-[#554e46]">
          {label}{" "}
          <span className="text-[10px] text-[#ac9b85]">- {count}</span>
        </span>
      </div>
      <span className="text-xs font-medium text-[#554e46]">{production}</span>
    </button>
  );
}

function ArrayRow({
  num,
  production,
  switchOn,
  selected,
  dimmed,
  onSelect,
}: {
  num: number;
  production: string;
  switchOn: boolean;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between p-2 rounded-[9px] w-full h-10 transition-colors ${
        selected
          ? "bg-[rgba(110,4,189,0.08)] border-[3px] border-[rgba(110,4,189,0.19)]"
          : ""
      }`}
    >
      <div className="flex items-center gap-1.5">
        {/* Mini switch */}
        <div
          className={`w-6 h-4 rounded-full flex items-center px-0.5 shrink-0 ${
            switchOn
              ? "bg-[#6e04bd] justify-end"
              : "bg-[#d7cfc5] justify-start"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
        </div>
        <PanelIcon />
        <span
          className={`text-xs font-medium text-[#6e04bd] w-5 text-left ${
            dimmed ? "opacity-40" : ""
          }`}
        >
          {num}
        </span>
      </div>
      <span
        className={`text-xs font-medium text-[#554e46] ${
          dimmed ? "opacity-50" : ""
        }`}
      >
        {production}
      </span>
    </button>
  );
}

function InverterStringRow({
  color,
  label,
  panels,
  watts,
}: {
  color: string;
  label: string;
  panels: string;
  watts: string;
}) {
  return (
    <div className="flex items-center justify-between pl-10 pr-[13px] py-2 h-[38px]">
      <div className="flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#998d7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
        <span className="text-xs font-medium text-[#554e46]">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#998d7d]">{panels}</span>
        <span className="text-xs font-medium text-[#554e46]">{watts}</span>
      </div>
    </div>
  );
}

/* ─── Notes Sidebar ─── */

/* ─── Labels Sidebar ─── */

const PREDEFINED_LABELS = predefinedLabels;

function LabelContextBoxSearch() {
  return (
    <div className="flex items-center gap-1.5 bg-white border-[0.5px] border-[#d7cfc5] rounded-lg pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
      <Search className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
      <input
        type="text"
        className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]"
        placeholder="Search Labels"
      />
    </div>
  );
}

function LabelContextBoxChips() {
  const handleDragStart = (e: React.DragEvent, label: typeof PREDEFINED_LABELS[0]) => {
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
      {PREDEFINED_LABELS.map((label) => (
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

/* ─── Notes Sidebar ─── */

function NotesSidebar({
  comments,
  setComments,
}: {
  comments: DesignComment[];
  setComments: React.Dispatch<React.SetStateAction<DesignComment[]>>;
}) {
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const toggleExpand = (id: number) => {
    setExpandedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReplySubmit = (noteId: number) => {
    const text = replyTexts[noteId]?.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
    setComments((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, thread: [...n.thread, { name: "You", time, text }] }
          : n
      )
    );
    setReplyTexts((prev) => ({ ...prev, [noteId]: "" }));
    if (!expandedNotes.has(noteId)) {
      setExpandedNotes((prev) => new Set(prev).add(noteId));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="border-b border-[#d7cfc5] flex flex-col gap-3.5 items-center pb-4 pt-3.5 px-3.5 shrink-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #f4f1ed, #f4f1ed), linear-gradient(90deg, rgba(75,51,241,0.05), rgba(75,51,241,0.05)), linear-gradient(90deg, #fefbf7, #fefbf7)",
        }}
      >
        <div className="flex items-center justify-between w-full h-3.5">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="#7b6f60" strokeWidth="1.2" />
              <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="#7b6f60" strokeWidth="1" strokeLinecap="round" />
              <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="#7b6f60" strokeWidth="1" strokeLinecap="round" />
              <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="#7b6f60" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-medium text-[#7b6f60]">Notes</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
              <ListFilter className="w-3.5 h-3.5 text-[#7b6f60]" />
            </button>
            <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
              <Ellipsis className="w-3.5 h-3.5 text-[#7b6f60]" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white border-[0.5px] border-[#d7cfc5] rounded-lg pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
          <Search className="w-3.5 h-3.5 text-[#7b6f60] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]" placeholder="Search notes" />
        </div>
      </div>

      {/* Notes feed */}
      <div className="flex-1 overflow-y-auto px-4">
        {[...comments].reverse().map((note) => {
          const hasReplies = note.thread.length > 0;
          const isExpanded = expandedNotes.has(note.id);

          return (
            <div key={note.id} className="relative flex flex-col items-start border-b-[0.5px] border-[#d7cfc5] pb-4 pt-2">
              <div className="flex flex-col gap-2 items-start pb-3 pt-2 w-full">
                <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />
                <div className="flex items-center w-full">
                  <span className="text-xs font-medium text-[#554e46] leading-none">{note.name}</span>
                </div>
                <p className="text-[14px] leading-[20px] text-[#554e46] w-full whitespace-pre-wrap">
                  {note.textParts.map((part, i) =>
                    part.mention ? (
                      <span key={i} className="font-medium text-[#6e04bd]">{part.text}</span>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </p>
                <div className="absolute right-0 top-[12px] flex items-center gap-2">
                  <span className="text-[10px] text-[#ac9b85] leading-none">{note.time}</span>
                  <button className="block cursor-pointer w-[13px] h-[13px]">
                    <Ellipsis className="w-[13px] h-[13px] text-[#ac9b85]" />
                  </button>
                </div>
              </div>

              <NoteExpandableSection
                isExpanded={isExpanded}
                hasReplies={hasReplies}
                note={note}
                replyingTo={replyingTo}
                replyTexts={replyTexts}
                onToggleExpand={() => toggleExpand(note.id)}
                onToggleReply={() => setReplyingTo(replyingTo === note.id ? null : note.id)}
                onReplyTextChange={(val) => setReplyTexts((prev) => ({ ...prev, [note.id]: val }))}
                onReplySubmit={() => handleReplySubmit(note.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NoteExpandableSection({
  isExpanded,
  hasReplies,
  note,
  replyingTo,
  replyTexts,
  onToggleExpand,
  onToggleReply,
  onReplyTextChange,
  onReplySubmit,
}: {
  isExpanded: boolean;
  hasReplies: boolean;
  note: DesignComment;
  replyingTo: number | null;
  replyTexts: Record<number, string>;
  onToggleExpand: () => void;
  onToggleReply: () => void;
  onReplyTextChange: (val: string) => void;
  onReplySubmit: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [measuredH, setMeasuredH] = useState(0);
  const [phase, setPhase] = useState<"collapsed" | "measure" | "animating" | "open" | "closing">(
    "collapsed"
  );
  const prevExpanded = useRef(isExpanded);

  useEffect(() => {
    if (isExpanded === prevExpanded.current) return;
    prevExpanded.current = isExpanded;

    if (isExpanded) {
      setPhase("measure");
    } else {
      if (contentRef.current) setMeasuredH(contentRef.current.scrollHeight);
      setPhase("closing");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("collapsed"));
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (phase === "measure" && contentRef.current) {
      setMeasuredH(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("animating"));
      });
    }
  }, [phase]);

  const getStyle = (): React.CSSProperties => {
    switch (phase) {
      case "collapsed":
        return { height: 0, overflow: "hidden", transition: "none" };
      case "measure":
        return { height: "auto", overflow: "hidden", position: "absolute", visibility: "hidden", opacity: 0 };
      case "animating":
        return { height: measuredH, overflow: "hidden", transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1)" };
      case "open":
        return { height: "auto" };
      case "closing":
        return { height: measuredH, overflow: "hidden", transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 1)" };
      default:
        return { height: 0, overflow: "hidden" };
    }
  };

  const showReplyInput = !hasReplies && !isExpanded && replyingTo === note.id;

  return (
    <>
      {/* Collapsed state — reply count or reply button */}
      {!isExpanded && phase === "collapsed" && (
        <div className="flex items-center gap-2 py-1 w-full">
          {hasReplies ? (
            <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleExpand}>
              <Reply className="w-4 h-4 text-[#6e04bd]" />
              <span className="text-xs text-[#6e04bd] leading-4">
                {note.thread.length} {note.thread.length === 1 ? "reply" : "replies"}
              </span>
            </button>
          ) : (
            <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleReply}>
              <Reply className="w-4 h-4 text-[#6e04bd]" />
              <span className="text-xs text-[#6e04bd] leading-4">Reply</span>
            </button>
          )}
        </div>
      )}

      {/* Expanded thread section with animation */}
      {(isExpanded || phase !== "collapsed") && (
      <div
        ref={contentRef}
        className="w-full"
        style={getStyle()}
        onTransitionEnd={() => {
          if (phase === "animating") setPhase("open");
          if (phase === "collapsed") { /* already collapsed */ }
        }}
      >
        <div className="flex flex-col w-full">
          {hasReplies && (
            <div className="flex items-start gap-2 pl-2 w-full">
              <div className="w-0 self-stretch border-l border-[#d7cfc5] shrink-0" />
              <div className="flex-1 flex flex-col gap-2 py-2 min-w-0">
                {note.thread.map((reply, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between leading-none w-full">
                      <span className="text-xs font-medium text-[#554e46]">{reply.name}</span>
                      <span className="text-[10px] text-[#ac9b85]">{reply.time}</span>
                    </div>
                    <p className="text-xs text-[#554e46] leading-4 w-full whitespace-pre-wrap">{renderTextWithMentions(reply.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full mt-1">
            <div className="flex items-center gap-1 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
              <MentionInput
                value={replyTexts[note.id] || ""}
                onChange={onReplyTextChange}
                onSubmit={onReplySubmit}
                placeholder={`Reply to ${note.name.split(" ")[0]}`}
                className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]"
              />
              <button
                onClick={onReplySubmit}
                className="bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
              >
                <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
              </button>
            </div>
          </div>

          {hasReplies && (
            <div className="flex items-center justify-end pl-2 py-1 w-full">
              <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleExpand}>
                <ChevronUp className="w-4 h-4 text-[#7b6f60]" />
                <span className="text-xs text-[#7b6f60] leading-4">Hide Replies</span>
              </button>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Standalone reply input for notes without threads */}
      {showReplyInput && (
        <div className="w-full mt-1" style={{ animation: "noteReplyIn 200ms ease-out" }}>
          <div className="flex items-center gap-1 bg-white border-[0.5px] border-[#d7cfc5] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[#6e04bd] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
            <MentionInput
              value={replyTexts[note.id] || ""}
              onChange={onReplyTextChange}
              onSubmit={onReplySubmit}
              placeholder={`Reply to ${note.name.split(" ")[0]}`}
              className="flex-1 text-xs text-[#554e46] leading-none bg-transparent outline-none placeholder:text-[#7b6f60]"
              autoFocus
            />
            <button
              onClick={onReplySubmit}
              className="bg-[#6e04bd] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
            >
              <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Sidebar icons (using /public/icons SVGs) ─── */

function RoofPlaneIcon() {
  return (
    <img src="/icons/design-mode-icons.svg" alt="" className="w-5 h-5 shrink-0" />
  );
}

function PanelIcon() {
  return (
    <img src="/icons/design-mode-icons-3.svg?v=2" alt="" className="w-5 h-5 shrink-0" />
  );
}

function InverterIcon() {
  return (
    <img src="/icons/design-mode-icons-6.svg" alt="" className="w-5 h-5 shrink-0" />
  );
}
