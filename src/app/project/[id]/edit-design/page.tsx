"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectNotFound } from "@/app/components/shared/ProjectNotFound";
import { useProjectStore } from "@/app/store/ProjectStore";
import type { DesignComment } from "@/app/data/projects";
import { EditDesignTopBar } from "./components/EditDesignTopBar";
import { EditDesignLeftToolbar } from "./components/EditDesignLeftToolbar";
import { EditDesignCanvas } from "./components/EditDesignCanvas";
import { EditDesignRightSidebar } from "./components/EditDesignRightSidebar";

export default function EditDesignPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const {
    getProjectDetail,
    getDesignComments, updateDesignComments,
    getPlacedLabels, updatePlacedLabels,
  } = useProjectStore();
  const project = getProjectDetail(projectId);
  const comments = getDesignComments(projectId);
  const placedLabels = getPlacedLabels(projectId);
  const [annotationSub, setAnnotationSub] = useState<"notes" | "label" | null>(null);
  const [selectedLabelIdx, setSelectedLabelIdx] = useState<number | null>(null);
  const [labelVisibility, setLabelVisibility] = useState<Record<number, boolean>>({});

  const setComments: React.Dispatch<React.SetStateAction<DesignComment[]>> = (action) => {
    if (typeof action === "function") {
      updateDesignComments(projectId, action);
    } else {
      updateDesignComments(projectId, () => action);
    }
  };
  const setPlacedLabels: React.Dispatch<React.SetStateAction<typeof placedLabels>> = (action) => {
    if (typeof action === "function") {
      updatePlacedLabels(projectId, action);
    } else {
      updatePlacedLabels(projectId, () => action);
    }
  };

  if (!project) {
    return <ProjectNotFound />;
  }

  const handleRootDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes("application/placed-label-index")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleRootDrop = (e: React.DragEvent) => {
    const moveIndex = e.dataTransfer.getData("application/placed-label-index");
    if (moveIndex) {
      e.preventDefault();
      const idx = parseInt(moveIndex, 10);
      setPlacedLabels((prev) => prev.filter((_, i) => i !== idx));
      setSelectedLabelIdx(null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col bg-[var(--color-bg)] overflow-hidden"
      onDragOver={handleRootDragOver}
      onDrop={handleRootDrop}
    >
      <EditDesignTopBar
        onClose={() => router.push(`/project/${projectId}`)}
      />
      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 relative overflow-hidden">
          <EditDesignCanvas
            annotationSub={annotationSub}
            comments={comments}
            setComments={setComments}
            placedLabels={placedLabels}
            setPlacedLabels={setPlacedLabels}
            selectedLabelIdx={selectedLabelIdx}
            setSelectedLabelIdx={setSelectedLabelIdx}
            labelVisibility={labelVisibility}
          />
          <EditDesignLeftToolbar annotationSub={annotationSub} setAnnotationSub={setAnnotationSub} />
        </div>
        <EditDesignRightSidebar annotationSub={annotationSub} comments={comments} setComments={setComments} placedLabels={placedLabels} setPlacedLabels={setPlacedLabels} selectedLabelIdx={selectedLabelIdx} setSelectedLabelIdx={setSelectedLabelIdx} labelVisibility={labelVisibility} setLabelVisibility={setLabelVisibility} />
      </div>
    </div>
  );
}
