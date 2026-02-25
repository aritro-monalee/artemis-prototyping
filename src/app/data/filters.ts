import type { ProjectCardData, ProjectFilters, StageHistoryEntry } from "./types";
import { initialProjects } from "./seed/projects";

export const defaultFilters: ProjectFilters = {
  statusFilter: "all",
  projectStatus: "",
  projectType: "all",
  leadSource: "all",
  installer: "",
  team: "",
  representative: "",
  paymentType: "all",
  state: "",
  city: "",
  utilityCompany: "",
  startDate: "",
  endDate: "",
  minDaysInStage: "",
  maxDaysInStage: "",
};

export function getStageAtDate(
  history: StageHistoryEntry[],
  date: Date
): string | null {
  for (const entry of history) {
    const entered = new Date(entry.enteredAt);
    const exited = entry.exitedAt ? new Date(entry.exitedAt) : null;
    if (entered <= date && (exited === null || exited > date)) {
      return entry.stageId;
    }
  }
  return null;
}

export function filterProjects(
  projects: ProjectCardData[],
  filters: ProjectFilters,
  stageHistoryMap?: Record<string, StageHistoryEntry[]>
): ProjectCardData[] {
  return projects.filter((p) => {
    if (filters.statusFilter !== "all") {
      if (
        filters.statusFilter === "onhold" &&
        !p.tags.some((t) => t.type === "On Hold")
      )
        return false;
      if (
        filters.statusFilter === "cancelled" &&
        !p.tags.some((t) => t.type === "Lost")
      )
        return false;
      if (
        filters.statusFilter === "active" &&
        p.tags.some((t) => t.type === "On Hold" || t.type === "Lost")
      )
        return false;
    }

    if (filters.projectType === "solar" && p.batteries > 0) return false;
    if (filters.projectType === "battery" && p.batteries === 0) return false;
    if (
      filters.projectType === "both" &&
      (p.batteries === 0 || p.panels === 0)
    )
      return false;

    if (
      filters.leadSource !== "all" &&
      p.leadSource.toLowerCase() !== filters.leadSource.toLowerCase()
    )
      return false;

    if (filters.installer && p.installer !== filters.installer) return false;
    if (filters.team && p.team !== filters.team) return false;
    if (filters.representative && p.representative !== filters.representative)
      return false;

    if (filters.projectStatus && p.status !== filters.projectStatus)
      return false;

    if (filters.state || filters.city) {
      const parts = p.address.split(",").map((s) => s.trim());
      if (parts.length >= 2) {
        const cityPart = parts[parts.length - 2];
        const stateZip = parts[parts.length - 1];
        const stateMatch = stateZip.match(/^([A-Z]{2})\s/);
        const extractedState = stateMatch ? stateMatch[1] : "";
        if (filters.state && extractedState !== filters.state) return false;
        if (
          filters.city &&
          !cityPart.toLowerCase().includes(filters.city.toLowerCase())
        )
          return false;
      }
    }

    if (filters.utilityCompany && p.utilityCompany !== filters.utilityCompany)
      return false;

    if (
      filters.paymentType === "cash" &&
      !p.paymentOption.toLowerCase().includes("cash")
    )
      return false;
    if (
      filters.paymentType === "finance" &&
      p.paymentOption.toLowerCase().includes("cash")
    )
      return false;

    if (stageHistoryMap && (filters.startDate || filters.endDate)) {
      const history = stageHistoryMap[p.id];
      if (!history || history.length === 0) return false;

      if (filters.startDate) {
        if (!getStageAtDate(history, new Date(filters.startDate))) return false;
      }
      if (filters.endDate) {
        if (!getStageAtDate(history, new Date(filters.endDate))) return false;
      }
    }

    if (stageHistoryMap && (filters.minDaysInStage || filters.maxDaysInStage)) {
      const history = stageHistoryMap[p.id];
      const current = history?.find((h) => h.exitedAt === null);
      if (!current) return false;

      const enteredDate = new Date(current.enteredAt);
      const daysInStage = Math.floor(
        (Date.now() - enteredDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (filters.minDaysInStage) {
        if (daysInStage < Number(filters.minDaysInStage)) return false;
      }
      if (filters.maxDaysInStage) {
        if (daysInStage > Number(filters.maxDaysInStage)) return false;
      }
    }

    return true;
  });
}

export function parseAddress(address: string) {
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 2) {
    const city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1];
    const stateMatch = stateZip.match(/^([A-Z]{2})\s/);
    return { city, state: stateMatch ? stateMatch[1] : "" };
  }
  return { city: "", state: "" };
}

export const filterOptions = {
  installers: [...new Set(initialProjects.map((p) => p.installer))].sort(),
  teams: [...new Set(initialProjects.map((p) => p.team))].sort(),
  representatives: [
    ...new Set(initialProjects.map((p) => p.representative)),
  ].sort(),
  statuses: [...new Set(initialProjects.map((p) => p.status))].sort(),
  states: [
    ...new Set(initialProjects.map((p) => parseAddress(p.address).state).filter(Boolean)),
  ].sort(),
  cities: [
    ...new Set(initialProjects.map((p) => parseAddress(p.address).city).filter(Boolean)),
  ].sort(),
  utilityCompanies: [
    ...new Set(initialProjects.map((p) => p.utilityCompany)),
  ].sort(),
};
