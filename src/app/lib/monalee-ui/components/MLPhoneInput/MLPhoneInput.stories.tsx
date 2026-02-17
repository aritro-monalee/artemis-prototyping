import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLPhoneInput } from './MLPhoneInput';
import { MLInput } from '../MLInput';
import { MLSelect } from '../MLSelect';

const meta: Meta<typeof MLPhoneInput> = {
  title: 'Components/PhoneInput',
  component: MLPhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => undefined,
    onCountryChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your phone number',
  },
};

export const WithDefaultCountry: Story = {
  args: {
    placeholder: 'Enter your phone number',
    defaultCountry: 'GB',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '+14155552671',
  },
};

export const WithoutCountrySelector: Story = {
  args: {
    placeholder: 'Enter your phone number',
    showCountrySelector: false,
    defaultCountry: 'US',
  },
};

export const EnabledCountriesUSAndChile: Story = {
  args: {
    placeholder: 'Enter your phone number',
    enabledCountries: ['US', 'CL'],
    defaultCountry: 'US',
  },
};

export const EnabledCountriesEurope: Story = {
  args: {
    placeholder: 'Enter your phone number',
    enabledCountries: ['FR', 'DE', 'IT', 'ES', 'GB', 'NL', 'BE', 'PT'],
    defaultCountry: 'FR',
  },
};

export const EnabledCountriesWithoutSelector: Story = {
  args: {
    placeholder: 'Enter your phone number',
    enabledCountries: ['US', 'CL'],
    showCountrySelector: false,
    defaultCountry: 'CL',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your phone number',
    disabled: true,
    defaultValue: '+14155552671',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [phone, setPhone] = useState('+14155552671');

    return (
      <div className="flex flex-col gap-4">
        <MLPhoneInput
          {...args}
          value={phone}
          onChange={(phoneNumber) => {
            setPhone(phoneNumber || '');
            console.log('Phone:', phoneNumber);
          }}
        />
        <div className="text-sm text-muted-foreground">
          <div>Value: {phone}</div>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Enter your phone number',
  },
};

export const InternationalNumbers: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <MLPhoneInput placeholder="US Number" defaultValue="+14155552671" />
        <MLPhoneInput placeholder="UK Number" defaultValue="+442071838750" />
        <MLPhoneInput placeholder="German Number" defaultValue="+4930123456" />
        <MLPhoneInput placeholder="French Number" defaultValue="+33142648235" />
        <MLPhoneInput placeholder="Australian Number" defaultValue="+61291234567" />
      </div>
    );
  },
};

export const InternationalizedSpanish: Story = {
  args: {
    placeholder: 'Ingrese su número de teléfono',
    searchPlaceholder: 'Buscar país...',
    emptyMessage: 'No se encontró ningún país.',
    defaultCountry: 'CL',
  },
};

export const InternationalizedFrench: Story = {
  args: {
    placeholder: 'Entrez votre numéro de téléphone',
    searchPlaceholder: 'Rechercher un pays...',
    emptyMessage: 'Aucun pays trouvé.',
    defaultCountry: 'FR',
  },
};

export const InternationalizedGerman: Story = {
  args: {
    placeholder: 'Geben Sie Ihre Telefonnummer ein',
    searchPlaceholder: 'Land suchen...',
    emptyMessage: 'Kein Land gefunden.',
    defaultCountry: 'DE',
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    defaultCountry: 'US',
  },
};

export const WithLabelAndTooltip: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    labelTooltip: 'Enter your phone number with country code',
    defaultCountry: 'US',
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    required: true,
    defaultCountry: 'US',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    error: 'Invalid phone number format',
    defaultValue: '+1234',
    defaultCountry: 'US',
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    description: 'We will send a verification code to this number',
    defaultCountry: 'US',
  },
};

export const WithErrorAndDescription: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    error: 'Invalid phone number format',
    description: 'Please enter a valid phone number',
    defaultValue: '+1234',
    defaultCountry: 'US',
  },
};

export const SmallSize: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    size: 'sm',
    defaultCountry: 'US',
  },
};

export const MediumSize: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    size: 'md',
    defaultCountry: 'US',
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    size: 'lg',
    defaultCountry: 'US',
  },
};

export const WithInvalidCountries: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    enabledCountries: ['US', 'CL', 'INVALID', 'XX', 'GB', 'FAKE'],
    defaultCountry: 'US',
    description: 'Check console for validation warnings',
  },
};

export const MultipleFieldsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  });

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CL', label: 'Chile' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
  ];

  return (
    <div className="w-full max-w-2xl space-y-6 p-4">
      <h2 className="text-2xl font-bold">Contact Information Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MLInput
          label="First Name"
          placeholder="Enter first name"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <MLInput
          label="Last Name"
          placeholder="Enter last name"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <MLInput
        label="Email"
        placeholder="Enter email address"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        description="We'll never share your email with anyone else."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MLSelect
          label="Country"
          placeholder="Select country"
          fullwidth
          required
          options={countryOptions}
          value={countryOptions.find((c) => c.value === formData.country) || null}
          onChange={(option) => setFormData({ ...formData, country: option?.value || '' })}
        />

        <MLPhoneInput
          label="Phone Number"
          placeholder="Enter phone number"
          required
          value={formData.phone}
          onChange={(phone) => setFormData({ ...formData, phone })}
          defaultCountry="US"
          enabledCountries={['US', 'CL', 'GB', 'FR', 'DE']}
          description="Include your country code"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Form Data:</h3>
        <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};
