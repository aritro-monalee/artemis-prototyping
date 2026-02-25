"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCode, Paintbrush, ChevronRight } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useHandoff } from "./HandoffContext";

type Tab = "code" | "styles";

export function HandoffSidebar() {
  const { componentInfo, clearSelection } = useHandoff();
  const [activeTab, setActiveTab] = useState<Tab>("code");

  return (
    <AnimatePresence>
      {componentInfo && (
        <motion.div
          key="handoff-sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 420, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed right-0 top-0 bottom-0 z-[10001] flex flex-col overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, var(--color-bg) 0%, #f4f1ed 100%)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {/* Header */}
          <div
            className="flex h-14 shrink-0 items-center gap-3 px-4"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <button
              onClick={clearSelection}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5"
              style={{ color: "var(--color-text-muted)" }}
            >
              <X size={15} />
            </button>
            <div className="min-w-0 flex-1">
              <div
                className="truncate text-sm font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                {componentInfo.name}
              </div>
              {componentInfo.filePath && (
                <div
                  className="truncate text-[11px]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {componentInfo.filePath}
                </div>
              )}
            </div>
          </div>

          {/* Breadcrumb */}
          {componentInfo.breadcrumb.length > 1 && (
            <div
              className="flex shrink-0 items-center gap-1 overflow-x-auto px-4 py-2 text-[11px]"
              style={{
                borderBottom: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              {componentInfo.breadcrumb.map((name, i) => (
                <span key={i} className="flex shrink-0 items-center gap-1">
                  {i > 0 && (
                    <ChevronRight
                      size={10}
                      style={{ color: "var(--color-border)" }}
                    />
                  )}
                  <span
                    className={
                      i === componentInfo.breadcrumb.length - 1
                        ? "font-medium"
                        : ""
                    }
                    style={
                      i === componentInfo.breadcrumb.length - 1
                        ? { color: "var(--color-brand)" }
                        : undefined
                    }
                  >
                    {name}
                  </span>
                </span>
              ))}
            </div>
          )}

          {/* Rendered element preview */}
          <ElementPreview element={componentInfo.element} />

          {/* Tabs */}
          <div
            className="flex shrink-0 px-4 pt-2"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <TabButton
              active={activeTab === "code"}
              onClick={() => setActiveTab("code")}
              icon={<FileCode size={13} />}
              label="Code"
            />
            <TabButton
              active={activeTab === "styles"}
              onClick={() => setActiveTab("styles")}
              icon={<Paintbrush size={13} />}
              label="Styles"
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "code" && <CodePanel source={componentInfo.source} />}
            {activeTab === "styles" && (
              <StylesPanel styles={componentInfo.styles} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 pb-2 text-xs font-medium transition-colors"
      style={{
        color: active ? "var(--color-brand)" : "var(--color-text-muted)",
        borderBottom: active ? "2px solid var(--color-brand)" : "2px solid transparent",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function CodePanel({ source }: { source: string | null }) {
  if (!source) {
    return (
      <div
        className="flex h-full items-center justify-center text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        Loading source...
      </div>
    );
  }

  return (
    <Highlight theme={themes.github} code={source} language="tsx">
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          className="overflow-x-auto p-4 text-[12px] leading-5"
          style={{ background: "transparent", margin: 0 }}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line });
            return (
              <div key={i} {...lineProps} className="flex">
                <span
                  className="mr-4 inline-block w-8 shrink-0 select-none text-right"
                  style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
                >
                  {i + 1}
                </span>
                <span>
                  {line.map((token, j) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={j} {...tokenProps} />;
                  })}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}

function StylesPanel({
  styles,
}: {
  styles: { label: string; properties: { key: string; value: string }[] }[];
}) {
  if (!styles.length) {
    return (
      <div
        className="flex h-full items-center justify-center text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        No computed styles
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {styles.map((group) => (
        <div key={group.label}>
          <div
            className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-muted)" }}
          >
            {group.label}
          </div>
          <div
            className="rounded-lg border p-2"
            style={{
              borderColor: "var(--color-border)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            {group.properties.map((prop) => (
              <div
                key={prop.key}
                className="flex items-baseline justify-between gap-3 px-2 py-1 text-[12px]"
              >
                <span
                  className="shrink-0 font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {camelToKebab(prop.key)}
                </span>
                <span
                  className="truncate text-right font-mono"
                  style={{ color: "var(--color-brand)" }}
                >
                  {prop.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ElementPreview({ element }: { element: HTMLElement }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const clone = element.cloneNode(true) as HTMLElement;
    const rect = element.getBoundingClientRect();

    const maxW = 388;
    const maxH = 180;
    const scale = Math.min(maxW / rect.width, maxH / rect.height, 1);

    const wrapper = document.createElement("div");
    wrapper.style.width = `${rect.width}px`;
    wrapper.style.height = `${rect.height}px`;
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = "top center";
    wrapper.style.pointerEvents = "none";
    wrapper.style.margin = "0 auto";
    wrapper.appendChild(clone);

    container.style.height = `${rect.height * scale}px`;
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.appendChild(wrapper);

    return () => {
      container.innerHTML = "";
    };
  }, [element]);

  return (
    <div
      className="shrink-0 overflow-hidden px-4 py-6"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div
        ref={containerRef}
        className="overflow-hidden rounded-md"
        style={{ background: "rgba(0,0,0,0.02)" }}
      />
    </div>
  );
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
