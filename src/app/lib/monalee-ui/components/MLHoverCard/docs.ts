export const examples = {
  Default: `<MLHoverCard>
  <MLHoverCardTrigger asChild>
    <a href="#" className="text-primary font-medium text-sm hover:underline">
      @nextjs
    </a>
  </MLHoverCardTrigger>
  <MLHoverCardContent>
    <div className="flex gap-4">
      <MLAvatar className="size-12">
        <MLAvatarImage src="https://github.com/vercel.png" alt="@nextjs" />
        <MLAvatarFallback>NX</MLAvatarFallback>
      </MLAvatar>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">The React Framework - created by @vercel.</p>
        <div className="flex items-center gap-2 pt-2">
          <Calendar className="size-4 opacity-70" />
          <span className="text-xs text-muted-foreground">Joined December 2024</span>
        </div>
      </div>
    </div>
  </MLHoverCardContent>
</MLHoverCard>`,

  WithButton: `<MLHoverCard>
  <MLHoverCardTrigger asChild>
    <button className="text-primary font-medium text-sm hover:underline">
      Hover over me
    </button>
  </MLHoverCardTrigger>
  <MLHoverCardContent>
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold">Tooltip Content</h4>
      <p className="text-sm text-muted-foreground">
        This is a more detailed preview that appears on hover.
      </p>
    </div>
  </MLHoverCardContent>
</MLHoverCard>`,

  UserProfile: `<MLHoverCard>
  <MLHoverCardTrigger asChild>
    <a href="#" className="text-primary font-medium text-sm hover:underline">
      @shadcn
    </a>
  </MLHoverCardTrigger>
  <MLHoverCardContent className="w-80">
    <div className="flex gap-4">
      <MLAvatar className="size-12">
        <MLAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <MLAvatarFallback>SC</MLAvatarFallback>
      </MLAvatar>
      <div className="flex flex-col gap-1 flex-1">
        <h4 className="text-sm font-semibold">@shadcn</h4>
        <p className="text-sm">Building beautiful UIs with Radix and Tailwind.</p>
        <div className="flex items-center gap-2 pt-2">
          <Calendar className="size-4 opacity-70" />
          <span className="text-xs text-muted-foreground">Joined March 2023</span>
        </div>
      </div>
    </div>
  </MLHoverCardContent>
</MLHoverCard>`,

  OpenDelay: `<MLHoverCard openDelay={200} closeDelay={100}>
  <MLHoverCardTrigger asChild>
    <a href="#" className="text-primary font-medium text-sm hover:underline">
      Quick hover (200ms delay)
    </a>
  </MLHoverCardTrigger>
  <MLHoverCardContent>
    <p className="text-sm">This card opens faster with a 200ms delay.</p>
  </MLHoverCardContent>
</MLHoverCard>`,

  RichContent: `<MLHoverCard>
  <MLHoverCardTrigger asChild>
    <a href="#" className="text-primary font-medium text-sm hover:underline">
      View project details
    </a>
  </MLHoverCardTrigger>
  <MLHoverCardContent className="w-96">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-lg">A</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Artemis Design System</h4>
          <p className="text-xs text-muted-foreground">UI Component Library</p>
        </div>
      </div>
      <p className="text-sm">
        A comprehensive design system built with React, Radix UI, and Tailwind.
      </p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>TypeScript</span>
        <span>MIT License</span>
        <span>v1.0.0</span>
      </div>
    </div>
  </MLHoverCardContent>
</MLHoverCard>`,
};
