import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { MLTable, type MLTableProps } from './index';
import { MLButton } from '../MLButton/MLButton';

const meta: Meta<typeof MLTable> = {
  title: 'Components/Table',
  component: MLTable,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FEFBF7' },
        { name: 'dark', value: '#000' },
      ],
    },
    docs: {
      description: {
        component:
          'A versatile table component for displaying tabular data with optional sorting, pagination, and drag-and-drop reordering.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    columns: {
      control: 'object',
    },
    dataSource: {
      control: 'object',
    },
    showArrow: {
      control: 'boolean',
    },
    pagination: {
      control: 'object',
    },
    onRowClick: {
      action: 'onRowClick',
    },
    draggable: {
      control: 'boolean',
    },
    onReorder: {
      action: 'onReorder',
    },
  },
};

export default meta;
type Story = StoryObj<MLTableProps>;

const columns = [
  { title: 'Lead Name', dataIndex: 'lead_name', key: 'lead_name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Rep', dataIndex: 'rep', key: 'rep' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Created', dataIndex: 'created', key: 'created' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const dataSource = [
  {
    key: '1',
    lead_name: 'John Doe',
    email: 'john.doe@monalee.co',
    rep: 'John Doe',
    address: '123 Main St, Anytown, USA',
    created: '2021-01-01',
    status: 'New',
  },
  {
    key: '2',
    lead_name: 'Jane Doe',
    email: 'jane.doe@monalee.co',
    rep: 'Jane Doe',
    address: '123 Main St, Anytown, USA',
    created: '2021-01-01',
    status: 'New',
  },
  {
    key: '3',
    lead_name: 'John Smith',
    email: 'john.smith@monalee.co',
    rep: 'John Smith',
    address: '123 Main St, Anytown, USA',
    created: '2021-01-01',
    status: 'New',
  },
];

export const Default: Story = {
  args: {
    columns,
    dataSource,
    showArrow: true,
  },
};

export const SmallSize: Story = {
  args: {
    columns,
    dataSource,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    columns,
    dataSource,
    size: 'lg',
  },
};

export const TableWithPagination: Story = {
  args: {
    columns,
    dataSource,
    showArrow: true,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 100,
    },
  },
};

export const EmptyTable: Story = {
  args: {
    columns: columns.filter((col) => col.dataIndex !== 'email'),
    dataSource: [],
    showArrow: true,
  },
};

export const DraggableTable: Story = {
  args: {
    columns,
    dataSource,
    showArrow: true,
    draggable: true,
  },
};

export const DraggableTableWithHandle: Story = {
  args: {
    columns,
    dataSource,
    showArrow: true,
    draggable: true,
    dragHandle: '⋮⋮',
  },
};

// Data Table style example (like shadcn Data Table)
const DataTableExample = () => {
  const [data] = useState([
    { key: '1', status: 'Success', email: 'david291@gmail.com', amount: '$2,173.52' },
    { key: '2', status: 'Success', email: 'k.r.mastrangelo@outlook.com', amount: '$2,839.41' },
    { key: '3', status: 'Processing', email: 'c_j_mccoy@gmail.com', amount: '$6,222.27' },
    { key: '4', status: 'Success', email: 's.t.sharkey@outlook.com', amount: '$4,171.32' },
    { key: '5', status: 'Failed', email: 'patricia651@outlook.com', amount: '$2,012.93' },
  ]);

  const dataTableColumns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'min-w-[80px]',
    },
    {
      title: (
        <button className="flex items-center gap-2 hover:bg-cream-100 px-4 py-2 -mx-2 rounded-md transition-colors">
          Email
          <ArrowUpDown className="size-4" />
        </button>
      ),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'text-right',
      render: (value: string) => <span className="text-right block">{value}</span>,
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      className: 'w-16',
      render: () => (
        <button className="p-2 hover:bg-cream-100 rounded-md transition-colors">
          <MoreHorizontal className="size-4 text-base-muted-foreground" />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[833px]">
      <div className="flex items-center justify-between py-4">
        <input
          type="text"
          placeholder="Filter emails..."
          className="h-9 w-full max-w-[384px] rounded-md border border-base-border bg-base-input-background px-3 py-1 text-sm shadow-xs placeholder:text-base-muted-foreground focus:outline-none focus:ring-2 focus:ring-base-ring"
        />
        <MLButton variant="outline" size="sm">
          Columns
        </MLButton>
      </div>
      <MLTable columns={dataTableColumns} dataSource={data} size="md" />
      <div className="flex items-center justify-between py-4">
        <span className="text-sm text-base-muted-foreground">0 of 5 row(s) selected.</span>
        <div className="flex gap-2">
          <MLButton variant="outline" size="sm" disabled>
            Previous
          </MLButton>
          <MLButton variant="outline" size="sm" disabled>
            Next
          </MLButton>
        </div>
      </div>
    </div>
  );
};

export const DataTableStyle: Story = {
  render: () => <DataTableExample />,
};
