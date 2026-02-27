import type { SVGProps } from "react";

export function RoofingIcon({
  className,
  strokeWidth = 1.76,
  stroke = "currentColor",
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.18182 15.218V11.2968L9.72727 6.30608L16.2727 11.2968V15.218M7.54545 17.0004V13.4356H11.9091V17.0004M1 9.5L9.72727 2.5L19 10"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
