"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  initialProjects,
  presaleStages as defaultPresaleStages,
  postSaleStages as defaultPostSaleStages,
  defaultFilters,
  filterProjects,
  initialNotes,
  initialDesignComments,
  initialChecklistDone,
  initialActivities,
  predefinedLabels,
  defaultChecklistTemplate,
  generateInitialStageHistory,
  type ProjectCardData,
  type PipelineStage,
  type ProjectDetailData,
  type ProjectFilters,
  type CustomField,
  type Note,
  type DesignComment,
  type ChecklistSection,
  type ChecklistItemDef,
  type PlacedLabel,
  type LabelDef,
  type ActivityItem,
  type StageHistoryEntry,
} from "@/app/data/projects";

// ── sessionStorage keys ──

const PROJECTS_KEY = "artemis-projects";
const STAGES_KEY = "artemis-stages";
const PIPELINE_EDGES_KEY = "artemis-pipeline-edges";
const SETTINGS_KEY = "artemis-settings";
const PROJECT_DATA_KEY = "artemis-project-data";
const CHECKLIST_TEMPLATE_KEY = "artemis-checklist-template";
const CHECKLIST_ORDER_KEY = "artemis-checklist-order";

// ── Detail extras (static enrichment for detail pages) ──

const projectDetailExtras: Record<string, Partial<ProjectDetailData>> = {
  p1: {
    financePayment: "$0/Month",
    systemSizeKw: "0kW",
    estOffset: "0%",
    projectType: "Solar",
    panelModel: "Mission Solar 410w",
    panelCount: 15,
    inverterModel: "Tesla Solar Inverter",
    inverterCount: 1,
    batteryModel: "Franklin aPower 2",
    batteryCount: 2,
    addersTotal: 0,
    financingTotal: 22118.05,
    totalLoan: 20000.0,
    term: "Included",
    lender: "Goodleap",
    netPricePerSquare: 3.63,
    pricePerSquare: 6.05,
    estimatedProduction: "5,558kWh",
  },
};

const defaultDetailExtras: Omit<ProjectDetailData, keyof ProjectCardData> = {
  financePayment: "$0/Month",
  systemSizeKw: "0kW",
  estOffset: "0%",
  projectType: "Solar",
  panelModel: "Mission Solar 410w",
  panelCount: 15,
  inverterModel: "Tesla Solar Inverter",
  inverterCount: 1,
  batteryModel: "Franklin aPower 2",
  batteryCount: 2,
  addersTotal: 0,
  financingTotal: 22118.05,
  totalLoan: 20000.0,
  term: "Included",
  lender: "Goodleap",
  netPricePerSquare: 3.63,
  pricePerSquare: 6.05,
  estimatedProduction: "5,558kWh",
};

function parseAddress(address: string) {
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 2) {
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1];
    const stateMatch = stateZip.match(/^([A-Z]{2})\s/);
    return { city, state: stateMatch ? stateMatch[1] : "" };
  }
  return { city: "", state: "" };
}

// ── Per-project extra data ──

interface ProjectExtraData {
  notes: Note[];
  designComments: DesignComment[];
  checklistDone: Record<string, boolean[]>;
  placedLabels: PlacedLabel[];
  labelVisibility: Record<string, "public" | "private">;
  panelCount: number;
  activities: ActivityItem[];
  projectType: "Solar" | "Battery" | "Solar + Battery" | "Home Improvement";
  stageHistory: StageHistoryEntry[];
}

function defaultProjectExtra(): ProjectExtraData {
  return {
    notes: JSON.parse(JSON.stringify(initialNotes)),
    designComments: JSON.parse(JSON.stringify(initialDesignComments)),
    checklistDone: JSON.parse(JSON.stringify(initialChecklistDone)),
    placedLabels: [],
    labelVisibility: Object.fromEntries(predefinedLabels.map((l) => [l.id, "public" as const])),
    panelCount: 23,
    activities: JSON.parse(JSON.stringify(initialActivities)),
    projectType: "Solar",
    stageHistory: [],
  };
}

// ── Saved views ──

export interface SavedView {
  id: string;
  name: string;
  hiddenColumnIds: string[];
  columnOrder: string[];
  columnLabels: Record<string, string>;
  listDensity: "compact" | "default" | "comfortable";
  showRowNumbers: boolean;
  createdAt: number;
}

