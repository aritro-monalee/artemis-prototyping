"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Undo2,
  Redo2,
  Hand,
  ZoomIn,
  ZoomOut,
  MoreVertical,
  Reply,
  ArrowUp,
  Ellipsis,
  CircleCheck,
  Smile,
  AtSign,
  EyeOff,
  X,
} from "lucide-react";
import { MentionInput, parseTextParts, renderTextWithMentions } from "@/app/components/MentionInput";
import { predefinedLabels, type DesignComment } from "@/app/data/projects";

export function EditDesignCanvas({
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
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/home image.png"
          alt="Aerial view of solar installation"
          fill
          className="object-contain"
        />
      </div>

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

      {placedLabels.map((pl, i) => {
        const label = predefinedLabels.find((l) => l.id === pl.labelId);
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

      <div className="absolute bottom-5 right-5 z-10">
        <div className="bg-[var(--color-bg)] flex items-center gap-1 px-1 py-1 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
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
    <button className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--color-text)] hover:bg-[rgba(0,0,0,0.05)] transition-colors">
      {children}
    </button>
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

        {!isOpen && (
          <div
            className="absolute bottom-0 left-0 bg-white flex gap-2.5 items-start overflow-hidden p-2 w-[220px] rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)] transition-all duration-150 ease-out"
            style={{
              transformOrigin: "bottom left",
              transform: hovered ? "scale(1)" : "scale(0.95)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
            <div className="flex-1 flex flex-col gap-1 items-start p-1 min-w-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xs font-medium text-[var(--color-text)] whitespace-nowrap">{pin.name}</span>
                <span className="text-[10px] text-[var(--color-text-secondary)] whitespace-nowrap">{pin.time}</span>
              </div>
              <p className="text-xs leading-4 w-full">
                {pin.textParts.map((part, i) =>
                  part.mention ? (
                    <span key={i} className="font-medium text-[var(--color-brand)]">{part.text}</span>
                  ) : (
                    <span key={i} className="text-[var(--color-text-muted)]">{part.text}</span>
                  )
                )}
              </p>
              {pin.thread.length > 0 && (
                <div className="flex items-center gap-1 h-5 py-0.5">
                  <Reply className="w-4 h-4 text-[var(--color-brand)]" />
                  <span className="text-xs text-[var(--color-brand)] leading-4 whitespace-nowrap">{pin.thread.length} {pin.thread.length === 1 ? "reply" : "replies"}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {windowVisible && (
          <div className="absolute top-0 left-[40px]">
            <CommentWindow pin={pin} onClose={onClose} mounted={windowMounted} onReply={onReply} />
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div className="flex items-center justify-between bg-[rgba(0,0,0,0.04)] border-b-[0.5px] border-[#d5c8b8] px-3 py-3">
        <span className="text-xs text-[var(--color-text)] leading-none">Comment</span>
        <div className="flex items-center gap-2">
          <CircleCheck className="w-3 h-3 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
          <Ellipsis className="w-3 h-3 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
          <button onClick={onClose} className="hover:text-[var(--color-text)] transition-colors">
            <X className="w-3 h-3 text-[var(--color-text-muted)]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col max-h-[300px] overflow-y-auto">
        <div className="flex gap-2 items-start p-3">
          <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-xs font-medium text-[var(--color-text)]">{pin.name}</span>
              <span className="text-[10px] text-[var(--color-text-secondary)]">{pin.time}</span>
            </div>
            <p className="text-xs leading-4">
              {pin.textParts.map((part, i) =>
                part.mention ? (
                  <span key={i} className="font-medium text-[var(--color-brand)]">{part.text}</span>
                ) : (
                  <span key={i} className="text-[var(--color-text-muted)]">{part.text}</span>
                )
              )}
            </p>
          </div>
          <Ellipsis className="w-[13px] h-[13px] text-[var(--color-text-secondary)] shrink-0 cursor-pointer mt-0.5" />
        </div>

        {pin.thread.map((reply, i) => (
          <div key={i} className="flex gap-2 items-start p-3">
            <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xs font-medium text-[var(--color-text)]">{reply.name}</span>
                <span className="text-[10px] text-[var(--color-text-secondary)]">{reply.time}</span>
              </div>
              <p className="text-xs leading-4 text-[var(--color-text-muted)]">{renderTextWithMentions(reply.text)}</p>
            </div>
            <Ellipsis className="w-[13px] h-[13px] text-[var(--color-text-secondary)] shrink-0 cursor-pointer mt-0.5" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 px-3 py-2">
        <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
        <div className="flex-1 flex items-center gap-1 bg-[var(--color-surface)] border-[0.5px] border-[#d5c8b8] rounded-lg pl-3 pr-1.5 py-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
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
            className="flex-1 text-xs text-[var(--color-text)] bg-transparent outline-none placeholder:text-[var(--color-text-muted)] leading-none"
          />
          <button
            onClick={() => {
              if (replyText.trim()) {
                onReply(pin.id, replyText.trim());
                setReplyText("");
              }
            }}
            className="bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

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
        transform: mounted && !closing ? "translateY(-100%) scale(1)" : "translateY(-100%) scale(0.95)",
        transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1)",
        transformOrigin: "bottom left",
        pointerEvents: closing ? "none" : "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-[#d6c0a3] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-lg shrink-0" />

        {!isExpanded ? (
          <div className="flex items-center gap-1 bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg px-1.5 py-1 shadow-lg w-[190px]">
            <MentionInput
              value={text}
              onChange={(val) => {
                setText(val);
                if (val.length > 0) setIsExpanded(true);
              }}
              onEscape={onClose}
              placeholder="Add a comment"
              className="flex-1 text-xs text-[var(--color-text)] leading-4 bg-transparent outline-none placeholder:text-[#d6c0a3] min-w-0"
              autoFocus
              dropdownAbove={false}
            />
            <div className="bg-[rgba(85,78,70,0.4)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-full p-[3.333px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
              <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-[var(--color-bg)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg shadow-lg w-[190px] overflow-hidden">
            <div className="p-3">
              <MentionInput
                value={text}
                onChange={setText}
                onSubmit={handleSubmit}
                onEscape={onClose}
                placeholder="Add a comment"
                className="w-full text-xs text-[var(--color-text)] leading-4 bg-transparent outline-none resize-none placeholder:text-[#d6c0a3]"
                multiline
                rows={2}
                autoFocus
                dropdownAbove={false}
              />
            </div>
            <div className="flex items-center justify-between bg-[rgba(0,0,0,0.04)] border-t-[0.5px] border-[var(--color-text-secondary)] px-2 py-1">
              <div className="flex items-center gap-2">
                <Smile className="w-3 h-3 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
                <AtSign className="w-3 h-3 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-[var(--color-brand)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-full p-[3.333px] shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
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
