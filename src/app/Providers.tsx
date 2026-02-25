"use client";

import { type ReactNode } from "react";
import { ProjectStoreProvider } from "@/app/store/ProjectStore";
import { Toaster } from "@/app/lib/monalee-ui/components/MLToast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProjectStoreProvider>
      {children}
      <Toaster />
    </ProjectStoreProvider>
  );
}
