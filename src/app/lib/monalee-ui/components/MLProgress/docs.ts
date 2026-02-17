export const examples = {
  Default: `<MLProgress value={100} className="w-[400px]" />`,

  SeventyFivePercent: `<MLProgress value={75} className="w-[400px]" />`,

  FiftyPercent: `<MLProgress value={50} className="w-[400px]" />`,

  TwentyFivePercent: `<MLProgress value={25} className="w-[400px]" />`,

  ZeroPercent: `<MLProgress value={0} className="w-[400px]" />`,

  AllPercentages: `<div className="flex flex-col gap-16 w-[400px]">
  <MLProgress value={100} />
  <MLProgress value={75} />
  <MLProgress value={50} />
  <MLProgress value={25} />
  <MLProgress value={0} />
</div>`,

  SizeSmall: `<MLProgress value={60} size="sm" className="w-[400px]" />`,

  SizeMedium: `<MLProgress value={60} size="md" className="w-[400px]" />`,

  SizeLarge: `<MLProgress value={60} size="lg" className="w-[400px]" />`,

  AllSizes: `<div className="flex flex-col gap-4 w-[400px]">
  <div className="flex items-center gap-4">
    <span className="text-sm text-muted-foreground w-12">Small</span>
    <MLProgress value={60} size="sm" className="flex-1" />
  </div>
  <div className="flex items-center gap-4">
    <span className="text-sm text-muted-foreground w-12">Medium</span>
    <MLProgress value={60} size="md" className="flex-1" />
  </div>
  <div className="flex items-center gap-4">
    <span className="text-sm text-muted-foreground w-12">Large</span>
    <MLProgress value={60} size="lg" className="flex-1" />
  </div>
</div>`,

  VariantDefault: `<MLProgress value={60} variant="default" className="w-[400px]" />`,

  VariantSuccess: `<MLProgress value={60} variant="success" className="w-[400px]" />`,

  VariantWarning: `<MLProgress value={60} variant="warning" className="w-[400px]" />`,

  VariantDestructive: `<MLProgress value={60} variant="destructive" className="w-[400px]" />`,

  AllVariants: `<div className="flex flex-col gap-4 w-[400px]">
  <MLProgress value={60} variant="default" />
  <MLProgress value={60} variant="success" />
  <MLProgress value={60} variant="warning" />
  <MLProgress value={60} variant="destructive" />
</div>`,

  WithValue: `<MLProgress value={65} showValue className="w-[400px]" />`,

  Animated: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => prev >= 100 ? 0 : prev + 1);
  }, 50);
  return () => clearInterval(timer);
}, []);

<MLProgress value={progress} showValue className="w-[400px]" />`,

  LoadingStates: `const [progress, setProgress] = useState(0);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (isLoading && progress < 100) {
    const timer = setTimeout(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
    }, 500);
    return () => clearTimeout(timer);
  }
  if (progress >= 100) setIsLoading(false);
}, [isLoading, progress]);

<MLProgress value={progress} showValue className="w-[400px]" />`,

  MultipleProgressBars: `<div className="flex flex-col gap-6 w-[400px]">
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>Storage</span><span>75%</span>
    </div>
    <MLProgress value={75} />
  </div>
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>Bandwidth</span><span>45%</span>
    </div>
    <MLProgress value={45} variant="success" />
  </div>
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span>CPU Usage</span><span>92%</span>
    </div>
    <MLProgress value={92} variant="destructive" />
  </div>
</div>`,
};
