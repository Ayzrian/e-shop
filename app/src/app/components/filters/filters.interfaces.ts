export interface IFilter {
  name: string;
  label: string;
  type: 'select' | 'text';
  selectedValue: any;
  options?: IOption[];
  queryField: string;
}

export interface IOption {
  label: string;
  value: string;
}
