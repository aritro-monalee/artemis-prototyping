"use client";

import {
  PanelLeft,
  PanelRightOpen,
  Bell,
  ChevronRight,
  ChevronDown,
  FileDown,
  Send,
  TvMinimalPlay,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectDetailData } from "@/app/data/projects";

interface ProjectDetailHeaderProps {
  project: ProjectDetailData;
  onToggleSidebar: () => void;
  onBack: () => void;
}

export function ProjectDetailHeader({
  project,
  onToggleSidebar,
  onBack,
}: ProjectDetailHeaderProps) {
  return (
    <header className="h-16 shrink-0 bg-[var(--color-bg)] border-b border-[var(--color-border)] border-l flex items-center justify-between px-4 sticky top-0 z-10">
      {/* Left: toggle + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-cream-100 transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
        >
          <PanelLeft className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <div className="w-2 flex items-center justify-center shrink-0">
          <div className="h-[15px] w-px bg-[var(--color-border)]" />
        </div>
        <nav className="flex flex-wrap items-center gap-2.5 text-sm">
          <button
            onClick={onBack}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors shrink-0"
          >
            Projects
          </button>
          <ChevronRight className="w-[15px] h-[15px] text-[var(--color-text-muted)] shrink-0" />
          <button
            onClick={onBack}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors shrink-0"
          >
            {project.ownerName}
          </button>
          <ChevronRight className="w-[15px] h-[15px] text-[var(--color-text-muted)] shrink-0" />
          <span className="text-[var(--color-text)] shrink-0">
            {project.address}
          </span>
        </nav>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2 shrink-0">
        <button aria-label="Notifications" className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-cream-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
          <Bell className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <div className="w-6 h-6 rounded-md bg-[var(--color-surface)] flex items-center justify-center overflow-hidden">
          <span className="text-sm text-[var(--color-text)]">E</span>
        </div>
      </div>
    </header>
  );
}

export function ProjectInfoActionBar({
  project,
  sidebarOpen,
  onOpenSidebar,
}: {
  project: ProjectDetailData;
  sidebarOpen?: boolean;
  onOpenSidebar?: () => void;
}) {
  return (
    <div className="h-16 shrink-0 bg-[var(--color-bg)] border-b border-[var(--color-border)] border-l flex items-center justify-between px-4 sticky top-0 z-[2]">
      {/* Left: stats */}
      <div className="flex items-start gap-4 py-2 rounded-lg">
        <StatItem value="$0" suffix="/Month" label="Finance Payment" />
        <StatItem value="0" suffix="kW" label="System Size" />
        <StatItem value="0%" label="Est. Offset" />
      </div>

      {/* Right: action buttons + sidebar toggle */}
      <div className="flex items-center gap-5 pr-px">
        <div className="flex items-center gap-4 rounded-md">
          <div className="flex items-center gap-2 bg-[var(--color-surface)] rounded-md">
            <div className="flex items-center gap-2 bg-white border border-[var(--color-border-alt)] rounded-md h-9 px-3 shadow-xs">
              <span className="text-sm text-[var(--color-text)]">EN</span>
              <ChevronDown className="w-4 h-4 text-[var(--color-text)]" />
            </div>
            <ActionButton icon={<FileDown className="w-4 h-4" />} aria-label="Download" />
            <ActionButton icon={<Send className="w-4 h-4" />} aria-label="Send" />
            <ActionButton icon={<TvMinimalPlay className="w-4 h-4" />} aria-label="Play" />
          </div>
        </div>
        <AnimatePresence>
          {!sidebarOpen && onOpenSidebar && (
            <motion.button
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 36 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={onOpenSidebar}
              aria-label="Open sidebar"
              className="h-9 flex items-center justify-center rounded-md text-[var(--color-text)] hover:bg-cream-100 transition-colors shrink-0 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
            >
              <PanelRightOpen className="w-4 h-4 shrink-0" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 items-start justify-center">
      <div className="flex items-end text-base font-semibold text-[var(--color-text)] leading-none">
        <span className="text-right">{value}</span>
        {suffix && <span className="text-center">{suffix}</span>}
      </div>
      <p className="text-xs font-medium text-[var(--color-text-muted)] leading-none">{label}</p>
    </div>
  );
}

function ActionButton({ icon, "aria-label": ariaLabel }: { icon: React.ReactNode; "aria-label"?: string }) {
  return (
    <button aria-label={ariaLabel} className="w-9 h-9 flex items-center justify-center rounded-md bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-cream-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30">
      {icon}
    </button>
  );
}
