import type { SVGProps } from "react";

export function SolarBatteryIcon({
  className,
  strokeWidth = 2,
  stroke = "currentColor",
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M10.5 15C8.29086 15 7 13.2091 7 11C7 8.79086 8.29086 7 10.5 7M10.5 1V3M10.5 19V21M3.93018 3.92993L5.34018 5.33993M1 11H3M5.34018 16.6599L3.93018 18.0699"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 7L13 11H16L14 15M14 21H19C20.1046 21 21 20.1046 21 19V3C21 1.89543 20.1046 1 19 1H14"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
