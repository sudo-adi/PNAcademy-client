"use client";
import { create } from 'zustand';

interface State {
  activePageIndex: number;
  displayNumberOfRows: number;
  sortBy:
  | "id"
  | "name"
  | "canManageAssessment"
  | "canManageUser"
  | "canManageRole"
  | "canManageNotification"
  | "canManageLocalGroup"
  | "canManageReports"
  | "canAttemptAssessment"
  | "canViewReport"
  | "canManageMyAccount"
  | "canViewNotification"
  | "createdAt"
  | "updatedAt";
  order: "ASC" | "DESC";
}

interface Actions {
  setActivePageIndex: (index: number) => void;
  setDisplayNumberOfRows: (Rows: number) => void;
  setSortBy: (
    sortBy:
      | "id"
      | "name"
      | "canManageAssessment"
      | "canManageUser"
      | "canManageRole"
      | "canManageNotification"
      | "canManageLocalGroup"
      | "canManageReports"
      | "canAttemptAssessment"
      | "canViewReport"
      | "canManageMyAccount"
      | "canViewNotification"
      | "createdAt"
      | "updatedAt") => void;
  setOrder: (order: "ASC" | "DESC") => void;
}

const useRolesTableStore = create<State & Actions>()(
  (set) => ({
    activePageIndex: 1,
    displayNumberOfRows: 25,
    sortBy: "name" as 'name',
    order: "ASC" as "ASC",
    setActivePageIndex: (index) => set({ activePageIndex: index }),
    setDisplayNumberOfRows(Rows) {
      set({ displayNumberOfRows: Rows });
    },
    setSortBy: (sortBy) => set({ sortBy }),
    setOrder: (order) => set({ order }),
  }),
);

export default useRolesTableStore;