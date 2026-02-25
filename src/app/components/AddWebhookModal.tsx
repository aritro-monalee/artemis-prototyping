"use client";

import { useState } from "react";
import { ArrowRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MLButton,
  MLInput,
  MLSelect,
  MLMultiSelect,
} from "@/app/lib/monalee-ui";
import { toast } from "@/app/lib/monalee-ui/components/MLToast";

function CrmIllustration() {
  const border = "border-[0.33px] border-black/8";
  return (
    <div className={`w-[600px] h-[400px] bg-white ${border} rounded-[7px] shadow-2xl overflow-hidden flex flex-col`}>
      <div className={`flex items-center justify-between px-3 py-1.5 bg-black/[0.02] border-b-[0.33px] border-black/8`}>
        <div className="flex gap-1">
          <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        </div>
        <div className={`w-[280px] h-[18px] bg-black/[0.02] ${border} rounded-[7px] flex items-center justify-center`}>
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
          <div className="rounded-md overflow-hidden" style={{ border: "0.33px solid rgba(0,0,0,0.08)" }}>
            <div className="flex bg-cream-200">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[26px] px-2 flex items-center"
                  style={{
                    borderRight: i < 4 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
                    borderBottom: "0.33px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div className={`h-2 rounded-full bg-black/8 ${i === 0 ? "w-[62px]" : "w-11"}`} />
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
                      borderRight: col < 4 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
                      borderBottom: row < 9 ? "0.33px solid rgba(0,0,0,0.08)" : "none",
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

const API_METHOD_OPTIONS = [
  { label: "POST", value: "POST" },
  { label: "GET", value: "GET" },
  { label: "PUT", value: "PUT" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
];

const EVENT_TYPE_OPTIONS = [
  { label: "Project Created", value: "project-created" },
  { label: "Project Updated", value: "project-updated" },
  { label: "Contract Signed", value: "contract-signed" },
  { label: "Contract Change Order Sent", value: "contract-change-order-sent" },
  { label: "Credit Application Submitted", value: "credit-application-submitted" },
  { label: "Pre Sale Status Updated", value: "pre-sale-status-updated" },
  { label: "Application Decision", value: "application-decision" },
  { label: "Post Sale Status Updated", value: "post-sale-status-updated" },
  { label: "User Created", value: "user-created" },
  { label: "User Updated", value: "user-updated" },
  { label: "User Deleted", value: "user-deleted" },
  { label: "Energy Audit Updated", value: "energy-audit-updated" },
];

const AUTH_TYPE_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Basic Auth", value: "basic" },
  { label: "Bearer Token", value: "bearer" },
  { label: "API Key", value: "api-key" },
];

interface Header {
  key: string;
  value: string;
}

interface AddWebhookModalProps {
  onClose: () => void;
  onAdd: (url: string) => void;
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export function AddWebhookModal({ onClose, onAdd }: AddWebhookModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState(0);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiMethod, setApiMethod] = useState("POST");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [authType, setAuthType] = useState("none");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [testing, setTesting] = useState(false);

  const handleNext = () => {
    if (step === 1 && webhookUrl.trim()) {
      setDirection(1);
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setDirection(-1);
      setStep(1);
    } else {
      onClose();
    }
  };

  const handleAddHeader = () => {
    setHeaders((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateHeader = (index: number, field: "key" | "value", val: string) => {
    setHeaders((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: val } : h))
    );
  };

  const handleTestWebhook = async () => {
    setTesting(true);
    await new Promise((r) => setTimeout(r, 1500));

    const success = Math.random() > 0.3;
    if (success) {
      toast.success("Webhook test successful", {
        description: `POST ${webhookUrl} returned 200 OK`,
      });
      setTimeout(() => {
        onAdd(webhookUrl.trim());
      }, 800);
    } else {
      toast.error("Webhook test failed", {
        description: `Could not reach ${webhookUrl}. Check the URL and try again.`,
      });
    }
    setTesting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-[#f4f1ed]/60 backdrop-blur-md flex items-center justify-center overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
            Installer.name
          </span>
          <h1 className="text-2xl font-bold text-black tracking-[-0.48px]">
            Add a webhook
          </h1>
        </motion.div>

        {/* Step content */}
        <div className="flex flex-col gap-8 w-[600px]">
          {/* Illustration — stays put across steps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          >
            <CrmIllustration />
          </motion.div>

          {/* Animated form area */}
          <AnimatePresence mode="wait" custom={direction}>
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
                    Connect a custom CRM
                  </p>
                  <p className="font-medium text-base-muted-foreground">
                    In order to sync leads to your CRM, Artemis can directly post new
                    leads to your CRM&apos;s webhook.
                  </p>
                  <a
                    href="#"
                    className="font-medium text-base-primary underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn more about setting up webhooks.
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                  className="w-full"
                >
                  <MLInput
                    label="Add webhook URL"
                    placeholder="artemispower.com/installer"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNext();
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-1"
                >
                  <MLButton variant="ghost" size="default" onClick={onClose}>
                    Back
                  </MLButton>
                  <MLButton size="default" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </MLButton>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                >
                  <MLSelect
                    label="API Method"
                    required
                    fullwidth
                    options={API_METHOD_OPTIONS}
                    value={API_METHOD_OPTIONS.find((o) => o.value === apiMethod) ?? null}
                    onChange={(selected) => {
                      if (selected) setApiMethod(selected.value);
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.13, ease: "easeOut" }}
                >
                  <MLMultiSelect
                    label="Event Types"
                    required
                    placeholder="Select event types"
                    options={EVENT_TYPE_OPTIONS}
                    value={eventTypes}
                    onChange={setEventTypes}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }}
                >
                  <MLSelect
                    label="Authentication Type"
                    required
                    fullwidth
                    options={AUTH_TYPE_OPTIONS}
                    value={AUTH_TYPE_OPTIONS.find((o) => o.value === authType) ?? null}
                    onChange={(selected) => {
                      if (selected) setAuthType(selected.value);
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.23, ease: "easeOut" }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-base-foreground">
                      Credential Headers
                    </h3>
                    <MLButton variant="outline" size="sm" onClick={handleAddHeader}>
                      Add Header
                    </MLButton>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {headers.length === 0 ? (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-base-muted-foreground"
                      >
                        Add custom headers to include in webhook requests
                      </motion.p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {headers.map((header, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex gap-2 items-end"
                          >
                            <div className="flex-1">
                              <MLInput
                                label={i === 0 ? "Header Key" : undefined}
                                placeholder="X-Custom-Header"
                                value={header.key}
                                onChange={(e) => handleUpdateHeader(i, "key", e.target.value)}
                              />
                            </div>
                            <div className="flex-1">
                              <MLInput
                                label={i === 0 ? "Header Value" : undefined}
                                placeholder="value"
                                value={header.value}
                                onChange={(e) => handleUpdateHeader(i, "value", e.target.value)}
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveHeader(i)}
                              className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-cream-200/50 transition-colors text-base-muted-foreground hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.28, ease: "easeOut" }}
                  className="flex items-center gap-1 self-end"
                >
                  <MLButton variant="ghost" size="default" onClick={handleBack}>
                    Back
                  </MLButton>
                  <MLButton
                    size="default"
                    onClick={handleTestWebhook}
                    disabled={testing}
                  >
                    {testing ? "Testing..." : "Test Webhook"}
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
