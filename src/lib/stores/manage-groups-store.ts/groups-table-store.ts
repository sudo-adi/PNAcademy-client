"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "id" | "name" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (Rows: number) => void;
  setSortBy: (sortBy: "id" | "name" | "createdAt" | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useGroupsTableStore = create<State & Actions>()(
  persist(
    (set) => ({
      activePageIndex: 1,
      displayNumberOfRows: 10,
      sortBy: "name" as "name",
      order: "ASC" as "ASC",
      setActivePageIndex: (index) => set({ activePageIndex: index }),
      setDisplayNumberOfRows(Rows) {
        set({ displayNumberOfRows: Rows });
      },
      setSortBy: (sortBy) => set({ sortBy }),
      setOrder: (order) => set({ order }),
    }),
    {
      name: 'useGroupTableStore', 
    }
  )
);

export default useGroupsTableStore;