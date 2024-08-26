"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (Rows: number) => void;
  setSortBy: (sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useAssessmentsTableStore = create<State & Actions>()(
  persist(
    (set) => ({
      activePageIndex: 1,
      displayNumberOfRows: 10,
      sortBy: "createdAt" as "createdAt",
      order: "ASC" as "ASC",
      setActivePageIndex: (index) => set({ activePageIndex: index }),
      setDisplayNumberOfRows(Rows) {
        set({ displayNumberOfRows: Rows });
      },
      setSortBy: (sortBy) => set({ sortBy }),
      setOrder: (order) => set({ order }),
    }),
    {
      name: 'useAssessmentTableStore',
    }
  )
);

export default useAssessmentsTableStore;