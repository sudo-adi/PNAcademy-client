// Types for Notifications
export interface CreateNotificationProps {
  title: string;
  description: string;
  image?: File;
  file?: File;
}

export interface NotificationResponse {
  status: string;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    image_url: string;
    file_url: string;
  };
}

export interface DeleteNotificationProps {
  id: string;
}

export interface DeleteNotificationResponse {
  message: string;
  data: boolean;
}

export interface GetNotificationsProps {
  page: number;
  pageSize: number;
  sortBy: string;
  order: 'ASC' | 'DESC';
}

export interface SingleNotification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image_url?: string;
  file_url?: string;
}

export interface GetNotificationsResponse {
  message: string;
  data: {
    notifications: SingleNotification[];
    totalPages: number;
  };
}

export interface AddGroupToNotificationProps {
  notificationId: string;
  groupId: string;
}

export interface AddGroupToNotificationResponse {
  status: string;
}

export interface RemoveGroupFromNotificationProps {
  notificationId: string;
  groupId: string;
}

export interface RemoveGroupFromNotificationResponse {
  status: string;
  message: string;
}
