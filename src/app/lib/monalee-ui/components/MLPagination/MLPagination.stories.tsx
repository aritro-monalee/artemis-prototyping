import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MLPagination, type MLPaginationProps } from './index';

const meta: Meta<typeof MLPagination> = {
  title: 'Components/Pagination',
  component: MLPagination,
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
  argTypes: {
    current: {
      control: 'number',
      description: 'The current page number',
    },
    pageSize: {
      control: 'number',
      description: 'The number of items per page',
    },
    total: {
      control: 'number',
      description: 'The total number of items',
    },
  },
};

export default meta;
type Story = StoryObj<MLPaginationProps>;

// ============================================
// Basic Stories
// ============================================

export const Default: Story = {
  args: {
    current: 2,
    pageSize: 10,
    total: 50,
  },
};

export const FirstPage: Story = {
  args: {
    current: 1,
    pageSize: 10,
    total: 50,
  },
};

export const LastPage: Story = {
  args: {
    current: 5,
    pageSize: 10,
    total: 50,
  },
};

export const MiddlePage: Story = {
  args: {
    current: 3,
    pageSize: 10,
    total: 50,
  },
};

// ============================================
// Different Page Counts
// ============================================

export const FewPages: Story = {
  args: {
    current: 1,
    pageSize: 10,
    total: 30,
  },
};

export const ManyPages: Story = {
  args: {
    current: 5,
    pageSize: 10,
    total: 200,
  },
};

export const SinglePage: Story = {
  args: {
    current: 1,
    pageSize: 10,
    total: 10,
  },
};

// ============================================
// Controlled Example
// ============================================

export const Controlled = () => {
  const [page, setPage] = React.useState(1);
  const total = 100;
  const pageSize = 10;
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col gap-4 items-center">
      <MLPagination current={page} pageSize={pageSize} total={total} onChange={setPage} />
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium">{page}</span> of{' '}
        <span className="font-medium">{pageCount}</span>
      </p>
    </div>
  );
};

// ============================================
// With Data Table
// ============================================

export const WithDataExample = () => {
  const [page, setPage] = React.useState(1);
  const pageSize = 5;
  const data = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));
  const total = data.length;
  const pageCount = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="border border-base-border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-t border-base-border">
                <td className="px-4 py-2 text-sm">{item.id}</td>
                <td className="px-4 py-2 text-sm">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, total)} of {total}
        </span>
        <span>
          Page {page} of {pageCount}
        </span>
      </div>
      <MLPagination current={page} pageSize={pageSize} total={total} onChange={setPage} />
    </div>
  );
};
