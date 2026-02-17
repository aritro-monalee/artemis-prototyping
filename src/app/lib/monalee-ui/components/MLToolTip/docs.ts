export const examples = {
  Default: `<MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="top" />`,

  Top: `<MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="top">
  <MLButton variant="outline">Top</MLButton>
</MLToolTip>`,

  Right: `<MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="right">
  <MLButton variant="outline">Right</MLButton>
</MLToolTip>`,

  Bottom: `<MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="bottom">
  <MLButton variant="outline">Bottom</MLButton>
</MLToolTip>`,

  Left: `<MLToolTip tooltipContent="You can add tooltips using absolute positioning" side="left">
  <MLButton variant="outline">Left</MLButton>
</MLToolTip>`,

  LongContent: `<MLToolTip
  tooltipContent="You can add tooltips using absolute positioning or Figma's hover interactions, as shown below."
  side="top"
>
  <MLButton variant="outline">Hover for long tooltip</MLButton>
</MLToolTip>`,

  AllPositions: `<div className="flex flex-col items-center gap-20">
  <MLToolTip tooltipContent="Tooltip content" side="top">
    <MLButton variant="outline">Top</MLButton>
  </MLToolTip>

  <MLToolTip tooltipContent="Tooltip content" side="right">
    <MLButton variant="outline">Right</MLButton>
  </MLToolTip>

  <MLToolTip tooltipContent="Tooltip content" side="bottom">
    <MLButton variant="outline">Bottom</MLButton>
  </MLToolTip>

  <MLToolTip tooltipContent="Tooltip content" side="left">
    <MLButton variant="outline">Left</MLButton>
  </MLToolTip>
</div>`,
};
