"use client";

import { useState } from "react";
import Image from "next/image";
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
import { CrmIllustration } from "./shared/CrmIllustration";
import { PROVIDER_LOGOS } from "@/app/data/constants";

/* ─── Inline provider icons (small, for footer) ─── */

function ProviderIcon({ provider }: { provider: CRMProvider }) {
  return (
    <Image
      src={PROVIDER_LOGOS[provider]}
      alt={CRM_PROVIDERS[provider].name}
      width={24}
      height={24}
      className="w-6 h-6 rounded-md border-[0.5px] border-black/16 shadow-xs shrink-0 object-cover"
    />
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
          <CrmIllustration headerBg={headerBg} />
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
