"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PanelLeft, Bell, ChevronRight } from "lucide-react";
import { MLSidebarProvider } from "@/app/lib/monalee-ui/components/MLSidebar";
import { AppSidebar } from "./AppSidebar";

export interface SettingsTab {
  id: string;
  label: string;
}

interface SettingsLayoutProps {
  title: string;
  breadcrumbs: string[];
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSave?: () => void;
  children?: React.ReactNode;
}

export function SettingsLayout({
  title,
  breadcrumbs,
  tabs,
  activeTab,
  onTabChange,
  onSave,
  children,
}: SettingsLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <MLSidebarProvider>
      <div className="fixed inset-0 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`shrink-0 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden transition-[width] duration-200 ease-linear ${
            sidebarOpen ? "w-64" : "w-[55px]"
          }`}
        >
          <AppSidebar
            currentPage="settings"
            onNavigate={(page) => {
              if (page === "projects") router.push("/");
              if (page === "dashboard") router.push("/");
            }}
            collapsed={!sidebarOpen}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0 border-l border-[#d7cfc5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {/* Top bar */}
          <header className="h-16 min-h-[64px] border-b border-[#d7cfc5] bg-[#fefbf7] flex items-center justify-between px-4 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors"
              >
                <PanelLeft className="w-4 h-4 text-[#554e46]" />
              </button>
              <div className="w-2 flex items-center justify-center">
                <div className="h-[15px] w-px bg-[#d7cfc5]" />
              </div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2.5">
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      {i > 0 && (
                        <ChevronRight className="w-[15px] h-[15px] text-[#7b6f60]" />
                      )}
                      <span
                        className={`text-sm leading-5 ${
                          isLast
                            ? "font-normal text-[#554e46]"
                            : "font-normal text-[#7b6f60]"
                        }`}
                      >
                        {crumb}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer hover:bg-cream-100 transition-colors">
                <Bell className="w-4 h-4 text-[#554e46]" />
              </button>
              <div className="w-6 h-6 rounded-lg bg-[#f4f1ed] flex items-center justify-center cursor-pointer overflow-hidden">
                <span className="text-sm font-normal text-[#554e46] leading-5">E</span>
              </div>
            </div>
          </header>

          {/* Settings content area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#fefbf7]">
            {/* Sticky header: title + tabs */}
            <div className="shrink-0 px-8 pt-8 bg-[#fefbf7]">
              {/* Title row: title + Save Changes */}
              <div className="flex items-center justify-between">
                <h1 className="text-[30px] font-bold text-[#554e46] leading-9 tracking-[0px]">
                  {title}
                </h1>
                <button
                  onClick={onSave}
                  className="h-9 px-4 py-2 bg-[#6e04bd] text-white text-sm font-medium leading-5 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-[#5c03a0] transition-colors"
                >
                  Save Changes
                </button>
              </div>

              {/* Underline tab navigation */}
              <div className="border-b border-[#d7cfc5] flex items-start mt-0">
                <div className="flex items-center flex-1 max-w-[1304px]">
                  {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative flex items-center justify-center py-1.5 cursor-pointer border-b-2 ${
                          isActive
                            ? "border-[#6e04bd]"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-center px-2.5 py-2 rounded-lg">
                          <span
                            className={`text-sm leading-5 ${
                              isActive
                                ? "text-[#554e46]"
                                : "text-[#7b6f60]"
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollable tab content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {children}
            </div>
          </div>
        </main>

        {/* Portal target for right side panels (e.g. EditStagePanel) */}
        <div id="settings-right-panel" className="shrink-0 flex" />
      </div>
    </MLSidebarProvider>
  );
}
