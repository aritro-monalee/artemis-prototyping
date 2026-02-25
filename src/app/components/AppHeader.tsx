"use client";

import { PanelLeft, Bell } from "lucide-react";

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="h-16 min-h-[64px] border-b border-[#d7cfc5] bg-white flex items-center justify-between px-4 shrink-0">
      {/* Left: PanelLeft toggle + separator + breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors"
        >
          <PanelLeft className="w-4 h-4 text-[#554e46]" />
        </button>
        {/* Separator */}
        <div className="w-2 flex items-center justify-center">
          <div className="h-[15px] w-px bg-[#d7cfc5]" />
        </div>
        <span className="text-sm font-medium text-[#554e46] leading-5">
          Projects
        </span>
      </div>

      {/* Right: Bell + Avatar */}
      <div className="flex items-center gap-2">
        <button className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors">
          <Bell className="w-4 h-4 text-[#554e46]" />
        </button>
        <div className="w-6 h-6 rounded-lg bg-[#f4f1ed] flex items-center justify-center cursor-pointer overflow-hidden">
          <span className="text-sm font-normal text-[#554e46] leading-5">E</span>
        </div>
      </div>
    </header>
  );
}
