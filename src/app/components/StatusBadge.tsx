const defaultBadgeColor = { bg: "#f5f5f4", border: "#a8a29e", text: "#57534e" };

export const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  "Proposal Created":        { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  "Credit Submitted":        { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6" },
  "Credit Approved":         { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
  "Contract Sent":           { bg: "#ffedd5", border: "#f97316", text: "#9a3412" },
  "Contract Signed":         { bg: "#ccfbf1", border: "#14b8a6", text: "#115e59" },
  "Site Survey Scheduled":   { bg: "#fce7f3", border: "#ec4899", text: "#9d174d" },
  "Final Design":            { bg: "#e0e7ff", border: "#6366f1", text: "#3730a3" },
  "Permit":                  { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
  "Install":                 { bg: "#cffafe", border: "#06b6d4", text: "#155e75" },
  "Inspection":              { bg: "#ffe4e6", border: "#f43f5e", text: "#9f1239" },
  "PTO":                     { bg: "#d1fae5", border: "#059669", text: "#064e3b" },
  "Project Complete":        { bg: "#ecfccb", border: "#84cc16", text: "#3f6212" },
};

export const leadSourceColors: Record<string, { bg: string; border: string; text: string }> = {
  "Sales":         { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  "Referral":      { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
  "Website":       { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6" },
  "Door-to-door":  { bg: "#ffedd5", border: "#f97316", text: "#9a3412" },
};

type ColorMap = Record<string, { bg: string; border: string; text: string }>;

export function ColorBadge({
  children,
  colorMap,
}: {
  children: React.ReactNode;
  colorMap: ColorMap;
}) {
  const colors = colorMap[String(children)] ?? defaultBadgeColor;
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[8px] px-[8px] py-[4px] font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip"
      style={{ fontSize: "12px", lineHeight: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, color: colors.text }}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return <ColorBadge colorMap={statusColors}>{children}</ColorBadge>;
}

export function LeadSourceBadge({ children }: { children: React.ReactNode }) {
  return <ColorBadge colorMap={leadSourceColors}>{children}</ColorBadge>;
}
