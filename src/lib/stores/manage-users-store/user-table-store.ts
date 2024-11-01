"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (Rows: number) => void;
  setSortBy: (sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useUserTableStore = create<State & Actions>()(
    (set) => ({
      activePageIndex: 1,
      displayNumberOfRows: 999,
      sortBy: "first_name" as "first_name",
      order: "ASC" as "ASC",
      setActivePageIndex: (index) => set({ activePageIndex: index }),
      setDisplayNumberOfRows(Rows) {
        set({ displayNumberOfRows: Rows });
      },
      setSortBy: (sortBy) => set({ sortBy }),
      setOrder: (order) => set({ order }),
    }),

);

export default useUserTableStore;