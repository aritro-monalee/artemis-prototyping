import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MLAvatar as Avatar,
  MLAvatarGroup as AvatarGroup,
  type MLAvatarProps as AvatarProps,
} from './index';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
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
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'The shape of the avatar',
    },
    src: {
      control: 'text',
      description: 'The image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (initials) when image fails to load',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User',
    fallback: 'CN',
    size: 'lg',
    shape: 'circle',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
    size: 'lg',
    shape: 'circle',
  },
};

export const Square: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    alt: 'User',
    fallback: 'CN',
    size: 'lg',
    shape: 'square',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="XS" size="xs" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="SM" size="sm" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="MD" size="md" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="LG" size="lg" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="XL" size="xl" />
      <Avatar src="https://github.com/shadcn.png" alt="User" fallback="2X" size="2xl" />
    </div>
  ),
};

export const FallbackSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar fallback="XS" size="xs" />
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
      <Avatar fallback="XL" size="xl" />
      <Avatar fallback="2X" size="2xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup size="lg">
      <Avatar src="https://github.com/shadcn.png" alt="User 1" fallback="CN" />
      <Avatar src="https://github.com/vercel.png" alt="User 2" fallback="VC" />
      <Avatar src="https://github.com/github.png" alt="User 3" fallback="GH" />
    </AvatarGroup>
  ),
};

export const GroupWithMax: Story = {
  render: () => (
    <AvatarGroup size="lg" max={3}>
      <Avatar src="https://github.com/shadcn.png" alt="User 1" fallback="CN" />
      <Avatar src="https://github.com/vercel.png" alt="User 2" fallback="VC" />
      <Avatar src="https://github.com/github.png" alt="User 3" fallback="GH" />
      <Avatar fallback="JD" />
      <Avatar fallback="MK" />
    </AvatarGroup>
  ),
};

export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm">
        <Avatar src="https://github.com/shadcn.png" fallback="CN" />
        <Avatar src="https://github.com/vercel.png" fallback="VC" />
        <Avatar fallback="GH" />
      </AvatarGroup>
      <AvatarGroup size="md">
        <Avatar src="https://github.com/shadcn.png" fallback="CN" />
        <Avatar src="https://github.com/vercel.png" fallback="VC" />
        <Avatar fallback="GH" />
      </AvatarGroup>
      <AvatarGroup size="lg">
        <Avatar src="https://github.com/shadcn.png" fallback="CN" />
        <Avatar src="https://github.com/vercel.png" fallback="VC" />
        <Avatar fallback="GH" />
      </AvatarGroup>
      <AvatarGroup size="xl">
        <Avatar src="https://github.com/shadcn.png" fallback="CN" />
        <Avatar src="https://github.com/vercel.png" fallback="VC" />
        <Avatar fallback="GH" />
      </AvatarGroup>
    </div>
  ),
};

export const MixedWithFallback: Story = {
  render: () => (
    <AvatarGroup size="xl" max={4}>
      <Avatar src="https://github.com/shadcn.png" alt="User 1" fallback="CN" />
      <Avatar src="https://github.com/vercel.png" alt="User 2" fallback="VC" />
      <Avatar fallback="MW" />
      <Avatar fallback="SD" />
      <Avatar fallback="AB" />
      <Avatar fallback="CD" />
    </AvatarGroup>
  ),
};
