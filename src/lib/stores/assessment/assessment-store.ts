"use client";
import { create } from 'zustand';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (rows: number) => void;
  setSortBy: (sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const assessmentStore = create<State & Actions>((set) => ({
  activePageIndex: 1,
  displayNumberOfRows: 10,
  sortBy: "first_name",
  order: "ASC",
  setActivePageIndex: (index) => set({ activePageIndex: index }),
  setDisplayNumberOfRows: (rows) => set({ displayNumberOfRows: rows }),
  setSortBy: (sortBy) => set({ sortBy }),
  setOrder: (order) => set({ order }),
}));

export default assessmentStore;
