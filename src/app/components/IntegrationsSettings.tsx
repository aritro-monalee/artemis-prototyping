"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { MLButton } from "@/app/lib/monalee-ui";
import {
  MLDropdownMenu,
  MLDropdownMenuTrigger,
  MLDropdownMenuContent,
  MLDropdownMenuItem,
} from "@/app/lib/monalee-ui/components/MLDropdownMenu";
import { AnimatePresence } from "framer-motion";
import { ConnectCRMModal } from "./ConnectCRMModal";
import type { ConnectCRMResult } from "./ConnectCRMModal";
import {
  type CRMProvider,
  type CRMConnection,
  CRM_PROVIDERS,
  INITIAL_CRM_CONNECTIONS,
} from "@/app/data/crm-integrations";

/* ─── Inline provider icons (small, for footer) ─── */

const PROVIDER_LOGOS: Record<CRMProvider, string> = {
  salesforce:
    "https://cdn.brandfetch.io/idVE84WdIN/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1668516062674",
  pipedrive:
    "https://cdn.brandfetch.io/idZG_U1qqs/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667601678560",
};

function ProviderIcon({ provider }: { provider: CRMProvider }) {
  return (
    <img
      src={PROVIDER_LOGOS[provider]}
      alt={CRM_PROVIDERS[provider].name}
      className="w-6 h-6 rounded-md border-[0.5px] border-black/16 shadow-xs shrink-0 object-cover"
    />
  );
}

/* ─── Scaled CRM illustration (exact same as CrmIllustration in modals) ─── */

const BORDER = "0.33px solid rgba(0,0,0,0.08)";

