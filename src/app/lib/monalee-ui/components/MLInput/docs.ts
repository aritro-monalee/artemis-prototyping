export const examples = {
  Default: `<MLInput
  label="Email"
  placeholder="Placeholder"
  description="This is an input description."
/>`,

  Focus: `<MLInput
  label="Email"
  placeholder="Placeholder"
  description="This is an input description."
  autoFocus
/>`,

  Filled: `<MLInput
  label="Email"
  placeholder="Placeholder"
  defaultValue="john@example.com"
  description="This is an input description."
/>`,

  Disabled: `<MLInput
  label="Email"
  placeholder="Placeholder"
  disabled
  description="This is an input description."
/>`,

  Error: `<MLInput
  label="Email"
  placeholder="Placeholder"
  error="Please enter a valid email address."
  description="This is an input description."
/>`,

  Required: `<MLInput
  label="Email"
  placeholder="Enter your email"
  required
  description="This field is required."
/>`,

  HorizontalLayout: `<MLInput
  label="Email"
  placeholder="Placeholder"
  description="This is an input description."
  horizontalLayout
/>`,

  FileInput: `<MLInput
  label="Upload File"
  type="file"
  description="This is an input description."
/>`,

  WithSearchIcon: `<MLInput
  label="Search"
  placeholder="Search..."
  prefix={<Search className="size-4" />}
/>`,

  WithEmailIcon: `<MLInput
  label="Email"
  placeholder="Enter your email"
  prefix={<Mail className="size-4" />}
/>`,

  PasswordWithToggle: `const [showPassword, setShowPassword] = useState(false);

<MLInput
  label="Password"
  type={showPassword ? 'text' : 'password'}
  placeholder="Enter your password"
  prefix={<Lock className="size-4" />}
  suffix={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  }
  description="Password must be at least 8 characters."
/>`,

  SizeSmall: `<MLInput label="Small Input" placeholder="Small size" size="sm" />`,

  SizeMedium: `<MLInput label="Medium Input" placeholder="Medium size" size="md" />`,

  SizeLarge: `<MLInput label="Large Input" placeholder="Large size" size="lg" />`,

  InputWithButton: `<div className="flex gap-2 items-start">
  <MLInput placeholder="Placeholder" className="flex-1" />
  <MLButton>Button</MLButton>
</div>`,

  EmailSubscription: `<div className="flex gap-2 items-start">
  <MLInput
    placeholder="Enter your email"
    type="email"
    prefix={<Mail className="size-4" />}
    className="flex-1"
  />
  <MLButton>Subscribe</MLButton>
</div>`,

  LoginForm: `<div className="flex flex-col gap-4">
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
</div>`,

  ContactForm: `<div className="flex flex-col gap-4">
  <div className="grid grid-cols-2 gap-4">
    <MLInput label="First Name" placeholder="John" required />
    <MLInput label="Last Name" placeholder="Doe" required />
  </div>
  <MLInput label="Email" type="email" placeholder="john@example.com" required />
  <MLInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
  <MLButton className="w-full mt-2">Submit</MLButton>
</div>`,

  Controlled: `const [value, setValue] = useState('');
const [error, setError] = useState('');

const validateEmail = (email: string) => {
  if (!email) setError('Email is required');
  else if (!/\\S+@\\S+\\.\\S+/.test(email)) setError('Please enter a valid email');
  else setError('');
};

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
/>`,

  NumberInput: `<MLInput label="Quantity" type="number" placeholder="0" min={0} max={100} />`,

  DateInput: `<MLInput label="Date" type="date" />`,
};
