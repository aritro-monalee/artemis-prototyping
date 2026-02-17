import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLSidebar as Sidebar,
  MLSidebarContent as SidebarContent,
  MLSidebarFooter as SidebarFooter,
  MLSidebarGroup as SidebarGroup,
  MLSidebarGroupContent as SidebarGroupContent,
  MLSidebarGroupLabel as SidebarGroupLabel,
  MLSidebarHeader as SidebarHeader,
  MLSidebarMenu as SidebarMenu,
  MLSidebarMenuButton as SidebarMenuButton,
  MLSidebarMenuItem as SidebarMenuItem,
  MLSidebarMenuSub as SidebarMenuSub,
  MLSidebarMenuSubButton as SidebarMenuSubButton,
  MLSidebarMenuSubItem as SidebarMenuSubItem,
  MLSidebarProvider as SidebarProvider,
  MLSidebarTrigger as SidebarTrigger,
} from './index';
import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  Map,
  MoreHorizontal,
  ChevronRight,
  ChevronsUpDown,
  GalleryVerticalEnd,
} from 'lucide-react';
import {
  MLAvatar as Avatar,
  MLAvatarImage as AvatarImage,
  MLAvatarFallback as AvatarFallback,
} from '../MLAvatar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ============================================
// Navigation Data (Figma Design)
// ============================================

const platformNav = [
  {
    title: 'Playground',
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: 'History', url: '#' },
      { title: 'Starred', url: '#' },
      { title: 'Settings', url: '#' },
    ],
  },
  {
    title: 'Models',
    icon: Bot,
    items: [
      { title: 'Genesis', url: '#' },
      { title: 'Explorer', url: '#' },
      { title: 'Quantum', url: '#' },
    ],
  },
  {
    title: 'Documentation',
    icon: BookOpen,
    items: [
      { title: 'Introduction', url: '#' },
      { title: 'Get Started', url: '#' },
      { title: 'Tutorials', url: '#' },
      { title: 'Changelog', url: '#' },
    ],
  },
  {
    title: 'Settings',
    icon: Settings2,
    items: [
      { title: 'General', url: '#' },
      { title: 'Team', url: '#' },
      { title: 'Billing', url: '#' },
      { title: 'Limits', url: '#' },
    ],
  },
];

const projectsNav = [
  { title: 'Design Engineering', icon: Frame, url: '#' },
  { title: 'Sales & Marketing', icon: PieChart, url: '#' },
  { title: 'Travel', icon: Map, url: '#' },
  { title: 'More', icon: MoreHorizontal, url: '#', isDisabled: true },
];

// ============================================
// App Sidebar Component (Figma Design Match)
// ============================================

function AppSidebar() {
  const [openItems, setOpenItems] = React.useState<string[]>(['Playground']);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Documentation</span>
                <span className="truncate text-xs">v1.0.1</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Platform Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => toggleItem(item.title)}
                    isActive={item.isActive}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                    <ChevronRight
                      className={`ml-auto size-4 transition-transform duration-200 ${
                        openItems.includes(item.title) ? 'rotate-90' : ''
                      }`}
                    />
                  </SidebarMenuButton>
                  {openItems.includes(item.title) && item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.isDisabled}
                    className={item.isDisabled ? 'opacity-70' : ''}
                  >
                    {item.isDisabled ? (
                      <>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </>
                    ) : (
                      <a href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback className="rounded-lg">SC</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">shadcn</span>
                <span className="truncate text-xs">m@example.com</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// ============================================
// Static Sidebar Preview (matches Figma design exactly)
// ============================================

function StaticSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const [openItems, setOpenItems] = React.useState<string[]>(['Playground']);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  if (collapsed) {
    return (
      <div className="h-[900px] w-[48px] flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Header - Icon Only */}
        <div className="p-2">
          <div className="flex items-center justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
          </div>
        </div>

        {/* Content - Icons Only */}
        <div className="flex-1 flex flex-col gap-1 p-2">
          <button className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
            <SquareTerminal className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
            <Bot className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
            <BookOpen className="size-4" />
          </button>
          <button className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
            <Settings2 className="size-4" />
          </button>
        </div>

        {/* Footer - Avatar Only */}
        <div className="p-2 mt-auto">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="rounded-lg">SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[900px] w-[256px] flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Header */}
      <div className="p-2">
        <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex-1 text-left text-sm leading-tight">
            <div className="truncate font-semibold">Documentation</div>
            <div className="truncate text-xs text-sidebar-foreground/70">v1.0.1</div>
          </div>
          <ChevronsUpDown className="size-4 text-sidebar-foreground/70" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Platform Group */}
        <div className="p-2">
          <div className="px-2 py-1 text-xs font-medium text-sidebar-foreground/70">Platform</div>
          <nav className="flex flex-col gap-1">
            {platformNav.map((item) => (
              <div key={item.title}>
                <button
                  onClick={() => toggleItem(item.title)}
                  className={`flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent ${
                    item.isActive ? 'bg-sidebar-accent font-medium' : ''
                  }`}
                >
                  <item.icon className="size-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronRight
                    className={`size-4 transition-transform ${
                      openItems.includes(item.title) ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openItems.includes(item.title) && item.items && (
                  <div className="ml-4 border-l border-sidebar-border pl-4 py-1 flex flex-col gap-1">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.url}
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Projects Group */}
        <div className="p-2">
          <div className="px-2 py-1 text-xs font-medium text-sidebar-foreground/70">Projects</div>
          <nav className="flex flex-col gap-1">
            {projectsNav.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent ${
                  item.isDisabled ? 'opacity-70' : ''
                }`}
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 mt-auto">
        <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="rounded-lg">SC</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left text-sm leading-tight">
            <div className="truncate font-semibold">shadcn</div>
            <div className="truncate text-xs text-sidebar-foreground/70">m@example.com</div>
          </div>
          <ChevronsUpDown className="size-4 text-sidebar-foreground/70" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// Default Story (Figma Design)
// ============================================

export const Default: Story = {
  render: () => <StaticSidebar />,
  parameters: {
    layout: 'centered',
  },
};

// ============================================
// Collapsed State (Figma Design)
// ============================================

export const Collapsed: Story = {
  render: () => <StaticSidebar collapsed />,
  parameters: {
    layout: 'centered',
  },
};

// ============================================
// Side by Side (Both States)
// ============================================

export const SideBySide: Story = {
  render: () => (
    <div className="flex gap-4">
      <StaticSidebar />
      <StaticSidebar collapsed />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};

// ============================================
// With SidebarProvider (Functional)
// ============================================

export const Functional: Story = {
  render: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 min-w-[400px]">
        <SidebarTrigger />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
          <p className="text-muted-foreground mt-2">
            Click the trigger button to toggle the sidebar.
          </p>
        </div>
      </main>
    </SidebarProvider>
  ),
};

// ============================================
// Simple Example
// ============================================

export const Simple: Story = {
  render: () => (
    <div className="h-[600px] w-[256px] flex flex-col bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-lg">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold">My App</h2>
      </div>
      <div className="flex-1 p-2">
        <nav className="flex flex-col gap-1">
          <a
            href="#"
            className="flex items-center gap-2 rounded-md p-2 text-sm bg-sidebar-accent font-medium"
          >
            <SquareTerminal className="size-4" />
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent"
          >
            <Bot className="size-4" />
            <span>AI Assistant</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent"
          >
            <BookOpen className="size-4" />
            <span>Documentation</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent"
          >
            <Settings2 className="size-4" />
            <span>Settings</span>
          </a>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
