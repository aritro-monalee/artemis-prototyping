export const examples = {
  Default: `const columns = [
  { title: 'Lead Name', dataIndex: 'lead_name', key: 'lead_name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Rep', dataIndex: 'rep', key: 'rep' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Created', dataIndex: 'created', key: 'created' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const dataSource = [
  { key: '1', lead_name: 'John Doe', email: 'john@example.com', rep: 'John Doe', address: '123 Main St', created: '2021-01-01', status: 'New' },
  { key: '2', lead_name: 'Jane Doe', email: 'jane@example.com', rep: 'Jane Doe', address: '123 Main St', created: '2021-01-01', status: 'New' },
  { key: '3', lead_name: 'John Smith', email: 'smith@example.com', rep: 'John Smith', address: '123 Main St', created: '2021-01-01', status: 'New' },
];

<MLTable columns={columns} dataSource={dataSource} showArrow />`,

  SmallSize: `<MLTable columns={columns} dataSource={dataSource} size="sm" />`,

  LargeSize: `<MLTable columns={columns} dataSource={dataSource} size="lg" />`,

  TableWithPagination: `<MLTable
  columns={columns}
  dataSource={dataSource}
  showArrow
  pagination={{
    current: 1,
    pageSize: 10,
    total: 100,
  }}
/>`,

  EmptyTable: `<MLTable columns={columns} dataSource={[]} showArrow />`,

  DraggableTable: `<MLTable columns={columns} dataSource={dataSource} showArrow draggable />`,

  DraggableTableWithHandle: `<MLTable
  columns={columns}
  dataSource={dataSource}
  showArrow
  draggable
  dragHandle="⋮⋮"
/>`,

  DataTableStyle: `const dataTableColumns = [
  { title: 'Status', dataIndex: 'status', key: 'status' },
  {
    title: (
      <button className="flex items-center gap-2 hover:bg-cream-100 px-4 py-2 -mx-2 rounded-md">
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
    render: (value) => <span className="text-right block">{value}</span>,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    className: 'w-16',
    render: () => (
      <button className="p-2 hover:bg-cream-100 rounded-md">
        <MoreHorizontal className="size-4" />
      </button>
    ),
  },
];

const data = [
  { key: '1', status: 'Success', email: 'david291@gmail.com', amount: '$2,173.52' },
  { key: '2', status: 'Success', email: 'k.r.mastrangelo@outlook.com', amount: '$2,839.41' },
  { key: '3', status: 'Processing', email: 'c_j_mccoy@gmail.com', amount: '$6,222.27' },
];

<MLTable columns={dataTableColumns} dataSource={data} size="md" />`,
};