function ScaledCrmIllustration({ headerBg }: { headerBg: string }) {
  return (
    <div
      className="w-[600px] h-[400px] bg-white border-[0.33px] border-black/8 rounded-[7px] shadow-2xl overflow-hidden flex flex-col"
      style={{ transformOrigin: "top left" }}
    >
      {/* Chrome bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/[0.02] border-b-[0.33px] border-black/8">
        <div className="flex gap-1">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        </div>
        <div className="w-[280px] h-[18px] bg-black/[0.02] border-[0.33px] border-black/8 rounded-[7px] flex items-center justify-center">
          <span className="text-[8px] text-base-muted-foreground">CRM</span>
        </div>
        <div className="w-[25px]" />
      </div>

      {/* Content area */}
      <div className="flex-1 bg-white flex items-center justify-center p-4 overflow-auto">
        <div className="w-[320px] flex flex-col gap-4">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cream-300" />
              <div className="w-10 h-2 rounded-full bg-cream-400" />
            </div>
            <div className="w-10 h-2 rounded-full bg-cream-300" />
          </div>

          {/* Table skeleton */}
          <div className="rounded-md overflow-hidden" style={{ border: BORDER }}>
            {/* Header row — brand colored */}
            <div className="flex" style={{ backgroundColor: headerBg }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[26px] px-2 flex items-center"
                  style={{
                    borderRight: i < 4 ? BORDER : "none",
                    borderBottom: BORDER,
                  }}
                >
                  <div className={`h-2 rounded-full bg-black/8 ${i === 0 ? "w-[62px]" : "w-11"}`} />
                </div>
              ))}
            </div>
            {/* Data rows */}
            {[...Array(10)].map((_, row) => (
              <div key={row} className="flex">
                {[...Array(5)].map((_, col) => (
                  <div
                    key={col}
                    className="flex-1 h-[26px] px-2 flex items-center"
                    style={{
                      borderRight: col < 4 ? BORDER : "none",
                      borderBottom: row < 9 ? BORDER : "none",
                    }}
                  >
                    <div className={`h-2 rounded-full bg-black/8 ${col === 0 ? "w-[62px]" : "w-11"}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CRM Card ─── */

function CRMCard({
  connection,
  onDelete,
  onEditMappings,
}: {
  connection: CRMConnection;
  onDelete: () => void;
  onEditMappings: () => void;
}) {
  const provider = CRM_PROVIDERS[connection.provider];
  const headerBg = connection.active
    ? provider.brandColor
    : "rgba(0,0,0,0.06)";

  const statusLabel = connection.mode === "sync" ? "Synced" : "Imported";
  const statusColor = connection.active
    ? connection.mode === "sync"
      ? "text-emerald-600"
      : "text-blue-600"
    : "text-base-muted-foreground";

  return (
    <div className="relative bg-cream-50 aspect-[3/2] overflow-hidden flex flex-col rounded-xl border border-base-border shadow-sm">
      {/* Scaled-down illustration — same markup as the modal, shrunk via CSS transform */}
      <div className="absolute inset-0 bottom-14 flex items-center justify-center overflow-hidden">
        <div style={{ transform: "scale(0.7)", transformOrigin: "center center" }}>
          <ScaledCrmIllustration headerBg={headerBg} />
        </div>
      </div>

      {/* Footer bar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center gap-2 bg-cream-100 border-t-[0.5px] border-cream-400 px-4 py-3">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <ProviderIcon provider={connection.provider} />
          <span className="text-sm font-semibold text-base-foreground shrink-0">
            {provider.name}
          </span>
          <span className="text-sm font-medium text-cream-600 truncate">
            {connection.teamName}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className={`text-sm font-medium px-1.5 ${statusColor}`}>
            {statusLabel}
          </span>
          <MLDropdownMenu>
            <MLDropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-cream-200/50 transition-colors">
                <MoreVertical className="w-4 h-4 text-base-muted-foreground" />
              </button>
            </MLDropdownMenuTrigger>
            <MLDropdownMenuContent align="end">
              <MLDropdownMenuItem onClick={onEditMappings}>Edit Mappings</MLDropdownMenuItem>
              <MLDropdownMenuItem className="text-red-600" onClick={onDelete}>
                Disconnect
              </MLDropdownMenuItem>
            </MLDropdownMenuContent>
          </MLDropdownMenu>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function IntegrationsSettings() {
  const [connections, setConnections] =
    useState<CRMConnection[]>(INITIAL_CRM_CONNECTIONS);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [editingConnection, setEditingConnection] =
    useState<CRMConnection | null>(null);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-semibold text-base-foreground">
              CRM Integrations
            </h2>
            <p className="text-sm text-base-muted-foreground">
              Import or sync projects from an external CRM and map fields to
              your pipeline.
            </p>
          </div>
          <MLButton
            variant="outline"
            size="sm"
            onClick={() => setShowConnectModal(true)}
          >
            Connect CRM
          </MLButton>
        </div>

        {/* Grid of CRM cards */}
        <div className="grid grid-cols-2 gap-5">
          {connections.map((conn) => (
            <CRMCard
              key={conn.key}
              connection={conn}
              onDelete={() =>
                setConnections((prev) =>
                  prev.filter((c) => c.key !== conn.key)
                )
              }
              onEditMappings={() => setEditingConnection(conn)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {showConnectModal && (
          <ConnectCRMModal
            onClose={() => setShowConnectModal(false)}
            onConnect={(data: ConnectCRMResult) => {
              const mappedCount = Object.values(data.fieldMappings).filter(
                (v) => v !== "__skip__"
              ).length;
              setConnections((prev) => [
                ...prev,
                {
                  key: String(Date.now()),
                  provider: data.provider,
                  label: CRM_PROVIDERS[data.provider].name,
                  teamName:
                    data.provider === "salesforce"
                      ? "My Salesforce Team"
                      : "My Pipedrive Org",
                  active: true,
                  lastSynced: "Just now",
                  fieldCount: mappedCount,
                  mode: data.mode,
                  fieldMappings: data.fieldMappings,
                  stageMappings: data.stageMappings,
                  webhookUrl: data.webhookUrl,
                  syncEvents: data.syncEvents,
                },
              ]);
              setShowConnectModal(false);
            }}
          />
        )}
        {editingConnection && (
          <ConnectCRMModal
            editingConnection={editingConnection}
            onClose={() => setEditingConnection(null)}
            onConnect={(data: ConnectCRMResult) => {
              const mappedCount = Object.values(data.fieldMappings).filter(
                (v) => v !== "__skip__"
              ).length;
              setConnections((prev) =>
                prev.map((c) =>
                  c.key === editingConnection.key
                    ? {
                        ...c,
                        fieldCount: mappedCount,
                        mode: data.mode,
                        fieldMappings: data.fieldMappings,
                        stageMappings: data.stageMappings,
                        webhookUrl: data.webhookUrl,
                        syncEvents: data.syncEvents,
                      }
                    : c
                )
              );
              setEditingConnection(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
