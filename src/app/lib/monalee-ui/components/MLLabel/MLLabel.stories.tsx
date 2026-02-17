import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLLabel } from './MLLabel';
import { MLInput } from '../MLInput';

const meta: Meta<typeof MLLabel> = {
  title: 'Components/MLLabel',
  component: MLLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Shows required indicator (*)',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MLLabel>;

export const Default: Story = {
  args: {
    children: 'Email address',
  },
};

export const Required: Story = {
  args: {
    children: 'Full name',
    required: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <MLLabel htmlFor="email">Email address</MLLabel>
      <MLInput id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const RequiredWithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <MLLabel htmlFor="name" required>
        Full name
      </MLLabel>
      <MLInput id="name" placeholder="Enter your full name" />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="flex flex-col gap-2">
        <MLLabel htmlFor="firstName" required>
          First name
        </MLLabel>
        <MLInput id="firstName" placeholder="John" />
      </div>
      <div className="flex flex-col gap-2">
        <MLLabel htmlFor="lastName" required>
          Last name
        </MLLabel>
        <MLInput id="lastName" placeholder="Doe" />
      </div>
      <div className="flex flex-col gap-2">
        <MLLabel htmlFor="nickname">Nickname (optional)</MLLabel>
        <MLInput id="nickname" placeholder="Johnny" />
      </div>
    </div>
  ),
};
