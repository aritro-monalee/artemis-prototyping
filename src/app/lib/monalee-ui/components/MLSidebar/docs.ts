export const examples = {
  Default: `<MLSidebar collapsible="icon">
  <MLSidebarHeader>
    <MLSidebarMenu>
      <MLSidebarMenuItem>
        <MLSidebarMenuButton size="lg">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Documentation</span>
            <span className="truncate text-xs">v1.0.1</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </MLSidebarMenuButton>
      </MLSidebarMenuItem>
    </MLSidebarMenu>
  </MLSidebarHeader>

  <MLSidebarContent>
    <MLSidebarGroup>
      <MLSidebarGroupLabel>Platform</MLSidebarGroupLabel>
      <MLSidebarGroupContent>
        <MLSidebarMenu>
          <MLSidebarMenuItem>
            <MLSidebarMenuButton isActive>
              <SquareTerminal className="size-4" />
              <span>Playground</span>
              <ChevronRight className="ml-auto size-4" />
            </MLSidebarMenuButton>
            <MLSidebarMenuSub>
              <MLSidebarMenuSubItem>
                <MLSidebarMenuSubButton asChild>
                  <a href="#">History</a>
                </MLSidebarMenuSubButton>
              </MLSidebarMenuSubItem>
            </MLSidebarMenuSub>
          </MLSidebarMenuItem>
        </MLSidebarMenu>
      </MLSidebarGroupContent>
    </MLSidebarGroup>
  </MLSidebarContent>

  <MLSidebarFooter>
    <MLSidebarMenu>
      <MLSidebarMenuItem>
        <MLSidebarMenuButton size="lg">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="rounded-lg">SC</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">shadcn</span>
            <span className="truncate text-xs">m@example.com</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </MLSidebarMenuButton>
      </MLSidebarMenuItem>
    </MLSidebarMenu>
  </MLSidebarFooter>
</MLSidebar>`,

  Functional: `<MLSidebarProvider>
  <MLSidebar collapsible="icon">
    {/* ... sidebar content */}
  </MLSidebar>
  <main className="flex-1 p-6">
    <MLSidebarTrigger />
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Main Content Area</h1>
      <p className="text-muted-foreground mt-2">
        Click the trigger button to toggle the sidebar.
      </p>
    </div>
  </main>
</MLSidebarProvider>`,

  Simple: `<div className="h-[600px] w-[256px] flex flex-col bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-lg">
  <div className="p-4 border-b border-sidebar-border">
    <h2 className="text-lg font-semibold">My App</h2>
  </div>
  <div className="flex-1 p-2">
    <nav className="flex flex-col gap-1">
      <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm bg-sidebar-accent font-medium">
        <SquareTerminal className="size-4" />
        <span>Home</span>
      </a>
      <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent">
        <Bot className="size-4" />
        <span>AI Assistant</span>
      </a>
      <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent">
        <BookOpen className="size-4" />
        <span>Documentation</span>
      </a>
      <a href="#" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent">
        <Settings2 className="size-4" />
        <span>Settings</span>
      </a>
    </nav>
  </div>
</div>`,
};
