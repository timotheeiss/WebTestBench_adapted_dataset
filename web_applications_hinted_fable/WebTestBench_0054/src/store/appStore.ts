import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SectionState {
  [docId: string]: {
    [sectionId: string]: boolean;
  };
}

interface GraphState {
  zoom: number;
  pan: { x: number; y: number };
}

interface AppState {
  // Current document
  selectedDocumentId: string | null;
  setSelectedDocumentId: (id: string | null) => void;

  // Section expand/collapse state
  sectionStates: SectionState;
  toggleSection: (docId: string, sectionId: string) => void;
  isSectionExpanded: (docId: string, sectionId: string) => boolean;
  expandSection: (docId: string, sectionId: string) => void;

  // Graph state
  graphState: GraphState;
  setGraphZoom: (zoom: number) => void;
  setGraphPan: (pan: { x: number; y: number }) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (docId: string) => void;
  isFavorite: (docId: string) => boolean;
  getFavoriteCount: () => number;

  // Module filter
  selectedModule: string | null;
  setSelectedModule: (module: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Sort
  sortBy: 'title' | 'date' | 'module';
  setSortBy: (sort: 'title' | 'date' | 'module') => void;

  // Toast/Prompt
  toast: { message: string; type: 'info' | 'warning' | 'error' } | null;
  showToast: (message: string, type: 'info' | 'warning' | 'error') => void;
  hideToast: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedDocumentId: null,
      setSelectedDocumentId: (id) => set({ selectedDocumentId: id }),

      sectionStates: {},
      toggleSection: (docId, sectionId) => set((state) => ({
        sectionStates: {
          ...state.sectionStates,
          [docId]: {
            ...state.sectionStates[docId],
            [sectionId]: !state.sectionStates[docId]?.[sectionId]
          }
        }
      })),
      isSectionExpanded: (docId, sectionId) => {
        return get().sectionStates[docId]?.[sectionId] ?? false;
      },
      expandSection: (docId, sectionId) => set((state) => ({
        sectionStates: {
          ...state.sectionStates,
          [docId]: {
            ...state.sectionStates[docId],
            [sectionId]: true
          }
        }
      })),

      graphState: { zoom: 1, pan: { x: 0, y: 0 } },
      setGraphZoom: (zoom) => set((state) => ({
        graphState: { ...state.graphState, zoom }
      })),
      setGraphPan: (pan) => set((state) => ({
        graphState: { ...state.graphState, pan }
      })),

      favorites: [],
      toggleFavorite: (docId) => set((state) => ({
        favorites: state.favorites.includes(docId)
          ? state.favorites.filter(id => id !== docId)
          : [...state.favorites, docId]
      })),
      isFavorite: (docId) => get().favorites.includes(docId),
      getFavoriteCount: () => get().favorites.length,

      selectedModule: null,
      setSelectedModule: (module) => set({ selectedModule: module }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      sortBy: 'title',
      setSortBy: (sort) => set({ sortBy: sort }),

      toast: null,
      showToast: (message, type) => {
        set({ toast: { message, type } });
        setTimeout(() => set({ toast: null }), 3000);
      },
      hideToast: () => set({ toast: null })
    }),
    {
      name: 'tech-docs-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        sectionStates: state.sectionStates,
        graphState: state.graphState,
        selectedModule: state.selectedModule,
        sortBy: state.sortBy
      })
    }
  )
);
