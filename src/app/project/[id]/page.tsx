"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MLSidebarProvider } from "@/app/lib/monalee-ui/components/MLSidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import {
  ProjectDetailHeader,
  ProjectInfoActionBar,
} from "@/app/components/ProjectDetailHeader";
import { ProjectDetailMain } from "@/app/components/ProjectDetailMain";
import { ProjectDetailSidebar } from "@/app/components/ProjectDetailSidebar";
import { ProjectNotFound } from "@/app/components/shared/ProjectNotFound";
import { useProjectStore } from "@/app/store/ProjectStore";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { getProjectDetail } = useProjectStore();
  const project = getProjectDetail(projectId);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [detailTab, setDetailTab] = useState("details");
  const [detailSidebarOpen, setDetailSidebarOpen] = useState(true);
  const [showProjectChecklist, setShowProjectChecklist] = useState(false);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <MLSidebarProvider>
      <div className="fixed inset-0 flex overflow-hidden bg-[var(--color-bg)]">
        {/* Left sidebar — collapsed by default on detail page */}
        <aside
          className={`shrink-0 flex flex-col bg-sidebar text-sidebar-foreground overflow-hidden transition-[width] duration-200 ease-linear ${
            sidebarCollapsed ? "w-[55px]" : "w-64"
          }`}
        >
          <AppSidebar
            currentPage="projects"
            onNavigate={(page) => {
              if (page === "projects") router.push("/");
            }}
            collapsed={sidebarCollapsed}
          />
        </aside>

        {/* Right side: header + content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 border-l border-[var(--color-border)] shadow-xs">
          {/* Top header row: breadcrumb, bell, avatar */}
          <ProjectDetailHeader
            project={project}
            onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
            onBack={() => router.push("/")}
          />

          {/* Below header: View Navigation (stats + main) + Side Panel */}
          <div className="flex-1 flex overflow-hidden min-w-0">
            {/* View Navigation column */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
              {/* Stats action bar */}
              <ProjectInfoActionBar project={project} sidebarOpen={detailSidebarOpen} onOpenSidebar={() => setDetailSidebarOpen(true)} />

              {/* Main content: map + equipment (scrollable) */}
              <ProjectDetailMain project={project} activeTab={detailTab} onEditDesign={() => router.push(`/project/${projectId}/edit-design`)} />
            </div>

            {/* Right side panel (370px) — animated width */}
            <div
              className="shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ width: detailSidebarOpen ? 370 : 0 }}
            >
              <div className="w-[370px] h-full">
                <ProjectDetailSidebar
                  project={project}
                  activeTab={detailTab}
                  onTabChange={setDetailTab}
                  showProjectChecklist={showProjectChecklist}
                  onShowProjectChecklist={setShowProjectChecklist}
                  onClose={() => setDetailSidebarOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MLSidebarProvider>
  );
}
