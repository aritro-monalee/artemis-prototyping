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
    <header className="h-16 shrink-0 bg-[#fefbf7] border-b border-[#d7cfc5] border-l flex items-center justify-between px-4 sticky top-0 z-10">
      {/* Left: toggle + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-cream-100 transition-colors shrink-0"
        >
          <PanelLeft className="w-4 h-4 text-[#554e46]" />
        </button>
        <div className="w-2 flex items-center justify-center shrink-0">
          <div className="h-[15px] w-px bg-[#d7cfc5]" />
        </div>
        <nav className="flex flex-wrap items-center gap-2.5 text-sm">
          <button
            onClick={onBack}
            className="text-[#7b6f60] hover:text-[#554e46] transition-colors shrink-0"
          >
            Projects
          </button>
          <ChevronRight className="w-[15px] h-[15px] text-[#7b6f60] shrink-0" />
          <button
            onClick={onBack}
            className="text-[#7b6f60] hover:text-[#554e46] transition-colors shrink-0"
          >
            {project.ownerName}
          </button>
          <ChevronRight className="w-[15px] h-[15px] text-[#7b6f60] shrink-0" />
          <span className="text-[#554e46] shrink-0">
            {project.address}
          </span>
        </nav>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-cream-100 transition-colors">
          <Bell className="w-4 h-4 text-[#554e46]" />
        </button>
        <div className="w-6 h-6 rounded-md bg-[#f4f1ed] flex items-center justify-center overflow-hidden">
          <span className="text-sm text-[#554e46]">E</span>
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
    <div className="h-16 shrink-0 bg-[#fefbf7] border-b border-[#d7cfc5] border-l flex items-center justify-between px-4 sticky top-0 z-[2]">
      {/* Left: stats */}
      <div className="flex items-start gap-4 py-2 rounded-lg">
        <StatItem value="$0" suffix="/Month" label="Finance Payment" />
        <StatItem value="0" suffix="kW" label="System Size" />
        <StatItem value="0%" label="Est. Offset" />
      </div>

      {/* Right: action buttons + sidebar toggle */}
      <div className="flex items-center gap-5 pr-px">
        <div className="flex items-center gap-4 rounded-md">
          <div className="flex items-center gap-2 bg-[#f4f1ed] rounded-md">
            <div className="flex items-center gap-2 bg-white border border-[#e3e0dd] rounded-md h-9 px-3 shadow-xs">
              <span className="text-sm text-[#554e46]">EN</span>
              <ChevronDown className="w-4 h-4 text-[#554e46]" />
            </div>
            <ActionButton icon={<FileDown className="w-4 h-4" />} />
            <ActionButton icon={<Send className="w-4 h-4" />} />
            <ActionButton icon={<TvMinimalPlay className="w-4 h-4" />} />
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
              className="h-9 flex items-center justify-center rounded-md text-[#554e46] hover:bg-cream-100 transition-colors shrink-0 overflow-hidden"
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
      <div className="flex items-end text-base font-semibold text-[#554e46] leading-none">
        <span className="text-right">{value}</span>
        {suffix && <span className="text-center">{suffix}</span>}
      </div>
      <p className="text-xs font-medium text-[#7b6f60] leading-none">{label}</p>
    </div>
  );
}

function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-9 h-9 flex items-center justify-center rounded-md bg-[#f4f1ed] text-[#554e46] hover:bg-cream-200 transition-colors">
      {icon}
    </button>
  );
}
