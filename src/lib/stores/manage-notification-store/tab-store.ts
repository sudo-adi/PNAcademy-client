"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activeTabIndex: number;
}

interface Actions {
  setActiveTabIndex: (index: number) => void;
}

const useTabStore = create<State & Actions>()(
  persist(
    (set) => ({
      activeTabIndex: 0,
      setActiveTabIndex: (index) => set({ activeTabIndex: index }),
    }),
    {
      name: 'tabState', // Key for local storage
      // Default storage is used (localStorage in the browser)
    }
  )
);

export default useTabStore;