// ── Global settings ──

interface GlobalSettings {
  hiddenColumnIds: string[];
  columnOrder: string[];
  columnLabels: Record<string, string>;
  listDensity: "compact" | "default" | "comfortable";
  showRowNumbers: boolean;
  customFields: CustomField[];
  customFieldValues: Record<string, Record<string, string>>;
  filters: ProjectFilters;
  savedViews: SavedView[];
  activeViewId: string | null;
}

const DEFAULT_COLUMN_ORDER = [
  "address", "tags", "fullName", "email", "installer", "team",
  "representative", "leadSource", "status", "utilityCompany",
  "paymentOption", "applicationId", "signedAt", "createdOn",
];

function defaultSettings(): GlobalSettings {
  return {
    hiddenColumnIds: [],
    columnOrder: [...DEFAULT_COLUMN_ORDER],
    columnLabels: {},
    listDensity: "default",
    showRowNumbers: false,
    customFields: [],
    customFieldValues: {},
    filters: { ...defaultFilters },
    savedViews: [],
    activeViewId: null,
  };
}

// ── Pipeline edge shape (serialisable subset of ReactFlow Edge) ──

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
}

// ── Store shape ──

interface ProjectStoreValue {
  // Projects
  projects: ProjectCardData[];
  setProjects: Dispatch<SetStateAction<ProjectCardData[]>>;
  addProject: (project: ProjectCardData) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<ProjectCardData>) => void;
  getProjectDetail: (id: string) => ProjectDetailData | null;
  moveProjectToStage: (projectId: string, newStageId: string, stageName: string) => void;
  getStageHistory: (projectId: string) => StageHistoryEntry[];
  stageHistoryMap: Record<string, StageHistoryEntry[]>;

  // Stages
  presaleStages: PipelineStage[];
  postSaleStages: PipelineStage[];
  allStages: PipelineStage[];
  setPresaleStages: Dispatch<SetStateAction<PipelineStage[]>>;
  setPostSaleStages: Dispatch<SetStateAction<PipelineStage[]>>;
  addStage: (stage: PipelineStage, section: "pre" | "post") => void;

  // Pipeline edges (wiring)
  pipelineEdges: PipelineEdge[];
  setPipelineEdges: Dispatch<SetStateAction<PipelineEdge[]>>;

  // Derived
  filterOptions: {
    installers: string[];
    teams: string[];
    representatives: string[];
    statuses: string[];
    states: string[];
    cities: string[];
    utilityCompanies: string[];
  };
  recentProjects: { id: string; name: string }[];

  // Global settings
  hiddenColumnIds: string[];
  setHiddenColumnIds: Dispatch<SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: Dispatch<SetStateAction<string[]>>;
  columnLabels: Record<string, string>;
  setColumnLabels: Dispatch<SetStateAction<Record<string, string>>>;
  listDensity: "compact" | "default" | "comfortable";
  setListDensity: Dispatch<SetStateAction<"compact" | "default" | "comfortable">>;
  showRowNumbers: boolean;
  setShowRowNumbers: Dispatch<SetStateAction<boolean>>;
  customFields: CustomField[];
  setCustomFields: Dispatch<SetStateAction<CustomField[]>>;
  customFieldValues: Record<string, Record<string, string>>;
  setCustomFieldValues: Dispatch<SetStateAction<Record<string, Record<string, string>>>>;
  filters: ProjectFilters;
  setFilters: Dispatch<SetStateAction<ProjectFilters>>;

  // Saved views
  savedViews: SavedView[];
  activeViewId: string | null;
  saveCurrentView: (name: string) => SavedView;
  applyView: (viewId: string) => void;
  deleteView: (viewId: string) => void;
  applyViewConfig: (config: Omit<SavedView, "id" | "name" | "createdAt">) => void;
  resetToDefaultView: () => void;

  // Per-project data accessors
  getProjectNotes: (projectId: string) => Note[];
  setProjectNotes: (projectId: string, notes: Note[]) => void;
  updateProjectNotes: (projectId: string, updater: (prev: Note[]) => Note[]) => void;
  getDesignComments: (projectId: string) => DesignComment[];
  setDesignComments: (projectId: string, comments: DesignComment[]) => void;
  updateDesignComments: (projectId: string, updater: (prev: DesignComment[]) => DesignComment[]) => void;
  checklistTemplate: Record<string, ChecklistItemDef[]>;
  setChecklistTemplate: Dispatch<SetStateAction<Record<string, ChecklistItemDef[]>>>;
  checklistPresaleOrder: string[];
  setChecklistPresaleOrder: Dispatch<SetStateAction<string[]>>;
  checklistPostsaleOrder: string[];
  setChecklistPostsaleOrder: Dispatch<SetStateAction<string[]>>;
  getChecklist: (projectId: string) => ChecklistSection[];
  toggleChecklistItem: (projectId: string, stageId: string, itemIdx: number) => void;
  getPlacedLabels: (projectId: string) => PlacedLabel[];
  setPlacedLabelsForProject: (projectId: string, labels: PlacedLabel[]) => void;
  updatePlacedLabels: (projectId: string, updater: (prev: PlacedLabel[]) => PlacedLabel[]) => void;
  getLabelVisibility: (projectId: string) => Record<string, "public" | "private">;
  setLabelVisibility: (projectId: string, vis: Record<string, "public" | "private">) => void;
  getPanelCount: (projectId: string) => number;
  setPanelCount: (projectId: string, count: number) => void;
  getActivities: (projectId: string) => ActivityItem[];
  getProjectType: (projectId: string) => "Solar" | "Battery" | "Solar + Battery" | "Home Improvement";
  setProjectType: (projectId: string, type: "Solar" | "Battery" | "Solar + Battery" | "Home Improvement") => void;
}

