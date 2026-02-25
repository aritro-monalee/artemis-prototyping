"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SquarePen,
  Plus,
  MoreVertical,
  Minus,
  ChevronDown,
  CircleHelp,
  Upload,
  Eye,
  Download,
  Trash2,
  File,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Gauge,
  UtilityPole,
  BadgeCent,
  Percent,
  Reply,
} from "lucide-react";
import type { ProjectDetailData, DesignComment } from "@/app/data/projects";
import { predefinedLabels } from "@/app/data/projects";
import { useProjectStore } from "@/app/store/ProjectStore";

function CommentBall({ pin }: { pin: DesignComment }) {
  const [hovered, setHovered] = useState(false);
  const mention = pin.textParts.find((p) => p.mention)?.text ?? "";
  const plainText = pin.textParts.map((p) => p.text).join("");
  const replies = pin.thread.length;

  return (
    <div
      className="absolute z-10 cursor-pointer"
      style={{ top: pin.top, left: pin.left }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative" style={{ transform: "translateY(-100%)" }}>
        <div className="bg-white flex items-start overflow-hidden p-1 w-8 h-8 rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)]">
          <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
        </div>

        <div
          className="absolute bottom-0 left-0 bg-white flex gap-2.5 items-start overflow-hidden p-2 w-[220px] rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)] transition-all duration-150 ease-out"
          style={{
            transformOrigin: "bottom left",
            transform: hovered ? "scale(1)" : "scale(0)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <div className="w-6 h-6 rounded-full bg-[#d4c9b8] shrink-0" />
          <div className="flex-1 flex flex-col gap-1 items-start p-1 min-w-0">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-xs font-medium text-[#554e46] whitespace-nowrap">{pin.name}</span>
              <span className="text-[10px] text-[#ac9b85] whitespace-nowrap">{pin.time}</span>
            </div>
            <p className="text-xs leading-4 w-full">
              {mention && <span className="font-medium text-[#6e04bd]">{mention}</span>}
              {mention && <span className="text-[#7b6f60]"> </span>}
              <span className="text-[#7b6f60]">{plainText}</span>
            </p>
            {replies > 0 && (
              <div className="flex items-center gap-1 h-5 py-0.5">
                <Reply className="w-4 h-4 text-[#6e04bd]" />
                <span className="text-xs text-[#6e04bd] leading-4 whitespace-nowrap">{replies} {replies === 1 ? "reply" : "replies"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailMainProps {
  project: ProjectDetailData;
  activeTab?: string;
  onEditDesign?: () => void;
}

export function ProjectDetailMain({ project, activeTab, onEditDesign }: ProjectDetailMainProps) {
  const { getPanelCount, setPanelCount: setStorePanelCount, getDesignComments, getPlacedLabels } = useProjectStore();
  const designComments = getDesignComments(project.id);
  const placedLabels = getPlacedLabels(project.id);
  const panelCount = getPanelCount(project.id);
  const setPanelCount = (updater: number | ((prev: number) => number)) => {
    const next = typeof updater === "function" ? updater(panelCount) : updater;
    setStorePanelCount(project.id, next);
  };

  return (
    <div className="flex-1 flex flex-col isolate items-center min-w-0 min-h-0 overflow-y-auto">
      {/* Map area */}
      <div className="flex flex-col gap-0 items-center p-4 shrink-0 w-full max-w-[1200px] mx-auto z-[2]">
        <div className="flex items-start justify-center w-full">
          <div className="flex-1 flex items-center overflow-hidden rounded-lg border border-[#d7cfc5] bg-[#fefbf7] w-full max-w-full">
            <div className="relative w-full aspect-[16/10] max-h-[80vh] bg-[rgba(0,0,0,0.88)] overflow-hidden">
              <img src="/home image.png" alt="Project aerial view" className="absolute inset-0 w-full h-full object-contain" />

              {/* Comment group — hidden when Notes tab active */}
              {activeTab !== "notes" && (
                <div className="absolute left-4 top-4 flex items-center z-10 transition-opacity duration-200">
                  <div className="bg-white flex h-8 items-center overflow-hidden pl-1 pr-1.5 py-1 rounded-bl-[2px] rounded-br-2xl rounded-tl-2xl rounded-tr-2xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_0_20px_1px_rgba(0,0,0,0.15)]">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-[3px] border-white bg-[#d7cfc5] -mr-0.5"
                        style={{ zIndex: 4 - i }}
                      />
                    ))}
                    <div className="flex items-center gap-[2px] pl-1.5 pr-1 text-[10px] font-medium text-[#ac9b85] leading-none z-[1]">
                      <span>+{designComments.length}</span>
                      <span>Comments</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Comment balls — shown when Notes tab active */}
              {activeTab === "notes" && (
                <>
                  {designComments.map((pin) => (
                    <CommentBall key={pin.id} pin={pin} />
                  ))}
                </>
              )}

              {/* Placed labels from edit-design — shown when Notes tab active */}
              {activeTab === "notes" && placedLabels.map((pl, i) => {
                const label = predefinedLabels.find((l) => l.id === pl.labelId);
                if (!label) return null;
                return (
                  <div
                    key={i}
                    className="absolute z-10 pointer-events-none"
                    style={{ top: `${pl.top}%`, left: `${pl.left}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className="flex items-center gap-1 p-1 rounded-[6px] border-[0.5px] border-[rgba(0,0,0,0.16)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                      style={{ backgroundColor: label.color }}
                    >
                      <span className="text-[10px] font-semibold text-white whitespace-nowrap leading-none">
                        {label.name}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Design buttons */}
              <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
                <button className="h-9 flex items-center gap-2 bg-white rounded-md border border-[#d7cfc5] px-3 shadow-xs text-sm text-[#554e46]">
                  <CircleHelp className="w-4 h-4" />
                  <span className="font-medium">Get Design Help</span>
                </button>
                <button
                  className="h-9 flex items-center gap-2 bg-white rounded-md border border-[#d7cfc5] px-3 shadow-xs text-sm text-[#554e46] cursor-pointer hover:bg-cream-50 transition-colors"
                  onClick={onEditDesign}
                >
                  <SquarePen className="w-4 h-4" />
                  <span className="font-medium">Edit Design</span>
                </button>
              </div>

              {/* Panels counter toolbar */}
              <div
                className="absolute right-4 bottom-4 flex items-center gap-5 overflow-hidden p-3 rounded-lg border border-[rgba(0,0,0,0.1)] shadow-sm z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #fefbf7, #fefbf7), linear-gradient(90deg, white, white)",
                }}
              >
                <div className="flex flex-col gap-1 text-[#7b6f60]">
                  <p className="text-sm font-medium leading-5">Panels</p>
                  <p className="text-xs leading-4">
                    Estimated Production {project.estimatedProduction || "5,558kWh"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPanelCount((c) => Math.max(0, c - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-md border border-[#d7cfc5] bg-transparent shadow-xs"
                  >
                    <Minus className="w-4 h-4 text-[#554e46]" />
                  </button>
                  <span className="w-7 text-center text-sm text-[#554e46]">{panelCount}</span>
                  <button
                    onClick={() => setPanelCount((c) => c + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-md border border-[#d7cfc5] bg-transparent shadow-xs"
                  >
                    <Plus className="w-4 h-4 text-[#554e46]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below-map sections — constrained to max 800px */}
      <div className="flex flex-col gap-12 items-start w-full max-w-[1200px] px-4 pb-12 z-[1]">
        {/* Equipment */}
        <EquipmentSection />

        {/* Adders & Discounts */}
        <AddersSection />

        {/* Utility Company */}
        <UtilityCompanySection />

        {/* Payment Options */}
        <PaymentOptionsSection />

        {/* Upload Documents */}
        <UploadDocumentsSection />

        {/* Contract & Legal */}
        <ContractLegalSection />

      </div>
    </div>
  );
}

/* ─── Equipment ─── */
function EquipmentSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex items-center justify-between h-9 w-full">
        <h2 className="text-lg font-bold text-[#554e46] leading-7">Equipment</h2>
        <button className="h-9 flex items-center gap-2 px-4 py-2 rounded-md border border-[#d7cfc5] bg-[#fefbf7] shadow-xs text-sm font-medium text-[#554e46]">
          Add Equipment
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-[#f4f1ed] flex flex-col gap-6 items-start p-6 rounded-2xl w-full overflow-hidden">
        <div className="flex gap-6 w-full overflow-x-auto pb-2">
          <EquipmentCard title="Solar Panels" model="Longi 400w" pricePerWatt="$0.15" />
          <EquipmentCard title="Inverters" model="SolarEdge Inverter" pricePerWatt="$0.15" />
          <EquipmentCard title="Batteries" model="Tesla Powerwall 3" pricePerWatt="$0.15" />
        </div>
        <div className="w-full min-h-[66px] flex flex-col items-center justify-center rounded-xl border border-dashed border-[#7267bf] bg-[rgba(75,51,241,0.05)] px-6 py-6">
          <button className="flex items-center gap-2 text-sm font-medium text-[#7267bf]">
            Add Equipment
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Adders & Discounts ─── */
function AddersSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex items-center justify-between h-9 w-full">
        <h2 className="text-lg font-bold text-[#554e46] leading-7">Adders &amp; Discounts</h2>
        <button className="h-9 flex items-center gap-2 px-4 py-2 rounded-md border border-[#d7cfc5] bg-[#fefbf7] shadow-xs text-sm font-medium text-[#554e46]">
          Add Adders
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-[#f4f1ed] grid grid-cols-3 gap-6 p-6 rounded-2xl w-full">
        {/* Hardware card */}
        <div className="bg-white border border-[#d7cfc5] rounded-lg flex items-center gap-2.5 p-4 min-w-0 col-span-1">
          <div className="flex-1 flex flex-col gap-0 min-w-0">
            <p className="text-sm font-medium text-[#554e46] leading-5">Standard Warranty</p>
            <p className="text-xs text-[#7b6f60] leading-4">$0.00</p>
          </div>
          <button className="w-9 h-9 flex items-center justify-center shrink-0">
            <MoreVertical className="w-4 h-4 text-[#554e46]" />
          </button>
        </div>
        {/* Empty slot */}
        <div className="col-span-2 min-h-[66px] flex flex-col items-center justify-center rounded-xl border border-dashed border-[#7267bf] bg-[rgba(75,51,241,0.05)] px-6 py-6">
          <button className="flex items-center gap-2 text-sm font-medium text-[#7267bf]">
            Add Adders
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Utility Company ─── */
function UtilityCompanySection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <h2 className="text-lg font-bold text-[#554e46] leading-7">Utility Company</h2>
      <div className="bg-[#f4f1ed] flex flex-col gap-6 items-center px-4 py-12 rounded-2xl w-full">
        <div className="flex gap-8 items-start w-full">
          <DisabledInput label="Average Electric Bill" icon={<DollarSign className="w-4 h-4" />} value="225" />
          <DisabledInput label="Est. Annual Consumption" icon={<Gauge className="w-4 h-4" />} value="25905" />
        </div>
        <div className="flex gap-8 items-start w-full">
          <DisabledInput label="Utility Company" icon={<UtilityPole className="w-4 h-4" />} value="Egestas Parturient Electric" />
          <DisabledInput label="Utility Rate" icon={<BadgeCent className="w-4 h-4" />} value="10" />
        </div>
      </div>
    </div>
  );
}

/* ─── Payment Options ─── */
function PaymentOptionsSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <h2 className="text-lg font-bold text-[#554e46] leading-7">Payment Options</h2>
      <div className="bg-[#f4f1ed] flex flex-col items-center justify-between overflow-hidden px-4 py-12 rounded-2xl w-full">
        <div className="flex gap-6 items-center w-full overflow-x-auto pb-2">
          {/* Left arrow */}
          <button className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white border border-[#e3e0dd] shadow-xs">
            <ArrowLeft className="w-4 h-4 text-[#554e46]" />
          </button>

          {/* Finance Card */}
          <div className="border border-[#d7cfc5] rounded-xl shadow-sm bg-white overflow-hidden flex flex-col justify-between py-6 min-w-[420px] w-[420px] shrink-0">
            <div className="flex flex-col gap-8 px-6">
              {/* Loan status row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs text-sm text-[#554e46]">
                    <span>Finance</span>
                    <span className="mx-1 w-px h-[19px] bg-[#d7cfc5]" />
                    <span className="text-xs font-semibold text-[#554e46]">goodleap</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f1ed] text-xs font-semibold text-[#554e46]">
                    Customizing Quote
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#b9b3df]" />
              </div>

              {/* Payments */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#554e46]">Payments</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#7b6f60]">Monthly Payments 1 - 16</span>
                    <span className="text-xl font-semibold text-[#554e46]">$462</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#7b6f60]">Monthly Payments 17-298</span>
                    <span className="text-base text-[#554e46]">$528</span>
                  </div>
                </div>
                <button className="text-xs font-medium text-[#7267bf] self-start">
                  Expand Details
                </button>
              </div>

              {/* Loan config */}
              <div className="bg-[#f4f1ed] rounded-md p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-[#554e46]">Duration | Rate | Loan Product</p>
                  <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs text-sm text-[#554e46]">
                    <span>25 Years</span>
                    <span className="flex-1 text-xs text-[#554e46] overflow-hidden text-ellipsis whitespace-nowrap">
                      3.99% | 37.49 DF | Min: $15k Max: $135k | Standard
                    </span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#554e46]">Voluntary Payment by Payment 16</p>
                  <div className="flex items-center border border-[#d7cfc5] rounded-md overflow-hidden">
                    <div className="flex items-center gap-1 h-9 bg-white border-r border-[#d7cfc5] px-3 shadow-xs">
                      <span className="text-sm text-[#554e46]">20</span>
                      <Percent className="w-4 h-4 text-[#554e46]" />
                    </div>
                    <div className="flex items-center h-9 px-3">
                      <span className="text-sm text-[#554e46]">$22,893</span>
                    </div>
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="w-9 h-5 rounded-full bg-[#7267bf] flex items-center justify-end px-0.5 shrink-0 mt-0.5">
                    <div className="w-4 h-4 rounded-full bg-[#fefbf7] shadow-lg" />
                  </div>
                  <span className="text-sm font-medium text-[#554e46]">Enable autopay interest discount</span>
                </label>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-4">
                <button className="flex-1 h-9 rounded-md bg-[#f4f1ed] text-sm font-medium text-[#554e46] shadow-xs">
                  Send Credit Application
                </button>
                <button className="flex-1 h-9 rounded-md bg-[#7267bf] text-sm font-medium text-white shadow-xs">
                  Start Credit Application
                </button>
              </div>
            </div>
          </div>

          {/* Cash Card */}
          <div className="border border-[#d7cfc5] rounded-xl shadow-sm bg-white overflow-hidden flex flex-col justify-between py-6 min-w-[420px] w-[420px] shrink-0">
            <div className="flex flex-col gap-8 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs text-sm text-[#554e46]">
                    <span>Cash</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#e2deff] text-xs font-semibold text-[#2a226a] shadow-sm">
                    Ready to Close
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-[#b9b3df]" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#554e46]">Payments</p>
                <div className="flex flex-col gap-2">
                  <PaymentRow label="Net Payment" value="$52,901" bold />
                  <PaymentRow label="Gross cost" value="$71,415" />
                  <PaymentRow label="Federal & State Incentives" value="$22,525" />
                </div>
                <button className="text-xs font-medium text-[#7267bf] self-start">
                  Expand Details
                </button>
              </div>

              <div className="bg-[#f4f1ed] rounded-md p-4 flex flex-col gap-2">
                <PaymentRow label="Base Price" value="$1.90 per Watt" />
                <PaymentRow label="Price" value="$5.82 per Watt" />
                <PaymentRow label="Surcharge" value="$4.72 per Watt" />
                <PaymentRow label="Incentive Payment" value="$22,525" />
                <PaymentRow label="First Year Savings" value="$572" />
                <PaymentRow label="Lifetime Savings" value="$10,618" />
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white border border-[#e3e0dd] shadow-xs">
            <ArrowRight className="w-4 h-4 text-[#554e46]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Upload Documents ─── */
function UploadDocumentsSection() {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex items-center justify-between h-9 w-full">
        <h2 className="text-lg font-bold text-[#554e46] leading-7">Upload Documents</h2>
        <button className="h-9 flex items-center gap-2 px-4 py-2 rounded-md bg-[#f4f1ed] shadow-xs text-sm font-medium text-[#554e46]">
          Upload File
          <Upload className="w-4 h-4" />
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#d7cfc5]">
            <th className="text-left font-medium text-[#7b6f60] h-10 px-2">File Name</th>
            <th className="text-left font-medium text-[#7b6f60] h-10 px-2">History</th>
            <th className="h-10 px-2" />
          </tr>
        </thead>
        <tbody>
          <DocumentRow
            fileName="test-file.jpg"
            history="Uploaded by Alex Patin on 06/10/2025 at 2:12 pm"
          />
          <DocumentRow
            fileName="another-test-file.jpg"
            history="Uploaded by Alex Patin on 06/10/2025 at 2:13 pm"
          />
        </tbody>
      </table>
    </div>
  );
}

/* ─── Contract & Legal ─── */
function ContractLegalSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex items-center gap-3 h-9 w-full">
        <h2 className="text-lg font-bold text-[#554e46] leading-7">Contract &amp; Legal</h2>
        <div className="flex-1 flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f4f1ed] text-xs font-semibold text-[#554e46]">
            Contract Sent
          </span>
          <button className="h-9 flex items-center gap-2 px-4 py-2 rounded-md bg-[#f4f1ed] shadow-xs text-sm font-medium text-[#554e46]">
            Resend Contract
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <DescriptionRow label="Email" value="alex.patin@monalee.co" />
        <DescriptionRow label="Preferred Language" value="English" />
        <div className="border-t border-[#d7cfc5] flex gap-6 items-start py-6">
          <p className="flex-1 text-sm font-semibold text-[#554e46]">Documents</p>
          <div className="flex-1 flex flex-col gap-2">
            <div className="bg-white border border-[#d7cfc5] rounded-xl shadow-sm p-6 flex items-center gap-3">
              <File className="w-4 h-4 text-[#554e46] shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#554e46]">Customer Contract</span>
                <button className="h-9 flex items-center gap-2 px-4 py-2 rounded-md bg-[#f4f1ed] shadow-xs text-sm font-medium text-[#554e46]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared small components ─── */

function EquipmentCard({
  title,
  model,
  pricePerWatt,
}: {
  title: string;
  model: string;
  pricePerWatt: string;
}) {
  return (
    <div className="bg-white border border-[#d7cfc5] rounded-2xl p-6 min-w-[349px] w-[395px] shrink-0 overflow-hidden flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-[#554e46] leading-none">{title}</span>
        <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#f4f1ed] transition-colors">
          <MoreVertical className="w-4 h-4 text-[#554e46]" />
        </button>
      </div>
      <div
        className="h-[236px] rounded-[10px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(75,51,241,0.05) 0%, rgba(75,51,241,0.05) 100%)",
        }}
      />
      <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs">
        <div className="flex-1 flex items-center gap-0.5 min-w-0">
          <span className="text-sm text-[#554e46] overflow-hidden text-ellipsis whitespace-nowrap">{model}</span>
          <span className="text-xs text-[#554e46] opacity-50 pt-0.5 whitespace-nowrap">(+ {pricePerWatt} Per Watt)</span>
        </div>
        <span className="text-[10.5px] font-medium text-[#7267bf] bg-[rgba(75,51,241,0.05)] px-[5.25px] h-5 flex items-center justify-center rounded-md shrink-0">
          Recommended
        </span>
        <ChevronDown className="w-4 h-4 text-[#554e46] shrink-0" />
      </div>
      <div className="flex items-center gap-3.5">
        <span className="flex-1 text-sm font-medium text-[#554e46]">Quantity</span>
        <div className="flex items-center gap-2 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs text-sm text-[#554e46]">
          <span>-</span>
          <span className="opacity-20">|</span>
          <span>1</span>
          <span className="opacity-20">|</span>
          <span>+</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {["405 W", "4.45 kW", "6,730 kWh"].map((badge, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center px-2 py-[2px] rounded-md border border-[#d7cfc5] bg-white text-xs font-semibold text-[#554e46] leading-4"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

function DisabledInput({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2 relative">
      <p className="text-sm font-medium text-[#554e46] leading-none">{label}</p>
      <div className="flex items-center gap-1 h-9 bg-white border border-[#e3e0dd] rounded-md px-3 shadow-xs opacity-50">
        <span className="text-[#7b6f60]">{icon}</span>
        <span className="flex-1 text-sm text-[#7b6f60] overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
        </span>
      </div>
      <button className="absolute right-0 top-0 text-sm text-[#7b6f60] underline">Edit</button>
    </div>
  );
}

function PaymentRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#7b6f60]">{label}</span>
      <span className={`text-sm ${bold ? "text-xl font-semibold" : ""} text-[#554e46]`}>{value}</span>
    </div>
  );
}

function DocumentRow({ fileName, history }: { fileName: string; history: string }) {
  return (
    <tr className="border-b border-[#d7cfc5]">
      <td className="h-[52px] px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-[#f4f1ed] shrink-0" />
          <span className="font-medium text-[#554e46] overflow-hidden text-ellipsis whitespace-nowrap">
            {fileName}
          </span>
        </div>
      </td>
      <td className="h-[52px] px-2">
        <span className="text-[#554e46] overflow-hidden text-ellipsis whitespace-nowrap">{history}</span>
      </td>
      <td className="h-[52px] px-2">
        <div className="flex items-center gap-1">
          <IconToggleButton><Eye className="w-4 h-4" /></IconToggleButton>
          <IconToggleButton><Download className="w-4 h-4" /></IconToggleButton>
          <IconToggleButton><Trash2 className="w-4 h-4" /></IconToggleButton>
        </div>
      </td>
    </tr>
  );
}

function IconToggleButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-9 h-9 flex items-center justify-center rounded-md border border-[#e3e0dd] bg-[#fefbf7] shadow-xs text-[#554e46]">
      {children}
    </button>
  );
}

function DescriptionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#d7cfc5] flex gap-6 items-center py-6 text-sm">
      <p className="flex-1 font-semibold text-[#554e46]">{label}</p>
      <p className="flex-1 text-[#7b6f60]">{value}</p>
    </div>
  );
}
