import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Copy,
  Scissors,
  Clipboard,
  Download,
  Share,
  Trash2,
  Edit,
  Eye,
  File,
  Folder,
  Cloud,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Bookmark,
  Link,
} from 'lucide-react';
import {
  MLContextMenu,
  MLContextMenuContent,
  MLContextMenuItem,
  MLContextMenuTrigger,
  MLContextMenuSeparator,
  MLContextMenuCheckboxItem,
  MLContextMenuRadioItem,
  MLContextMenuRadioGroup,
  MLContextMenuLabel,
  MLContextMenuSub,
  MLContextMenuSubContent,
  MLContextMenuSubTrigger,
  MLContextMenuShortcut,
} from './MLContextMenu';

const meta: Meta<typeof MLContextMenu> = {
  title: 'Components/ContextMenu',
  component: MLContextMenu,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
    docs: {
      description: {
        component:
          'A context menu component built on top of Radix UI. Right-click on the trigger elements to see the context menus.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MLContextMenu>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
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
      </MLContextMenu>
    </div>
  ),
};

export const BrowserStyle: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
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
              <MLContextMenuItem>
                Save Page As
                <MLContextMenuShortcut>⇧⌘S</MLContextMenuShortcut>
              </MLContextMenuItem>
              <MLContextMenuItem>Create Shortcut</MLContextMenuItem>
              <MLContextMenuItem>Name Window</MLContextMenuItem>
              <MLContextMenuSeparator />
              <MLContextMenuItem>Developer Tools</MLContextMenuItem>
            </MLContextMenuSubContent>
          </MLContextMenuSub>
          <MLContextMenuSeparator />
          <MLContextMenuLabel inset>People</MLContextMenuLabel>
          <MLContextMenuRadioGroup value="pedro">
            <MLContextMenuRadioItem value="pedro">Pedro Duarte</MLContextMenuRadioItem>
          </MLContextMenuRadioGroup>
          <MLContextMenuSeparator />
          <MLContextMenuItem>
            Show Bookmarks
            <MLContextMenuShortcut>⌘⇧B</MLContextMenuShortcut>
          </MLContextMenuItem>
          <MLContextMenuItem inset>Show Full URLs</MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const WithSeparators: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
          Right click for file actions
        </MLContextMenuTrigger>
        <MLContextMenuContent className="w-64">
          <MLContextMenuItem>
            <Eye className="size-4" />
            View
          </MLContextMenuItem>
          <MLContextMenuItem>
            <Edit className="size-4" />
            Edit
          </MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuItem>
            <Copy className="size-4" />
            Copy
          </MLContextMenuItem>
          <MLContextMenuItem>
            <Scissors className="size-4" />
            Cut
          </MLContextMenuItem>
          <MLContextMenuItem>
            <Clipboard className="size-4" />
            Paste
          </MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuItem>
            <Download className="size-4" />
            Download
          </MLContextMenuItem>
          <MLContextMenuItem>
            <Share className="size-4" />
            Share
          </MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuItem variant="destructive">
            <Trash2 className="size-4" />
            Delete
            <MLContextMenuShortcut>⌘⌫</MLContextMenuShortcut>
          </MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
          Right click for view options
        </MLContextMenuTrigger>
        <MLContextMenuContent className="w-64">
          <MLContextMenuLabel>View Options</MLContextMenuLabel>
          <MLContextMenuSeparator />
          <MLContextMenuCheckboxItem checked>Show Toolbar</MLContextMenuCheckboxItem>
          <MLContextMenuCheckboxItem>Show Sidebar</MLContextMenuCheckboxItem>
          <MLContextMenuCheckboxItem checked>Show Status Bar</MLContextMenuCheckboxItem>
          <MLContextMenuSeparator />
          <MLContextMenuItem>
            <Eye className="size-4" />
            Full Screen
            <MLContextMenuShortcut>F11</MLContextMenuShortcut>
          </MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
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
          <MLContextMenuSeparator />
          <MLContextMenuItem>Reset to Default</MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
          Right click for file actions with submenus
        </MLContextMenuTrigger>
        <MLContextMenuContent className="w-64">
          <MLContextMenuItem>
            <File className="size-4" />
            New File
            <MLContextMenuShortcut>⌘N</MLContextMenuShortcut>
          </MLContextMenuItem>
          <MLContextMenuItem>
            <Folder className="size-4" />
            New Folder
          </MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuSub>
            <MLContextMenuSubTrigger>
              <Share className="size-4" />
              Share
            </MLContextMenuSubTrigger>
            <MLContextMenuSubContent className="w-48">
              <MLContextMenuItem>
                <Cloud className="size-4" />
                Share to Cloud
              </MLContextMenuItem>
              <MLContextMenuItem>
                <Link className="size-4" />
                Copy Share Link
              </MLContextMenuItem>
              <MLContextMenuItem>Email Share</MLContextMenuItem>
            </MLContextMenuSubContent>
          </MLContextMenuSub>
          <MLContextMenuSub>
            <MLContextMenuSubTrigger>
              <Download className="size-4" />
              Export As
            </MLContextMenuSubTrigger>
            <MLContextMenuSubContent className="w-48">
              <MLContextMenuItem>Export as PDF</MLContextMenuItem>
              <MLContextMenuItem>Export as PNG</MLContextMenuItem>
              <MLContextMenuItem>Export as SVG</MLContextMenuItem>
              <MLContextMenuItem>Export as JSON</MLContextMenuItem>
            </MLContextMenuSubContent>
          </MLContextMenuSub>
          <MLContextMenuSeparator />
          <MLContextMenuItem variant="destructive">
            <Trash2 className="size-4" />
            Delete
          </MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
          Right click (some items disabled)
        </MLContextMenuTrigger>
        <MLContextMenuContent className="w-64">
          <MLContextMenuItem>
            <Copy className="size-4" />
            Copy
          </MLContextMenuItem>
          <MLContextMenuItem disabled>
            <Scissors className="size-4" />
            Cut (disabled)
          </MLContextMenuItem>
          <MLContextMenuItem disabled>
            <Clipboard className="size-4" />
            Paste (disabled)
          </MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuItem>
            <Download className="size-4" />
            Download
          </MLContextMenuItem>
          <MLContextMenuItem disabled>
            <Share className="size-4" />
            Share (disabled)
          </MLContextMenuItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};

export const WithInsetItems: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <MLContextMenu>
        <MLContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm text-base-foreground">
          Right click for inset items
        </MLContextMenuTrigger>
        <MLContextMenuContent className="w-64">
          <MLContextMenuLabel>Actions</MLContextMenuLabel>
          <MLContextMenuSeparator />
          <MLContextMenuItem inset>New File</MLContextMenuItem>
          <MLContextMenuItem inset>New Folder</MLContextMenuItem>
          <MLContextMenuSeparator />
          <MLContextMenuCheckboxItem checked>Show Hidden Files</MLContextMenuCheckboxItem>
          <MLContextMenuCheckboxItem>Show File Extensions</MLContextMenuCheckboxItem>
        </MLContextMenuContent>
      </MLContextMenu>
    </div>
  ),
};
