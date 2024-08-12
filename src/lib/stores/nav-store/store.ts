"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activeNavIndex: number;
}

interface Actions {
  setActiveNavIndex: (index: number) => void;
}

const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      activeNavIndex: 0,
      setActiveNavIndex: (index) => set({ activeNavIndex: index }),
    }),
    {
      name: 'navState', // Key for local storage
      // Default storage is used (localStorage in the browser)
    }
  )
);

export default useStore;