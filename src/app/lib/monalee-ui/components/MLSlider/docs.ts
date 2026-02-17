export const examples = {
  Default: `<div className="w-[400px]">
  <MLSlider defaultValue={[50]} max={100} />
</div>`,

  Range: `<div className="w-[400px]">
  <MLSlider defaultValue={[25, 75]} max={100} />
</div>`,

  Vertical: `<div className="h-[200px]">
  <MLSlider defaultValue={[50]} max={100} orientation="vertical" />
</div>`,

  VerticalRange: `<div className="h-[200px]">
  <MLSlider defaultValue={[25, 75]} max={100} orientation="vertical" />
</div>`,

  WithLabels: `<div className="w-[400px]">
  <MLSlider defaultValue={[50]} max={100} showLabels />
</div>`,

  CustomStep: `<div className="w-[400px]">
  <MLSlider defaultValue={[50]} max={100} step={10} />
</div>`,

  Disabled: `<div className="w-[400px]">
  <MLSlider defaultValue={[50]} max={100} disabled />
</div>`,

  AllVariants: `<div className="flex flex-col gap-16 items-center p-8">
  <div className="w-[400px]">
    <p className="text-sm text-muted-foreground mb-2">Single Value</p>
    <MLSlider defaultValue={[60]} max={100} />
  </div>

  <div className="w-[400px]">
    <p className="text-sm text-muted-foreground mb-2">Range</p>
    <MLSlider defaultValue={[25, 75]} max={100} />
  </div>

  <div className="flex gap-16 items-start">
    <div className="h-[200px] flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-2">Vertical</p>
      <MLSlider orientation="vertical" defaultValue={[50]} max={100} />
    </div>

    <div className="h-[200px] flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-2">Vertical Range</p>
      <MLSlider orientation="vertical" defaultValue={[25, 75]} max={100} />
    </div>
  </div>
</div>`,

  Controlled: `const [value, setValue] = useState([50]);

<div className="w-[400px] flex flex-col gap-4">
  <MLSlider value={value} onValueChange={setValue} max={100} />
  <p className="text-sm text-muted-foreground">
    Value: <span className="font-mono">{value[0]}</span>
  </p>
</div>`,

  PriceRange: `const [value, setValue] = useState([100, 500]);

<div className="w-[400px] flex flex-col gap-4">
  <label className="text-sm font-medium">Price Range</label>
  <MLSlider value={value} onValueChange={setValue} min={0} max={1000} step={10} />
  <div className="flex justify-between text-sm text-muted-foreground">
    <span>\${value[0]}</span>
    <span>\${value[1]}</span>
  </div>
</div>`,

  VolumeControl: `const [volume, setVolume] = useState([75]);

<div className="flex items-center gap-4">
  <span className="text-sm">🔈</span>
  <div className="w-[200px]">
    <MLSlider value={volume} onValueChange={setVolume} max={100} />
  </div>
  <span className="text-sm">🔊</span>
  <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
</div>`,
};
