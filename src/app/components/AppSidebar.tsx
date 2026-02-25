"use client";

import {
  MLSidebarMenu,
  MLSidebarMenuButton,
  MLSidebarMenuItem,
  MLSidebarMenuSub,
  MLSidebarMenuSubButton,
  MLSidebarMenuSubItem,
} from "@/app/lib/monalee-ui/components/MLSidebar";
import {
  LayoutDashboard,
  FolderKanban,
  Store,
  GraduationCap,
  Settings,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  CirclePlus,
  User,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { settingsItems } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";
import { Logo, LogoMark } from "./Logo";

interface AppSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed?: boolean;
}

export function AppSidebar({
  currentPage,
  onNavigate,
  collapsed = false,
}: AppSidebarProps) {
  const { recentProjects } = useProjectStore();
  const router = useRouter();
  const pathname = usePathname();
  const isOnSettingsPage = pathname.startsWith("/settings");
  const [projectsOpen, setProjectsOpen] = useState(!isOnSettingsPage);
  const [recentlyViewedOpen, setRecentlyViewedOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(isOnSettingsPage);

  if (collapsed) {
    return <CollapsedSidebar currentPage={currentPage} onNavigate={onNavigate} />;
  }

  return (
    <>
      {/* Header */}
      <div className="h-16 shrink-0 flex items-center justify-between px-2">
        <div className="flex items-center px-2">
          <div className="flex items-center gap-0">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
            <Search className="w-4 h-4 text-[var(--color-text)]" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
            <CirclePlus className="w-4 h-4 text-[var(--color-text)]" />
          </button>
        </div>
      </div>

      {/* Nav - scrollable area */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="flex flex-col p-2">
          <MLSidebarMenu>
            <MLSidebarMenuItem>
              <MLSidebarMenuButton
                isActive={currentPage === "dashboard"}
                onClick={() => onNavigate("dashboard")}
                className="cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </MLSidebarMenuButton>
            </MLSidebarMenuItem>

            <MLSidebarMenuItem>
              <MLSidebarMenuButton
                isActive={currentPage === "projects"}
                onClick={() => {
                  onNavigate("projects");
                  setProjectsOpen((v) => !v);
                }}
                className="cursor-pointer"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Projects</span>
                {projectsOpen ? (
                  <ChevronDown className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronRight className="ml-auto w-4 h-4" />
                )}
              </MLSidebarMenuButton>

              {projectsOpen && (
                <MLSidebarMenuSub>
                  <div className="px-3 pt-2 pb-0.5">
                    <span className="text-xs font-semibold text-cream-900">
                      Recent Projects
                    </span>
                  </div>
                  {recentProjects.map((project) => (
                    <MLSidebarMenuSubItem key={project.id}>
                      <MLSidebarMenuSubButton className="cursor-pointer text-sm text-cream-800 whitespace-nowrap">
                        {project.name}
                      </MLSidebarMenuSubButton>
                    </MLSidebarMenuSubItem>
                  ))}
                </MLSidebarMenuSub>
              )}
            </MLSidebarMenuItem>

            <MLSidebarMenuItem>
              <MLSidebarMenuButton
                isActive={currentPage === "storefronts"}
                onClick={() => onNavigate("storefronts")}
                className="cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Storefronts</span>
              </MLSidebarMenuButton>
            </MLSidebarMenuItem>
          </MLSidebarMenu>
        </div>

        {/* Recently Viewed */}
        <div className="flex flex-col p-2">
          <MLSidebarMenu>
            <MLSidebarMenuItem>
              <button
                onClick={() => setRecentlyViewedOpen((v) => !v)}
                className="flex items-center justify-between w-full h-8 px-2 rounded-lg opacity-70 cursor-pointer"
              >
                <span className="text-xs font-medium text-[var(--color-text)]">
                  Recently Viewed
                </span>
                {recentlyViewedOpen ? (
                  <ChevronDown className="w-4 h-4 text-[var(--color-text)]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--color-text)]" />
                )}
              </button>
              {recentlyViewedOpen && (
                <>
                  {recentProjects.map((project) => (
                    <MLSidebarMenuButton
                      key={project.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/project/${project.id}`)}
                    >
                      <span>{project.name}</span>
                    </MLSidebarMenuButton>
                  ))}
                </>
              )}
            </MLSidebarMenuItem>
          </MLSidebarMenu>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-2 pb-2">
        <MLSidebarMenu>
          <MLSidebarMenuItem>
            <MLSidebarMenuButton className="cursor-pointer">
              <GraduationCap className="w-4 h-4" />
              <span>Learning Center</span>
              <ChevronRight className="ml-auto w-4 h-4" />
            </MLSidebarMenuButton>
          </MLSidebarMenuItem>

          <MLSidebarMenuItem>
            <MLSidebarMenuButton
              onClick={() => setSettingsOpen((v) => !v)}
              className="cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
              {settingsOpen ? (
                <ChevronDown className="ml-auto w-4 h-4" />
              ) : (
                <ChevronRight className="ml-auto w-4 h-4" />
              )}
            </MLSidebarMenuButton>

            {settingsOpen && (
              <MLSidebarMenuSub>
                {settingsItems.map((item) => (
                  <MLSidebarMenuSubItem key={item.id}>
                    <MLSidebarMenuSubButton
                      isActive={pathname.startsWith(item.href)}
                      onClick={() => router.push(item.href)}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </MLSidebarMenuSubButton>
                  </MLSidebarMenuSubItem>
                ))}
              </MLSidebarMenuSub>
            )}
          </MLSidebarMenuItem>

          <MLSidebarMenuItem>
            <MLSidebarMenuButton className="cursor-pointer">
              <LayoutGrid className="w-4 h-4" />
              <span>Admin</span>
              <ChevronRight className="ml-auto w-4 h-4" />
            </MLSidebarMenuButton>
          </MLSidebarMenuItem>
        </MLSidebarMenu>
      </div>
    </>
  );
}

function CollapsedSidebar({
  currentPage,
  onNavigate,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isSettings = pathname.startsWith("/settings");

  return (
    <div className="flex flex-col items-center h-full bg-sidebar">
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-4 px-2 py-5">
        <LogoMark />
      </div>

      {/* Separator */}
      <div className="w-full px-2">
        <div className="h-px bg-sidebar-border" />
      </div>

      {/* Search + Add */}
      <div className="flex flex-col items-center gap-2 py-1.5">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
          <Search className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
          <CirclePlus className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>

      {/* Separator */}
      <div className="w-full px-2">
        <div className="h-px bg-sidebar-border" />
      </div>

      {/* Nav icons */}
      <div className="flex flex-col items-center gap-2 py-1.5">
        <button
          onClick={() => onNavigate("dashboard")}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
            currentPage === "dashboard" ? "bg-[var(--color-surface)]" : "hover:bg-cream-100"
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <button
          onClick={() => onNavigate("projects")}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
            currentPage === "projects" ? "bg-[var(--color-surface)]" : "hover:bg-cream-100"
          }`}
        >
          <FolderKanban className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <button
          onClick={() => onNavigate("storefronts")}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
            currentPage === "storefronts"
              ? "bg-[var(--color-surface)]"
              : "hover:bg-cream-100"
          }`}
        >
          <User className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer icons */}
      <div className="flex flex-col items-center gap-2 p-2 pb-4">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
            <GraduationCap className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <button
          onClick={() => router.push("/settings/general")}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
            isSettings ? "bg-[var(--color-surface)]" : "hover:bg-cream-100"
          }`}
        >
          <Settings className="w-4 h-4 text-[var(--color-text)]" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cream-100 transition-colors cursor-pointer">
          <LayoutGrid className="w-4 h-4 text-[var(--color-text)]" />
        </button>
      </div>
    </div>
  );
}
