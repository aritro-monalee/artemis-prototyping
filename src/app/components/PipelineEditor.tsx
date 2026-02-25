"use client";

import { useState, useCallback, useMemo, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { Plus, GripHorizontal, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  ReactFlow,
  Handle,
  Position,
  getSmoothStepPath,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type EdgeProps,
  type NodeProps,
  type Connection,
  type OnConnect,
  type OnReconnect,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useProjectStore, type PipelineEdge as StorePipelineEdge } from "@/app/store/ProjectStore";
import { EditStagePanel } from "./EditStagePanel";
import type { PipelineStage } from "@/app/data/projects";

type FilterMode = "all" | "presale" | "postsale";
type AddStageStep = "idle" | "naming" | "config";

const NODE_W = 220;
const NODE_H = 44;
const ROW_GAP = 80;
const STAIR_X = 60;
const STAIR_Y = 70;
const COL_GAP = 320;
const PRE_COL_X = 60;
const POST_COL_X = PRE_COL_X + NODE_W + COL_GAP;
const LABEL_Y = -40;

type StageNodeData = { title: string; section: "pre" | "post" };
type LabelNodeData = { label: string };

function StageNode({ data, selected }: NodeProps<Node<StageNodeData>>) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex items-center gap-2 px-3 rounded-xl select-none cursor-pointer
        shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
        transition-[border-color,background-color] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30
        bg-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.06)] ${
          selected
            ? "border-[2px] border-[var(--color-brand)] ring-2 ring-[var(--color-brand)]/20"
            : "border-[0.5px] border-[rgba(0,0,0,0.16)]"
        }`}
      style={{ width: NODE_W, height: NODE_H }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-[9px] !h-[9px] !bg-[var(--color-brand)] !border-2 !border-white !-left-[4.5px]"
      />
      <GripHorizontal className="drag-handle w-4 h-4 shrink-0 text-[#998d7d] cursor-grab active:cursor-grabbing" />
      <span className="text-sm font-medium leading-5 truncate flex-1 text-[var(--color-text)]">
        {data.title}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-[9px] !h-[9px] !bg-[var(--color-brand)] !border-2 !border-white !-bottom-[4.5px]"
      />
    </div>
  );
}

function SectionLabel({ data }: NodeProps<Node<LabelNodeData>>) {
  return (
    <div className="text-xs font-semibold text-[var(--color-text-muted)] tracking-[1.5px] uppercase select-none pointer-events-none">
      {data.label}
    </div>
  );
}

function buildEdgePath(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position,
): string {
  const sameColumn = Math.abs(sourceX - (targetX + NODE_W / 2)) < NODE_W;

  if (sameColumn && sourceY < targetY) {
    const r = 8;
    const channelX = targetX - 20;
    const dropY = sourceY + 14;

    return [
      `M ${sourceX} ${sourceY}`,
      `L ${sourceX} ${dropY - r}`,
      `Q ${sourceX} ${dropY} ${sourceX - r} ${dropY}`,
      `L ${channelX + r} ${dropY}`,
      `Q ${channelX} ${dropY} ${channelX} ${dropY + r}`,
      `L ${channelX} ${targetY - r}`,
      `Q ${channelX} ${targetY} ${channelX + r} ${targetY}`,
      `L ${targetX} ${targetY}`,
    ].join(" ");
  }

  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });
  return path;
}

function PipelineEdgeComponent({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}: EdgeProps) {
  const edgePath = buildEdgePath(sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition);
  const color = selected ? "#c44dff" : "var(--color-brand)";
  const width = selected ? 2.5 : 1.5;

  return (
    <g className="cursor-pointer">
      <path d={edgePath} fill="none" stroke="transparent" strokeWidth={16} />
      <path d={edgePath} fill="none" stroke={color} strokeWidth={width} />
      <circle cx={sourceX} cy={sourceY} r={3.5} fill={color} />
      <circle cx={targetX} cy={targetY} r={3.5} fill={color} />
    </g>
  );
}

export const pipelineNodeTypes = { stageCard: StageNode, sectionLabel: SectionLabel };
export const pipelineEdgeTypes = { pipeline: PipelineEdgeComponent };

const nodeTypes = pipelineNodeTypes;
const edgeTypes = pipelineEdgeTypes;

// ── Layout helpers ──

function getChainOrder(nodeIds: string[], edges: Edge[]): { chained: string[]; unchained: string[] } {
  const outMap = new Map<string, string>();
  const inSet = new Set<string>();
  const nodeSet = new Set(nodeIds);

  for (const e of edges) {
    if (nodeSet.has(e.source) && nodeSet.has(e.target)) {
      outMap.set(e.source, e.target);
      inSet.add(e.target);
    }
  }

  const heads = nodeIds.filter((id) => !inSet.has(id) && outMap.has(id));
  const chains: string[][] = [];
  for (const head of heads) {
    const chain: string[] = [];
    let cur: string | undefined = head;
    const visited = new Set<string>();
    while (cur && !visited.has(cur)) {
      visited.add(cur);
      chain.push(cur);
      cur = outMap.get(cur);
    }
    chains.push(chain);
  }

  const chained = chains.flat();
  const chainedSet = new Set(chained);
  const unchained = nodeIds.filter((id) => !chainedSet.has(id));
  return { chained, unchained };
}

function computeStaircasePositions(
  nodeIds: string[],
  edges: Edge[],
  baseX: number,
  baseY: number,
): Map<string, { x: number; y: number }> {
  const { chained, unchained } = getChainOrder(nodeIds, edges);
  const positions = new Map<string, { x: number; y: number }>();

  chained.forEach((id, i) => {
    positions.set(id, { x: baseX + i * STAIR_X, y: baseY + i * STAIR_Y });
  });

  const unchainedBaseY = chained.length > 0
    ? baseY + chained.length * STAIR_Y + 40
    : baseY;
  unchained.forEach((id, i) => {
    positions.set(id, { x: baseX, y: unchainedBaseY + i * ROW_GAP });
  });

  return positions;
}

function storeEdgesToFlowEdges(storeEdges: StorePipelineEdge[]): Edge[] {
  return storeEdges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: "pipeline",
    reconnectable: true,
  }));
}

function flowEdgesToStoreEdges(flowEdges: Edge[]): StorePipelineEdge[] {
  return flowEdges.map((e) => ({ id: e.id, source: e.source, target: e.target }));
}

// ── Add stage overlay ──

interface ConditionRow {
  id: string;
  field: string;
  operator: string;
  value: string;
}

function AddStageOverlay({
  step,
  stageName,
  onNameChange,
  onNameConfirm,
  onCancel,
  moveType,
  onMoveTypeChange,
  conditions,
  onConditionChange,
  onConditionRemove,
  onConditionAdd,
  onSave,
}: {
  step: "naming" | "config";
  stageName: string;
  onNameChange: (v: string) => void;
  onNameConfirm: () => void;
  onCancel: () => void;
  moveType: "auto" | "manual";
  onMoveTypeChange: (v: "auto" | "manual") => void;
  conditions: ConditionRow[];
  onConditionChange: (id: string, field: string, value: string) => void;
  onConditionRemove: (id: string) => void;
  onConditionAdd: () => void;
  onSave: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "naming") inputRef.current?.focus();
  }, [step]);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center" onClick={onCancel}>
      <div
        className="rounded-xl bg-[var(--color-border-alt)] shadow-[0px_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
        style={{ width: step === "config" ? 340 : 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        {step === "naming" && (
          <div className="p-4">
            <div className="text-sm font-semibold text-[var(--color-text)] mb-3">New Stage</div>
            <input
              ref={inputRef}
              type="text"
              value={stageName}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && stageName.trim()) onNameConfirm();
                if (e.key === "Escape") onCancel();
              }}
              placeholder="Name your stage"
              className="w-full h-10 px-3 rounded-lg border border-[var(--color-brand)] bg-white text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
            />
            <div className="text-xs text-[var(--color-text-secondary)] mt-2">Press ret to confirm</div>
          </div>
        )}

        {step === "config" && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
              <GripHorizontal className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="text-sm font-semibold text-[var(--color-text)]">{stageName}</span>
            </div>

            <div className="flex items-center h-9 bg-[#d5d0cc] rounded-lg px-[3px] py-1 mb-4">
              <button
                onClick={() => onMoveTypeChange("auto")}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium text-[var(--color-text)] cursor-pointer transition-all ${
                  moveType === "auto"
                    ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]"
                    : "hover:bg-white/40"
                }`}
              >
                Auto
              </button>
              <button
                onClick={() => onMoveTypeChange("manual")}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium text-[var(--color-text)] cursor-pointer transition-all ${
                  moveType === "manual"
                    ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]"
                    : "hover:bg-white/40"
                }`}
              >
                Manual
              </button>
            </div>

            {moveType === "auto" && (
              <>
                <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2">Move to next stage when</div>
                <div className="flex flex-col gap-2 mb-3">
                  {conditions.map((c) => (
                    <div key={c.id} className="flex items-center gap-1.5">
                      <select
                        value={c.field}
                        onChange={(e) => onConditionChange(c.id, "field", e.target.value)}
                        className="flex-1 h-8 px-2 rounded-md border border-[#d5c8b8] bg-white text-xs text-[var(--color-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30 cursor-pointer"
                      >
                        <option value="credit application">credit application</option>
                        <option value="contract">contract</option>
                        <option value="permit">permit</option>
                        <option value="inspection">inspection</option>
                      </select>
                      <span className="text-xs text-[var(--color-text-muted)]">is</span>
                      <select
                        value={c.value}
                        onChange={(e) => onConditionChange(c.id, "value", e.target.value)}
                        className="flex-1 h-8 px-2 rounded-md border border-[#d5c8b8] bg-white text-xs text-[var(--color-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30 cursor-pointer"
                      >
                        <option value="submitted">submitted</option>
                        <option value="approved">approved</option>
                        <option value="completed">completed</option>
                        <option value="signed">signed</option>
                      </select>
                      <button
                        onClick={() => onConditionRemove(c.id)}
                        aria-label="Remove condition"
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
                      >
                        <X className="w-3 h-3 text-[var(--color-text-muted)]" />
                      </button>
                      <button
                        onClick={onConditionAdd}
                        aria-label="Add condition"
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
                      >
                        <Plus className="w-3 h-3 text-[var(--color-text-muted)]" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                onClick={onSave}
                className="h-8 px-4 py-2 bg-[var(--color-brand)] text-white text-xs font-medium rounded-lg cursor-pointer hover:bg-[var(--color-brand-hover)] transition-colors"
              >
                Save stage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Public handle ──

export interface PipelineEditorHandle {
  saveLayout: () => void;
}

// ── Inner component (requires ReactFlowProvider ancestor) ──

const PipelineEditorInner = forwardRef<PipelineEditorHandle>(function PipelineEditorInner(_, ref) {
  const nodeCounterRef = useRef(0);
  const {
    presaleStages,
    postSaleStages,
    allStages,
    pipelineEdges: storeEdges,
    setPipelineEdges: setStoreEdges,
    addStage: storeAddStage,
    setPresaleStages,
    setPostSaleStages,
  } = useProjectStore();

  const [editingStageId, setEditingStageId] = useState<string | null>(null);

  const initialFlowEdges = useMemo(() => storeEdgesToFlowEdges(storeEdges), []);
  const initialNodes = useMemo(() => {
    const result: Node[] = [];
    const preIds = presaleStages.map((s) => s.id);
    const postIds = postSaleStages.map((s) => s.id);
    const prePositions = computeStaircasePositions(preIds, initialFlowEdges, PRE_COL_X, 0);
    const postPositions = computeStaircasePositions(postIds, initialFlowEdges, POST_COL_X, 0);

    result.push({
      id: "label-presale",
      type: "sectionLabel",
      position: { x: PRE_COL_X, y: LABEL_Y },
      data: { label: "Pre Sale" },
      draggable: false,
      selectable: false,
      connectable: false,
    });

    result.push({
      id: "label-postsale",
      type: "sectionLabel",
      position: { x: POST_COL_X, y: LABEL_Y },
      data: { label: "Post Sale" },
      draggable: false,
      selectable: false,
      connectable: false,
    });

    presaleStages.forEach((s) => {
      result.push({
        id: s.id,
        type: "stageCard",
        dragHandle: ".drag-handle",
        position: prePositions.get(s.id) ?? { x: PRE_COL_X, y: 0 },
        data: { title: s.title, section: "pre" as const },
      });
    });

    postSaleStages.forEach((s) => {
      result.push({
        id: s.id,
        type: "stageCard",
        dragHandle: ".drag-handle",
        position: postPositions.get(s.id) ?? { x: POST_COL_X, y: 0 },
        data: { title: s.title, section: "post" as const },
      });
    });

    return result;
  }, []);

  const [filter, setFilter] = useState<FilterMode>("all");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowEdges);
  const { fitView } = useReactFlow();

  const [addStep, setAddStep] = useState<AddStageStep>("idle");
  const [newStageName, setNewStageName] = useState("");
  const [moveType, setMoveType] = useState<"auto" | "manual">("auto");
  const [conditions, setConditions] = useState<ConditionRow[]>([
    { id: "c1", field: "credit application", operator: "is", value: "submitted" },
  ]);

  const showPre = filter === "all" || filter === "presale";
  const showPost = filter === "all" || filter === "postsale";

  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.3, maxZoom: 1, duration: 300 }), 250);
  }, [filter, editingStageId, fitView]);

  // Sync edges to store whenever they change
  const syncEdgesToStore = useCallback(
    (flowEdges: Edge[]) => {
      setStoreEdges(flowEdgesToStoreEdges(flowEdges));
    },
    [setStoreEdges]
  );

  const preNodeIds = useMemo(
    () => nodes.filter((n) => n.type === "stageCard" && (n.data as StageNodeData).section === "pre").map((n) => n.id),
    [nodes]
  );
  const postNodeIds = useMemo(
    () => nodes.filter((n) => n.type === "stageCard" && (n.data as StageNodeData).section === "post").map((n) => n.id),
    [nodes]
  );

  useImperativeHandle(ref, () => ({
    saveLayout: () => {
      const prePositions = computeStaircasePositions(preNodeIds, edges, PRE_COL_X, 0);
      const postPositions = computeStaircasePositions(postNodeIds, edges, POST_COL_X, 0);
      setNodes((nds) =>
        nds.map((n) => {
          const pos = prePositions.get(n.id) ?? postPositions.get(n.id);
          if (pos) return { ...n, position: pos };
          return n;
        })
      );
      syncEdgesToStore(edges);
      setTimeout(() => fitView({ padding: 0.3, maxZoom: 1, duration: 300 }), 50);
    },
  }), [edges, preNodeIds, postNodeIds, setNodes, fitView, syncEdgesToStore]);

  const visibleNodes = useMemo(() => {
    const filtered = nodes.filter((n) => {
      if (n.type === "sectionLabel") {
        if (n.id === "label-presale") return showPre;
        if (n.id === "label-postsale") return showPost;
        return false;
      }
      const section = (n.data as StageNodeData).section;
      if (section === "pre") return showPre;
      if (section === "post") return showPost;
      return true;
    });

    const result = [...filtered];

    const addUnconnectedLabel = (sectionNodeIds: string[], baseX: number) => {
      const { unchained } = getChainOrder(sectionNodeIds, edges);
      if (unchained.length === 0) return;
      const unchainedNodes = unchained
        .map((id) => nodes.find((n) => n.id === id))
        .filter(Boolean) as Node[];
      if (unchainedNodes.length === 0) return;
      const minY = Math.min(...unchainedNodes.map((n) => n.position.y));
      result.push({
        id: `label-notconnected-${baseX}`,
        type: "sectionLabel",
        position: { x: baseX, y: minY - 30 },
        data: { label: "Not Connected" },
        draggable: false,
        selectable: false,
        connectable: false,
      });
    };

    if (showPre) addUnconnectedLabel(preNodeIds, PRE_COL_X);
    if (showPost) addUnconnectedLabel(postNodeIds, POST_COL_X);

    return result;
  }, [nodes, edges, showPre, showPost, preNodeIds, postNodeIds]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(
    () => edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)),
    [edges, visibleNodeIds]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (!connection.source || !connection.target) return false;
      if (connection.source === connection.target) return false;
      return true;
    },
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        const filtered = eds.filter(
          (e) => e.source !== connection.source && e.target !== connection.target
        );
        const next = addEdge({ ...connection, type: "pipeline", reconnectable: true }, filtered);
        syncEdgesToStore(next);
        return next;
      });
    },
    [setEdges, syncEdgesToStore]
  );

  const onReconnect: OnReconnect = useCallback(
    (oldEdge, newConnection) => {
      setEdges((eds) => {
        const without = eds.filter((e) => e.id !== oldEdge.id);
        const filtered = without.filter(
          (e) => e.source !== newConnection.source && e.target !== newConnection.target
        );
        const next = addEdge({ ...newConnection, type: "pipeline", reconnectable: true }, filtered);
        syncEdgesToStore(next);
        return next;
      });
    },
    [setEdges, syncEdgesToStore]
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setEdges((eds) => {
        const next = eds.filter((e) => e.id !== edge.id);
        syncEdgesToStore(next);
        return next;
      });
    },
    [setEdges, syncEdgesToStore]
  );

  const handleAddClick = useCallback(() => {
    setNewStageName("");
    setMoveType("auto");
    setConditions([{ id: "c1", field: "credit application", operator: "is", value: "submitted" }]);
    setAddStep("naming");
  }, []);

  const handleNameConfirm = useCallback(() => {
    if (newStageName.trim()) setAddStep("config");
  }, [newStageName]);

  const handleCancel = useCallback(() => {
    setAddStep("idle");
  }, []);

  const handleSaveStage = useCallback(() => {
    const id = `custom-${Date.now()}-${++nodeCounterRef.current}`;
    const title = newStageName.trim();

    // Place below whichever column is visible; defaults to pre-sale side
    const targetIds = showPre ? preNodeIds : postNodeIds;
    const baseX = showPre ? PRE_COL_X : POST_COL_X;
    const section: "pre" | "post" = showPre ? "pre" : "post";

    const maxY = targetIds.reduce((max, nid) => {
      const n = nodes.find((nd) => nd.id === nid);
      return n ? Math.max(max, n.position.y) : max;
    }, 0);

    storeAddStage({ id, title, color: "var(--color-brand)" }, section);

    const newNode: Node<StageNodeData> = {
      id,
      type: "stageCard",
      dragHandle: ".drag-handle",
      position: { x: baseX, y: maxY + ROW_GAP + 60 },
      data: { title, section },
    };
    setNodes((nds) => [...nds, newNode]);

    setAddStep("idle");
    setTimeout(() => fitView({ padding: 0.3, maxZoom: 1, duration: 300 }), 100);
  }, [newStageName, showPre, preNodeIds, postNodeIds, nodes, setNodes, fitView, storeAddStage]);

  const handleConditionChange = useCallback((id: string, field: string, value: string) => {
    setConditions((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }, []);

  const handleConditionRemove = useCallback((id: string) => {
    setConditions((cs) => cs.filter((c) => c.id !== id));
  }, []);

  const handleConditionAdd = useCallback(() => {
    setConditions((cs) => [
      ...cs,
      { id: `c${Date.now()}`, field: "credit application", operator: "is", value: "submitted" },
    ]);
  }, []);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.type === "stageCard") {
        setEditingStageId(node.id);
      }
    },
    []
  );

  const handleEditClose = useCallback(() => setEditingStageId(null), []);

  const handleEditSave = useCallback(
    (stageId: string, updates: { title: string }) => {
      const isPre = presaleStages.some((s) => s.id === stageId);
      if (isPre) {
        setPresaleStages((prev) =>
          prev.map((s) => (s.id === stageId ? { ...s, title: updates.title } : s))
        );
      } else {
        setPostSaleStages((prev) =>
          prev.map((s) => (s.id === stageId ? { ...s, title: updates.title } : s))
        );
      }
      setNodes((nds) =>
        nds.map((n) =>
          n.id === stageId
            ? { ...n, data: { ...n.data, title: updates.title } }
            : n
        )
      );
      setEditingStageId(null);
    },
    [presaleStages, setPresaleStages, setPostSaleStages, setNodes]
  );

  const handleEditDelete = useCallback(
    (stageId: string) => {
      const isPre = presaleStages.some((s) => s.id === stageId);
      if (isPre) {
        setPresaleStages((prev) => prev.filter((s) => s.id !== stageId));
      } else {
        setPostSaleStages((prev) => prev.filter((s) => s.id !== stageId));
      }
      setNodes((nds) => nds.filter((n) => n.id !== stageId));
      setEdges((eds) => {
        const next = eds.filter((e) => e.source !== stageId && e.target !== stageId);
        syncEdgesToStore(next);
        return next;
      });
      setEditingStageId(null);
      setTimeout(() => fitView({ padding: 0.3, maxZoom: 1, duration: 300 }), 50);
    },
    [presaleStages, setPresaleStages, setPostSaleStages, setNodes, setEdges, syncEdgesToStore, fitView]
  );

  const editingStage: PipelineStage | undefined = useMemo(
    () => allStages.find((s) => s.id === editingStageId),
    [allStages, editingStageId]
  );

  const portalTarget = typeof document !== "undefined" ? document.getElementById("settings-right-panel") : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 relative rounded-xl border border-dashed border-[#d5c8b8] bg-[var(--color-surface)] overflow-hidden flex flex-col">
        {/* Controls */}
        <div className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-end gap-3 p-4 transition-opacity duration-200 ${addStep !== "idle" ? "opacity-30 pointer-events-none" : ""}`}>
          <div className="flex items-center h-8 bg-[var(--color-border-alt)] rounded-lg border-[0.5px] border-[rgba(0,0,0,0.08)] px-[3px] py-1">
            {(
              [
                { id: "all", label: "All" },
                { id: "presale", label: "Pre Sale" },
                { id: "postsale", label: "Post Sale" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-5 py-1 rounded-md text-sm font-medium leading-5 text-[var(--color-text)] cursor-pointer transition-all whitespace-nowrap ${
                  filter === opt.id
                    ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]"
                    : "hover:bg-white/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddClick}
            className="h-8 px-3 py-2 bg-[var(--color-brand)] text-white text-xs font-medium leading-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-[var(--color-brand-hover)] transition-colors flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/30"
          >
            Add a new stage
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* ReactFlow canvas */}
        <div className={`flex-1 min-h-0 transition-opacity duration-200 ${addStep !== "idle" ? "opacity-30 pointer-events-none" : ""}`}>
          <ReactFlow
            nodes={visibleNodes}
            edges={visibleEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onEdgeClick={onEdgeClick}
            onNodeClick={onNodeClick}
            onPaneClick={() => setEditingStageId(null)}
            isValidConnection={isValidConnection}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            panOnDrag
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            fitView
            fitViewOptions={{ padding: 0.3, maxZoom: 1 }}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{ type: "pipeline", reconnectable: true }}
            className="!bg-transparent"
          />
        </div>

        {/* Add stage overlay */}
        {addStep !== "idle" && (
          <AddStageOverlay
            step={addStep}
            stageName={newStageName}
            onNameChange={setNewStageName}
            onNameConfirm={handleNameConfirm}
            onCancel={handleCancel}
            moveType={moveType}
            onMoveTypeChange={setMoveType}
            conditions={conditions}
            onConditionChange={handleConditionChange}
            onConditionRemove={handleConditionRemove}
            onConditionAdd={handleConditionAdd}
            onSave={handleSaveStage}
          />
        )}

        {/* Bottom hint */}
        <div className={`absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none z-10 transition-opacity duration-200 ${addStep !== "idle" ? "opacity-0" : ""}`}>
          <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#d5c8b8] text-xs text-[var(--color-text-muted)]">
            Drag from a port to connect. Drag a wire endpoint to rewire. Click a wire to disconnect.
          </div>
        </div>
      </div>

      {/* Edit panel — portaled to page-level right sidebar */}
      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {editingStage && (
              <EditStagePanel
                stage={editingStage}
                allStages={allStages}
                nodes={nodes}
                edges={edges}
                onClose={handleEditClose}
                onSave={handleEditSave}
                onDelete={handleEditDelete}
              />
            )}
          </AnimatePresence>,
          portalTarget
        )}
    </div>
  );
});

export const PipelineEditor = forwardRef<PipelineEditorHandle>(function PipelineEditor(_, ref) {
  return (
    <ReactFlowProvider>
      <PipelineEditorInner ref={ref} />
    </ReactFlowProvider>
  );
});
