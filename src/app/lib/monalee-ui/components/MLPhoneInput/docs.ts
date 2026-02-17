export const examples = {
  Default: `<MLPhoneInput placeholder="Enter your phone number" />`,

  WithDefaultCountry: `<MLPhoneInput placeholder="Enter your phone number" defaultCountry="GB" />`,

  WithDefaultValue: `<MLPhoneInput defaultValue="+14155552671" />`,

  WithoutCountrySelector: `<MLPhoneInput
  placeholder="Enter your phone number"
  showCountrySelector={false}
  defaultCountry="US"
/>`,

  EnabledCountriesUSAndChile: `<MLPhoneInput
  placeholder="Enter your phone number"
  enabledCountries={['US', 'CL']}
  defaultCountry="US"
/>`,

  EnabledCountriesEurope: `<MLPhoneInput
  placeholder="Enter your phone number"
  enabledCountries={['FR', 'DE', 'IT', 'ES', 'GB', 'NL', 'BE', 'PT']}
  defaultCountry="FR"
/>`,

  Disabled: `<MLPhoneInput
  placeholder="Enter your phone number"
  disabled
  defaultValue="+14155552671"
/>`,

  Controlled: `const [phone, setPhone] = useState('+14155552671');

<MLPhoneInput
  placeholder="Enter your phone number"
  value={phone}
  onChange={(phoneNumber) => setPhone(phoneNumber || '')}
/>`,

  InternationalNumbers: `<div className="flex flex-col gap-6">
  <MLPhoneInput placeholder="US Number" defaultValue="+14155552671" />
  <MLPhoneInput placeholder="UK Number" defaultValue="+442071838750" />
  <MLPhoneInput placeholder="German Number" defaultValue="+4930123456" />
  <MLPhoneInput placeholder="French Number" defaultValue="+33142648235" />
</div>`,

  InternationalizedSpanish: `<MLPhoneInput
  placeholder="Ingrese su número de teléfono"
  searchPlaceholder="Buscar país..."
  emptyMessage="No se encontró ningún país."
  defaultCountry="CL"
/>`,

  WithLabel: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  defaultCountry="US"
/>`,

  WithLabelAndTooltip: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  labelTooltip="Enter your phone number with country code"
  defaultCountry="US"
/>`,

  Required: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  required
  defaultCountry="US"
/>`,

  WithError: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  error="Invalid phone number format"
  defaultValue="+1234"
  defaultCountry="US"
/>`,

  WithDescription: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  description="We will send a verification code to this number"
  defaultCountry="US"
/>`,

  SmallSize: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  size="sm"
  defaultCountry="US"
/>`,

  MediumSize: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  size="md"
  defaultCountry="US"
/>`,

  LargeSize: `<MLPhoneInput
  placeholder="Enter your phone number"
  label="Phone Number"
  size="lg"
  defaultCountry="US"
/>`,
};
