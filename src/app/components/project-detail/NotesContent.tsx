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
import type { NoteSource } from "@/app/data/projects";

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
  const [hoveredNoteId, setHoveredNoteId] = useState<number | null>(null);

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
          <div
            key={note.id}
            className="relative flex flex-col items-start border-b-[0.5px] border-[var(--color-border)] pb-4 pt-2"
            onMouseEnter={() => setHoveredNoteId(note.id)}
            onMouseLeave={() => setHoveredNoteId(null)}
          >
            <div className="flex flex-col gap-2 items-start pb-3 pt-2 w-full">
              <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />
              <div className="flex items-center w-full">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[var(--color-text)] leading-none">{note.name}</span>
                  {note.external && (
                    <CrmSourceLogo source={note.external.source} hovered={hoveredNoteId === note.id} />
                  )}
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

const MUTED_CREAM = "#c8bfa8";

const CRM_ICONS: Record<string, { viewBox: string; path: string; brandColor: string }> = {
  Salesforce: {
    viewBox: "0 0 128 128",
    path: "M53.01 31.44c3.98-4.14 9.51-6.71 15.64-6.71 8.14 0 15.24 4.54 19.02 11.28a26.26 26.26 0 0110.75-2.29c14.68 0 26.58 12.01 26.58 26.81 0 14.81-11.9 26.82-26.58 26.82-1.79 0-3.54-.18-5.24-.52-3.33 5.94-9.68 9.95-16.96 9.95-3.05 0-5.93-.7-8.5-1.96-3.38 7.94-11.24 13.51-20.41 13.51-9.55 0-17.68-6.04-20.8-14.51-1.36.29-2.78.44-4.23.44-11.37 0-20.58-9.31-20.58-20.79 0-7.7 4.14-14.42 10.29-18.01a23.727 23.727 0 01-1.97-9.51c0-13.21 10.72-23.92 23.95-23.92 7.76-.01 14.67 3.69 19.04 9.41",
    brandColor: "#00A1E0",
  },
  HubSpot: {
    viewBox: "0 0 24 24",
    path: "M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z",
    brandColor: "#FF7A59",
  },
  Slack: {
    viewBox: "0 0 16 16",
    path: "M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111.756 8.43 1.68 8.43h1.682zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 01-1.682-1.68zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682zm6.749 1.682c0-.926.755-1.682 1.68-1.682S16 4.964 16 5.889s-.756 1.681-1.68 1.681h-1.681zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 018.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68s.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681z",
    brandColor: "#4A154B",
  },
  Zendesk: {
    viewBox: "0 0 24 24",
    path: "M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z",
    brandColor: "#03363D",
  },
  Intercom: {
    viewBox: "0 0 24 24",
    path: "M21 0H3C1.343 0 0 1.343 0 3v18c0 1.658 1.343 3 3 3h18c1.658 0 3-1.342 3-3V3c0-1.657-1.342-3-3-3zm-5.801 4.399c0-.44.36-.8.802-.8.44 0 .8.36.8.8v10.688c0 .442-.36.801-.8.801-.443 0-.802-.359-.802-.801V4.399zM11.2 3.994c0-.44.357-.799.8-.799s.8.359.8.799v11.602c0 .44-.357.8-.8.8s-.8-.36-.8-.8V3.994zm-4 .405c0-.44.359-.8.799-.8.443 0 .802.36.802.8v10.688c0 .442-.36.801-.802.801-.44 0-.799-.359-.799-.801V4.399zM3.199 6c0-.442.36-.8.802-.8.44 0 .799.358.799.8v7.195c0 .441-.359.8-.799.8-.443 0-.802-.36-.802-.8V6zM20.52 18.202c-.123.105-3.086 2.593-8.52 2.593-5.433 0-8.397-2.486-8.521-2.593-.335-.288-.375-.792-.086-1.128.285-.334.79-.375 1.125-.09.047.041 2.693 2.211 7.481 2.211 4.848 0 7.456-2.186 7.479-2.207.334-.289.839-.25 1.128.086.289.336.25.84-.086 1.128zm.281-5.007c0 .441-.36.8-.801.8-.441 0-.801-.36-.801-.8V6c0-.442.361-.8.801-.8.441 0 .801.357.801.8v7.195z",
    brandColor: "#286EFA",
  },
  "Google Calendar": {
    viewBox: "0 0 24 24",
    path: "M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 000 1.895v16.421h5.684V5.684h12.632zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0022.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z",
    brandColor: "#4285F4",
  },
  Jira: {
    viewBox: "0 0 24 24",
    path: "M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.758a1.001 1.001 0 00-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024 12.483V1.005A1.001 1.001 0 0023.013 0Z",
    brandColor: "#0052CC",
  },
};

function CrmSourceLogo({ source, hovered }: { source: NoteSource; hovered: boolean }) {
  const icon = CRM_ICONS[source];
  if (!icon) return null;

  return (
    <svg
      width="14"
      height="14"
      viewBox={icon.viewBox}
      className="shrink-0"
      aria-label={source}
    >
      <path
        d={icon.path}
        fill={hovered ? icon.brandColor : MUTED_CREAM}
        style={{ transition: "fill 200ms ease-out" }}
      />
    </svg>
  );
}
