import { cn } from "../lib/ui";

/**
 * Tag component
 * @param tag - The tag to display
 * @returns A tag component
 */
interface TagProps {
  type: "On Hold" | "Lost" | "Change Order";
  reason?: string;
}
const COLOR_STYLES: Record<
  "orange" | "red" | "emerald",
  {
    bg: string;
    border: string;
    title: string;
    reason: string;
  }
> = {
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-600",
    title: "text-orange-800",
    reason: "text-orange-800",
  },
  red: {
    bg: "bg-[#fbd9df]",
    border: "border-[#c43750]",
    title: "text-[#762130]",
    reason: "text-[#762130]",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-600",
    title: "text-emerald-800",
    reason: "text-emerald-800",
  },
};

export function Tag({ type, reason }: TagProps) {
  let tagColor: "orange" | "red" | "emerald";
  switch (type) {
    case "On Hold":
      tagColor = "orange";
      break;
    case "Lost":
      tagColor = "red";
      break;
    case "Change Order":
      tagColor = "emerald";
  }
  const styles = COLOR_STYLES[tagColor];
  if (!styles) {
    return null;
  }
  return (
    <div
      className={cn(
        "px-2 py-[3px] rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-1 overflow-hidden border",
        styles?.bg,
        styles?.border,
      )}
    >
      <div
        className={cn(
          "justify-start text-xs font-medium leading-none font-['Inter']",
          styles?.title
        )}
      >
        {type}
      </div>
      {reason && (
        <div
          className={cn(
            "justify-start text-xs font-medium leading-none font-['Inter'] opacity-60",
            styles?.reason
          )}
        >
          {reason}
        </div>
      )}
    </div>
  );
}