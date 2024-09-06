"use client";
import { create } from 'zustand';

interface NotificationState {
  notificationName: string;
  notificationDescription: string;
  notificationImage?: File;
  notificationFile?: File;
  notificationGroups: string[];
}

interface NotificationActions {
  setNotificationName: (name: string) => void;
  setNotificationDescription: (description: string) => void;
  setNotificationImage: (image: File | undefined) => void;
  setNotificationFile: (file: File | undefined) => void;
  setNotificationGroups: (groups: string[]) => void;
  resetNotification: () => void;
}

const useCreateNotificationStore = create<NotificationState & NotificationActions>((set) => ({
  notificationName: '',
  notificationDescription: '',
  notificationImage: undefined,
  notificationFile: undefined,
  notificationGroups: [],

  setNotificationName: (name) => set({ notificationName: name }),
  setNotificationDescription: (description) => set({ notificationDescription: description }),
  setNotificationImage: (image) => set({ notificationImage: image }),
  setNotificationFile: (file) => set({ notificationFile: file }),
  setNotificationGroups: (groups) => set({ notificationGroups: groups }),

  resetNotification: () =>
    set({
      notificationName: '',
      notificationDescription: '',
      notificationImage: undefined,
      notificationFile: undefined,
      notificationGroups: [],
    }),
}));

export default useCreateNotificationStore;
