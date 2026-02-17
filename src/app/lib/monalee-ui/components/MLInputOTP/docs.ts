export const examples = {
  Simple: `<MLInputOTPSimple />`,

  DigitsOnly: `<MLInputOTPDigitsOnly />`,

  WithSeparator: `<MLInputOTPWithSeparator />`,

  WithSpacing: `<MLInputOTPWithSpacing />`,

  FourDigits: `<MLInputOTP maxLength={4} label="Enter 4-digit code">
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
    <MLInputOTPSlot index={3} />
  </MLInputOTPGroup>
</MLInputOTP>`,

  EightDigits: `<MLInputOTP maxLength={8} label="Enter 8-digit code">
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
    <MLInputOTPSlot index={3} />
  </MLInputOTPGroup>
  <MLInputOTPSeparator />
  <MLInputOTPGroup>
    <MLInputOTPSlot index={4} />
    <MLInputOTPSlot index={5} />
    <MLInputOTPSlot index={6} />
    <MLInputOTPSlot index={7} />
  </MLInputOTPGroup>
</MLInputOTP>`,

  NoLabel: `<MLInputOTP maxLength={6}>
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
  </MLInputOTPGroup>
  <MLInputOTPSeparator />
  <MLInputOTPGroup>
    <MLInputOTPSlot index={3} />
    <MLInputOTPSlot index={4} />
    <MLInputOTPSlot index={5} />
  </MLInputOTPGroup>
</MLInputOTP>`,

  Disabled: `<MLInputOTPSimple disabled label="Disabled OTP" />`,

  Controlled: `const [value, setValue] = useState('');

<MLInputOTP maxLength={6} value={value} onChange={setValue} label="Enter verification code">
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
  </MLInputOTPGroup>
  <MLInputOTPSeparator />
  <MLInputOTPGroup>
    <MLInputOTPSlot index={3} />
    <MLInputOTPSlot index={4} />
    <MLInputOTPSlot index={5} />
  </MLInputOTPGroup>
</MLInputOTP>`,

  NumericOnly: `<MLInputOTP maxLength={6} label="Numbers only" pattern="^[0-9]*$" inputMode="numeric">
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
    <MLInputOTPSlot index={3} />
    <MLInputOTPSlot index={4} />
    <MLInputOTPSlot index={5} />
  </MLInputOTPGroup>
</MLInputOTP>`,

  AlphanumericOnly: `<MLInputOTP maxLength={6} label="Alphanumeric" pattern="^[a-zA-Z0-9]*$">
  <MLInputOTPGroup>
    <MLInputOTPSlot index={0} />
    <MLInputOTPSlot index={1} />
    <MLInputOTPSlot index={2} />
  </MLInputOTPGroup>
  <MLInputOTPSeparator />
  <MLInputOTPGroup>
    <MLInputOTPSlot index={3} />
    <MLInputOTPSlot index={4} />
    <MLInputOTPSlot index={5} />
  </MLInputOTPGroup>
</MLInputOTP>`,
};
