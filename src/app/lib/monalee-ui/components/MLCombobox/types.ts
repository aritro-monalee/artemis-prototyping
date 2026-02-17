export interface MLComboboxOption<Value = string> {
  value: Value;
  label: string;
  desc?: string;
  recommended?: boolean;
  render?: (option: MLComboboxOption<Value>) => React.ReactNode;
}
