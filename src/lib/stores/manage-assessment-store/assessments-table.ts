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
  setSortBy: (sortBy: State['sortBy']) => void;
  setOrder: (order: "ASC" | "DESC") => void;
  resetPagination: () => void;
}

const useAssessmentsTableStore = create<State & Actions>()(
  persist(
    (set) => ({
      // Start from page 0 (first page) instead of 1
      activePageIndex: 0,
      displayNumberOfRows: 10,
      sortBy: "createdAt",
      order: "ASC",

      setActivePageIndex: (index) => set((state) => {
        console.log('Setting page index to:', index);
        return { activePageIndex: index };
      }),

      setDisplayNumberOfRows: (Rows) => set((state) => {
        // Reset to first page when changing rows per page
        return {
          displayNumberOfRows: Rows,
          activePageIndex: 0
        };
      }),

      setSortBy: (sortBy) => set((state) => {
        // Reset to first page when changing sort
        return {
          sortBy,
          activePageIndex: 0
        };
      }),

      setOrder: (order) => set((state) => {
        // Reset to first page when changing order
        return {
          order,
          activePageIndex: 0
        };
      }),

      resetPagination: () => set((state) => ({
        activePageIndex: 0
      })),
    }),
    {
      name: 'assessment-table-store',
      // Add version for potential future migrations
      version: 1,
      // Only persist specific fields
      partialize: (state) => ({
        displayNumberOfRows: state.displayNumberOfRows,
        sortBy: state.sortBy,
        order: state.order,
        // Don't persist activePageIndex to avoid stale pagination state
      }),
    }
  )
);

export default useAssessmentsTableStore;