export const examples = {
  Default: `const [activeTab, setActiveTab] = useState('account');

<MLTab
  tabs={[
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>`,

  SimpleTextTabs: `const [activeTab, setActiveTab] = useState('account');

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'password', label: 'Password' },
];

<MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
  <TabsContent value="account" className="mt-4 p-4 border rounded-md">
    <p>Manage your account settings here.</p>
  </TabsContent>
  <TabsContent value="password" className="mt-4 p-4 border rounded-md">
    <p>Change your password here.</p>
  </TabsContent>
</MLTab>`,

  SmallTabs: `const [activeTab, setActiveTab] = useState('home');

<MLTab
  tabs={[
    { id: 'home', label: 'Home' },
    { id: 'settings', label: 'Settings' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  size="sm"
/>`,

  WithIcons: `const [activeTab, setActiveTab] = useState('preview');

const tabs = [
  { id: 'preview', label: 'Preview', icon: <Monitor className="size-4" /> },
  { id: 'code', label: 'Code', icon: <Code className="size-4" /> },
];

<MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
  <TabsContent value="preview" className="mt-4 p-4 border rounded-md">
    <p>Preview your component here.</p>
  </TabsContent>
  <TabsContent value="code" className="mt-4 p-4 border rounded-md">
    <pre className="text-sm bg-muted p-2 rounded">{'<Button>Click me</Button>'}</pre>
  </TabsContent>
</MLTab>`,

  WithBadge: `const [activeTab, setActiveTab] = useState('billing');

const tabs = [
  { id: 'billing', label: 'Billing' },
  { id: 'notifications', label: 'Notifications', badge: 4 },
];

<MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
  <TabsContent value="billing" className="mt-4 p-4 border rounded-md">
    <p>Manage your billing information.</p>
  </TabsContent>
  <TabsContent value="notifications" className="mt-4 p-4 border rounded-md">
    <p>You have 4 unread notifications.</p>
  </TabsContent>
</MLTab>`,

  InteractiveSlidingAnimation: `const [activeTab, setActiveTab] = useState('dashboard');

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

<MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="md">
  <TabsContent value="dashboard" className="mt-6 p-4 bg-muted rounded-md">
    <h4 className="font-medium mb-2">Dashboard Content</h4>
    <p>Welcome to your dashboard!</p>
  </TabsContent>
  {/* ... other content */}
</MLTab>`,

  DifferentSizes: `const [activeTabSm, setActiveTabSm] = useState('home');
const [activeTabMd, setActiveTabMd] = useState('about');
const [activeTabLg, setActiveTabLg] = useState('contact');

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

<div className="space-y-8">
  <MLTab tabs={tabs} activeTab={activeTabSm} onChange={setActiveTabSm} size="sm" />
  <MLTab tabs={tabs} activeTab={activeTabMd} onChange={setActiveTabMd} size="md" />
  <MLTab tabs={tabs} activeTab={activeTabLg} onChange={setActiveTabLg} size="lg" />
</div>`,

  WithDisabledTab: `const [activeTab, setActiveTab] = useState('home');

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'settings', label: 'Settings' },
  { id: 'admin', label: 'Admin', disabled: true },
];

<MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />`,
};
