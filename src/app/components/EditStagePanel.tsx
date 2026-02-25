"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelRightClose, X, Plus, ChevronDown } from "lucide-react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Node,
  type Edge,
} from "@xyflow/react";
import { pipelineNodeTypes, pipelineEdgeTypes } from "./PipelineEditor";
import { MLInput } from "@/app/lib/monalee-ui/components/MLInput";
import { MLTab } from "@/app/lib/monalee-ui/components/MLTab";
import { MLSwitch } from "@/app/lib/monalee-ui/components/MLSwitch";
import { MLSelect } from "@/app/lib/monalee-ui/components/MLSelect";
import { MLButton } from "@/app/lib/monalee-ui/components/MLButton";
import type { PipelineStage } from "@/app/data/projects";

interface EditStagePanelProps {
  stage: PipelineStage;
  allStages: PipelineStage[];
  nodes?: Node[];
  edges?: Edge[];
  onClose: () => void;
  onSave: (stageId: string, updates: { title: string }) => void;
  onDelete: (stageId: string) => void;
}

export function EditStagePanel({
  stage,
  allStages,
  nodes = [],
  edges = [],
  onClose,
  onSave,
  onDelete,
}: EditStagePanelProps) {
  const [stageName, setStageName] = useState(stage.title);
  const [modeTab, setModeTab] = useState("auto");
  const [isInternal, setIsInternal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const nextStageFromEdges = useMemo(() => {
    const outEdge = edges.find((e) => e.source === stage.id);
    return outEdge?.target ?? "";
  }, [edges, stage.id]);

  useEffect(() => {
    setStageName(stage.title);
    setShowDeleteConfirm(false);
  }, [stage.id, stage.title]);

  const nextStageOptions = useMemo(
    () =>
      allStages
        .filter((s) => s.id !== stage.id)
        .map((s) => ({ label: s.title, value: s.id })),
    [allStages, stage.id]
  );

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 352, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-[#fefbf7] border-l border-[#d5c8b8] flex flex-col h-full shrink-0 overflow-hidden"
    >
      <div className="w-[352px] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center h-16 min-h-[64px] px-4 border-b border-[#d7cfc5] shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              <PanelRightClose className="w-4 h-4 text-[#554e46]" />
            </button>
            <div className="w-2 flex items-center justify-center">
              <div className="h-[15px] w-px bg-[#d7cfc5]" />
            </div>
            <span className="text-sm font-medium text-[#554e46]">Editing Stage</span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-3 py-6">
          {nodes.length > 0 && (
            <MiniPipelineView nodes={nodes} edges={edges} activeStageId={stage.id} />
          )}

          <div className="flex flex-col gap-5 py-3">
            <MLInput
              label="Stage"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
            />

            <MLTab
              tabs={[
                { id: "auto", label: "Auto" },
                { id: "manual", label: "Manual" },
              ]}
              activeTab={modeTab}
              onChange={setModeTab}
              className="w-full"
              listClassName="w-full"
            />

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-[#554e46]">
                Move to next stage when
              </span>
              <div className="flex items-center">
                <button className="h-7 flex items-center gap-2 px-2 rounded-l-lg rounded-r-[2px] border-[0.5px] border-[rgba(0,0,0,0.16)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-xs text-[#7b6f60] cursor-pointer hover:bg-[#f4f1ed] transition-colors">
                  <span>credit application</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="h-7 flex items-center px-2 rounded-[2px] border-[0.5px] border-[rgba(0,0,0,0.16)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-xs text-[#7b6f60] cursor-pointer hover:bg-[#f4f1ed] transition-colors">
                  is
                </button>
                <button className="h-7 flex items-center gap-2 px-2 rounded-[2px] border-[0.5px] border-[rgba(0,0,0,0.16)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-xs text-[#7b6f60] cursor-pointer hover:bg-[#f4f1ed] transition-colors">
                  <span>submitted</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="h-7 flex items-center justify-center p-[6px] rounded-l-[2px] rounded-r-lg border-[0.5px] border-[rgba(0,0,0,0.16)] bg-[rgba(255,255,255,0.4)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-[#f4f1ed] transition-colors">
                  <X className="w-4 h-4 text-[#998d7d]" />
                </button>
                <button className="h-7 flex items-center justify-center p-[6px] rounded-l-[2px] rounded-r-lg cursor-pointer hover:bg-[#f4f1ed] transition-colors">
                  <Plus className="w-4 h-4 text-[#998d7d]" />
                </button>
              </div>
            </div>

            <MLSwitch
              label="Mark as Internal State"
              description="Customers are not informed when projects move in and out of this state"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              align="left"
            />

            <MLSelect
              options={nextStageOptions}
              placeholder="Not connected"
              value={
                nextStageFromEdges
                  ? nextStageOptions.find((o) => o.value === nextStageFromEdges) ?? null
                  : null
              }
              onChange={() => {}}
              label="Next Stage"
              fullwidth
            />
          </div>
        </div>

        {/* Footer buttons — pinned at bottom */}
        <div className="flex items-center justify-end gap-1 shrink-0 px-3 py-3 border-t border-[#d7cfc5]">
          <MLButton
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Stage
          </MLButton>
          <MLButton
            variant="default"
            size="sm"
            onClick={() => onSave(stage.id, { title: stageName })}
          >
            Save Stage
          </MLButton>
        </div>
      </div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <DeleteConfirmDialog
            stageName={stage.title}
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={() => onDelete(stage.id)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Delete confirmation dialog ─── */

function DeleteConfirmDialog({
  stageName,
  onCancel,
  onConfirm,
}: {
  stageName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="relative w-[440px] bg-white rounded-2xl shadow-[0px_16px_48px_rgba(0,0,0,0.16)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">
          Are you sure you want to delete this stage?
        </h3>
        <p className="text-sm text-[#7b6f60] mb-6">
          This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-[#d5c8b8] bg-white text-sm font-medium text-[#554e46] cursor-pointer hover:bg-[#f4f1ed] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-9 px-4 rounded-lg bg-[#dc2626] text-white text-sm font-medium cursor-pointer hover:bg-[#b91c1c] transition-colors"
          >
            Delete {stageName}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mini pipeline view (windowed canvas, same components) ─── */

function MiniPipelineViewInner({
  viewNodes,
  viewEdges,
  activeStageId,
}: {
  viewNodes: Node[];
  viewEdges: Edge[];
  activeStageId: string;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => {
      fitView({ nodes: [{ id: activeStageId }], padding: 0.2, maxZoom: 1, minZoom: 0.4, duration: 300 });
    }, 50);
  }, [activeStageId, fitView]);

  return (
    <ReactFlow
      nodes={viewNodes}
      edges={viewEdges}
      nodeTypes={pipelineNodeTypes}
      edgeTypes={pipelineEdgeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      fitView
      fitViewOptions={{
        nodes: [{ id: activeStageId }],
        padding: 0.2,
        maxZoom: 1,
        minZoom: 0.4,
      }}
      proOptions={{ hideAttribution: true }}
      className="!bg-transparent pointer-events-none"
    />
  );
}

function MiniPipelineView({
  nodes,
  edges,
  activeStageId,
}: {
  nodes: Node[];
  edges: Edge[];
  activeStageId: string;
}) {
  const viewNodes = useMemo(
    () =>
      nodes
        .filter((n) => n.type === "stageCard" || n.type === "sectionLabel")
        .map((n) => ({
          ...n,
          draggable: false,
          connectable: false,
          selected: n.id === activeStageId,
          style: n.id === activeStageId ? undefined : { opacity: 0.35 },
        })),
    [nodes, activeStageId]
  );

  const viewEdges = useMemo(
    () =>
      edges.map((e) => ({
        ...e,
        selectable: false,
        focusable: false,
      })),
    [edges]
  );

  return (
    <div className="relative h-[174px] rounded-xl border-[0.5px] border-[#d5c8b8] bg-[rgba(0,0,0,0.01)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden shrink-0">
      <ReactFlowProvider>
        <MiniPipelineViewInner viewNodes={viewNodes} viewEdges={viewEdges} activeStageId={activeStageId} />
      </ReactFlowProvider>
    </div>
  );
}