const ProjectStoreContext = createContext<ProjectStoreValue | null>(null);

// ── sessionStorage helpers ──

function loadFromSession<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToSession<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full — silently ignore for prototype
  }
}

// ── Provider ──

export function ProjectStoreProvider({ children }: { children: ReactNode }) {
  // ── Projects ──
  const [projects, setProjectsRaw] = useState<ProjectCardData[]>(() =>
    loadFromSession(PROJECTS_KEY, initialProjects)
  );

  const [stages, setStages] = useState<{
    presale: PipelineStage[];
    postSale: PipelineStage[];
  }>(() => {
    const saved = loadFromSession(STAGES_KEY, {
      presale: defaultPresaleStages,
      postSale: defaultPostSaleStages,
    });
    const preColorMap = new Map(defaultPresaleStages.map((s) => [s.id, s.color]));
    const postColorMap = new Map(defaultPostSaleStages.map((s) => [s.id, s.color]));
    return {
      presale: saved.presale.map((s) => ({ ...s, color: preColorMap.get(s.id) ?? s.color })),
      postSale: saved.postSale.map((s) => ({ ...s, color: postColorMap.get(s.id) ?? s.color })),
    };
  });

  // ── Pipeline edges ──
  const defaultPipelineEdges: PipelineEdge[] = (() => {
    const edges: PipelineEdge[] = [];
    const buildChain = (list: PipelineStage[]) => {
      for (let i = 0; i < list.length - 1; i++) {
        edges.push({ id: `e-${list[i].id}-${list[i + 1].id}`, source: list[i].id, target: list[i + 1].id });
      }
    };
    buildChain(defaultPresaleStages);
    buildChain(defaultPostSaleStages);
    return edges;
  })();

  const [pipelineEdges, setPipelineEdgesRaw] = useState<PipelineEdge[]>(() =>
    loadFromSession(PIPELINE_EDGES_KEY, defaultPipelineEdges)
  );

  // ── Global settings ──
  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const defaults = defaultSettings();
    const saved = loadFromSession(SETTINGS_KEY, defaults);
    return { ...defaults, ...saved, filters: { ...defaultFilters, ...(saved.filters ?? {}) } };
  });

  // ── Checklist template (global — defines items per stage) ──
  const [checklistTemplate, setChecklistTemplateRaw] = useState<Record<string, ChecklistItemDef[]>>(() => {
    const saved = loadFromSession(CHECKLIST_TEMPLATE_KEY, defaultChecklistTemplate);
    const merged: Record<string, ChecklistItemDef[]> = {};
    for (const stageId of Object.keys({ ...defaultChecklistTemplate, ...saved })) {
      const savedItems = saved[stageId] || [];
      const defaultItems = defaultChecklistTemplate[stageId] || [];
      merged[stageId] = savedItems.map((item, i) => {
        const def = defaultItems.find((d) => d.label === item.label) ?? defaultItems[i];
        if (!def) return item;
        return {
          ...item,
          statusText: item.statusText ?? def.statusText,
          ctaLabel: item.ctaLabel ?? def.ctaLabel,
          ctaRoute: item.ctaRoute ?? def.ctaRoute,
        };
      });
    }
    return merged;
  });
  const setChecklistTemplate: Dispatch<SetStateAction<Record<string, ChecklistItemDef[]>>> = useCallback(
    (action) => setChecklistTemplateRaw(action),
    []
  );

  const [checklistOrderState, setChecklistOrderState] = useState<{ presale: string[]; postsale: string[] }>(() =>
    loadFromSession(CHECKLIST_ORDER_KEY, {
      presale: defaultPresaleStages.map((s) => s.id),
      postsale: defaultPostSaleStages.map((s) => s.id),
    })
  );
  const checklistPresaleOrder = checklistOrderState.presale;
  const checklistPostsaleOrder = checklistOrderState.postsale;
  const setChecklistPresaleOrder: Dispatch<SetStateAction<string[]>> = useCallback(
    (action) => setChecklistOrderState((prev) => ({
      ...prev,
      presale: typeof action === "function" ? action(prev.presale) : action,
    })),
    []
  );
  const setChecklistPostsaleOrder: Dispatch<SetStateAction<string[]>> = useCallback(
    (action) => setChecklistOrderState((prev) => ({
      ...prev,
      postsale: typeof action === "function" ? action(prev.postsale) : action,
    })),
    []
  );

  // ── Per-project data ──
  const [projectData, setProjectData] = useState<Record<string, ProjectExtraData>>(() => {
    const saved = loadFromSession<Record<string, ProjectExtraData>>(PROJECT_DATA_KEY, {});
    const hasAnyHistory = Object.values(saved).some(
      (d) => d.stageHistory && d.stageHistory.length > 0
    );
    if (!hasAnyHistory) {
      const seedHistory = generateInitialStageHistory(initialProjects);
      const seeded: Record<string, ProjectExtraData> = {};
      for (const p of initialProjects) {
        seeded[p.id] = {
          ...(saved[p.id] ? { ...defaultProjectExtra(), ...saved[p.id] } : defaultProjectExtra()),
          stageHistory: seedHistory[p.id] ?? [],
        };
      }
      return seeded;
    }
    return saved;
  });

  // Persist on change
  useEffect(() => { saveToSession(PROJECTS_KEY, projects); }, [projects]);
  useEffect(() => { saveToSession(STAGES_KEY, stages); }, [stages]);
  useEffect(() => { saveToSession(PIPELINE_EDGES_KEY, pipelineEdges); }, [pipelineEdges]);
  useEffect(() => { saveToSession(SETTINGS_KEY, settings); }, [settings]);
  useEffect(() => { saveToSession(CHECKLIST_TEMPLATE_KEY, checklistTemplate); }, [checklistTemplate]);
  useEffect(() => { saveToSession(CHECKLIST_ORDER_KEY, checklistOrderState); }, [checklistOrderState]);
  useEffect(() => { saveToSession(PROJECT_DATA_KEY, projectData); }, [projectData]);

  // ── Projects CRUD ──

  const setProjects: Dispatch<SetStateAction<ProjectCardData[]>> = useCallback(
    (action) => setProjectsRaw(action),
    []
  );

  const addProject = useCallback((project: ProjectCardData) => {
    setProjectsRaw((prev) => [project, ...prev]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjectsRaw((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateProject = useCallback(
    (id: string, updates: Partial<ProjectCardData>) => {
      setProjectsRaw((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const getProjectDetail = useCallback(
    (id: string): ProjectDetailData | null => {
      const base = projects.find((p) => p.id === id);
      if (!base) return null;
      const extras = projectDetailExtras[id] ?? {};
      return { ...defaultDetailExtras, ...base, ...extras } as ProjectDetailData;
    },
    [projects]
  );

  // ── Stage history helpers ──

  const ensureStageHistory = useCallback(
    (projectId: string, currentStageId: string): StageHistoryEntry[] => {
      const extra = projectData[projectId];
      const history = extra?.stageHistory;
      if (history && history.length > 0) return history;
      const proj = projects.find((p) => p.id === projectId);
      const createdOn = proj?.createdOn;
      let enteredAt: string;
      if (createdOn) {
        const parsed = new Date(createdOn);
        enteredAt = isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
      } else {
        enteredAt = new Date().toISOString();
      }
      return [{ stageId: currentStageId, enteredAt, exitedAt: null }];
    },
    [projectData, projects]
  );

  const moveProjectToStage = useCallback(
    (projectId: string, newStageId: string, stageName: string) => {
      setProjectsRaw((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const now = new Date().toISOString();
          const history = ensureStageHistory(projectId, p.stageId);
          const updatedHistory = history.map((h) =>
            h.exitedAt === null ? { ...h, exitedAt: now } : h
          );
          updatedHistory.push({ stageId: newStageId, enteredAt: now, exitedAt: null });
          setProjectData((pd) => ({
            ...pd,
            [projectId]: {
              ...(pd[projectId] ? { ...defaultProjectExtra(), ...pd[projectId] } : defaultProjectExtra()),
              stageHistory: updatedHistory,
            },
          }));
          return { ...p, stageId: newStageId, status: stageName, daysInStage: 0 };
        })
      );
    },
    [ensureStageHistory]
  );

  const getStageHistory = useCallback(
    (projectId: string): StageHistoryEntry[] => {
      const proj = projects.find((p) => p.id === projectId);
      if (!proj) return [];
      return ensureStageHistory(projectId, proj.stageId);
    },
    [projects, ensureStageHistory]
  );

  const stageHistoryMap = useMemo(() => {
    const map: Record<string, StageHistoryEntry[]> = {};
    for (const p of projects) {
      const extra = projectData[p.id];
      const history = extra?.stageHistory;
      if (history && history.length > 0) {
        map[p.id] = history;
      } else {
        const createdOn = p.createdOn;
        let enteredAt: string;
        if (createdOn) {
          const parsed = new Date(createdOn);
          enteredAt = isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
        } else {
          enteredAt = new Date().toISOString();
        }
        map[p.id] = [{ stageId: p.stageId, enteredAt, exitedAt: null }];
      }
    }
    return map;
  }, [projects, projectData]);

  // ── Stages ──

  const allStages = useMemo(
    () => [...stages.presale, ...stages.postSale],
    [stages]
  );

  const setPresaleStages: Dispatch<SetStateAction<PipelineStage[]>> = useCallback(
    (action) => setStages((s) => ({
      ...s,
      presale: typeof action === "function" ? action(s.presale) : action,
    })),
    []
  );

  const setPostSaleStages: Dispatch<SetStateAction<PipelineStage[]>> = useCallback(
    (action) => setStages((s) => ({
      ...s,
      postSale: typeof action === "function" ? action(s.postSale) : action,
    })),
    []
  );

  const addStage = useCallback(
    (stage: PipelineStage, section: "pre" | "post") => {
      setStages((s) =>
        section === "pre"
          ? { ...s, presale: [...s.presale, stage] }
          : { ...s, postSale: [...s.postSale, stage] }
      );
    },
    []
  );

  const setPipelineEdges: Dispatch<SetStateAction<PipelineEdge[]>> = useCallback(
    (action) => setPipelineEdgesRaw(action),
    []
  );

  // ── Derived ──

  const filterOptions = useMemo(
    () => ({
      installers: [...new Set(projects.map((p) => p.installer))].sort(),
      teams: [...new Set(projects.map((p) => p.team))].sort(),
      representatives: [...new Set(projects.map((p) => p.representative))].sort(),
      statuses: [...new Set(projects.map((p) => p.status))].sort(),
      states: [...new Set(projects.map((p) => parseAddress(p.address).state).filter(Boolean))].sort(),
      cities: [...new Set(projects.map((p) => parseAddress(p.address).city).filter(Boolean))].sort(),
      utilityCompanies: [...new Set(projects.map((p) => p.utilityCompany))].sort(),
    }),
    [projects]
  );

  const recentProjects = useMemo(
    () => projects.slice(0, 3).map((p) => ({ id: p.id, name: `${p.ownerName}, ${p.address}` })),
    [projects]
  );

  // ── Settings accessors (individual setters that update the settings blob) ──

  const hiddenColumnIds = settings.hiddenColumnIds;
  const setHiddenColumnIds: Dispatch<SetStateAction<string[]>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      hiddenColumnIds: typeof action === "function" ? action(s.hiddenColumnIds) : action,
    })),
    []
  );

  const columnOrder = settings.columnOrder;
  const setColumnOrder: Dispatch<SetStateAction<string[]>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      columnOrder: typeof action === "function" ? action(s.columnOrder) : action,
    })),
    []
  );

  const columnLabels = settings.columnLabels ?? {};
  const setColumnLabels: Dispatch<SetStateAction<Record<string, string>>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      columnLabels: typeof action === "function" ? action(s.columnLabels ?? {}) : action,
    })),
    []
  );

  const listDensity = settings.listDensity;
  const setListDensity: Dispatch<SetStateAction<"compact" | "default" | "comfortable">> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      listDensity: typeof action === "function" ? action(s.listDensity) : action,
    })),
    []
  );

  const showRowNumbers = settings.showRowNumbers;
  const setShowRowNumbers: Dispatch<SetStateAction<boolean>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      showRowNumbers: typeof action === "function" ? action(s.showRowNumbers) : action,
    })),
    []
  );

  const customFields = settings.customFields;
  const setCustomFields: Dispatch<SetStateAction<CustomField[]>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      customFields: typeof action === "function" ? action(s.customFields) : action,
    })),
    []
  );

  const customFieldValues = settings.customFieldValues;
  const setCustomFieldValues: Dispatch<SetStateAction<Record<string, Record<string, string>>>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      customFieldValues: typeof action === "function" ? action(s.customFieldValues) : action,
    })),
    []
  );

  const filters = settings.filters;
  const setFilters: Dispatch<SetStateAction<ProjectFilters>> = useCallback(
    (action) => setSettings((s) => ({
      ...s,
      filters: typeof action === "function" ? action(s.filters) : action,
    })),
    []
  );

  // ── Saved views ──

  const savedViews = settings.savedViews ?? [];
  const activeViewId = settings.activeViewId ?? null;

  const saveCurrentView = useCallback(
    (name: string): SavedView => {
      const view: SavedView = {
        id: `view-${Date.now()}`,
        name,
        hiddenColumnIds: [...settings.hiddenColumnIds],
        columnOrder: [...settings.columnOrder],
        columnLabels: { ...settings.columnLabels },
        listDensity: settings.listDensity,
        showRowNumbers: settings.showRowNumbers,
        createdAt: Date.now(),
      };
      setSettings((s) => ({
        ...s,
        savedViews: [...(s.savedViews ?? []), view],
        activeViewId: view.id,
      }));
      return view;
    },
    [settings.hiddenColumnIds, settings.columnOrder, settings.columnLabels, settings.listDensity, settings.showRowNumbers]
  );

  const applyView = useCallback(
    (viewId: string) => {
      setSettings((s) => {
        const view = (s.savedViews ?? []).find((v) => v.id === viewId);
        if (!view) return s;
        return {
          ...s,
          hiddenColumnIds: [...view.hiddenColumnIds],
          columnOrder: [...view.columnOrder],
          columnLabels: { ...view.columnLabels },
          listDensity: view.listDensity,
          showRowNumbers: view.showRowNumbers,
          activeViewId: viewId,
        };
      });
    },
    []
  );

  const deleteView = useCallback(
    (viewId: string) => {
      setSettings((s) => ({
        ...s,
        savedViews: (s.savedViews ?? []).filter((v) => v.id !== viewId),
        activeViewId: s.activeViewId === viewId ? null : s.activeViewId,
      }));
    },
    []
  );

  const applyViewConfig = useCallback(
    (config: Omit<SavedView, "id" | "name" | "createdAt">) => {
      setSettings((s) => ({
        ...s,
        hiddenColumnIds: [...config.hiddenColumnIds],
        columnOrder: [...config.columnOrder],
        columnLabels: { ...config.columnLabels },
        listDensity: config.listDensity,
        showRowNumbers: config.showRowNumbers,
        activeViewId: null,
      }));
    },
    []
  );

  const resetToDefaultView = useCallback(() => {
    setSettings((s) => ({
      ...s,
      hiddenColumnIds: [],
      columnOrder: [...DEFAULT_COLUMN_ORDER],
      columnLabels: {},
      listDensity: "default" as const,
      showRowNumbers: false,
      activeViewId: null,
    }));
  }, []);

  // ── Per-project data helpers ──

  const getExtra = useCallback(
    (projectId: string): ProjectExtraData => {
      const stored = projectData[projectId];
      if (!stored) return defaultProjectExtra();
      const merged = { ...defaultProjectExtra(), ...stored };
      // Migrate old checklist array format → checklistDone record
      if (!merged.checklistDone || (Array.isArray((stored as unknown as Record<string, unknown>).checklist))) {
        const oldChecklist = (stored as unknown as Record<string, unknown>).checklist;
        if (Array.isArray(oldChecklist)) {
          const doneMap: Record<string, boolean[]> = {};
          for (const section of oldChecklist as { title: string; stageId?: string; items: { done: boolean }[] }[]) {
            const sid = section.stageId || section.title.toLowerCase().replace(/\s+/g, "-");
            doneMap[sid] = section.items.map((item) => item.done);
          }
          merged.checklistDone = doneMap;
        }
      }
      return merged;
    },
    [projectData]
  );

  const setExtra = useCallback(
    (projectId: string, updater: (prev: ProjectExtraData) => ProjectExtraData) => {
      setProjectData((prev) => {
        const current = prev[projectId]
          ? { ...defaultProjectExtra(), ...prev[projectId] }
          : defaultProjectExtra();
        return { ...prev, [projectId]: updater(current) };
      });
    },
    []
  );

  // Notes
  const getProjectNotes = useCallback((pid: string) => getExtra(pid).notes, [getExtra]);
  const setProjectNotes = useCallback(
    (pid: string, notes: Note[]) => setExtra(pid, (e) => ({ ...e, notes })),
    [setExtra]
  );
  const updateProjectNotes = useCallback(
    (pid: string, updater: (prev: Note[]) => Note[]) =>
      setExtra(pid, (e) => ({ ...e, notes: updater(e.notes) })),
    [setExtra]
  );

  // Design comments
  const getDesignComments = useCallback((pid: string) => getExtra(pid).designComments, [getExtra]);
  const setDesignComments = useCallback(
    (pid: string, comments: DesignComment[]) => setExtra(pid, (e) => ({ ...e, designComments: comments })),
    [setExtra]
  );
  const updateDesignComments = useCallback(
    (pid: string, updater: (prev: DesignComment[]) => DesignComment[]) =>
      setExtra(pid, (e) => ({ ...e, designComments: updater(e.designComments) })),
    [setExtra]
  );

  // Checklist — derived from global template + per-project done state
  const getChecklist = useCallback(
    (pid: string): ChecklistSection[] => {
      const doneMap = getExtra(pid).checklistDone;
      const stageMap = new Map([...stages.presale, ...stages.postSale].map((s) => [s.id, s]));
      const ordered = [...checklistPresaleOrder, ...checklistPostsaleOrder];
      return ordered
        .map((stageId) => {
          const stage = stageMap.get(stageId);
          const templateItems = checklistTemplate[stageId];
          if (!stage || !templateItems || templateItems.length === 0) return null;
          const doneArr = doneMap[stageId] || [];
          return {
            stageId,
            title: stage.title,
            items: templateItems.map((t, i) => ({
              label: t.label,
              done: doneArr[i] ?? false,
              optional: t.optional,
              statusText: t.statusText,
              ctaLabel: t.ctaLabel,
              ctaRoute: t.ctaRoute,
            })),
          } satisfies ChecklistSection;
        })
        .filter(Boolean) as ChecklistSection[];
    },
    [getExtra, stages, checklistTemplate, checklistPresaleOrder, checklistPostsaleOrder]
  );

  const toggleChecklistItem = useCallback(
    (pid: string, stageId: string, itemIdx: number) =>
      setExtra(pid, (e) => {
        const prev = e.checklistDone[stageId] || [];
        const next = [...prev];
        while (next.length <= itemIdx) next.push(false);
        next[itemIdx] = !next[itemIdx];
        return { ...e, checklistDone: { ...e.checklistDone, [stageId]: next } };
      }),
    [setExtra]
  );

  // Placed labels
  const getPlacedLabels = useCallback((pid: string) => getExtra(pid).placedLabels, [getExtra]);
  const setPlacedLabelsForProject = useCallback(
    (pid: string, labels: PlacedLabel[]) => setExtra(pid, (e) => ({ ...e, placedLabels: labels })),
    [setExtra]
  );
  const updatePlacedLabels = useCallback(
    (pid: string, updater: (prev: PlacedLabel[]) => PlacedLabel[]) =>
      setExtra(pid, (e) => ({ ...e, placedLabels: updater(e.placedLabels) })),
    [setExtra]
  );

  // Label visibility
  const getLabelVisibility = useCallback(
    (pid: string) => getExtra(pid).labelVisibility,
    [getExtra]
  );
  const setLabelVisibility = useCallback(
    (pid: string, vis: Record<string, "public" | "private">) =>
      setExtra(pid, (e) => ({ ...e, labelVisibility: vis })),
    [setExtra]
  );

  // Panel count
  const getPanelCount = useCallback((pid: string) => getExtra(pid).panelCount, [getExtra]);
  const setPanelCount = useCallback(
    (pid: string, count: number) => setExtra(pid, (e) => ({ ...e, panelCount: count })),
    [setExtra]
  );

  // Activities
  const getActivities = useCallback((pid: string) => getExtra(pid).activities, [getExtra]);

  // Project type (per-project override)
  const getProjectType = useCallback(
    (pid: string) => getExtra(pid).projectType,
    [getExtra]
  );
  const setProjectType = useCallback(
    (pid: string, type: "Solar" | "Battery" | "Solar + Battery" | "Home Improvement") =>
      setExtra(pid, (e) => ({ ...e, projectType: type })),
    [setExtra]
  );

  // ── Assemble value ──

  const value = useMemo<ProjectStoreValue>(
    () => ({
      projects, setProjects, addProject, deleteProject, updateProject, getProjectDetail, moveProjectToStage, getStageHistory, stageHistoryMap,
      presaleStages: stages.presale, postSaleStages: stages.postSale, allStages,
      setPresaleStages, setPostSaleStages, addStage,
      pipelineEdges, setPipelineEdges,
      filterOptions, recentProjects,
      hiddenColumnIds, setHiddenColumnIds,
      columnOrder, setColumnOrder,
      columnLabels, setColumnLabels,
      listDensity, setListDensity,
      showRowNumbers, setShowRowNumbers,
      customFields, setCustomFields,
      customFieldValues, setCustomFieldValues,
      filters, setFilters,
      savedViews, activeViewId, saveCurrentView, applyView, deleteView, applyViewConfig, resetToDefaultView,
      getProjectNotes, setProjectNotes, updateProjectNotes,
      getDesignComments, setDesignComments, updateDesignComments,
      checklistTemplate, setChecklistTemplate,
      checklistPresaleOrder, setChecklistPresaleOrder,
      checklistPostsaleOrder, setChecklistPostsaleOrder,
      getChecklist, toggleChecklistItem,
      getPlacedLabels, setPlacedLabelsForProject, updatePlacedLabels,
      getLabelVisibility, setLabelVisibility,
      getPanelCount, setPanelCount,
      getActivities,
      getProjectType, setProjectType,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, stages, allStages, filterOptions, recentProjects, settings, projectData, pipelineEdges, checklistTemplate, checklistOrderState]
  );

  return (
    <ProjectStoreContext.Provider value={value}>
      {children}
    </ProjectStoreContext.Provider>
  );
}

// ── Hook ──

export function useProjectStore(): ProjectStoreValue {
  const ctx = useContext(ProjectStoreContext);
  if (!ctx) {
    throw new Error("useProjectStore must be used within a ProjectStoreProvider");
  }
  return ctx;
}
