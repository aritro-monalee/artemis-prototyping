export const examples = {
  Default: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuItem>
      <Copy className="size-4" />
      Copy
      <MLContextMenuShortcut>⌘C</MLContextMenuShortcut>
    </MLContextMenuItem>
    <MLContextMenuItem>
      <Scissors className="size-4" />
      Cut
      <MLContextMenuShortcut>⌘X</MLContextMenuShortcut>
    </MLContextMenuItem>
    <MLContextMenuItem>
      <Clipboard className="size-4" />
      Paste
      <MLContextMenuShortcut>⌘V</MLContextMenuShortcut>
    </MLContextMenuItem>
  </MLContextMenuContent>
</MLContextMenu>`,

  BrowserStyle: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click for browser actions
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuItem>
      Back
      <MLContextMenuShortcut>⌘[</MLContextMenuShortcut>
    </MLContextMenuItem>
    <MLContextMenuItem disabled>
      Forward
      <MLContextMenuShortcut>⌘]</MLContextMenuShortcut>
    </MLContextMenuItem>
    <MLContextMenuItem>
      Reload
      <MLContextMenuShortcut>⌘R</MLContextMenuShortcut>
    </MLContextMenuItem>
    <MLContextMenuSub>
      <MLContextMenuSubTrigger inset>More Tools</MLContextMenuSubTrigger>
      <MLContextMenuSubContent className="w-48">
        <MLContextMenuItem>Save Page As<MLContextMenuShortcut>⇧⌘S</MLContextMenuShortcut></MLContextMenuItem>
        <MLContextMenuItem>Developer Tools</MLContextMenuItem>
      </MLContextMenuSubContent>
    </MLContextMenuSub>
  </MLContextMenuContent>
</MLContextMenu>`,

  WithSeparators: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click for file actions
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuItem><Eye className="size-4" />View</MLContextMenuItem>
    <MLContextMenuItem><Edit className="size-4" />Edit</MLContextMenuItem>
    <MLContextMenuSeparator />
    <MLContextMenuItem><Copy className="size-4" />Copy</MLContextMenuItem>
    <MLContextMenuItem><Scissors className="size-4" />Cut</MLContextMenuItem>
    <MLContextMenuSeparator />
    <MLContextMenuItem variant="destructive">
      <Trash2 className="size-4" />
      Delete
      <MLContextMenuShortcut>⌘⌫</MLContextMenuShortcut>
    </MLContextMenuItem>
  </MLContextMenuContent>
</MLContextMenu>`,

  WithCheckboxItems: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click for view options
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuLabel>View Options</MLContextMenuLabel>
    <MLContextMenuSeparator />
    <MLContextMenuCheckboxItem checked>Show Toolbar</MLContextMenuCheckboxItem>
    <MLContextMenuCheckboxItem>Show Sidebar</MLContextMenuCheckboxItem>
    <MLContextMenuCheckboxItem checked>Show Status Bar</MLContextMenuCheckboxItem>
  </MLContextMenuContent>
</MLContextMenu>`,

  WithRadioGroup: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click for theme options
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuLabel>Theme</MLContextMenuLabel>
    <MLContextMenuSeparator />
    <MLContextMenuRadioGroup value="light">
      <MLContextMenuRadioItem value="light">Light</MLContextMenuRadioItem>
      <MLContextMenuRadioItem value="dark">Dark</MLContextMenuRadioItem>
      <MLContextMenuRadioItem value="system">System</MLContextMenuRadioItem>
    </MLContextMenuRadioGroup>
  </MLContextMenuContent>
</MLContextMenu>`,

  WithSubmenus: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click for file actions with submenus
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuItem><File className="size-4" />New File<MLContextMenuShortcut>⌘N</MLContextMenuShortcut></MLContextMenuItem>
    <MLContextMenuSeparator />
    <MLContextMenuSub>
      <MLContextMenuSubTrigger><Share className="size-4" />Share</MLContextMenuSubTrigger>
      <MLContextMenuSubContent className="w-48">
        <MLContextMenuItem><Cloud className="size-4" />Share to Cloud</MLContextMenuItem>
        <MLContextMenuItem><Link className="size-4" />Copy Share Link</MLContextMenuItem>
      </MLContextMenuSubContent>
    </MLContextMenuSub>
    <MLContextMenuSub>
      <MLContextMenuSubTrigger><Download className="size-4" />Export As</MLContextMenuSubTrigger>
      <MLContextMenuSubContent className="w-48">
        <MLContextMenuItem>Export as PDF</MLContextMenuItem>
        <MLContextMenuItem>Export as PNG</MLContextMenuItem>
      </MLContextMenuSubContent>
    </MLContextMenuSub>
  </MLContextMenuContent>
</MLContextMenu>`,

  DisabledItems: `<MLContextMenu>
  <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click (some items disabled)
  </MLContextMenuTrigger>
  <MLContextMenuContent className="w-64">
    <MLContextMenuItem><Copy className="size-4" />Copy</MLContextMenuItem>
    <MLContextMenuItem disabled><Scissors className="size-4" />Cut (disabled)</MLContextMenuItem>
    <MLContextMenuItem disabled><Clipboard className="size-4" />Paste (disabled)</MLContextMenuItem>
  </MLContextMenuContent>
</MLContextMenu>`,
};
