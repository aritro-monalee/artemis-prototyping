"use client";

import { useState, useRef, useCallback } from "react";
import { SettingsLayout } from "@/app/components/SettingsLayout";
import type { SettingsTab } from "@/app/components/SettingsLayout";
import { PipelineEditor } from "@/app/components/PipelineEditor";
import type { PipelineEditorHandle } from "@/app/components/PipelineEditor";
import { DesignToolSettings } from "@/app/components/DesignToolSettings";
import { DeveloperSettings } from "@/app/components/DeveloperSettings";

const installerTabs: SettingsTab[] = [
  { id: "general", label: "General" },
  { id: "pipeline", label: "Pipeline" },
  { id: "financiers", label: "Financiers" },
  { id: "design-tool", label: "Design Tool" },
  { id: "contracts", label: "Contracts" },
  { id: "proposals", label: "Proposals" },
  { id: "developer", label: "Developer" },
];

export default function InstallerSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const pipelineRef = useRef<PipelineEditorHandle>(null);

  const handleSave = useCallback(() => {
    pipelineRef.current?.saveLayout();
  }, []);

  return (
    <SettingsLayout
      title="Installer.Name"
      breadcrumbs={["Settings", "Installers", "Installer.Name"]}
      tabs={installerTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSave={handleSave}
    >
      {activeTab === "pipeline" ? (
        <PipelineEditor ref={pipelineRef} />
      ) : activeTab === "design-tool" ? (
        <DesignToolSettings />
      ) : activeTab === "developer" ? (
        <DeveloperSettings />
      ) : (
        <div className="flex-1 min-h-[400px] rounded-xl border border-dashed border-[#d5c8b8] bg-[#f4f1ed]" />
      )}
    </SettingsLayout>
  );
}
