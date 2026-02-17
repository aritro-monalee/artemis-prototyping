export const examples = {
  Default: `<MLAvatar
  src="https://github.com/shadcn.png"
  alt="User"
  fallback="CN"
  size="lg"
/>`,

  WithFallback: `<MLAvatar fallback="JD" size="lg" />`,

  Square: `<MLAvatar
  src="https://github.com/shadcn.png"
  alt="User"
  fallback="CN"
  size="lg"
  shape="square"
/>`,

  Sizes: `<div className="flex items-end gap-4">
  <MLAvatar src="..." fallback="XS" size="xs" />
  <MLAvatar src="..." fallback="SM" size="sm" />
  <MLAvatar src="..." fallback="MD" size="md" />
  <MLAvatar src="..." fallback="LG" size="lg" />
  <MLAvatar src="..." fallback="XL" size="xl" />
  <MLAvatar src="..." fallback="2X" size="2xl" />
</div>`,

  FallbackSizes: `<div className="flex items-end gap-4">
  <MLAvatar fallback="XS" size="xs" />
  <MLAvatar fallback="SM" size="sm" />
  <MLAvatar fallback="MD" size="md" />
  <MLAvatar fallback="LG" size="lg" />
  <MLAvatar fallback="XL" size="xl" />
  <MLAvatar fallback="2X" size="2xl" />
</div>`,

  Group: `<MLAvatarGroup size="lg">
  <MLAvatar src="..." fallback="CN" />
  <MLAvatar src="..." fallback="VC" />
  <MLAvatar src="..." fallback="GH" />
</MLAvatarGroup>`,

  GroupWithMax: `<MLAvatarGroup size="lg" max={3}>
  <MLAvatar src="..." fallback="CN" />
  <MLAvatar src="..." fallback="VC" />
  <MLAvatar src="..." fallback="GH" />
  <MLAvatar fallback="JD" />
  <MLAvatar fallback="MK" />
</MLAvatarGroup>`,

  GroupSizes: `<div className="flex flex-col gap-4">
  <MLAvatarGroup size="sm">
    <MLAvatar fallback="CN" />
    <MLAvatar fallback="VC" />
    <MLAvatar fallback="GH" />
  </MLAvatarGroup>
  <MLAvatarGroup size="lg">
    <MLAvatar fallback="CN" />
    <MLAvatar fallback="VC" />
    <MLAvatar fallback="GH" />
  </MLAvatarGroup>
</div>`,

  MixedWithFallback: `<MLAvatarGroup size="xl" max={4}>
  <MLAvatar src="..." fallback="CN" />
  <MLAvatar src="..." fallback="VC" />
  <MLAvatar fallback="MW" />
  <MLAvatar fallback="SD" />
  <MLAvatar fallback="AB" />
</MLAvatarGroup>`,
};
