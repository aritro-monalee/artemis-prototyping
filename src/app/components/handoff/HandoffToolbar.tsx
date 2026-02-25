"use client";

import { Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHandoff } from "./HandoffContext";

export function HandoffToolbar() {
  const { isHandoffMode, toggleHandoff, componentInfo } = useHandoff();
  const sidebarOpen = !!componentInfo;

  return (
    <AnimatePresence>
      <motion.button
        onClick={toggleHandoff}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          right: sidebarOpen ? 436 : 16,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed bottom-4 z-[10002] flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm transition-colors"
        style={{
          background: isHandoffMode
            ? "var(--color-brand)"
            : "var(--color-bg)",
          color: isHandoffMode ? "#fff" : "var(--color-text)",
          border: `1px solid ${isHandoffMode ? "var(--color-brand)" : "var(--color-border)"}`,
        }}
        title={isHandoffMode ? "Exit handoff mode" : "Enter handoff mode"}
      >
        <Code size={14} />
        <span>{isHandoffMode ? "Exit Handoff" : "Handoff"}</span>
      </motion.button>
    </AnimatePresence>
  );
}
