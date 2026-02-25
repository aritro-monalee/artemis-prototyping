export interface LabelDef {
  id: string;
  name: string;
  color: string;
}

export const predefinedLabels: LabelDef[] = [
  { id: "plants", name: "Plants", color: "#059669" },
  { id: "vent", name: "Vent", color: "#525252" },
  { id: "panel-drop-off", name: "Panel drop off", color: "#8b5cf6" },
  { id: "dont-use-plane", name: "Don't use plane", color: "#eb4260" },
  { id: "no-walk-zone", name: "No walk zone", color: "#ea580c" },
  { id: "main-panel", name: "Main Panel", color: "#d97706" },
  { id: "conduit-run", name: "Conduit run", color: "#499fcf" },
  { id: "verify-on-site", name: "Verify on site", color: "#57534e" },
  { id: "steep-roof", name: "Steep roof", color: "#c026d3" },
];
