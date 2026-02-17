export interface MLSelectOption<Value = string> {
  value: Value;
  label: string;
  desc?: string;
  recommended?: boolean;
  disabled?: boolean;
  render?: (option: MLSelectOption<Value>) => React.ReactNode;
}

/**
 * Grouped options for MLSelect.
 * Use this to create sections/groups of related options.
 */
export interface MLSelectGroup<Value = string> {
  /**
   * The label for this group (displayed as a section header)
   */
  label: string;
  /**
   * The options within this group
   */
  options: MLSelectOption<Value>[];
}

/**
 * Check if an item is a group
 */
export function isSelectGroup<Value>(
  item: MLSelectOption<Value> | MLSelectGroup<Value>
): item is MLSelectGroup<Value> {
  return 'options' in item && Array.isArray(item.options);
}
