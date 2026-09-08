import { useState, useCallback, useMemo } from 'react';
import { Field, Entry, ViewMode, SortConfig, DatabaseState } from '@/types/database';
import { defaultDatabaseState } from '@/data/defaultData';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export function useDatabase() {
  const [state, setState] = useState<DatabaseState>(defaultDatabaseState);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewMode>('table');

  // Field operations
  const addField = useCallback((field: Omit<Field, 'id'>) => {
    const newField: Field = { ...field, id: `field-${generateId()}` };
    setState(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
      entries: prev.entries.map(entry => ({
        ...entry,
        values: { ...entry.values, [newField.id]: null },
        updatedAt: new Date().toISOString(),
      })),
    }));
    return newField;
  }, []);

  const updateField = useCallback((fieldId: string, updates: Partial<Omit<Field, 'id'>>) => {
    setState(prev => ({
      ...prev,
      fields: prev.fields.map(f => (f.id === fieldId ? { ...f, ...updates } : f)),
    }));
  }, []);

  const deleteField = useCallback((fieldId: string) => {
    setState(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId),
      entries: prev.entries.map(entry => {
        const { [fieldId]: _, ...rest } = entry.values;
        return { ...entry, values: rest, updatedAt: new Date().toISOString() };
      }),
    }));
  }, []);

  // Entry operations
  const addEntry = useCallback((values: Record<string, string | number | boolean | null>) => {
    const now = new Date().toISOString();
    const newEntry: Entry = {
      id: `entry-${generateId()}`,
      values,
      createdAt: now,
      updatedAt: now,
    };
    setState(prev => ({
      ...prev,
      entries: [...prev.entries, newEntry],
      tableView: { ...prev.tableView, entryOrder: [...prev.tableView.entryOrder, newEntry.id] },
      cardView: { ...prev.cardView, entryOrder: [...prev.cardView.entryOrder, newEntry.id] },
    }));
    return newEntry;
  }, []);

  const updateEntry = useCallback((entryId: string, values: Record<string, string | number | boolean | null>) => {
    setState(prev => ({
      ...prev,
      entries: prev.entries.map(e =>
        e.id === entryId ? { ...e, values: { ...e.values, ...values }, updatedAt: new Date().toISOString() } : e
      ),
    }));
  }, []);

  const deleteEntry = useCallback((entryId: string) => {
    setState(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== entryId),
      tableView: { ...prev.tableView, entryOrder: prev.tableView.entryOrder.filter(id => id !== entryId) },
      cardView: { ...prev.cardView, entryOrder: prev.cardView.entryOrder.filter(id => id !== entryId) },
    }));
  }, []);

  // View operations
  const setSortConfig = useCallback((view: ViewMode, sortConfig: SortConfig) => {
    const viewKey = view === 'table' ? 'tableView' : 'cardView';
    setState(prev => ({
      ...prev,
      [viewKey]: { ...prev[viewKey], sortConfig },
    }));
  }, []);

  const setEntryOrder = useCallback((view: ViewMode, entryOrder: string[]) => {
    const viewKey = view === 'table' ? 'tableView' : 'cardView';
    setState(prev => ({
      ...prev,
      [viewKey]: { ...prev[viewKey], entryOrder },
    }));
  }, []);

  // Get sorted and filtered entries for current view
  const getViewEntries = useMemo(() => {
    const viewState = currentView === 'table' ? state.tableView : state.cardView;
    const { sortConfig, entryOrder } = viewState;

    // Filter by search
    let filteredEntries = state.entries.filter(entry => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return Object.values(entry.values).some(value => {
        if (value === null) return false;
        return String(value).toLowerCase().includes(query);
      });
    });

    // Sort entries
    if (sortConfig.fieldId) {
      const field = state.fields.find(f => f.id === sortConfig.fieldId);
      if (field) {
        filteredEntries = [...filteredEntries].sort((a, b) => {
          const aVal = a.values[sortConfig.fieldId!];
          const bVal = b.values[sortConfig.fieldId!];

          if (aVal === null && bVal === null) return 0;
          if (aVal === null) return 1;
          if (bVal === null) return -1;

          let comparison = 0;
          if (field.type === 'number') {
            comparison = Number(aVal) - Number(bVal);
          } else if (field.type === 'checkbox') {
            comparison = (aVal ? 1 : 0) - (bVal ? 1 : 0);
          } else {
            comparison = String(aVal).localeCompare(String(bVal));
          }

          return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
      }
    } else {
      // Use manual order when no sort is active
      const orderMap = new Map(entryOrder.map((id, index) => [id, index]));
      filteredEntries = [...filteredEntries].sort((a, b) => {
        const aOrder = orderMap.get(a.id) ?? Infinity;
        const bOrder = orderMap.get(b.id) ?? Infinity;
        return aOrder - bOrder;
      });
    }

    return filteredEntries;
  }, [state, currentView, searchQuery]);

  return {
    fields: state.fields,
    entries: getViewEntries,
    allEntries: state.entries,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    tableSortConfig: state.tableView.sortConfig,
    cardSortConfig: state.cardView.sortConfig,
    tableEntryOrder: state.tableView.entryOrder,
    cardEntryOrder: state.cardView.entryOrder,
    addField,
    updateField,
    deleteField,
    addEntry,
    updateEntry,
    deleteEntry,
    setSortConfig,
    setEntryOrder,
  };
}
