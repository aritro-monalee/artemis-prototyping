import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLSectionTitle, type MLSectionTitleProps } from './index';

const meta: Meta<typeof MLSectionTitle> = {
  title: 'Components/SectionTitle',
  component: MLSectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text to display',
    },
  },
};

export default meta;

type Story = StoryObj<MLSectionTitleProps>;

export const Default: Story = {
  args: {
    title: 'Section Title',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithContent: Story = {
  render: () => (
    <div style={{ width: '400px' }} className="space-y-4">
      <MLSectionTitle title="Personal Information" />
      <p className="text-sm text-gray-600">Fill in your personal details below.</p>

      <MLSectionTitle title="Account Settings" />
      <p className="text-sm text-gray-600">Manage your account preferences.</p>
    </div>
  ),
};
