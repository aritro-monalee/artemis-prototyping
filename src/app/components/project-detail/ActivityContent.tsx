"use client";

import { Search, ListFilter, Ellipsis } from "lucide-react";
import { useProjectStore } from "@/app/store/ProjectStore";

export function ActivityContent({ projectId }: { projectId: string }) {
  const { getActivities } = useProjectStore();
  const activities = getActivities(projectId);
  return (
    <div className="flex flex-col gap-0 h-full items-start w-full">
      {/* Search + filter */}
      <div className="flex gap-1 items-start pb-4 w-full">
        <div className="flex-1 flex items-center gap-1.5 bg-white border-[0.5px] border-[var(--color-border)] rounded-md pl-3 pr-1.5 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_1px_rgba(110,4,189,0.15),0_1px_2px_0_rgba(0,0,0,0.05)]">
          <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
          <input type="text" className="flex-1 text-xs text-[var(--color-text)] leading-none bg-transparent outline-none placeholder:text-[var(--color-text-muted)]" placeholder="Search activity" />
        </div>
        <button aria-label="Filter activity" className="w-[30px] h-[30px] flex items-center justify-center rounded-[4px] p-1 shrink-0 hover:bg-[var(--color-surface)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
          <ListFilter className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>

      {/* Activity feed */}
      <div className="flex flex-col w-full">
        {activities.map((a) => (
          <div key={a.id} className="flex gap-3 items-start border-b-[0.5px] border-[#d5c8b8] py-3 overflow-hidden w-full">
            <div className="w-[22px] h-[22px] rounded-full bg-[#d4c9b8] shrink-0" />

            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <div className="flex gap-1 items-center w-full">
                <div className="flex-1 flex items-center min-w-0">
                  <span className="text-xs font-medium text-[var(--color-text)] leading-none">{a.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[var(--color-text-secondary)] leading-none">{a.time}</span>
                  <button aria-label="More options" className="block cursor-pointer overflow-hidden w-[13.333px] h-[13.333px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
                    <Ellipsis className="w-[13.333px] h-[13.333px] text-[var(--color-text-secondary)]" />
                  </button>
                </div>
              </div>

              {a.lines.map((line, i) => (
                <div key={i} className="flex gap-1 items-center w-full">
                  <span className="text-sm leading-5 text-[var(--color-text-muted)]">{line.text}</span>
                  {line.ids && (
                    <div className="flex gap-1 items-center">
                      {line.ids.map((id, j) => (
                        <span key={j} className="text-xs text-[var(--color-text-secondary)] leading-4 underline decoration-dotted decoration-[var(--color-text)]">{id}</span>
                      ))}
                    </div>
                  )}
                  {line.extra && (
                    <span className="text-sm leading-5 text-[var(--color-text-muted)]">{line.extra}</span>
                  )}
                </div>
              ))}

              {a.quote && (
                <div className="bg-[rgba(0,0,0,0.02)] border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-lg p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] w-full">
                  <p className="text-xs text-[var(--color-text)] leading-4 whitespace-pre-wrap">
                    <span>{a.quote.text}</span>
                    {a.quote.mention && (
                      <span className="text-[var(--color-brand)]">{a.quote.mention.text}</span>
                    )}
                    <span className="text-[var(--color-text-muted)]"> ?</span>
                  </p>
                </div>
              )}

              {a.autosave && (
                <span className="text-xs text-[var(--color-text-secondary)] leading-none">Autosave</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
