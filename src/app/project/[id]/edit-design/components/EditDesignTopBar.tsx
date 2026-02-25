"use client";

import {
  X,
  ChevronDown,
  BadgeCheck,
  History,
  FileDown,
} from "lucide-react";
import { LogoMark } from "@/app/components/Logo";

export function EditDesignTopBar({ onClose }: { onClose: () => void }) {
  return (
    <header className="h-14 shrink-0 bg-[var(--color-bg)] border-b border-l border-[var(--color-border)] flex items-center justify-between px-3 z-20">
      <div className="flex flex-1 items-center gap-4 py-2 rounded-lg">
        <LogoMark />
        <div className="flex items-center gap-4">
          <StatChip value="$317" suffix="/Month" label="Finance Payment" />
          <StatChip value="4.45" suffix="kW" label="System Size" />
          <StatChip value="6,730kWH" label="Est. Production" />
          <StatChip value="105%" label="Est. Offset" />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-md">
        <div className="flex items-center gap-1">
          <TopBarIconBtn>
            <BadgeCheck className="w-4 h-4" />
          </TopBarIconBtn>
          <TopBarIconBtn>
            <History className="w-4 h-4" />
          </TopBarIconBtn>
        </div>
        <div className="flex items-center gap-1 bg-[var(--color-surface)] rounded-md">
          <div className="flex items-center gap-2 bg-white border border-[var(--color-border-alt)] rounded-md h-9 px-3 shadow-xs cursor-pointer">
            <span className="text-sm text-[var(--color-text)]">EN</span>
            <ChevronDown className="w-4 h-4 text-[var(--color-text)]" />
          </div>
          <button className="bg-[var(--color-surface)] flex items-center justify-center rounded-md w-8 h-9 hover:bg-[var(--color-border-alt)] transition-colors">
            <FileDown className="w-4 h-4 text-[var(--color-text)]" />
          </button>
          <button className="bg-[var(--color-surface)] flex items-center justify-center rounded-md w-8 h-9 hover:bg-[var(--color-border-alt)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </button>
        </div>
        <button className="h-9 px-4 rounded-md bg-[var(--color-brand)] text-white text-sm font-medium shadow-xs hover:bg-[#5a039d] transition-colors">
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-[var(--color-surface)] flex items-center justify-center rounded-md w-9 h-9 shadow-xs hover:bg-[var(--color-border-alt)] transition-colors"
        >
          <X className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>
    </header>
  );
}

function StatChip({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 items-start justify-center">
      <div className="flex items-end text-sm font-semibold text-[var(--color-text)] leading-none">
        <span className="text-right">{value}</span>
        {suffix && <span className="text-center">{suffix}</span>}
      </div>
      <p className="text-[9px] font-medium text-[var(--color-text-muted)] leading-none">
        {label}
      </p>
    </div>
  );
}

function TopBarIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-transparent flex items-center justify-center w-8 h-9 rounded-md hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text)]">
      {children}
    </button>
  );
}
