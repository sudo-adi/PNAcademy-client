"use client";
import { create } from 'zustand';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (rows: number) => void;
  setSortBy: (sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "createdAt" | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useAssignedAssessmentTableStore = create<State & Actions>((set) => ({
  activePageIndex: 1,
  displayNumberOfRows: 10,
  sortBy: "createdAt",
  order: "ASC",
  setActivePageIndex: (index) => set({ activePageIndex: index }),
  setDisplayNumberOfRows: (rows) => set({ displayNumberOfRows: rows }),
  setSortBy: (sortBy) => set({ sortBy }),
  setOrder: (order) => set({ order }),
}));

export default useAssignedAssessmentTableStore;
