"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ProjectDetailData } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";

function Accordion({
  title,
  badge,
  open,
  onToggle,
  children,
}: {
  title: string;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--color-border)]">
      <button onClick={onToggle} className="w-full flex items-center gap-1 py-4 cursor-pointer">
        <span className="text-sm font-medium text-[var(--color-text)]">{title}</span>
        {badge && (
          <div className="flex-1 flex items-start">
            <span className="inline-flex items-center justify-center px-2 py-[2px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-xs font-semibold tabular-nums text-[var(--color-text)] leading-4">
              {badge}
            </span>
          </div>
        )}
        {!badge && <div className="flex-1" />}
        <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4 text-[#998d7d]" />
        </div>
      </button>
      {open && children && (
        <div className="flex flex-col gap-2 pb-4">{children}</div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-xs font-medium text-[var(--color-text-muted)] leading-none">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-[var(--color-text)] leading-5">{value}</span>
    </div>
  );
}

export function DetailsContent({
  project,
  systemOpen,
  setSystemOpen,
  financingOpen,
  setFinancingOpen,
  pricingOpen,
  setPricingOpen,
}: {
  project: ProjectDetailData;
  systemOpen: boolean;
  setSystemOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  financingOpen: boolean;
  setFinancingOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  pricingOpen: boolean;
  setPricingOpen: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  const { customFields, customFieldValues } = useProjectStore();
  const [customDataOpen, setCustomDataOpen] = useState(false);

  const projectCustomValues = customFieldValues[project.id] ?? {};
  const hasCustomFields = customFields.length > 0;

  return (
    <div className="flex flex-col">
      <Accordion title="System" open={systemOpen} onToggle={() => setSystemOpen((v) => !v)}>
        <Row label="Panels" value={`${project.panelModel} x ${project.panelCount}`} />
        <Row label="Inverters" value={`${project.inverterModel} x ${project.inverterCount}`} />
        <Row label="Batteries" value={`${project.batteryModel} x ${project.batteryCount}`} />
        <Row label="Adders & Discounts" value={`${project.addersTotal} Total`} />
      </Accordion>

      <Accordion
        title="Financing"
        badge={`$${project.financingTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
        open={financingOpen}
        onToggle={() => setFinancingOpen((v) => !v)}
      >
        <Row label="Total Loan" value={`$${project.totalLoan.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} />
        <Row label="Term" value={project.term} />
        <Row label="Lender" value="{{lender.name}}" />
        <Row label="Net Price per Square" value={`$${project.netPricePerSquare.toFixed(2)}`} />
      </Accordion>

      <Accordion
        title="Pricing"
        badge={`$${project.pricePerSquare.toFixed(2)} per Square`}
        open={pricingOpen}
        onToggle={() => setPricingOpen((v) => !v)}
      />

      {hasCustomFields && (() => {
        const populated = customFields.filter((f) => {
          const raw = projectCustomValues[f.id];
          return raw !== undefined && raw !== "";
        });
        if (populated.length === 0) return null;
        return (
          <Accordion
            title="Custom Data"
            open={customDataOpen}
            onToggle={() => setCustomDataOpen((v) => !v)}
          >
            {populated.map((field) => {
              const raw = projectCustomValues[field.id] ?? "";
              const display = field.type === "checkbox"
                ? (raw === "true" ? "Yes" : "No")
                : raw;
              return <Row key={field.id} label={field.label} value={display} />;
            })}
          </Accordion>
        );
      })()}
    </div>
  );
}
