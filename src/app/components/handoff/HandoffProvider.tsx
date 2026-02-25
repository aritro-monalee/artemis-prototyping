"use client";

import { useState, useCallback, type ReactNode } from "react";
import {
  getReactFiber,
  getOwnerComponent,
  getComponentBreadcrumb,
  getRelevantStyles,
} from "./fiberUtils";
import { HandoffContext, type ComponentInfo } from "./HandoffContext";
import { HandoffToolbar } from "./HandoffToolbar";
import { HandoffOverlay } from "./HandoffOverlay";
import { HandoffSidebar } from "./HandoffSidebar";

export { useHandoff } from "./HandoffContext";

export function HandoffProvider({ children }: { children: ReactNode }) {
  const [isHandoffMode, setIsHandoffMode] = useState(false);
  const [componentInfo, setComponentInfo] = useState<ComponentInfo | null>(
    null
  );

  const toggleHandoff = useCallback(() => {
    setIsHandoffMode((prev) => {
      if (prev) setComponentInfo(null);
      return !prev;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setComponentInfo(null);
  }, []);

  const selectElement = useCallback(async (el: HTMLElement) => {
    const fiber = getReactFiber(el);
    if (!fiber) return;

    const owner = getOwnerComponent(fiber);
    if (!owner) return;

    const breadcrumb = getComponentBreadcrumb(owner.fiber);
    const styles = getRelevantStyles(el);

    const rect = el.getBoundingClientRect();
    const info: ComponentInfo = {
      name: owner.name,
      filePath: null,
      source: null,
      breadcrumb,
      styles,
      element: el,
      elementMeta: {
        tag: el.tagName.toLowerCase(),
        id: el.id || "",
        classes: Array.from(el.classList),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
    };

    setComponentInfo(info);

    try {
      const res = await fetch(
        `/api/source?name=${encodeURIComponent(owner.name)}`
      );
      if (res.ok) {
        const data = await res.json();
        setComponentInfo((prev) =>
          prev && prev.name === owner.name
            ? { ...prev, filePath: data.filePath, source: data.source }
            : prev
        );
      }
    } catch {
      // source fetch is best-effort
    }
  }, []);

  return (
    <HandoffContext.Provider
      value={{
        isHandoffMode,
        toggleHandoff,
        componentInfo,
        selectElement,
        clearSelection,
      }}
    >
      {children}
      <HandoffToolbar />
      <HandoffOverlay />
      <HandoffSidebar />
    </HandoffContext.Provider>
  );
}
