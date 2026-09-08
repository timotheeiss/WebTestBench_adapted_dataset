import { Field, Entry, DatabaseState } from '@/types/database';

export const defaultFields: Field[] = [
  { id: 'field-1', name: 'Task Name', type: 'text' },
  { id: 'field-2', name: 'Priority', type: 'number' },
  { id: 'field-3', name: 'Due Date', type: 'date' },
  { id: 'field-4', name: 'Completed', type: 'checkbox' },
];

export const defaultEntries: Entry[] = [
  {
    id: 'entry-1',
    values: {
      'field-1': 'Design new landing page',
      'field-2': 1,
      'field-3': '2026-01-15',
      'field-4': false,
    },
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'entry-2',
    values: {
      'field-1': 'Review marketing materials',
      'field-2': 2,
      'field-3': '2026-01-18',
      'field-4': true,
    },
    createdAt: '2026-01-10T10:30:00Z',
    updatedAt: '2026-01-11T14:00:00Z',
  },
  {
    id: 'entry-3',
    values: {
      'field-1': 'Update API documentation',
      'field-2': 3,
      'field-3': '2026-01-20',
      'field-4': false,
    },
    createdAt: '2026-01-11T08:00:00Z',
    updatedAt: '2026-01-11T08:00:00Z',
  },
  {
    id: 'entry-4',
    values: {
      'field-1': 'Prepare quarterly report',
      'field-2': 1,
      'field-3': '2026-01-25',
      'field-4': false,
    },
    createdAt: '2026-01-12T11:00:00Z',
    updatedAt: '2026-01-12T11:00:00Z',
  },
  {
    id: 'entry-5',
    values: {
      'field-1': 'Team sync meeting notes',
      'field-2': 2,
      'field-3': '2026-01-14',
      'field-4': true,
    },
    createdAt: '2026-01-12T15:00:00Z',
    updatedAt: '2026-01-12T16:30:00Z',
  },
];

export const defaultDatabaseState: DatabaseState = {
  fields: defaultFields,
  entries: defaultEntries,
  tableView: {
    sortConfig: { fieldId: null, direction: 'asc' },
    entryOrder: defaultEntries.map(e => e.id),
  },
  cardView: {
    sortConfig: { fieldId: null, direction: 'asc' },
    entryOrder: defaultEntries.map(e => e.id),
  },
};
