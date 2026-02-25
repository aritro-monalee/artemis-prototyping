"use client";

import { useState, useRef, useEffect } from "react";
import {
  Reply,
  Search,
  ArrowUp,
  Ellipsis,
  ListFilter,
  ChevronUp,
} from "lucide-react";
import { MentionInput, renderTextWithMentions } from "@/app/components/MentionInput";
import type { DesignComment } from "@/app/data/projects";

export function NotesSidebar({
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
      <div
        className="border-b border-[var(--color-border)] flex flex-col gap-3.5 items-center pb-4 pt-3.5 px-3.5 shrink-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #f4f1ed, #f4f1ed), linear-gradient(90deg, rgba(75,51,241,0.05), rgba(75,51,241,0.05)), linear-gradient(90deg, #fefbf7, #fefbf7)",
        }}
      >
        <div className="flex items-center justify-between w-full h-3.5">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="var(--color-text-muted)" strokeWidth="1.2" />
              <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
              <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
              <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-medium text-[var(--color-text-muted)]">Notes</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
              <ListFilter className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            </button>
            <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
              <Ellipsis className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white border-[0.5px] border-[var(--color-border)] rounded-lg pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
          <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]" placeholder="Search notes" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {[...comments].reverse().map((note) => {
          const hasReplies = note.thread.length > 0;
          const isExpanded = expandedNotes.has(note.id);

          return (
            <div key={note.id} className="relative flex flex-col items-start border-b-[0.5px] border-[var(--color-border)] pb-4 pt-2">
              <div className="flex flex-col gap-2 items-start pb-3 pt-2 w-full">
                <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />
                <div className="flex items-center w-full">
                  <span className="text-xs font-medium text-[var(--color-text)] leading-none">{note.name}</span>
                </div>
                <p className="text-[14px] leading-[20px] text-[var(--color-text)] w-full whitespace-pre-wrap">
                  {note.textParts.map((part, i) =>
                    part.mention ? (
                      <span key={i} className="font-medium text-[var(--color-brand)]">{part.text}</span>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </p>
                <div className="absolute right-0 top-[12px] flex items-center gap-2">
                  <span className="text-[10px] text-[var(--color-text-secondary)] leading-none">{note.time}</span>
                  <button className="block cursor-pointer w-[13px] h-[13px]">
                    <Ellipsis className="w-[13px] h-[13px] text-[var(--color-text-secondary)]" />
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
      {!isExpanded && phase === "collapsed" && (
        <div className="flex items-center gap-2 py-1 w-full">
          {hasReplies ? (
            <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleExpand}>
              <Reply className="w-4 h-4 text-[var(--color-brand)]" />
              <span className="text-xs text-[var(--color-brand)] leading-4">
                {note.thread.length} {note.thread.length === 1 ? "reply" : "replies"}
              </span>
            </button>
          ) : (
            <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleReply}>
              <Reply className="w-4 h-4 text-[var(--color-brand)]" />
              <span className="text-xs text-[var(--color-brand)] leading-4">Reply</span>
            </button>
          )}
        </div>
      )}

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
              <div className="w-0 self-stretch border-l border-[var(--color-border)] shrink-0" />
              <div className="flex-1 flex flex-col gap-2 py-2 min-w-0">
                {note.thread.map((reply, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between leading-none w-full">
                      <span className="text-xs font-medium text-[var(--color-text)]">{reply.name}</span>
                      <span className="text-[10px] text-[var(--color-text-secondary)]">{reply.time}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text)] leading-4 w-full whitespace-pre-wrap">{renderTextWithMentions(reply.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full mt-1">
            <div className="flex items-center gap-1 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
              <MentionInput
                value={replyTexts[note.id] || ""}
                onChange={onReplyTextChange}
                onSubmit={onReplySubmit}
                placeholder={`Reply to ${note.name.split(" ")[0]}`}
                className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <button
                onClick={onReplySubmit}
                className="bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
              >
                <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
              </button>
            </div>
          </div>

          {hasReplies && (
            <div className="flex items-center justify-end pl-2 py-1 w-full">
              <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={onToggleExpand}>
                <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="text-xs text-[var(--color-text-muted)] leading-4">Hide Replies</span>
              </button>
            </div>
          )}
        </div>
      </div>
      )}

      {showReplyInput && (
        <div className="w-full mt-1" style={{ animation: "noteReplyIn 200ms ease-out" }}>
          <div className="flex items-center gap-1 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
            <MentionInput
              value={replyTexts[note.id] || ""}
              onChange={onReplyTextChange}
              onSubmit={onReplySubmit}
              placeholder={`Reply to ${note.name.split(" ")[0]}`}
              className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
              autoFocus
            />
            <button
              onClick={onReplySubmit}
              className="bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
            >
              <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
