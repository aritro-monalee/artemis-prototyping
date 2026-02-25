"use client";

import { type ReactNode } from "react";
import { ProjectStoreProvider } from "@/app/store/ProjectStore";
import { Toaster } from "@/app/lib/monalee-ui/components/MLToast";
import { HandoffProvider } from "@/app/components/handoff/HandoffProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProjectStoreProvider>
      <HandoffProvider>{children}</HandoffProvider>
      <Toaster />
    </ProjectStoreProvider>
  );
}
