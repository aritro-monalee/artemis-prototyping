"use client";

import { PanelLeft, Bell } from "lucide-react";

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="h-16 min-h-[64px] border-b border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-between px-4 shrink-0">
      {/* Left: PanelLeft toggle + separator + breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
        >
          <PanelLeft className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        {/* Separator */}
        <div className="w-2 flex items-center justify-center">
          <div className="h-[15px] w-px bg-[var(--color-border)]" />
        </div>
        <span className="text-sm font-medium text-[var(--color-text)] leading-5">
          Projects
        </span>
      </div>

      {/* Right: Bell + Avatar */}
      <div className="flex items-center gap-2">
        <button aria-label="Notifications" className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
          <Bell className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <div className="w-6 h-6 rounded-lg bg-[var(--color-surface)] flex items-center justify-center cursor-pointer overflow-hidden">
          <span className="text-sm font-normal text-[var(--color-text)] leading-5">E</span>
        </div>
      </div>
    </header>
  );
}
