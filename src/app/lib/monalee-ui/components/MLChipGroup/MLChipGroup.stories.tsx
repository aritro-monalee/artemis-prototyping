import { StoryObj, Meta } from '@storybook/react-vite';
import { MLChipGroup, MLChipItem, type MLChipGroupProps } from '.';

const meta: Meta<typeof MLChipGroup> = {
  title: 'Components/ChipGroup',
  component: MLChipGroup,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  argTypes: {
    displayLimit: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
    },
    chipSize: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    emptyText: {
      control: 'text',
    },
    closable: {
      control: 'boolean',
    },
    onChipRemove: { action: 'chip removed' },
  },
} as Meta;
export default meta;

type Story = StoryObj<MLChipGroupProps>;

const sampleItems = [
  { id: '1', label: 'React' },
  { id: '2', label: 'TypeScript' },
  { id: '3', label: 'JavaScript' },
  { id: '4', label: 'HTML' },
  { id: '5', label: 'CSS' },
  { id: '6', label: 'Node.js' },
];

const sampleItemsWithValues = [
  { id: '1', label: 'React', value: 18 },
  { id: '2', label: 'TypeScript', value: 12 },
  { id: '3', label: 'JavaScript', value: 24 },
  { id: '4', label: 'HTML', value: 8 },
  { id: '5', label: 'CSS', value: 6 },
  { id: '6', label: 'Node.js', value: 15 },
];

const sampleItemsWithColors: MLChipItem[] = [
  { id: '1', label: 'React', color: 'default' },
  { id: '2', label: 'TypeScript', color: 'black' },
  { id: '4', label: 'HTML', color: 'default' },
  { id: '5', label: 'CSS', color: 'black' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    displayLimit: 3,
    chipSize: 'md',
  },
};

export const WithValues: Story = {
  args: {
    items: sampleItemsWithValues,
    displayLimit: 3,
    chipSize: 'md',
  },
};

export const WithDifferentColors: Story = {
  args: {
    items: sampleItemsWithColors,
    displayLimit: 3,
    chipSize: 'md',
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    displayLimit: 2,
    chipSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    items: sampleItems,
    displayLimit: 2,
    chipSize: 'md',
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    displayLimit: 2,
    chipSize: 'lg',
  },
};

export const ClosableChips: Story = {
  args: {
    items: sampleItems,
    displayLimit: 3,
    chipSize: 'md',
    closable: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyText: 'No items selected',
  },
};

export const ShowAllItems: Story = {
  args: {
    items: sampleItems,
    displayLimit: 10,
    chipSize: 'md',
  },
};

export const MixedContent: Story = {
  args: {
    items: [
      { id: '1', label: 'React', value: 18, color: 'default' },
      { id: '2', label: 'TypeScript', color: 'black' },
      { id: '4', label: 'HTML' },
      { id: '5', label: 'CSS', value: 6 },
      { id: '6', label: 'Node.js', color: 'default' },
    ],
    displayLimit: 3,
    chipSize: 'md',
  },
};
