'use client';

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MLCard as Card,
  MLCardHeader as CardHeader,
  MLCardTitle as CardTitle,
  MLCardDescription as CardDescription,
  MLCardAction as CardAction,
  MLCardContent as CardContent,
  MLCardFooter as CardFooter,
  type MLCardProps as CardProps,
} from './index';
import { MLButton } from '../MLButton/MLButton';
import { MLInput } from '../MLInput/MLInput';
import { MLAvatar as Avatar, MLAvatarGroup as AvatarGroup } from '../MLAvatar';
import { MLBadge } from '../MLBadge/MLBadge';
import { Bed, Bath, LandPlot } from 'lucide-react';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Title Text</CardTitle>
        <CardDescription>This is a card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center rounded border border-dashed border-artemis-500/50 bg-artemis-500/10 p-6 text-sm text-base-foreground">
          Slot (swap it with your content)
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center rounded border border-dashed border-artemis-500/50 bg-artemis-500/10 p-6 text-sm text-base-foreground">
          Slot (swap it with your content)
        </div>
      </CardFooter>
    </Card>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-base-foreground">Email</label>
          <MLInput placeholder="m@example.com" type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-base-foreground">Password</label>
            <a href="#" className="text-sm text-base-muted-foreground underline">
              Forgot your password?
            </a>
          </div>
          <MLInput placeholder="Password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <MLButton fullwidth>Login</MLButton>
        <MLButton variant="secondary" fullwidth>
          Login with Google
        </MLButton>
        <p className="mt-4 text-center text-sm text-base-card-foreground">
          Don&apos;t have an account?{' '}
          <a href="#" className="underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  ),
};

export const MeetingNotes: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Meeting Notes</CardTitle>
        <CardDescription>Transcript from the meeting with the client.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm leading-5 text-base-card-foreground">
          <p>Client requested dashboard redesign with focus on mobile responsiveness.</p>
          <br />
          <p>1. New analytics widgets for daily/weekly metrics</p>
          <p>2. Simplified navigation menu</p>
          <p>3. Dark mode support</p>
          <p>4. Timeline: 6 weeks</p>
          <p>5. Follow-up meeting scheduled for next Tuesday</p>
        </div>
      </CardContent>
      <CardFooter>
        <AvatarGroup max={5}>
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            size="md"
            fallback="JD"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
            size="md"
            fallback="SM"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
            size="md"
            fallback="AW"
          />
          <Avatar size="md" fallback="MW" />
          <Avatar size="md" fallback="SD" />
        </AvatarGroup>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Is this an image?</CardTitle>
        <CardDescription>This is a card with an image.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
          alt="Beautiful house"
          className="aspect-video w-full object-cover"
        />
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <MLBadge variant="outline" icon={<Bed className="size-3" />}>
            4
          </MLBadge>
          <MLBadge variant="outline" icon={<Bath className="size-3" />}>
            2
          </MLBadge>
          <MLBadge variant="outline" icon={<LandPlot className="size-3" />}>
            350m²
          </MLBadge>
        </div>
        <span className="font-medium text-base-card-foreground">$135,000</span>
      </CardFooter>
    </Card>
  ),
};

export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <div className="flex flex-col gap-1.5">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </div>
        <CardAction>
          <MLButton variant="outline" size="sm">
            Mark all read
          </MLButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="size-2 mt-2 rounded-full bg-artemis-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-base-foreground">New comment on your post</p>
              <p className="text-sm text-base-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-2 mt-2 rounded-full bg-artemis-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-base-foreground">Your report is ready</p>
              <p className="text-sm text-base-muted-foreground">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-2 mt-2 rounded-full bg-artemis-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-base-foreground">New follower</p>
              <p className="text-sm text-base-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <MLButton variant="ghost" fullwidth>
          View all notifications
        </MLButton>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-base-foreground">Name</label>
            <MLInput placeholder="Project name" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <MLButton variant="outline">Cancel</MLButton>
        <MLButton>Create</MLButton>
      </CardFooter>
    </Card>
  ),
};
