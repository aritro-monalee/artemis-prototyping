"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ListFilter,
  Ellipsis,
  Tag,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { predefinedLabels, type DesignComment } from "@/app/data/projects";
import { NotesSidebar } from "./NotesSidebar";
import { LabelContextBoxSearch, LabelContextBoxChips } from "./LabelContextBox";

export function EditDesignRightSidebar({
  annotationSub,
  comments,
  setComments,
  placedLabels,
  setPlacedLabels,
  selectedLabelIdx,
  setSelectedLabelIdx,
  labelVisibility,
  setLabelVisibility,
}: {
  annotationSub: "notes" | "label" | null;
  comments: DesignComment[];
  setComments: React.Dispatch<React.SetStateAction<DesignComment[]>>;
  placedLabels: { labelId: string; top: number; left: number }[];
  setPlacedLabels: React.Dispatch<React.SetStateAction<{ labelId: string; top: number; left: number }[]>>;
  selectedLabelIdx: number | null;
  setSelectedLabelIdx: (v: number | null) => void;
  labelVisibility: Record<number, boolean>;
  setLabelVisibility: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const [roofPlaneCExpanded, setRoofPlaneCExpanded] = useState(true);
  const [inverter2Expanded, setInverter2Expanded] = useState(true);
  const [selectedArray, setSelectedArray] = useState<number>(4);
  const [labelChipsExpanded, setLabelChipsExpanded] = useState(true);
  const isLabelMode = annotationSub === "label";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastSelectedRef = useRef<{ i: number; label: typeof predefinedLabels[0]; } | null>(null);

  const hasSelection = selectedLabelIdx !== null && placedLabels[selectedLabelIdx];
  if (hasSelection) {
    const lbl = predefinedLabels.find((l) => l.id === placedLabels[selectedLabelIdx].labelId);
    if (lbl) lastSelectedRef.current = { i: selectedLabelIdx, label: lbl };
  }

  if (annotationSub === "notes") {
    return (
      <aside className="w-[310px] shrink-0 bg-[var(--color-bg)] flex flex-col overflow-hidden z-10">
        <NotesSidebar comments={comments} setComments={setComments} />
      </aside>
    );
  }

  return (
    <aside className="w-[310px] shrink-0 bg-[var(--color-bg)] flex flex-col overflow-hidden z-10">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div
          className="border-b border-[var(--color-border)] flex flex-col gap-3.5 items-center pb-2 pt-3.5 px-3.5 z-[2] sticky top-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #f4f1ed, #f4f1ed), linear-gradient(90deg, rgba(75,51,241,0.05), rgba(75,51,241,0.05)), linear-gradient(90deg, #fefbf7, #fefbf7)",
          }}
        >
          <div className="flex items-center justify-between w-full h-3.5">
            <div className="flex items-center gap-1">
              {isLabelMode ? (
                <>
                  <Tag className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">Labels</span>
                </>
              ) : (
                <>
                  <PanelIcon />
                  <span className="text-xs font-medium text-[var(--color-text-muted)]">Panel</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {isLabelMode ? (
                <>
                  <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
                    <ListFilter className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  </button>
                  <button className="p-0.5 hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors">
                    <Ellipsis className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  </button>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </>
              )}
            </div>
          </div>

          {isLabelMode ? (
            <>
              <LabelContextBoxSearch />
              <LabelContextBoxChips />

              {(() => {
                const show = hasSelection && labelChipsExpanded;
                const data = hasSelection ? { i: selectedLabelIdx, label: predefinedLabels.find((l) => l.id === placedLabels[selectedLabelIdx].labelId)! } : lastSelectedRef.current;
                const isPrivate = data ? labelVisibility[data.i] === false : false;
                return (
                  <div className="w-full flex flex-col gap-1.5">
                    <div
                      className="grid w-full transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{ gridTemplateRows: hasSelection ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden w-full">
                        <button
                          onClick={() => setLabelChipsExpanded((v) => !v)}
                          className="flex items-center gap-2.5 w-full rounded-md"
                        >
                          <div className="flex-1 h-px bg-[var(--color-border)]" />
                          {labelChipsExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                          )}
                          <div className="flex-1 h-px bg-[var(--color-border)]" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="grid w-full transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{ gridTemplateRows: show ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden w-full">
                        {data && data.label && (
                          <div
                            className="flex items-center justify-between px-1 py-1.5 rounded-[9px] w-full hover:bg-[rgba(0,0,0,0.02)] transition-colors group"
                          >
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                              <div className="p-[1.5px] rounded-[5px]">
                                <div
                                  className="flex items-center justify-center p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                                  style={{ backgroundColor: data.label.color }}
                                >
                                  <span
                                    className="text-[12px] font-semibold leading-none whitespace-nowrap transition-colors duration-200"
                                    style={{ color: isPrivate ? "rgba(255,255,255,0.6)" : "white" }}
                                  >
                                    {data.label.name}
                                  </span>
                                  <div
                                    className="shrink-0 overflow-hidden transition-all duration-200"
                                    style={{ width: isPrivate ? 13 : 0, opacity: isPrivate ? 1 : 0 }}
                                  >
                                    <EyeOff className="w-[9px] h-[9px] text-white/60 ml-1" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div
                                onClick={() => setLabelVisibility((prev) => ({ ...prev, [data.i]: !isPrivate ? false : true }))}
                                className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                              >
                                {isPrivate ? (
                                  <Eye className="w-4 h-4 text-[var(--color-text-muted)]" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-[var(--color-text-muted)]" />
                                )}
                              </div>
                              <div
                                onClick={() => {
                                  setPlacedLabels((prev) => prev.filter((_, idx) => idx !== data.i));
                                  setSelectedLabelIdx(null);
                                  setLabelVisibility((prev) => {
                                    const next = { ...prev };
                                    delete next[data.i];
                                    return next;
                                  });
                                }}
                                className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-[var(--color-text-muted)]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3.5 items-start w-full">
                <div className="flex gap-2 items-start w-full">
                  <SidebarSelect label="Orientation" value="Landscape" hasIcon hasChevron flex1 />
                  <SidebarInput label="Pitch" value="162.74°" hasIcon width="w-[100px]" />
                </div>
                <div className="flex gap-2 items-start w-full">
                  <SidebarInput label="Azimuth" value="162.74°" hasIcon width="w-[100px]" />
                  <SidebarSelect label="Panel" value="Urecho 400" hasChevron flex1 />
                </div>
              </div>

              <button className="flex items-center gap-2.5 w-full rounded-md">
                <div className="flex-1 h-px bg-[var(--color-border)]" />
                <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </button>

              <div className="flex gap-2 items-start w-full">
                <div className="flex-1 flex flex-col gap-2 h-[58px]">
                  <p className="text-sm font-medium text-[var(--color-text)] leading-none">Production</p>
                  <div className="flex items-center gap-2 h-9 bg-white border border-[var(--color-border-alt)] rounded-md px-3 shadow-xs">
                    <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <span className="flex-1 text-sm text-[var(--color-text)]">427.82</span>
                    <span className="text-xs font-semibold text-[#2a226a] bg-[#e2deff] rounded-md px-2 py-0.5 shadow-sm">kWh</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 h-[58px] w-[99px]">
                  <p className="text-sm font-medium text-[var(--color-text)] leading-none">Solar Access</p>
                  <div className="flex items-center gap-2 h-9 bg-white border border-[var(--color-border-alt)] rounded-md px-3 shadow-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    <span className="flex-1 text-sm text-[var(--color-text)]">95.68%</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 pr-2.5 py-1.5">
          <div className="border-l-2 border-[#1eafff] pl-2.5">
            <SectionDivider label="Roof Planes" rightLabel="Production" />

            <div className="flex flex-col gap-0.5 mt-2">
              <PlaneRow
                label="Plane B"
                count="10x"
                production="123.82 kWh"
                expanded={false}
                onToggle={() => {}}
              />

              <div className="bg-[rgba(75,51,241,0.05)] rounded-xl flex flex-col">
                <PlaneRow
                  label="Plane C"
                  count="15x"
                  production="427.41 kWh"
                  expanded={roofPlaneCExpanded}
                  onToggle={() => setRoofPlaneCExpanded((v) => !v)}
                  containerClass="border-b border-[rgba(110,4,189,0.1)]"
                  height="h-[41px]"
                />
                {roofPlaneCExpanded && (
                  <div className="flex flex-col gap-px px-[5px] pb-[5px]">
                    {[
                      { num: 1, prod: "227.33 kWh", on: true },
                      { num: 2, prod: "111.22 kWh", on: false },
                      { num: 3, prod: "222.22 kWh", on: false },
                      { num: 4, prod: "123.54 kWh", on: true },
                    ].map((item) => (
                      <ArrayRow
                        key={item.num}
                        num={item.num}
                        production={item.prod}
                        switchOn={item.on}
                        selected={selectedArray === item.num}
                        dimmed={item.num !== 1 && item.num !== 4}
                        onSelect={() => setSelectedArray(item.num)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5" />
                  <RoofPlaneIcon />
                  <span className="text-xs font-medium text-[var(--color-text)]">
                    Plane A
                  </span>
                </div>
                <span className="text-xs font-medium text-[var(--color-text)] opacity-20 text-right w-[63px]">
                  0 kWh
                </span>
              </button>
            </div>

            <button className="flex items-center gap-1 pl-[9px] h-[38px] rounded-[9px] w-full mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Show Unused Roof Planes
              </span>
            </button>
          </div>

          <div className="border-l-2 border-[#63ffed] pl-2.5">
            <SectionDivider label="Ground Mounts" rightLabel="Production" />

            <div className="flex flex-col gap-0.5 mt-2">
              <PlaneRow
                label="Ground D"
                count="15x"
                production="411.31 kWh"
                expanded={false}
                onToggle={() => {}}
              />
            </div>

            <button className="flex items-center gap-1 pl-[9px] h-[38px] rounded-[9px] w-full mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Show Unused Ground Mounts
              </span>
            </button>
          </div>

          <div className="border-l-2 border-[#ffc821] pl-2.5">
            <SectionDivider label="Inverters" rightLabel="Power" />

            <div className="flex flex-col gap-0.5 mt-2">
              <button className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5" />
                  <InverterIcon />
                  <span className="text-xs font-medium text-[var(--color-text)]">
                    Inverter 1
                  </span>
                </div>
                <span className="text-xs font-medium text-[var(--color-text)]">
                  6.22 kW
                </span>
              </button>

              <div>
                <button
                  onClick={() => setInverter2Expanded((v) => !v)}
                  className="flex items-center justify-between pl-[9px] pr-[13px] py-2 rounded-[9px] w-full h-[38px] hover:bg-[rgba(0,0,0,0.02)] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {inverter2Expanded ? (
                      <ChevronDown className="w-1.5 h-1.5 text-[var(--color-text-muted)]" />
                    ) : (
                      <ChevronRight className="w-1.5 h-1.5 text-[var(--color-text-muted)]" />
                    )}
                    <InverterIcon />
                    <span className="text-xs font-medium text-[var(--color-text)]">
                      Inverter 2
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[var(--color-text)]">
                    427.41 kWh
                  </span>
                </button>
                {inverter2Expanded && (
                  <div className="flex flex-col">
                    <InverterStringRow
                      color="#e85d75"
                      label="A"
                      panels="12 Panels"
                      watts="3,112 W"
                    />
                    <InverterStringRow
                      color="#5da5e8"
                      label="B"
                      panels="14 Panels"
                      watts="3,112 W"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {isLabelMode && (
            <div className="border-l-2 border-[#56ff4b] pl-2.5">
              <SectionDivider label="Labels" rightLabel="Visibility" />
              {placedLabels.length > 0 ? (
                <div className="flex flex-col gap-0.5 mt-2">
                  {placedLabels.map((pl, i) => {
                    const label = predefinedLabels.find((l) => l.id === pl.labelId);
                    if (!label) return null;
                    const isPrivate = labelVisibility[i] === false;
                    const isSelected = selectedLabelIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedLabelIdx(isSelected ? null : i)}
                        className={`flex items-center justify-between px-3 py-2 rounded-[9px] w-full h-[38px] transition-colors group ${isSelected ? "bg-[rgba(75,51,241,0.08)]" : "hover:bg-[rgba(0,0,0,0.02)]"}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <div className="p-[1.5px] rounded-[5px]">
                            <div
                              className="flex items-center justify-center p-1 rounded-[4px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                              style={{ backgroundColor: label.color }}
                            >
                              <span
                                className="text-[12px] font-semibold leading-none whitespace-nowrap transition-colors duration-200"
                                style={{ color: isPrivate ? "rgba(255,255,255,0.6)" : "white" }}
                              >
                                {label.name}
                              </span>
                              <div
                                className="shrink-0 overflow-hidden transition-all duration-200"
                                style={{ width: isPrivate ? 13 : 0, opacity: isPrivate ? 1 : 0 }}
                              >
                                <EyeOff className="w-[9px] h-[9px] text-white/60 ml-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            onClick={(e) => { e.stopPropagation(); setLabelVisibility((prev) => ({ ...prev, [i]: !isPrivate ? false : true })); }}
                            className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                          >
                            {isPrivate ? (
                              <Eye className="w-4 h-4 text-[var(--color-text-muted)]" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-[var(--color-text-muted)]" />
                            )}
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlacedLabels((prev) => prev.filter((_, idx) => idx !== i));
                              if (selectedLabelIdx === i) setSelectedLabelIdx(null);
                              setLabelVisibility((prev) => {
                                const next = { ...prev };
                                delete next[i];
                                return next;
                              });
                            }}
                            className="flex items-center p-1 rounded-[6px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-[var(--color-text-muted)]" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-3">
                  <p className="text-xs text-[var(--color-text-secondary)]">Drag labels onto the canvas to place them</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20">
        <button className="w-10 h-10 rounded-full bg-[var(--color-text)] shadow-lg flex items-center justify-center hover:bg-[#3d3830] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </button>
      </div>
    </aside>
  );
}

function SidebarSelect({
  label,
  value,
  hasIcon,
  hasChevron,
  flex1,
}: {
  label: string;
  value: string;
  hasIcon?: boolean;
  hasChevron?: boolean;
  flex1?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 h-[58px] ${flex1 ? "flex-1" : ""}`}>
      <p className="text-sm font-medium text-[var(--color-text)] leading-none">{label}</p>
      <div className="flex items-center gap-2 h-9 bg-white border border-[var(--color-border-alt)] rounded-md px-3 shadow-xs cursor-pointer w-full">
        {hasIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        )}
        <span className="flex-1 text-sm text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
        </span>
        {hasChevron && (
          <ChevronDown className="w-4 h-4 text-[var(--color-text)] shrink-0" />
        )}
      </div>
    </div>
  );
}

function SidebarInput({
  label,
  value,
  hasIcon,
  width,
}: {
  label: string;
  value: string;
  hasIcon?: boolean;
  width?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 h-[58px] ${width || ""}`}>
      <p className="text-sm font-medium text-[var(--color-text)] leading-none">{label}</p>
      <div className="flex items-center gap-2 h-9 bg-white border border-[var(--color-border-alt)] rounded-md px-3 shadow-xs w-full">
        {hasIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        )}
        <span className="flex-1 text-sm text-[var(--color-text)]">{value}</span>
      </div>
    </div>
  );
}

function SectionDivider({
  label,
  rightLabel,
}: {
  label: string;
  rightLabel: string;
}) {
  return (
    <div className="flex items-center gap-2.5 opacity-50 pb-0.5 pt-3 px-2.5 w-full">
      <span className="text-xs font-medium text-[var(--color-text-muted)] leading-none shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--color-border)]" />
      <span className="text-[10px] font-medium text-[var(--color-text-muted)] leading-none shrink-0">
        {rightLabel}
      </span>
    </div>
  );
}

function PlaneRow({
  label,
  count,
  production,
  expanded,
  onToggle,
  containerClass,
  height = "h-[38px]",
}: {
  label: string;
  count: string;
  production: string;
  expanded: boolean;
  onToggle: () => void;
  containerClass?: string;
  height?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between pl-[9px] pr-[13px] py-1 rounded-[9px] w-full ${height} ${containerClass || ""}`}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 flex items-center justify-center">
          {expanded ? (
            <ChevronDown className="w-[6px] h-[3px] text-[var(--color-text-muted)]" />
          ) : (
            <ChevronRight className="w-[3px] h-[6px] text-[var(--color-text-muted)]" />
          )}
        </div>
        <RoofPlaneIcon />
        <span className="text-xs font-medium text-[var(--color-text)]">
          {label}{" "}
          <span className="text-[10px] text-[var(--color-text-secondary)]">- {count}</span>
        </span>
      </div>
      <span className="text-xs font-medium text-[var(--color-text)]">{production}</span>
    </button>
  );
}

function ArrayRow({
  num,
  production,
  switchOn,
  selected,
  dimmed,
  onSelect,
}: {
  num: number;
  production: string;
  switchOn: boolean;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between p-2 rounded-[9px] w-full h-10 transition-colors ${
        selected
          ? "bg-[rgba(110,4,189,0.08)] border-[3px] border-[rgba(110,4,189,0.19)]"
          : ""
      }`}
    >
      <div className="flex items-center gap-1.5">
        <div
          className={`w-6 h-4 rounded-full flex items-center px-0.5 shrink-0 ${
            switchOn
              ? "bg-[var(--color-brand)] justify-end"
              : "bg-[var(--color-border)] justify-start"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
        </div>
        <PanelIcon />
        <span
          className={`text-xs font-medium text-[var(--color-brand)] w-5 text-left ${
            dimmed ? "opacity-40" : ""
          }`}
        >
          {num}
        </span>
      </div>
      <span
        className={`text-xs font-medium text-[var(--color-text)] ${
          dimmed ? "opacity-50" : ""
        }`}
      >
        {production}
      </span>
    </button>
  );
}

function InverterStringRow({
  color,
  label,
  panels,
  watts,
}: {
  color: string;
  label: string;
  panels: string;
  watts: string;
}) {
  return (
    <div className="flex items-center justify-between pl-10 pr-[13px] py-2 h-[38px]">
      <div className="flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#998d7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>
        <span className="text-xs font-medium text-[var(--color-text)]">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#998d7d]">{panels}</span>
        <span className="text-xs font-medium text-[var(--color-text)]">{watts}</span>
      </div>
    </div>
  );
}

function RoofPlaneIcon() {
  return (
    <img src="/icons/design-mode-icons.svg" alt="" className="w-5 h-5 shrink-0" />
  );
}

function PanelIcon() {
  return (
    <img src="/icons/design-mode-icons-3.svg?v=2" alt="" className="w-5 h-5 shrink-0" />
  );
}

function InverterIcon() {
  return (
    <img src="/icons/design-mode-icons-6.svg" alt="" className="w-5 h-5 shrink-0" />
  );
}
