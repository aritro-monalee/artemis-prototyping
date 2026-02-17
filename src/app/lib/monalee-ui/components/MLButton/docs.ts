// Code examples for MLButton component documentation

export const examples = {
  Default: `<MLButton>Button</MLButton>`,

  Secondary: `<MLButton variant="secondary">Secondary</MLButton>`,

  Destructive: `<MLButton variant="destructive">Destructive</MLButton>`,

  Outline: `<MLButton variant="outline">Outline</MLButton>`,

  Ghost: `<MLButton variant="ghost">Ghost</MLButton>`,

  Link: `<MLButton variant="link">Link</MLButton>`,

  AllVariants: `<div className="flex flex-wrap gap-4 items-center">
  <MLButton variant="default">Default</MLButton>
  <MLButton variant="secondary">Secondary</MLButton>
  <MLButton variant="destructive">Destructive</MLButton>
  <MLButton variant="outline">Outline</MLButton>
  <MLButton variant="ghost">Ghost</MLButton>
  <MLButton variant="link">Link</MLButton>
</div>`,

  Sizes: `<div className="flex flex-wrap gap-4 items-center">
  <MLButton size="sm">Small</MLButton>
  <MLButton size="default">Default</MLButton>
  <MLButton size="lg">Large</MLButton>
  <MLButton size="icon">
    <Plus className="size-4" />
  </MLButton>
</div>`,

  IconButton: `<div className="flex flex-wrap gap-4 items-center">
  <MLButton size="icon" variant="default">
    <Plus className="size-4" />
  </MLButton>
  <MLButton size="icon" variant="secondary">
    <Settings className="size-4" />
  </MLButton>
  <MLButton size="icon" variant="outline">
    <Mail className="size-4" />
  </MLButton>
  <MLButton size="icon" variant="ghost">
    <Star className="size-4" />
  </MLButton>
</div>`,

  WithPrefix: `<MLButton prefix={<Download className="size-4" />}>
  Download
</MLButton>`,

  WithSuffix: `<MLButton suffix={<ArrowRight className="size-4" />}>
  Continue
</MLButton>`,

  WithPrefixAndSuffix: `<div className="flex flex-col gap-4">
  <MLButton prefix={<ChevronLeft className="size-4" />}>
    Back
  </MLButton>
  <MLButton suffix={<ChevronRight className="size-4" />}>
    Next
  </MLButton>
  <MLButton
    variant="outline"
    prefix={<Mail className="size-4" />}
    suffix={<ArrowRight className="size-4" />}
  >
    Send Email
  </MLButton>
</div>`,

  Loading: `<div className="flex flex-wrap gap-4 items-center">
  <MLButton loading>Loading...</MLButton>
  <MLButton variant="secondary" loading>Loading...</MLButton>
  <MLButton variant="destructive" loading>Loading...</MLButton>
  <MLButton variant="outline" loading>Loading...</MLButton>
</div>`,

  Disabled: `<div className="flex flex-wrap gap-4 items-center">
  <MLButton disabled>Default</MLButton>
  <MLButton variant="secondary" disabled>Secondary</MLButton>
  <MLButton variant="destructive" disabled>Destructive</MLButton>
  <MLButton variant="outline" disabled>Outline</MLButton>
  <MLButton variant="ghost" disabled>Ghost</MLButton>
</div>`,

  FullWidth: `<div className="w-80 flex flex-col gap-4">
  <MLButton fullwidth>Full Width Button</MLButton>
  <MLButton variant="outline" fullwidth>Full Width Outline</MLButton>
</div>`,

  AsChildWithLink: `<MLButton asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</MLButton>`,

  AsChildLinkVariants: `<div className="flex flex-col gap-4">
  <MLButton asChild variant="default">
    <Link href="/dashboard">Default Link Button</Link>
  </MLButton>
  <MLButton asChild variant="outline">
    <Link href="/settings">Outline Link Button</Link>
  </MLButton>
  <MLButton asChild variant="secondary">
    <Link href="/profile">Secondary Link Button</Link>
  </MLButton>
  <MLButton asChild variant="ghost">
    <Link href="/help">Ghost Link Button</Link>
  </MLButton>
</div>`,
};
