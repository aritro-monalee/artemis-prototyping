import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MLInputOTP as InputOTP,
  MLInputOTPGroup as InputOTPGroup,
  MLInputOTPSlot as InputOTPSlot,
  MLInputOTPSeparator as InputOTPSeparator,
  MLInputOTPSimple as InputOTPSimple,
  MLInputOTPDigitsOnly as InputOTPDigitsOnly,
  MLInputOTPWithSeparator as InputOTPWithSeparator,
  MLInputOTPWithSpacing as InputOTPWithSpacing,
} from './index';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  component: InputOTP,
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
type Story = StoryObj<typeof InputOTP>;

// ============================================
// Variant Stories
// ============================================

export const Simple: Story = {
  render: () => <InputOTPSimple />,
};

export const DigitsOnly: Story = {
  render: () => <InputOTPDigitsOnly />,
};

export const WithSeparator: Story = {
  render: () => <InputOTPWithSeparator />,
};

export const WithSpacing: Story = {
  render: () => <InputOTPWithSpacing />,
};

// ============================================
// Custom Configurations
// ============================================

export const FourDigits: Story = {
  render: () => (
    <InputOTP maxLength={4} label="Enter 4-digit code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const EightDigits: Story = {
  render: () => (
    <InputOTP maxLength={8} label="Enter 8-digit code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Disabled: Story = {
  render: () => <InputOTPSimple disabled label="Disabled OTP" />,
};

// ============================================
// Controlled Example
// ============================================

export const Controlled = () => {
  const [value, setValue] = React.useState('');

  return (
    <div className="flex flex-col gap-4 items-center">
      <InputOTP maxLength={6} value={value} onChange={setValue} label="Enter verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        Current value: <span className="font-mono">{value || '(empty)'}</span>
      </p>
      {value.length === 6 && <p className="text-sm text-green-600">Code complete!</p>}
    </div>
  );
};

// ============================================
// Pattern Validation
// ============================================

export const NumericOnly = () => (
  <InputOTP maxLength={6} label="Numbers only" pattern="^[0-9]*$" inputMode="numeric">
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
);

export const AlphanumericOnly = () => (
  <InputOTP maxLength={6} label="Alphanumeric" pattern="^[a-zA-Z0-9]*$">
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
);

// ============================================
// All Variants Overview
// ============================================

export const AllVariants = () => (
  <div className="flex flex-col gap-12 items-center">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Simple (3 + 3)</h3>
      <InputOTPSimple label="Label" />
    </div>
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">Digits Only (6 connected)</h3>
      <InputOTPDigitsOnly label="Label" />
    </div>
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">With Separator (2 + 2 + 2)</h3>
      <InputOTPWithSeparator label="Label" />
    </div>
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-sm font-medium text-muted-foreground">With Spacing (4 separate)</h3>
      <InputOTPWithSpacing label="Label" />
    </div>
  </div>
);
