export const examples = {
  Default: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[480px] w-[500px]">
  <MLResizablePanel id="panel-1" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-xl font-medium">One</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="panel-2" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-xl font-medium">Two</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  Vertical: `<MLResizablePanelGroup orientation="vertical" className="min-h-[400px] w-[400px]">
  <MLResizablePanel id="panel-top" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-xl font-medium">Top</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="panel-bottom" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-xl font-medium">Bottom</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  ThreePanels: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[400px] w-[600px]">
  <MLResizablePanel id="sidebar" defaultSize={25} minSize={15}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Sidebar</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="main" defaultSize={50} minSize={30}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Main Content</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="inspector" defaultSize={25} minSize={15}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Inspector</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  WithoutHandle: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[300px] w-[400px]">
  <MLResizablePanel id="left" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Left</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle withHandle={false} />
  <MLResizablePanel id="right" defaultSize={50}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Right</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  NestedLayout: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[500px] w-[700px]">
  <MLResizablePanel id="sidebar" defaultSize={25} minSize={15}>
    <div className="flex h-full items-center justify-center bg-muted/30">
      <span className="text-sm font-medium">Sidebar</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="main-area" defaultSize={75}>
    <MLResizablePanelGroup orientation="vertical">
      <MLResizablePanel id="content" defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <span className="text-lg font-medium">Main Content</span>
        </div>
      </MLResizablePanel>
      <MLResizableHandle />
      <MLResizablePanel id="terminal" defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center bg-muted/30">
          <span className="text-sm font-medium">Terminal / Console</span>
        </div>
      </MLResizablePanel>
    </MLResizablePanelGroup>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  WithConstraints: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[300px] w-[500px]">
  <MLResizablePanel id="constrained" defaultSize={30} minSize={20} maxSize={40}>
    <div className="flex h-full items-center justify-center bg-primary/5">
      <span className="text-sm font-medium">Constrained (20-40%)</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="flexible" defaultSize={70} minSize={30}>
    <div className="flex h-full items-center justify-center">
      <span className="text-sm font-medium">Min 30%</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,

  CollapsiblePanel: `<MLResizablePanelGroup orientation="horizontal" className="min-h-[400px] w-[600px]">
  <MLResizablePanel
    id="collapsible-sidebar"
    defaultSize={25}
    minSize={15}
    collapsible
    collapsedSize={5}
  >
    <div className="flex h-full items-center justify-center">
      <span className="text-sm font-medium">Collapsible Sidebar</span>
    </div>
  </MLResizablePanel>
  <MLResizableHandle />
  <MLResizablePanel id="main-content" defaultSize={75}>
    <div className="flex h-full items-center justify-center">
      <span className="text-lg font-medium">Main Content</span>
    </div>
  </MLResizablePanel>
</MLResizablePanelGroup>`,
};
