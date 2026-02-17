import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLTab } from './index';
import { MLTabProps } from './MLTab';
import { TabsContent } from '../ui/tabs';
import { Monitor, Code } from 'lucide-react';

const meta: Meta<typeof MLTab> = {
  title: 'Components/Tab',
  component: MLTab,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  argTypes: {
    tabs: { control: 'object' },
    activeTab: { control: 'text' },
    onChange: { action: 'change' },
  },
};

export default meta;
type Story = StoryObj<MLTabProps>;

// Default story component
function DefaultTabs() {
  const [activeTab, setActiveTab] = useState('account');
  return (
    <MLTab
      tabs={[
        { id: 'account', label: 'Account' },
        { id: 'password', label: 'Password' },
      ]}
      activeTab={activeTab}
      onChange={setActiveTab}
    />
  );
}

export const Default: Story = {
  render: () => <DefaultTabs />,
};

// ============================================
// Simple Text Tabs (Account / Password)
// ============================================
export const SimpleTextTabs = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
  ];

  return (
    <div className="p-6">
      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        <TabsContent value="account" className="mt-4 p-4 border rounded-md">
          <p>Manage your account settings here.</p>
        </TabsContent>
        <TabsContent value="password" className="mt-4 p-4 border rounded-md">
          <p>Change your password here.</p>
        </TabsContent>
      </MLTab>
    </div>
  );
};

// ============================================
// Small Tabs (Home / Settings)
// ============================================
export const SmallTabs = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="p-6">
      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="sm" />
    </div>
  );
};

// ============================================
// Tabs with Icons (Preview / Code)
// ============================================
export const WithIcons = () => {
  const [activeTab, setActiveTab] = useState('preview');

  const tabs = [
    { id: 'preview', label: 'Preview', icon: <Monitor className="size-4" /> },
    { id: 'code', label: 'Code', icon: <Code className="size-4" /> },
  ];

  return (
    <div className="p-6">
      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        <TabsContent value="preview" className="mt-4 p-4 border rounded-md">
          <p>Preview your component here.</p>
        </TabsContent>
        <TabsContent value="code" className="mt-4 p-4 border rounded-md">
          <pre className="text-sm bg-muted p-2 rounded">{'<Button>Click me</Button>'}</pre>
        </TabsContent>
      </MLTab>
    </div>
  );
};

// ============================================
// Tabs with Badge (Billing / Notifications)
// ============================================
export const WithBadge = () => {
  const [activeTab, setActiveTab] = useState('billing');

  const tabs = [
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications', badge: 4 },
  ];

  return (
    <div className="p-6">
      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        <TabsContent value="billing" className="mt-4 p-4 border rounded-md">
          <p>Manage your billing information.</p>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4 p-4 border rounded-md">
          <p>You have 4 unread notifications.</p>
        </TabsContent>
      </MLTab>
    </div>
  );
};

// ============================================
// Interactive Sliding Animation
// ============================================
export const InteractiveSlidingAnimation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Interactive Sliding Tab Animation</h3>
        <p className="text-muted-foreground mb-4">
          Click on different tabs to see the smooth sliding animation.
        </p>
      </div>

      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} size="md">
        <TabsContent value="dashboard" className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">Dashboard Content</h4>
          <p>Welcome to your dashboard! Here you can see an overview of your data.</p>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">Analytics Content</h4>
          <p>View detailed analytics and insights about your performance.</p>
        </TabsContent>

        <TabsContent value="reports" className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">Reports Content</h4>
          <p>Generate and download various reports for your business.</p>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">Settings Content</h4>
          <p>Configure your account settings and preferences.</p>
        </TabsContent>
      </MLTab>
    </div>
  );
};

