"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "createdAt"
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (Rows: number) => void;
  setSortBy: (sortBy: "createdAt" ) => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useNotificationTableStore = create<State & Actions>()(
    (set) => ({
      activePageIndex: 1,
      displayNumberOfRows: 999,
      sortBy: "createdAt" as "createdAt",
      order: "DESC" as "DESC",
      setActivePageIndex: (index) => set({ activePageIndex: index }),
      setDisplayNumberOfRows(Rows) {
        set({ displayNumberOfRows: Rows });
      },
      setSortBy: (sortBy) => set({ sortBy }),
      setOrder: (order) => set({ order }),
    }),
);

export default useNotificationTableStore;