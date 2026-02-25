"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ListFilter,
  Ellipsis,
  Reply,
  ArrowUp,
  ChevronUp,
} from "lucide-react";
import { useProjectStore } from "@/app/store/ProjectStore";
import { NOTE_SOURCE_META } from "@/app/data/projects";

export function ComposeBar({ projectId, newComment, setNewComment }: { projectId: string; newComment: string; setNewComment: (v: string) => void }) {
  const { updateProjectNotes } = useProjectStore();
  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "");
    updateProjectNotes(projectId, (prev) => [
      ...prev,
      { id: Date.now(), name: "You", time, textParts: [{ text }], thread: [] },
    ]);
    setNewComment("");
  };
  return (
    <div className="shrink-0 px-3 pb-3 pt-9 relative" style={{ background: "linear-gradient(to bottom, rgba(254,251,247,0) 0%, #fefbf7 64%)" }}>
      <div className="bg-white border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-md p-2 min-h-[60px] flex items-end gap-2.5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.2),0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <textarea
          className="flex-1 text-xs text-[var(--color-text)] leading-4 bg-transparent outline-none resize-none placeholder:text-[var(--color-text-muted)] min-h-[40px]"
          placeholder="Add a new comment"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitComment();
            }
          }}
        />
        <button
          onClick={submitComment}
          aria-label="Send comment"
          className="bg-[var(--color-brand)] border-[0.5px] border-[rgba(255,255,255,0.2)] rounded-full p-1 flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

export function NotesContent({ projectId }: { projectId: string }) {
  const { getProjectNotes, updateProjectNotes } = useProjectStore();
  const notes = getProjectNotes(projectId);
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
    updateProjectNotes(projectId, (prev) =>
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
    <div className="flex flex-col">
      {/* Search + filter */}
      <div className="flex items-center gap-1.5 pb-2">
        <div className="flex-1 flex items-center gap-1.5 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
          <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]" placeholder="Search comments" />
        </div>
        <button aria-label="Filter comments" className="w-[30px] h-[30px] flex items-center justify-center rounded-[4px] shrink-0 hover:bg-[var(--color-surface)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
          <ListFilter className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>

      {/* Notes feed */}
      {notes.map((note) => {
        const hasReplies = note.thread.length > 0;
        const isExpanded = expandedNotes.has(note.id);

        return (
          <div key={note.id} className="relative flex flex-col items-start border-b-[0.5px] border-[var(--color-border)] pb-4 pt-2">
            <div className="flex flex-col gap-2 items-start pb-3 pt-2 w-full">
              <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />
              <div className="flex items-center w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[var(--color-text)] leading-none">{note.name}</span>
                  {note.external && (() => {
                    const meta = NOTE_SOURCE_META[note.external.source];
                    return (
                      <span
                        className={`inline-flex items-center rounded-[4px] border px-1 py-0.5 text-[10px] font-medium leading-none shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] ${meta.bg} ${meta.border} ${meta.text}`}
                      >
                        {note.external.source}
                      </span>
                    );
                  })()}
                </div>
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
              <div className="absolute right-[16px] top-[10px] flex items-center gap-2">
                <span className="text-[10px] text-[var(--color-text-secondary)] leading-none">{note.time}</span>
                <button aria-label="More options" className="block cursor-pointer w-[13px] h-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
                  <Ellipsis className="w-[13px] h-[13px] text-[var(--color-text-secondary)]" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-2 py-1 w-full overflow-hidden"
                >
                  {hasReplies ? (
                    <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => toggleExpand(note.id)}>
                      <Reply className="w-4 h-4 text-[var(--color-brand)]" />
                      <span className="text-xs text-[var(--color-brand)] leading-4">
                        {note.thread.length} {note.thread.length === 1 ? "reply" : "replies"}
                      </span>
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => setReplyingTo(replyingTo === note.id ? null : note.id)}>
                      <Reply className="w-4 h-4 text-[var(--color-brand)]" />
                      <span className="text-xs text-[var(--color-brand)] leading-4">Reply</span>
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col w-full overflow-hidden"
                >
                  {hasReplies && (
                    <div className="flex items-start gap-2 pl-2 w-full">
                      <div className="w-0 self-stretch border-l border-[var(--color-border)] shrink-0" />
                      <div className="flex-1 flex flex-col gap-2 py-2 min-w-0">
                        {note.thread.map((reply, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            className="flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between leading-none w-full">
                              <span className="text-xs font-medium text-[var(--color-text)]">{reply.name}</span>
                              <span className="text-[10px] text-[var(--color-text-secondary)]">{reply.time}</span>
                            </div>
                            <p className="text-xs text-[var(--color-text)] leading-4 w-full whitespace-pre-wrap">{reply.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    <div className="flex items-center gap-1 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
                      <input
                        type="text"
                        className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
                        placeholder={`Reply to ${note.name.split(" ")[0]}`}
                        value={replyTexts[note.id] || ""}
                        onChange={(e) => setReplyTexts((prev) => ({ ...prev, [note.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") handleReplySubmit(note.id); }}
                      />
                      <button
                        onClick={() => handleReplySubmit(note.id)}
                        aria-label="Send reply"
                        className="bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
                      >
                        <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
                      </button>
                    </div>
                  </div>

                  {hasReplies && (
                    <div className="flex items-center justify-end pl-2 py-1 w-full">
                      <button className="flex items-center gap-1 py-0.5 cursor-pointer" onClick={() => toggleExpand(note.id)}>
                        <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                        <span className="text-xs text-[var(--color-text-muted)] leading-4">Hide Replies</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!hasReplies && !isExpanded && replyingTo === note.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex items-center gap-1 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <input
                      type="text"
                      className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
                      placeholder={`Reply to ${note.name.split(" ")[0]}`}
                      value={replyTexts[note.id] || ""}
                      onChange={(e) => setReplyTexts((prev) => ({ ...prev, [note.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") handleReplySubmit(note.id); }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleReplySubmit(note.id)}
                      aria-label="Send reply"
                      className="bg-[var(--color-brand)] border-[0.417px] border-[rgba(255,255,255,0.2)] rounded-full p-[3.333px] flex items-center shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
                    >
                      <ArrowUp className="w-[13.333px] h-[13.333px] text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
