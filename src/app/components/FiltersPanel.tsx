"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelRightClose,
  Search,
  ChevronDown,
  Hammer,
  Users,
  BookUser,
  Globe,
  MapPin,
  Eye,
  Zap,
  DraftingCompass,
  Clock,
  RotateCcw,
} from "lucide-react";
import { MLTab } from "@/app/lib/monalee-ui/components/MLTab";
import { MLInput } from "@/app/lib/monalee-ui/components/MLInput";
import { MLSelect } from "@/app/lib/monalee-ui/components/MLSelect";
import { DatePicker } from "@/app/lib/monalee-ui/components/MLDatePicker";
import { listColumnLabels } from "./ProjectsView";
import type { ProjectFilters } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";

interface FiltersPanelProps {
  onClose: () => void;
  isListView: boolean;
  hiddenColumns: string[];
  onShowColumn: (id: string) => void;
  filters: ProjectFilters;
  onFilterChange: (key: keyof ProjectFilters, value: string) => void;
}

export function FiltersPanel({
  onClose,
  isListView,
  hiddenColumns,
  onShowColumn,
  filters,
  onFilterChange,
}: FiltersPanelProps) {
  const store = useProjectStore();
  const { filterOptions } = store;
  const [filterSearch, setFilterSearch] = useState("");

  const [projectOpen, setProjectOpen] = useState(true);
  const [orgOpen, setOrgOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);
  const [paymentsOpen, setPaymentsOpen] = useState(true);
  const [datesOpen, setDatesOpen] = useState(true);

  // Helper to convert string value to MLSelect option
  const toOption = (value: string) =>
    value ? { label: value, value } : null;

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-[#fefbf7] border-l border-[#d5c8b8] flex flex-col h-full shrink-0 overflow-hidden"
    >
      <div className="w-[320px] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center h-16 min-h-[64px] px-4 border-b border-[#d7cfc5] shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              <PanelRightClose className="w-4 h-4 text-[#554e46]" />
            </button>
            <div className="w-2 flex items-center justify-center">
              <div className="h-[15px] w-px bg-[#d7cfc5]" />
            </div>
            <span className="text-sm font-medium text-[#554e46]">Filters</span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto px-3 py-6">
          {/* Search */}
          <MLInput
            placeholder="Search for a filter"
            prefix={<Search className="w-4 h-4 text-[#7b6f60]" />}
            size="sm"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />

          {/* Hidden columns — list view only */}
          {isListView && hiddenColumns.length > 0 && (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <span
                className="text-[#554e46] font-medium whitespace-nowrap mr-0.5 shrink-0"
                style={{ fontSize: "12px", lineHeight: "16px" }}
              >
                Hidden Columns
              </span>
              {hiddenColumns.map((colId) => (
                <button
                  key={colId}
                  onClick={() => onShowColumn(colId)}
                  className="bg-[rgba(85,78,70,0.04)] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[8px] p-1 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-1 overflow-clip cursor-pointer hover:bg-[rgba(85,78,70,0.08)] transition-colors shrink-0"
                >
                  <Eye className="w-[14px] h-[14px] text-[#554e46] shrink-0" />
                  <span
                    className="font-medium text-[#554e46] text-center whitespace-nowrap"
                    style={{ fontSize: "12px", lineHeight: "16px" }}
                  >
                    {store.columnLabels[colId] || listColumnLabels[colId] || colId}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Status tabs */}
          <MLTab
            tabs={[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "onhold", label: "On Hold" },
              { id: "cancelled", label: "Cancelled" },
            ]}
            activeTab={filters.statusFilter}
            onChange={(v) => onFilterChange("statusFilter", v)}
            className="w-full"
            listClassName="w-full"
          />

          {/* Project section */}
          <FilterSection
            title="Project"
            open={projectOpen}
            onToggle={() => setProjectOpen((v) => !v)}
            onReset={() => {
              onFilterChange("projectStatus", "");
              onFilterChange("projectType", "all");
              onFilterChange("leadSource", "all");
            }}
          >
            <FilterField label="Status">
              <MLSelect
                options={filterOptions.statuses.map((s) => ({
                  label: s,
                  value: s,
                }))}
                placeholder="Select status"
                value={toOption(filters.projectStatus)}
                onChange={(opt) =>
                  onFilterChange("projectStatus", opt?.value ?? "")
                }
                prefix={
                  <DraftingCompass className="w-4 h-4 text-[#998d7d]" />
                }
                fullwidth
              />
            </FilterField>
            <FilterField label="Type">
              <MLTab
                tabs={[
                  { id: "all", label: "All" },
                  { id: "solar", label: "Solar" },
                  { id: "battery", label: "Battery" },
                  { id: "both", label: "Both" },
                  { id: "home", label: "Home" },
                ]}
                activeTab={filters.projectType}
                onChange={(v) => onFilterChange("projectType", v)}
                className="w-full"
                listClassName="w-full"
              />
            </FilterField>
            <FilterField label="Lead Source">
              <MLTab
                tabs={[
                  { id: "all", label: "All" },
                  { id: "website", label: "Website" },
                  { id: "sales", label: "Sales" },
                  { id: "referral", label: "Referral" },
                ]}
                activeTab={filters.leadSource}
                onChange={(v) => onFilterChange("leadSource", v)}
                className="w-full"
                listClassName="w-full"
              />
            </FilterField>
          </FilterSection>

          {/* Dates section */}
          <FilterSection
            title="Dates"
            open={datesOpen}
            onToggle={() => setDatesOpen((v) => !v)}
            onReset={() => {
              onFilterChange("startDate", "");
              onFilterChange("endDate", "");
              onFilterChange("minDaysInStage", "");
              onFilterChange("maxDaysInStage", "");
            }}
          >
            <p className="text-[11px] text-[#ac9b85] -mt-1 mb-2">Pick a date to see the pipeline at that point. Use both to see a window of activity.</p>
            <FilterField label="Start Date">
              <DatePicker
                placeholder="Pick a date"
                value={filters.startDate ? new Date(filters.startDate) : undefined}
                onChange={(d) => onFilterChange("startDate", d ? d.toISOString() : "")}
                className="w-full"
                popoverSide="bottom"
                popoverAlign="start"
              />
            </FilterField>
            <FilterField label="End Date">
              <DatePicker
                placeholder="Pick a date"
                value={filters.endDate ? new Date(filters.endDate) : undefined}
                onChange={(d) => onFilterChange("endDate", d ? d.toISOString() : "")}
                className="w-full"
                popoverSide="bottom"
                popoverAlign="start"
              />
            </FilterField>
            <div className="flex gap-2">
              <FilterField label="Min Days in Stage">
                <MLInput
                  type="number"
                  size="sm"
                  placeholder="0"
                  value={filters.minDaysInStage}
                  onChange={(e) => onFilterChange("minDaysInStage", e.target.value)}
                  prefix={<Clock className="w-4 h-4 text-[#998d7d]" />}
                />
              </FilterField>
              <FilterField label="Max Days in Stage">
                <MLInput
                  type="number"
                  size="sm"
                  placeholder="∞"
                  value={filters.maxDaysInStage}
                  onChange={(e) => onFilterChange("maxDaysInStage", e.target.value)}
                  prefix={<Clock className="w-4 h-4 text-[#998d7d]" />}
                />
              </FilterField>
            </div>
          </FilterSection>

          {/* Organization section */}
          <FilterSection
            title="Organization"
            open={orgOpen}
            onToggle={() => setOrgOpen((v) => !v)}
            onReset={() => {
              onFilterChange("installer", "");
              onFilterChange("team", "");
              onFilterChange("representative", "");
            }}
          >
            <FilterField label="Installer">
              <MLSelect
                options={filterOptions.installers.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select an installer"
                value={toOption(filters.installer)}
                onChange={(opt) =>
                  onFilterChange("installer", opt?.value ?? "")
                }
                prefix={<Hammer className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
            <FilterField label="Team">
              <MLSelect
                options={filterOptions.teams.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select a team"
                value={toOption(filters.team)}
                onChange={(opt) => onFilterChange("team", opt?.value ?? "")}
                prefix={<Users className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
            <FilterField label="Representative">
              <MLSelect
                options={filterOptions.representatives.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select sales rep"
                value={toOption(filters.representative)}
                onChange={(opt) =>
                  onFilterChange("representative", opt?.value ?? "")
                }
                prefix={<BookUser className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
          </FilterSection>

          {/* Location section */}
          <FilterSection
            title="Location"
            open={locationOpen}
            onToggle={() => setLocationOpen((v) => !v)}
            onReset={() => {
              onFilterChange("state", "");
              onFilterChange("city", "");
              onFilterChange("utilityCompany", "");
            }}
          >
            <FilterField label="State">
              <MLSelect
                options={filterOptions.states.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select state"
                value={toOption(filters.state)}
                onChange={(opt) => onFilterChange("state", opt?.value ?? "")}
                prefix={<MapPin className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
            <FilterField label="City">
              <MLSelect
                options={filterOptions.cities.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select city"
                value={toOption(filters.city)}
                onChange={(opt) => onFilterChange("city", opt?.value ?? "")}
                prefix={<Globe className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
            <FilterField label="Utility Company">
              <MLSelect
                options={filterOptions.utilityCompanies.map((v) => ({
                  label: v,
                  value: v,
                }))}
                placeholder="Select utility company"
                value={toOption(filters.utilityCompany)}
                onChange={(opt) =>
                  onFilterChange("utilityCompany", opt?.value ?? "")
                }
                prefix={<Zap className="w-4 h-4 text-[#998d7d]" />}
                fullwidth
              />
            </FilterField>
          </FilterSection>

          {/* Payments section */}
          <FilterSection
            title="Payments"
            open={paymentsOpen}
            onToggle={() => setPaymentsOpen((v) => !v)}
            onReset={() => {
              onFilterChange("paymentType", "all");
            }}
          >
            <FilterField label="Type">
              <MLTab
                tabs={[
                  { id: "all", label: "All" },
                  { id: "cash", label: "Cash" },
                  { id: "finance", label: "Finance" },
                ]}
                activeTab={filters.paymentType}
                onChange={(v) => onFilterChange("paymentType", v)}
                className="w-full"
                listClassName="w-full"
              />
            </FilterField>
          </FilterSection>

        </div>
      </div>
    </motion.div>
  );
}

/* ─── Collapsible section ─── */

function FilterSection({
  title,
  open,
  onToggle,
  onReset,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  onReset?: () => void;
  children: React.ReactNode;
}) {
  const [animating, setAnimating] = useState(false);

  return (
    <div className="bg-black/[0.02] border-[0.5px] border-[rgba(0,0,0,0.16)] rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-3">
      <div className="flex items-center gap-1">
        <button
          className="flex items-center gap-1 flex-1 cursor-pointer"
          onClick={onToggle}
        >
          <motion.div
            animate={{ rotate: open ? 0 : -90 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <ChevronDown className="w-3 h-3 text-[#554e46]" />
          </motion.div>
          <span className="flex-1 text-sm font-medium text-[#554e46] text-left leading-none">
            {title}
          </span>
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-black/5 transition-colors cursor-pointer shrink-0"
            title={`Reset ${title}`}
          >
            <RotateCcw className="w-3 h-3 text-[#998d7d]" />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onAnimationStart={() => setAnimating(true)}
            onAnimationComplete={() => setAnimating(false)}
            style={{ overflow: animating ? "hidden" : "visible" }}
          >
            <div className="flex flex-col gap-3.5 pt-3.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Field with label ─── */

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#998d7d] leading-none">
        {label}
      </span>
      {children}
    </div>
  );
}
