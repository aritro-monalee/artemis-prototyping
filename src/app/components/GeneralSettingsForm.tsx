"use client";

import { useState } from "react";
import {
  MLInput,
  MLMultiSelect,
  MLSelect,
  MLSwitch,
  MLToolTip,
} from "@/app/lib/monalee-ui";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Chile", value: "cl" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "Brazil", value: "br" },
  { label: "Australia", value: "au" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
];

const measurementOptions = [
  { label: "Imperial (feet, sq ft)", value: "imperial" },
  { label: "Metric (meters, sq m)", value: "metric" },
];

const utilityMethodOptions = [
  { label: "Monthly average", value: "monthly_average" },
  { label: "Annual estimate", value: "annual_estimate" },
  { label: "Hourly simulation", value: "hourly_simulation" },
  { label: "Utility rate schedule", value: "utility_rate_schedule" },
  { label: "Manual entry", value: "manual_entry" },
];

export function GeneralSettingsForm() {
  const [orgName, setOrgName] = useState("Monalee");
  const [enabledCountries, setEnabledCountries] = useState<string[]>([
    "us",
    "cl",
    "ca",
  ]);
  const [measurementSystem, setMeasurementSystem] = useState<{
    label: string;
    value: string;
  } | null>({ label: "Imperial (feet, sq ft)", value: "imperial" });

  const [editShadingPercentage, setEditShadingPercentage] = useState(true);
  const [defaultDeratePercentage, setDefaultDeratePercentage] = useState("0");

  const [disableUtilityRecalc, setDisableUtilityRecalc] = useState(true);
  const [useUtilityBill, setUseUtilityBill] = useState(false);
  const [utilityMethods, setUtilityMethods] = useState<string[]>([]);
  const [defaultEscalatorRate, setDefaultEscalatorRate] = useState("4");

  return (
    <div className="flex flex-col gap-8 max-w-[1024px] pb-16">
      {/* ── General Settings ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          General Settings
        </h2>

        <MLInput
          label="Name"
          required
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MLMultiSelect
            label="Enabled countries"
            required
            options={countryOptions}
            value={enabledCountries}
            onChange={setEnabledCountries}
            isSearchable
          />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-1">
              <label className="text-sm font-medium leading-none text-base-foreground">
                Measurement system
              </label>
              <MLToolTip tooltipContent="Controls units displayed across the platform (feet/sq ft vs meters/sq m)." />
            </div>
            <MLSelect
              options={measurementOptions}
              value={measurementSystem}
              onChange={(val) => setMeasurementSystem(val)}
              fullwidth
            />
          </div>
        </div>
      </section>

      <hr className="border-[#e8e2da]" />

      {/* ── Editor Settings ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          Editor Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MLSwitch
            variant="box"
            label="Edit shading percentage in design editor"
            description="Edit shading percentage instead of production percentage in design editor."
            checked={editShadingPercentage}
            onChange={(e) => setEditShadingPercentage(e.target.checked)}
          />

          <MLInput
            label="Default production derate percentage"
            required
            type="number"
            value={defaultDeratePercentage}
            onChange={(e) => setDefaultDeratePercentage(e.target.value)}
            suffix={
              <span className="text-sm text-muted-foreground select-none">
                %
              </span>
            }
          />
        </div>
      </section>

      <hr className="border-[#e8e2da]" />

      {/* ── Utility Settings ── */}
      <section className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          Utility Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MLSwitch
            variant="box"
            label="Disable utility recalculation by default"
            description="Disable utility recalculation by default."
            checked={disableUtilityRecalc}
            onChange={(e) => setDisableUtilityRecalc(e.target.checked)}
          />

          <MLSwitch
            variant="box"
            label="Use utility bill to calculate savings"
            description="Use utility bill to calculate savings."
            checked={useUtilityBill}
            onChange={(e) => setUseUtilityBill(e.target.checked)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <MLMultiSelect
              label="Utility calculation methods"
              options={utilityMethodOptions}
              value={utilityMethods}
              onChange={setUtilityMethods}
            />
            <p className="text-sm text-muted-foreground leading-5">
              Methods available in the project creation workflow for calculating
              energy consumption. Leave empty to show all methods.
            </p>
          </div>

          <MLInput
            label="Default utility escalator rate"
            required
            type="number"
            value={defaultEscalatorRate}
            onChange={(e) => setDefaultEscalatorRate(e.target.value)}
            suffix={
              <span className="text-sm text-muted-foreground select-none">
                %
              </span>
            }
          />
        </div>
      </section>
    </div>
  );
}
