"use client";

import { createContext, useContext } from "react";

export interface ElementMeta {
  tag: string;
  id: string;
  classes: string[];
  width: number;
  height: number;
}

export interface ComponentInfo {
  name: string;
  filePath: string | null;
  source: string | null;
  breadcrumb: string[];
  styles: { label: string; properties: { key: string; value: string }[] }[];
  element: HTMLElement;
  elementMeta: ElementMeta;
}

export interface HandoffContextValue {
  isHandoffMode: boolean;
  toggleHandoff: () => void;
  componentInfo: ComponentInfo | null;
  selectElement: (el: HTMLElement) => void;
  clearSelection: () => void;
}

export const HandoffContext = createContext<HandoffContextValue | null>(null);

export function useHandoff() {
  const ctx = useContext(HandoffContext);
  if (!ctx) throw new Error("useHandoff must be used within HandoffProvider");
  return ctx;
}
