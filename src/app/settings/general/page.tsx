"use client";

import { useState, useRef, useCallback } from "react";
import { SettingsLayout } from "@/app/components/SettingsLayout";
import type { SettingsTab } from "@/app/components/SettingsLayout";
import { PipelineEditor } from "@/app/components/PipelineEditor";
import type { PipelineEditorHandle } from "@/app/components/PipelineEditor";
import { GeneralSettingsForm } from "@/app/components/GeneralSettingsForm";
import { ProjectsSettingsForm } from "@/app/components/ProjectsSettingsForm";

const generalTabs: SettingsTab[] = [
  { id: "general", label: "General" },
  { id: "projects", label: "Projects" },
  { id: "pipeline", label: "Pipeline" },
  { id: "branding", label: "Branding" },
  { id: "notifications", label: "Notifications" },
];

export default function GeneralSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const pipelineRef = useRef<PipelineEditorHandle>(null);

  const handleSave = useCallback(() => {
    pipelineRef.current?.saveLayout();
  }, []);

  return (
    <SettingsLayout
      title="Organization"
      breadcrumbs={["Settings", "General"]}
      tabs={generalTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSave={handleSave}
    >
      {activeTab === "general" ? (
        <GeneralSettingsForm />
      ) : activeTab === "projects" ? (
        <ProjectsSettingsForm />
      ) : activeTab === "pipeline" ? (
        <PipelineEditor ref={pipelineRef} />
      ) : (
        <div className="flex-1 min-h-[400px] rounded-xl border border-dashed border-[#d5c8b8] bg-[#f4f1ed]" />
      )}
    </SettingsLayout>
  );
}
