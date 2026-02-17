export const examples = {
  Default: `<MLLoadingPlaceholder variant="default" />`,

  Card: `<div className="w-[334px]">
  <MLLoadingPlaceholder variant="card" />
</div>`,

  Text: `<MLLoadingPlaceholder variant="text" />`,

  CustomSize: `<MLLoadingPlaceholder variant="custom" width={300} height={150} />`,

  InCardContext: `<div className="bg-card border border-border rounded-xl shadow-sm p-6 w-[370px]">
  <MLLoadingPlaceholder variant="card" />
</div>`,

  AllVariants: `<div className="flex flex-col gap-16 items-center p-8">
  <MLLoadingPlaceholder variant="default" />

  <div className="bg-card border border-border rounded-xl shadow-sm p-6 w-[370px]">
    <MLLoadingPlaceholder variant="card" />
  </div>

  <MLLoadingPlaceholder variant="text" />
</div>`,

  Composition: `<div className="flex flex-col gap-4 w-[400px]">
  <div className="flex items-center gap-4">
    <MLSkeletonElement className="size-12 rounded-full" />
    <div className="flex-1 flex flex-col gap-2">
      <MLSkeletonElement className="h-4 w-3/4" />
      <MLSkeletonElement className="h-3 w-1/2" />
    </div>
  </div>
  <MLSkeletonElement className="h-[200px] w-full rounded-lg" />
  <div className="flex gap-2">
    <MLSkeletonElement className="h-8 w-20 rounded-md" />
    <MLSkeletonElement className="h-8 w-20 rounded-md" />
  </div>
</div>`,

  SkeletonAlias: `<MLSkeleton variant="default" />`,
};
