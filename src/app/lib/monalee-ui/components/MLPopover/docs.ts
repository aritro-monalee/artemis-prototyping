export const examples = {
  Default: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Open Popover</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent>
    <MLPopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
    <div className="flex flex-col gap-2 mt-4">
      <MLInput label="Width" placeholder="100%" horizontalLayout labelWidth="96px" />
      <MLInput label="Max. width" placeholder="300px" horizontalLayout labelWidth="96px" />
      <MLInput label="Height" placeholder="auto" horizontalLayout labelWidth="96px" />
      <MLInput label="Max. height" placeholder="none" horizontalLayout labelWidth="96px" />
    </div>
  </MLPopoverContent>
</MLPopover>`,

  Simple: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Click me</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent className="w-64">
    <p className="text-sm">This is a simple popover with some text content.</p>
  </MLPopoverContent>
</MLPopover>`,

  WithHeader: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Settings</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent>
    <MLPopoverHeader title="Display Settings" description="Configure how content is displayed." />
    <div className="mt-4 space-y-2">
      <p className="text-sm">Settings content goes here...</p>
    </div>
  </MLPopoverContent>
</MLPopover>`,

  AlignStart: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Align Start</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent align="start">
    <MLPopoverHeader title="Aligned to Start" />
    <p className="text-sm text-muted-foreground mt-2">
      This popover is aligned to the start of the trigger.
    </p>
  </MLPopoverContent>
</MLPopover>`,

  AlignCenter: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Align Center</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent align="center">
    <MLPopoverHeader title="Aligned to Center" />
  </MLPopoverContent>
</MLPopover>`,

  AlignEnd: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Align End</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent align="end">
    <MLPopoverHeader title="Aligned to End" />
  </MLPopoverContent>
</MLPopover>`,

  WithCloseButton: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Open</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent className="relative">
    <MLPopoverClose className="absolute right-2 top-2">
      <X className="h-4 w-4" />
    </MLPopoverClose>
    <MLPopoverHeader title="Notifications" description="Manage your notification preferences." />
  </MLPopoverContent>
</MLPopover>`,

  IconTrigger: `<MLPopover>
  <MLPopoverTrigger asChild>
    <MLButton variant="ghost" size="icon">
      <Settings className="h-4 w-4" />
    </MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent>
    <MLPopoverHeader title="Settings" description="Adjust your preferences." />
    <div className="mt-4 space-y-2">
      <MLInput label="Name" placeholder="Enter name" />
      <MLInput label="Email" placeholder="Enter email" type="email" />
    </div>
  </MLPopoverContent>
</MLPopover>`,

  Controlled: `const [open, setOpen] = useState(false);

<MLPopover open={open} onOpenChange={setOpen}>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">{open ? 'Close' : 'Open'} Popover</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent>
    <MLPopoverHeader title="Controlled Popover" />
    <div className="mt-4">
      <MLButton size="sm" onClick={() => setOpen(false)}>
        Close from inside
      </MLButton>
    </div>
  </MLPopoverContent>
</MLPopover>`,

  DimensionsForm: `<MLPopover defaultOpen>
  <MLPopoverTrigger asChild>
    <MLButton variant="outline">Edit Dimensions</MLButton>
  </MLPopoverTrigger>
  <MLPopoverContent className="w-80">
    <MLPopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
    <div className="grid gap-2 mt-4">
      <div className="grid grid-cols-[96px_1fr] items-center gap-4">
        <label className="text-sm font-medium text-right">Width</label>
        <input type="text" placeholder="Placeholder" className="h-8 px-3 rounded-md border" />
      </div>
      {/* ... more fields */}
    </div>
  </MLPopoverContent>
</MLPopover>`,

  MultiplePopovers: `<div className="flex gap-4">
  <MLPopover>
    <MLPopoverTrigger asChild>
      <MLButton variant="outline">First</MLButton>
    </MLPopoverTrigger>
    <MLPopoverContent>
      <MLPopoverHeader title="First Popover" />
    </MLPopoverContent>
  </MLPopover>

  <MLPopover>
    <MLPopoverTrigger asChild>
      <MLButton variant="outline">Second</MLButton>
    </MLPopoverTrigger>
    <MLPopoverContent>
      <MLPopoverHeader title="Second Popover" />
    </MLPopoverContent>
  </MLPopover>
</div>`,
};
