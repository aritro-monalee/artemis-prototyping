import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLInput, type MLInputProps } from './index';
import { Search, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { MLButton } from '../MLButton';

const meta: Meta<typeof MLInput> = {
  title: 'Components/Input',
  component: MLInput,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'number', 'email', 'password', 'date', 'file'] },
    value: { control: 'text' },
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    description: { control: 'text' },
    horizontalLayout: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<MLInputProps>;

// ============================================
// Basic States
// ============================================

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    description: 'This is an input description.',
  },
};

export const Focus: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    description: 'This is an input description.',
    autoFocus: true,
  },
};

export const Filled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    defaultValue: 'john@example.com',
    description: 'This is an input description.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    disabled: true,
    description: 'This is an input description.',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    error: 'Please enter a valid email address.',
    description: 'This is an input description.',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    description: 'This field is required.',
  },
};

// ============================================
// Horizontal Layout
// ============================================

export const HorizontalLayout: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    description: 'This is an input description.',
    horizontalLayout: true,
  },
};

export const HorizontalLayoutFocus: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    description: 'This is an input description.',
    horizontalLayout: true,
    autoFocus: true,
  },
};

export const HorizontalLayoutFilled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    defaultValue: 'john@example.com',
    description: 'This is an input description.',
    horizontalLayout: true,
  },
};

export const HorizontalLayoutDisabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    disabled: true,
    description: 'This is an input description.',
    horizontalLayout: true,
  },
};

export const HorizontalLayoutError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Placeholder',
    error: 'Please enter a valid email.',
    description: 'This is an input description.',
    horizontalLayout: true,
  },
};

// ============================================
// File Input
// ============================================

export const FileInput: Story = {
  args: {
    label: 'Upload File',
    type: 'file',
    description: 'This is an input description.',
  },
};

export const FileInputHorizontal: Story = {
  args: {
    label: 'File',
    type: 'file',
    description: 'This is an input description.',
    horizontalLayout: true,
  },
};

// ============================================
// With Icons
// ============================================

export const WithSearchIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    prefix: <Search className="size-4" />,
  },
};

export const WithEmailIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    prefix: <Mail className="size-4" />,
  },
};

export const WithUserIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    prefix: <User className="size-4" />,
  },
};

export const WithPhoneIcon: Story = {
  args: {
    label: 'Phone',
    placeholder: '+1 (555) 000-0000',
    prefix: <Phone className="size-4" />,
  },
};

// ============================================
// Password Input
// ============================================

export const PasswordWithToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MLInput
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      prefix={<Lock className="size-4" />}
      suffix={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="pointer-events-auto cursor-pointer hover:text-base-foreground transition-colors"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
      suffixClassNames="pointer-events-auto"
      description="Password must be at least 8 characters."
    />
  );
};

// ============================================
// Sizes
// ============================================

export const SizeSmall: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

// ============================================
// Input + Button Pattern
// ============================================

export const InputWithButton = () => (
  <div className="flex gap-2 items-start max-w-[350px]">
    <MLInput placeholder="Placeholder" className="flex-1" />
    <MLButton>Button</MLButton>
  </div>
);

export const EmailSubscription = () => (
  <div className="flex gap-2 items-start max-w-[400px]">
    <MLInput
      placeholder="Enter your email"
      type="email"
      prefix={<Mail className="size-4" />}
      className="flex-1"
    />
    <MLButton>Subscribe</MLButton>
  </div>
);

export const SearchWithButton = () => (
  <div className="flex gap-2 items-start max-w-[400px]">
    <MLInput placeholder="Search..." prefix={<Search className="size-4" />} className="flex-1" />
    <MLButton>Search</MLButton>
  </div>
);

// ============================================
// Form Examples
// ============================================

export const LoginForm = () => (
  <div className="flex flex-col gap-4 max-w-[373px]">
    <MLInput
      label="Email"
      type="email"
      placeholder="Enter your email"
      prefix={<Mail className="size-4" />}
      required
    />
    <MLInput
      label="Password"
      type="password"
      placeholder="Enter your password"
      prefix={<Lock className="size-4" />}
      required
    />
    <MLButton className="w-full mt-2">Sign In</MLButton>
  </div>
);

export const ContactForm = () => (
  <div className="flex flex-col gap-4 max-w-[373px]">
    <div className="grid grid-cols-2 gap-4">
      <MLInput label="First Name" placeholder="John" required />
      <MLInput label="Last Name" placeholder="Doe" required />
    </div>
    <MLInput label="Email" type="email" placeholder="john@example.com" required />
    <MLInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
    <MLButton className="w-full mt-2">Submit</MLButton>
  </div>
);

export const HorizontalForm = () => (
  <div className="flex flex-col gap-4 max-w-[400px]">
    <MLInput label="Name" placeholder="Enter your name" horizontalLayout labelWidth="100px" />
    <MLInput
      label="Email"
      type="email"
      placeholder="Enter your email"
      horizontalLayout
      labelWidth="100px"
    />
    <MLInput
      label="Phone"
      type="tel"
      placeholder="Enter your phone"
      horizontalLayout
      labelWidth="100px"
    />
  </div>
);

// ============================================
// Special Input Types
// ============================================

export const NumberInput: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};

export const DateInput: Story = {
  args: {
    label: 'Date',
    type: 'date',
  },
};

export const ColorInput: Story = {
  args: {
    label: 'Color',
    type: 'color',
    defaultValue: '#6e04bd',
    className: 'max-w-[150px]',
  },
};

// ============================================
// Controlled vs Uncontrolled
// ============================================

export const Controlled = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    if (!email) {
      setError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-[373px]">
      <MLInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validateEmail(e.target.value);
        }}
        error={error}
        description="We'll validate your email as you type."
      />
      <p className="text-sm text-muted-foreground">Current value: {value || '(empty)'}</p>
    </div>
  );
};

export const Uncontrolled = () => (
  <MLInput
    label="Uncontrolled Input"
    description="This input manages its own state internally."
    defaultValue="Initial value"
    className="max-w-[373px]"
  />
);

// ============================================
// All States Overview
// ============================================

export const AllStates = () => (
  <div className="flex flex-col gap-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Vertical Layout</h3>
      <div className="grid grid-cols-2 gap-6 max-w-[800px]">
        <MLInput
          label="Default"
          placeholder="Placeholder"
          description="This is an input description."
        />
        <MLInput
          label="Filled"
          defaultValue="john@example.com"
          description="This is an input description."
        />
        <MLInput
          label="Disabled"
          placeholder="Placeholder"
          disabled
          description="This is an input description."
        />
        <MLInput
          label="Error"
          placeholder="Placeholder"
          error="Please enter a valid value."
          description="This is an input description."
        />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
      <div className="flex flex-col gap-4 max-w-[400px]">
        <MLInput
          label="Default"
          placeholder="Placeholder"
          description="This is an input description."
          horizontalLayout
        />
        <MLInput
          label="Filled"
          defaultValue="john@example.com"
          description="This is an input description."
          horizontalLayout
        />
        <MLInput
          label="Disabled"
          placeholder="Placeholder"
          disabled
          description="This is an input description."
          horizontalLayout
        />
        <MLInput
          label="Error"
          placeholder="Placeholder"
          error="Please enter a valid value."
          description="This is an input description."
          horizontalLayout
        />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">File Input</h3>
      <div className="grid grid-cols-2 gap-6 max-w-[800px]">
        <MLInput label="Default" type="file" description="This is an input description." />
        <MLInput
          label="Disabled"
          type="file"
          disabled
          description="This is an input description."
        />
      </div>
    </div>
  </div>
);
