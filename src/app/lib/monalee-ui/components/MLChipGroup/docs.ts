export const examples = {
  Default: `<MLChipGroup
  items={[
    { id: '1', label: 'React' },
    { id: '2', label: 'TypeScript' },
    { id: '3', label: 'JavaScript' },
    { id: '4', label: 'HTML' },
    { id: '5', label: 'CSS' },
    { id: '6', label: 'Node.js' },
  ]}
  displayLimit={3}
  chipSize="md"
/>`,

  WithValues: `<MLChipGroup
  items={[
    { id: '1', label: 'React', value: 18 },
    { id: '2', label: 'TypeScript', value: 12 },
    { id: '3', label: 'JavaScript', value: 24 },
    { id: '4', label: 'HTML', value: 8 },
  ]}
  displayLimit={3}
  chipSize="md"
/>`,

  WithDifferentColors: `<MLChipGroup
  items={[
    { id: '1', label: 'React', color: 'default' },
    { id: '2', label: 'TypeScript', color: 'black' },
    { id: '4', label: 'HTML', color: 'default' },
    { id: '5', label: 'CSS', color: 'black' },
  ]}
  displayLimit={3}
  chipSize="md"
/>`,

  Small: `<MLChipGroup items={items} displayLimit={2} chipSize="sm" />`,

  Medium: `<MLChipGroup items={items} displayLimit={2} chipSize="md" />`,

  Large: `<MLChipGroup items={items} displayLimit={2} chipSize="lg" />`,

  ClosableChips: `<MLChipGroup
  items={items}
  displayLimit={3}
  chipSize="md"
  closable
  onChipRemove={(id) => console.log('removed:', id)}
/>`,

  Empty: `<MLChipGroup items={[]} emptyText="No items selected" />`,

  ShowAllItems: `<MLChipGroup items={items} displayLimit={10} chipSize="md" />`,

  MixedContent: `<MLChipGroup
  items={[
    { id: '1', label: 'React', value: 18, color: 'default' },
    { id: '2', label: 'TypeScript', color: 'black' },
    { id: '4', label: 'HTML' },
    { id: '5', label: 'CSS', value: 6 },
  ]}
  displayLimit={3}
  chipSize="md"
/>`,
};
