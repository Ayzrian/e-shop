export interface IFilter {
  name: string;
  label: string;
  type: 'select' | 'text' | 'range';
  selectedValue: any;
  options?: IOption[];
  max?: number;
  queryField: string;
}

export interface IOption {
  label: string;
  value: string;
}
