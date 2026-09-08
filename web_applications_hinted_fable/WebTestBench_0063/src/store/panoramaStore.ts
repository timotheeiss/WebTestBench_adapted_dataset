import { create } from 'zustand';

interface PanoramaState {
  // Camera position
  yaw: number;
  pitch: number;
  zoom: number;
  
  // Selected hotspot
  selectedHotspotId: string | null;
  showOverlay: boolean;
  
  // Loading states
  isPanoramaLoading: boolean;
  loadedHotspots: Set<string>;
  
  // Actions
  setCameraPosition: (yaw: number, pitch: number, zoom: number) => void;
  setSelectedHotspot: (id: string | null) => void;
  setShowOverlay: (show: boolean) => void;
  setPanoramaLoading: (loading: boolean) => void;
  markHotspotLoaded: (id: string) => void;
  resetView: () => void;
}

export const usePanoramaStore = create<PanoramaState>((set) => ({
  // Initial camera position
  yaw: 0,
  pitch: 0,
  zoom: 1,
  
  selectedHotspotId: null,
  showOverlay: false,
  
  isPanoramaLoading: true,
  loadedHotspots: new Set(),
  
  setCameraPosition: (yaw, pitch, zoom) => set({ yaw, pitch, zoom }),
  
  setSelectedHotspot: (id) => set({ selectedHotspotId: id, showOverlay: id !== null }),
  
  setShowOverlay: (show) => set({ showOverlay: show }),
  
  setPanoramaLoading: (loading) => set({ isPanoramaLoading: loading }),
  
  markHotspotLoaded: (id) => set((state) => ({
    loadedHotspots: new Set([...state.loadedHotspots, id])
  })),
  
  resetView: () => set({
    yaw: 0,
    pitch: 0,
    zoom: 1,
    selectedHotspotId: null,
    showOverlay: false,
  }),
}));
