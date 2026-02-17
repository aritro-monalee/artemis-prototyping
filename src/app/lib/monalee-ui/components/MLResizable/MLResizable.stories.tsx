import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLResizablePanelGroup as ResizablePanelGroup,
  MLResizablePanel as ResizablePanel,
  MLResizableHandle as ResizableHandle,
  type MLResizablePanelGroupProps as ResizablePanelGroupProps,
} from './index';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<ResizablePanelGroupProps>;

// ============================================
// Basic Horizontal (Figma Design)
// ============================================

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[480px] w-[500px]">
      <ResizablePanel id="panel-1" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-xl font-medium text-base-foreground">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="panel-2" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-xl font-medium text-base-foreground">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// Vertical Layout
// ============================================

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup orientation="vertical" className="min-h-[400px] w-[400px]">
      <ResizablePanel id="panel-top" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-xl font-medium text-base-foreground">Top</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="panel-bottom" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-xl font-medium text-base-foreground">Bottom</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// Three Panels
// ============================================

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[400px] w-[600px]">
      <ResizablePanel id="sidebar" defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="main" defaultSize={50} minSize={30}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="inspector" defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Inspector</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// Without Handle
// ============================================

export const WithoutHandle: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[300px] w-[400px]">
      <ResizablePanel id="left" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel id="right" defaultSize={50}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Right</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// Nested Layout
// ============================================

export const NestedLayout: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[500px] w-[700px]">
      <ResizablePanel id="sidebar" defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center bg-muted/30">
          <span className="text-sm font-medium text-base-foreground">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="main-area" defaultSize={75}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel id="content" defaultSize={70}>
            <div className="flex h-full items-center justify-center">
              <span className="text-lg font-medium text-base-foreground">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel id="terminal" defaultSize={30} minSize={20}>
            <div className="flex h-full items-center justify-center bg-muted/30">
              <span className="text-sm font-medium text-base-foreground">Terminal / Console</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// With Content
// ============================================

export const WithContent: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[400px] w-[600px]">
      <ResizablePanel id="files" defaultSize={30} minSize={20}>
        <div className="flex h-full flex-col p-4">
          <h3 className="text-sm font-semibold text-base-foreground mb-2">Files</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">index.tsx</li>
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">App.tsx</li>
            <li className="px-2 py-1 rounded bg-primary/10 text-primary cursor-pointer">
              components/
            </li>
            <li className="px-2 py-1 rounded hover:bg-muted cursor-pointer">styles.css</li>
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="editor" defaultSize={70}>
        <div className="flex h-full flex-col p-4">
          <h3 className="text-sm font-semibold text-base-foreground mb-2">Editor</h3>
          <div className="flex-1 rounded border border-border bg-muted/20 p-3">
            <pre className="text-xs text-muted-foreground font-mono">
              {`import React from 'react';

export function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// ============================================
// Min/Max Size Constraints
// ============================================

export const WithConstraints: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Left panel: min 20%, max 40% | Right panel: min 30%
      </p>
      <ResizablePanelGroup orientation="horizontal" className="min-h-[300px] w-[500px]">
        <ResizablePanel id="constrained" defaultSize={30} minSize={20} maxSize={40}>
          <div className="flex h-full items-center justify-center bg-primary/5">
            <span className="text-sm font-medium text-base-foreground">Constrained (20-40%)</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel id="flexible" defaultSize={70} minSize={30}>
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-medium text-base-foreground">Min 30%</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ============================================
// Collapsible Panel
// ============================================

export const CollapsiblePanel: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[400px] w-[600px]">
      <ResizablePanel
        id="collapsible-sidebar"
        defaultSize={25}
        minSize={15}
        collapsible
        collapsedSize={5}
      >
        <div className="flex h-full items-center justify-center">
          <span className="text-sm font-medium text-base-foreground">Collapsible Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel id="main-content" defaultSize={75}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium text-base-foreground">Main Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
