"use client";

import { useState } from "react";

import { ArrowRight, Check, Loader2, Download, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MLButton, MLInput, MLSelect, MLMultiSelect } from "@/app/lib/monalee-ui";
import { toast } from "@/app/lib/monalee-ui/components/MLToast";
import {
  type CRMProvider,
  type CRMConnection,
  type SyncMode,
  CRM_PROVIDERS,
  CRM_FIELDS,
  CRM_STAGES,
  ARTEMIS_FIELD_OPTIONS,
} from "@/app/data/crm-integrations";
import { allStages } from "@/app/data/projects";
import { PROVIDER_LOGOS, stepVariants } from "@/app/data/constants";

/* ─── Illustration (same as AddWebhookModal) ─── */

function CrmIllustration() {
  const border = "border-[0.33px] border-black/8";
  return (
    <div
      className={`w-[600px] h-[400px] bg-white ${border} rounded-[7px] shadow-2xl overflow-hidden flex flex-col`}
    >
      <div
        className={`flex items-center justify-between px-3 py-1.5 bg-black/[0.02] border-b-[0.33px] border-black/8`}
      >
        <div className="flex gap-1">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        </div>
        <div
          className={`w-[280px] h-[18px] bg-black/[0.02] ${border} rounded-[7px] flex items-center justify-center`}
        >
          <span className="text-[8px] text-base-muted-foreground">CRM</span>
        </div>
        <div className="w-[25px]" />
      </div>
      <div className="flex-1 bg-white flex items-center justify-center p-4 overflow-auto">
        <div className="w-[320px] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cream-300" />
              <div className="w-10 h-2 rounded-full bg-cream-400" />
            </div>
            <div className="w-10 h-2 rounded-full bg-cream-300" />
          </div>
          <div
            className="rounded-md overflow-hidden"
            style={{ border: "0.33px solid rgba(0,0,0,0.08)" }}
          >
            <div className="flex bg-cream-200">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[26px] px-2 flex items-center"
                  style={{
                    borderRight:
                      i < 4 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
                    borderBottom: "0.33px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className={`h-2 rounded-full bg-black/8 ${i === 0 ? "w-[62px]" : "w-11"}`}
                  />
                </div>
              ))}
            </div>
            {[...Array(10)].map((_, row) => (
              <div key={row} className="flex">
                {[...Array(5)].map((_, col) => (
                  <div
                    key={col}
                    className="flex-1 h-[26px] px-2 flex items-center"
                    style={{
                      borderRight:
                        col < 4 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
                      borderBottom:
                        row < 9 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    <div
                      className={`h-2 rounded-full bg-black/8 ${col === 0 ? "w-[62px]" : "w-11"}`}
                    />
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

/* ─── Stage options for dropdowns ─── */

const ARTEMIS_STAGE_OPTIONS = allStages.map((s) => ({
  label: s.title,
  value: s.id,
}));

/* ─── Modal ─── */

const SYNC_EVENT_OPTIONS = [
  { label: "Project Created", value: "project-created" },
  { label: "Project Updated", value: "project-updated" },
  { label: "Contract Signed", value: "contract-signed" },
  { label: "Pre Sale Status Updated", value: "pre-sale-status-updated" },
  { label: "Post Sale Status Updated", value: "post-sale-status-updated" },
];

export interface ConnectCRMResult {
  provider: CRMProvider;
  fieldMappings: Record<string, string>;
  stageMappings: Record<string, string>;
  mode: SyncMode;
  webhookUrl?: string;
  syncEvents?: string[];
}

interface ConnectCRMModalProps {
  onClose: () => void;
  onConnect: (data: ConnectCRMResult) => void;
  editingConnection?: CRMConnection;
}

export function ConnectCRMModal({ onClose, onConnect, editingConnection }: ConnectCRMModalProps) {
  const isEditing = !!editingConnection;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(isEditing ? 2 : 1);
  const [direction, setDirection] = useState(0);

  // Step 1
  const [provider, setProvider] = useState<CRMProvider | null>(
    editingConnection?.provider ?? null
  );
  const [authInput, setAuthInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  // Step 2 — field mappings keyed by CRM field key
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>(
    () => editingConnection?.fieldMappings ?? {}
  );

  // Step 3 — stage mappings keyed by CRM stage id
  const [stageMappings, setStageMappings] = useState<Record<string, string>>(
    () => editingConnection?.stageMappings ?? {}
  );

  // Step 4 — import vs sync
  const [syncMode, setSyncMode] = useState<SyncMode | null>(
    editingConnection?.mode ?? null
  );
  const [webhookUrl, setWebhookUrl] = useState(
    editingConnection?.webhookUrl ?? ""
  );
  const [syncEvents, setSyncEvents] = useState<string[]>(
    editingConnection?.syncEvents ?? []
  );

  /* ── Navigation ── */

  const handleNext = () => {
    if (step === 1 && connected && provider) {
      const fields = CRM_FIELDS[provider];
      const defaults: Record<string, string> = {};
      fields.forEach((f) => {
        defaults[f.key] = f.defaultMapping ?? "__skip__";
      });
      setFieldMappings(defaults);

      setDirection(1);
      setStep(2);
    } else if (step === 2 && provider) {
      if (Object.keys(stageMappings).length === 0) {
        const stages = CRM_STAGES[provider];
        const defaults: Record<string, string> = {};
        stages.forEach((s) => {
          if (s.defaultMapping) defaults[s.id] = s.defaultMapping;
        });
        setStageMappings(defaults);
      }

      setDirection(1);
      setStep(3);
    } else if (step === 3) {
      setDirection(1);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 1 || (isEditing && step === 2)) {
      onClose();
    } else {
      setDirection(-1);
      setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
    }
  };

  /* ── Mock OAuth ── */

  const handleConnect = async () => {
    setConnecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setConnecting(false);
    setConnected(true);
  };

  const handleSelectProvider = (p: CRMProvider) => {
    setProvider(p);
    setConnected(false);
    setConnecting(false);
    setAuthInput(
      p === "salesforce"
        ? "https://mycompany.my.salesforce.com"
        : "pd_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
    );
  };

  /* ── Finish ── */

  const handleFinish = () => {
    if (!provider || !syncMode) return;
    const mappedCount = Object.values(fieldMappings).filter(
      (v) => v !== "__skip__"
    ).length;

    onConnect({
      provider,
      fieldMappings,
      stageMappings,
      mode: syncMode,
      webhookUrl: syncMode === "sync" ? webhookUrl : undefined,
      syncEvents: syncMode === "sync" ? syncEvents : undefined,
    });

    if (syncMode === "import") {
      toast.success(
        `Imported 5 projects from ${CRM_PROVIDERS[provider].name}`,
        {
          description: `${mappedCount} fields and ${Object.keys(stageMappings).length} stages mapped`,
        }
      );
    } else {
      toast.success(
        `Sync enabled with ${CRM_PROVIDERS[provider].name}`,
        {
          description: `Webhook configured for ${syncEvents.length} event types`,
        }
      );
    }
  };

  /* ── Render ── */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-[var(--color-surface)]/60 backdrop-blur-md flex items-center justify-center overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-[800px] max-w-full flex flex-col items-center gap-12 px-6 py-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-base-muted-foreground opacity-70">
            Organization
          </span>
          <h1 className="text-2xl font-bold text-black tracking-[-0.48px] text-balance">
            {isEditing ? "Edit Mappings" : "Connect a CRM"}
          </h1>
        </motion.div>

        {/* Content area */}
        <div className="flex flex-col gap-8 w-[600px]">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          >
            <CrmIllustration />
          </motion.div>

          {/* Animated step area */}
          <AnimatePresence mode="wait" custom={direction}>
            {/* ──────── STEP 1: Pick Provider + OAuth ──────── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-end gap-8 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                  className="flex flex-col gap-2 w-full text-sm"
                >
                  <p className="font-semibold text-base-foreground">
                    Import from a CRM
                  </p>
                  <p className="font-medium text-base-muted-foreground">
                    Connect your CRM to import projects and map your pipeline
                    stages. Authenticate with your provider to get started.
                  </p>
                </motion.div>

                {/* Provider cards */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-3 w-full"
                >
                  {(
                    Object.entries(CRM_PROVIDERS) as [
                      CRMProvider,
                      (typeof CRM_PROVIDERS)[CRMProvider],
                    ][]
                  ).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => handleSelectProvider(key)}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-[border-color,box-shadow] text-left ${
                        provider === key
                          ? "border-base-primary bg-base-primary/[0.04] ring-1 ring-base-primary/20"
                          : "border-base-border hover:border-base-primary/40 bg-white"
                      }`}
                    >
                      <img
                        src={PROVIDER_LOGOS[key as CRMProvider]}
                        alt={info.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md object-cover shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-base-foreground">
                          {info.name}
                        </span>
                        <span className="text-xs text-base-muted-foreground">
                          {info.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>

                {/* Auth section — revealed when provider is picked */}
                <AnimatePresence>
                  {provider && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full flex flex-col gap-4 overflow-hidden"
                    >
                      <MLInput
                        label={
                          provider === "salesforce"
                            ? "Instance URL"
                            : "API Token"
                        }
                        placeholder={
                          provider === "salesforce"
                            ? "https://yourorg.my.salesforce.com"
                            : "pd_live_..."
                        }
                        value={authInput}
                        onChange={(e) => setAuthInput(e.target.value)}
                      />

                      {connected ? (
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                          <Check className="w-4 h-4" />
                          <span>
                            Connected as{" "}
                            {provider === "salesforce"
                              ? "admin@mycompany.com"
                              : "jordan@solarco.com"}
                          </span>
                        </div>
                      ) : (
                        <MLButton
                          variant="outline"
                          size="default"
                          onClick={handleConnect}
                          disabled={connecting || !authInput.trim()}
                        >
                          {connecting && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}
                          {connecting
                            ? "Connecting..."
                            : `Connect with ${CRM_PROVIDERS[provider].name}`}
                        </MLButton>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nav buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-1"
                >
                  <MLButton variant="ghost" size="default" onClick={onClose}>
                    Back
                  </MLButton>
                  <MLButton
                    size="default"
                    onClick={handleNext}
                    disabled={!connected}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </MLButton>
                </motion.div>
              </motion.div>
            )}

            {/* ──────── STEP 2: Map Fields ──────── */}
            {step === 2 && provider && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                  className="flex flex-col gap-1"
                >
                  <p className="text-sm font-semibold text-base-foreground">
                    Map Fields
                  </p>
                  <p className="text-sm text-base-muted-foreground">
                    Match {CRM_PROVIDERS[provider].name} fields to your Artemis
                    project columns.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.13, ease: "easeOut" }}
                  className="flex flex-col gap-0 rounded-lg border border-base-border overflow-hidden"
                >
                  {/* Header row */}
                  <div className="grid grid-cols-2 bg-cream-100 border-b border-base-border">
                    <div className="px-4 py-2.5 text-xs font-semibold text-base-muted-foreground uppercase tracking-wide">
                      {CRM_PROVIDERS[provider].name} Field
                    </div>
                    <div className="px-4 py-2.5 text-xs font-semibold text-base-muted-foreground uppercase tracking-wide">
                      Artemis Field
                    </div>
                  </div>
                  {/* Mapping rows */}
                  {CRM_FIELDS[provider].map((field, i) => (
                    <div
                      key={field.key}
                      className={`grid grid-cols-2 items-center ${
                        i < CRM_FIELDS[provider].length - 1
                          ? "border-b border-base-border"
                          : ""
                      }`}
                    >
                      <div className="px-4 py-2.5 text-sm text-base-foreground">
                        <span className="font-medium">{field.label}</span>
                        <span className="ml-1.5 text-xs text-base-muted-foreground">
                          {field.key}
                        </span>
                      </div>
                      <div className="px-3 py-1.5">
                        <MLSelect
                          fullwidth
                          options={ARTEMIS_FIELD_OPTIONS}
                          value={
                            ARTEMIS_FIELD_OPTIONS.find(
                              (o) => o.value === fieldMappings[field.key]
                            ) ?? null
                          }
                          onChange={(selected) => {
                            if (selected) {
                              setFieldMappings((prev) => ({
                                ...prev,
                                [field.key]: selected.value,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Nav */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1 self-end"
                >
                  <MLButton variant="ghost" size="default" onClick={handleBack}>
                    Back
                  </MLButton>
                  <MLButton size="default" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </MLButton>
                </motion.div>
              </motion.div>
            )}

            {/* ──────── STEP 3: Map Stages ──────── */}
            {step === 3 && provider && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                  className="flex flex-col gap-1"
                >
                  <p className="text-sm font-semibold text-base-foreground">
                    Map Stages
                  </p>
                  <p className="text-sm text-base-muted-foreground">
                    Match {CRM_PROVIDERS[provider].name} pipeline stages to your
                    Artemis stages.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.13, ease: "easeOut" }}
                  className="flex flex-col gap-0 rounded-lg border border-base-border overflow-hidden"
                >
                  <div className="grid grid-cols-2 bg-cream-100 border-b border-base-border">
                    <div className="px-4 py-2.5 text-xs font-semibold text-base-muted-foreground uppercase tracking-wide">
                      {CRM_PROVIDERS[provider].name} Stage
                    </div>
                    <div className="px-4 py-2.5 text-xs font-semibold text-base-muted-foreground uppercase tracking-wide">
                      Artemis Stage
                    </div>
                  </div>
                  {CRM_STAGES[provider].map((stage, i) => (
                    <div
                      key={stage.id}
                      className={`grid grid-cols-2 items-center ${
                        i < CRM_STAGES[provider].length - 1
                          ? "border-b border-base-border"
                          : ""
                      }`}
                    >
                      <div className="px-4 py-2.5 text-sm font-medium text-base-foreground">
                        {stage.label}
                      </div>
                      <div className="px-3 py-1.5">
                        <MLSelect
                          fullwidth
                          options={ARTEMIS_STAGE_OPTIONS}
                          value={
                            ARTEMIS_STAGE_OPTIONS.find(
                              (o) => o.value === stageMappings[stage.id]
                            ) ?? null
                          }
                          onChange={(selected) => {
                            if (selected) {
                              setStageMappings((prev) => ({
                                ...prev,
                                [stage.id]: selected.value,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1 self-end"
                >
                  <MLButton variant="ghost" size="default" onClick={handleBack}>
                    Back
                  </MLButton>
                  <MLButton size="default" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </MLButton>
                </motion.div>
              </motion.div>
            )}

            {/* ──────── STEP 4: Import or Sync ──────── */}
            {step === 4 && provider && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                  className="flex flex-col gap-1"
                >
                  <p className="text-sm font-semibold text-base-foreground">
                    Import or Sync
                  </p>
                  <p className="text-sm text-base-muted-foreground">
                    Choose whether to do a one-time import or set up continuous
                    sync via webhooks.
                  </p>
                </motion.div>

                {/* Mode cards */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.13, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-3 w-full"
                >
                  <button
                    onClick={() => setSyncMode("import")}
                    className={`flex flex-col gap-2 p-4 rounded-lg border transition-[border-color,box-shadow] text-left ${
                      syncMode === "import"
                        ? "border-base-primary bg-base-primary/[0.04] ring-1 ring-base-primary/20"
                        : "border-base-border hover:border-base-primary/40 bg-white"
                    }`}
                  >
                    <Download className="w-5 h-5 text-base-muted-foreground" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-base-foreground">
                        One-time Import
                      </span>
                      <span className="text-xs text-base-muted-foreground">
                        Pull existing projects from{" "}
                        {CRM_PROVIDERS[provider].name} once. No ongoing sync.
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setSyncMode("sync")}
                    className={`flex flex-col gap-2 p-4 rounded-lg border transition-[border-color,box-shadow] text-left ${
                      syncMode === "sync"
                        ? "border-base-primary bg-base-primary/[0.04] ring-1 ring-base-primary/20"
                        : "border-base-border hover:border-base-primary/40 bg-white"
                    }`}
                  >
                    <RefreshCw className="w-5 h-5 text-base-muted-foreground" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-base-foreground">
                        Continuous Sync
                      </span>
                      <span className="text-xs text-base-muted-foreground">
                        Set up webhooks to keep projects in sync automatically.
                      </span>
                    </div>
                  </button>
                </motion.div>

                {/* Webhook config — revealed when sync is picked */}
                <AnimatePresence>
                  {syncMode === "sync" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                      animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full flex flex-col gap-5"
                    >
                      <MLInput
                        label="Webhook Callback URL"
                        placeholder="https://your-app.com/api/crm-webhook"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                      <MLMultiSelect
                        label="Sync Event Types"
                        placeholder="Select events to sync on"
                        options={SYNC_EVENT_OPTIONS}
                        value={syncEvents}
                        onChange={setSyncEvents}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nav */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1 self-end"
                >
                  <MLButton variant="ghost" size="default" onClick={handleBack}>
                    Back
                  </MLButton>
                  <MLButton
                    size="default"
                    onClick={handleFinish}
                    disabled={
                      !syncMode ||
                      (syncMode === "sync" &&
                        (!webhookUrl.trim() || syncEvents.length === 0))
                    }
                  >
                    {syncMode === "sync" ? "Enable Sync" : "Import Projects"}
                  </MLButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
