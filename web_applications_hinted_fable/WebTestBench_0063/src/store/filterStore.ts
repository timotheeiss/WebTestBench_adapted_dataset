import { create } from 'zustand';

type SortOption = 'name' | 'year' | 'region';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  selectedCategory: string | null;
  selectedProvince: string | null;
  searchQuery: string;
  sortBy: SortOption;
  sortOrder: SortOrder;
  
  setCategory: (category: string | null) => void;
  setProvince: (province: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: null,
  selectedProvince: null,
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  
  setCategory: (category) => set({ selectedCategory: category }),
  setProvince: (province) => set({ selectedProvince: province }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetFilters: () => set({
    selectedCategory: null,
    selectedProvince: null,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
  }),
}));
