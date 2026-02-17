export const examples = {
  Default: `<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <MLButton variant="outline">Open</MLButton>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuLabel>My Account</MLDropdownMenuLabel>
    <MLDropdownMenuItem>
      Profile
      <MLDropdownMenuShortcut>⇧⌘P</MLDropdownMenuShortcut>
    </MLDropdownMenuItem>
    <MLDropdownMenuItem>
      Billing
      <MLDropdownMenuShortcut>⌘B</MLDropdownMenuShortcut>
    </MLDropdownMenuItem>
    <MLDropdownMenuItem>
      Settings
      <MLDropdownMenuShortcut>⌘S</MLDropdownMenuShortcut>
    </MLDropdownMenuItem>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuItem>Log out</MLDropdownMenuItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  WithIcons: `<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <MLButton variant="outline">Options</MLButton>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuItem>
      <User className="size-4" />
      Profile
      <MLDropdownMenuShortcut>⇧⌘P</MLDropdownMenuShortcut>
    </MLDropdownMenuItem>
    <MLDropdownMenuItem>
      <CreditCard className="size-4" />
      Billing
      <MLDropdownMenuShortcut>⌘B</MLDropdownMenuShortcut>
    </MLDropdownMenuItem>
    <MLDropdownMenuItem>
      <Settings className="size-4" />
      Settings
    </MLDropdownMenuItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  UserProfileTrigger: `<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <button className="flex items-center gap-2 rounded-md border px-3 py-2">
      <Avatar className="size-8">
        <AvatarImage src="..." />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">shadcn</span>
        <span className="text-xs text-muted-foreground">shadcn@example.com</span>
      </div>
      <ChevronsUpDown className="size-4 opacity-50" />
    </button>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuItem>
      <Sparkles className="size-4" />
      Upgrade to Pro
    </MLDropdownMenuItem>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuItem>
      <LogOut className="size-4" />
      Sign Out
    </MLDropdownMenuItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  AvatarTrigger: `<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <button className="rounded-full">
      <Avatar className="size-8">
        <AvatarImage src="..." />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </button>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuItem>Account</MLDropdownMenuItem>
    <MLDropdownMenuItem>Billing</MLDropdownMenuItem>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuItem>Sign Out</MLDropdownMenuItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  IconButtonTrigger: `<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <MLButton variant="outline" size="icon">
      <MoreVertical className="size-4" />
    </MLButton>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent>
    <MLDropdownMenuItem>Email</MLDropdownMenuItem>
    <MLDropdownMenuItem>Message</MLDropdownMenuItem>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuItem>More...</MLDropdownMenuItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  WithCheckboxes: `const [showStatusBar, setShowStatusBar] = useState(true);
const [showPanel, setShowPanel] = useState(false);

<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <MLButton variant="outline">Appearance</MLButton>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuLabel>Appearance</MLDropdownMenuLabel>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuCheckboxItem 
      checked={showStatusBar} 
      onCheckedChange={setShowStatusBar}
    >
      Status Bar
    </MLDropdownMenuCheckboxItem>
    <MLDropdownMenuCheckboxItem 
      checked={showPanel} 
      onCheckedChange={setShowPanel}
    >
      Panel
    </MLDropdownMenuCheckboxItem>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,

  WithRadioItems: `const [position, setPosition] = useState('bottom');

<MLDropdownMenu>
  <MLDropdownMenuTrigger asChild>
    <MLButton variant="outline">Panel Position</MLButton>
  </MLDropdownMenuTrigger>
  <MLDropdownMenuContent className="w-56">
    <MLDropdownMenuLabel>Panel Position</MLDropdownMenuLabel>
    <MLDropdownMenuSeparator />
    <MLDropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <MLDropdownMenuRadioItem value="top">Top</MLDropdownMenuRadioItem>
      <MLDropdownMenuRadioItem value="bottom">Bottom</MLDropdownMenuRadioItem>
      <MLDropdownMenuRadioItem value="right">Right</MLDropdownMenuRadioItem>
    </MLDropdownMenuRadioGroup>
  </MLDropdownMenuContent>
</MLDropdownMenu>`,
};
