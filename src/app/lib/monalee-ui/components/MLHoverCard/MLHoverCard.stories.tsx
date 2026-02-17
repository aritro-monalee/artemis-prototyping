import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLHoverCard as HoverCard,
  MLHoverCardTrigger as HoverCardTrigger,
  MLHoverCardContent as HoverCardContent,
} from './index';
import {
  MLAvatar as Avatar,
  MLAvatarImage as AvatarImage,
  MLAvatarFallback as AvatarFallback,
} from '../MLAvatar';
import { Calendar } from 'lucide-react';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
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
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary font-medium text-sm hover:underline">
          @nextjs
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/vercel.png" alt="@nextjs" />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm text-popover-foreground">
              The React Framework - created and maintained by @vercel.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Calendar className="size-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined December 2024</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithButton: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-primary font-medium text-sm hover:underline">Hover over me</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Tooltip Content</h4>
          <p className="text-sm text-muted-foreground">
            This is a more detailed preview that appears on hover.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary font-medium text-sm hover:underline">
          @shadcn
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">@shadcn</h4>
            </div>
            <p className="text-sm text-popover-foreground">
              Building beautiful UIs with Radix and Tailwind CSS.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Calendar className="size-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined March 2023</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const OpenDelay: Story = {
  render: () => (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary font-medium text-sm hover:underline">
          Quick hover (200ms delay)
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This card opens faster with a 200ms delay.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary font-medium text-sm hover:underline">
          View project details
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">A</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Artemis Design System</h4>
              <p className="text-xs text-muted-foreground">UI Component Library</p>
            </div>
          </div>
          <p className="text-sm text-popover-foreground">
            A comprehensive design system built with React, Radix UI, and Tailwind CSS. Features
            over 50 customizable components.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>TypeScript</span>
            <span>MIT License</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
