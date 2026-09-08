export type FieldType = 'text' | 'number' | 'date' | 'checkbox';

export interface Field {
  id: string;
  name: string;
  type: FieldType;
}

export interface Entry {
  id: string;
  values: Record<string, string | number | boolean | null>;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'table' | 'card';

export interface SortConfig {
  fieldId: string | null;
  direction: 'asc' | 'desc';
}

export interface ViewState {
  sortConfig: SortConfig;
  entryOrder: string[];
}

export interface DatabaseState {
  fields: Field[];
  entries: Entry[];
  tableView: ViewState;
  cardView: ViewState;
}
