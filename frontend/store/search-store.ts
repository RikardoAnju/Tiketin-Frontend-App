import { create } from "zustand";

interface SearchState {
  activeTab: string;
  destination: string;
  setActiveTab: (tab: string) => void;
  setDestination: (destination: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  activeTab: "hotel",
  destination: "",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setDestination: (destination) => set({ destination }),
}));