export const DifferentSizes = () => {
  const [activeTabSm, setActiveTabSm] = useState('home');
  const [activeTabMd, setActiveTabMd] = useState('about');
  const [activeTabLg, setActiveTabLg] = useState('contact');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h4 className="font-medium mb-2">Small Size</h4>
        <MLTab tabs={tabs} activeTab={activeTabSm} onChange={setActiveTabSm} size="sm" />
      </div>

      <div>
        <h4 className="font-medium mb-2">Medium Size</h4>
        <MLTab tabs={tabs} activeTab={activeTabMd} onChange={setActiveTabMd} size="md" />
      </div>

      <div>
        <h4 className="font-medium mb-2">Large Size</h4>
        <MLTab tabs={tabs} activeTab={activeTabLg} onChange={setActiveTabLg} size="lg" />
      </div>
    </div>
  );
};

// ============================================
// With Disabled Tab
// ============================================
export const WithDisabledTab = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'settings', label: 'Settings' },
    { id: 'admin', label: 'Admin', disabled: true },
  ];

  return (
    <div className="p-6">
      <MLTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
};

// ============================================
// Dark Mode Example
// ============================================
export const DarkMode = () => {
  const [activeTab1, setActiveTab1] = useState('account');
  const [activeTab2, setActiveTab2] = useState('home');
  const [activeTab3, setActiveTab3] = useState('preview');
  const [activeTab4, setActiveTab4] = useState('billing');

  return (
    <div className="p-6 bg-black rounded-lg space-y-8 dark">
      <div>
        <MLTab
          tabs={[
            { id: 'account', label: 'Account' },
            { id: 'password', label: 'Password' },
          ]}
          activeTab={activeTab1}
          onChange={setActiveTab1}
        />
      </div>

      <div>
        <MLTab
          tabs={[
            { id: 'home', label: 'Home' },
            { id: 'settings', label: 'Settings' },
          ]}
          activeTab={activeTab2}
          onChange={setActiveTab2}
        />
      </div>

      <div>
        <MLTab
          tabs={[
            { id: 'preview', label: 'Preview', icon: <Monitor className="size-4" /> },
            { id: 'code', label: 'Code', icon: <Code className="size-4" /> },
          ]}
          activeTab={activeTab3}
          onChange={setActiveTab3}
        />
      </div>

      <div>
        <MLTab
          tabs={[
            { id: 'billing', label: 'Billing' },
            { id: 'notifications', label: 'Notifications', badge: 4 },
          ]}
          activeTab={activeTab4}
          onChange={setActiveTab4}
        />
      </div>
    </div>
  );
};

// ============================================
// All Variants (Figma Design)
// ============================================
export const AllVariants = () => {
  const [activeTab1, setActiveTab1] = useState('account');
  const [activeTab2, setActiveTab2] = useState('home');
  const [activeTab3, setActiveTab3] = useState('preview');
  const [activeTab4, setActiveTab4] = useState('billing');

  return (
    <div className="p-6 space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Simple Text Tabs</p>
        <MLTab
          tabs={[
            { id: 'account', label: 'Account' },
            { id: 'password', label: 'Password' },
          ]}
          activeTab={activeTab1}
          onChange={setActiveTab1}
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Small Tabs</p>
        <MLTab
          tabs={[
            { id: 'home', label: 'Home' },
            { id: 'settings', label: 'Settings' },
          ]}
          activeTab={activeTab2}
          onChange={setActiveTab2}
          size="sm"
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">With Icons</p>
        <MLTab
          tabs={[
            { id: 'preview', label: 'Preview', icon: <Monitor className="size-4" /> },
            { id: 'code', label: 'Code', icon: <Code className="size-4" /> },
          ]}
          activeTab={activeTab3}
          onChange={setActiveTab3}
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">With Badge</p>
        <MLTab
          tabs={[
            { id: 'billing', label: 'Billing' },
            { id: 'notifications', label: 'Notifications', badge: 4 },
          ]}
          activeTab={activeTab4}
          onChange={setActiveTab4}
        />
      </div>
    </div>
  );
};
