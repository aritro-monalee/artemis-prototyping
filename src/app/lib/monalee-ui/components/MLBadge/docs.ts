export const examples = {
  Default: `<MLBadge>Badge</MLBadge>`,

  Secondary: `<MLBadge variant="secondary">Secondary</MLBadge>`,

  Destructive: `<MLBadge variant="destructive">Destructive</MLBadge>`,

  Outline: `<MLBadge variant="outline">Outline</MLBadge>`,

  AllVariants: `<div className="flex flex-col gap-4 items-center">
  <MLBadge variant="default">Badge</MLBadge>
  <MLBadge variant="secondary">Secondary</MLBadge>
  <MLBadge variant="destructive">Destructive</MLBadge>
  <MLBadge variant="outline">Outline</MLBadge>
</div>`,

  WithIcon: `<div className="flex flex-col gap-4 items-center">
  <MLBadge variant="outline" icon={<Check className="size-3" />}>
    Badge
  </MLBadge>
  <MLBadge variant="destructive" icon={<CircleAlert className="size-3" />}>
    Alert
  </MLBadge>
</div>`,

  WithTrailingIcon: `<div className="flex flex-col gap-4 items-center">
  <MLBadge variant="default" trailingIcon={<ArrowRight className="size-3" />}>
    Link
  </MLBadge>
  <MLBadge variant="secondary" trailingIcon={<ArrowRight className="size-3" />}>
    Link
  </MLBadge>
</div>`,

  BadgeNumbers: `<div className="flex flex-col gap-4 items-center">
  <BadgeNumber count={8} />
  <BadgeNumber count={99} variant="destructive" />
  <BadgeNumber count={20} variant="outline" />
</div>`,

  BadgeNumberWithMax: `<div className="flex flex-col gap-4 items-center">
  <BadgeNumber count={5} />
  <BadgeNumber count={99} />
  <BadgeNumber count={150} max={99} />
</div>`,

  AsLink: `<MLBadge asChild variant="default">
  <a href="#" className="cursor-pointer hover:opacity-80">
    Link <ArrowRight className="size-3" />
  </a>
</MLBadge>`,
};
