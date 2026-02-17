export const examples = {
  Default: `<MLAspectRatio ratio="16:9" className="bg-muted rounded-md">
  <img
    src="https://images.unsplash.com/photo-..."
    alt="Photo"
    className="h-full w-full rounded-md object-cover"
  />
</MLAspectRatio>`,

  Square: `<MLAspectRatio ratio="1:1" className="bg-muted rounded-md">
  <img
    src="https://images.unsplash.com/photo-..."
    alt="Photo"
    className="h-full w-full rounded-md object-cover"
  />
</MLAspectRatio>`,

  Portrait: `<MLAspectRatio ratio="3:4" className="bg-muted rounded-md">
  <img
    src="https://images.unsplash.com/photo-..."
    alt="Photo"
    className="h-full w-full rounded-md object-cover"
  />
</MLAspectRatio>`,

  Cinematic: `<MLAspectRatio ratio="21:9" className="bg-muted rounded-md">
  <img
    src="https://images.unsplash.com/photo-..."
    alt="Photo"
    className="h-full w-full rounded-md object-cover"
  />
</MLAspectRatio>`,

  GoldenRatio: `<MLAspectRatio ratio="1.618:1" className="bg-muted rounded-md">
  <img
    src="https://images.unsplash.com/photo-..."
    alt="Photo"
    className="h-full w-full rounded-md object-cover"
  />
</MLAspectRatio>`,

  AllRatios: `<div className="grid grid-cols-4 gap-4">
  {['1:1', '4:3', '16:9', '21:9'].map((ratio) => (
    <MLAspectRatio key={ratio} ratio={ratio} className="bg-muted rounded-md">
      <div className="flex items-center justify-center h-full">
        {ratio}
      </div>
    </MLAspectRatio>
  ))}
</div>`,

  WithPlaceholder: `<MLAspectRatio ratio="16:9" className="bg-muted rounded-md">
  <div className="flex items-center justify-center h-full w-full">
    <span className="text-muted-foreground">16:9 Placeholder</span>
  </div>
</MLAspectRatio>`,

  WithVideo: `<MLAspectRatio ratio="16:9" className="bg-black rounded-md">
  <iframe
    src="https://www.youtube.com/embed/..."
    title="Video"
    className="h-full w-full rounded-md"
    allowFullScreen
  />
</MLAspectRatio>`,
};
