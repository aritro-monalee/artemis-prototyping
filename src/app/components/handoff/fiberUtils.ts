export function getReactFiber(el: HTMLElement): any | null {
  const key = Object.keys(el).find((k) => k.startsWith("__reactFiber$"));
  return key ? (el as any)[key] : null;
}

export function getOwnerComponent(
  fiber: any
): { name: string; fiber: any } | null {
  let current = fiber;
  while (current) {
    if (
      typeof current.type === "function" &&
      /^[A-Z]/.test(current.type.name || "")
    ) {
      return { name: current.type.name, fiber: current };
    }
    current = current.return;
  }
  return null;
}

const FRAMEWORK_PATTERN =
  /Boundary|Fallback|Error|Handler|Segment|Root$|Overlay$|^Dev|^App(Dev|Router)|^Hot|^Router$|^Head$|^Pathname|^Providers$|^HandoffProvider$|^ProjectStoreProvider$|^StoreProvider$/;

export function getComponentBreadcrumb(fiber: any): string[] {
  const raw: string[] = [];
  let current = fiber;
  while (current) {
    if (
      typeof current.type === "function" &&
      /^[A-Z]/.test(current.type.name || "")
    ) {
      raw.unshift(current.type.name);
    }
    current = current.return;
  }

  // Find first non-framework component and slice from there
  const startIdx = raw.findIndex((name) => !FRAMEWORK_PATTERN.test(name));
  return startIdx === -1 ? [] : raw.slice(startIdx);
}

interface StyleGroup {
  label: string;
  properties: { key: string; value: string }[];
}

const LAYOUT_KEYS = [
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "gap",
  "overflow",
] as const;

const TYPOGRAPHY_KEYS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "color",
  "textAlign",
  "textDecoration",
  "textTransform",
] as const;

const VISUAL_KEYS = [
  "backgroundColor",
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderRadius",
  "boxShadow",
  "opacity",
  "cursor",
  "zIndex",
] as const;

function collectProps(
  computed: CSSStyleDeclaration,
  keys: readonly string[]
): { key: string; value: string }[] {
  const results: { key: string; value: string }[] = [];
  for (const k of keys) {
    const val = computed.getPropertyValue(
      k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    );
    if (val && val !== "none" && val !== "normal" && val !== "auto" && val !== "0px") {
      results.push({ key: k, value: val });
    }
  }
  return results;
}

export function getRelevantStyles(element: HTMLElement): StyleGroup[] {
  const computed = getComputedStyle(element);
  const groups: StyleGroup[] = [];

  const layout = collectProps(computed, LAYOUT_KEYS);
  if (layout.length) groups.push({ label: "Layout", properties: layout });

  const typo = collectProps(computed, TYPOGRAPHY_KEYS);
  if (typo.length) groups.push({ label: "Typography", properties: typo });

  const visual = collectProps(computed, VISUAL_KEYS);
  if (visual.length) groups.push({ label: "Visual", properties: visual });

  return groups;
}
