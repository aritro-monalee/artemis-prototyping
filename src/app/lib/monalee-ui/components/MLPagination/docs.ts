export const examples = {
  Default: `<MLPagination current={2} pageSize={10} total={50} />`,

  FirstPage: `<MLPagination current={1} pageSize={10} total={50} />`,

  LastPage: `<MLPagination current={5} pageSize={10} total={50} />`,

  MiddlePage: `<MLPagination current={3} pageSize={10} total={50} />`,

  FewPages: `<MLPagination current={1} pageSize={10} total={30} />`,

  ManyPages: `<MLPagination current={5} pageSize={10} total={200} />`,

  SinglePage: `<MLPagination current={1} pageSize={10} total={10} />`,

  Controlled: `const [page, setPage] = useState(1);
const total = 100;
const pageSize = 10;

<MLPagination 
  current={page} 
  pageSize={pageSize} 
  total={total} 
  onChange={setPage} 
/>`,

  WithDataExample: `const [page, setPage] = useState(1);
const pageSize = 5;
const data = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: \`Item \${i + 1}\` }));
const total = data.length;
const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentItems = data.slice(startIndex, endIndex);

<div className="flex flex-col gap-4">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <MLPagination current={page} pageSize={pageSize} total={total} onChange={setPage} />
</div>`,
};
