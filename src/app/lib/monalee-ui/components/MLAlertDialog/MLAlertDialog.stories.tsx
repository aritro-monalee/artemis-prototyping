import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MLAlertDialog as AlertDialog,
  MLAlertDialogTrigger as AlertDialogTrigger,
  MLAlertDialogContent as AlertDialogContent,
  MLAlertDialogHeader as AlertDialogHeader,
  MLAlertDialogFooter as AlertDialogFooter,
  MLAlertDialogTitle as AlertDialogTitle,
  MLAlertDialogDescription as AlertDialogDescription,
  MLAlertDialogAction as AlertDialogAction,
  MLAlertDialogCancel as AlertDialogCancel,
  type MLAlertDialogProps as AlertDialogProps,
} from './index';
import { MLButton } from '../MLButton';

const meta: Meta<AlertDialogProps> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
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
type Story = StoryObj<AlertDialogProps>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="outline">Delete Account</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="destructive">Delete Project</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the project &quot;My Awesome Project&quot; and all
            associated data. This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="outline">Terms and Conditions</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Service</AlertDialogTitle>
          <AlertDialogDescription className="max-h-80 overflow-y-auto">
            <p className="mb-4">
              By using this service, you agree to be bound by these terms and conditions. Please
              read them carefully before proceeding.
            </p>
            <p className="mb-4">
              <strong>1. Acceptance of Terms</strong>
              <br />
              By accessing and using this service, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
            <p className="mb-4">
              <strong>2. Use License</strong>
              <br />
              Permission is granted to temporarily use this service for personal, non-commercial
              transitory viewing only.
            </p>
            <p className="mb-4">
              <strong>3. Disclaimer</strong>
              <br />
              The materials on this service are provided on an &apos;as is&apos; basis. We make no
              warranties, expressed or implied.
            </p>
            <p>
              <strong>4. Limitations</strong>
              <br />
              In no event shall we be liable for any damages arising out of the use or inability to
              use the materials on this service.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const ConfirmSubscription: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="default">Upgrade Plan</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to Pro?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to upgrade to the Pro plan at $29/month. Your card ending in 4242 will be
            charged immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm Upgrade</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="ghost">Sign Out</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will need to sign in again to access your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DiscardChanges: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MLButton variant="outline">Close Editor</MLButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes that will be lost if you close the editor. Are you sure you
            want to discard them?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
            Discard changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
