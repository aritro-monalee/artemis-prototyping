"use client";

import { useState, useRef, useEffect } from "react";

export const TEAM_MEMBERS = [
  "Mike Chen",
  "Mark Smith",
  "Michael Jones",
  "Maria Garcia",
  "Maya Patel",
  "Sarah Johnson",
  "Ethan Hackett",
  "Brian",
];

export function parseTextParts(text: string): { text: string; mention?: boolean }[] {
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

export function renderTextWithMentions(text: string) {
  const parts = parseTextParts(text);
  return parts.map((part, i) =>
    part.mention ? (
      <span key={i} className="font-medium text-[var(--color-brand)]">{part.text}</span>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

export function MentionInput({
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
              <span key={i} className="font-medium text-[var(--color-brand)]">{part.text}</span>
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
          caretColor: "var(--color-text)",
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
                  ? "bg-[var(--color-surface)] border-[0.5px] border-[#d5c8b8]"
                  : "border-[0.5px] border-transparent hover:bg-[var(--color-surface)]"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#d4c9b8] shrink-0" />
              <span className="text-[var(--color-text-muted)]">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
